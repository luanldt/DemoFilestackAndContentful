'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = enhanceWithMethods;

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method enhances a base object which would normally contain data, with
 * methods from another object that might work on manipulating that data.
 * All the added methods are set as non enumerable, non configurable, and non
 * writable properties. This ensures that if we try to clone or stringify the
 * base object, we don't have to worry about these additional methods.
 * @private
 * @param {object} baseObject - Base object with data
 * @param {object} methodsObject - Object with methods as properties. The key
 * values used here will be the same that will be defined on the baseObject.
 */
function enhanceWithMethods(baseObject, methodsObject) {
  return (0, _reduce2.default)(methodsObject, function (baseObject, method, methodName) {
    (0, _defineProperty2.default)(baseObject, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: method
    });
    return baseObject;
  }, baseObject);
}