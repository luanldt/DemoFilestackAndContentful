'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSpaceApi;

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ClientAPI} ClientAPI
 * @property {function(id: string): Promise<Space>} getSpace - Gets a space with the spcified id
 * @property {function(): Promise<SpaceCollection>} getSpaces - Gets a collection of spaces
 * @property {function(data: {name: string}): Promise<Space>} createSpace - Creates a space
 */

/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 * @private
 * @param {Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 * @prop {Function} shouldLinksResolve - Link resolver preconfigured with global setting
 * @return {ClientAPI}
 */
function createSpaceApi(_ref) {
  var http = _ref.http;
  var _entities$space = _entities2.default.space,
      wrapSpace = _entities$space.wrapSpace,
      wrapSpaceCollection = _entities$space.wrapSpaceCollection;

  /**
   * Gets all spaces
   * @memberof ClientAPI   * @return {Promise<Space.SpaceCollection>} Promise for a collection of Spaces
   * @example
   * client.getSpaces()
   * .then(spaces => console.log(spaces.items))
   */

  function getSpaces() {
    return http.get('').then(function (response) {
      return wrapSpaceCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a space
   * @memberof ClientAPI
   * @param {string} id - Space ID
   * @return {Promise<Space.Space>} Promise for a Space
   * @example
   * client.getSpace('spaceid')
   * .then(space => console.log(space))
   */
  function getSpace(id) {
    return http.get(id).then(function (response) {
      return wrapSpace(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a space
   * @memberof ClientAPI
   * @see {Space.Space}
   * @param {object} data - Object representation of the Space to be created
   * @param {string=} organizationId - Organization ID, if the associated token can manage more than one organization.
   * @return {Promise<Space.Space>} Promise for the newly created Space
   * @example
   * client.createSpace({name: 'Space Name'})
   * .then(space => console.log(space))
   */
  function createSpace(data, organizationId) {
    return http.post('', data, {
      headers: organizationId ? { 'X-Contentful-Organization': organizationId } : {}
    }).then(function (response) {
      return wrapSpace(http, response.data);
    }, _errorHandler2.default);
  }

  return {
    getSpaces: getSpaces,
    getSpace: getSpace,
    createSpace: createSpace
  };
}