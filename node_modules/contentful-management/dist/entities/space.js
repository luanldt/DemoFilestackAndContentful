'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapSpace = wrapSpace;
exports.wrapSpaceCollection = wrapSpaceCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _wrapHttpClient = require('contentful-sdk-core/wrap-http-client');

var _wrapHttpClient2 = _interopRequireDefault(_wrapHttpClient);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _createSpaceApi = require('../create-space-api');

var _createSpaceApi2 = _interopRequireDefault(_createSpaceApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Space
 * @return {Space}
 */
function wrapSpace(http, data) {
  var space = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  var _http$httpClientParam = http.httpClientParams,
      rateLimit = _http$httpClientParam.rateLimit,
      rateLimitPeriod = _http$httpClientParam.rateLimitPeriod,
      maxRetries = _http$httpClientParam.maxRetries,
      retryOnTooManyRequests = _http$httpClientParam.retryOnTooManyRequests;

  var httpClientParams = {
    concurrency: rateLimit,
    delay: rateLimitPeriod,
    maxRetries: maxRetries,
    retryOnTooManyRequests: retryOnTooManyRequests
  };
  var spaceScopedHttpClient = (0, _wrapHttpClient2.default)(http.cloneWithNewParams({
    space: space.sys.id
  }), httpClientParams);
  var spaceApi = (0, _createSpaceApi2.default)({
    http: spaceScopedHttpClient
  });
  var enhancedSpace = (0, _enhanceWithMethods2.default)(space, spaceApi);
  return (0, _freezeSys2.default)(enhancedSpace);
}

/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Space collection
 * @return {SpaceCollection}
 */
function wrapSpaceCollection(http, data) {
  var spaces = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  spaces.items = spaces.items.map(function (entity) {
    return wrapSpace(http, entity);
  });
  return (0, _freezeSys2.default)(spaces);
}