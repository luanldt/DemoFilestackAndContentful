'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdateEntity = createUpdateEntity;
exports.createDeleteEntity = createDeleteEntity;
exports.createPublishEntity = createPublishEntity;
exports.createUnpublishEntity = createUnpublishEntity;
exports.createArchiveEntity = createArchiveEntity;
exports.createUnarchiveEntity = createUnarchiveEntity;
exports.createPublishedChecker = createPublishedChecker;
exports.createUpdatedChecker = createUpdatedChecker;
exports.createDraftChecker = createDraftChecker;
exports.createArchivedChecker = createArchivedChecker;

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
function createUpdateEntity(_ref) {
  var http = _ref.http,
      entityPath = _ref.entityPath,
      wrapperMethod = _ref.wrapperMethod;

  return function () {
    var raw = this.toPlainObject();
    var data = (0, _omit2.default)(raw, ['sys']);
    return http.put(entityPath + '/' + this.sys.id, data, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createDeleteEntity(_ref2) {
  var http = _ref2.http,
      entityPath = _ref2.entityPath;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id).then(function (response) {}, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createPublishEntity(_ref3) {
  var http = _ref3.http,
      entityPath = _ref3.entityPath,
      wrapperMethod = _ref3.wrapperMethod;

  return function () {
    return http.put(entityPath + '/' + this.sys.id + '/published', null, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createUnpublishEntity(_ref4) {
  var http = _ref4.http,
      entityPath = _ref4.entityPath,
      wrapperMethod = _ref4.wrapperMethod;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id + '/published').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createArchiveEntity(_ref5) {
  var http = _ref5.http,
      entityPath = _ref5.entityPath,
      wrapperMethod = _ref5.wrapperMethod;

  return function () {
    return http.put(entityPath + '/' + this.sys.id + '/archived').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createUnarchiveEntity(_ref6) {
  var http = _ref6.http,
      entityPath = _ref6.entityPath,
      wrapperMethod = _ref6.wrapperMethod;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id + '/archived').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createPublishedChecker() {
  return function () {
    return !!this.sys.publishedVersion;
  };
}

/**
 * @private
 */
function createUpdatedChecker() {
  return function () {
    // The act of publishing an entity increases its version by 1, so any entry which has
    // 2 versions higher or more than the publishedVersion has unpublished changes.
    return this.sys.publishedVersion && this.sys.version > this.sys.publishedVersion + 1;
  };
}

/**
 * @private
 */
function createDraftChecker() {
  return function () {
    return !this.sys.publishedVersion;
  };
}

/**
 * @private
 */
function createArchivedChecker() {
  return function () {
    return !!this.sys.archivedVersion;
  };
}