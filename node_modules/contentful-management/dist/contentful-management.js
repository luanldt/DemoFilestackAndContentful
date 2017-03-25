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

var _createHttpClient = require('contentful-sdk-core/create-http-client');

var _createHttpClient2 = _interopRequireDefault(_createHttpClient);

var _wrapHttpClient = require('contentful-sdk-core/wrap-http-client');

var _wrapHttpClient2 = _interopRequireDefault(_wrapHttpClient);

var _version = require('../version');

var _version2 = _interopRequireDefault(_version);

var _createContentfulApi = require('./create-contentful-api');

var _createContentfulApi2 = _interopRequireDefault(_createContentfulApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ContentfulManagement} ContentfulManagement
 * @property {function(params: {accessToken: string, insecure?: boolean, host?: string, agent?: Object, headers?: Object, concurrency?: number, delay?: number, maxRetries?: number, retryOnTooManyRequests?: boolean}): ClientAPI} createClient - Create a client instance, this is the entry point to the library
 * 
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * }) 
*/
function createClient(axios, params) {
  params = (0, _defaults2.default)((0, _cloneDeep2.default)(params), {
    rateLimit: 6,
    rateLimitPeriod: 1000,
    maxRetries: 5,
    retryOnTooManyRequests: true
  });

  if (!params.accessToken) {
    throw new TypeError('Expected parameter accessToken');
  }

  params.defaultHostname = 'api.contentful.com';
  params.headers = (0, _assign2.default)(params.headers, {
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-User-Agent': 'contentful-management.js/' + _version2.default
  });

  var http = (0, _wrapHttpClient2.default)((0, _createHttpClient2.default)(axios, params), {
    concurrency: params.rateLimit,
    delay: params.rateLimitPeriod,
    maxRetries: params.maxRetries,
    retryOnTooManyRequests: params.retryOnTooManyRequests
  });
  var api = (0, _createContentfulApi2.default)({
    http: http
  });

  return api;
} /**
   * Contentful Management API SDK. Allows you to create instances of a client
   * with access to the Contentful Content Management API.
   * @namespace contentfulManagement
   * @see ContentfulClientAPI
   */