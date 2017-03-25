'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _space = require('./space');

var space = _interopRequireWildcard(_space);

var _entry = require('./entry');

var entry = _interopRequireWildcard(_entry);

var _asset = require('./asset');

var asset = _interopRequireWildcard(_asset);

var _contentType = require('./content-type');

var contentType = _interopRequireWildcard(_contentType);

var _editorInterface = require('./editor-interface');

var editorInterface = _interopRequireWildcard(_editorInterface);

var _locale = require('./locale');

var locale = _interopRequireWildcard(_locale);

var _webhook = require('./webhook');

var webhook = _interopRequireWildcard(_webhook);

var _spaceMembership = require('./space-membership');

var spaceMembership = _interopRequireWildcard(_spaceMembership);

var _role = require('./role');

var role = _interopRequireWildcard(_role);

var _apiKey = require('./api-key');

var apiKey = _interopRequireWildcard(_apiKey);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  space: space,
  entry: entry,
  asset: asset,
  contentType: contentType,
  editorInterface: editorInterface,
  locale: locale,
  webhook: webhook,
  spaceMembership: spaceMembership,
  role: role,
  apiKey: apiKey
};