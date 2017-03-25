'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapSpaceMembership = wrapSpaceMembership;
exports.wrapSpaceMembershipCollection = wrapSpaceMembershipCollection;

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
 * @typedef {SpaceMembership} SpaceMembership
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {boolean} admin - User is an admin
 * @property {Array} roles - Array of Role Links
 * @property {function(): Object} toPlainObject - Returns this Space Membership as a plain JS object
 */

/**
 * @typedef {SpaceMembershipCollection} SpaceMembershipCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Array<SpaceMembership.SpaceMembership>} items
 * @property {function(): Object} toPlainObject() - Returns this Space Membership collection as a plain JS object
 */

function createSpaceMembershipApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof SpaceMembership
     * @func update
     * @return {Promise<SpaceMembership>} Object returned from the server with updated changes.
     * @example
     * spaceMembership.name = 'New name'
     * spaceMembership.update()
     * .then(spaceMembership => console.log(spaceMembership.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'space_memberships',
      wrapperMethod: wrapSpaceMembership
    }),

    /**
     * Deletes this object on the server.
     * @memberof SpaceMembership
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * spaceMembership.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'space_memberships'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership data
 * @return {SpaceMembership} Wrapped space membership data
 */
function wrapSpaceMembership(http, data) {
  var spaceMembership = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(spaceMembership, createSpaceMembershipApi(http));
  return (0, _freezeSys2.default)(spaceMembership);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership collection data
 * @return {SpaceMembershipCollection} Wrapped space membership collection data
 */
function wrapSpaceMembershipCollection(http, data) {
  var spaceMemberships = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  spaceMemberships.items = spaceMemberships.items.map(function (entity) {
    return wrapSpaceMembership(http, entity);
  });
  return (0, _freezeSys2.default)(spaceMemberships);
}