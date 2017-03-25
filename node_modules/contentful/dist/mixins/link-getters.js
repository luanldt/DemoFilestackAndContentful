'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = mixinLinkGetters;

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _partial = require('lodash/partial');

var _partial2 = _interopRequireDefault(_partial);

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveAllLocales = false;
/**
 * Sets getters on links for a given response
 * @private
 * @param {Array<Entry|Asset|DeletedEntry|DeletedAsset>} items
 * @param {Object} includes - Object with lists of Entry, Asset, DeletedEntry and DeletedAsset
 */
function mixinLinkGetters(items, includes, resolveForAllLocales) {
  resolveAllLocales = resolveForAllLocales;
  var linkGetter = (0, _memoize2.default)(getLinksFromIncludes, memoizationResolver);
  (0, _each2.default)(items, function (item) {
    // TODO: workaround the preview endpoint extra locale this should be removed when
    // it is fixed on the backend
    if (resolveForAllLocales && item.sys.locale) {
      delete item.sys.locale;
    }
    setLocalizedFieldGetters(item.fields, !!item.sys.locale);
  });

  /**
   * If a field does not have a locale defined in sys, the content of that field
   * is an object where the keys are each available locale, and we need to iterate
   * over each of those
   * @private
   * @param {Object} fields - Fields object
   * @param {boolean} hasLocale - If entry has been requested with a locale
   */
  function setLocalizedFieldGetters(fields, hasLocale) {
    if (hasLocale) {
      setFieldGettersForFields(fields);
    } else {
      (0, _each2.default)(fields, function (localizedField) {
        return setFieldGettersForFields(localizedField);
      });
    }
  }

  /**
   * Sets getters on each link field or list of link fields for each item
   * @private
   * @param {Object} fields - Fields object
   */
  function setFieldGettersForFields(fields) {
    (0, _each2.default)(fields, function (field, fieldKey) {
      if (Array.isArray(field)) {
        addGetterForLinkArray(field, fieldKey, fields);
      } else {
        addGetterForLink(field, fieldKey, fields);
      }
    });
  }

  /**
   * Sets a getter which resolves the link of the given fieldKey in fields
   * @private
   * @param {Object} field - Field object
   * @param {string} fieldKey
   * @param {Object} fields - Fields object
   */
  function addGetterForLink(field, fieldKey, fields) {
    if ((0, _get2.default)(field, 'sys.type') === 'Link') {
      (0, _defineProperty2.default)(fields, fieldKey, {
        get: (0, _partial2.default)(linkGetter, field)
      });
    }
  }

  /**
   * Sets a getter which resolves the array of links of the given fieldKey in fields
   * @private
   * @param {Array<Object>} field - List field array
   * @param {string} fieldKey
   * @param {Object} fields - Fields object
   */
  function addGetterForLinkArray(listField, fieldKey, fields) {
    if ((0, _get2.default)(listField[0], 'sys.type') === 'Link') {
      (0, _defineProperty2.default)(fields, fieldKey, {
        get: function get() {
          return (0, _map2.default)(listField, (0, _partial2.default)(linkGetter));
        }
      });
    }
  }

  /**
   * Looks for given link field in includes.
   * If linked entity is not found, it returns the original link.
   * This method shouldn't be used directly, and it's memoized whenever this
   * module's main method is used.
   * This is done to prevent the same link being resolved multiple times.
   * @private
   * @param {Object} field - Field object
   * @return {Object} Field, or link if field not resolved
   */
  function getLinksFromIncludes(field) {
    var link = (0, _find2.default)(includes[field.sys.linkType], ['sys.id', field.sys.id]);
    if (link && link.fields) {
      // TODO: workaround the preview endpoint extra locale this should be removed when
      // it is fixed on the backend
      if (resolveAllLocales && link.sys.locale) {
        delete link.sys.locale;
      }
      setLocalizedFieldGetters(link.fields, !!link.sys.locale);
      return link;
    }
    return field;
  }

  function memoizationResolver(link) {
    return link.sys.id;
  }
}