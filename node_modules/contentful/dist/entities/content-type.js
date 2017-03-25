'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapContentType = wrapContentType;
exports.wrapContentTypeCollection = wrapContentTypeCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof Entities
 * @typedef ContentType
 * @prop {Entities.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} description
 * @prop {string} displayField - Field used as the main display field for Entries
 * @prop {string} Array<Field> - All the fields contained in this Content Type
 * @prop {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
 */

/**
 * @private
 * @param {Object} data - Raw content type data
 * @return {ContentType} Wrapped content type data
 */
function wrapContentType(data) {
  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
}

/**
 * @memberof Entities
 * @typedef ContentTypeCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<Entities.ContentType>} items
 * @prop {function(): Object} toPlainObject() - Returns this Content Type collection as a plain JS object
 */

/**
 * @private
 * @param {Object} data - Raw content type collection data
 * @return {ContentTypeCollection} Wrapped content type collection data
 */
function wrapContentTypeCollection(data) {
  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
}