'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = errorHandler;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ErrorResponse} ErrorResponse
 * @property {string} name - Error name. Usually refers to the sys.id returned on the
 * error server response. If that's not available or is unknown, it defaults to
 * the HTTP error code and status text.
 * @property {string} message - Stringified JSON object with request information,
 * HTTP response details and error details payload (if available). The `requestId`
 * property is internal to Contentful and it can be used when contacting support
 * about unusual errors.
 */

/**
 * Handles errors received from the server. Parses the error into a more useful
 * format, places it in an exception and throws it.
 * See https://www.contentful.com/developers/docs/references/content-management-api/#/introduction/errors
 * for more details on the data received on the errorResponse.data property
 * and the expected error codes.
 * @private
 * @param {Object} errorResponse - Error received from an axios request
 * @throws {ErrorResponse}
 */
function errorHandler(errorResponse) {
  var data = errorResponse.data,
      status = errorResponse.status,
      statusText = errorResponse.statusText,
      config = errorResponse.config;

  var errorData = {
    request: {
      url: config.url,
      headers: config.headers,
      method: config.method,
      payloadData: config.data
    },
    status: status,
    statusText: statusText
  };
  if (data.requestId) {
    errorData.requestId = data.requestId;
  }
  if ((0, _get2.default)(data, 'sys.type') === 'Error') {
    errorData.message = data.message;
    if (data.details) {
      errorData.details = data.details;
    }
  }
  var error = new Error();
  var errorName = (0, _get2.default)(data, 'sys.id');
  error.name = errorName && errorName !== 'Unknown' ? errorName : status + ' ' + statusText;
  error.message = (0, _stringify2.default)(errorData, null, '  ');
  throw error;
}