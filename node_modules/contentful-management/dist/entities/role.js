'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRole = wrapRole;
exports.wrapRoleCollection = wrapRoleCollection;

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
 * @see https://www.contentful.com/developers/docs/references/content-management-api/#/reference/roles/create-a-role
 * @typedef {Role} Role
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {Object} permissions - Permissions for application sections
 * @property {Object} policies
 * @property {function(): Prmise<Role>} update - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Prmise} delete - Deletes this object on the server.
 * @property {function(): Object} toPlainObject - Returns this Role as a plain JS object
 */

/**
 * @typedef {RoleCollection} RoleCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Role[]} items - an array of roles
 * @property {function(): Object} toPlainObject - Returns this Role collection as a plain JS object
 */

function createRoleApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Role
     * @func update
     * @return {Promise<Role>} Object returned from the server with updated changes.
     * @example
     * role.name = 'New name'
     * role.update()
     * .then(role => console.log(role.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'roles',
      wrapperMethod: wrapRole
    }),

    /**
     * Deletes this object on the server.
     * @memberof Role
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * role.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'roles'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw role data
 * @return {Role} Wrapped role data
 */
/**
 * Role instances
 * @namespace Role
 */
function wrapRole(http, data) {
  var role = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(role, createRoleApi(http));
  return (0, _freezeSys2.default)(role);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw role collection data
 * @return {RoleCollection} Wrapped role collection data
 */
function wrapRoleCollection(http, data) {
  var roles = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  roles.items = roles.items.map(function (entity) {
    return wrapRole(http, entity);
  });
  return (0, _freezeSys2.default)(roles);
}