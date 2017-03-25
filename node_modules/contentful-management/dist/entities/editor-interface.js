'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapEditorInterface = wrapEditorInterface;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _errorHandler = require('../error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Control} Control
 * @property {string} widgetId - defines how the field will look like e.g. singleLine
 * @property {string} fieldId - id of the field that this control is affecting
 * @property {Object} settings - settings for the widget
 */
/**
 * @typedef {EditorInterface} EditorInterface
 * @property {Object} sys - System metadata
 * @property {Control[]} controls - List of settings per field
 * @property {function(): Promise<EditorInterface>} update - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Control} getControlForField - Gets a control for a specific field
 * @property {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
 * @example
 * 
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * }) 
 * 
 * // request our space from Contentful
 * var space = await client.getSpace('SPACE_ID')
 * 
 * //=======================================================================================================
 * // web can get an editor interface in two ways
 * // 1. request our ContentType from Contentful
 * //
 * // var contentType = await space.getContentType('CONTENT_TYPE_ID')
 * //
 * //1.1 Get the editorInterface through the ContentType
 * //
 * // var editorInterface = await contentType.getEditorInterface()
 * //
 * // OR
 * //
 * // 2. get an editor interface from the Space object right away
 * //
 * // var editorInterface = await space.getEditorInterfaceForContentType('CONTENT_TYPE_ID')
 * //=======================================================================================================
 * 
 * // we'll use option 2
 * 
 * var editorInterface = await space.getEditorInterfaceForContentType('CONTENT_TYPE_ID')
 * 
 * // Example Updating  and editor interface
 * editorInterface.controls[0] = { "fieldId": "title", "widgetId": "singleLine"}
 * editorInterface.update()
 * .then(editorInterface => console.log(editorInterface.controls))
 */

function createEditorInterfaceApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof EditorInterface
     * @func update
     * @return {Promise<EditorInterface>} Object returned from the server with updated changes.
     * @example
     * editorInterface.controls[0] = { "fieldId": "title", "widgetId": "singleLine"}
     * editorInterface.update()
     * .then(editorInterface => console.log(editorInterface.controls))
     */
    update: function update() {
      var raw = this.toPlainObject();
      var data = (0, _omit2.default)(raw, ['sys']);
      return http.put('content_types/' + this.sys.contentType.sys.id + '/editor_interface', data, {
        headers: { 'X-Contentful-Version': this.sys.version }
      }).then(function (response) {
        return wrapEditorInterface(http, response.data);
      }, _errorHandler2.default);
    },
    /**
     * gets a control for a specific field
     * @memberof EditorInterface
     * @func getControlForField
     * @return {?Object} control object for specific field.
     * @example
     * const control = editorInterface.getControlForField('fieldId')
     * console.log(control)
     */
    getControlForField: function getControlForField(fieldId) {
      var result = this.controls.filter(function (control) {
        return control.fieldId === fieldId;
      });
      return result && result.length > 0 ? result[0] : null;
    }
  };
}

/**
* @private
* @param {Object} http - HTTP client instance
* @param {Object} data - Raw editor-interface data
* @return {EditorInterface} Wrapped editor-interface data
*/
function wrapEditorInterface(http, data) {
  var editorInterface = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(editorInterface, createEditorInterfaceApi(http));
  return (0, _freezeSys2.default)(editorInterface);
}