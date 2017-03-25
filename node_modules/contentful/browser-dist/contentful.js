var contentful =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// To understand why axios is vendored, check SETUP.md
	var axios = __webpack_require__(1);
	var contentful = __webpack_require__(69).default;
	module.exports = {
	  createClient: function createClient(params) {
	    return contentful(axios, params);
	  },
	  // This is intended to be used only for debug reasons
	  // e.g: if you want to add interceptor to axios or if you want to use a different vendor
	  // if you want to use a different vendor than axios make sure it is using promises
	  createClientWithCustomHttpVendor: function createClientWithCustomHttpVendor(httpVendor, params) {
	    return contentful(httpVendor, params);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, module) {'use strict';

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _typeof2 = __webpack_require__(61);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	/* axios v0.9.1 | (c) 2016 by Matt Zabriskie */
	(function webpackUniversalModuleDefinition(root, factory) {
		if (( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && ( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') exports["axios"] = factory();else root["axios"] = factory();
	})(undefined, function () {
		return (/******/function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};
				/******/
				/******/ // The require function
				/******/function __webpack_require__(moduleId) {
					/******/
					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;
					/******/
					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };
					/******/
					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
					/******/
					/******/ // Flag the module as loaded
					/******/module.loaded = true;
					/******/
					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}
				/******/
				/******/
				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;
				/******/
				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;
				/******/
				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";
				/******/
				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			}(
			/************************************************************************/
			/******/[
			/* 0 */
			/***/function (module, exports, __webpack_require__) {

				module.exports = __webpack_require__(1);

				/***/
			},
			/* 1 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var defaults = __webpack_require__(2);
				var utils = __webpack_require__(3);
				var dispatchRequest = __webpack_require__(4);
				var InterceptorManager = __webpack_require__(12);
				var isAbsoluteURL = __webpack_require__(13);
				var combineURLs = __webpack_require__(14);
				var bind = __webpack_require__(15);
				var transformData = __webpack_require__(8);

				function Axios(defaultConfig) {
					this.defaults = utils.merge({}, defaultConfig);
					this.interceptors = {
						request: new InterceptorManager(),
						response: new InterceptorManager()
					};
				}

				Axios.prototype.request = function request(config) {
					/*eslint no-param-reassign:0*/
					// Allow for axios('example/url'[, config]) a la fetch API
					if (typeof config === 'string') {
						config = utils.merge({
							url: arguments[0]
						}, arguments[1]);
					}

					config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

					// Support baseURL config
					if (config.baseURL && !isAbsoluteURL(config.url)) {
						config.url = combineURLs(config.baseURL, config.url);
					}

					// Don't allow overriding defaults.withCredentials
					config.withCredentials = config.withCredentials || this.defaults.withCredentials;

					// Transform request data
					config.data = transformData(config.data, config.headers, config.transformRequest);

					// Flatten headers
					config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

					utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
						delete config.headers[method];
					});

					// Hook up interceptors middleware
					var chain = [dispatchRequest, undefined];
					var promise = _promise2.default.resolve(config);

					this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
						chain.unshift(interceptor.fulfilled, interceptor.rejected);
					});

					this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
						chain.push(interceptor.fulfilled, interceptor.rejected);
					});

					while (chain.length) {
						promise = promise.then(chain.shift(), chain.shift());
					}

					return promise;
				};

				var defaultInstance = new Axios(defaults);
				var axios = module.exports = bind(Axios.prototype.request, defaultInstance);

				axios.create = function create(defaultConfig) {
					return new Axios(defaultConfig);
				};

				// Expose defaults
				axios.defaults = defaultInstance.defaults;

				// Expose all/spread
				axios.all = function all(promises) {
					return _promise2.default.all(promises);
				};
				axios.spread = __webpack_require__(16);

				// Expose interceptors
				axios.interceptors = defaultInstance.interceptors;

				// Provide aliases for supported request methods
				utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
					/*eslint func-names:0*/
					Axios.prototype[method] = function (url, config) {
						return this.request(utils.merge(config || {}, {
							method: method,
							url: url
						}));
					};
					axios[method] = bind(Axios.prototype[method], defaultInstance);
				});

				utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
					/*eslint func-names:0*/
					Axios.prototype[method] = function (url, data, config) {
						return this.request(utils.merge(config || {}, {
							method: method,
							url: url,
							data: data
						}));
					};
					axios[method] = bind(Axios.prototype[method], defaultInstance);
				});

				/***/
			},
			/* 2 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				var PROTECTION_PREFIX = /^\)\]\}',?\n/;
				var DEFAULT_CONTENT_TYPE = {
					'Content-Type': 'application/x-www-form-urlencoded'
				};

				module.exports = {
					transformRequest: [function transformResponseJSON(data, headers) {
						if (utils.isFormData(data)) {
							return data;
						}
						if (utils.isArrayBuffer(data)) {
							return data;
						}
						if (utils.isArrayBufferView(data)) {
							return data.buffer;
						}
						if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
							// Set application/json if no Content-Type has been specified
							if (!utils.isUndefined(headers)) {
								utils.forEach(headers, function processContentTypeHeader(val, key) {
									if (key.toLowerCase() === 'content-type') {
										headers['Content-Type'] = val;
									}
								});

								if (utils.isUndefined(headers['Content-Type'])) {
									headers['Content-Type'] = 'application/json;charset=utf-8';
								}
							}
							return (0, _stringify2.default)(data);
						}
						return data;
					}],

					transformResponse: [function transformResponseJSON(data) {
						/*eslint no-param-reassign:0*/
						if (typeof data === 'string') {
							data = data.replace(PROTECTION_PREFIX, '');
							try {
								data = JSON.parse(data);
							} catch (e) {/* Ignore */}
						}
						return data;
					}],

					headers: {
						common: {
							'Accept': 'application/json, text/plain, */*'
						},
						patch: utils.merge(DEFAULT_CONTENT_TYPE),
						post: utils.merge(DEFAULT_CONTENT_TYPE),
						put: utils.merge(DEFAULT_CONTENT_TYPE)
					},

					timeout: 0,

					xsrfCookieName: 'XSRF-TOKEN',
					xsrfHeaderName: 'X-XSRF-TOKEN'
				};

				/***/
			},
			/* 3 */
			/***/function (module, exports) {

				'use strict';

				/*global toString:true*/

				// utils is a library of generic helper functions non-specific to axios

				var toString = Object.prototype.toString;

				/**
	    * Determine if a value is an Array
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is an Array, otherwise false
	    */
				function isArray(val) {
					return toString.call(val) === '[object Array]';
				}

				/**
	    * Determine if a value is an ArrayBuffer
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	    */
				function isArrayBuffer(val) {
					return toString.call(val) === '[object ArrayBuffer]';
				}

				/**
	    * Determine if a value is a FormData
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is an FormData, otherwise false
	    */
				function isFormData(val) {
					return toString.call(val) === '[object FormData]';
				}

				/**
	    * Determine if a value is a view on an ArrayBuffer
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	    */
				function isArrayBufferView(val) {
					var result;
					if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
						result = ArrayBuffer.isView(val);
					} else {
						result = val && val.buffer && val.buffer instanceof ArrayBuffer;
					}
					return result;
				}

				/**
	    * Determine if a value is a String
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is a String, otherwise false
	    */
				function isString(val) {
					return typeof val === 'string';
				}

				/**
	    * Determine if a value is a Number
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is a Number, otherwise false
	    */
				function isNumber(val) {
					return typeof val === 'number';
				}

				/**
	    * Determine if a value is undefined
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if the value is undefined, otherwise false
	    */
				function isUndefined(val) {
					return typeof val === 'undefined';
				}

				/**
	    * Determine if a value is an Object
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is an Object, otherwise false
	    */
				function isObject(val) {
					return val !== null && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object';
				}

				/**
	    * Determine if a value is a Date
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is a Date, otherwise false
	    */
				function isDate(val) {
					return toString.call(val) === '[object Date]';
				}

				/**
	    * Determine if a value is a File
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is a File, otherwise false
	    */
				function isFile(val) {
					return toString.call(val) === '[object File]';
				}

				/**
	    * Determine if a value is a Blob
	    *
	    * @param {Object} val The value to test
	    * @returns {boolean} True if value is a Blob, otherwise false
	    */
				function isBlob(val) {
					return toString.call(val) === '[object Blob]';
				}

				/**
	    * Trim excess whitespace off the beginning and end of a string
	    *
	    * @param {String} str The String to trim
	    * @returns {String} The String freed of excess whitespace
	    */
				function trim(str) {
					return str.replace(/^\s*/, '').replace(/\s*$/, '');
				}

				/**
	    * Determine if we're running in a standard browser environment
	    *
	    * This allows axios to run in a web worker, and react-native.
	    * Both environments support XMLHttpRequest, but not fully standard globals.
	    *
	    * web workers:
	    *  typeof window -> undefined
	    *  typeof document -> undefined
	    *
	    * react-native:
	    *  typeof document.createElement -> undefined
	    */
				function isStandardBrowserEnv() {
					return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.createElement === 'function';
				}

				/**
	    * Iterate over an Array or an Object invoking a function for each item.
	    *
	    * If `obj` is an Array callback will be called passing
	    * the value, index, and complete array for each item.
	    *
	    * If 'obj' is an Object callback will be called passing
	    * the value, key, and complete object for each property.
	    *
	    * @param {Object|Array} obj The object to iterate
	    * @param {Function} fn The callback to invoke for each item
	    */
				function forEach(obj, fn) {
					// Don't bother if no value provided
					if (obj === null || typeof obj === 'undefined') {
						return;
					}

					// Force an array if not already something iterable
					if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' && !isArray(obj)) {
						/*eslint no-param-reassign:0*/
						obj = [obj];
					}

					if (isArray(obj)) {
						// Iterate over array values
						for (var i = 0, l = obj.length; i < l; i++) {
							fn.call(null, obj[i], i, obj);
						}
					} else {
						// Iterate over object keys
						for (var key in obj) {
							if (obj.hasOwnProperty(key)) {
								fn.call(null, obj[key], key, obj);
							}
						}
					}
				}

				/**
	    * Accepts varargs expecting each argument to be an object, then
	    * immutably merges the properties of each object and returns result.
	    *
	    * When multiple objects contain the same key the later object in
	    * the arguments list will take precedence.
	    *
	    * Example:
	    *
	    * ```js
	    * var result = merge({foo: 123}, {foo: 456});
	    * console.log(result.foo); // outputs 456
	    * ```
	    *
	    * @param {Object} obj1 Object to merge
	    * @returns {Object} Result of all merge properties
	    */
				function merge() /* obj1, obj2, obj3, ... */{
					var result = {};
					function assignValue(val, key) {
						if ((0, _typeof3.default)(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
							result[key] = merge(result[key], val);
						} else {
							result[key] = val;
						}
					}

					for (var i = 0, l = arguments.length; i < l; i++) {
						forEach(arguments[i], assignValue);
					}
					return result;
				}

				module.exports = {
					isArray: isArray,
					isArrayBuffer: isArrayBuffer,
					isFormData: isFormData,
					isArrayBufferView: isArrayBufferView,
					isString: isString,
					isNumber: isNumber,
					isObject: isObject,
					isUndefined: isUndefined,
					isDate: isDate,
					isFile: isFile,
					isBlob: isBlob,
					isStandardBrowserEnv: isStandardBrowserEnv,
					forEach: forEach,
					merge: merge,
					trim: trim
				};

				/***/
			},
			/* 4 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				/**
	    * Dispatch a request to the server using whichever adapter
	    * is supported by the current environment.
	    *
	    * @param {object} config The config that is to be used for the request
	    * @returns {Promise} The Promise to be fulfilled
	    */

				module.exports = function dispatchRequest(config) {
					return new _promise2.default(function executor(resolve, reject) {
						try {
							var adapter;

							if (typeof config.adapter === 'function') {
								// For custom adapter support
								adapter = config.adapter;
							} else if (typeof XMLHttpRequest !== 'undefined') {
								// For browsers use XHR adapter
								adapter = __webpack_require__(5);
							} else if (typeof process !== 'undefined') {
								// For node use HTTP adapter
								adapter = __webpack_require__(5);
							}

							if (typeof adapter === 'function') {
								adapter(resolve, reject, config);
							}
						} catch (e) {
							reject(e);
						}
					});
				};

				/***/
			},
			/* 5 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);
				var buildURL = __webpack_require__(6);
				var parseHeaders = __webpack_require__(7);
				var transformData = __webpack_require__(8);
				var isURLSameOrigin = __webpack_require__(9);
				var btoa = window.btoa || __webpack_require__(10);

				module.exports = function xhrAdapter(resolve, reject, config) {
					var requestData = config.data;
					var requestHeaders = config.headers;

					if (utils.isFormData(requestData)) {
						delete requestHeaders['Content-Type']; // Let the browser set it
					}

					var request = new XMLHttpRequest();

					// For IE 8/9 CORS support
					// Only supports POST and GET calls and doesn't returns the response headers.
					if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
						request = new window.XDomainRequest();
					}

					// HTTP basic authentication
					if (config.auth) {
						var username = config.auth.username || '';
						var password = config.auth.password || '';
						requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
					}

					request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

					// Set the request timeout in MS
					request.timeout = config.timeout;

					// Listen for ready state
					request.onload = function handleLoad() {
						if (!request) {
							return;
						}
						// Prepare the response
						var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
						var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
						var response = {
							data: transformData(responseData, responseHeaders, config.transformResponse),
							// IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
							status: request.status === 1223 ? 204 : request.status,
							statusText: request.status === 1223 ? 'No Content' : request.statusText,
							headers: responseHeaders,
							config: config
						};

						// Resolve or reject the Promise based on the status
						(response.status >= 200 && response.status < 300 || !('status' in request) && response.responseText ? resolve : reject)(response);

						// Clean up request
						request = null;
					};

					// Handle low level network errors
					request.onerror = function handleError() {
						// Real errors are hidden from us by the browser
						// onerror should only fire if it's a network error
						reject(new Error('Network Error'));

						// Clean up request
						request = null;
					};

					// Add xsrf header
					// This is only done if running in a standard browser environment.
					// Specifically not if we're in a web worker, or react-native.
					if (utils.isStandardBrowserEnv()) {
						var cookies = __webpack_require__(11);

						// Add xsrf header
						var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ? cookies.read(config.xsrfCookieName) : undefined;

						if (xsrfValue) {
							requestHeaders[config.xsrfHeaderName] = xsrfValue;
						}
					}

					// Add headers to the request
					if ('setRequestHeader' in request) {
						utils.forEach(requestHeaders, function setRequestHeader(val, key) {
							if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
								// Remove Content-Type if data is undefined
								delete requestHeaders[key];
							} else {
								// Otherwise add header to the request
								request.setRequestHeader(key, val);
							}
						});
					}

					// Add withCredentials to request if needed
					if (config.withCredentials) {
						request.withCredentials = true;
					}

					// Add responseType to request if needed
					if (config.responseType) {
						try {
							request.responseType = config.responseType;
						} catch (e) {
							if (request.responseType !== 'json') {
								throw e;
							}
						}
					}

					if (utils.isArrayBuffer(requestData)) {
						requestData = new DataView(requestData);
					}

					// Send the request
					request.send(requestData);
				};

				/***/
			},
			/* 6 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				function encode(val) {
					return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
				}

				/**
	    * Build a URL by appending params to the end
	    *
	    * @param {string} url The base of the url (e.g., http://www.google.com)
	    * @param {object} [params] The params to be appended
	    * @returns {string} The formatted url
	    */
				module.exports = function buildURL(url, params, paramsSerializer) {
					/*eslint no-param-reassign:0*/
					if (!params) {
						return url;
					}

					var serializedParams;
					if (paramsSerializer) {
						serializedParams = paramsSerializer(params);
					} else {
						var parts = [];

						utils.forEach(params, function serialize(val, key) {
							if (val === null || typeof val === 'undefined') {
								return;
							}

							if (utils.isArray(val)) {
								key = key + '[]';
							}

							if (!utils.isArray(val)) {
								val = [val];
							}

							utils.forEach(val, function parseValue(v) {
								if (utils.isDate(v)) {
									v = v.toISOString();
								} else if (utils.isObject(v)) {
									v = (0, _stringify2.default)(v);
								}
								parts.push(encode(key) + '=' + encode(v));
							});
						});

						serializedParams = parts.join('&');
					}

					if (serializedParams) {
						url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
					}

					return url;
				};

				/***/
			},
			/* 7 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				/**
	    * Parse headers into an object
	    *
	    * ```
	    * Date: Wed, 27 Aug 2014 08:58:49 GMT
	    * Content-Type: application/json
	    * Connection: keep-alive
	    * Transfer-Encoding: chunked
	    * ```
	    *
	    * @param {String} headers Headers needing to be parsed
	    * @returns {Object} Headers parsed into an object
	    */
				module.exports = function parseHeaders(headers) {
					var parsed = {};
					var key;
					var val;
					var i;

					if (!headers) {
						return parsed;
					}

					utils.forEach(headers.split('\n'), function parser(line) {
						i = line.indexOf(':');
						key = utils.trim(line.substr(0, i)).toLowerCase();
						val = utils.trim(line.substr(i + 1));

						if (key) {
							parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
						}
					});

					return parsed;
				};

				/***/
			},
			/* 8 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				/**
	    * Transform the data for a request or a response
	    *
	    * @param {Object|String} data The data to be transformed
	    * @param {Array} headers The headers for the request or response
	    * @param {Array|Function} fns A single function or Array of functions
	    * @returns {*} The resulting transformed data
	    */
				module.exports = function transformData(data, headers, fns) {
					/*eslint no-param-reassign:0*/
					utils.forEach(fns, function transform(fn) {
						data = fn(data, headers);
					});

					return data;
				};

				/***/
			},
			/* 9 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				module.exports = utils.isStandardBrowserEnv() ?

				// Standard browser envs have full support of the APIs needed to test
				// whether the request URL is of the same origin as current location.
				function standardBrowserEnv() {
					var msie = /(msie|trident)/i.test(navigator.userAgent);
					var urlParsingNode = document.createElement('a');
					var originURL;

					/**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
					function resolveURL(url) {
						var href = url;

						if (msie) {
							// IE needs attribute set twice to normalize properties
							urlParsingNode.setAttribute('href', href);
							href = urlParsingNode.href;
						}

						urlParsingNode.setAttribute('href', href);

						// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
						return {
							href: urlParsingNode.href,
							protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
							host: urlParsingNode.host,
							search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
							hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
							hostname: urlParsingNode.hostname,
							port: urlParsingNode.port,
							pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
						};
					}

					originURL = resolveURL(window.location.href);

					/**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
					return function isURLSameOrigin(requestURL) {
						var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
						return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
					};
				}() :

				// Non standard browser envs (web workers, react-native) lack needed support.
				function nonStandardBrowserEnv() {
					return function isURLSameOrigin() {
						return true;
					};
				}();

				/***/
			},
			/* 10 */
			/***/function (module, exports) {

				'use strict';

				// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

				var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

				function InvalidCharacterError(message) {
					this.message = message;
				}
				InvalidCharacterError.prototype = new Error();
				InvalidCharacterError.prototype.code = 5;
				InvalidCharacterError.prototype.name = 'InvalidCharacterError';

				function btoa(input) {
					var str = String(input);
					var output = '';
					for (
					// initialize result and counter
					var block, charCode, idx = 0, map = chars;
					// if the next str index does not exist:
					//   change the mapping table to "="
					//   check if d has no fractional digits
					str.charAt(idx | 0) || (map = '=', idx % 1);
					// "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
					output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
						charCode = str.charCodeAt(idx += 3 / 4);
						if (charCode > 0xFF) {
							throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
						}
						block = block << 8 | charCode;
					}
					return output;
				}

				module.exports = btoa;

				/***/
			},
			/* 11 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				module.exports = utils.isStandardBrowserEnv() ?

				// Standard browser envs support document.cookie
				function standardBrowserEnv() {
					return {
						write: function write(name, value, expires, path, domain, secure) {
							var cookie = [];
							cookie.push(name + '=' + encodeURIComponent(value));

							if (utils.isNumber(expires)) {
								cookie.push('expires=' + new Date(expires).toGMTString());
							}

							if (utils.isString(path)) {
								cookie.push('path=' + path);
							}

							if (utils.isString(domain)) {
								cookie.push('domain=' + domain);
							}

							if (secure === true) {
								cookie.push('secure');
							}

							document.cookie = cookie.join('; ');
						},

						read: function read(name) {
							var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
							return match ? decodeURIComponent(match[3]) : null;
						},

						remove: function remove(name) {
							this.write(name, '', Date.now() - 86400000);
						}
					};
				}() :

				// Non standard browser env (web workers, react-native) lack needed support.
				function nonStandardBrowserEnv() {
					return {
						write: function write() {},
						read: function read() {
							return null;
						},
						remove: function remove() {}
					};
				}();

				/***/
			},
			/* 12 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				var utils = __webpack_require__(3);

				function InterceptorManager() {
					this.handlers = [];
				}

				/**
	    * Add a new interceptor to the stack
	    *
	    * @param {Function} fulfilled The function to handle `then` for a `Promise`
	    * @param {Function} rejected The function to handle `reject` for a `Promise`
	    *
	    * @return {Number} An ID used to remove interceptor later
	    */
				InterceptorManager.prototype.use = function use(fulfilled, rejected) {
					this.handlers.push({
						fulfilled: fulfilled,
						rejected: rejected
					});
					return this.handlers.length - 1;
				};

				/**
	    * Remove an interceptor from the stack
	    *
	    * @param {Number} id The ID that was returned by `use`
	    */
				InterceptorManager.prototype.eject = function eject(id) {
					if (this.handlers[id]) {
						this.handlers[id] = null;
					}
				};

				/**
	    * Iterate over all the registered interceptors
	    *
	    * This method is particularly useful for skipping over any
	    * interceptors that may have become `null` calling `eject`.
	    *
	    * @param {Function} fn The function to call for each interceptor
	    */
				InterceptorManager.prototype.forEach = function forEach(fn) {
					utils.forEach(this.handlers, function forEachHandler(h) {
						if (h !== null) {
							fn(h);
						}
					});
				};

				module.exports = InterceptorManager;

				/***/
			},
			/* 13 */
			/***/function (module, exports) {

				'use strict';

				/**
	    * Determines whether the specified URL is absolute
	    *
	    * @param {string} url The URL to test
	    * @returns {boolean} True if the specified URL is absolute, otherwise false
	    */

				module.exports = function isAbsoluteURL(url) {
					// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
					// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
					// by any combination of letters, digits, plus, period, or hyphen.
					return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
					);
				};

				/***/
			},
			/* 14 */
			/***/function (module, exports) {

				'use strict';

				/**
	    * Creates a new URL by combining the specified URLs
	    *
	    * @param {string} baseURL The base URL
	    * @param {string} relativeURL The relative URL
	    * @returns {string} The combined URL
	    */

				module.exports = function combineURLs(baseURL, relativeURL) {
					return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
				};

				/***/
			},
			/* 15 */
			/***/function (module, exports) {

				'use strict';

				module.exports = function bind(fn, thisArg) {
					return function wrap() {
						var args = new Array(arguments.length);
						for (var i = 0; i < args.length; i++) {
							args[i] = arguments[i];
						}
						return fn.apply(thisArg, args);
					};
				};

				/***/
			},
			/* 16 */
			/***/function (module, exports) {

				'use strict';

				/**
	    * Syntactic sugar for invoking a function and expanding an array for arguments.
	    *
	    * Common use case would be to use `Function.prototype.apply`.
	    *
	    *  ```js
	    *  function f(x, y, z) {}
	    *  var args = [1, 2, 3];
	    *  f.apply(null, args);
	    *  ```
	    *
	    * With `spread` this example can be re-written.
	    *
	    *  ```js
	    *  spread(function(x, y, z) {})([1, 2, 3]);
	    *  ```
	    *
	    * @param {Function} callback
	    * @returns {Function}
	    */

				module.exports = function spread(callback) {
					return function wrap(arr) {
						return callback.apply(null, arr);
					};
				};

				/***/
			}
			/******/])
		);
	});
	;
	//# sourceMappingURL=axios.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(6);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(33);
	__webpack_require__(40);
	module.exports = __webpack_require__(6).Promise;

/***/ },
/* 9 */
/***/ function(module, exports) {

	

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(11)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(14)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(12)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(15)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(20)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(27)
	  , $iterCreate    = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(29)
	  , getProto       = __webpack_require__(22).getProto
	  , ITERATOR       = __webpack_require__(30)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(19);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(22)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(22)
	  , descriptor     = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(29)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(30)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).setDesc
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(30)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(31)('wks')
	  , uid    = __webpack_require__(32)
	  , Symbol = __webpack_require__(17).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(17)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	var Iterators = __webpack_require__(27);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(35)
	  , step             = __webpack_require__(36)
	  , Iterators        = __webpack_require__(27)
	  , toIObject        = __webpack_require__(37);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(14)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(22)
	  , LIBRARY    = __webpack_require__(15)
	  , global     = __webpack_require__(17)
	  , ctx        = __webpack_require__(18)
	  , classof    = __webpack_require__(41)
	  , $export    = __webpack_require__(16)
	  , isObject   = __webpack_require__(42)
	  , anObject   = __webpack_require__(43)
	  , aFunction  = __webpack_require__(19)
	  , strictNew  = __webpack_require__(44)
	  , forOf      = __webpack_require__(45)
	  , setProto   = __webpack_require__(50).set
	  , same       = __webpack_require__(51)
	  , SPECIES    = __webpack_require__(30)('species')
	  , speciesConstructor = __webpack_require__(52)
	  , asap       = __webpack_require__(53)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , empty      = function(){ /* empty */ }
	  , Wrapper;

	var testResolve = function(sub){
	  var test = new P(empty), promise;
	  if(sub)test.constructor = function(exec){
	    exec(empty, empty);
	  };
	  (promise = P.resolve(test))['catch'](empty);
	  return promise === test;
	};

	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(24)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(58)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(29)(P, PROMISE);
	__webpack_require__(59)(PROMISE);
	Wrapper = __webpack_require__(6)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(60)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(30)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(18)
	  , call        = __webpack_require__(46)
	  , isArrayIter = __webpack_require__(47)
	  , anObject    = __webpack_require__(43)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(49);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(43);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(27)
	  , ITERATOR   = __webpack_require__(30)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(12)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(41)
	  , ITERATOR  = __webpack_require__(30)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(22).getDesc
	  , isObject = __webpack_require__(42)
	  , anObject = __webpack_require__(43);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(18)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(43)
	  , aFunction = __webpack_require__(19)
	  , SPECIES   = __webpack_require__(30)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , macrotask = __webpack_require__(54).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(39)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(18)
	  , invoke             = __webpack_require__(55)
	  , html               = __webpack_require__(56)
	  , cel                = __webpack_require__(57)
	  , global             = __webpack_require__(17)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(39)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).document && document.documentElement;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42)
	  , document = __webpack_require__(17).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(20);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(6)
	  , $           = __webpack_require__(22)
	  , DESCRIPTORS = __webpack_require__(24)
	  , SPECIES     = __webpack_require__(30)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(30)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _symbol = __webpack_require__(62);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof _Symbol !== "undefined" && obj.constructor === _Symbol ? "symbol" : typeof obj; }

	exports.default = function (obj) {
	  return obj && typeof _symbol2.default !== "undefined" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(9);
	module.exports = __webpack_require__(6).Symbol;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(22)
	  , global         = __webpack_require__(17)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(20)
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(29)
	  , uid            = __webpack_require__(32)
	  , wks            = __webpack_require__(30)
	  , keyOf          = __webpack_require__(65)
	  , $names         = __webpack_require__(66)
	  , enumKeys       = __webpack_require__(67)
	  , isArray        = __webpack_require__(68)
	  , anObject       = __webpack_require__(43)
	  , toIObject      = __webpack_require__(37)
	  , createDesc     = __webpack_require__(23)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(15)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(22)
	  , toIObject = __webpack_require__(37);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , getNames  = __webpack_require__(22).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(22);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createClient;

	var _defaults = __webpack_require__(70);

	var _defaults2 = _interopRequireDefault(_defaults);

	var _assign = __webpack_require__(103);

	var _assign2 = _interopRequireDefault(_assign);

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _version = __webpack_require__(165);

	var _version2 = _interopRequireDefault(_version);

	var _createHttpClient = __webpack_require__(166);

	var _createHttpClient2 = _interopRequireDefault(_createHttpClient);

	var _wrapHttpClient = __webpack_require__(179);

	var _wrapHttpClient2 = _interopRequireDefault(_wrapHttpClient);

	var _createContentfulApi = __webpack_require__(219);

	var _createContentfulApi2 = _interopRequireDefault(_createContentfulApi);

	var _createLinkResolver = __webpack_require__(289);

	var _createLinkResolver2 = _interopRequireDefault(_createLinkResolver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Create a client instance
	 * @func
	 * @name createClient
	 * @memberof contentful
	 * @param {Object} params - Client initialization parameters
	 * @prop {string} params.space - Space ID
	 * @prop {string} params.accessToken - Contentful CDA Access Token
	 * @prop {boolean=} params.insecure - Requests will be made over http instead of the default https (default: true)
	 * @prop {string=} params.host - API host (default: cdn.contentful.com). Also usable with preview.contentful.com.
	 * @prop {Object=} params.agent - Optional Node.js HTTP agent for proxying (see <a href="https://nodejs.org/api/http.html#http_class_http_agent">Node.js docs</a> and <a href="https://www.npmjs.com/package/https-proxy-agent">https-proxy-agent</a>)
	 * @prop {Object=} params.headers - Optional additional headers
	 * @prop {number=} params.concurrency - Number of allowed concurrent requests. Changing this value is not recommended. (default: 6)
	 * @prop {number=} params.delay - Delay in milliseconds for waiting after hitting the allowed number of concurrent requests. Changing this value is not recommended. (default: 1000)
	 * @prop {number=} params.maxRetries - Maximum number of retries when a 429 is received (default: 5)
	 * @prop {boolean=} params.retryOnTooManyRequests - If we should retry on 429s (default: true)
	 * @prop {boolean=} params.resolveLinks - If we should resolve links between entries  
	 * @returns {ContentfulClientAPI.ClientAPI}
	 * @example
	 * const client = contentful.createClient({
	 *  accessToken: 'myAccessToken',
	 *  space: 'mySpaceId'
	 * })
	 */
	/**
	 * Contentful Delivery API SDK. Allows you to create instances of a client
	 * with access to the Contentful Content Delivery API.
	 * @namespace contentful
	 * @see ContentfulClientAPI
	 */

	function createClient(axios, params) {
	  params = (0, _defaults2.default)((0, _cloneDeep2.default)(params), {
	    rateLimit: 9,
	    rateLimitPeriod: 1000,
	    maxRetries: 5,
	    retryOnTooManyRequests: true
	  });

	  if (!params.accessToken) {
	    throw new TypeError('Expected parameter accessToken');
	  }

	  if (!params.space) {
	    throw new TypeError('Expected parameter space');
	  }

	  // Use resolveLinks param if specified, otherwise default to true
	  var resolveLinks = !!('resolveLinks' in params ? params.resolveLinks : true);
	  var shouldLinksResolve = (0, _createLinkResolver2.default)(resolveLinks);

	  params.defaultHostname = 'cdn.contentful.com';
	  params.headers = (0, _assign2.default)(params.headers, {
	    'Content-Type': 'application/vnd.contentful.delivery.v1+json',
	    'X-Contentful-User-Agent': 'contentful.js/' + _version2.default
	  });

	  var http = (0, _wrapHttpClient2.default)((0, _createHttpClient2.default)(axios, params), {
	    concurrency: params.rateLimit,
	    delay: params.rateLimitPeriod,
	    maxRetries: params.maxRetries,
	    retryOnTooManyRequests: params.retryOnTooManyRequests
	  });

	  return (0, _createContentfulApi2.default)({
	    http: http,
	    shouldLinksResolve: shouldLinksResolve
	  });
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(71),
	    assignInDefaults = __webpack_require__(72),
	    assignInWith = __webpack_require__(74),
	    rest = __webpack_require__(86);

	/**
	 * Assigns own and inherited enumerable properties of source objects to the
	 * destination object for all destination properties that resolve to `undefined`.
	 * Source objects are applied from left to right. Once a property is set,
	 * additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var defaults = rest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});

	module.exports = defaults;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(73);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}

	module.exports = assignInDefaults;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(75),
	    createAssigner = __webpack_require__(77),
	    keysIn = __webpack_require__(89);

	/**
	 * This method is like `_.assignIn` except that it accepts `customizer` which
	 * is invoked to produce the assigned values. If `customizer` returns `undefined`
	 * assignment is handled by the method instead. The `customizer` is invoked
	 * with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObjectWith(source, keysIn(source), object, customizer);
	});

	module.exports = assignInWith;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(76);

	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObjectWith;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(73);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if ((!eq(objValue, value) ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(78),
	    rest = __webpack_require__(86);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(73),
	    isArrayLike = __webpack_require__(79),
	    isIndex = __webpack_require__(85),
	    isObject = __webpack_require__(83);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(80),
	    isFunction = __webpack_require__(82),
	    isLength = __webpack_require__(84);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(81);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(83);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(71),
	    toInteger = __webpack_require__(87);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(88);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(82),
	    isObject = __webpack_require__(83);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(90),
	    indexKeys = __webpack_require__(95),
	    isIndex = __webpack_require__(85),
	    isPrototype = __webpack_require__(102);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(91),
	    iteratorToArray = __webpack_require__(94);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}

	module.exports = baseKeysIn;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(92);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(93);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }())))

/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	module.exports = iteratorToArray;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(96),
	    isArguments = __webpack_require__(97),
	    isArray = __webpack_require__(100),
	    isLength = __webpack_require__(84),
	    isString = __webpack_require__(101);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(98);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(79),
	    isObjectLike = __webpack_require__(99);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(100),
	    isObjectLike = __webpack_require__(99);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(104),
	    createAssigner = __webpack_require__(77),
	    keys = __webpack_require__(105);

	/**
	 * Assigns own enumerable properties of source objects to the destination
	 * object. Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  copyObject(source, keys(source), object);
	});

	module.exports = assign;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(75);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}

	module.exports = copyObject;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(106),
	    baseKeys = __webpack_require__(107),
	    indexKeys = __webpack_require__(95),
	    isArrayLike = __webpack_require__(79),
	    isIndex = __webpack_require__(85),
	    isPrototype = __webpack_require__(102);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}

	module.exports = baseHas;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(109);

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true);
	}

	module.exports = cloneDeep;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(110),
	    arrayEach = __webpack_require__(138),
	    assignValue = __webpack_require__(76),
	    baseAssign = __webpack_require__(139),
	    baseForOwn = __webpack_require__(140),
	    copyArray = __webpack_require__(143),
	    copySymbols = __webpack_require__(144),
	    getTag = __webpack_require__(146),
	    initCloneArray = __webpack_require__(148),
	    initCloneByTag = __webpack_require__(149),
	    initCloneObject = __webpack_require__(163),
	    isArray = __webpack_require__(100),
	    isHostObject = __webpack_require__(126),
	    isObject = __webpack_require__(83);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[mapTag] = cloneableTags[numberTag] =
	cloneableTags[objectTag] = cloneableTags[regexpTag] =
	cloneableTags[setTag] = cloneableTags[stringTag] =
	cloneableTags[symbolTag] = cloneableTags[uint8Tag] =
	cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] =
	cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    assignValue(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
	  });
	  return isArr ? result : copySymbols(value, result);
	}

	module.exports = baseClone;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(111),
	    stackDelete = __webpack_require__(112),
	    stackGet = __webpack_require__(115),
	    stackHas = __webpack_require__(117),
	    stackSet = __webpack_require__(119);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(113);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(114);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(73);

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(116);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(114);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(118);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(114);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(120),
	    assocSet = __webpack_require__(136);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(121),
	    mapDelete = __webpack_require__(128),
	    mapGet = __webpack_require__(132),
	    mapHas = __webpack_require__(134),
	    mapSet = __webpack_require__(135);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(122),
	    Map = __webpack_require__(127);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = { 'hash': new Hash, 'map': Map ? new Map : [], 'string': new Hash };
	}

	module.exports = mapClear;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(123);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(124);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(125);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(82),
	    isHostObject = __webpack_require__(126),
	    isObjectLike = __webpack_require__(99);

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.exports = isNative;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(124),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(127),
	    assocDelete = __webpack_require__(113),
	    hashDelete = __webpack_require__(129),
	    isKeyable = __webpack_require__(131);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(130);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(123);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;


/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value !== '__proto__') || value == null;
	}

	module.exports = isKeyable;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(127),
	    assocGet = __webpack_require__(116),
	    hashGet = __webpack_require__(133),
	    isKeyable = __webpack_require__(131);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(123);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(127),
	    assocHas = __webpack_require__(118),
	    hashHas = __webpack_require__(130),
	    isKeyable = __webpack_require__(131);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(127),
	    assocSet = __webpack_require__(136),
	    hashSet = __webpack_require__(137),
	    isKeyable = __webpack_require__(131);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(114);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(123);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(104),
	    keys = __webpack_require__(105);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(141),
	    keys = __webpack_require__(105);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(142);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(104),
	    getSymbols = __webpack_require__(145);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 145 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function() {
	  return [];
	};

	module.exports = getSymbols;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(127),
	    Set = __webpack_require__(147);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps and sets. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '';

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps and sets.
	if ((Map && getTag(new Map) != mapTag) || (Set && getTag(new Set) != setTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      if (ctorString == mapCtorString) {
	        return mapTag;
	      }
	      if (ctorString == setCtorString) {
	        return setTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(124),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var cloneBuffer = __webpack_require__(150),
	    cloneMap = __webpack_require__(152),
	    cloneRegExp = __webpack_require__(156),
	    cloneSet = __webpack_require__(157),
	    cloneSymbol = __webpack_require__(160),
	    cloneTypedArray = __webpack_require__(162);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(151);

	/**
	 * Creates a clone of `buffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneBuffer(buffer) {
	  var Ctor = buffer.constructor,
	      result = new Ctor(buffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(buffer));
	  return result;
	}

	module.exports = cloneBuffer;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(92);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(153),
	    arrayReduce = __webpack_require__(154),
	    mapToArray = __webpack_require__(155);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  var Ctor = map.constructor;
	  return arrayReduce(mapToArray(map), addMapEntry, new Ctor);
	}

	module.exports = cloneMap;


/***/ },
/* 153 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 154 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 155 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var Ctor = regexp.constructor,
	      result = new Ctor(regexp.source, reFlags.exec(regexp));

	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(158),
	    arrayReduce = __webpack_require__(154),
	    setToArray = __webpack_require__(159);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  var Ctor = set.constructor;
	  return arrayReduce(setToArray(set), addSetEntry, new Ctor);
	}

	module.exports = cloneSet;


/***/ },
/* 158 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 159 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(161);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return Symbol ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(92);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var cloneBuffer = __webpack_require__(150);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = typedArray.buffer,
	      Ctor = typedArray.constructor;

	  return new Ctor(isDeep ? cloneBuffer(buffer) : buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(164),
	    isFunction = __webpack_require__(82),
	    isPrototype = __webpack_require__(102);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  if (isPrototype(object)) {
	    return {};
	  }
	  var Ctor = object.constructor;
	  return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
	}

	module.exports = initCloneObject;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(83);

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      object.prototype = prototype;
	      var result = new object;
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 165 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '3.8.1';

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray2 = __webpack_require__(167);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	exports.default = createHttpClient;

	var _qs = __webpack_require__(174);

	var _qs2 = _interopRequireDefault(_qs);

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _assign = __webpack_require__(103);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Create pre configured axios instance
	 * @private
	 * @param {Object} axios - Axios library
	 * @param {Object} httpClientParams - Initialization parameters for the HTTP client
	 * @prop {string} space - Space ID
	 * @prop {string} accessToken - Access Token
	 * @prop {boolean=} insecure - If we should use http instead
	 * @prop {string=} host - Alternate host
	 * @prop {Object=} agent - HTTP agent for node
	 * @prop {Object=} headers - Additional headers
	 * @return {Object} Initialized axios instance
	 */
	function createHttpClient(axios, httpClientParams) {
	  var space = httpClientParams.space,
	      accessToken = httpClientParams.accessToken,
	      insecure = httpClientParams.insecure,
	      host = httpClientParams.host,
	      defaultHostname = httpClientParams.defaultHostname,
	      agent = httpClientParams.agent;
	  var headers = httpClientParams.headers;

	  var _ref = host && host.split(':') || [],
	      _ref2 = (0, _slicedToArray3.default)(_ref, 2),
	      hostname = _ref2[0],
	      port = _ref2[1];

	  hostname = hostname || defaultHostname;
	  port = port || (insecure ? 80 : 443);
	  var baseURL = (insecure ? 'http' : 'https') + '://' + hostname + ':' + port + '/spaces/';
	  if (space) {
	    baseURL += space + '/';
	  }
	  headers = headers || {};
	  headers['Authorization'] = 'Bearer ' + accessToken;

	  // Set these headers only for node because browsers don't like it when you
	  // override user-agent or accept-encoding.
	  // The SDKs should set their own X-Contentful-User-Agent.
	  if (process && process.release && process.release.name === 'node') {
	    headers['user-agent'] = 'node.js/' + process.version;
	    headers['Accept-Encoding'] = 'gzip';
	  }

	  var instance = axios.create({
	    baseURL: baseURL,
	    headers: headers,
	    agent: agent,
	    paramsSerializer: _qs2.default.stringify
	  });
	  instance.httpClientParams = httpClientParams;

	  /**
	   * Creates a new axios instance with the same default base parameters as the
	   * current one, and with any overrides passed to the newParams object
	   * This is useful as the SDKs use dependency injection to get the axios library
	   * and the version of the library comes from different places depending
	   * on whether it's a browser build or a node.js build.
	   * @private
	   * @param {Object} httpClientParams - Initialization parameters for the HTTP client
	   * @return {Object} Initialized axios instance
	   */
	  instance.cloneWithNewParams = function (newParams) {
	    return createHttpClient(axios, (0, _assign2.default)((0, _cloneDeep2.default)(httpClientParams), newParams));
	  };

	  return instance;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(168);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(171);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	__webpack_require__(10);
	module.exports = __webpack_require__(170);

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(41)
	  , ITERATOR  = __webpack_require__(30)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(6).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(172), __esModule: true };

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	__webpack_require__(10);
	module.exports = __webpack_require__(173);

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(43)
	  , get      = __webpack_require__(49);
	module.exports = __webpack_require__(6).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stringify = __webpack_require__(175);
	var parse = __webpack_require__(178);
	var formats = __webpack_require__(177);

	module.exports = {
	    formats: formats,
	    parse: parse,
	    stringify: stringify
	};


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(176);
	var formats = __webpack_require__(177);

	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};

	var toISO = Date.prototype.toISOString;

	var defaults = {
	    delimiter: '&',
	    encode: true,
	    encoder: utils.encode,
	    serializeDate: function serializeDate(date) {
	        return toISO.call(date);
	    },
	    skipNulls: false,
	    strictNullHandling: false
	};

	var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter) {
	    var obj = object;
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = serializeDate(obj);
	    } else if (obj === null) {
	        if (strictNullHandling) {
	            return encoder ? encoder(prefix) : prefix;
	        }

	        obj = '';
	    }

	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
	        if (encoder) {
	            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
	        }
	        return [formatter(prefix) + '=' + formatter(String(obj))];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        if (Array.isArray(obj)) {
	            values = values.concat(stringify(
	                obj[key],
	                generateArrayPrefix(prefix, key),
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encoder,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter
	            ));
	        } else {
	            values = values.concat(stringify(
	                obj[key],
	                prefix + (allowDots ? '.' + key : '[' + key + ']'),
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encoder,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter
	            ));
	        }
	    }

	    return values;
	};

	module.exports = function (object, opts) {
	    var obj = object;
	    var options = opts || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
	    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
	    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
	    if (typeof options.format === 'undefined') {
	        options.format = formats.default;
	    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
	        throw new TypeError('Unknown format option provided.');
	    }
	    var formatter = formats.formatters[options.format];
	    var objKeys;
	    var filter;

	    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }

	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (Array.isArray(options.filter)) {
	        filter = options.filter;
	        objKeys = filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (sort) {
	        objKeys.sort(sort);
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        keys = keys.concat(stringify(
	            obj[key],
	            key,
	            generateArrayPrefix,
	            strictNullHandling,
	            skipNulls,
	            encoder,
	            filter,
	            sort,
	            allowDots,
	            serializeDate,
	            formatter
	        ));
	    }

	    return keys.join(delimiter);
	};


/***/ },
/* 176 */
/***/ function(module, exports) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	var hexTable = (function () {
	    var array = [];
	    for (var i = 0; i < 256; ++i) {
	        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	    }

	    return array;
	}());

	exports.arrayToObject = function (source, options) {
	    var obj = options && options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	exports.merge = function (target, source, options) {
	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else if (typeof target === 'object') {
	            target[source] = true;
	        } else {
	            return [target, source];
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        return [target].concat(source);
	    }

	    var mergeTarget = target;
	    if (Array.isArray(target) && !Array.isArray(source)) {
	        mergeTarget = exports.arrayToObject(target, options);
	    }

	    if (Array.isArray(target) && Array.isArray(source)) {
	        source.forEach(function (item, i) {
	            if (has.call(target, i)) {
	                if (target[i] && typeof target[i] === 'object') {
	                    target[i] = exports.merge(target[i], item, options);
	                } else {
	                    target.push(item);
	                }
	            } else {
	                target[i] = item;
	            }
	        });
	        return target;
	    }

	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];

	        if (Object.prototype.hasOwnProperty.call(acc, key)) {
	            acc[key] = exports.merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};

	exports.decode = function (str) {
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	exports.encode = function (str) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    var string = typeof str === 'string' ? str : String(str);

	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);

	        if (
	            c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A) // A-Z
	        ) {
	            out += string.charAt(i);
	            continue;
	        }

	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	exports.compact = function (obj, references) {
	    if (typeof obj !== 'object' || obj === null) {
	        return obj;
	    }

	    var refs = references || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0; i < obj.length; ++i) {
	            if (obj[i] && typeof obj[i] === 'object') {
	                compacted.push(exports.compact(obj[i], refs));
	            } else if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = Object.keys(obj);
	    keys.forEach(function (key) {
	        obj[key] = exports.compact(obj[key], refs);
	    });

	    return obj;
	};

	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	exports.isBuffer = function (obj) {
	    if (obj === null || typeof obj === 'undefined') {
	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};


/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';

	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;

	module.exports = {
	    'default': 'RFC3986',
	    formatters: {
	        RFC1738: function (value) {
	            return replace.call(value, percentTwenties, '+');
	        },
	        RFC3986: function (value) {
	            return value;
	        }
	    },
	    RFC1738: 'RFC1738',
	    RFC3986: 'RFC3986'
	};


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(176);

	var has = Object.prototype.hasOwnProperty;

	var defaults = {
	    allowDots: false,
	    allowPrototypes: false,
	    arrayLimit: 20,
	    decoder: utils.decode,
	    delimiter: '&',
	    depth: 5,
	    parameterLimit: 1000,
	    plainObjects: false,
	    strictNullHandling: false
	};

	var parseValues = function parseValues(str, options) {
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0; i < parts.length; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        var key, val;
	        if (pos === -1) {
	            key = options.decoder(part);
	            val = options.strictNullHandling ? null : '';
	        } else {
	            key = options.decoder(part.slice(0, pos));
	            val = options.decoder(part.slice(pos + 1));
	        }
	        if (has.call(obj, key)) {
	            obj[key] = [].concat(obj[key]).concat(val);
	        } else {
	            obj[key] = val;
	        }
	    }

	    return obj;
	};

	var parseObject = function parseObject(chain, val, options) {
	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(parseObject(chain, val, options));
	    } else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (
	            !isNaN(index) &&
	            root !== cleanRoot &&
	            String(index) === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays && index <= options.arrayLimit)
	        ) {
	            obj = [];
	            obj[index] = parseObject(chain, val, options);
	        } else {
	            obj[cleanRoot] = parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};

	var parseKeys = function parseKeys(givenKey, val, options) {
	    if (!givenKey) {
	        return;
	    }

	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && has.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return parseObject(keys, val, options);
	};

	module.exports = function (str, opts) {
	    var options = opts || {};

	    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }

	    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options);
	        obj = utils.merge(obj, newObj, options);
	    }

	    return utils.compact(obj);
	};


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = wrapHttpClient;

	var _reduce = __webpack_require__(180);

	var _reduce2 = _interopRequireDefault(_reduce);

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _rateLimit = __webpack_require__(216);

	var _rateLimit2 = _interopRequireDefault(_rateLimit);

	var _createBackoff = __webpack_require__(218);

	var _createBackoff2 = _interopRequireDefault(_createBackoff);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Wraps the http client with a rate limiter, and a backoff functionality.
	 * The rate limiter queues calls and attempts to prevent the server side rate
	 * limit from ever being hit.
	 * The backoff is triggered if a 429 Too Many Requests error is received from
	 * the server, and every time if it is received repeateadly the wait time
	 * for the next try will increase exponentially.
	 * @private
	 * @param {Object} http - HTTP Client instances
	 * @param {Object} options - Options for the wrapper methods
	 * @prop {number} concurrency - Number of allowed concurrent requests
	 * @prop {number} delay - Delay in milliseconds for waiting after hitting the
	 * allowed number of concurrent requests
	 * @prop {number} maxRetries - Maximum number of retries when a 429 is received
	 * @prop {boolean} retryOnTooManyRequests - If we should retry on 429s
	 */
	function wrapHttpClient(http, _ref) {
	  var concurrency = _ref.concurrency,
	      delay = _ref.delay,
	      maxRetries = _ref.maxRetries,
	      retryOnTooManyRequests = _ref.retryOnTooManyRequests;

	  return (0, _reduce2.default)(['get', 'post', 'put', 'delete', 'patch', 'head'], function (http, methodName) {
	    var httpCall = http[methodName].bind(http);
	    if (retryOnTooManyRequests) {
	      httpCall = maybeBackoff(httpCall, maxRetries);
	    }
	    http[methodName] = (0, _rateLimit2.default)(httpCall, concurrency, delay);
	    return http;
	  }, (0, _cloneDeep2.default)(http));
	}

	function maybeBackoff(fn, maxRetries) {
	  return function httpCall() {
	    var self = this;
	    self.backoff = self.backoff || (0, _createBackoff2.default)(maxRetries);
	    var args = Array.prototype.slice.call(arguments);
	    var response = fn.apply(self, args);

	    response = response.catch(function (error) {
	      // Rate-limited by the server, maybe backoff and retry
	      if (error.status === 429 || error.status >= 500) {
	        return self.backoff(error, function () {
	          return httpCall.apply(self, args);
	        });
	      }
	      throw error;
	    });

	    return response;
	  };
	}

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(154),
	    baseEach = __webpack_require__(181),
	    baseIteratee = __webpack_require__(183),
	    baseReduce = __webpack_require__(215),
	    isArray = __webpack_require__(100);

	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` through `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not provided the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;

	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}

	module.exports = reduce;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(140),
	    createBaseEach = __webpack_require__(182);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(79);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(184),
	    baseMatchesProperty = __webpack_require__(198),
	    identity = __webpack_require__(212),
	    isArray = __webpack_require__(100),
	    property = __webpack_require__(213);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value;
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(185),
	    getMatchData = __webpack_require__(193);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value &&
	        (value !== undefined || (key in Object(object)));
	    };
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(110),
	    baseIsEqual = __webpack_require__(186);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack,
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(187),
	    isObject = __webpack_require__(83),
	    isObjectLike = __webpack_require__(99);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(110),
	    equalArrays = __webpack_require__(188),
	    equalByTag = __webpack_require__(190),
	    equalObjects = __webpack_require__(191),
	    getTag = __webpack_require__(146),
	    isArray = __webpack_require__(100),
	    isHostObject = __webpack_require__(126),
	    isTypedArray = __webpack_require__(192);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
	  }
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	  if (!isPartial) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(189);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 189 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(161),
	    Uint8Array = __webpack_require__(151),
	    mapToArray = __webpack_require__(155),
	    setToArray = __webpack_require__(159);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
	  switch (tag) {
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      // Recursively compare objects (susceptible to call stack limits).
	      return (isPartial || object.size == other.size) &&
	        equalFunc(convert(object), convert(other), customizer, bitmask | UNORDERED_COMPARE_FLAG);

	    case symbolTag:
	      return !!Symbol && (symbolValueOf.call(object) == symbolValueOf.call(other));
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(106),
	    keys = __webpack_require__(105);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(84),
	    isObjectLike = __webpack_require__(99);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(194),
	    toPairs = __webpack_require__(195);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(83);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(196),
	    keys = __webpack_require__(105);

	/**
	 * Creates an array of own enumerable key-value pairs for `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.exports = toPairs;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(197);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(186),
	    get = __webpack_require__(199),
	    hasIn = __webpack_require__(206);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(200);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPath = __webpack_require__(201),
	    isKey = __webpack_require__(205);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseToPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(100),
	    stringToPath = __webpack_require__(202);

	/**
	 * The base implementation of `_.toPath` which only converts `value` to a
	 * path if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function baseToPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = baseToPath;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(203);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = stringToPath;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(161),
	    isSymbol = __webpack_require__(204);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toString;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(99);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(100);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) &&
	    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}

	module.exports = isKey;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(207),
	    hasPath = __webpack_require__(208);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 207 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPath = __webpack_require__(201),
	    isArguments = __webpack_require__(97),
	    isArray = __webpack_require__(100),
	    isIndex = __webpack_require__(85),
	    isKey = __webpack_require__(205),
	    isLength = __webpack_require__(84),
	    isString = __webpack_require__(101),
	    last = __webpack_require__(209),
	    parent = __webpack_require__(210);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseToPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || (
	    !!length && isLength(length) && isIndex(path, length) &&
	    (isArray(object) || isString(object) || isArguments(object))
	  );
	}

	module.exports = hasPath;


/***/ },
/* 209 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(211),
	    get = __webpack_require__(199);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ },
/* 211 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 212 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(81),
	    basePropertyDeep = __webpack_require__(214),
	    isKey = __webpack_require__(205);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(200);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 215 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}

	module.exports = baseReduce;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	exports.default = rateLimit;

	var _promisedWait = __webpack_require__(217);

	var _promisedWait2 = _interopRequireDefault(_promisedWait);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Promise-based rate limiting of a function. Assumes that the passed in
	 * function will return a Promise.
	 * Queues calls made to the wrapped function, and if more calls are made than
	 * the allowed level of concurrency waits until a certain amount of time has
	 * passed before continuing to clear calls from the queue.
	 * @private
	 * @param {Function} fn - call to be rate limited
	 * @param {number} concurrency - Number of allowed concurrent requests
	 * @param {number} delay - Delay in milliseconds for waiting after hitting the
	 */
	function rateLimit(fn, concurrency, delay) {
	  concurrency = positiveInteger('concurrency', concurrency);
	  delay = positiveInteger('delay', delay);
	  var callQueue = [];
	  var inFlight = 0;

	  function shift() {
	    if (inFlight >= concurrency) {
	      return;
	    }

	    var start = new Date().getTime();

	    if (callQueue.length) {
	      var call = callQueue.shift();
	      inFlight++;

	      var result = void 0;
	      try {
	        // call the wrapped method
	        var tmp = _promise2.default.resolve(fn.apply(call.self, call.args));
	        // resolve the call with a possibly rejected promise
	        call.resolve(tmp);
	        // rate-limiting doesn't care about errors
	        result = tmp.catch(function () {});
	      } catch (err) {
	        call.reject(err);
	        result = _promise2.default.resolve();
	      }

	      // If this request completed faster than our rate-limit would
	      // allow, wait the appropriate amount of time before marking the
	      // request as finished.
	      result.then(maybeWait).then(goToNextCall);
	    }

	    function maybeWait() {
	      var duration = start - new Date().getTime();
	      if (duration < delay) {
	        return (0, _promisedWait2.default)(delay - duration);
	      }
	    }
	  }

	  function goToNextCall() {
	    inFlight--;
	    shift();
	  }

	  return function () /* wrapped method arguments */{
	    var self = this;
	    var args = Array.prototype.slice.call(arguments);
	    return new _promise2.default(function (resolve, reject) {
	      callQueue.push({
	        reject: reject,
	        resolve: resolve,
	        self: self,
	        args: args
	      });
	      shift();
	    });
	  };
	}

	function positiveInteger(name, value) {
	  value = parseInt(value, 10);
	  if (isNaN(value) || value < 1) {
	    throw new TypeError(name + ' must be a positive integer');
	  }
	  return value;
	}

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	exports.default = promisedWait;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function promisedWait(ms) {
	  return new _promise2.default(function (resolve) {
	    setTimeout(resolve, ms || 3000);
	  });
	}

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	exports.default = createBackoff;

	var _promisedWait = __webpack_require__(217);

	var _promisedWait2 = _interopRequireDefault(_promisedWait);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns a wrapper method which waits a given amount of time before calling
	 * wrapped method.
	 * If the call to the wrapped method fails, retries `maxRetries` times, and if
	 * all those fail, it returns a rejected promise.
	 * @private
	 * @param {number} maxRetries - max number of retries before aborting
	 */
	function createBackoff(maxRetries) {
	  var attempt = 0;
	  return function maybeRetry(error, retry) {
	    if (attempt < maxRetries) {
	      var waitTime = error.headers && error.headers['X-Contentful-RateLimit-Reset'] || Math.pow(2, attempt);
	      attempt++;
	      // add a randomized buffer before recalling the api
	      // The random buffer ensure that not all the backed-off requests are resent at the same time
	      waitTime *= 1000 * (Math.random() * 1.2 + 1);
	      return (0, _promisedWait2.default)(waitTime).then(retry);
	    } else {
	      return _promise2.default.reject(error);
	    }
	  };
	}

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createContentfulApi;

	var _createRequestConfig = __webpack_require__(220);

	var _createRequestConfig2 = _interopRequireDefault(_createRequestConfig);

	var _entities = __webpack_require__(221);

	var _entities2 = _interopRequireDefault(_entities);

	var _pagedSync = __webpack_require__(285);

	var _pagedSync2 = _interopRequireDefault(_pagedSync);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creates API object with methods to access functionality from Contentful's
	 * Delivery API
	 * @private
	 * @param {Object} params - API initialization params
	 * @prop {Object} http - HTTP client instance
	 * @prop {Object} entities - Object with wrapper methods for each kind of entity
	 * @prop {Function} shouldLinksResolve - Link resolver preconfigured with global setting
	 * @return {ClientAPI}
	 */
	function createContentfulApi(_ref) {
	  var http = _ref.http,
	      shouldLinksResolve = _ref.shouldLinksResolve;
	  var wrapSpace = _entities2.default.space.wrapSpace;
	  var _entities$contentType = _entities2.default.contentType,
	      wrapContentType = _entities$contentType.wrapContentType,
	      wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
	  var _entities$entry = _entities2.default.entry,
	      wrapEntry = _entities$entry.wrapEntry,
	      wrapEntryCollection = _entities$entry.wrapEntryCollection;
	  var _entities$asset = _entities2.default.asset,
	      wrapAsset = _entities$asset.wrapAsset,
	      wrapAssetCollection = _entities$asset.wrapAssetCollection;


	  function errorHandler(error) {
	    if (error.data) {
	      throw error.data;
	    }
	    throw error;
	  }

	  /**
	   * Gets the Space which the client is currently configured to use
	   * @memberof ContentfulClientAPI
	   * @return {Promise<Entities.Space>} Promise for a Space
	   * @example
	   * client.getSpace()
	   * .then(space => console.log(space))
	   */
	  function getSpace() {
	    return http.get('').then(function (response) {
	      return wrapSpace(response.data);
	    }, errorHandler);
	  }

	  /**
	   * Gets a Content Type
	   * @memberof ContentfulClientAPI
	   * @param  {string} id
	   * @return {Promise<Entities.ContentType>} Promise for a Content Type
	   * @example
	   * client.getContentType('contentTypeId')
	   * .then(contentType => console.log(contentType))
	   */
	  function getContentType(id) {
	    return http.get('content_types/' + id).then(function (response) {
	      return wrapContentType(response.data);
	    }, errorHandler);
	  }

	  /**
	   * Gets a collection of Content Types
	   * @memberof ContentfulClientAPI
	   * @param  {Object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
	   * @return {Promise<Entities.ContentTypeCollection>} Promise for a collection of Content Types
	   * @example
	   * client.getContentTypes()
	   * .then(contentTypes => console.log(contentTypes.items))
	   */
	  function getContentTypes() {
	    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    return http.get('content_types', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
	      return wrapContentTypeCollection(response.data);
	    }, errorHandler);
	  }

	  /**
	   * Gets an Entry
	   * @memberof ContentfulClientAPI
	   * @param  {string} id
	   * @param  {Object=} query - Object with search parameters. In this method it's only useful for `locale`.
	   * @return {Promise<Entities.Entry>} Promise for an Entry
	   * @example
	   * client.getEntry('entryId')
	   * .then(entry => console.log(entry))
	   */
	  function getEntry(id) {
	    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    normalizeSelect(query);
	    return http.get('entries/' + id, (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
	      return wrapEntry(response.data);
	    }, errorHandler);
	  }

	  /**
	   * Gets a collection of Entries
	   * @memberof ContentfulClientAPI
	   * @param  {Object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
	   * @param  {boolean=} query.resolveLinks - When true, links to other Entries or Assets are resolved. Default: true.
	   * @return {Promise<Entities.EntryCollection>} Promise for a collection of Entries
	   * @example
	   * client.getEntries({content_type: 'contentTypeId'})
	   * .then(entries => console.log(entries.items))
	   */
	  function getEntries() {
	    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var resolveLinks = shouldLinksResolve(query);
	    var resolveForAllLocales = query.locale && query.locale === '*';
	    normalizeSelect(query);
	    return http.get('entries', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
	      return wrapEntryCollection(response.data, resolveLinks, resolveForAllLocales);
	    }, errorHandler);
	  }
	  /**
	   * Gets an Asset
	   * @memberof ContentfulClientAPI
	   * @param  {string} id
	   * @param  {Object=} query - Object with search parameters. In this method it's only useful for `locale`.
	   * @return {Promise<Entities.Asset>} Promise for an Asset
	   * @example
	   * client.getAsset('assetId')
	   * .then(asset => console.log(asset))
	   */
	  function getAsset(id) {
	    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    normalizeSelect(query);
	    return http.get('assets/' + id, (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
	      return wrapAsset(response.data);
	    }, errorHandler);
	  }

	  /**
	   * Gets a collection of Assets
	   * @memberof ContentfulClientAPI
	   * @param  {Object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
	   * @return {Promise<Entities.AssetCollection>} Promise for a collection of Assets
	   * @example
	   * client.getAssets()
	   * .then(assets => console.log(assets.items))
	   */
	  function getAssets() {
	    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    normalizeSelect(query);
	    return http.get('assets', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
	      return wrapAssetCollection(response.data);
	    }, errorHandler);
	  }

	  /**
	   * Synchronizes either all the content or only new content since last sync
	   * See <a href="https://www.contentful.com/developers/docs/concepts/sync/">Synchronization</a> for more information.
	   * <strong> Important note: </strong> The the sync api endpoint does not support include or link resolution.
	   * However contentful.js is doing link resolution client side if you only make an initial sync.
	   * For the delta sync (using nextSyncToken) it is not possible since the sdk wont have access to all the data to make such an operation.
	   * @memberof ContentfulClientAPI
	   * @param  {Object} query - Query object for the sync call. One of initial or nextSyncToken always needs to be specified, but not both.
	   * @param  {boolean?} query.initial - Indicates if this is the first sync. Use it if you don't have a sync token.
	   * @param  {string?} query.nextSyncToken - The token you got the last time you used this method. Ensures you only get changed content.
	   * @param  {string=} query.type - Filter by this type (Entry or Asset)
	   * @param  {string=} query.content_type - Filter by this content type id
	   * @param  {boolean=} query.resolveLinks - When true, links to other Entries or Assets are resolved. Default: true.
	   * @return {Promise<Sync.SyncCollection>} Promise for the collection resulting of a sync operation
	   * @example
	   * client.sync()
	   * .then((response) => console.log(response.entries, response.assets, response.nextSyncToken))
	   */
	  function sync() {
	    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var resolveLinks = shouldLinksResolve(query);
	    return (0, _pagedSync2.default)(http, query, resolveLinks);
	  }

	  /**
	  * Parse raw json data into collection of entry objects.Links will be resolved also
	  * @memberof ContentfulClientAPI
	  * @param {Object} raw json data
	  * @example
	  * let data = {items: [
	  *    {
	  *    sys: {type: 'Entry', locale: 'en-US'},
	  *    fields: {
	  *      animal: {sys: {type: 'Link', linkType: 'Animal', id: 'oink'}},
	  *      anotheranimal: {sys: {type: 'Link', linkType: 'Animal', id: 'middle-parrot'}}
	  *    }
	  *  }
	  * ],
	  * includes: {
	  *  Animal: [
	  *    {
	  *      sys: {type: 'Animal', id: 'oink', locale: 'en-US'},
	  *      fields: {
	  *        name: 'Pig',
	  *        friend: {sys: {type: 'Link', linkType: 'Animal', id: 'groundhog'}}
	  *      }
	  *    }
	  *   ]
	  *  }
	  * }
	  * console.log( data.items[0].fields.foo ); // undefined
	  * let parsedData = client.parseEntries(data);
	  * console.log( parsedData.items[0].fields.foo ); // foo
	  */
	  function parseEntries(data) {
	    return wrapEntryCollection(data, true, false);
	  }
	  /*
	   * sdk relies heavily on sys metadata
	   * so we cannot omit the sys property on sdk level
	   * */
	  function normalizeSelect(query) {
	    if (query.select && !/sys/i.test(query.select)) {
	      query.select += ',sys';
	    }
	  }

	  return {
	    getSpace: getSpace,
	    getContentType: getContentType,
	    getContentTypes: getContentTypes,
	    getEntry: getEntry,
	    getEntries: getEntries,
	    getAsset: getAsset,
	    getAssets: getAssets,
	    parseEntries: parseEntries,
	    sync: sync
	  };
	} /**
	   * Contentful Delivery API Client. Contains methods which allow access to the
	   * different kinds of entities present in Contentful (Entries, Assets, etc).
	   * @namespace ContentfulClientAPI
	   * @see Entities
	   */

	/**
	 * The different kinds of top level entities you can find in Contentful
	 * @namespace Entities
	 */

	/**
	 * System metadata. See <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/common-resource-attributes">Common Resource Attributes</a> for more details.
	 * @memberof Entities
	 * @typedef Sys
	 * @prop {string} type
	 * @prop {string} id
	 * @prop {Entities.Link} space
	 * @prop {string} createdAt
	 * @prop {string} updatedAt
	 * @prop {number} revision
	 */

	/**
	 * Link to another entity. See <a href="https://www.contentful.com/developers/docs/concepts/links/">Links</a> for more details.
	 * @memberof Entities
	 * @typedef Link
	 * @prop {string} type - type of this entity. Always link.
	 * @prop {string} id
	 * @prop {string} linkType - type of this link. If defined, either Entry or Asset
	 */

	/**
	 * @memberof ContentfulClientAPI
	 * @typedef {Object} ClientAPI
	 * @prop {function} getSpace
	 * @prop {function} getContentType
	 * @prop {function} getContentTypes
	 * @prop {function} getEntry
	 * @prop {function} getEntries
	 * @prop {function} getAsset
	 * @prop {function} getAssets
	 * @prop {function} parseEntries
	 * @prop {function} sync
	 */

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createRequestConfig;

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creates request parameters configuration by parsing an existing query object
	 * @private
	 * @param {Object} query
	 * @return {Object} Config object with `params` property, ready to be used in axios
	 */
	function createRequestConfig(_ref) {
	  var query = _ref.query;

	  var config = {};
	  delete query.resolveLinks;
	  config.params = (0, _cloneDeep2.default)(query);
	  return config;
	}

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _space = __webpack_require__(222);

	var space = _interopRequireWildcard(_space);

	var _entry = __webpack_require__(233);

	var entry = _interopRequireWildcard(_entry);

	var _asset = __webpack_require__(283);

	var asset = _interopRequireWildcard(_asset);

	var _contentType = __webpack_require__(284);

	var contentType = _interopRequireWildcard(_contentType);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  space: space,
	  entry: entry,
	  asset: asset,
	  contentType: contentType
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapSpace = wrapSpace;

	var _toPlainObject = __webpack_require__(223);

	var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

	var _freezeSys = __webpack_require__(224);

	var _freezeSys2 = _interopRequireDefault(_freezeSys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @memberof Entities
	 * @typedef Space
	 * @prop {Object} sys - System metadata
	 * @prop {string} sys.id - Space id
	 * @prop {string} sys.type - Entity type
	 * @prop {string} name - Space name
	 * @prop {Array<string>} locales - Array with locale codes
	 * @prop {function(): Object} toPlainObject() - Returns this Space as a plain JS object
	 */

	/**
	 * @private
	 * @param  {Object} data - API response for a Space
	 * @return {Space}
	 */
	function wrapSpace(data) {
	  return (0, _freezeSys2.default)((0, _toPlainObject2.default)(data));
	}

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mixinToPlainObject;

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Mixes in a method to return just a plain object with no additional methods
	 * @private
	 * @param {Object} data - Any plain JSON response returned from the API
	 * @return {Object} Enhanced object with toPlainObject method
	 */
	function mixinToPlainObject(data) {
	  return Object.defineProperty(data, 'toPlainObject', {
	    enumerable: false,
	    configurable: false,
	    writable: false,
	    value: function value() {
	      return (0, _cloneDeep2.default)(this);
	    }
	  });
	}

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _freeze = __webpack_require__(225);

	var _freeze2 = _interopRequireDefault(_freeze);

	exports.default = freezeSys;

	var _each = __webpack_require__(229);

	var _each2 = _interopRequireDefault(_each);

	var _isPlainObject = __webpack_require__(232);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function freezeObjectDeep(obj) {
	  (0, _each2.default)(obj, function (value, key) {
	    if ((0, _isPlainObject2.default)(value)) {
	      freezeObjectDeep(value);
	    }
	  });
	  return (0, _freeze2.default)(obj);
	}

	function freezeSys(obj) {
	  freezeObjectDeep(obj.sys);
	  return obj;
	}

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(226), __esModule: true };

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(227);
	module.exports = __webpack_require__(6).Object.freeze;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(42);

	__webpack_require__(228)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(16)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(230);


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(138),
	    baseEach = __webpack_require__(181),
	    isArray = __webpack_require__(100),
	    toFunction = __webpack_require__(231);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	  return (typeof iteratee == 'function' && isArray(collection))
	    ? arrayEach(collection, iteratee)
	    : baseEach(collection, toFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(212);

	/**
	 * Converts `value` to a function if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Function} Returns the function.
	 */
	function toFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = toFunction;


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var isHostObject = __webpack_require__(126),
	    isObjectLike = __webpack_require__(99);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = objectProto;
	  if (typeof value.constructor == 'function') {
	    proto = getPrototypeOf(value);
	  }
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapEntry = wrapEntry;
	exports.wrapEntryCollection = wrapEntryCollection;

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _uniq = __webpack_require__(234);

	var _uniq2 = _interopRequireDefault(_uniq);

	var _toPlainObject = __webpack_require__(223);

	var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

	var _freezeSys = __webpack_require__(224);

	var _freezeSys2 = _interopRequireDefault(_freezeSys);

	var _linkGetters = __webpack_require__(245);

	var _linkGetters2 = _interopRequireDefault(_linkGetters);

	var _stringifySafe = __webpack_require__(281);

	var _stringifySafe2 = _interopRequireDefault(_stringifySafe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Types of fields found in an Entry
	 * @namespace EntryFields
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Symbol
	 * @type string
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Text
	 * @type string
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Integer
	 * @type number
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Number
	 * @type number
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Date
	 * @type string
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Boolean
	 * @type boolean
	 */

	/**
	 * @memberof EntryFields
	 * @typedef Location
	 * @prop {string} lat - latitude
	 * @prop {string} lon - longitude
	 */

	/**
	 * A Field in an Entry can have one of the following types that can be defined in Contentful. See <a href="https://www.contentful.com/developers/docs/references/field-type/">Field Types</a> for more details.
	 * @memberof Entities
	 * @typedef Field
	 * @type EntryFields.Symbol | EntryFields.Text | EntryFields.Integer | EntryFields.Number | EntryFields.Date | EntryFields.Boolean | EntryFields.Location | Entities.Link | Array<EntryFields.Symbol|Entities.Link> | Object
	 */

	/**
	 * @memberof Entities
	 * @typedef Entry
	 * @prop {Entities.Sys} sys - Standard system metadata with additional entry specific properties
	 * @prop {Entities.Link} sys.contentType - Content Type used by this Entry
	 * @prop {string=} sys.locale - If present, indicates the locale which this entry uses
	 * @prop {Object<EntryFields.Field>} fields - Object with content for each field
	 * @prop {function(): Object} toPlainObject() - Returns this Entry as a plain JS object
	 */

	/**
	 * @private
	 * @param {Object} data - Raw entry data
	 * @return {Entry} Wrapped entry data
	 */
	function wrapEntry(data) {
	  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
	}

	/**
	 * @memberof Entities
	 * @typedef EntryCollection
	 * @prop {number} total
	 * @prop {number} skip
	 * @prop {number} limit
	 * @prop {Array<Entities.Entry>} items
	 * @prop {Array<Object>=} errors - Array of errors that might occur when retrieving entries.
	 * @prop {Object<Array>=} includes - Object with arrays of includes for Entries and Assets. This will be present if resolveLinks is on, and any linked entries or assets exist. Those links will be resolved in the Entries present in the items array, but they are also present here in raw form.
	 * @prop {function(): Object} toPlainObject() - Returns this Entry collection as a plain JS object
	 * @prop {function(?function=, space=): Object} stringifySafe(replacer,space) - Stringifies the entry collection, accounting for circular references. Circular references will be replaced with just a Link object, with a <code>circular</code> property set to <code>true</code>. See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">MDN</a> and <a href="https://www.npmjs.com/package/json-stringify-safe">json-stringify-safe</a> for more details on the arguments this method can take.
	 */

	/**
	 * Data is also mixed in with link getters if links exist and includes were requested
	 * @private
	 * @param {Object} data - Raw entry collection data
	 * @return {EntryCollection} Wrapped entry collection data
	 */
	function wrapEntryCollection(data, resolveLinks, resolveForAllLocales) {
	  var wrappedData = (0, _stringifySafe2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
	  if (resolveLinks) {
	    var includes = prepareIncludes(wrappedData.includes, wrappedData.items);
	    (0, _linkGetters2.default)(wrappedData.items, includes, resolveForAllLocales);
	  }
	  return (0, _freezeSys2.default)(wrappedData);
	}

	function prepareIncludes() {
	  var includes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var items = arguments[1];

	  includes.Entry = includes.Entry || [];
	  includes.Entry = (0, _uniq2.default)(includes.Entry.concat((0, _cloneDeep2.default)(items)));
	  return includes;
	}

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(235);

	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurrence of each element
	 * is kept.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 */
	function uniq(array) {
	  return (array && array.length)
	    ? baseUniq(array)
	    : [];
	}

	module.exports = uniq;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(236),
	    arrayIncludes = __webpack_require__(238),
	    arrayIncludesWith = __webpack_require__(241),
	    cacheHas = __webpack_require__(242),
	    createSet = __webpack_require__(243),
	    setToArray = __webpack_require__(159);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(120),
	    cachePush = __webpack_require__(237);

	/**
	 *
	 * Creates a set cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.push(values[index]);
	  }
	}

	// Add functions to the `SetCache`.
	SetCache.prototype.push = cachePush;

	module.exports = SetCache;


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(131);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the set cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var map = this.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;

	    hash[value] = HASH_UNDEFINED;
	  }
	  else {
	    map.set(value, HASH_UNDEFINED);
	  }
	}

	module.exports = cachePush;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(239);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  return !!array.length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(240);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 240 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;


/***/ },
/* 241 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.includesWith` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(131);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Checks if `value` is in `cache`.
	 *
	 * @private
	 * @param {Object} cache The set cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function cacheHas(cache, value) {
	  var map = cache.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;

	    return hash[value] === HASH_UNDEFINED;
	  }
	  return map.has(value);
	}

	module.exports = cacheHas;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(147),
	    noop = __webpack_require__(244);

	/**
	 * Creates a set of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && new Set([1, 2]).size === 2) ? noop : function(values) {
	  return new Set(values);
	};

	module.exports = createSet;


/***/ },
/* 244 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty = __webpack_require__(246);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	exports.default = mixinLinkGetters;

	var _map = __webpack_require__(248);

	var _map2 = _interopRequireDefault(_map);

	var _each = __webpack_require__(229);

	var _each2 = _interopRequireDefault(_each);

	var _find = __webpack_require__(250);

	var _find2 = _interopRequireDefault(_find);

	var _get = __webpack_require__(199);

	var _get2 = _interopRequireDefault(_get);

	var _partial = __webpack_require__(253);

	var _partial2 = _interopRequireDefault(_partial);

	var _memoize = __webpack_require__(280);

	var _memoize2 = _interopRequireDefault(_memoize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var resolveAllLocales = false;
	/**
	 * Sets getters on links for a given response
	 * @private
	 * @param {Array<Entry|Asset|DeletedEntry|DeletedAsset>} items
	 * @param {Object} includes - Object with lists of Entry, Asset, DeletedEntry and DeletedAsset
	 */
	function mixinLinkGetters(items, includes, resolveForAllLocales) {
	  resolveAllLocales = resolveForAllLocales;
	  var linkGetter = (0, _memoize2.default)(getLinksFromIncludes, memoizationResolver);
	  (0, _each2.default)(items, function (item) {
	    // TODO: workaround the preview endpoint extra locale this should be removed when
	    // it is fixed on the backend
	    if (resolveForAllLocales && item.sys.locale) {
	      delete item.sys.locale;
	    }
	    setLocalizedFieldGetters(item.fields, !!item.sys.locale);
	  });

	  /**
	   * If a field does not have a locale defined in sys, the content of that field
	   * is an object where the keys are each available locale, and we need to iterate
	   * over each of those
	   * @private
	   * @param {Object} fields - Fields object
	   * @param {boolean} hasLocale - If entry has been requested with a locale
	   */
	  function setLocalizedFieldGetters(fields, hasLocale) {
	    if (hasLocale) {
	      setFieldGettersForFields(fields);
	    } else {
	      (0, _each2.default)(fields, function (localizedField) {
	        return setFieldGettersForFields(localizedField);
	      });
	    }
	  }

	  /**
	   * Sets getters on each link field or list of link fields for each item
	   * @private
	   * @param {Object} fields - Fields object
	   */
	  function setFieldGettersForFields(fields) {
	    (0, _each2.default)(fields, function (field, fieldKey) {
	      if (Array.isArray(field)) {
	        addGetterForLinkArray(field, fieldKey, fields);
	      } else {
	        addGetterForLink(field, fieldKey, fields);
	      }
	    });
	  }

	  /**
	   * Sets a getter which resolves the link of the given fieldKey in fields
	   * @private
	   * @param {Object} field - Field object
	   * @param {string} fieldKey
	   * @param {Object} fields - Fields object
	   */
	  function addGetterForLink(field, fieldKey, fields) {
	    if ((0, _get2.default)(field, 'sys.type') === 'Link') {
	      (0, _defineProperty2.default)(fields, fieldKey, {
	        get: (0, _partial2.default)(linkGetter, field)
	      });
	    }
	  }

	  /**
	   * Sets a getter which resolves the array of links of the given fieldKey in fields
	   * @private
	   * @param {Array<Object>} field - List field array
	   * @param {string} fieldKey
	   * @param {Object} fields - Fields object
	   */
	  function addGetterForLinkArray(listField, fieldKey, fields) {
	    if ((0, _get2.default)(listField[0], 'sys.type') === 'Link') {
	      (0, _defineProperty2.default)(fields, fieldKey, {
	        get: function get() {
	          return (0, _map2.default)(listField, (0, _partial2.default)(linkGetter));
	        }
	      });
	    }
	  }

	  /**
	   * Looks for given link field in includes.
	   * If linked entity is not found, it returns the original link.
	   * This method shouldn't be used directly, and it's memoized whenever this
	   * module's main method is used.
	   * This is done to prevent the same link being resolved multiple times.
	   * @private
	   * @param {Object} field - Field object
	   * @return {Object} Field, or link if field not resolved
	   */
	  function getLinksFromIncludes(field) {
	    var link = (0, _find2.default)(includes[field.sys.linkType], ['sys.id', field.sys.id]);
	    if (link && link.fields) {
	      // TODO: workaround the preview endpoint extra locale this should be removed when
	      // it is fixed on the backend
	      if (resolveAllLocales && link.sys.locale) {
	        delete link.sys.locale;
	      }
	      setLocalizedFieldGetters(link.fields, !!link.sys.locale);
	      return link;
	    }
	    return field;
	  }

	  function memoizationResolver(link) {
	    return link.sys.id;
	  }
	}

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(247), __esModule: true };

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(197),
	    baseIteratee = __webpack_require__(183),
	    baseMap = __webpack_require__(249),
	    isArray = __webpack_require__(100);

	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	 * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	 * and `words`
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(181),
	    isArrayLike = __webpack_require__(79);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(181),
	    baseFind = __webpack_require__(251),
	    baseFindIndex = __webpack_require__(252),
	    baseIteratee = __webpack_require__(183),
	    isArray = __webpack_require__(100);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	function find(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEach);
	}

	module.exports = find;


/***/ },
/* 251 */
/***/ function(module, exports) {

	/**
	 * The base implementation of methods like `_.find` and `_.findKey`, without
	 * support for iteratee shorthands, which iterates over `collection` using
	 * `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;


/***/ },
/* 252 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(254),
	    replaceHolders = __webpack_require__(277),
	    rest = __webpack_require__(86);

	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_FLAG = 32;

	/**
	 * Creates a function that invokes `func` with `partial` arguments prepended
	 * to those provided to the new function. This method is like `_.bind` except
	 * it does **not** alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * var greet = function(greeting, name) {
	 *   return greeting + ' ' + name;
	 * };
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // Partially applied with placeholders.
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = rest(function(func, partials) {
	  var placeholder = partial.placeholder,
	      holders = replaceHolders(partials, placeholder);

	  return createWrapper(func, PARTIAL_FLAG, undefined, partials, holders);
	});

	module.exports = partial;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(255),
	    createBaseWrapper = __webpack_require__(258),
	    createCurryWrapper = __webpack_require__(260),
	    createHybridWrapper = __webpack_require__(261),
	    createPartialWrapper = __webpack_require__(278),
	    getData = __webpack_require__(268),
	    mergeData = __webpack_require__(279),
	    setData = __webpack_require__(274),
	    toInteger = __webpack_require__(87);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;

	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func),
	      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

	  if (data) {
	    mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] == null
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax(newData[9] - length, 0);

	  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == BIND_FLAG) {
	    var result = createBaseWrapper(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurryWrapper(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartialWrapper(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybridWrapper.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setter(result, newData);
	}

	module.exports = createWrapper;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(212),
	    metaMap = __webpack_require__(256);

	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};

	module.exports = baseSetData;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var WeakMap = __webpack_require__(257);

	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;

	module.exports = metaMap;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(124),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var createCtorWrapper = __webpack_require__(259),
	    root = __webpack_require__(92);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBaseWrapper(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}

	module.exports = createBaseWrapper;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(164),
	    isObject = __webpack_require__(83);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtorWrapper(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors.
	    // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	module.exports = createCtorWrapper;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(71),
	    createCtorWrapper = __webpack_require__(259),
	    createHybridWrapper = __webpack_require__(261),
	    createRecurryWrapper = __webpack_require__(264),
	    replaceHolders = __webpack_require__(277),
	    root = __webpack_require__(92);

	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurryWrapper(func, bitmask, arity) {
	  var Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var length = arguments.length,
	        index = length,
	        args = Array(length),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func,
	        placeholder = wrapper.placeholder;

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : replaceHolders(args, placeholder);

	    length -= holders.length;
	    return length < arity
	      ? createRecurryWrapper(func, bitmask, createHybridWrapper, placeholder, undefined, args, holders, undefined, undefined, arity - length)
	      : apply(fn, this, args);
	  }
	  return wrapper;
	}

	module.exports = createCurryWrapper;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(262),
	    composeArgsRight = __webpack_require__(263),
	    createCtorWrapper = __webpack_require__(259),
	    createRecurryWrapper = __webpack_require__(264),
	    reorder = __webpack_require__(276),
	    replaceHolders = __webpack_require__(277),
	    root = __webpack_require__(92);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    ARY_FLAG = 128,
	    FLIP_FLAG = 512;

	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurry = bitmask & CURRY_FLAG,
	      isCurryRight = bitmask & CURRY_RIGHT_FLAG,
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtorWrapper(func);

	  function wrapper() {
	    var length = arguments.length,
	        index = length,
	        args = Array(length);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight);
	    }
	    if (isCurry || isCurryRight) {
	      var placeholder = wrapper.placeholder,
	          argsHolders = replaceHolders(args, placeholder);

	      length -= argsHolders.length;
	      if (length < arity) {
	        return createRecurryWrapper(func, bitmask, createHybridWrapper, placeholder, thisArg, args, argsHolders, argPos, ary, arity - length);
	      }
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && args.length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < args.length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtorWrapper(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	module.exports = createHybridWrapper;


/***/ },
/* 262 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders) {
	  var holdersLength = holders.length,
	      argsIndex = -1,
	      argsLength = nativeMax(args.length - holdersLength, 0),
	      leftIndex = -1,
	      leftLength = partials.length,
	      result = Array(leftLength + argsLength);

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    result[holders[argsIndex]] = args[argsIndex];
	  }
	  while (argsLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgs;


/***/ },
/* 263 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders) {
	  var holdersIndex = -1,
	      holdersLength = holders.length,
	      argsIndex = -1,
	      argsLength = nativeMax(args.length - holdersLength, 0),
	      rightIndex = -1,
	      rightLength = partials.length,
	      result = Array(argsLength + rightLength);

	  while (++argsIndex < argsLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    result[offset + holders[holdersIndex]] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgsRight;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(143),
	    isLaziable = __webpack_require__(265),
	    setData = __webpack_require__(274);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder to replace.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
	      newArgPos = argPos ? copyArray(argPos) : undefined,
	      newsHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;

	  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	  if (!(bitmask & CURRY_BOUND_FLAG)) {
	    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	  }
	  var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, arity],
	      result = wrapFunc.apply(undefined, newData);

	  if (isLaziable(func)) {
	    setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return result;
	}

	module.exports = createRecurryWrapper;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(266),
	    getData = __webpack_require__(268),
	    getFuncName = __webpack_require__(269),
	    lodash = __webpack_require__(271);

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];

	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}

	module.exports = isLaziable;


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(164),
	    baseLodash = __webpack_require__(267);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}

	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	module.exports = LazyWrapper;


/***/ },
/* 267 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype all chaining wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	module.exports = baseLodash;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(256),
	    noop = __webpack_require__(244);

	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};

	module.exports = getData;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(270);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	module.exports = getFuncName;


/***/ },
/* 270 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};

	module.exports = realNames;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(266),
	    LodashWrapper = __webpack_require__(272),
	    baseLodash = __webpack_require__(267),
	    isArray = __webpack_require__(100),
	    isObjectLike = __webpack_require__(99),
	    wrapperClone = __webpack_require__(273);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chaining. Methods that operate on and return arrays, collections, and
	 * functions can be chained together. Methods that retrieve a single value or
	 * may return a primitive value will automatically end the chain sequence and
	 * return the unwrapped value. Otherwise, the value must be unwrapped with
	 * `_#value`.
	 *
	 * Explicit chaining, which must be unwrapped with `_#value` in all cases,
	 * may be enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	 * fusion is an optimization to merge iteratee calls; this avoids the creation
	 * of intermediate arrays and can greatly reduce the number of iteratee executions.
	 * Sections of a chain sequence qualify for shortcut fusion if the section is
	 * applied to an array of at least two hundred elements and any iteratees
	 * accept only one argument. The heuristic for whether a section qualifies
	 * for shortcut fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`,
	 * `at`, `before`, `bind`, `bindAll`, `bindKey`, `chain`, `chunk`, `commit`,
	 * `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`, `curry`,
	 * `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`, `difference`,
	 * `differenceBy`, `differenceWith`, `drop`, `dropRight`, `dropRightWhile`,
	 * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flip`, `flow`,
	 * `flowRight`, `fromPairs`, `functions`, `functionsIn`, `groupBy`, `initial`,
	 * `intersection`, `intersectionBy`, `intersectionWith`, `invert`, `invertBy`,
	 * `invokeMap`, `iteratee`, `keyBy`, `keys`, `keysIn`, `map`, `mapKeys`,
	 * `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`, `mergeWith`,
	 * `method`, `methodOf`, `mixin`, `negate`, `nthArg`, `omit`, `omitBy`, `once`,
	 * `orderBy`, `over`, `overArgs`, `overEvery`, `overSome`, `partial`,
	 * `partialRight`, `partition`, `pick`, `pickBy`, `plant`, `property`,
	 * `propertyOf`, `pull`, `pullAll`, `pullAllBy`, `pullAt`, `push`, `range`,
	 * `rangeRight`, `rearg`, `reject`, `remove`, `rest`, `reverse`, `sampleSize`,
	 * `set`, `setWith`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `spread`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
	 * `thru`, `toArray`, `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`,
	 * `transform`, `unary`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`,
	 * `uniqWith`, `unset`, `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`,
	 * `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`,
	 * `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `endsWith`, `eq`,
	 * `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
	 * `findLast`, `findLastIndex`, `findLastKey`, `floor`, `forEach`, `forEachRight`,
	 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	 * `isArguments`, `isArray`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`,
	 * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`,
	 * `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMatch`, `isMatchWith`,
	 * `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`, `isObject`, `isObjectLike`,
	 * `isPlainObject`, `isRegExp`, `isSafeInteger`, `isString`, `isUndefined`,
	 * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`,
	 * `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `min`, `minBy`,
	 * `noConflict`, `noop`, `now`, `pad`, `padEnd`, `padStart`, `parseInt`,
	 * `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`,
	 * `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
	 * `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`,
	 * `startsWith`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toLower`,
	 * `toInteger`, `toLength`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`,
	 * `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`,
	 * `upperCase`, `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;

	module.exports = lodash;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(164),
	    baseLodash = __webpack_require__(267);

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}

	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	module.exports = LodashWrapper;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(266),
	    LodashWrapper = __webpack_require__(272),
	    copyArray = __webpack_require__(143);

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}

	module.exports = wrapperClone;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(255),
	    now = __webpack_require__(275);

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 150,
	    HOT_SPAN = 16;

	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity function
	 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = (function() {
	  var count = 0,
	      lastCalled = 0;

	  return function(key, value) {
	    var stamp = now(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return key;
	      }
	    } else {
	      count = 0;
	    }
	    return baseSetData(key, value);
	  };
	}());

	module.exports = setData;


/***/ },
/* 275 */
/***/ function(module, exports) {

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = Date.now;

	module.exports = now;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(143),
	    isIndex = __webpack_require__(85);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	module.exports = reorder;


/***/ },
/* 277 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    if (array[index] === placeholder) {
	      array[index] = PLACEHOLDER;
	      result[++resIndex] = index;
	    }
	  }
	  return result;
	}

	module.exports = replaceHolders;


/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(71),
	    createCtorWrapper = __webpack_require__(259),
	    root = __webpack_require__(92);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg` and the `partials` prepended to those provided to
	 * the wrapper.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartialWrapper(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartialWrapper;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(262),
	    composeArgsRight = __webpack_require__(263),
	    copyArray = __webpack_require__(143),
	    replaceHolders = __webpack_require__(277);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	 * modify function arguments, making the order in which they are executed important,
	 * preventing the merging of metadata. However, we make an exception for a safe
	 * combined case where curried functions have `_.ary` and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (BIND_FLAG | BIND_KEY_FLAG | ARY_FLAG);

	  var isCombo =
	    (srcBitmask == ARY_FLAG && (bitmask == CURRY_FLAG)) ||
	    (srcBitmask == ARY_FLAG && (bitmask == REARG_FLAG) && (data[7].length <= source[8])) ||
	    (srcBitmask == (ARY_FLAG | REARG_FLAG) && (source[7].length <= source[8]) && (bitmask == CURRY_FLAG));

	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : copyArray(value);
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : copyArray(source[4]);
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : copyArray(value);
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : copyArray(source[6]);
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = copyArray(value);
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;

	  return data;
	}

	module.exports = mergeData;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(120);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoizing function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new memoize.Cache;
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mixinStringifySafe;

	var _jsonStringifySafe = __webpack_require__(282);

	var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mixinStringifySafe(data) {
	  return Object.defineProperty(data, 'stringifySafe', {
	    enumerable: false,
	    configurable: false,
	    writable: false,
	    value: function value() {
	      var serializer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	      return (0, _jsonStringifySafe2.default)(this, serializer, indent, function (key, value) {
	        return {
	          sys: {
	            type: 'Link',
	            linkType: 'Entry',
	            id: value.sys.id,
	            circular: true
	          }
	        };
	      });
	    }
	  });
	}

/***/ },
/* 282 */
/***/ function(module, exports) {

	exports = module.exports = stringify
	exports.getSerialize = serializer

	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}

	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = []

	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
	    if (stack[0] === value) return "[Circular ~]"
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  }

	  return function(key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this)
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
	    }
	    else stack.push(value)

	    return replacer == null ? value : replacer.call(this, key, value)
	  }
	}


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapAsset = wrapAsset;
	exports.wrapAssetCollection = wrapAssetCollection;

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _toPlainObject = __webpack_require__(223);

	var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

	var _freezeSys = __webpack_require__(224);

	var _freezeSys2 = _interopRequireDefault(_freezeSys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @memberof Entities
	 * @typedef Asset
	 * @prop {Entities.Sys} sys - Standard system metadata with additional entry specific properties
	 * @prop {string=} sys.locale - If present, indicates the locale which this asset uses
	 * @prop {Object} fields - Object with content for each field
	 * @prop {string} fields.title - Title for this asset
	 * @prop {string} fields.description - Description for this asset
	 * @prop {Object} fields.file - File object for this asset
	 * @prop {string} fields.file.fileName - Name for the file
	 * @prop {string} fields.file.contentType - Mime type for the file
	 * @prop {string} fields.file.url - Url where the file is available at.
	 * @prop {Object} fields.file.details - Details for the file, depending on file type (example: image size in bytes, etc)
	 * @prop {function(): Object} toPlainObject() - Returns this Asset as a plain JS object
	 */

	/**
	 * @private
	 * @param {Object} data - Raw asset data
	 * @return {Asset} Wrapped asset data
	 */
	function wrapAsset(data) {
	  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
	}

	/**
	 * @memberof Entities
	 * @typedef AssetCollection
	 * @prop {number} total
	 * @prop {number} skip
	 * @prop {number} limit
	 * @prop {Array<Entities.Asset>} items
	 * @prop {function(): Object} toPlainObject() - Returns this Asset collection as a plain JS object
	 */

	/**
	 * @private
	 * @param {Object} data - Raw asset collection data
	 * @return {AssetCollection} Wrapped asset collection data
	 */
	function wrapAssetCollection(data) {
	  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
	}

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapContentType = wrapContentType;
	exports.wrapContentTypeCollection = wrapContentTypeCollection;

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _toPlainObject = __webpack_require__(223);

	var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

	var _freezeSys = __webpack_require__(224);

	var _freezeSys2 = _interopRequireDefault(_freezeSys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @memberof Entities
	 * @typedef ContentType
	 * @prop {Entities.Sys} sys - System metadata
	 * @prop {string} name
	 * @prop {string} description
	 * @prop {string} displayField - Field used as the main display field for Entries
	 * @prop {string} Array<Field> - All the fields contained in this Content Type
	 * @prop {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
	 */

	/**
	 * @private
	 * @param {Object} data - Raw content type data
	 * @return {ContentType} Wrapped content type data
	 */
	function wrapContentType(data) {
	  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
	}

	/**
	 * @memberof Entities
	 * @typedef ContentTypeCollection
	 * @prop {number} total
	 * @prop {number} skip
	 * @prop {number} limit
	 * @prop {Array<Entities.ContentType>} items
	 * @prop {function(): Object} toPlainObject() - Returns this Content Type collection as a plain JS object
	 */

	/**
	 * @private
	 * @param {Object} data - Raw content type collection data
	 * @return {ContentTypeCollection} Wrapped content type collection data
	 */
	function wrapContentTypeCollection(data) {
	  return (0, _freezeSys2.default)((0, _toPlainObject2.default)((0, _cloneDeep2.default)(data)));
	}

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pagedSync;

	var _filter = __webpack_require__(286);

	var _filter2 = _interopRequireDefault(_filter);

	var _cloneDeep = __webpack_require__(108);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _createRequestConfig = __webpack_require__(220);

	var _createRequestConfig2 = _interopRequireDefault(_createRequestConfig);

	var _freezeSys = __webpack_require__(224);

	var _freezeSys2 = _interopRequireDefault(_freezeSys);

	var _linkGetters = __webpack_require__(245);

	var _linkGetters2 = _interopRequireDefault(_linkGetters);

	var _stringifySafe = __webpack_require__(281);

	var _stringifySafe2 = _interopRequireDefault(_stringifySafe);

	var _toPlainObject = __webpack_require__(223);

	var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @memberof Sync
	 * @typedef SyncCollection
	 * @prop {Array<Entities.Entry>} entries - All existing entries on first sync. New and updated entries on subsequent syncs.
	 * @prop {Array<Entities.Asset>} assets - All existing assets on first sync. New and updated assets on subsequent syncs.
	 * @prop {Array<Sync.DeletedEntry>} deletedEntries - List of deleted Entries since last sync
	 * @prop {Array<Sync.DeletedAsset>} deletedAssets - List of deleted Assets since last sync
	 * @prop {string} nextSyncToken - Token to be sent to the next sync call
	 * @prop {function(): Object} toPlainObject() - Returns this Sync collection as a plain JS object
	 * @prop {function(?function=, space=): Object} stringifySafe(replacer,space) - Stringifies the Sync collection, accounting for circular references. Circular references will be replaced with just a Link object, with a <code>circular</code> property set to <code>true</code>. See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">MDN</a> and <a href="https://www.npmjs.com/package/json-stringify-safe">json-stringify-safe</a> for more details on the arguments this method can take.
	 */

	/**
	 * Deleted Entries are the same as Entries, but only appear on the sync API.
	 * @memberof Sync
	 * @typedef DeletedEntry
	 * @type Entities.Entry
	 */

	/**
	 * Deleted Assets are the same as Assets, but only appear on the sync API.
	 * @memberof Sync
	 * @typedef DeletedAsset
	 * @type Entities.Asset
	 */

	/**
	 * This module retrieves all the available pages for a sync operation
	 * @private
	 * @param {Object} http - HTTP client
	 * @param {Object} query - Query object
	 * @param {boolean} resolveLinks - If links should be resolved
	 * @return {Promise<SyncCollection>}
	 */
	function pagedSync(http, query, resolveLinks) {
	  if (!query || !query.initial && !query.nextSyncToken) {
	    throw new Error('Please provide one of `initial` or `nextSyncToken` parameters for syncing');
	  }

	  if (query && query.content_type && !query.type) {
	    query.type = 'Entry';
	  } else if (query && query.content_type && query.type && query.type !== 'Entry') {
	    throw new Error('When using the `content_type` filter your `type` parameter cannot be different from `Entry`.');
	  }

	  if (query.nextSyncToken) {
	    query.sync_token = query.nextSyncToken;
	    delete query.initial;
	    delete query.nextSyncToken;
	  }

	  return getSyncPage(http, [], query).then(function (response) {
	    // clones response.items used in includes because we don't want these to be mutated
	    if (resolveLinks) {
	      (0, _linkGetters2.default)(response.items, mapIncludeItems((0, _cloneDeep2.default)(response.items)));
	    }
	    // maps response items again after getters are attached
	    var mappedResponseItems = mapResponseItems(response.items);
	    mappedResponseItems.nextSyncToken = response.nextSyncToken;
	    return (0, _freezeSys2.default)((0, _stringifySafe2.default)((0, _toPlainObject2.default)(mappedResponseItems)));
	  }, function (error) {
	    throw error.data;
	  });
	}

	/**
	 * @private
	 * @param {Array<Entities.Entry|Entities.Array|Sync.DeletedEntry|Sync.DeletedAsset>} items
	 * @return {Object} Entities mapped to an object for each entity type
	 */
	/**
	 * See <a href="https://www.contentful.com/developers/docs/concepts/sync/">Synchronization</a> for more information.
	 * @namespace Sync
	 */
	function mapResponseItems(items) {
	  return {
	    entries: (0, _filter2.default)(items, ['sys.type', 'Entry']),
	    assets: (0, _filter2.default)(items, ['sys.type', 'Asset']),
	    deletedEntries: (0, _filter2.default)(items, ['sys.type', 'DeletedEntry']),
	    deletedAssets: (0, _filter2.default)(items, ['sys.type', 'DeletedAsset'])
	  };
	}

	/**
	 * Creates an object similar to the one retrieved on `includes` from the `entries`
	 * endpoint, for usage with the link getters mixin
	 * @private
	 * @param {Array<Entities.Entry|Entities.Array|Sync.DeletedEntry|Sync.DeletedAsset>} items
	 * @return {Object}
	 */
	function mapIncludeItems(items) {
	  return {
	    Entry: (0, _filter2.default)(items, ['sys.type', 'Entry']),
	    Asset: (0, _filter2.default)(items, ['sys.type', 'Asset'])
	  };
	}

	/**
	 * If the response contains a nextPageUrl, extracts the sync token to get the
	 * next page and calls itself again with that token.
	 * Otherwise, if the response contains a nextSyncUrl, extracts the sync token
	 * and returns it.
	 * On each call of this function, any retrieved items are collected in the
	 * supplied items array, which gets returned in the end
	 * @private
	 * @param {Object} http
	 * @param {Array<Entities.Entry|Entities.Array|Sync.DeletedEntry|Sync.DeletedAsset>} items
	 * @param {Object} query
	 * @return {Promise<{items: Array, nextSyncToken: string}>}
	 */
	function getSyncPage(http, items, query) {
	  return http.get('sync', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
	    var data = response.data;
	    items = items.concat(data.items);
	    if (data.nextPageUrl) {
	      delete query.initial;
	      query.sync_token = getToken(data.nextPageUrl);
	      return getSyncPage(http, items, query);
	    } else if (data.nextSyncUrl) {
	      return {
	        items: items,
	        nextSyncToken: getToken(data.nextSyncUrl)
	      };
	    }
	  });
	}

	/**
	 * Extracts token out of an url
	 * @private
	 */
	function getToken(url) {
	  var urlParts = url.split('?');
	  return urlParts.length > 0 ? urlParts[1].replace('sync_token=', '') : '';
	}

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(287),
	    baseFilter = __webpack_require__(288),
	    baseIteratee = __webpack_require__(183),
	    isArray = __webpack_require__(100);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 287 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(181);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 289 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createLinkResolver;
	/**
	 * Link resolution can be set globally, or it can be turned off for the methods
	 * which make use of it. The local setting always overrides the global setting.
	 * @private
	 * @param {boolean} globalSetting - Global library setting for link resolution
	 * @returns {function} Link resolver method preconfigured with global setting
	 */
	function createLinkResolver(globalSetting) {
	  /**
	   * Link resolver method
	   * @param {Object} query - regular query object used for collection endpoints
	   */
	  return function shouldLinksResolve(query) {
	    return !!('resolveLinks' in query ? query.resolveLinks : globalSetting);
	  };
	}

/***/ }
/******/ ]);