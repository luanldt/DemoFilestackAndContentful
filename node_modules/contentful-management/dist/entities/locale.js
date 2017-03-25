'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapLocale = wrapLocale;
exports.wrapLocaleCollection = wrapLocaleCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Locale} Locale
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {string} code - Locale code (example: en-us)
 * @property {boolean} contentDeliveryApi - If the content under this locale should be available on the CDA (for public reading)
 * @property {boolean} contentManagementApi - If the content under this locale should be available on the CMA (for editing)
 * @property {boolean} default - If this is the default locale
 * @property {boolean} optional - If the locale needs to be filled in on entries or not
 * @property {function(): Object} toPlainObject - Returns this Locale as a plain JS object
 */

/**
 * @typedef {LocaleCollection} LocaleCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Array<Locale>} items - array of locales
 * @property {function(): Object} toPlainObject - Returns this Locale collection as a plain JS object
 */

function createLocaleApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Locale
     * @func update
     * @return {Promise<Locale>} Object returned from the server with updated changes.
     * @example
     * locale.name = 'English'
     * locale.update()
     * .then(locale => console.log(locale.name))
     */
    update: function update() {
      var locale = this;
      // this property shouldn't be sent back if it exists
      delete locale.default;
      delete locale.fallback_code;
      delete locale.fallbackCode;
      return (0, _instanceActions.createUpdateEntity)({
        http: http,
        entityPath: 'locales',
        wrapperMethod: wrapLocale
      }).call(locale);
    },

    /**
     * Deletes this object on the server.
     * @memberof Locale
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * locale.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'locales'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale data
 * @return {Locale} Wrapped locale data
 */
function wrapLocale(http, data) {
  delete data.internal_code;
  var locale = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(locale, createLocaleApi(http));
  return (0, _freezeSys2.default)(locale);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale collection data
 * @return {LocaleCollection} Wrapped locale collection data
 */
function wrapLocaleCollection(http, data) {
  var locales = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  locales.items = locales.items.map(function (entity) {
    return wrapLocale(http, entity);
  });
  return (0, _freezeSys2.default)(locales);
}