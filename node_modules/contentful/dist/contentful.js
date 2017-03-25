'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClient;

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _version = require('../version');

var _version2 = _interopRequireDefault(_version);

var _createHttpClient = require('contentful-sdk-core/create-http-client');

var _createHttpClient2 = _interopRequireDefault(_createHttpClient);

var _wrapHttpClient = require('contentful-sdk-core/wrap-http-client');

var _wrapHttpClient2 = _interopRequireDefault(_wrapHttpClient);

var _createContentfulApi = require('./create-contentful-api');

var _createContentfulApi2 = _interopRequireDefault(_createContentfulApi);

var _createLinkResolver = require('./create-link-resolver');

var _createLinkResolver2 = _interopRequireDefault(_createLinkResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a client instance
 * @func
 * @name createClient
 * @memberof contentful
 * @param {Object} params - Client initialization parameters
 * @prop {string} params.space - Space ID
 * @prop {string} params.accessToken - Contentful CDA Access Token
 * @prop {boolean=} params.insecure - Requests will be made over http instead of the default https (default: true)
 * @prop {string=} params.host - API host (default: cdn.contentful.com). Also usable with preview.contentful.com.
 * @prop {Object=} params.agent - Optional Node.js HTTP agent for proxying (see <a href="https://nodejs.org/api/http.html#http_class_http_agent">Node.js docs</a> and <a href="https://www.npmjs.com/package/https-proxy-agent">https-proxy-agent</a>)
 * @prop {Object=} params.headers - Optional additional headers
 * @prop {number=} params.concurrency - Number of allowed concurrent requests. Changing this value is not recommended. (default: 6)
 * @prop {number=} params.delay - Delay in milliseconds for waiting after hitting the allowed number of concurrent requests. Changing this value is not recommended. (default: 1000)
 * @prop {number=} params.maxRetries - Maximum number of retries when a 429 is received (default: 5)
 * @prop {boolean=} params.retryOnTooManyRequests - If we should retry on 429s (default: true)
 * @prop {boolean=} params.resolveLinks - If we should resolve links between entries  
 * @returns {ContentfulClientAPI.ClientAPI}
 * @example
 * const client = contentful.createClient({
 *  accessToken: 'myAccessToken',
 *  space: 'mySpaceId'
 * })
 */
/**
 * Contentful Delivery API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Delivery API.
 * @namespace contentful
 * @see ContentfulClientAPI
 */

function createClient(axios, params) {
  params = (0, _defaults2.default)((0, _cloneDeep2.default)(params), {
    rateLimit: 9,
    rateLimitPeriod: 1000,
    maxRetries: 5,
    retryOnTooManyRequests: true
  });

  if (!params.accessToken) {
    throw new TypeError('Expected parameter accessToken');
  }

  if (!params.space) {
    throw new TypeError('Expected parameter space');
  }

  // Use resolveLinks param if specified, otherwise default to true
  var resolveLinks = !!('resolveLinks' in params ? params.resolveLinks : true);
  var shouldLinksResolve = (0, _createLinkResolver2.default)(resolveLinks);

  params.defaultHostname = 'cdn.contentful.com';
  params.headers = (0, _assign2.default)(params.headers, {
    'Content-Type': 'application/vnd.contentful.delivery.v1+json',
    'X-Contentful-User-Agent': 'contentful.js/' + _version2.default
  });

  var http = (0, _wrapHttpClient2.default)((0, _createHttpClient2.default)(axios, params), {
    concurrency: params.rateLimit,
    delay: params.rateLimitPeriod,
    maxRetries: params.maxRetries,
    retryOnTooManyRequests: params.retryOnTooManyRequests
  });

  return (0, _createContentfulApi2.default)({
    http: http,
    shouldLinksResolve: shouldLinksResolve
  });
}