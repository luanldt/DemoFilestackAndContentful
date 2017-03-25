'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapContentType = wrapContentType;
exports.wrapContentTypeCollection = wrapContentTypeCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

var _editorInterface = require('./editor-interface');

var _errorHandler = require('../error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ContentType} ContentType
 * @property {Object} sys - System metadata
 * @property {string} name - name of the contentType
 * @property {string} description - description of the contentType
 * @property {string} displayField - Field used as the main display field for Entries
 * @property {Array<Field>} fields - All the fields contained in this Content Type
 * @property {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * }) 
 * 
 * //=======================================================================================================
 * // You can get an Entry object by
 * //
 * // 1. Creating one
 * //
 * // var contentType = await space.createContentType({name: 'Post', fields: []})
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var contentType = await space.getContentType('contentTypeId')
 * //=======================================================================================================
 * 
 * // Example updating a ContentType
 * contentType.name = 'New name'
 * contentType.update()
 * .then(contentType => console.log(contentType.name))
 * 
 * //Example deleting a content type
 * contentType.delete()
 * .catch(err => console.log(err))
 */

/**
 * @typedef {ContentTypeCollection} ContentTypeCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {ContentType[]} items - An array of contentTypes
 * @property {function(): Object} toPlainObject - Returns this Content Type collection as a plain JS object
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
 * //Example getting contentTypes
 * space.getContentTypes()
 *  .then(contentTypes => console.log(contentTypes.items))
 */

function createContentTypeApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof ContentType
     * @func update
     * @return {Promise<ContentType>} Object returned from the server with updated changes.
     * @example
     * contentType.name = 'New name'
     * contentType.update()
     * .then(contentType => console.log(contentType.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Deletes this object on the server.
     * @memberof ContentType
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * contentType.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'content_types'
    }),

    /**
     * Publishes the object
     * @memberof ContentType
     * @func publish
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     * @example
     * contentType.publish()
     * .then(contentType => console.log(contentType.sys.publishedVersion))
     */
    publish: (0, _instanceActions.createPublishEntity)({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Unpublishes the object
     * @memberof ContentType
     * @func unpublish
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     * @example
     * contentType.unpublish()
     * .then(contentType => console.log(contentType.sys))
     */
    unpublish: (0, _instanceActions.createUnpublishEntity)({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Gets the editor interface for the object <br />
     * <strong>Important note</strong>: The editor interface only represent a published contentType.<br />
     * To get the most recent representation of the contentType make sure to publish it first
     * @memberof ContentType
     * @func getEditorInterface
     * @return {Promise<EditorInterface.EditorInterface>} Object returned from the server with the current editor interface.
     * @example
     * contentType.getEditorInterface()
     * .then(editorInterface => console.log(editorInterface.controls))
     */
    getEditorInterface: function getEditorInterface() {
      return http.get('content_types/' + this.sys.id + '/editor_interface').then(function (response) {
        return (0, _editorInterface.wrapEditorInterface)(http, response.data);
      }, _errorHandler2.default);
    },
    /**
     * Checks if the contentType is published. A published contentType might have unpublished changes (@see {ContentType.isUpdated})
     * @memberof ContentType
     * @func isPublished
     * @return {boolean}
     */
    isPublished: (0, _instanceActions.createPublishedChecker)(),

    /**
     * Checks if the contentType is updated. This means the contentType was previously published but has unpublished changes.
     * @memberof ContentType
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: (0, _instanceActions.createUpdatedChecker)(),

    /**
     * Checks if the contentType is in draft mode. This means it is not published.
     * @memberof ContentType
     * @func isDraft
     * @return {boolean}
     */
    isDraft: (0, _instanceActions.createDraftChecker)()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw content type data
 * @return {ContentType} Wrapped content type data
 */
function wrapContentType(http, data) {
  var contentType = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(contentType, createContentTypeApi(http));
  return (0, _freezeSys2.default)(contentType);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw content type collection data
 * @return {ContentTypeCollection} Wrapped content type collection data
 */
function wrapContentTypeCollection(http, data) {
  var contentTypes = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  contentTypes.items = contentTypes.items.map(function (entity) {
    return wrapContentType(http, entity);
  });
  return (0, _freezeSys2.default)(contentTypes);
}