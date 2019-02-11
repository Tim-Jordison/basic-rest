module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lambdas/snake/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cassava/dist/RestError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const httpStatus_1 = __webpack_require__("./node_modules/cassava/dist/httpStatus.js");

class RestError extends Error {
  /**
   * An Error that will be caught and turned into a JSON rest response.
   * @param statusCode the HTTP status code to send (defaults to 500)
   * @param message the message for the error (defaults to a description of statusCode)
   * @param additionalParams additional properties to put on the JSON response object
   */
  constructor(statusCode = httpStatus_1.httpStatusCode.serverError.INTERNAL_SERVER_ERROR, message = httpStatus_1.httpStatusString[statusCode] || statusCode.toString(), additionalParams) {
    super(message);
    this.statusCode = statusCode;
    this.additionalParams = additionalParams;
    this.isRestError = true;

    if (typeof statusCode !== "number" || statusCode.toString(10).length !== 3 || statusCode < 100 || statusCode > 599) {
      throw new Error(`illegal HTTP status code ${statusCode}`);
    }
  }

}

exports.RestError = RestError;

/***/ }),

/***/ "./node_modules/cassava/dist/Router.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const cookieLib = __webpack_require__("./node_modules/cookie/index.js");

const url = __webpack_require__("url");

const routes_1 = __webpack_require__("./node_modules/cassava/dist/routes/index.js");

const RestError_1 = __webpack_require__("./node_modules/cassava/dist/RestError.js");

const RouterEvent_1 = __webpack_require__("./node_modules/cassava/dist/RouterEvent.js");

const RouterResponse_1 = __webpack_require__("./node_modules/cassava/dist/RouterResponse.js");

const httpStatus_1 = __webpack_require__("./node_modules/cassava/dist/httpStatus.js");

class Router {
  constructor() {
    /**
     * Both node 4.3 and 6.10 use the callback parameter to return a result.
     * The ability to create new functions using Node.js 4.3 will be disabled July 31, 2018.
     * Code updates to existing functions using Node.js v4.3 will be disabled on October 31, 2018.
     * When the ability to update code in node 6.10 functions is disabled this can be removed.
     */
    this.useLegacyCallbackHandler = process.version.startsWith("v4.3") || process.version.startsWith("v6.10");
    /**
     * Routes that will be tested against in order.
     */

    this.routes = [];
    /**
     * The default route that will be matched if no other routes matched.
     *
     * The default implementation is to return a 404 response.
     */

    this.defaultRoute = new routes_1.DefaultRoute();
    /**
     * The handler that will be called when non-RestErrors are thrown.
     * The handler can return nothing, a RouterResponse, or a Promise that resolves
     * such.  If a RouterResponse or Promise of RouterResponse is returned that will
     * be the response used.
     *
     * The handler will be called with: the Error thrown, the input ProxyEvent that
     * caused the error and the Lambda context.
     *
     * The default implementation is to log the error.
     */

    this.errorHandler = err => console.log("Error thrown during execution.\n", err);
  }

  route(path) {
    if (!path) {
      const route = new routes_1.BuildableRoute();
      this.routes.push(route);
      return route;
    } else if (typeof path === "string" || path instanceof RegExp) {
      const route = new routes_1.BuildableRoute();
      route.path(path);
      this.routes.push(route);
      return route;
    } else if (path.matches && (path.handle || path.postProcess)) {
      this.routes.push(path);
      return path;
    }

    throw new Error("Input must be a string or regex to create a new RouteBuilder, or an instance of Route.");
  }

  getLambdaHandler() {
    if (this.useLegacyCallbackHandler) {
      return (evt, ctx, callback) => {
        this.routeProxyEvent(evt, ctx).then(res => {
          callback(undefined, res);
        }, err => {
          this.errorToRouterResponse(err, evt, ctx).then(res => {
            callback(undefined, this.routerResponseToProxyResponse(res));
          }).catch(() => {
            console.error("Catastrophic error thrown during execution.\n", err);
            callback(err);
          });
        });
      };
    } else {
      return (evt, ctx) => {
        return this.routeProxyEvent(evt, ctx).catch(err => {
          return this.errorToRouterResponse(err, evt, ctx).then(res => this.routerResponseToProxyResponse(res));
        });
      };
    }
  }

  routeProxyEvent(pevt, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
      // Non-functional programming for speeeeed.
      const evt = this.proxyEventToRouterEvent(pevt);
      let resp = null;
      let handlingRoute;
      const postProcessors = [];

      for (let routeIx = 0; routeIx < this.routes.length && !resp; routeIx++) {
        const route = this.routes[routeIx];

        if (route.enabled !== false && route.matches(evt)) {
          if (route.postProcess) {
            postProcessors.push(route);
          }

          if (route.handle) {
            handlingRoute = route;

            try {
              resp = yield route.handle(evt);
            } catch (err) {
              resp = yield this.errorToRouterResponse(err, pevt, ctx);
            }
          }
        }
      }

      if (!resp) {
        try {
          if (!this.defaultRoute.handle) {
            throw new Error("Router's defaultRoute.handle is not defined.");
          }

          handlingRoute = this.defaultRoute;
          resp = yield this.defaultRoute.handle(evt);

          if (!resp) {
            throw new Error("Router's defaultRoute.handle() did not return a response.");
          }
        } catch (err) {
          resp = yield this.errorToRouterResponse(err, pevt, ctx);
        }
      }

      const handlingRoutes = [handlingRoute];

      while (postProcessors.length) {
        const route = postProcessors.pop();

        try {
          resp = (yield route.postProcess(evt, resp, handlingRoutes)) || resp;
        } catch (err) {
          resp = yield this.errorToRouterResponse(err, pevt, ctx);
        }

        if (handlingRoutes[handlingRoutes.length - 1] !== route) {
          handlingRoutes.push(route);
        }
      }

      return this.routerResponseToProxyResponse(resp);
    });
  }

  proxyEventToRouterEvent(evt) {
    const r = new RouterEvent_1.RouterEvent();
    r.requestContext = evt.requestContext;
    r.headers = evt.headers || {};
    r.multiValueHeaders = evt.multiValueHeaders || {};
    r.httpMethod = evt.httpMethod;
    r.meta = {};
    r.path = this.proxyPathToRouterPath(evt.path);
    r.queryStringParameters = evt.queryStringParameters || {};
    r.multiValueQueryStringParameters = evt.multiValueQueryStringParameters || {};
    r.pathParameters = evt.pathParameters || {};
    r.stageVariables = evt.stageVariables || {};
    r.headersLowerCase = {};

    for (const headerKey of Object.keys(r.headers)) {
      r.headersLowerCase[headerKey.toLowerCase()] = r.headers[headerKey];
    }

    r.multiValueHeadersLowerCase = {};

    for (const headerKey of Object.keys(r.multiValueHeaders)) {
      r.multiValueHeadersLowerCase[headerKey.toLowerCase()] = r.multiValueHeaders[headerKey];
    }

    if (typeof evt.body === "string" && (!r.headersLowerCase["content-type"] || /(application|text)\/(x-)?json/.test(r.headersLowerCase["content-type"]))) {
      try {
        if (evt.isBase64Encoded) {
          r.body = JSON.parse(Buffer.from(evt.body, "base64").toString());
        } else {
          r.body = JSON.parse(evt.body);
        }
      } catch (e) {
        throw new RestError_1.RestError(httpStatus_1.httpStatusCode.clientError.BAD_REQUEST, `Unable to parse JSON body: ${e.message}`);
      }
    } else {
      r.body = evt.body;
    }

    r.cookies = {};

    if (r.headersLowerCase["cookie"]) {
      r.cookies = cookieLib.parse(r.headersLowerCase["cookie"]);
    }

    return r;
  }

  proxyPathToRouterPath(path) {
    if (url.URL) {
      // This constructor was added in Node v6.13.0.
      return new url.URL(path, "http://host/").pathname.replace(/\/\/+/g, "/");
    } else if (url.parse) {
      // This method was deprecated in Node v6.13.0.
      return url.parse(path).pathname.replace(/\/\/+/g, "/");
    } else {
      throw new Error("No suitable URL parsing method in the 'url' package found.");
    }
  }

  errorToRouterResponse(err, pevt, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
      if (err && err.isRestError) {
        return {
          statusCode: err.statusCode,
          body: Object.assign({
            message: err.message,
            statusCode: err.statusCode
          }, err.additionalParams)
        };
      }

      if (this.errorHandler) {
        const resp = yield this.errorHandler(err, pevt, ctx);

        if (resp) {
          return resp;
        }
      }

      return {
        statusCode: httpStatus_1.httpStatusCode.serverError.INTERNAL_SERVER_ERROR,
        body: {
          message: httpStatus_1.httpStatusString[httpStatus_1.httpStatusCode.serverError.INTERNAL_SERVER_ERROR],
          statusCode: httpStatus_1.httpStatusCode.serverError.INTERNAL_SERVER_ERROR
        }
      };
    });
  }

  routerResponseToProxyResponse(resp) {
    if (resp.cookies) {
      const cookieKeys = Object.keys(resp.cookies);

      for (let i = 0, length = cookieKeys.length; i < length; i++) {
        const key = cookieKeys[i];
        const value = resp.cookies[key];
        const cookieString = typeof value === "string" ? cookieLib.serialize(key, value) : cookieLib.serialize(key, value.value, value.options);
        const setCookie = RouterResponse_1.RouterResponse.getHeader(resp, "Set-Cookie");

        if (setCookie) {
          RouterResponse_1.RouterResponse.setHeader(resp, "Set-Cookie", `${setCookie}; ${cookieString}`);
        } else {
          RouterResponse_1.RouterResponse.setHeader(resp, "Set-Cookie", cookieString);
        }
      }
    }

    let isBase64Encoded = false;
    let body;
    const contentType = RouterResponse_1.RouterResponse.getHeader(resp, "Content-Type");

    if (resp.body instanceof Buffer) {
      body = resp.body.toString("base64");
      isBase64Encoded = true;
    } else if (!contentType) {
      // Automatic serialization to JSON if Content-Type is not set.
      body = JSON.stringify(resp.body);
      RouterResponse_1.RouterResponse.setHeader(resp, "Content-Type", "application/json");
    } else {
      body = resp.body;
    }

    return {
      statusCode: resp.statusCode || httpStatus_1.httpStatusCode.success.OK,
      headers: resp.headers || {},
      body,
      isBase64Encoded
    };
  }

}

exports.Router = Router;

/***/ }),

/***/ "./node_modules/cassava/dist/RouterEvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const jsonschema = __webpack_require__("./node_modules/jsonschema/lib/index.js");

const RestError_1 = __webpack_require__("./node_modules/cassava/dist/RestError.js");
/**
 * Input to the HTTP router.  Based on the ProxyEvent but enriched.
 */


class RouterEvent {
  requireQueryStringParameter(param, valuesOrValidator, explanation) {
    if (!this.queryStringParameters[param]) {
      throw new RestError_1.RestError(400, explanation || `Required query parameter '${param}' is not set.`);
    }

    if (valuesOrValidator && Array.isArray(valuesOrValidator) && valuesOrValidator.indexOf(this.queryStringParameters[param]) === -1) {
      throw new RestError_1.RestError(400, explanation || `Required query parameter '${param}=${this.queryStringParameters[param]}' must be one of: ${valuesOrValidator.join(", ")}.`);
    }

    if (valuesOrValidator && typeof valuesOrValidator === "function" && !valuesOrValidator(this.queryStringParameters[param])) {
      throw new RestError_1.RestError(400, explanation || `Required query parameter '${param}=${this.queryStringParameters[param]}' is not a legal value.`);
    }
  }
  /**
   * Require that the given query parameters are *not* set.
   * If any parameter in this list is set a RestError is thrown.
   */


  blacklistQueryStringParameters(...params) {
    blacklistKeys(this.queryStringParameters || {}, params, "query parameter");
  }
  /**
   * Require that only the given query parameters are set.  No parameter
   * in this list has to be set, but if any parameter is set that is not in
   * this list a RestError will be thrown.
   */


  whitelistQueryStringParameters(...params) {
    whitelistKeys(this.queryStringParameters || {}, params, "query parameter");
  }

  requireHeader(field, valuesOrValidator, explanation) {
    const fieldLowerCase = field.toLowerCase();

    if (!this.headersLowerCase[fieldLowerCase]) {
      throw new RestError_1.RestError(400, explanation || `Required header '${field}' is not set.`);
    }

    if (valuesOrValidator && Array.isArray(valuesOrValidator) && valuesOrValidator.indexOf(this.headersLowerCase[fieldLowerCase]) === -1) {
      throw new RestError_1.RestError(400, explanation || `Required header '${field}=${this.headersLowerCase[fieldLowerCase]}' must be one of: ${valuesOrValidator.join(", ")}.`);
    }

    if (valuesOrValidator && typeof valuesOrValidator === "function" && !valuesOrValidator(this.headersLowerCase[fieldLowerCase])) {
      throw new RestError_1.RestError(400, explanation || `Required header '${field}=${this.headersLowerCase[fieldLowerCase]}' is not a legal value.`);
    }
  }
  /**
   * Validate the body of the request using JSON Schema.
   *
   * JSON Schema is a concise way to define a valid JSON object.
   * The spec and examples can be found at http://json-schema.org/
   * with additional help at
   * https://spacetelescope.github.io/understanding-json-schema/index.html .
   *
   * The actual implementation comes from https://github.com/tdegrunt/jsonschema .
   */


  validateBody(schema, options) {
    const result = jsonschema.validate(this.body, schema, Object.assign({
      propertyName: "requestBody"
    }, options));

    if (result.errors.length) {
      throw new RestError_1.RestError(options && typeof options.httpStatusCode === "number" ? options.httpStatusCode : 422, `The ${this.httpMethod} body has ${result.errors.length} validation error(s): ${result.errors.map(e => e.toString()).join(", ")}.`);
    }
  }

}

exports.RouterEvent = RouterEvent;

function blacklistKeys(o, keys, part = "member") {
  for (const key of Object.keys(o)) {
    if (keys.indexOf(key) !== -1) {
      throw new RestError_1.RestError(400, `Unexpected ${part} '${key}'.`);
    }
  }
}

function whitelistKeys(o, keys, part = "member") {
  for (const key of Object.keys(o)) {
    if (keys.indexOf(key) === -1) {
      throw new RestError_1.RestError(400, `Unexpected ${part} '${key}'.`);
    }
  }
}

/***/ }),

/***/ "./node_modules/cassava/dist/RouterResponse.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RouterResponse;

(function (RouterResponse) {
  function getHeader(resp, field) {
    if (!resp.headers) {
      return null;
    }

    const fieldLower = field.toLowerCase();

    for (const k of Object.keys(resp.headers)) {
      if (k.toLowerCase() === fieldLower) {
        return resp.headers[k];
      }
    }

    return null;
  }

  RouterResponse.getHeader = getHeader;

  function setHeader(resp, field, value) {
    if (!resp.headers) {
      resp.headers = {};
    }

    const fieldLower = field.toLowerCase();

    for (const k of Object.keys(resp.headers)) {
      if (k.toLowerCase() === fieldLower) {
        resp.headers[k] = value;
        return;
      }
    }

    resp.headers[field] = value;
  }

  RouterResponse.setHeader = setHeader;
})(RouterResponse = exports.RouterResponse || (exports.RouterResponse = {}));

/***/ }),

/***/ "./node_modules/cassava/dist/httpStatus.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Standard HTTP status codes.
 * @see <a href="https://tools.ietf.org/html/rfc4918">https://tools.ietf.org/html/rfc4918</a>
 * @see <a href="https://tools.ietf.org/html/rfc7231">https://tools.ietf.org/html/rfc7231</a>
 */

exports.httpStatusCode = {
  /**
   * Status codes for successful responses.
   */
  success: {
    /**
     * The request has succeeded.  The payload depends on the request method.
     *
     * GET  a representation of the target resource,
     *
     * HEAD  the same representation as GET, but without the representation
     * data,
     *
     * POST  a representation of the status of, or results obtained from,
     * the action,
     *
     * PUT, DELETE  a representation of the status of the action,
     *
     * OPTIONS  a representation of the communications options,
     *
     * TRACE  a representation of the request message as received by the end
     * server.
     */
    OK: 200,

    /**
     * The request has been fulfilled and has resulted in one or more new
     * resources being created.
     */
    CREATED: 201,

    /**
     * The request has been accepted for processing, but the processing has
     * not been completed.  The primary resource created by the request is
     * identified by either a Location header field in the response or, if
     * no Location field is received, by the effective request URI.
     */
    ACCEPTED: 202,

    /**
     * The request was successful but the enclosed payload has been modified
     * from that of the origin server's 200 (OK) response by a transforming
     * proxy.
     */
    NON_AUTHORITATIVE_INFORMATION: 203,

    /**
     * The server has successfully fulfilled the request and there is no
     * content to send in the response payload body.
     */
    NO_CONTENT: 204,

    /**
     * The server has fulfilled the request and desires that the user agent
     * reset the "document view", which caused the request to be sent, to
     * its original state as received from the origin server.
     */
    RESET_CONTENT: 205
  },

  /**
   * Status codes for redirect.  Pay special attention to which one is used
   * because they have subtle differences in browser and search engine behavior.
   */
  redirect: {
    /**
     * The target resource has more than one representation, each with its own
     * more specific identifier, and information about the alternatives is being
     * provided so that the user (or user agent) can select a preferred
     * representation by redirecting its request to one or more of those
     * identifiers.
     */
    MULTIPLE_CHOICES: 300,

    /**
     * The resource moved permanently.  Browsers will change POST to GET
     * on redirect.  Search engines will update their index.
     *
     * Include a Location header field in the response.
     */
    MOVED_PERMANENTLY: 301,

    /**
     * The resource moved temporarily.  Browsers will change POST to GET
     * on redirect.  Search engines will *not* update their index.
     *
     * Include a Location header field in the response.
     */
    FOUND: 302,

    /**
     * The server is redirecting the user agent to a different resource, as
     * indicated by a URI in the Location header field, which is intended to
     * provide an indirect response to the original request.
     */
    SEE_OTHER: 303,

    /**
     * Cache hit.  No content is sent.  This is determined by the request
     * headers If-Modified-Since or If-None-Match.
     */
    NOT_MODIFIED: 304,

    /**
     * The resource moved temporarily and browsers should resubmit,
     * preserving the method and body.  Don't use for GET.
     * Search engines will update their index.
     *
     * Include a Location header field in the response.
     */
    TEMPORARY_REDIRECT: 307,

    /**
     * The resource moved permanently and browsers should resubmit,
     * preserving the method and body.  Don't use for GET.
     * Search engines will *not* update their index.
     *
     * Include a Location header field in the response.
     */
    PERMANENT_REDIRECT: 308
  },

  /**
   * The client screwed up.
   */
  clientError: {
    /**
     * The request could not be understood by the server due to malformed
     * syntax. The client SHOULD NOT repeat the request without modifications.
     * For example the JSON body could not be parsed.
     */
    BAD_REQUEST: 400,

    /**
     * Authentication is required and the user is not logged in.
     */
    UNAUTHORIZED: 401,

    /**
     * The user is authenticated but does not have permission.
     */
    FORBIDDEN: 403,

    /**
     * The requested resource was not found.
     */
    NOT_FOUND: 404,

    /**
     * The resource does not support the given method.
     * The origin server MUST generate an Allow header field
     * containing a list of the supported methods.
     */
    METHOD_NOT_ALLOWED: 405,

    /**
     * The target resource does not have a current representation that would
     * be acceptable to the user agent, according to the proactive negotiation
     * header fields received in the request.
     */
    NOT_ACCEPTABLE: 406,

    /**
     * The request was understood, and semantically correct, but conflicts
     * with the current state.  For example: the type is locked.
     */
    CONFLICT: 409,

    /**
     * Access to the target resource is no longer available at the origin server
     * and this condition is likely to be permanent.
     *
     * The 410 response is primarily intended to assist the task of web
     * maintenance by notifying the recipient that the resource is
     * intentionally unavailable and that the server owners desire that
     * remote links to that resource be removed.
     */
    GONE: 410,

    /**
     * The server refuses to accept the request without a defined Content-Length.
     */
    LENGTH_REQUIRED: 411,

    /**
     * The request is larger than the server is willing or able to process.
     */
    PAYLOAD_TOO_LARGE: 413,

    /**
     * The request type has a media type which the server or resource
     * does not support.
     */
    UNSUPPORTED_MEDIA_TYPE: 415,

    /**
     * The client has asked for a portion of the file (byte serving), but
     * the server cannot supply that portion.
     */
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,

    /**
     * The expectation given in the request's Expect header field could not
     * be met.
     */
    EXPECTATION_FAILED: 417,

    /**
     * The request is syntactically correct, but contains semantic errors.
     * For example a string was expected but got a number.
     * @see <a href="https://tools.ietf.org/html/rfc4918#section-11.2">https://tools.ietf.org/html/rfc4918#section-11.2</a>
     */
    UNPROCESSABLE_ENTITY: 422,

    /**
     * The user has sent too many requests in a given amount of time.
     */
    TOO_MANY_REQUESTS: 429
  },

  /**
   * The server screwed up.
   */
  serverError: {
    /**
     * Generic server-side error.
     */
    INTERNAL_SERVER_ERROR: 500,

    /**
     * Usually implies future availability.
     */
    NOT_IMPLEMENTED: 501,

    /**
     * Received an invalid response from an inbound server it accessed while
     * acting as a proxy.
     */
    BAD_GATEWAY: 502,

    /**
     * A service is temporarily down.
     */
    SERVICE_UNAVAILABLE: 503,

    /**
     * Did not receive a timely response from an upstream server while acting
     * as a proxy.
     */
    GATEWAY_TIMEOUT: 504
  }
};
exports.httpStatusString = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non Authoritative Info",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  407: "Proxy Auth Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "Request URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
};

/***/ }),

/***/ "./node_modules/cassava/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var httpStatus_1 = __webpack_require__("./node_modules/cassava/dist/httpStatus.js");

exports.httpStatusCode = httpStatus_1.httpStatusCode;

var RestError_1 = __webpack_require__("./node_modules/cassava/dist/RestError.js");

exports.RestError = RestError_1.RestError;

var Router_1 = __webpack_require__("./node_modules/cassava/dist/Router.js");

exports.Router = Router_1.Router;

var RouterResponse_1 = __webpack_require__("./node_modules/cassava/dist/RouterResponse.js");

exports.RouterResponse = RouterResponse_1.RouterResponse;

var RouterEvent_1 = __webpack_require__("./node_modules/cassava/dist/RouterEvent.js");

exports.RouterEvent = RouterEvent_1.RouterEvent;

const routes = __webpack_require__("./node_modules/cassava/dist/routes/index.js");

exports.routes = routes;

const serializers = __webpack_require__("./node_modules/cassava/dist/serializers.js");

exports.serializers = serializers;

const testing = __webpack_require__("./node_modules/cassava/dist/testing/index.js");

exports.testing = testing;

/***/ }),

/***/ "./node_modules/cassava/dist/routes/BuildableRoute.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Negotiator = __webpack_require__("./node_modules/negotiator/index.js");

const RouterEvent_1 = __webpack_require__("./node_modules/cassava/dist/RouterEvent.js");

const RouterResponse_1 = __webpack_require__("./node_modules/cassava/dist/RouterResponse.js");

class BuildableRoute {
  constructor() {
    this.settings = {};
  }

  matches(evt) {
    if (this.settings.method && this.settings.method !== evt.httpMethod) {
      return false;
    }

    if (this.settings.pathRegex && !this.settings.pathRegex.test(evt.path)) {
      return false;
    }

    if (this.settings.serializers) {
      const negotiator = new Negotiator({
        headers: evt.headersLowerCase
      });

      if (!negotiator.mediaType(Object.keys(this.settings.serializers))) {
        return false;
      }
    }

    return true;
  }

  handle(evt) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.settings.handler) {
        const calculatedPathParameters = Object.assign({}, evt.pathParameters); // Map regex groups to pathParameters.

        const pathRegexExec = this.settings.pathRegex.exec(evt.path);

        for (let i = 1; i < pathRegexExec.length; i++) {
          const pathValue = decodeURIComponent(pathRegexExec[i]);

          if (this.settings.regexGroupToPathParamMap && this.settings.regexGroupToPathParamMap[i]) {
            calculatedPathParameters[this.settings.regexGroupToPathParamMap[i]] = pathValue;
          }

          calculatedPathParameters[i.toString()] = pathValue;
        }

        const pathedRouterEvent = Object.assign(new RouterEvent_1.RouterEvent(), evt);
        pathedRouterEvent.pathParameters = calculatedPathParameters;
        const resp = yield this.settings.handler(pathedRouterEvent);

        if (!resp) {
          return resp;
        }

        if (this.settings.serializers) {
          const negotiator = new Negotiator({
            headers: evt.headersLowerCase
          });
          const mediaType = negotiator.mediaType(Object.keys(this.settings.serializers));
          resp.body = yield this.settings.serializers[mediaType](resp.body);

          if (!resp.headers) {
            resp.headers = {};
          }

          RouterResponse_1.RouterResponse.setHeader(resp, "Content-Type", mediaType);
        }

        return resp;
      }

      return null;
    });
  }

  postProcess(evt, resp, handlingRoutes) {
    if (this.settings.postProcessor) {
      return this.settings.postProcessor(evt, resp, handlingRoutes);
    }

    return null;
  }

  path(path) {
    if (!path) {
      throw new Error("path cannot be null");
    }

    if (this.settings.pathRegex) {
      throw new Error("path is already defined");
    }

    if (typeof path === "string") {
      // Turn path into a regex, replace {pathParam}s with regex groups
      // and build the map that maps the group index to the path param name.
      this.settings.regexGroupToPathParamMap = [""];
      const sanitizedPathRegex = path.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&").replace(/\\{[a-zA-Z][a-zA-Z0-9]*\\}/g, substr => {
        const pathParamName = substr.replace(/^\\{/, "").replace(/\\}/, "");
        this.settings.regexGroupToPathParamMap.push(pathParamName);
        return "([0-9a-zA-Z\-._~!$&'()*+,;=:@%]+)";
      });
      path = new RegExp(`^${sanitizedPathRegex}$`, "i");
    }

    if (path instanceof RegExp) {
      this.settings.pathRegex = path;
    } else {
      throw new Error("unknown path type");
    }

    return this;
  }

  method(method) {
    if (!method) {
      throw new Error("method cannot be null");
    }

    if (this.settings.method) {
      throw new Error("method is already defined");
    }

    this.settings.method = method;
    return this;
  }

  serializers(serializers) {
    if (!serializers) {
      throw new Error("serializers cannot be null");
    }

    if (this.settings.serializers) {
      throw new Error("serializers is already defined");
    } // For text mime-types without a charset specified add a default utf-8 version.


    const serializersWithCharsets = Object.assign({}, serializers);

    for (const type in serializers) {
      if (serializers.hasOwnProperty(type) && /^(text\/[^;]+|application\/json)$/.test(type)) {
        serializersWithCharsets[`${type}; charset=utf-8`] = serializers[type];
      }
    }

    this.settings.serializers = serializersWithCharsets;
    return this;
  }

  handler(handler) {
    if (!handler) {
      throw new Error("handler cannot be null");
    }

    if (this.settings.handler) {
      throw new Error("handler is already defined");
    }

    this.settings.handler = handler;
    return this;
  }

  postProcessor(postProcessor) {
    if (!postProcessor) {
      throw new Error("postProcessor cannot be null");
    }

    if (this.settings.postProcessor) {
      throw new Error("postProcessor is already defined");
    }

    this.settings.postProcessor = postProcessor;
    return this;
  }

}

exports.BuildableRoute = BuildableRoute;

/***/ }),

/***/ "./node_modules/cassava/dist/routes/DefaultRoute.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const RestError_1 = __webpack_require__("./node_modules/cassava/dist/RestError.js");

const httpStatus_1 = __webpack_require__("./node_modules/cassava/dist/httpStatus.js");
/**
 * Matches all requests and returns the same response every time.
 * Default behaviour is to return a 404 response.
 */


class DefaultRoute {
  constructor(statusCode = httpStatus_1.httpStatusCode.clientError.NOT_FOUND, message = "Resource not found.  There are no matching paths.  Check the API documentation.") {
    this.statusCode = statusCode;
    this.message = message;
  }

  matches(evt) {
    return true;
  }

  handle(evt) {
    return __awaiter(this, void 0, void 0, function* () {
      throw new RestError_1.RestError(this.statusCode, this.message);
    });
  }

}

exports.DefaultRoute = DefaultRoute;

/***/ }),

/***/ "./node_modules/cassava/dist/routes/FileSystemRoute.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__("fs");

const path = __webpack_require__("path");

class FileSystemRoute {
  constructor(config) {
    this.config = config;

    if (!config) {
      throw new Error("config must be set");
    }

    if (typeof config.fsPath !== "string") {
      throw new Error("config.fsPath must be set");
    }

    if (typeof config.restPath !== "string") {
      throw new Error("config.restPath must be set");
    }

    if (!config.restPath.startsWith("/")) {
      throw new Error("config.restPath must start with '/'");
    }

    if (!config.restPath.endsWith("/")) {
      throw new Error("config.restPath must end with '/'");
    }
  }

  matches(evt) {
    return evt.httpMethod === "GET" && evt.path.startsWith(this.config.restPath);
  }

  handle(evt) {
    const truePath = path.normalize(path.join(this.config.fsPath, evt.path.substring(this.config.restPath.length)));

    if (!truePath.startsWith(path.normalize(this.config.fsPath))) {
      // Someone is trying to ../ their way down the fs.
      return Promise.resolve(null);
    }

    if (this.config.fileExtensionBlacklist && this.config.fileExtensionBlacklist.find(ext => truePath.endsWith(ext))) {
      return Promise.resolve(null);
    }

    if (this.config.fileExtensionWhitelist && !this.config.fileExtensionWhitelist.find(ext => truePath.endsWith(ext))) {
      return Promise.resolve(null);
    }

    return new Promise((res, rej) => {
      fs.readFile(truePath, (err, data) => {
        if (err) {
          res(null);
        } else {
          res({
            statusCode: 200,
            headers: {
              "Content-Type": this.getMimeType(truePath)
            },
            body: data
          });
        }
      });
    });
  }

  getMimeType(filePath) {
    let ext = path.extname(filePath);

    if (this.config.mimeTypes && this.config.mimeTypes[ext]) {
      return this.config.mimeTypes[ext];
    }

    if (FileSystemRoute.mimeTypes[ext]) {
      return FileSystemRoute.mimeTypes[ext];
    }

    return "application/octet-stream";
  }

}

FileSystemRoute.mimeTypes = {
  ".3g2": "video/3gpp2",
  ".3gp": "video/3gpp",
  ".3gpp": "video/3gpp",
  ".ac": "application/pkix-attr-cert",
  ".adp": "audio/adpcm",
  ".ai": "application/postscript",
  ".apng": "image/apng",
  ".appcache": "text/cache-manifest",
  ".asc": "application/pgp-signature",
  ".atom": "application/atom+xml",
  ".atomcat": "application/atomcat+xml",
  ".atomsvc": "application/atomsvc+xml",
  ".au": "audio/basic",
  ".aw": "application/applixware",
  ".bdoc": "application/bdoc",
  ".bin": "application/octet-stream",
  ".bmp": "image/bmp",
  ".bpk": "application/octet-stream",
  ".buffer": "application/octet-stream",
  ".ccxml": "application/ccxml+xml",
  ".cdmia": "application/cdmi-capability",
  ".cdmic": "application/cdmi-container",
  ".cdmid": "application/cdmi-domain",
  ".cdmio": "application/cdmi-object",
  ".cdmiq": "application/cdmi-queue",
  ".cer": "application/pkix-cert",
  ".cgm": "image/cgm",
  ".class": "application/java-vm",
  ".coffee": "text/coffeescript",
  ".conf": "text/plain",
  ".cpt": "application/mac-compactpro",
  ".crl": "application/pkix-crl",
  ".css": "text/css",
  ".csv": "text/csv",
  ".cu": "application/cu-seeme",
  ".davmount": "application/davmount+xml",
  ".dbk": "application/docbook+xml",
  ".deb": "application/octet-stream",
  ".def": "text/plain",
  ".deploy": "application/octet-stream",
  ".dist": "application/octet-stream",
  ".distz": "application/octet-stream",
  ".dll": "application/octet-stream",
  ".dmg": "application/octet-stream",
  ".dms": "application/octet-stream",
  ".doc": "application/msword",
  ".dot": "application/msword",
  ".dssc": "application/dssc+der",
  ".dtd": "application/xml-dtd",
  ".dump": "application/octet-stream",
  ".ear": "application/java-archive",
  ".ecma": "application/ecmascript",
  ".elc": "application/octet-stream",
  ".eml": "message/rfc822",
  ".emma": "application/emma+xml",
  ".eps": "application/postscript",
  ".epub": "application/epub+zip",
  ".exe": "application/octet-stream",
  ".exi": "application/exi",
  ".ez": "application/andrew-inset",
  ".g3": "image/g3fax",
  ".gbr": "application/rpki-ghostbusters",
  ".geojson": "application/geo+json",
  ".gif": "image/gif",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".gml": "application/gml+xml",
  ".gpx": "application/gpx+xml",
  ".gram": "application/srgs",
  ".grxml": "application/srgs+xml",
  ".gxf": "application/gxf",
  ".gz": "application/gzip",
  ".h261": "video/h261",
  ".h263": "video/h263",
  ".h264": "video/h264",
  ".hjson": "text/hjson",
  ".hlp": "application/winhlp",
  ".hqx": "application/mac-binhex40",
  ".htm": "text/html",
  ".html": "text/html",
  ".ics": "text/calendar",
  ".ief": "image/ief",
  ".ifb": "text/calendar",
  ".iges": "model/iges",
  ".igs": "model/iges",
  ".img": "application/octet-stream",
  ".in": "text/plain",
  ".ini": "text/plain",
  ".ink": "application/inkml+xml",
  ".inkml": "application/inkml+xml",
  ".ipfix": "application/ipfix",
  ".iso": "application/octet-stream",
  ".jade": "text/jade",
  ".jar": "application/java-archive",
  ".jpe": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".jpgm": "video/jpm",
  ".jpgv": "video/jpeg",
  ".jpm": "video/jpm",
  ".js": "application/javascript",
  ".json": "application/json",
  ".json5": "application/json5",
  ".jsonld": "application/ld+json",
  ".jsonml": "application/jsonml+json",
  ".jsx": "text/jsx",
  ".kar": "audio/midi",
  ".ktx": "image/ktx",
  ".less": "text/less",
  ".list": "text/plain",
  ".litcoffee": "text/coffeescript",
  ".log": "text/plain",
  ".lostxml": "application/lost+xml",
  ".lrf": "application/octet-stream",
  ".m1v": "video/mpeg",
  ".m21": "application/mp21",
  ".m2a": "audio/mpeg",
  ".m2v": "video/mpeg",
  ".m3a": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".m4p": "application/mp4",
  ".ma": "application/mathematica",
  ".mads": "application/mads+xml",
  ".man": "text/troff",
  ".manifest": "text/cache-manifest",
  ".map": "application/json",
  ".mar": "application/octet-stream",
  ".markdown": "text/markdown",
  ".mathml": "application/mathml+xml",
  ".mb": "application/mathematica",
  ".mbox": "application/mbox",
  ".md": "text/markdown",
  ".me": "text/troff",
  ".mesh": "model/mesh",
  ".meta4": "application/metalink4+xml",
  ".metalink": "application/metalink+xml",
  ".mets": "application/mets+xml",
  ".mft": "application/rpki-manifest",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".mime": "message/rfc822",
  ".mj2": "video/mj2",
  ".mjp2": "video/mj2",
  ".mjs": "application/javascript",
  ".mml": "text/mathml",
  ".mods": "application/mods+xml",
  ".mov": "video/quicktime",
  ".mp2": "audio/mpeg",
  ".mp21": "application/mp21",
  ".mp2a": "audio/mpeg",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".mp4a": "audio/mp4",
  ".mp4s": "application/mp4",
  ".mp4v": "video/mp4",
  ".mpd": "application/dash+xml",
  ".mpe": "video/mpeg",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".mpg4": "video/mp4",
  ".mpga": "audio/mpeg",
  ".mrc": "application/marc",
  ".mrcx": "application/marcxml+xml",
  ".ms": "text/troff",
  ".mscml": "application/mediaservercontrol+xml",
  ".msh": "model/mesh",
  ".msi": "application/octet-stream",
  ".msm": "application/octet-stream",
  ".msp": "application/octet-stream",
  ".mxf": "application/mxf",
  ".mxml": "application/xv+xml",
  ".n3": "text/n3",
  ".nb": "application/mathematica",
  ".oda": "application/oda",
  ".oga": "audio/ogg",
  ".ogg": "audio/ogg",
  ".ogv": "video/ogg",
  ".ogx": "application/ogg",
  ".omdoc": "application/omdoc+xml",
  ".onepkg": "application/onenote",
  ".onetmp": "application/onenote",
  ".onetoc": "application/onenote",
  ".onetoc2": "application/onenote",
  ".opf": "application/oebps-package+xml",
  ".otf": "font/otf",
  ".oxps": "application/oxps",
  ".p10": "application/pkcs10",
  ".p7c": "application/pkcs7-mime",
  ".p7m": "application/pkcs7-mime",
  ".p7s": "application/pkcs7-signature",
  ".p8": "application/pkcs8",
  ".pdf": "application/pdf",
  ".pfr": "application/font-tdpfr",
  ".pgp": "application/pgp-encrypted",
  ".pkg": "application/octet-stream",
  ".pki": "application/pkixcmp",
  ".pkipath": "application/pkix-pkipath",
  ".pls": "application/pls+xml",
  ".png": "image/png",
  ".prf": "application/pics-rules",
  ".ps": "application/postscript",
  ".pskcxml": "application/pskc+xml",
  ".qt": "video/quicktime",
  ".rdf": "application/rdf+xml",
  ".rif": "application/reginfo+xml",
  ".rl": "application/resource-lists+xml",
  ".rld": "application/resource-lists-diff+xml",
  ".rmi": "audio/midi",
  ".rnc": "application/relax-ng-compact-syntax",
  ".rng": "application/xml",
  ".roa": "application/rpki-roa",
  ".roff": "text/troff",
  ".rq": "application/sparql-query",
  ".rs": "application/rls-services+xml",
  ".rsd": "application/rsd+xml",
  ".rss": "application/rss+xml",
  ".rtf": "application/rtf",
  ".rtx": "text/richtext",
  ".s3m": "audio/s3m",
  ".sbml": "application/sbml+xml",
  ".scq": "application/scvp-cv-request",
  ".scs": "application/scvp-cv-response",
  ".sdp": "application/sdp",
  ".ser": "application/java-serialized-object",
  ".setpay": "application/set-payment-initiation",
  ".setreg": "application/set-registration-initiation",
  ".sgi": "image/sgi",
  ".sgm": "text/sgml",
  ".sgml": "text/sgml",
  ".shf": "application/shf+xml",
  ".shtml": "text/html",
  ".sig": "application/pgp-signature",
  ".sil": "audio/silk",
  ".silo": "model/mesh",
  ".slim": "text/slim",
  ".slm": "text/slim",
  ".smi": "application/smil+xml",
  ".smil": "application/smil+xml",
  ".snd": "audio/basic",
  ".so": "application/octet-stream",
  ".spp": "application/scvp-vp-response",
  ".spq": "application/scvp-vp-request",
  ".spx": "audio/ogg",
  ".sru": "application/sru+xml",
  ".srx": "application/sparql-results+xml",
  ".ssdl": "application/ssdl+xml",
  ".ssml": "application/ssml+xml",
  ".stk": "application/hyperstudio",
  ".styl": "text/stylus",
  ".stylus": "text/stylus",
  ".svg": "image/svg+xml",
  ".svgz": "image/svg+xml",
  ".t": "text/troff",
  ".tei": "application/tei+xml",
  ".teicorpus": "application/tei+xml",
  ".text": "text/plain",
  ".tfi": "application/thraud+xml",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".tr": "text/troff",
  ".ts": "video/mp2t",
  ".tsd": "application/timestamped-data",
  ".tsv": "text/tab-separated-values",
  ".ttl": "text/turtle",
  ".txt": "text/plain",
  ".uri": "text/uri-list",
  ".uris": "text/uri-list",
  ".urls": "text/uri-list",
  ".vcard": "text/vcard",
  ".vrml": "model/vrml",
  ".vtt": "text/vtt",
  ".vxml": "application/voicexml+xml",
  ".war": "application/java-archive",
  ".wav": "audio/wav",
  ".weba": "audio/webm",
  ".webm": "video/webm",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".wgt": "application/widget",
  ".woff": "application/font-woff",
  ".woff2": "application/font-woff2",
  ".wrl": "model/vrml",
  ".wsdl": "application/wsdl+xml",
  ".wspolicy": "application/wspolicy+xml",
  ".x3d": "model/x3d+xml",
  ".x3db": "model/x3d+binary",
  ".x3dbz": "model/x3d+binary",
  ".x3dv": "model/x3d+vrml",
  ".x3dvz": "model/x3d+vrml",
  ".x3dz": "model/x3d+xml",
  ".xaml": "application/xaml+xml",
  ".xdf": "application/xcap-diff+xml",
  ".xdssc": "application/dssc+xml",
  ".xenc": "application/xenc+xml",
  ".xer": "application/patch-ops-error+xml",
  ".xht": "application/xhtml+xml",
  ".xhtml": "application/xhtml+xml",
  ".xhvml": "application/xv+xml",
  ".xm": "audio/xm",
  ".xml": "application/xml",
  ".xop": "application/xop+xml",
  ".xpl": "application/xproc+xml",
  ".xsd": "application/xml",
  ".xsl": "application/xml",
  ".xslt": "application/xslt+xml",
  ".xspf": "application/xspf+xml",
  ".xvm": "application/xv+xml",
  ".xvml": "application/xv+xml",
  ".yaml": "text/yaml",
  ".yang": "application/yang",
  ".yin": "application/yin+xml",
  ".yml": "text/yaml",
  ".zip": "application/zip"
};
exports.FileSystemRoute = FileSystemRoute;

/***/ }),

/***/ "./node_modules/cassava/dist/routes/LoggingRoute.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Logs all requests and responses.
 */

class LoggingRoute {
  constructor(options = {}) {
    this.options = options;
  }

  matches(evt) {
    return true;
  }

  handle(evt) {
    const msg = this.requestToString(evt);
    this.log(msg);
  }

  postProcess(evt, resp) {
    const msg = `${this.requestToString(evt)} ${this.responseToString(resp)}`;
    this.log(msg);
  }

  requestToString(evt) {
    let msg = `${evt.httpMethod} ${evt.path}${this.queryMapToString(evt.multiValueQueryStringParameters || evt.queryStringParameters)}`;

    if (!this.options.hideRequestBody && evt.body != null) {
      msg += ` reqbody=${JSON.stringify(evt.body)}`;
    }

    if (this.options.logRequestHeaders) {
      msg += ` reqheaders={${this.headersToString(evt.multiValueHeaders || evt.headers, this.options.logRequestHeaders)}}`;
    }

    return msg;
  }

  responseToString(resp) {
    let msg = `status=${resp.statusCode || 200}`;

    if (!this.options.hideResponseBody && resp.body != null) {
      msg += ` respbody=${JSON.stringify(resp.body)}`;
    }

    if (this.options.logResponseHeaders) {
      msg += ` respheaders={${this.headersToString(resp.headers, this.options.logResponseHeaders)}}`;
    }

    return msg;
  }

  queryMapToString(queryStringParameters) {
    if (!queryStringParameters) {
      return "";
    }

    const keys = Object.keys(queryStringParameters);

    if (!keys.length) {
      return "";
    }

    return "?" + keys.map(key => {
      const value = queryStringParameters[key];

      if (Array.isArray(value)) {
        return value.map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join("&");
  }

  headersToString(headers, headersFilter) {
    let keys = Object.keys(headers);

    if (Array.isArray(headersFilter)) {
      const filterLowerCase = headersFilter.map(h => h.toLowerCase());
      keys = keys.filter(key => filterLowerCase ? filterLowerCase.indexOf(key.toLowerCase()) !== -1 : true);
    }

    return keys.map(key => {
      const value = headers[key];

      if (Array.isArray(value)) {
        return value.map(value => `${key}=${value}`).join(", ");
      }

      return `${key}=${value}`;
    }).join(", ");
  }

  log(msg) {
    if (this.options.logFunction) {
      this.options.logFunction(msg);
    } else {
      console.log(msg);
    }
  }

}

exports.LoggingRoute = LoggingRoute;

/***/ }),

/***/ "./node_modules/cassava/dist/routes/ProxyRoute.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const http = __webpack_require__("http");

const https = __webpack_require__("https");

const querystring = __webpack_require__("querystring");

const url = __webpack_require__("url");
/**
 * Proxies requests to another server.
 */


class ProxyRoute {
  constructor(config) {
    this.config = config;

    if (!config) {
      throw new Error("config must be set");
    }

    if (typeof config.srcPath !== "string") {
      throw new Error("config.srcPath must be set");
    }

    if (!config.srcPath.startsWith("/")) {
      throw new Error("config.srcPath must start with `/`");
    }

    if (config.srcPath.includes("?") || config.srcPath.includes("#")) {
      throw new Error("config.srcPath cannot define a query or hash");
    }

    if (typeof config.destPath !== "string") {
      throw new Error("config.destPath must be set");
    }

    if (!config.destPath.match(/^https?:\/\//)) {
      throw new Error("config.destPath must start with http:// or https://");
    }

    if (config.destPath.includes("?") || config.destPath.includes("#")) {
      throw new Error("config.destPath cannot define a query or hash");
    }

    this.parsedDest = url.parse ? url.parse(config.destPath) : new url.URL(config.destPath);
  }

  matches(evt) {
    return evt.path.startsWith(this.config.srcPath) && (evt.path.length === this.config.srcPath.length || this.config.srcPath.endsWith("/") || evt.path[this.config.srcPath.length] === "/");
  }

  handle(evt) {
    return __awaiter(this, void 0, void 0, function* () {
      let reqArgs = {
        protocol: this.parsedDest.protocol,
        hostname: this.parsedDest.hostname,
        method: evt.httpMethod,
        headers: Object.assign({}, evt.headers, this.config.additionalHeaders),
        path: this.parsedDest.path + evt.path.substr(this.config.srcPath.length)
      };

      if (evt.multiValueQueryStringParameters) {
        const q = querystring.stringify(evt.multiValueQueryStringParameters);

        if (q.length) {
          reqArgs.path += "?" + q;
        }
      }

      if (this.config.requestMapper) {
        reqArgs = yield this.config.requestMapper(reqArgs);

        if (!reqArgs) {
          return null;
        }
      }

      let body = evt.body;

      if (body && this.config.bodyMapper) {
        body = yield this.config.bodyMapper(body);
      }

      let bodyContentType = body && this.getRequestBodyContentType(reqArgs);

      if (body && !bodyContentType) {
        bodyContentType = reqArgs.headers["Content-Type"] = "application/json";
      } // Do this manually so as to not create another dependency.


      return new Promise((resolve, reject) => {
        const reqFunction = reqArgs.protocol === "http:" ? http.request : https.request;
        const req = reqFunction(reqArgs, res => {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: ""
          };
          res.on("data", d => response.body += d);
          res.on("end", () => resolve(response));
        });
        req.on("error", e => reject(e));

        if (body !== undefined) {
          if (typeof body === "string" && !bodyContentType.match(/json$/)) {
            req.write(body);
          } else {
            req.write(JSON.stringify(body));
          }
        }

        req.end();
      });
    });
  }

  getRequestBodyContentType(reqArgs) {
    for (const header of Object.keys(reqArgs.headers)) {
      if (header.toLowerCase() === "content-type") {
        return reqArgs.headers[header];
      }
    }

    return null;
  }

}

exports.ProxyRoute = ProxyRoute;

/***/ }),

/***/ "./node_modules/cassava/dist/routes/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var BuildableRoute_1 = __webpack_require__("./node_modules/cassava/dist/routes/BuildableRoute.js");

exports.BuildableRoute = BuildableRoute_1.BuildableRoute;

var DefaultRoute_1 = __webpack_require__("./node_modules/cassava/dist/routes/DefaultRoute.js");

exports.DefaultRoute = DefaultRoute_1.DefaultRoute;

var FileSystemRoute_1 = __webpack_require__("./node_modules/cassava/dist/routes/FileSystemRoute.js");

exports.FileSystemRoute = FileSystemRoute_1.FileSystemRoute;

var ProxyRoute_1 = __webpack_require__("./node_modules/cassava/dist/routes/ProxyRoute.js");

exports.ProxyRoute = ProxyRoute_1.ProxyRoute;

var LoggingRoute_1 = __webpack_require__("./node_modules/cassava/dist/routes/LoggingRoute.js");

exports.LoggingRoute = LoggingRoute_1.LoggingRoute;

/***/ }),

/***/ "./node_modules/cassava/dist/serializers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function jsonSerializer(body) {
  return JSON.stringify(body);
}

exports.jsonSerializer = jsonSerializer;

function textSerializer(body) {
  return body.toString();
}

exports.textSerializer = textSerializer;

/***/ }),

/***/ "./node_modules/cassava/dist/testing/createTestLambdaContext.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const uuid = __webpack_require__("./node_modules/uuid/v4.js");

var createTestProxyEvent_1 = __webpack_require__("./node_modules/cassava/dist/testing/createTestProxyEvent.js");

exports.createTestProxyEvent = createTestProxyEvent_1.createTestProxyEvent;
const defaultContext = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "lambdafunction",
  functionVersion: "1.0",
  invokedFunctionArn: "",
  memoryLimitInMB: 128,
  awsRequestId: "",
  logGroupName: "/aws/lambda/lambdafunction",
  logStreamName: "",
  getRemainingTimeInMillis: () => 60,
  done: () => {},
  fail: () => {},
  succeed: () => {}
};

function createTestLambdaContext(proxyEvent, overrides = {}) {
  const date = new Date();
  return Object.assign({}, defaultContext, {
    awsRequestId: proxyEvent.requestContext.requestId,
    invokedFunctionArn: `arn:aws:lambda:us-east-1:${proxyEvent.requestContext.accountId}:function:lambdafunction`,
    logStreamName: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}/[$LATEST]${uuid().replace("-", "")}`
  }, overrides);
}

exports.createTestLambdaContext = createTestLambdaContext;

/***/ }),

/***/ "./node_modules/cassava/dist/testing/createTestProxyEvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const querystring = __webpack_require__("querystring");

const uuid = __webpack_require__("./node_modules/uuid/v4.js");

const url_1 = __webpack_require__("url");

const randomableCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length) {
  let text = "";

  for (let i = 0; i < length; i++) {
    text += randomableCharacters.charAt(Math.floor(Math.random() * randomableCharacters.length));
  }

  return text;
}

const defaultTestProxyEvent = {
  body: null,
  headers: null,
  httpMethod: "GET",
  isBase64Encoded: false,
  multiValueHeaders: null,
  multiValueQueryStringParameters: null,
  path: "/",
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    accountId: "12345678912",
    apiId: randomString(10),
    httpMethod: "GET",
    identity: {
      accessKey: "abcdefg",
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      sourceIp: "192.168.0.0",
      user: null,
      userAgent: "PostmanRuntime/2.4.5",
      userArn: null
    },
    path: "/",
    requestId: "",
    resourceId: randomString(6),
    resourcePath: "/{proxy+}",
    requestTimeEpoch: Date.now(),
    stage: "testStage"
  },
  resource: "/{proxy+}",
  stageVariables: null
};
/**
 * Create a fake ProxyEvent object that can be passed into the handler returned
 * from getLambdaHandler().
 */

function createTestProxyEvent(url = "/", method = "GET", overrides = {}) {
  const heavyUrl = new url_1.URL(url, "https://example.org/");
  const mixedQueryStringParams = heavyUrl.search ? querystring.parse(heavyUrl.search.substring(1)) : null;
  return Object.assign({}, defaultTestProxyEvent, overrides, {
    requestContext: Object.assign({}, defaultTestProxyEvent.requestContext, overrides.requestContext ? overrides.requestContext : {}, {
      httpMethod: method,
      requestId: uuid()
    }),
    httpMethod: method,
    path: heavyUrl.pathname,
    queryStringParameters: deduplicateQueryStringParameters(mixedQueryStringParams),
    multiValueQueryStringParameters: normalizeMultiValueQueryStringParameters(mixedQueryStringParams)
  });
}

exports.createTestProxyEvent = createTestProxyEvent;
/**
 * Turn a query params object that allows for duplicate query string values into one that doesn't.
 * Empirically API Gateway takes the last version on duplicates.
 */

function deduplicateQueryStringParameters(params) {
  if (params == null) {
    return null;
  }

  const queryStringParameters = {};

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      queryStringParameters[key] = value[value.length - 1];
    } else {
      queryStringParameters[key] = value;
    }
  }

  return queryStringParameters;
}

function normalizeMultiValueQueryStringParameters(params) {
  if (params == null) {
    return null;
  }

  const multiValueQueryStringParameters = {};

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      multiValueQueryStringParameters[key] = value;
    } else {
      multiValueQueryStringParameters[key] = [value];
    }
  }

  return multiValueQueryStringParameters;
}

/***/ }),

/***/ "./node_modules/cassava/dist/testing/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const createTestLambdaContext_1 = __webpack_require__("./node_modules/cassava/dist/testing/createTestLambdaContext.js");

var createTestProxyEvent_1 = __webpack_require__("./node_modules/cassava/dist/testing/createTestProxyEvent.js");

exports.createTestProxyEvent = createTestProxyEvent_1.createTestProxyEvent;
/**
 * Test the given Router with the given ProxyEvent and return the result
 * in a Promise.  This plus `createTestProxyEvent` is the easiest way to test
 * a Router, especially with the async/await pattern.
 */

function testRouter(router, proxyEvent) {
  return new Promise((resolve, reject) => {
    if (!router || !router.getLambdaHandler) {
      reject("router must be an instance of Router");
    }

    const responsePromise = router.getLambdaHandler()(proxyEvent, createTestLambdaContext_1.createTestLambdaContext(proxyEvent), (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });

    if (responsePromise) {
      responsePromise.then(res => resolve(res), err => reject(err));
    }
  });
}

exports.testRouter = testRouter;

/***/ }),

/***/ "./node_modules/cookie/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('='); // skip things that don't look like key=value

    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim(); // quoted values

    if ('"' == val[0]) {
      val = val.slice(1, -1);
    } // only assign once


    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */


function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;

      case 'lax':
        str += '; SameSite=Lax';
        break;

      case 'strict':
        str += '; SameSite=Strict';
        break;

      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */


function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

/***/ }),

/***/ "./node_modules/jsonschema/lib/attribute.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__("./node_modules/jsonschema/lib/helpers.js");
/** @type ValidatorResult */


var ValidatorResult = helpers.ValidatorResult;
/** @type SchemaError */

var SchemaError = helpers.SchemaError;
var attribute = {};
attribute.ignoreProperties = {
  // informative properties
  'id': true,
  'default': true,
  'description': true,
  'title': true,
  // arguments to other properties
  'exclusiveMinimum': true,
  'exclusiveMaximum': true,
  'additionalItems': true,
  // special-handled properties
  '$schema': true,
  '$ref': true,
  'extends': true
};
/**
 * @name validators
 */

var validators = attribute.validators = {};
/**
 * Validates whether the instance if of a certain type
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */

validators.type = function validateType(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  var types = Array.isArray(schema.type) ? schema.type : [schema.type];

  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
    var list = types.map(function (v) {
      return v.id && '<' + v.id + '>' || v + '';
    });
    result.addError({
      name: 'type',
      argument: list,
      message: "is not of a type(s) " + list
    });
  }

  return result;
};

function testSchemaNoThrow(instance, options, ctx, callback, schema) {
  var throwError = options.throwError;
  options.throwError = false;
  var res = this.validateSchema(instance, schema, options, ctx);
  options.throwError = throwError;

  if (!res.valid && callback instanceof Function) {
    callback(res);
  }

  return res.valid;
}
/**
 * Validates whether the instance matches some of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {ValidatorResult|null}
 */


validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  var inner = new ValidatorResult(instance, schema, options, ctx);

  if (!Array.isArray(schema.anyOf)) {
    throw new SchemaError("anyOf must be an array");
  }

  if (!schema.anyOf.some(testSchemaNoThrow.bind(this, instance, options, ctx, function (res) {
    inner.importErrors(res);
  }))) {
    var list = schema.anyOf.map(function (v, i) {
      return v.id && '<' + v.id + '>' || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
    });

    if (options.nestedErrors) {
      result.importErrors(inner);
    }

    result.addError({
      name: 'anyOf',
      argument: list,
      message: "is not any of " + list.join(',')
    });
  }

  return result;
};
/**
 * Validates whether the instance matches every given schema
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */


validators.allOf = function validateAllOf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }

  if (!Array.isArray(schema.allOf)) {
    throw new SchemaError("allOf must be an array");
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  var self = this;
  schema.allOf.forEach(function (v, i) {
    var valid = self.validateSchema(instance, v, options, ctx);

    if (!valid.valid) {
      var msg = v.id && '<' + v.id + '>' || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
      result.addError({
        name: 'allOf',
        argument: {
          id: msg,
          length: valid.errors.length,
          valid: valid
        },
        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:'
      });
      result.importErrors(valid);
    }
  });
  return result;
};
/**
 * Validates whether the instance matches exactly one of the given schemas
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null}
 */


validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
  // Ignore undefined instances
  if (instance === undefined) {
    return null;
  }

  if (!Array.isArray(schema.oneOf)) {
    throw new SchemaError("oneOf must be an array");
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  var inner = new ValidatorResult(instance, schema, options, ctx);
  var count = schema.oneOf.filter(testSchemaNoThrow.bind(this, instance, options, ctx, function (res) {
    inner.importErrors(res);
  })).length;
  var list = schema.oneOf.map(function (v, i) {
    return v.id && '<' + v.id + '>' || v.title && JSON.stringify(v.title) || v['$ref'] && '<' + v['$ref'] + '>' || '[subschema ' + i + ']';
  });

  if (count !== 1) {
    if (options.nestedErrors) {
      result.importErrors(inner);
    }

    result.addError({
      name: 'oneOf',
      argument: list,
      message: "is not exactly one from " + list.join(',')
    });
  }

  return result;
};
/**
 * Validates properties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */


validators.properties = function validateProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var properties = schema.properties || {};

  for (var property in properties) {
    if (typeof options.preValidateProperty == 'function') {
      options.preValidateProperty(instance, property, properties[property], options, ctx);
    }

    var prop = Object.hasOwnProperty.call(instance, property) ? instance[property] : undefined;
    var res = this.validateSchema(prop, properties[property], options, ctx.makeChild(properties[property], property));
    if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }

  return result;
};
/**
 * Test a specific property within in instance against the additionalProperties schema attribute
 * This ignores properties with definitions in the properties schema attribute, but no other attributes.
 * If too many more types of property-existance tests pop up they may need their own class of tests (like `type` has)
 * @private
 * @return {boolean}
 */


function testAdditionalProperty(instance, schema, options, ctx, property, result) {
  if (!this.types.object(instance)) return;

  if (schema.properties && schema.properties[property] !== undefined) {
    return;
  }

  if (schema.additionalProperties === false) {
    result.addError({
      name: 'additionalProperties',
      argument: property,
      message: "additionalProperty " + JSON.stringify(property) + " exists in instance when not allowed"
    });
  } else {
    var additionalProperties = schema.additionalProperties || {};

    if (typeof options.preValidateProperty == 'function') {
      options.preValidateProperty(instance, property, additionalProperties, options, ctx);
    }

    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
    if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
    result.importErrors(res);
  }
}
/**
 * Validates patternProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */


validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var patternProperties = schema.patternProperties || {};

  for (var property in instance) {
    var test = true;

    for (var pattern in patternProperties) {
      var expr = new RegExp(pattern);

      if (!expr.test(property)) {
        continue;
      }

      test = false;

      if (typeof options.preValidateProperty == 'function') {
        options.preValidateProperty(instance, property, patternProperties[pattern], options, ctx);
      }

      var res = this.validateSchema(instance[property], patternProperties[pattern], options, ctx.makeChild(patternProperties[pattern], property));
      if (res.instance !== result.instance[property]) result.instance[property] = res.instance;
      result.importErrors(res);
    }

    if (test) {
      testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    }
  }

  return result;
};
/**
 * Validates additionalProperties
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */


validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return; // if patternProperties is defined then we'll test when that one is called instead

  if (schema.patternProperties) {
    return null;
  }

  var result = new ValidatorResult(instance, schema, options, ctx);

  for (var property in instance) {
    testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
  }

  return result;
};
/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);

  if (!(keys.length >= schema.minProperties)) {
    result.addError({
      name: 'minProperties',
      argument: schema.minProperties,
      message: "does not meet minimum property length of " + schema.minProperties
    });
  }

  return result;
};
/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);

  if (!(keys.length <= schema.maxProperties)) {
    result.addError({
      name: 'maxProperties',
      argument: schema.maxProperties,
      message: "does not meet maximum property length of " + schema.maxProperties
    });
  }

  return result;
};
/**
 * Validates items when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */


validators.items = function validateItems(instance, schema, options, ctx) {
  var self = this;
  if (!this.types.array(instance)) return;
  if (!schema.items) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  instance.every(function (value, i) {
    var items = Array.isArray(schema.items) ? schema.items[i] || schema.additionalItems : schema.items;

    if (items === undefined) {
      return true;
    }

    if (items === false) {
      result.addError({
        name: 'items',
        message: "additionalItems not permitted"
      });
      return false;
    }

    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
    if (res.instance !== result.instance[i]) result.instance[i] = res.instance;
    result.importErrors(res);
    return true;
  });
  return result;
};
/**
 * Validates minimum and exclusiveMinimum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.minimum = function validateMinimum(instance, schema, options, ctx) {
  if (!this.types.number(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid = true;

  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
    valid = instance > schema.minimum;
  } else {
    valid = instance >= schema.minimum;
  }

  if (!valid) {
    result.addError({
      name: 'minimum',
      argument: schema.minimum,
      message: "must have a minimum value of " + schema.minimum
    });
  }

  return result;
};
/**
 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.maximum = function validateMaximum(instance, schema, options, ctx) {
  if (!this.types.number(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid;

  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
    valid = instance < schema.maximum;
  } else {
    valid = instance <= schema.maximum;
  }

  if (!valid) {
    result.addError({
      name: 'maximum',
      argument: schema.maximum,
      message: "must have a maximum value of " + schema.maximum
    });
  }

  return result;
};
/**
 * Perform validation for multipleOf and divisibleBy, which are essentially the same.
 * @param instance
 * @param schema
 * @param validationType
 * @param errorMessage
 * @returns {String|null}
 */


var validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy(instance, schema, options, ctx, validationType, errorMessage) {
  if (!this.types.number(instance)) return;
  var validationArgument = schema[validationType];

  if (validationArgument == 0) {
    throw new SchemaError(validationType + " cannot be zero");
  }

  var result = new ValidatorResult(instance, schema, options, ctx);
  var instanceDecimals = helpers.getDecimalPlaces(instance);
  var divisorDecimals = helpers.getDecimalPlaces(validationArgument);
  var maxDecimals = Math.max(instanceDecimals, divisorDecimals);
  var multiplier = Math.pow(10, maxDecimals);

  if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) {
    result.addError({
      name: validationType,
      argument: validationArgument,
      message: errorMessage + JSON.stringify(validationArgument)
    });
  }

  return result;
};
/**
 * Validates divisibleBy when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
  return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
};
/**
 * Validates multipleOf when the type of the instance value is a number.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
  return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
};
/**
 * Validates whether the instance value is present.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.required = function validateRequired(instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);

  if (instance === undefined && schema.required === true) {
    // A boolean form is implemented for reverse-compatability with schemas written against older drafts
    result.addError({
      name: 'required',
      message: "is required"
    });
  } else if (this.types.object(instance) && Array.isArray(schema.required)) {
    schema.required.forEach(function (n) {
      if (instance[n] === undefined) {
        result.addError({
          name: 'required',
          argument: n,
          message: "requires property " + JSON.stringify(n)
        });
      }
    });
  }

  return result;
};
/**
 * Validates whether the instance value matches the regular expression, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.pattern = function validatePattern(instance, schema, options, ctx) {
  if (!this.types.string(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!instance.match(schema.pattern)) {
    result.addError({
      name: 'pattern',
      argument: schema.pattern,
      message: "does not match pattern " + JSON.stringify(schema.pattern)
    });
  }

  return result;
};
/**
 * Validates whether the instance value is of a certain defined format or a custom
 * format.
 * The following formats are supported for string types:
 *   - date-time
 *   - date
 *   - time
 *   - ip-address
 *   - ipv6
 *   - uri
 *   - color
 *   - host-name
 *   - alpha
 *   - alpha-numeric
 *   - utc-millisec
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {String|null}
 */


validators.format = function validateFormat(instance, schema, options, ctx) {
  if (instance === undefined) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
    result.addError({
      name: 'format',
      argument: schema.format,
      message: "does not conform to the " + JSON.stringify(schema.format) + " format"
    });
  }

  return result;
};
/**
 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.minLength = function validateMinLength(instance, schema, options, ctx) {
  if (!this.types.string(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var hsp = instance.match(/[\uDC00-\uDFFF]/g);
  var length = instance.length - (hsp ? hsp.length : 0);

  if (!(length >= schema.minLength)) {
    result.addError({
      name: 'minLength',
      argument: schema.minLength,
      message: "does not meet minimum length of " + schema.minLength
    });
  }

  return result;
};
/**
 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
  if (!this.types.string(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx); // TODO if this was already computed in "minLength", use that value instead of re-computing

  var hsp = instance.match(/[\uDC00-\uDFFF]/g);
  var length = instance.length - (hsp ? hsp.length : 0);

  if (!(length <= schema.maxLength)) {
    result.addError({
      name: 'maxLength',
      argument: schema.maxLength,
      message: "does not meet maximum length of " + schema.maxLength
    });
  }

  return result;
};
/**
 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.minItems = function validateMinItems(instance, schema, options, ctx) {
  if (!this.types.array(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!(instance.length >= schema.minItems)) {
    result.addError({
      name: 'minItems',
      argument: schema.minItems,
      message: "does not meet minimum length of " + schema.minItems
    });
  }

  return result;
};
/**
 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
 * @param instance
 * @param schema
 * @return {String|null}
 */


validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
  if (!this.types.array(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!(instance.length <= schema.maxItems)) {
    result.addError({
      name: 'maxItems',
      argument: schema.maxItems,
      message: "does not meet maximum length of " + schema.maxItems
    });
  }

  return result;
};
/**
 * Validates that every item in an instance array is unique, when instance is an array
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {String|null|ValidatorResult}
 */


validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
  if (!this.types.array(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  function testArrays(v, i, a) {
    for (var j = i + 1; j < a.length; j++) if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }

    return true;
  }

  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item"
    });
  }

  return result;
};
/**
 * Deep compares arrays for duplicates
 * @param v
 * @param i
 * @param a
 * @private
 * @return {boolean}
 */


function testArrays(v, i, a) {
  var j,
      len = a.length;

  for (j = i + 1, len; j < len; j++) {
    if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }
  }

  return true;
}
/**
 * Validates whether there are no duplicates, when the instance is an Array.
 * @param instance
 * @return {String|null}
 */


validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
  if (!this.types.array(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item"
    });
  }

  return result;
};
/**
 * Validate for the presence of dependency properties, if the instance is an object.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */


validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
  if (!this.types.object(instance)) return;
  var result = new ValidatorResult(instance, schema, options, ctx);

  for (var property in schema.dependencies) {
    if (instance[property] === undefined) {
      continue;
    }

    var dep = schema.dependencies[property];
    var childContext = ctx.makeChild(dep, property);

    if (typeof dep == 'string') {
      dep = [dep];
    }

    if (Array.isArray(dep)) {
      dep.forEach(function (prop) {
        if (instance[prop] === undefined) {
          result.addError({
            // FIXME there's two different "dependencies" errors here with slightly different outputs
            // Can we make these the same? Or should we create different error types?
            name: 'dependencies',
            argument: childContext.propertyPath,
            message: "property " + prop + " not found, required by " + childContext.propertyPath
          });
        }
      });
    } else {
      var res = this.validateSchema(instance, dep, options, childContext);
      if (result.instance !== res.instance) result.instance = res.instance;

      if (res && res.errors.length) {
        result.addError({
          name: 'dependencies',
          argument: childContext.propertyPath,
          message: "does not meet dependency required by " + childContext.propertyPath
        });
        result.importErrors(res);
      }
    }
  }

  return result;
};
/**
 * Validates whether the instance value is one of the enumerated values.
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */


validators['enum'] = function validateEnum(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }

  if (!Array.isArray(schema['enum'])) {
    throw new SchemaError("enum expects an array", schema);
  }

  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) {
    result.addError({
      name: 'enum',
      argument: schema['enum'],
      message: "is not one of enum values: " + schema['enum'].map(String).join(',')
    });
  }

  return result;
};
/**
 * Validates whether the instance exactly matches a given value
 *
 * @param instance
 * @param schema
 * @return {ValidatorResult|null}
 */


validators['const'] = function validateEnum(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }

  var result = new ValidatorResult(instance, schema, options, ctx);

  if (!helpers.deepCompareStrict(schema['const'], instance)) {
    result.addError({
      name: 'const',
      argument: schema['const'],
      message: "does not exactly match expected constant: " + schema['const']
    });
  }

  return result;
};
/**
 * Validates whether the instance if of a prohibited type.
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @return {null|ValidatorResult}
 */


validators.not = validators.disallow = function validateNot(instance, schema, options, ctx) {
  var self = this;
  if (instance === undefined) return null;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var notTypes = schema.not || schema.disallow;
  if (!notTypes) return null;
  if (!Array.isArray(notTypes)) notTypes = [notTypes];
  notTypes.forEach(function (type) {
    if (self.testType(instance, schema, options, ctx, type)) {
      var schemaId = type && type.id && '<' + type.id + '>' || type;
      result.addError({
        name: 'not',
        argument: schemaId,
        message: "is of prohibited type " + schemaId
      });
    }
  });
  return result;
};

module.exports = attribute;

/***/ }),

/***/ "./node_modules/jsonschema/lib/helpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uri = __webpack_require__("url");

var ValidationError = exports.ValidationError = function ValidationError(message, instance, schema, propertyPath, name, argument) {
  if (propertyPath) {
    this.property = propertyPath;
  }

  if (message) {
    this.message = message;
  }

  if (schema) {
    if (schema.id) {
      this.schema = schema.id;
    } else {
      this.schema = schema;
    }
  }

  if (instance) {
    this.instance = instance;
  }

  this.name = name;
  this.argument = argument;
  this.stack = this.toString();
};

ValidationError.prototype.toString = function toString() {
  return this.property + ' ' + this.message;
};

var ValidatorResult = exports.ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
  this.instance = instance;
  this.schema = schema;
  this.propertyPath = ctx.propertyPath;
  this.errors = [];
  this.throwError = options && options.throwError;
  this.disableFormat = options && options.disableFormat === true;
};

ValidatorResult.prototype.addError = function addError(detail) {
  var err;

  if (typeof detail == 'string') {
    err = new ValidationError(detail, this.instance, this.schema, this.propertyPath);
  } else {
    if (!detail) throw new Error('Missing error detail');
    if (!detail.message) throw new Error('Missing error message');
    if (!detail.name) throw new Error('Missing validator type');
    err = new ValidationError(detail.message, this.instance, this.schema, this.propertyPath, detail.name, detail.argument);
  }

  if (this.throwError) {
    throw err;
  }

  this.errors.push(err);
  return err;
};

ValidatorResult.prototype.importErrors = function importErrors(res) {
  if (typeof res == 'string' || res && res.validatorType) {
    this.addError(res);
  } else if (res && res.errors) {
    Array.prototype.push.apply(this.errors, res.errors);
  }
};

function stringizer(v, i) {
  return i + ': ' + v.toString() + '\n';
}

ValidatorResult.prototype.toString = function toString(res) {
  return this.errors.map(stringizer).join('');
};

Object.defineProperty(ValidatorResult.prototype, "valid", {
  get: function () {
    return !this.errors.length;
  }
});
/**
 * Describes a problem with a Schema which prevents validation of an instance
 * @name SchemaError
 * @constructor
 */

var SchemaError = exports.SchemaError = function SchemaError(msg, schema) {
  this.message = msg;
  this.schema = schema;
  Error.call(this, msg);
  Error.captureStackTrace(this, SchemaError);
};

SchemaError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: SchemaError,
    enumerable: false
  },
  name: {
    value: 'SchemaError',
    enumerable: false
  }
});

var SchemaContext = exports.SchemaContext = function SchemaContext(schema, options, propertyPath, base, schemas) {
  this.schema = schema;
  this.options = options;
  this.propertyPath = propertyPath;
  this.base = base;
  this.schemas = schemas;
};

SchemaContext.prototype.resolve = function resolve(target) {
  return uri.resolve(this.base, target);
};

SchemaContext.prototype.makeChild = function makeChild(schema, propertyName) {
  var propertyPath = propertyName === undefined ? this.propertyPath : this.propertyPath + makeSuffix(propertyName);
  var base = uri.resolve(this.base, schema.id || '');
  var ctx = new SchemaContext(schema, this.options, propertyPath, base, Object.create(this.schemas));

  if (schema.id && !ctx.schemas[base]) {
    ctx.schemas[base] = schema;
  }

  return ctx;
};

var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
  'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
  'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
  'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
  'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
  'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
  'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
  // hostname regex from: http://stackoverflow.com/a/1420225/5628
  'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
  'alpha': /^[a-zA-Z]+$/,
  'alphanumeric': /^[a-zA-Z0-9]+$/,
  'utc-millisec': function (input) {
    return typeof input === 'string' && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
  },
  'regex': function (input) {
    var result = true;

    try {
      new RegExp(input);
    } catch (e) {
      result = false;
    }

    return result;
  },
  'style': /\s*(.+?):\s*([^;]+);?/g,
  'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
};
FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS['ip-address'];

exports.isFormat = function isFormat(input, format, validator) {
  if (typeof input === 'string' && FORMAT_REGEXPS[format] !== undefined) {
    if (FORMAT_REGEXPS[format] instanceof RegExp) {
      return FORMAT_REGEXPS[format].test(input);
    }

    if (typeof FORMAT_REGEXPS[format] === 'function') {
      return FORMAT_REGEXPS[format](input);
    }
  } else if (validator && validator.customFormats && typeof validator.customFormats[format] === 'function') {
    return validator.customFormats[format](input);
  }

  return true;
};

var makeSuffix = exports.makeSuffix = function makeSuffix(key) {
  key = key.toString(); // This function could be capable of outputting valid a ECMAScript string, but the
  // resulting code for testing which form to use would be tens of thousands of characters long
  // That means this will use the name form for some illegal forms

  if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
    return '.' + key;
  }

  if (key.match(/^\d+$/)) {
    return '[' + key + ']';
  }

  return '[' + JSON.stringify(key) + ']';
};

exports.deepCompareStrict = function deepCompareStrict(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }

  if (a instanceof Array) {
    if (!(b instanceof Array)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    return a.every(function (v, i) {
      return deepCompareStrict(a[i], b[i]);
    });
  }

  if (typeof a === 'object') {
    if (!a || !b) {
      return a === b;
    }

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    return aKeys.every(function (v) {
      return deepCompareStrict(a[v], b[v]);
    });
  }

  return a === b;
};

function deepMerger(target, dst, e, i) {
  if (typeof e === 'object') {
    dst[i] = deepMerge(target[i], e);
  } else {
    if (target.indexOf(e) === -1) {
      dst.push(e);
    }
  }
}

function copyist(src, dst, key) {
  dst[key] = src[key];
}

function copyistWithDeepMerge(target, src, dst, key) {
  if (typeof src[key] !== 'object' || !src[key]) {
    dst[key] = src[key];
  } else {
    if (!target[key]) {
      dst[key] = src[key];
    } else {
      dst[key] = deepMerge(target[key], src[key]);
    }
  }
}

function deepMerge(target, src) {
  var array = Array.isArray(src);
  var dst = array && [] || {};

  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach(deepMerger.bind(null, target, dst));
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(copyist.bind(null, target, dst));
    }

    Object.keys(src).forEach(copyistWithDeepMerge.bind(null, target, src, dst));
  }

  return dst;
}

;
module.exports.deepMerge = deepMerge;
/**
 * Validates instance against the provided schema
 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
 * @param o
 * @param s The path to walk o along
 * @return any
 */

exports.objectGetPath = function objectGetPath(o, s) {
  var parts = s.split('/').slice(1);
  var k;

  while (typeof (k = parts.shift()) == 'string') {
    var n = decodeURIComponent(k.replace(/~0/, '~').replace(/~1/g, '/'));
    if (!(n in o)) return;
    o = o[n];
  }

  return o;
};

function pathEncoder(v) {
  return '/' + encodeURIComponent(v).replace(/~/g, '%7E');
}
/**
 * Accept an Array of property names and return a JSON Pointer URI fragment
 * @param Array a
 * @return {String}
 */


exports.encodePath = function encodePointer(a) {
  // ~ must be encoded explicitly because hacks
  // the slash is encoded by encodeURIComponent
  return a.map(pathEncoder).join('');
};
/**
 * Calculate the number of decimal places a number uses
 * We need this to get correct results out of multipleOf and divisibleBy
 * when either figure is has decimal places, due to IEEE-754 float issues.
 * @param number
 * @returns {number}
 */


exports.getDecimalPlaces = function getDecimalPlaces(number) {
  var decimalPlaces = 0;
  if (isNaN(number)) return decimalPlaces;

  if (typeof number !== 'number') {
    number = Number(number);
  }

  var parts = number.toString().split('e');

  if (parts.length === 2) {
    if (parts[1][0] !== '-') {
      return decimalPlaces;
    } else {
      decimalPlaces = Number(parts[1].slice(1));
    }
  }

  var decimalParts = parts[0].split('.');

  if (decimalParts.length === 2) {
    decimalPlaces += decimalParts[1].length;
  }

  return decimalPlaces;
};

/***/ }),

/***/ "./node_modules/jsonschema/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validator = module.exports.Validator = __webpack_require__("./node_modules/jsonschema/lib/validator.js");

module.exports.ValidatorResult = __webpack_require__("./node_modules/jsonschema/lib/helpers.js").ValidatorResult;
module.exports.ValidationError = __webpack_require__("./node_modules/jsonschema/lib/helpers.js").ValidationError;
module.exports.SchemaError = __webpack_require__("./node_modules/jsonschema/lib/helpers.js").SchemaError;
module.exports.SchemaScanResult = __webpack_require__("./node_modules/jsonschema/lib/scan.js").SchemaScanResult;
module.exports.scan = __webpack_require__("./node_modules/jsonschema/lib/scan.js").scan;

module.exports.validate = function (instance, schema, options) {
  var v = new Validator();
  return v.validate(instance, schema, options);
};

/***/ }),

/***/ "./node_modules/jsonschema/lib/scan.js":
/***/ (function(module, exports, __webpack_require__) {

var urilib = __webpack_require__("url");

var helpers = __webpack_require__("./node_modules/jsonschema/lib/helpers.js");

module.exports.SchemaScanResult = SchemaScanResult;

function SchemaScanResult(found, ref) {
  this.id = found;
  this.ref = ref;
}
/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param string uri
 * @param object schema
 * @return {Object}
 */


module.exports.scan = function scan(base, schema) {
  function scanSchema(baseuri, schema) {
    if (!schema || typeof schema != 'object') return; // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined

    if (schema.$ref) {
      var resolvedUri = urilib.resolve(baseuri, schema.$ref);
      ref[resolvedUri] = ref[resolvedUri] ? ref[resolvedUri] + 1 : 0;
      return;
    }

    var ourBase = schema.id ? urilib.resolve(baseuri, schema.id) : baseuri;

    if (ourBase) {
      // If there's no fragment, append an empty one
      if (ourBase.indexOf('#') < 0) ourBase += '#';

      if (found[ourBase]) {
        if (!helpers.deepCompareStrict(found[ourBase], schema)) {
          throw new Error('Schema <' + schema + '> already exists with different definition');
        }

        return found[ourBase];
      }

      found[ourBase] = schema; // strip trailing fragment

      if (ourBase[ourBase.length - 1] == '#') {
        found[ourBase.substring(0, ourBase.length - 1)] = schema;
      }
    }

    scanArray(ourBase + '/items', schema.items instanceof Array ? schema.items : [schema.items]);
    scanArray(ourBase + '/extends', schema.extends instanceof Array ? schema.extends : [schema.extends]);
    scanSchema(ourBase + '/additionalItems', schema.additionalItems);
    scanObject(ourBase + '/properties', schema.properties);
    scanSchema(ourBase + '/additionalProperties', schema.additionalProperties);
    scanObject(ourBase + '/definitions', schema.definitions);
    scanObject(ourBase + '/patternProperties', schema.patternProperties);
    scanObject(ourBase + '/dependencies', schema.dependencies);
    scanArray(ourBase + '/disallow', schema.disallow);
    scanArray(ourBase + '/allOf', schema.allOf);
    scanArray(ourBase + '/anyOf', schema.anyOf);
    scanArray(ourBase + '/oneOf', schema.oneOf);
    scanSchema(ourBase + '/not', schema.not);
  }

  function scanArray(baseuri, schemas) {
    if (!(schemas instanceof Array)) return;

    for (var i = 0; i < schemas.length; i++) {
      scanSchema(baseuri + '/' + i, schemas[i]);
    }
  }

  function scanObject(baseuri, schemas) {
    if (!schemas || typeof schemas != 'object') return;

    for (var p in schemas) {
      scanSchema(baseuri + '/' + p, schemas[p]);
    }
  }

  var found = {};
  var ref = {};
  var schemaUri = base;
  scanSchema(base, schema);
  return new SchemaScanResult(found, ref);
};

/***/ }),

/***/ "./node_modules/jsonschema/lib/validator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urilib = __webpack_require__("url");

var attribute = __webpack_require__("./node_modules/jsonschema/lib/attribute.js");

var helpers = __webpack_require__("./node_modules/jsonschema/lib/helpers.js");

var scanSchema = __webpack_require__("./node_modules/jsonschema/lib/scan.js").scan;

var ValidatorResult = helpers.ValidatorResult;
var SchemaError = helpers.SchemaError;
var SchemaContext = helpers.SchemaContext; //var anonymousBase = 'vnd.jsonschema:///';

var anonymousBase = '/';
/**
 * Creates a new Validator object
 * @name Validator
 * @constructor
 */

var Validator = function Validator() {
  // Allow a validator instance to override global custom formats or to have their
  // own custom formats.
  this.customFormats = Object.create(Validator.prototype.customFormats);
  this.schemas = {};
  this.unresolvedRefs = []; // Use Object.create to make this extensible without Validator instances stepping on each other's toes.

  this.types = Object.create(types);
  this.attributes = Object.create(attribute.validators);
}; // Allow formats to be registered globally.


Validator.prototype.customFormats = {}; // Hint at the presence of a property

Validator.prototype.schemas = null;
Validator.prototype.types = null;
Validator.prototype.attributes = null;
Validator.prototype.unresolvedRefs = null;
/**
 * Adds a schema with a certain urn to the Validator instance.
 * @param schema
 * @param urn
 * @return {Object}
 */

Validator.prototype.addSchema = function addSchema(schema, base) {
  var self = this;

  if (!schema) {
    return null;
  }

  var scan = scanSchema(base || anonymousBase, schema);
  var ourUri = base || schema.id;

  for (var uri in scan.id) {
    this.schemas[uri] = scan.id[uri];
  }

  for (var uri in scan.ref) {
    this.unresolvedRefs.push(uri);
  }

  this.unresolvedRefs = this.unresolvedRefs.filter(function (uri) {
    return typeof self.schemas[uri] === 'undefined';
  });
  return this.schemas[ourUri];
};

Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
  if (!(schemas instanceof Array)) return;

  for (var i = 0; i < schemas.length; i++) {
    this.addSubSchema(baseuri, schemas[i]);
  }
};

Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
  if (!schemas || typeof schemas != 'object') return;

  for (var p in schemas) {
    this.addSubSchema(baseuri, schemas[p]);
  }
};
/**
 * Sets all the schemas of the Validator instance.
 * @param schemas
 */


Validator.prototype.setSchemas = function setSchemas(schemas) {
  this.schemas = schemas;
};
/**
 * Returns the schema of a certain urn
 * @param urn
 */


Validator.prototype.getSchema = function getSchema(urn) {
  return this.schemas[urn];
};
/**
 * Validates instance against the provided schema
 * @param instance
 * @param schema
 * @param [options]
 * @param [ctx]
 * @return {Array}
 */


Validator.prototype.validate = function validate(instance, schema, options, ctx) {
  if (!options) {
    options = {};
  }

  var propertyName = options.propertyName || 'instance'; // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI

  var base = urilib.resolve(options.base || anonymousBase, schema.id || '');

  if (!ctx) {
    ctx = new SchemaContext(schema, options, propertyName, base, Object.create(this.schemas));

    if (!ctx.schemas[base]) {
      ctx.schemas[base] = schema;
    }

    var found = scanSchema(base, schema);

    for (var n in found.id) {
      var sch = found.id[n];
      ctx.schemas[n] = sch;
    }
  }

  if (schema) {
    var result = this.validateSchema(instance, schema, options, ctx);

    if (!result) {
      throw new Error('Result undefined');
    }

    return result;
  }

  throw new SchemaError('no schema specified', schema);
};
/**
* @param Object schema
* @return mixed schema uri or false
*/


function shouldResolve(schema) {
  var ref = typeof schema === 'string' ? schema : schema.$ref;
  if (typeof ref == 'string') return ref;
  return false;
}
/**
 * Validates an instance against the schema (the actual work horse)
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @private
 * @return {ValidatorResult}
 */


Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx); // Support for the true/false schemas

  if (typeof schema === 'boolean') {
    if (schema === true) {
      // `true` is always valid
      schema = {};
    } else if (schema === false) {
      // `false` is always invalid
      schema = {
        type: []
      };
    }
  } else if (!schema) {
    // This might be a string
    throw new Error("schema is undefined");
  }

  if (schema['extends']) {
    if (schema['extends'] instanceof Array) {
      var schemaobj = {
        schema: schema,
        ctx: ctx
      };
      schema['extends'].forEach(this.schemaTraverser.bind(this, schemaobj));
      schema = schemaobj.schema;
      schemaobj.schema = null;
      schemaobj.ctx = null;
      schemaobj = null;
    } else {
      schema = helpers.deepMerge(schema, this.superResolve(schema['extends'], ctx));
    }
  } // If passed a string argument, load that schema URI


  var switchSchema;

  if (switchSchema = shouldResolve(schema)) {
    var resolved = this.resolve(schema, switchSchema, ctx);
    var subctx = new SchemaContext(resolved.subschema, options, ctx.propertyPath, resolved.switchSchema, ctx.schemas);
    return this.validateSchema(instance, resolved.subschema, options, subctx);
  }

  var skipAttributes = options && options.skipAttributes || []; // Validate each schema attribute against the instance

  for (var key in schema) {
    if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
      var validatorErr = null;
      var validator = this.attributes[key];

      if (validator) {
        validatorErr = validator.call(this, instance, schema, options, ctx);
      } else if (options.allowUnknownAttributes === false) {
        // This represents an error with the schema itself, not an invalid instance
        throw new SchemaError("Unsupported attribute: " + key, schema);
      }

      if (validatorErr) {
        result.importErrors(validatorErr);
      }
    }
  }

  if (typeof options.rewrite == 'function') {
    var value = options.rewrite.call(this, instance, schema, options, ctx);
    result.instance = value;
  }

  return result;
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/


Validator.prototype.schemaTraverser = function schemaTraverser(schemaobj, s) {
  schemaobj.schema = helpers.deepMerge(schemaobj.schema, this.superResolve(s, schemaobj.ctx));
};
/**
* @private
* @param Object schema
* @param SchemaContext ctx
* @returns Object schema or resolved schema
*/


Validator.prototype.superResolve = function superResolve(schema, ctx) {
  var ref;

  if (ref = shouldResolve(schema)) {
    return this.resolve(schema, ref, ctx).subschema;
  }

  return schema;
};
/**
* @private
* @param Object schema
* @param Object switchSchema
* @param SchemaContext ctx
* @return Object resolved schemas {subschema:String, switchSchema: String}
* @throws SchemaError
*/


Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
  switchSchema = ctx.resolve(switchSchema); // First see if the schema exists under the provided URI

  if (ctx.schemas[switchSchema]) {
    return {
      subschema: ctx.schemas[switchSchema],
      switchSchema: switchSchema
    };
  } // Else try walking the property pointer


  var parsed = urilib.parse(switchSchema);
  var fragment = parsed && parsed.hash;
  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);

  if (!document || !ctx.schemas[document]) {
    throw new SchemaError("no such schema <" + switchSchema + ">", schema);
  }

  var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));

  if (subschema === undefined) {
    throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
  }

  return {
    subschema: subschema,
    switchSchema: switchSchema
  };
};
/**
 * Tests whether the instance if of a certain type.
 * @private
 * @param instance
 * @param schema
 * @param options
 * @param ctx
 * @param type
 * @return {boolean}
 */


Validator.prototype.testType = function validateType(instance, schema, options, ctx, type) {
  if (typeof this.types[type] == 'function') {
    return this.types[type].call(this, instance);
  }

  if (type && typeof type == 'object') {
    var res = this.validateSchema(instance, type, options, ctx);
    return res === undefined || !(res && res.errors.length);
  } // Undefined or properties not on the list are acceptable, same as not being defined


  return true;
};

var types = Validator.prototype.types = {};

types.string = function testString(instance) {
  return typeof instance == 'string';
};

types.number = function testNumber(instance) {
  // isFinite returns false for NaN, Infinity, and -Infinity
  return typeof instance == 'number' && isFinite(instance);
};

types.integer = function testInteger(instance) {
  return typeof instance == 'number' && instance % 1 === 0;
};

types.boolean = function testBoolean(instance) {
  return typeof instance == 'boolean';
};

types.array = function testArray(instance) {
  return Array.isArray(instance);
};

types['null'] = function testNull(instance) {
  return instance === null;
};

types.date = function testDate(instance) {
  return instance instanceof Date;
};

types.any = function testAny(instance) {
  return true;
};

types.object = function testObject(instance) {
  // TODO: fix this - see #15
  return instance && typeof instance === 'object' && !(instance instanceof Array) && !(instance instanceof Date);
};

module.exports = Validator;

/***/ }),

/***/ "./node_modules/negotiator/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Cached loaded submodules.
 * @private
 */

var modules = Object.create(null);
/**
 * Module exports.
 * @public
 */

module.exports = Negotiator;
module.exports.Negotiator = Negotiator;
/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */

function Negotiator(request) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }

  this.request = request;
}

Negotiator.prototype.charset = function charset(available) {
  var set = this.charsets(available);
  return set && set[0];
};

Negotiator.prototype.charsets = function charsets(available) {
  var preferredCharsets = loadModule('charset').preferredCharsets;
  return preferredCharsets(this.request.headers['accept-charset'], available);
};

Negotiator.prototype.encoding = function encoding(available) {
  var set = this.encodings(available);
  return set && set[0];
};

Negotiator.prototype.encodings = function encodings(available) {
  var preferredEncodings = loadModule('encoding').preferredEncodings;
  return preferredEncodings(this.request.headers['accept-encoding'], available);
};

Negotiator.prototype.language = function language(available) {
  var set = this.languages(available);
  return set && set[0];
};

Negotiator.prototype.languages = function languages(available) {
  var preferredLanguages = loadModule('language').preferredLanguages;
  return preferredLanguages(this.request.headers['accept-language'], available);
};

Negotiator.prototype.mediaType = function mediaType(available) {
  var set = this.mediaTypes(available);
  return set && set[0];
};

Negotiator.prototype.mediaTypes = function mediaTypes(available) {
  var preferredMediaTypes = loadModule('mediaType').preferredMediaTypes;
  return preferredMediaTypes(this.request.headers.accept, available);
}; // Backwards compatibility


Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
/**
 * Load the given module.
 * @private
 */

function loadModule(moduleName) {
  var module = modules[moduleName];

  if (module !== undefined) {
    return module;
  } // This uses a switch for static require analysis


  switch (moduleName) {
    case 'charset':
      module = __webpack_require__("./node_modules/negotiator/lib/charset.js");
      break;

    case 'encoding':
      module = __webpack_require__("./node_modules/negotiator/lib/encoding.js");
      break;

    case 'language':
      module = __webpack_require__("./node_modules/negotiator/lib/language.js");
      break;

    case 'mediaType':
      module = __webpack_require__("./node_modules/negotiator/lib/mediaType.js");
      break;

    default:
      throw new Error('Cannot find module \'' + moduleName + '\'');
  } // Store to prevent invoking require()


  modules[moduleName] = module;
  return module;
}

/***/ }),

/***/ "./node_modules/negotiator/lib/charset.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;
/**
 * Module variables.
 * @private
 */

var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Charset header.
 * @private
 */

function parseAcceptCharset(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var charset = parseCharset(accepts[i].trim(), i);

    if (charset) {
      accepts[j++] = charset;
    }
  } // trim accepts


  accepts.length = j;
  return accepts;
}
/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */


function parseCharset(str, i) {
  var match = simpleCharsetRegExp.exec(str);
  if (!match) return null;
  var charset = match[1];
  var q = 1;

  if (match[2]) {
    var params = match[2].split(';');

    for (var i = 0; i < params.length; i++) {
      var p = params[i].trim().split('=');

      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q,
    i: i
  };
}
/**
 * Get the priority of a charset.
 * @private
 */


function getCharsetPriority(charset, accepted, index) {
  var priority = {
    o: -1,
    q: 0,
    s: 0
  };

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(charset, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}
/**
 * Get the specificity of the charset.
 * @private
 */


function specify(charset, spec, index) {
  var s = 0;

  if (spec.charset.toLowerCase() === charset.toLowerCase()) {
    s |= 1;
  } else if (spec.charset !== '*') {
    return null;
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  };
}
/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */


function preferredCharsets(accept, provided) {
  // RFC 2616 sec 14.2: no header = *
  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all charsets
    return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getCharsetPriority(type, accepts, index);
  }); // sorted list of accepted charsets

  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
/**
 * Compare two specs.
 * @private
 */


function compareSpecs(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full charset string.
 * @private
 */


function getFullCharset(spec) {
  return spec.charset;
}
/**
 * Check if a spec has any quality.
 * @private
 */


function isQuality(spec) {
  return spec.q > 0;
}

/***/ }),

/***/ "./node_modules/negotiator/lib/encoding.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;
/**
 * Module variables.
 * @private
 */

var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Encoding header.
 * @private
 */

function parseAcceptEncoding(accept) {
  var accepts = accept.split(',');
  var hasIdentity = false;
  var minQuality = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify('identity', encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: 'identity',
      q: minQuality,
      i: i
    };
  } // trim accepts


  accepts.length = j;
  return accepts;
}
/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */


function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match) return null;
  var encoding = match[1];
  var q = 1;

  if (match[2]) {
    var params = match[2].split(';');

    for (var i = 0; i < params.length; i++) {
      var p = params[i].trim().split('=');

      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i
  };
}
/**
 * Get the priority of an encoding.
 * @private
 */


function getEncodingPriority(encoding, accepted, index) {
  var priority = {
    o: -1,
    q: 0,
    s: 0
  };

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}
/**
 * Get the specificity of the encoding.
 * @private
 */


function specify(encoding, spec, index) {
  var s = 0;

  if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
    s |= 1;
  } else if (spec.encoding !== '*') {
    return null;
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  };
}

;
/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */

function preferredEncodings(accept, provided) {
  var accepts = parseAcceptEncoding(accept || '');

  if (!provided) {
    // sorted list of all encodings
    return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getEncodingPriority(type, accepts, index);
  }); // sorted list of accepted encodings

  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
/**
 * Compare two specs.
 * @private
 */


function compareSpecs(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full encoding string.
 * @private
 */


function getFullEncoding(spec) {
  return spec.encoding;
}
/**
 * Check if a spec has any quality.
 * @private
 */


function isQuality(spec) {
  return spec.q > 0;
}

/***/ }),

/***/ "./node_modules/negotiator/lib/language.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;
/**
 * Module variables.
 * @private
 */

var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Language header.
 * @private
 */

function parseAcceptLanguage(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var langauge = parseLanguage(accepts[i].trim(), i);

    if (langauge) {
      accepts[j++] = langauge;
    }
  } // trim accepts


  accepts.length = j;
  return accepts;
}
/**
 * Parse a language from the Accept-Language header.
 * @private
 */


function parseLanguage(str, i) {
  var match = simpleLanguageRegExp.exec(str);
  if (!match) return null;
  var prefix = match[1],
      suffix = match[2],
      full = prefix;
  if (suffix) full += "-" + suffix;
  var q = 1;

  if (match[3]) {
    var params = match[3].split(';');

    for (var i = 0; i < params.length; i++) {
      var p = params[i].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    i: i,
    full: full
  };
}
/**
 * Get the priority of a language.
 * @private
 */


function getLanguagePriority(language, accepted, index) {
  var priority = {
    o: -1,
    q: 0,
    s: 0
  };

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(language, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}
/**
 * Get the specificity of the language.
 * @private
 */


function specify(language, spec, index) {
  var p = parseLanguage(language);
  if (!p) return null;
  var s = 0;

  if (spec.full.toLowerCase() === p.full.toLowerCase()) {
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*') {
    return null;
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  };
}

;
/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */

function preferredLanguages(accept, provided) {
  // RFC 2616 sec 14.4: no header = *
  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all languages
    return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getLanguagePriority(type, accepts, index);
  }); // sorted list of accepted languages

  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
/**
 * Compare two specs.
 * @private
 */


function compareSpecs(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full language string.
 * @private
 */


function getFullLanguage(spec) {
  return spec.full;
}
/**
 * Check if a spec has any quality.
 * @private
 */


function isQuality(spec) {
  return spec.q > 0;
}

/***/ }),

/***/ "./node_modules/negotiator/lib/mediaType.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;
/**
 * Module variables.
 * @private
 */

var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept header.
 * @private
 */

function parseAccept(accept) {
  var accepts = splitMediaTypes(accept);

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var mediaType = parseMediaType(accepts[i].trim(), i);

    if (mediaType) {
      accepts[j++] = mediaType;
    }
  } // trim accepts


  accepts.length = j;
  return accepts;
}
/**
 * Parse a media type from the Accept header.
 * @private
 */


function parseMediaType(str, i) {
  var match = simpleMediaTypeRegExp.exec(str);
  if (!match) return null;
  var params = Object.create(null);
  var q = 1;
  var subtype = match[2];
  var type = match[1];

  if (match[3]) {
    var kvps = splitParameters(match[3]).map(splitKeyValuePair);

    for (var j = 0; j < kvps.length; j++) {
      var pair = kvps[j];
      var key = pair[0].toLowerCase();
      var val = pair[1]; // get the value, unwrapping quotes

      var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;

      if (key === 'q') {
        q = parseFloat(value);
        break;
      } // store parameter


      params[key] = value;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    i: i
  };
}
/**
 * Get the priority of a media type.
 * @private
 */


function getMediaTypePriority(type, accepted, index) {
  var priority = {
    o: -1,
    q: 0,
    s: 0
  };

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(type, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}
/**
 * Get the specificity of the media type.
 * @private
 */


function specify(type, spec, index) {
  var p = parseMediaType(type);
  var s = 0;

  if (!p) {
    return null;
  }

  if (spec.type.toLowerCase() == p.type.toLowerCase()) {
    s |= 4;
  } else if (spec.type != '*') {
    return null;
  }

  if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s |= 2;
  } else if (spec.subtype != '*') {
    return null;
  }

  var keys = Object.keys(spec.params);

  if (keys.length > 0) {
    if (keys.every(function (k) {
      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
    })) {
      s |= 1;
    } else {
      return null;
    }
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  };
}
/**
 * Get the preferred media types from an Accept header.
 * @public
 */


function preferredMediaTypes(accept, provided) {
  // RFC 2616 sec 14.2: no header = */*
  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');

  if (!provided) {
    // sorted list of all types
    return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getMediaTypePriority(type, accepts, index);
  }); // sorted list of accepted types

  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
/**
 * Compare two specs.
 * @private
 */


function compareSpecs(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full type string.
 * @private
 */


function getFullType(spec) {
  return spec.type + '/' + spec.subtype;
}
/**
 * Check if a spec has any quality.
 * @private
 */


function isQuality(spec) {
  return spec.q > 0;
}
/**
 * Count the number of quotes in a string.
 * @private
 */


function quoteCount(string) {
  var count = 0;
  var index = 0;

  while ((index = string.indexOf('"', index)) !== -1) {
    count++;
    index++;
  }

  return count;
}
/**
 * Split a key value pair.
 * @private
 */


function splitKeyValuePair(str) {
  var index = str.indexOf('=');
  var key;
  var val;

  if (index === -1) {
    key = str;
  } else {
    key = str.substr(0, index);
    val = str.substr(index + 1);
  }

  return [key, val];
}
/**
 * Split an Accept header into media types.
 * @private
 */


function splitMediaTypes(accept) {
  var accepts = accept.split(',');

  for (var i = 1, j = 0; i < accepts.length; i++) {
    if (quoteCount(accepts[j]) % 2 == 0) {
      accepts[++j] = accepts[i];
    } else {
      accepts[j] += ',' + accepts[i];
    }
  } // trim accepts


  accepts.length = j + 1;
  return accepts;
}
/**
 * Split a string of parameters.
 * @private
 */


function splitParameters(str) {
  var parameters = str.split(';');

  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ';' + parameters[i];
    }
  } // trim parameters


  parameters.length = j + 1;

  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }

  return parameters;
}

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

module.exports = bytesToUuid;

/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.
var crypto = __webpack_require__("crypto");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("./node_modules/uuid/lib/rng.js");

var bytesToUuid = __webpack_require__("./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),

/***/ "./src/lambdas/snake/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const cassava = __importStar(__webpack_require__("./node_modules/cassava/dist/index.js"));

const router = new cassava.Router(); // A simple route that only handles GET on /helloWorld

router.route("/helloWorld").method("GET").handler(evt => __awaiter(this, void 0, void 0, function* () {
  return {
    body: "Hi there!"
  };
})); // A fancier route with a path parameter `name`.
// match egs: `/hello/jeff` or `/Hello/Jeffery`

router.route("/hello/{name}").method("GET").handler(evt => __awaiter(this, void 0, void 0, function* () {
  return {
    body: `Hello ${evt.pathParameters["name"]}!`
  };
}));
router.route("/hello").method("POST").handler(evt => __awaiter(this, void 0, void 0, function* () {
  return {
    body: `Hello ${evt.pathParameters["name"]}. I'll be sure to save this data for you. Not!`
  };
})); // Install the router as the handler for this lambda.

exports.handler = router.getLambdaHandler();

/***/ }),

/***/ "crypto":
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });