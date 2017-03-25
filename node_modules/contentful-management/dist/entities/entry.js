'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapEntry = wrapEntry;
exports.wrapEntryCollection = wrapEntryCollection;

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
 * @typedef {Entry} Entry
 * @property {Object} sys - Standard system metadata with additional entry specific properties
 * @property {Object} sys.contentType - Content Type used by this Entry
 * @property {string} sys.locale - If present, indicates the locale which this entry uses
 * @property {Object} fields - Object with content for each field
 * @property {boolean} isPublished - Checks if the entry is published. A published entry might have unpublished changes (@see {Entry.isUpdated})
 * @property {boolean} isUpdated - Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
 * @property {boolean} isDraft -  Checks if the entry is in draft mode. This means it is not published.
 * @property {boolean} isArchived - Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
 * @property {function(): Promise<Entry>} update - Updates an entry in the server 
 * @property {function(): Promise<Entry>} delete - Deletes an entry on the server
 * @property {function(): Promise<Entry>} publish - Publishes an entry
 * @property {function(): Promise<Entry>} unPublish - Un-publishes an entry
 * @property {function(): Promise<Entry>} archive - Archives an entry
 * @property {function(): Promise<Entry>} unArchive - Un-archives an entry
 * @property {function(): Object} toPlainObject - Returns this Entry as a plain JS object
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
 * // var entry = await space.createEntry({})
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var entry = await space.getEntry('ENTRY_ID')
 * //=======================================================================================================
 * 
 * // Example updating an entry
 * entry.fields.name['en-US'] = 'Blog Post'
 * entry.update()
 * .then(entry => console.log(entry.fields.name['en-US']))
 * 
 * // Example deleting an entry
 * entry.delete()
 * .catch(err => console.log(err))
 * 
 * // Example publish an entry
 * entry.publish()
 * .then(entry => console.log(entry.sys.publishedVersion))
 * 
 * // Example unPublishing an entry
 * entry.unpublish()
 * .then(entry => console.log(entry.sys))
 * 
 * // Example archiving an entry
 * entry.archive()
 * .then(entry => console.log(entry.sys.archivedVersion))
 * 
 * // Example unarchiving an entry
 * entry.unarchive()
 * .then(entry => console.log(entry.sys))
 */

/**
 * @typedef {EntryCollection} EntryCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Entry[]} items - array of entries
 * @property {Array<Object>} errors - Array of errors that might occur when retrieving entries.
 * @property {function(): Object} toPlainObject - Returns this Entry collection as a plain JS object
 */

function createEntryApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Entry
     * @func update
     * @return {Promise<Entry>} Object returned from the server with updated changes.
     * @example
     * entry.fields.name['en-US'] = 'Blog Post'
     * entry.update()
     * .then(entry => console.log(entry.fields.name['en-US']))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Deletes this object on the server.
     * @memberof Entry
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * entry.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'entries'
    }),

    /**
     * Publishes the object
     * @memberof Entry
     * @func publish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.publish()
     * .then(entry => console.log(entry.sys.publishedVersion))
     */
    publish: (0, _instanceActions.createPublishEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Unpublishes the object
     * @memberof Entry
     * @func unpublish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.unpublish()
     * .then(entry => console.log(entry.sys))
     */
    unpublish: (0, _instanceActions.createUnpublishEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Archives the object
     * @memberof Entry
     * @func archive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.archive()
     * .then(entry => console.log(entry.sys.archivedVersion))
     */
    archive: (0, _instanceActions.createArchiveEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Unarchives the object
     * @memberof Entry
     * @func unarchive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.unarchive()
     * .then(entry => console.log(entry.sys))
     */
    unarchive: (0, _instanceActions.createUnarchiveEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Checks if the entry is published. A published entry might have unpublished changes (@see {Entry.isUpdated})
     * @memberof Entry
     * @func isPublished
     * @return {boolean}
     */
    isPublished: (0, _instanceActions.createPublishedChecker)(),

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     * @memberof Entry
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: (0, _instanceActions.createUpdatedChecker)(),

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     * @memberof Entry
     * @func isDraft
     * @return {boolean}
     */
    isDraft: (0, _instanceActions.createDraftChecker)(),

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     * @memberof Entry
     * @func isArchived
     * @return {boolean}
     */
    isArchived: (0, _instanceActions.createArchivedChecker)()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw entry data
 * @return {Entry} Wrapped entry data
 */
function wrapEntry(http, data) {
  var entry = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(entry, createEntryApi(http));
  return (0, _freezeSys2.default)(entry);
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw entry collection data
 * @return {EntryCollection} Wrapped entry collection data
 */
function wrapEntryCollection(http, data, resolveLinks) {
  var entries = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  entries.items = entries.items.map(function (entity) {
    return wrapEntry(http, entity);
  });
  return (0, _freezeSys2.default)(entries);
}