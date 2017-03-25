'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapSpace = wrapSpace;

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof Entities
 * @typedef Space
 * @prop {Object} sys - System metadata
 * @prop {string} sys.id - Space id
 * @prop {string} sys.type - Entity type
 * @prop {string} name - Space name
 * @prop {Array<string>} locales - Array with locale codes
 * @prop {function(): Object} toPlainObject() - Returns this Space as a plain JS object
 */

/**
 * @private
 * @param  {Object} data - API response for a Space
 * @return {Space}
 */
function wrapSpace(data) {
  return (0, _freezeSys2.default)((0, _toPlainObject2.default)(data));
}