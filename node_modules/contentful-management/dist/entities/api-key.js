'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapApiKey = wrapApiKey;
exports.wrapApiKeyCollection = wrapApiKeyCollection;

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
 * @typedef {ApiKey} ApiKey
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {string} description
 * @property {function(): Promise<ApiKey>} update() - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Promise} delete() - Deletes this object on the server 
 * @property {function(): Object} toPlainObject - Returns this Api Key as a plain JS object
 * @example
 * 
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * }) 
 * 
 * var space = await client.getSpace('SPACE_ID')
 * 
 * //=======================================================================================================
 * // You can get an ApiKey object by
 * //
 * // 1. Creating one
 * //
 * // var apiKey = await space.createApiKey({})
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var apiKey = await space.getApiKey('API_KEY_ID')
 * //=======================================================================================================
 * 
 * // we'll use option 2
 * var apiKey = await space.getApiKey('API_KEY_ID')
 * 
 * // Example updating an APIKey
 * apiKey.name = 'New name'
 * apiKey.update()
 * .then(apiKey => console.log(apiKey.name))
 * 
 * // Example deleting an ApiKey
 * apiKey.delete()
 * .catch(err => console.log(err))
 *  
 */

/**
 * @typedef {ApiKeyCollection} ApiKeyCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {ApiKey[]} items - Array of ApiKey
 * @property {function(): Object} toPlainObject - Returns this Api Key collection as a plain JS object
 * @example
 * 
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * }) 
 * 
 * var space = await client.getSpace('SPACE_ID')
 * 
 * //get all the api keys
 * space.getApiKeys()
 * .then(apiKeys => console.log(apiKeys.items))
 */
function createApiKeyApi(http) {
  return {
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'api_keys',
      wrapperMethod: wrapApiKey
    }),

    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'api_keys'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key data
 * @return {ApiKey} Wrapped api key data
 */
function wrapApiKey(http, data) {
  var apiKey = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(apiKey, createApiKeyApi(http));
  return (0, _freezeSys2.default)(apiKey);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key collection data
 * @return {ApiKeyCollection} Wrapped api key collection data
 */
function wrapApiKeyCollection(http, data) {
  var apiKeys = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  apiKeys.items = apiKeys.items.map(function (entity) {
    return wrapApiKey(http, entity);
  });
  return (0, _freezeSys2.default)(apiKeys);
}