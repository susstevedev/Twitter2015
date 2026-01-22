// ==UserScript==
// @name          GoodTwitter2
// @version       1.0.0-beta.6
// @author        schwarzkatz
// @description   A try to make Twitter look good again.
// @license       MIT
// @homepage      https://github.com/Bl4Cc4t/GoodTwitter2#readme
// @run-at        document-body
// @grant         GM_addElement
// @grant         GM_addStyle
// @grant         GM_getResourceText
// @grant         GM_getValue
// @grant         GM_info
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @match         https://mobile.twitter.com/*
// @match         https://mobile.x.com/*
// @match         https://twitter.com/*
// @match         https://x.com/*
// @exclude       https://twitter.com/*/privacy
// @exclude       https://twitter.com/*/tos
// @exclude       https://twitter.com/account/access
// @exclude       https://twitter.com/i/cards/*
// @exclude       https://twitter.com/i/release_notes
// @exclude       https://twitter.com/i/tweetdeck
// @exclude       https://x.com/*/privacy
// @exclude       https://x.com/*/tos
// @exclude       https://x.com/account/access
// @exclude       https://x.com/i/cards/*
// @exclude       https://x.com/i/release_notes
// @exclude       https://x.com/i/tweetdeck
// @connect       api.twitter.com
// @connect       api.x.com
// @require       https://github.com/Bl4Cc4t/GoodTwitter2/releases/download/v1.0.0-beta.6/goodtwitter2.i18n.js
// @resource      css https://github.com/Bl4Cc4t/GoodTwitter2/releases/download/v1.0.0-beta.6/goodtwitter2.style.css
// @resource      emojiRegex https://raw.githubusercontent.com/Bl4Cc4t/GoodTwitter2/master/data/emoji-regex.txt
// @updateURL     https://github.com/Bl4Cc4t/GoodTwitter2/releases/latest/download/dist/goodtwitter2.user.js
// @downloadURL   https://github.com/Bl4Cc4t/GoodTwitter2/releases/latest/download/dist/goodtwitter2.user.js
// ==/UserScript==

(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var es_regexp_exec = {};

	var globalThis_1;
	var hasRequiredGlobalThis;

	function requireGlobalThis () {
		if (hasRequiredGlobalThis) return globalThis_1;
		hasRequiredGlobalThis = 1;
		var check = function (it) {
		  return it && it.Math === Math && it;
		};

		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		globalThis_1 =
		  // eslint-disable-next-line es/no-global-this -- safe
		  check(typeof globalThis == 'object' && globalThis) ||
		  check(typeof window == 'object' && window) ||
		  // eslint-disable-next-line no-restricted-globals -- safe
		  check(typeof self == 'object' && self) ||
		  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
		  check(typeof globalThis_1 == 'object' && globalThis_1) ||
		  // eslint-disable-next-line no-new-func -- fallback
		  (function () { return this; })() || Function('return this')();
		return globalThis_1;
	}

	var objectGetOwnPropertyDescriptor = {};

	var fails;
	var hasRequiredFails;

	function requireFails () {
		if (hasRequiredFails) return fails;
		hasRequiredFails = 1;
		fails = function (exec) {
		  try {
		    return !!exec();
		  } catch (error) {
		    return true;
		  }
		};
		return fails;
	}

	var descriptors;
	var hasRequiredDescriptors;

	function requireDescriptors () {
		if (hasRequiredDescriptors) return descriptors;
		hasRequiredDescriptors = 1;
		var fails = requireFails();

		// Detect IE8's incomplete defineProperty implementation
		descriptors = !fails(function () {
		  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
		  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
		});
		return descriptors;
	}

	var functionBindNative;
	var hasRequiredFunctionBindNative;

	function requireFunctionBindNative () {
		if (hasRequiredFunctionBindNative) return functionBindNative;
		hasRequiredFunctionBindNative = 1;
		var fails = requireFails();

		functionBindNative = !fails(function () {
		  // eslint-disable-next-line es/no-function-prototype-bind -- safe
		  var test = (function () { /* empty */ }).bind();
		  // eslint-disable-next-line no-prototype-builtins -- safe
		  return typeof test != 'function' || test.hasOwnProperty('prototype');
		});
		return functionBindNative;
	}

	var functionCall;
	var hasRequiredFunctionCall;

	function requireFunctionCall () {
		if (hasRequiredFunctionCall) return functionCall;
		hasRequiredFunctionCall = 1;
		var NATIVE_BIND = requireFunctionBindNative();

		var call = Function.prototype.call;
		// eslint-disable-next-line es/no-function-prototype-bind -- safe
		functionCall = NATIVE_BIND ? call.bind(call) : function () {
		  return call.apply(call, arguments);
		};
		return functionCall;
	}

	var objectPropertyIsEnumerable = {};

	var hasRequiredObjectPropertyIsEnumerable;

	function requireObjectPropertyIsEnumerable () {
		if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
		hasRequiredObjectPropertyIsEnumerable = 1;
		var $propertyIsEnumerable = {}.propertyIsEnumerable;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

		// Nashorn ~ JDK8 bug
		var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

		// `Object.prototype.propertyIsEnumerable` method implementation
		// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
		objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
		  var descriptor = getOwnPropertyDescriptor(this, V);
		  return !!descriptor && descriptor.enumerable;
		} : $propertyIsEnumerable;
		return objectPropertyIsEnumerable;
	}

	var createPropertyDescriptor;
	var hasRequiredCreatePropertyDescriptor;

	function requireCreatePropertyDescriptor () {
		if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
		hasRequiredCreatePropertyDescriptor = 1;
		createPropertyDescriptor = function (bitmap, value) {
		  return {
		    enumerable: !(bitmap & 1),
		    configurable: !(bitmap & 2),
		    writable: !(bitmap & 4),
		    value: value
		  };
		};
		return createPropertyDescriptor;
	}

	var functionUncurryThis;
	var hasRequiredFunctionUncurryThis;

	function requireFunctionUncurryThis () {
		if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
		hasRequiredFunctionUncurryThis = 1;
		var NATIVE_BIND = requireFunctionBindNative();

		var FunctionPrototype = Function.prototype;
		var call = FunctionPrototype.call;
		// eslint-disable-next-line es/no-function-prototype-bind -- safe
		var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

		functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
		  return function () {
		    return call.apply(fn, arguments);
		  };
		};
		return functionUncurryThis;
	}

	var classofRaw;
	var hasRequiredClassofRaw;

	function requireClassofRaw () {
		if (hasRequiredClassofRaw) return classofRaw;
		hasRequiredClassofRaw = 1;
		var uncurryThis = requireFunctionUncurryThis();

		var toString = uncurryThis({}.toString);
		var stringSlice = uncurryThis(''.slice);

		classofRaw = function (it) {
		  return stringSlice(toString(it), 8, -1);
		};
		return classofRaw;
	}

	var indexedObject;
	var hasRequiredIndexedObject;

	function requireIndexedObject () {
		if (hasRequiredIndexedObject) return indexedObject;
		hasRequiredIndexedObject = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var classof = requireClassofRaw();

		var $Object = Object;
		var split = uncurryThis(''.split);

		// fallback for non-array-like ES3 and non-enumerable old V8 strings
		indexedObject = fails(function () {
		  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
		  // eslint-disable-next-line no-prototype-builtins -- safe
		  return !$Object('z').propertyIsEnumerable(0);
		}) ? function (it) {
		  return classof(it) === 'String' ? split(it, '') : $Object(it);
		} : $Object;
		return indexedObject;
	}

	var isNullOrUndefined;
	var hasRequiredIsNullOrUndefined;

	function requireIsNullOrUndefined () {
		if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
		hasRequiredIsNullOrUndefined = 1;
		// we can't use just `it == null` since of `document.all` special case
		// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
		isNullOrUndefined = function (it) {
		  return it === null || it === undefined;
		};
		return isNullOrUndefined;
	}

	var requireObjectCoercible;
	var hasRequiredRequireObjectCoercible;

	function requireRequireObjectCoercible () {
		if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
		hasRequiredRequireObjectCoercible = 1;
		var isNullOrUndefined = requireIsNullOrUndefined();

		var $TypeError = TypeError;

		// `RequireObjectCoercible` abstract operation
		// https://tc39.es/ecma262/#sec-requireobjectcoercible
		requireObjectCoercible = function (it) {
		  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
		  return it;
		};
		return requireObjectCoercible;
	}

	var toIndexedObject;
	var hasRequiredToIndexedObject;

	function requireToIndexedObject () {
		if (hasRequiredToIndexedObject) return toIndexedObject;
		hasRequiredToIndexedObject = 1;
		// toObject with fallback for non-array-like ES3 strings
		var IndexedObject = requireIndexedObject();
		var requireObjectCoercible = requireRequireObjectCoercible();

		toIndexedObject = function (it) {
		  return IndexedObject(requireObjectCoercible(it));
		};
		return toIndexedObject;
	}

	var isCallable;
	var hasRequiredIsCallable;

	function requireIsCallable () {
		if (hasRequiredIsCallable) return isCallable;
		hasRequiredIsCallable = 1;
		// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
		var documentAll = typeof document == 'object' && document.all;

		// `IsCallable` abstract operation
		// https://tc39.es/ecma262/#sec-iscallable
		// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
		isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
		  return typeof argument == 'function' || argument === documentAll;
		} : function (argument) {
		  return typeof argument == 'function';
		};
		return isCallable;
	}

	var isObject;
	var hasRequiredIsObject;

	function requireIsObject () {
		if (hasRequiredIsObject) return isObject;
		hasRequiredIsObject = 1;
		var isCallable = requireIsCallable();

		isObject = function (it) {
		  return typeof it == 'object' ? it !== null : isCallable(it);
		};
		return isObject;
	}

	var getBuiltIn;
	var hasRequiredGetBuiltIn;

	function requireGetBuiltIn () {
		if (hasRequiredGetBuiltIn) return getBuiltIn;
		hasRequiredGetBuiltIn = 1;
		var globalThis = requireGlobalThis();
		var isCallable = requireIsCallable();

		var aFunction = function (argument) {
		  return isCallable(argument) ? argument : undefined;
		};

		getBuiltIn = function (namespace, method) {
		  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
		};
		return getBuiltIn;
	}

	var objectIsPrototypeOf;
	var hasRequiredObjectIsPrototypeOf;

	function requireObjectIsPrototypeOf () {
		if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
		hasRequiredObjectIsPrototypeOf = 1;
		var uncurryThis = requireFunctionUncurryThis();

		objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
		return objectIsPrototypeOf;
	}

	var environmentUserAgent;
	var hasRequiredEnvironmentUserAgent;

	function requireEnvironmentUserAgent () {
		if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
		hasRequiredEnvironmentUserAgent = 1;
		var globalThis = requireGlobalThis();

		var navigator = globalThis.navigator;
		var userAgent = navigator && navigator.userAgent;

		environmentUserAgent = userAgent ? String(userAgent) : '';
		return environmentUserAgent;
	}

	var environmentV8Version;
	var hasRequiredEnvironmentV8Version;

	function requireEnvironmentV8Version () {
		if (hasRequiredEnvironmentV8Version) return environmentV8Version;
		hasRequiredEnvironmentV8Version = 1;
		var globalThis = requireGlobalThis();
		var userAgent = requireEnvironmentUserAgent();

		var process = globalThis.process;
		var Deno = globalThis.Deno;
		var versions = process && process.versions || Deno && Deno.version;
		var v8 = versions && versions.v8;
		var match, version;

		if (v8) {
		  match = v8.split('.');
		  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
		  // but their correct versions are not interesting for us
		  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
		}

		// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
		// so check `userAgent` even if `.v8` exists, but 0
		if (!version && userAgent) {
		  match = userAgent.match(/Edge\/(\d+)/);
		  if (!match || match[1] >= 74) {
		    match = userAgent.match(/Chrome\/(\d+)/);
		    if (match) version = +match[1];
		  }
		}

		environmentV8Version = version;
		return environmentV8Version;
	}

	var symbolConstructorDetection;
	var hasRequiredSymbolConstructorDetection;

	function requireSymbolConstructorDetection () {
		if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
		hasRequiredSymbolConstructorDetection = 1;
		/* eslint-disable es/no-symbol -- required for testing */
		var V8_VERSION = requireEnvironmentV8Version();
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		var $String = globalThis.String;

		// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
		symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
		  var symbol = Symbol('symbol detection');
		  // Chrome 38 Symbol has incorrect toString conversion
		  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
		  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
		  // of course, fail.
		  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
		    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
		    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
		});
		return symbolConstructorDetection;
	}

	var useSymbolAsUid;
	var hasRequiredUseSymbolAsUid;

	function requireUseSymbolAsUid () {
		if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
		hasRequiredUseSymbolAsUid = 1;
		/* eslint-disable es/no-symbol -- required for testing */
		var NATIVE_SYMBOL = requireSymbolConstructorDetection();

		useSymbolAsUid = NATIVE_SYMBOL &&
		  !Symbol.sham &&
		  typeof Symbol.iterator == 'symbol';
		return useSymbolAsUid;
	}

	var isSymbol;
	var hasRequiredIsSymbol;

	function requireIsSymbol () {
		if (hasRequiredIsSymbol) return isSymbol;
		hasRequiredIsSymbol = 1;
		var getBuiltIn = requireGetBuiltIn();
		var isCallable = requireIsCallable();
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

		var $Object = Object;

		isSymbol = USE_SYMBOL_AS_UID ? function (it) {
		  return typeof it == 'symbol';
		} : function (it) {
		  var $Symbol = getBuiltIn('Symbol');
		  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
		};
		return isSymbol;
	}

	var tryToString;
	var hasRequiredTryToString;

	function requireTryToString () {
		if (hasRequiredTryToString) return tryToString;
		hasRequiredTryToString = 1;
		var $String = String;

		tryToString = function (argument) {
		  try {
		    return $String(argument);
		  } catch (error) {
		    return 'Object';
		  }
		};
		return tryToString;
	}

	var aCallable;
	var hasRequiredACallable;

	function requireACallable () {
		if (hasRequiredACallable) return aCallable;
		hasRequiredACallable = 1;
		var isCallable = requireIsCallable();
		var tryToString = requireTryToString();

		var $TypeError = TypeError;

		// `Assert: IsCallable(argument) is true`
		aCallable = function (argument) {
		  if (isCallable(argument)) return argument;
		  throw new $TypeError(tryToString(argument) + ' is not a function');
		};
		return aCallable;
	}

	var getMethod;
	var hasRequiredGetMethod;

	function requireGetMethod () {
		if (hasRequiredGetMethod) return getMethod;
		hasRequiredGetMethod = 1;
		var aCallable = requireACallable();
		var isNullOrUndefined = requireIsNullOrUndefined();

		// `GetMethod` abstract operation
		// https://tc39.es/ecma262/#sec-getmethod
		getMethod = function (V, P) {
		  var func = V[P];
		  return isNullOrUndefined(func) ? undefined : aCallable(func);
		};
		return getMethod;
	}

	var ordinaryToPrimitive;
	var hasRequiredOrdinaryToPrimitive;

	function requireOrdinaryToPrimitive () {
		if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
		hasRequiredOrdinaryToPrimitive = 1;
		var call = requireFunctionCall();
		var isCallable = requireIsCallable();
		var isObject = requireIsObject();

		var $TypeError = TypeError;

		// `OrdinaryToPrimitive` abstract operation
		// https://tc39.es/ecma262/#sec-ordinarytoprimitive
		ordinaryToPrimitive = function (input, pref) {
		  var fn, val;
		  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
		  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
		  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
		  throw new $TypeError("Can't convert object to primitive value");
		};
		return ordinaryToPrimitive;
	}

	var sharedStore = {exports: {}};

	var isPure;
	var hasRequiredIsPure;

	function requireIsPure () {
		if (hasRequiredIsPure) return isPure;
		hasRequiredIsPure = 1;
		isPure = false;
		return isPure;
	}

	var defineGlobalProperty;
	var hasRequiredDefineGlobalProperty;

	function requireDefineGlobalProperty () {
		if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
		hasRequiredDefineGlobalProperty = 1;
		var globalThis = requireGlobalThis();

		// eslint-disable-next-line es/no-object-defineproperty -- safe
		var defineProperty = Object.defineProperty;

		defineGlobalProperty = function (key, value) {
		  try {
		    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
		  } catch (error) {
		    globalThis[key] = value;
		  } return value;
		};
		return defineGlobalProperty;
	}

	var hasRequiredSharedStore;

	function requireSharedStore () {
		if (hasRequiredSharedStore) return sharedStore.exports;
		hasRequiredSharedStore = 1;
		var IS_PURE = requireIsPure();
		var globalThis = requireGlobalThis();
		var defineGlobalProperty = requireDefineGlobalProperty();

		var SHARED = '__core-js_shared__';
		var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

		(store.versions || (store.versions = [])).push({
		  version: '3.43.0',
		  mode: IS_PURE ? 'pure' : 'global',
		  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
		  license: 'https://github.com/zloirock/core-js/blob/v3.43.0/LICENSE',
		  source: 'https://github.com/zloirock/core-js'
		});
		return sharedStore.exports;
	}

	var shared;
	var hasRequiredShared;

	function requireShared () {
		if (hasRequiredShared) return shared;
		hasRequiredShared = 1;
		var store = requireSharedStore();

		shared = function (key, value) {
		  return store[key] || (store[key] = value || {});
		};
		return shared;
	}

	var toObject;
	var hasRequiredToObject;

	function requireToObject () {
		if (hasRequiredToObject) return toObject;
		hasRequiredToObject = 1;
		var requireObjectCoercible = requireRequireObjectCoercible();

		var $Object = Object;

		// `ToObject` abstract operation
		// https://tc39.es/ecma262/#sec-toobject
		toObject = function (argument) {
		  return $Object(requireObjectCoercible(argument));
		};
		return toObject;
	}

	var hasOwnProperty_1;
	var hasRequiredHasOwnProperty;

	function requireHasOwnProperty () {
		if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
		hasRequiredHasOwnProperty = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var toObject = requireToObject();

		var hasOwnProperty = uncurryThis({}.hasOwnProperty);

		// `HasOwnProperty` abstract operation
		// https://tc39.es/ecma262/#sec-hasownproperty
		// eslint-disable-next-line es/no-object-hasown -- safe
		hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
		  return hasOwnProperty(toObject(it), key);
		};
		return hasOwnProperty_1;
	}

	var uid;
	var hasRequiredUid;

	function requireUid () {
		if (hasRequiredUid) return uid;
		hasRequiredUid = 1;
		var uncurryThis = requireFunctionUncurryThis();

		var id = 0;
		var postfix = Math.random();
		var toString = uncurryThis(1.1.toString);

		uid = function (key) {
		  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
		};
		return uid;
	}

	var wellKnownSymbol;
	var hasRequiredWellKnownSymbol;

	function requireWellKnownSymbol () {
		if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
		hasRequiredWellKnownSymbol = 1;
		var globalThis = requireGlobalThis();
		var shared = requireShared();
		var hasOwn = requireHasOwnProperty();
		var uid = requireUid();
		var NATIVE_SYMBOL = requireSymbolConstructorDetection();
		var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

		var Symbol = globalThis.Symbol;
		var WellKnownSymbolsStore = shared('wks');
		var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

		wellKnownSymbol = function (name) {
		  if (!hasOwn(WellKnownSymbolsStore, name)) {
		    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
		      ? Symbol[name]
		      : createWellKnownSymbol('Symbol.' + name);
		  } return WellKnownSymbolsStore[name];
		};
		return wellKnownSymbol;
	}

	var toPrimitive;
	var hasRequiredToPrimitive;

	function requireToPrimitive () {
		if (hasRequiredToPrimitive) return toPrimitive;
		hasRequiredToPrimitive = 1;
		var call = requireFunctionCall();
		var isObject = requireIsObject();
		var isSymbol = requireIsSymbol();
		var getMethod = requireGetMethod();
		var ordinaryToPrimitive = requireOrdinaryToPrimitive();
		var wellKnownSymbol = requireWellKnownSymbol();

		var $TypeError = TypeError;
		var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

		// `ToPrimitive` abstract operation
		// https://tc39.es/ecma262/#sec-toprimitive
		toPrimitive = function (input, pref) {
		  if (!isObject(input) || isSymbol(input)) return input;
		  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
		  var result;
		  if (exoticToPrim) {
		    if (pref === undefined) pref = 'default';
		    result = call(exoticToPrim, input, pref);
		    if (!isObject(result) || isSymbol(result)) return result;
		    throw new $TypeError("Can't convert object to primitive value");
		  }
		  if (pref === undefined) pref = 'number';
		  return ordinaryToPrimitive(input, pref);
		};
		return toPrimitive;
	}

	var toPropertyKey;
	var hasRequiredToPropertyKey;

	function requireToPropertyKey () {
		if (hasRequiredToPropertyKey) return toPropertyKey;
		hasRequiredToPropertyKey = 1;
		var toPrimitive = requireToPrimitive();
		var isSymbol = requireIsSymbol();

		// `ToPropertyKey` abstract operation
		// https://tc39.es/ecma262/#sec-topropertykey
		toPropertyKey = function (argument) {
		  var key = toPrimitive(argument, 'string');
		  return isSymbol(key) ? key : key + '';
		};
		return toPropertyKey;
	}

	var documentCreateElement;
	var hasRequiredDocumentCreateElement;

	function requireDocumentCreateElement () {
		if (hasRequiredDocumentCreateElement) return documentCreateElement;
		hasRequiredDocumentCreateElement = 1;
		var globalThis = requireGlobalThis();
		var isObject = requireIsObject();

		var document = globalThis.document;
		// typeof document.createElement is 'object' in old IE
		var EXISTS = isObject(document) && isObject(document.createElement);

		documentCreateElement = function (it) {
		  return EXISTS ? document.createElement(it) : {};
		};
		return documentCreateElement;
	}

	var ie8DomDefine;
	var hasRequiredIe8DomDefine;

	function requireIe8DomDefine () {
		if (hasRequiredIe8DomDefine) return ie8DomDefine;
		hasRequiredIe8DomDefine = 1;
		var DESCRIPTORS = requireDescriptors();
		var fails = requireFails();
		var createElement = requireDocumentCreateElement();

		// Thanks to IE8 for its funny defineProperty
		ie8DomDefine = !DESCRIPTORS && !fails(function () {
		  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
		  return Object.defineProperty(createElement('div'), 'a', {
		    get: function () { return 7; }
		  }).a !== 7;
		});
		return ie8DomDefine;
	}

	var hasRequiredObjectGetOwnPropertyDescriptor;

	function requireObjectGetOwnPropertyDescriptor () {
		if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
		hasRequiredObjectGetOwnPropertyDescriptor = 1;
		var DESCRIPTORS = requireDescriptors();
		var call = requireFunctionCall();
		var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();
		var toIndexedObject = requireToIndexedObject();
		var toPropertyKey = requireToPropertyKey();
		var hasOwn = requireHasOwnProperty();
		var IE8_DOM_DEFINE = requireIe8DomDefine();

		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

		// `Object.getOwnPropertyDescriptor` method
		// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
		objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
		  O = toIndexedObject(O);
		  P = toPropertyKey(P);
		  if (IE8_DOM_DEFINE) try {
		    return $getOwnPropertyDescriptor(O, P);
		  } catch (error) { /* empty */ }
		  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
		};
		return objectGetOwnPropertyDescriptor;
	}

	var objectDefineProperty = {};

	var v8PrototypeDefineBug;
	var hasRequiredV8PrototypeDefineBug;

	function requireV8PrototypeDefineBug () {
		if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
		hasRequiredV8PrototypeDefineBug = 1;
		var DESCRIPTORS = requireDescriptors();
		var fails = requireFails();

		// V8 ~ Chrome 36-
		// https://bugs.chromium.org/p/v8/issues/detail?id=3334
		v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
		  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
		  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
		    value: 42,
		    writable: false
		  }).prototype !== 42;
		});
		return v8PrototypeDefineBug;
	}

	var anObject;
	var hasRequiredAnObject;

	function requireAnObject () {
		if (hasRequiredAnObject) return anObject;
		hasRequiredAnObject = 1;
		var isObject = requireIsObject();

		var $String = String;
		var $TypeError = TypeError;

		// `Assert: Type(argument) is Object`
		anObject = function (argument) {
		  if (isObject(argument)) return argument;
		  throw new $TypeError($String(argument) + ' is not an object');
		};
		return anObject;
	}

	var hasRequiredObjectDefineProperty;

	function requireObjectDefineProperty () {
		if (hasRequiredObjectDefineProperty) return objectDefineProperty;
		hasRequiredObjectDefineProperty = 1;
		var DESCRIPTORS = requireDescriptors();
		var IE8_DOM_DEFINE = requireIe8DomDefine();
		var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
		var anObject = requireAnObject();
		var toPropertyKey = requireToPropertyKey();

		var $TypeError = TypeError;
		// eslint-disable-next-line es/no-object-defineproperty -- safe
		var $defineProperty = Object.defineProperty;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
		var ENUMERABLE = 'enumerable';
		var CONFIGURABLE = 'configurable';
		var WRITABLE = 'writable';

		// `Object.defineProperty` method
		// https://tc39.es/ecma262/#sec-object.defineproperty
		objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
		  anObject(O);
		  P = toPropertyKey(P);
		  anObject(Attributes);
		  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
		    var current = $getOwnPropertyDescriptor(O, P);
		    if (current && current[WRITABLE]) {
		      O[P] = Attributes.value;
		      Attributes = {
		        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
		        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
		        writable: false
		      };
		    }
		  } return $defineProperty(O, P, Attributes);
		} : $defineProperty : function defineProperty(O, P, Attributes) {
		  anObject(O);
		  P = toPropertyKey(P);
		  anObject(Attributes);
		  if (IE8_DOM_DEFINE) try {
		    return $defineProperty(O, P, Attributes);
		  } catch (error) { /* empty */ }
		  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
		  if ('value' in Attributes) O[P] = Attributes.value;
		  return O;
		};
		return objectDefineProperty;
	}

	var createNonEnumerableProperty;
	var hasRequiredCreateNonEnumerableProperty;

	function requireCreateNonEnumerableProperty () {
		if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
		hasRequiredCreateNonEnumerableProperty = 1;
		var DESCRIPTORS = requireDescriptors();
		var definePropertyModule = requireObjectDefineProperty();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();

		createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
		  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
		} : function (object, key, value) {
		  object[key] = value;
		  return object;
		};
		return createNonEnumerableProperty;
	}

	var makeBuiltIn = {exports: {}};

	var functionName;
	var hasRequiredFunctionName;

	function requireFunctionName () {
		if (hasRequiredFunctionName) return functionName;
		hasRequiredFunctionName = 1;
		var DESCRIPTORS = requireDescriptors();
		var hasOwn = requireHasOwnProperty();

		var FunctionPrototype = Function.prototype;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

		var EXISTS = hasOwn(FunctionPrototype, 'name');
		// additional protection from minified / mangled / dropped function names
		var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
		var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

		functionName = {
		  EXISTS: EXISTS,
		  PROPER: PROPER,
		  CONFIGURABLE: CONFIGURABLE
		};
		return functionName;
	}

	var inspectSource;
	var hasRequiredInspectSource;

	function requireInspectSource () {
		if (hasRequiredInspectSource) return inspectSource;
		hasRequiredInspectSource = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var isCallable = requireIsCallable();
		var store = requireSharedStore();

		var functionToString = uncurryThis(Function.toString);

		// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
		if (!isCallable(store.inspectSource)) {
		  store.inspectSource = function (it) {
		    return functionToString(it);
		  };
		}

		inspectSource = store.inspectSource;
		return inspectSource;
	}

	var weakMapBasicDetection;
	var hasRequiredWeakMapBasicDetection;

	function requireWeakMapBasicDetection () {
		if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
		hasRequiredWeakMapBasicDetection = 1;
		var globalThis = requireGlobalThis();
		var isCallable = requireIsCallable();

		var WeakMap = globalThis.WeakMap;

		weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
		return weakMapBasicDetection;
	}

	var sharedKey;
	var hasRequiredSharedKey;

	function requireSharedKey () {
		if (hasRequiredSharedKey) return sharedKey;
		hasRequiredSharedKey = 1;
		var shared = requireShared();
		var uid = requireUid();

		var keys = shared('keys');

		sharedKey = function (key) {
		  return keys[key] || (keys[key] = uid(key));
		};
		return sharedKey;
	}

	var hiddenKeys;
	var hasRequiredHiddenKeys;

	function requireHiddenKeys () {
		if (hasRequiredHiddenKeys) return hiddenKeys;
		hasRequiredHiddenKeys = 1;
		hiddenKeys = {};
		return hiddenKeys;
	}

	var internalState;
	var hasRequiredInternalState;

	function requireInternalState () {
		if (hasRequiredInternalState) return internalState;
		hasRequiredInternalState = 1;
		var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
		var globalThis = requireGlobalThis();
		var isObject = requireIsObject();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var hasOwn = requireHasOwnProperty();
		var shared = requireSharedStore();
		var sharedKey = requireSharedKey();
		var hiddenKeys = requireHiddenKeys();

		var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
		var TypeError = globalThis.TypeError;
		var WeakMap = globalThis.WeakMap;
		var set, get, has;

		var enforce = function (it) {
		  return has(it) ? get(it) : set(it, {});
		};

		var getterFor = function (TYPE) {
		  return function (it) {
		    var state;
		    if (!isObject(it) || (state = get(it)).type !== TYPE) {
		      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
		    } return state;
		  };
		};

		if (NATIVE_WEAK_MAP || shared.state) {
		  var store = shared.state || (shared.state = new WeakMap());
		  /* eslint-disable no-self-assign -- prototype methods protection */
		  store.get = store.get;
		  store.has = store.has;
		  store.set = store.set;
		  /* eslint-enable no-self-assign -- prototype methods protection */
		  set = function (it, metadata) {
		    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
		    metadata.facade = it;
		    store.set(it, metadata);
		    return metadata;
		  };
		  get = function (it) {
		    return store.get(it) || {};
		  };
		  has = function (it) {
		    return store.has(it);
		  };
		} else {
		  var STATE = sharedKey('state');
		  hiddenKeys[STATE] = true;
		  set = function (it, metadata) {
		    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
		    metadata.facade = it;
		    createNonEnumerableProperty(it, STATE, metadata);
		    return metadata;
		  };
		  get = function (it) {
		    return hasOwn(it, STATE) ? it[STATE] : {};
		  };
		  has = function (it) {
		    return hasOwn(it, STATE);
		  };
		}

		internalState = {
		  set: set,
		  get: get,
		  has: has,
		  enforce: enforce,
		  getterFor: getterFor
		};
		return internalState;
	}

	var hasRequiredMakeBuiltIn;

	function requireMakeBuiltIn () {
		if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
		hasRequiredMakeBuiltIn = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var isCallable = requireIsCallable();
		var hasOwn = requireHasOwnProperty();
		var DESCRIPTORS = requireDescriptors();
		var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
		var inspectSource = requireInspectSource();
		var InternalStateModule = requireInternalState();

		var enforceInternalState = InternalStateModule.enforce;
		var getInternalState = InternalStateModule.get;
		var $String = String;
		// eslint-disable-next-line es/no-object-defineproperty -- safe
		var defineProperty = Object.defineProperty;
		var stringSlice = uncurryThis(''.slice);
		var replace = uncurryThis(''.replace);
		var join = uncurryThis([].join);

		var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
		  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
		});

		var TEMPLATE = String(String).split('String');

		var makeBuiltIn$1 = makeBuiltIn.exports = function (value, name, options) {
		  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
		    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
		  }
		  if (options && options.getter) name = 'get ' + name;
		  if (options && options.setter) name = 'set ' + name;
		  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
		    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
		    else value.name = name;
		  }
		  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
		    defineProperty(value, 'length', { value: options.arity });
		  }
		  try {
		    if (options && hasOwn(options, 'constructor') && options.constructor) {
		      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
		    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
		    } else if (value.prototype) value.prototype = undefined;
		  } catch (error) { /* empty */ }
		  var state = enforceInternalState(value);
		  if (!hasOwn(state, 'source')) {
		    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
		  } return value;
		};

		// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
		// eslint-disable-next-line no-extend-native -- required
		Function.prototype.toString = makeBuiltIn$1(function toString() {
		  return isCallable(this) && getInternalState(this).source || inspectSource(this);
		}, 'toString');
		return makeBuiltIn.exports;
	}

	var defineBuiltIn;
	var hasRequiredDefineBuiltIn;

	function requireDefineBuiltIn () {
		if (hasRequiredDefineBuiltIn) return defineBuiltIn;
		hasRequiredDefineBuiltIn = 1;
		var isCallable = requireIsCallable();
		var definePropertyModule = requireObjectDefineProperty();
		var makeBuiltIn = requireMakeBuiltIn();
		var defineGlobalProperty = requireDefineGlobalProperty();

		defineBuiltIn = function (O, key, value, options) {
		  if (!options) options = {};
		  var simple = options.enumerable;
		  var name = options.name !== undefined ? options.name : key;
		  if (isCallable(value)) makeBuiltIn(value, name, options);
		  if (options.global) {
		    if (simple) O[key] = value;
		    else defineGlobalProperty(key, value);
		  } else {
		    try {
		      if (!options.unsafe) delete O[key];
		      else if (O[key]) simple = true;
		    } catch (error) { /* empty */ }
		    if (simple) O[key] = value;
		    else definePropertyModule.f(O, key, {
		      value: value,
		      enumerable: false,
		      configurable: !options.nonConfigurable,
		      writable: !options.nonWritable
		    });
		  } return O;
		};
		return defineBuiltIn;
	}

	var objectGetOwnPropertyNames = {};

	var mathTrunc;
	var hasRequiredMathTrunc;

	function requireMathTrunc () {
		if (hasRequiredMathTrunc) return mathTrunc;
		hasRequiredMathTrunc = 1;
		var ceil = Math.ceil;
		var floor = Math.floor;

		// `Math.trunc` method
		// https://tc39.es/ecma262/#sec-math.trunc
		// eslint-disable-next-line es/no-math-trunc -- safe
		mathTrunc = Math.trunc || function trunc(x) {
		  var n = +x;
		  return (n > 0 ? floor : ceil)(n);
		};
		return mathTrunc;
	}

	var toIntegerOrInfinity;
	var hasRequiredToIntegerOrInfinity;

	function requireToIntegerOrInfinity () {
		if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
		hasRequiredToIntegerOrInfinity = 1;
		var trunc = requireMathTrunc();

		// `ToIntegerOrInfinity` abstract operation
		// https://tc39.es/ecma262/#sec-tointegerorinfinity
		toIntegerOrInfinity = function (argument) {
		  var number = +argument;
		  // eslint-disable-next-line no-self-compare -- NaN check
		  return number !== number || number === 0 ? 0 : trunc(number);
		};
		return toIntegerOrInfinity;
	}

	var toAbsoluteIndex;
	var hasRequiredToAbsoluteIndex;

	function requireToAbsoluteIndex () {
		if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
		hasRequiredToAbsoluteIndex = 1;
		var toIntegerOrInfinity = requireToIntegerOrInfinity();

		var max = Math.max;
		var min = Math.min;

		// Helper for a popular repeating case of the spec:
		// Let integer be ? ToInteger(index).
		// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
		toAbsoluteIndex = function (index, length) {
		  var integer = toIntegerOrInfinity(index);
		  return integer < 0 ? max(integer + length, 0) : min(integer, length);
		};
		return toAbsoluteIndex;
	}

	var toLength;
	var hasRequiredToLength;

	function requireToLength () {
		if (hasRequiredToLength) return toLength;
		hasRequiredToLength = 1;
		var toIntegerOrInfinity = requireToIntegerOrInfinity();

		var min = Math.min;

		// `ToLength` abstract operation
		// https://tc39.es/ecma262/#sec-tolength
		toLength = function (argument) {
		  var len = toIntegerOrInfinity(argument);
		  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
		};
		return toLength;
	}

	var lengthOfArrayLike;
	var hasRequiredLengthOfArrayLike;

	function requireLengthOfArrayLike () {
		if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
		hasRequiredLengthOfArrayLike = 1;
		var toLength = requireToLength();

		// `LengthOfArrayLike` abstract operation
		// https://tc39.es/ecma262/#sec-lengthofarraylike
		lengthOfArrayLike = function (obj) {
		  return toLength(obj.length);
		};
		return lengthOfArrayLike;
	}

	var arrayIncludes;
	var hasRequiredArrayIncludes;

	function requireArrayIncludes () {
		if (hasRequiredArrayIncludes) return arrayIncludes;
		hasRequiredArrayIncludes = 1;
		var toIndexedObject = requireToIndexedObject();
		var toAbsoluteIndex = requireToAbsoluteIndex();
		var lengthOfArrayLike = requireLengthOfArrayLike();

		// `Array.prototype.{ indexOf, includes }` methods implementation
		var createMethod = function (IS_INCLUDES) {
		  return function ($this, el, fromIndex) {
		    var O = toIndexedObject($this);
		    var length = lengthOfArrayLike(O);
		    if (length === 0) return !IS_INCLUDES && -1;
		    var index = toAbsoluteIndex(fromIndex, length);
		    var value;
		    // Array#includes uses SameValueZero equality algorithm
		    // eslint-disable-next-line no-self-compare -- NaN check
		    if (IS_INCLUDES && el !== el) while (length > index) {
		      value = O[index++];
		      // eslint-disable-next-line no-self-compare -- NaN check
		      if (value !== value) return true;
		    // Array#indexOf ignores holes, Array#includes - not
		    } else for (;length > index; index++) {
		      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
		    } return !IS_INCLUDES && -1;
		  };
		};

		arrayIncludes = {
		  // `Array.prototype.includes` method
		  // https://tc39.es/ecma262/#sec-array.prototype.includes
		  includes: createMethod(true),
		  // `Array.prototype.indexOf` method
		  // https://tc39.es/ecma262/#sec-array.prototype.indexof
		  indexOf: createMethod(false)
		};
		return arrayIncludes;
	}

	var objectKeysInternal;
	var hasRequiredObjectKeysInternal;

	function requireObjectKeysInternal () {
		if (hasRequiredObjectKeysInternal) return objectKeysInternal;
		hasRequiredObjectKeysInternal = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var hasOwn = requireHasOwnProperty();
		var toIndexedObject = requireToIndexedObject();
		var indexOf = requireArrayIncludes().indexOf;
		var hiddenKeys = requireHiddenKeys();

		var push = uncurryThis([].push);

		objectKeysInternal = function (object, names) {
		  var O = toIndexedObject(object);
		  var i = 0;
		  var result = [];
		  var key;
		  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
		  // Don't enum bug & hidden keys
		  while (names.length > i) if (hasOwn(O, key = names[i++])) {
		    ~indexOf(result, key) || push(result, key);
		  }
		  return result;
		};
		return objectKeysInternal;
	}

	var enumBugKeys;
	var hasRequiredEnumBugKeys;

	function requireEnumBugKeys () {
		if (hasRequiredEnumBugKeys) return enumBugKeys;
		hasRequiredEnumBugKeys = 1;
		// IE8- don't enum bug keys
		enumBugKeys = [
		  'constructor',
		  'hasOwnProperty',
		  'isPrototypeOf',
		  'propertyIsEnumerable',
		  'toLocaleString',
		  'toString',
		  'valueOf'
		];
		return enumBugKeys;
	}

	var hasRequiredObjectGetOwnPropertyNames;

	function requireObjectGetOwnPropertyNames () {
		if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
		hasRequiredObjectGetOwnPropertyNames = 1;
		var internalObjectKeys = requireObjectKeysInternal();
		var enumBugKeys = requireEnumBugKeys();

		var hiddenKeys = enumBugKeys.concat('length', 'prototype');

		// `Object.getOwnPropertyNames` method
		// https://tc39.es/ecma262/#sec-object.getownpropertynames
		// eslint-disable-next-line es/no-object-getownpropertynames -- safe
		objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
		  return internalObjectKeys(O, hiddenKeys);
		};
		return objectGetOwnPropertyNames;
	}

	var objectGetOwnPropertySymbols = {};

	var hasRequiredObjectGetOwnPropertySymbols;

	function requireObjectGetOwnPropertySymbols () {
		if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
		hasRequiredObjectGetOwnPropertySymbols = 1;
		// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
		objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
		return objectGetOwnPropertySymbols;
	}

	var ownKeys$1;
	var hasRequiredOwnKeys;

	function requireOwnKeys () {
		if (hasRequiredOwnKeys) return ownKeys$1;
		hasRequiredOwnKeys = 1;
		var getBuiltIn = requireGetBuiltIn();
		var uncurryThis = requireFunctionUncurryThis();
		var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
		var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
		var anObject = requireAnObject();

		var concat = uncurryThis([].concat);

		// all object keys, includes non-enumerable and symbols
		ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
		  var keys = getOwnPropertyNamesModule.f(anObject(it));
		  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
		  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
		};
		return ownKeys$1;
	}

	var copyConstructorProperties;
	var hasRequiredCopyConstructorProperties;

	function requireCopyConstructorProperties () {
		if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
		hasRequiredCopyConstructorProperties = 1;
		var hasOwn = requireHasOwnProperty();
		var ownKeys = requireOwnKeys();
		var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
		var definePropertyModule = requireObjectDefineProperty();

		copyConstructorProperties = function (target, source, exceptions) {
		  var keys = ownKeys(source);
		  var defineProperty = definePropertyModule.f;
		  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
		  for (var i = 0; i < keys.length; i++) {
		    var key = keys[i];
		    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
		      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
		    }
		  }
		};
		return copyConstructorProperties;
	}

	var isForced_1;
	var hasRequiredIsForced;

	function requireIsForced () {
		if (hasRequiredIsForced) return isForced_1;
		hasRequiredIsForced = 1;
		var fails = requireFails();
		var isCallable = requireIsCallable();

		var replacement = /#|\.prototype\./;

		var isForced = function (feature, detection) {
		  var value = data[normalize(feature)];
		  return value === POLYFILL ? true
		    : value === NATIVE ? false
		    : isCallable(detection) ? fails(detection)
		    : !!detection;
		};

		var normalize = isForced.normalize = function (string) {
		  return String(string).replace(replacement, '.').toLowerCase();
		};

		var data = isForced.data = {};
		var NATIVE = isForced.NATIVE = 'N';
		var POLYFILL = isForced.POLYFILL = 'P';

		isForced_1 = isForced;
		return isForced_1;
	}

	var _export;
	var hasRequired_export;

	function require_export () {
		if (hasRequired_export) return _export;
		hasRequired_export = 1;
		var globalThis = requireGlobalThis();
		var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var defineBuiltIn = requireDefineBuiltIn();
		var defineGlobalProperty = requireDefineGlobalProperty();
		var copyConstructorProperties = requireCopyConstructorProperties();
		var isForced = requireIsForced();

		/*
		  options.target         - name of the target object
		  options.global         - target is the global object
		  options.stat           - export as static methods of target
		  options.proto          - export as prototype methods of target
		  options.real           - real prototype method for the `pure` version
		  options.forced         - export even if the native feature is available
		  options.bind           - bind methods to the target, required for the `pure` version
		  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
		  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
		  options.sham           - add a flag to not completely full polyfills
		  options.enumerable     - export as enumerable property
		  options.dontCallGetSet - prevent calling a getter on target
		  options.name           - the .name of the function if it does not match the key
		*/
		_export = function (options, source) {
		  var TARGET = options.target;
		  var GLOBAL = options.global;
		  var STATIC = options.stat;
		  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
		  if (GLOBAL) {
		    target = globalThis;
		  } else if (STATIC) {
		    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
		  } else {
		    target = globalThis[TARGET] && globalThis[TARGET].prototype;
		  }
		  if (target) for (key in source) {
		    sourceProperty = source[key];
		    if (options.dontCallGetSet) {
		      descriptor = getOwnPropertyDescriptor(target, key);
		      targetProperty = descriptor && descriptor.value;
		    } else targetProperty = target[key];
		    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
		    // contained in target
		    if (!FORCED && targetProperty !== undefined) {
		      if (typeof sourceProperty == typeof targetProperty) continue;
		      copyConstructorProperties(sourceProperty, targetProperty);
		    }
		    // add a flag to not completely full polyfills
		    if (options.sham || (targetProperty && targetProperty.sham)) {
		      createNonEnumerableProperty(sourceProperty, 'sham', true);
		    }
		    defineBuiltIn(target, key, sourceProperty, options);
		  }
		};
		return _export;
	}

	var toStringTagSupport;
	var hasRequiredToStringTagSupport;

	function requireToStringTagSupport () {
		if (hasRequiredToStringTagSupport) return toStringTagSupport;
		hasRequiredToStringTagSupport = 1;
		var wellKnownSymbol = requireWellKnownSymbol();

		var TO_STRING_TAG = wellKnownSymbol('toStringTag');
		var test = {};

		test[TO_STRING_TAG] = 'z';

		toStringTagSupport = String(test) === '[object z]';
		return toStringTagSupport;
	}

	var classof;
	var hasRequiredClassof;

	function requireClassof () {
		if (hasRequiredClassof) return classof;
		hasRequiredClassof = 1;
		var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
		var isCallable = requireIsCallable();
		var classofRaw = requireClassofRaw();
		var wellKnownSymbol = requireWellKnownSymbol();

		var TO_STRING_TAG = wellKnownSymbol('toStringTag');
		var $Object = Object;

		// ES3 wrong here
		var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

		// fallback for IE11 Script Access Denied error
		var tryGet = function (it, key) {
		  try {
		    return it[key];
		  } catch (error) { /* empty */ }
		};

		// getting tag from ES6+ `Object.prototype.toString`
		classof = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
		  var O, tag, result;
		  return it === undefined ? 'Undefined' : it === null ? 'Null'
		    // @@toStringTag case
		    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
		    // builtinTag case
		    : CORRECT_ARGUMENTS ? classofRaw(O)
		    // ES3 arguments fallback
		    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
		};
		return classof;
	}

	var toString;
	var hasRequiredToString;

	function requireToString () {
		if (hasRequiredToString) return toString;
		hasRequiredToString = 1;
		var classof = requireClassof();

		var $String = String;

		toString = function (argument) {
		  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
		  return $String(argument);
		};
		return toString;
	}

	var regexpFlags;
	var hasRequiredRegexpFlags;

	function requireRegexpFlags () {
		if (hasRequiredRegexpFlags) return regexpFlags;
		hasRequiredRegexpFlags = 1;
		var anObject = requireAnObject();

		// `RegExp.prototype.flags` getter implementation
		// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
		regexpFlags = function () {
		  var that = anObject(this);
		  var result = '';
		  if (that.hasIndices) result += 'd';
		  if (that.global) result += 'g';
		  if (that.ignoreCase) result += 'i';
		  if (that.multiline) result += 'm';
		  if (that.dotAll) result += 's';
		  if (that.unicode) result += 'u';
		  if (that.unicodeSets) result += 'v';
		  if (that.sticky) result += 'y';
		  return result;
		};
		return regexpFlags;
	}

	var regexpStickyHelpers;
	var hasRequiredRegexpStickyHelpers;

	function requireRegexpStickyHelpers () {
		if (hasRequiredRegexpStickyHelpers) return regexpStickyHelpers;
		hasRequiredRegexpStickyHelpers = 1;
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
		var $RegExp = globalThis.RegExp;

		var UNSUPPORTED_Y = fails(function () {
		  var re = $RegExp('a', 'y');
		  re.lastIndex = 2;
		  return re.exec('abcd') !== null;
		});

		// UC Browser bug
		// https://github.com/zloirock/core-js/issues/1008
		var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
		  return !$RegExp('a', 'y').sticky;
		});

		var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
		  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
		  var re = $RegExp('^r', 'gy');
		  re.lastIndex = 2;
		  return re.exec('str') !== null;
		});

		regexpStickyHelpers = {
		  BROKEN_CARET: BROKEN_CARET,
		  MISSED_STICKY: MISSED_STICKY,
		  UNSUPPORTED_Y: UNSUPPORTED_Y
		};
		return regexpStickyHelpers;
	}

	var objectDefineProperties = {};

	var objectKeys;
	var hasRequiredObjectKeys;

	function requireObjectKeys () {
		if (hasRequiredObjectKeys) return objectKeys;
		hasRequiredObjectKeys = 1;
		var internalObjectKeys = requireObjectKeysInternal();
		var enumBugKeys = requireEnumBugKeys();

		// `Object.keys` method
		// https://tc39.es/ecma262/#sec-object.keys
		// eslint-disable-next-line es/no-object-keys -- safe
		objectKeys = Object.keys || function keys(O) {
		  return internalObjectKeys(O, enumBugKeys);
		};
		return objectKeys;
	}

	var hasRequiredObjectDefineProperties;

	function requireObjectDefineProperties () {
		if (hasRequiredObjectDefineProperties) return objectDefineProperties;
		hasRequiredObjectDefineProperties = 1;
		var DESCRIPTORS = requireDescriptors();
		var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
		var definePropertyModule = requireObjectDefineProperty();
		var anObject = requireAnObject();
		var toIndexedObject = requireToIndexedObject();
		var objectKeys = requireObjectKeys();

		// `Object.defineProperties` method
		// https://tc39.es/ecma262/#sec-object.defineproperties
		// eslint-disable-next-line es/no-object-defineproperties -- safe
		objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
		  anObject(O);
		  var props = toIndexedObject(Properties);
		  var keys = objectKeys(Properties);
		  var length = keys.length;
		  var index = 0;
		  var key;
		  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
		  return O;
		};
		return objectDefineProperties;
	}

	var html;
	var hasRequiredHtml;

	function requireHtml () {
		if (hasRequiredHtml) return html;
		hasRequiredHtml = 1;
		var getBuiltIn = requireGetBuiltIn();

		html = getBuiltIn('document', 'documentElement');
		return html;
	}

	var objectCreate;
	var hasRequiredObjectCreate;

	function requireObjectCreate () {
		if (hasRequiredObjectCreate) return objectCreate;
		hasRequiredObjectCreate = 1;
		/* global ActiveXObject -- old IE, WSH */
		var anObject = requireAnObject();
		var definePropertiesModule = requireObjectDefineProperties();
		var enumBugKeys = requireEnumBugKeys();
		var hiddenKeys = requireHiddenKeys();
		var html = requireHtml();
		var documentCreateElement = requireDocumentCreateElement();
		var sharedKey = requireSharedKey();

		var GT = '>';
		var LT = '<';
		var PROTOTYPE = 'prototype';
		var SCRIPT = 'script';
		var IE_PROTO = sharedKey('IE_PROTO');

		var EmptyConstructor = function () { /* empty */ };

		var scriptTag = function (content) {
		  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
		};

		// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
		var NullProtoObjectViaActiveX = function (activeXDocument) {
		  activeXDocument.write(scriptTag(''));
		  activeXDocument.close();
		  var temp = activeXDocument.parentWindow.Object;
		  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
		  activeXDocument = null;
		  return temp;
		};

		// Create object with fake `null` prototype: use iframe Object with cleared prototype
		var NullProtoObjectViaIFrame = function () {
		  // Thrash, waste and sodomy: IE GC bug
		  var iframe = documentCreateElement('iframe');
		  var JS = 'java' + SCRIPT + ':';
		  var iframeDocument;
		  iframe.style.display = 'none';
		  html.appendChild(iframe);
		  // https://github.com/zloirock/core-js/issues/475
		  iframe.src = String(JS);
		  iframeDocument = iframe.contentWindow.document;
		  iframeDocument.open();
		  iframeDocument.write(scriptTag('document.F=Object'));
		  iframeDocument.close();
		  return iframeDocument.F;
		};

		// Check for document.domain and active x support
		// No need to use active x approach when document.domain is not set
		// see https://github.com/es-shims/es5-shim/issues/150
		// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
		// avoid IE GC bug
		var activeXDocument;
		var NullProtoObject = function () {
		  try {
		    activeXDocument = new ActiveXObject('htmlfile');
		  } catch (error) { /* ignore */ }
		  NullProtoObject = typeof document != 'undefined'
		    ? document.domain && activeXDocument
		      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
		      : NullProtoObjectViaIFrame()
		    : NullProtoObjectViaActiveX(activeXDocument); // WSH
		  var length = enumBugKeys.length;
		  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
		  return NullProtoObject();
		};

		hiddenKeys[IE_PROTO] = true;

		// `Object.create` method
		// https://tc39.es/ecma262/#sec-object.create
		// eslint-disable-next-line es/no-object-create -- safe
		objectCreate = Object.create || function create(O, Properties) {
		  var result;
		  if (O !== null) {
		    EmptyConstructor[PROTOTYPE] = anObject(O);
		    result = new EmptyConstructor();
		    EmptyConstructor[PROTOTYPE] = null;
		    // add "__proto__" for Object.getPrototypeOf polyfill
		    result[IE_PROTO] = O;
		  } else result = NullProtoObject();
		  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
		};
		return objectCreate;
	}

	var regexpUnsupportedDotAll;
	var hasRequiredRegexpUnsupportedDotAll;

	function requireRegexpUnsupportedDotAll () {
		if (hasRequiredRegexpUnsupportedDotAll) return regexpUnsupportedDotAll;
		hasRequiredRegexpUnsupportedDotAll = 1;
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
		var $RegExp = globalThis.RegExp;

		regexpUnsupportedDotAll = fails(function () {
		  var re = $RegExp('.', 's');
		  return !(re.dotAll && re.test('\n') && re.flags === 's');
		});
		return regexpUnsupportedDotAll;
	}

	var regexpUnsupportedNcg;
	var hasRequiredRegexpUnsupportedNcg;

	function requireRegexpUnsupportedNcg () {
		if (hasRequiredRegexpUnsupportedNcg) return regexpUnsupportedNcg;
		hasRequiredRegexpUnsupportedNcg = 1;
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
		var $RegExp = globalThis.RegExp;

		regexpUnsupportedNcg = fails(function () {
		  var re = $RegExp('(?<a>b)', 'g');
		  return re.exec('b').groups.a !== 'b' ||
		    'b'.replace(re, '$<a>c') !== 'bc';
		});
		return regexpUnsupportedNcg;
	}

	var regexpExec;
	var hasRequiredRegexpExec;

	function requireRegexpExec () {
		if (hasRequiredRegexpExec) return regexpExec;
		hasRequiredRegexpExec = 1;
		/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
		/* eslint-disable regexp/no-useless-quantifier -- testing */
		var call = requireFunctionCall();
		var uncurryThis = requireFunctionUncurryThis();
		var toString = requireToString();
		var regexpFlags = requireRegexpFlags();
		var stickyHelpers = requireRegexpStickyHelpers();
		var shared = requireShared();
		var create = requireObjectCreate();
		var getInternalState = requireInternalState().get;
		var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
		var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

		var nativeReplace = shared('native-string-replace', String.prototype.replace);
		var nativeExec = RegExp.prototype.exec;
		var patchedExec = nativeExec;
		var charAt = uncurryThis(''.charAt);
		var indexOf = uncurryThis(''.indexOf);
		var replace = uncurryThis(''.replace);
		var stringSlice = uncurryThis(''.slice);

		var UPDATES_LAST_INDEX_WRONG = (function () {
		  var re1 = /a/;
		  var re2 = /b*/g;
		  call(nativeExec, re1, 'a');
		  call(nativeExec, re2, 'a');
		  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
		})();

		var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

		// nonparticipating capturing group, copied from es5-shim's String#split patch.
		var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

		var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

		if (PATCH) {
		  patchedExec = function exec(string) {
		    var re = this;
		    var state = getInternalState(re);
		    var str = toString(string);
		    var raw = state.raw;
		    var result, reCopy, lastIndex, match, i, object, group;

		    if (raw) {
		      raw.lastIndex = re.lastIndex;
		      result = call(patchedExec, raw, str);
		      re.lastIndex = raw.lastIndex;
		      return result;
		    }

		    var groups = state.groups;
		    var sticky = UNSUPPORTED_Y && re.sticky;
		    var flags = call(regexpFlags, re);
		    var source = re.source;
		    var charsAdded = 0;
		    var strCopy = str;

		    if (sticky) {
		      flags = replace(flags, 'y', '');
		      if (indexOf(flags, 'g') === -1) {
		        flags += 'g';
		      }

		      strCopy = stringSlice(str, re.lastIndex);
		      // Support anchored sticky behavior.
		      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
		        source = '(?: ' + source + ')';
		        strCopy = ' ' + strCopy;
		        charsAdded++;
		      }
		      // ^(? + rx + ) is needed, in combination with some str slicing, to
		      // simulate the 'y' flag.
		      reCopy = new RegExp('^(?:' + source + ')', flags);
		    }

		    if (NPCG_INCLUDED) {
		      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
		    }
		    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

		    match = call(nativeExec, sticky ? reCopy : re, strCopy);

		    if (sticky) {
		      if (match) {
		        match.input = stringSlice(match.input, charsAdded);
		        match[0] = stringSlice(match[0], charsAdded);
		        match.index = re.lastIndex;
		        re.lastIndex += match[0].length;
		      } else re.lastIndex = 0;
		    } else if (UPDATES_LAST_INDEX_WRONG && match) {
		      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
		    }
		    if (NPCG_INCLUDED && match && match.length > 1) {
		      // Fix browsers whose `exec` methods don't consistently return `undefined`
		      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
		      call(nativeReplace, match[0], reCopy, function () {
		        for (i = 1; i < arguments.length - 2; i++) {
		          if (arguments[i] === undefined) match[i] = undefined;
		        }
		      });
		    }

		    if (match && groups) {
		      match.groups = object = create(null);
		      for (i = 0; i < groups.length; i++) {
		        group = groups[i];
		        object[group[0]] = match[group[1]];
		      }
		    }

		    return match;
		  };
		}

		regexpExec = patchedExec;
		return regexpExec;
	}

	var hasRequiredEs_regexp_exec;

	function requireEs_regexp_exec () {
		if (hasRequiredEs_regexp_exec) return es_regexp_exec;
		hasRequiredEs_regexp_exec = 1;
		var $ = require_export();
		var exec = requireRegexpExec();

		// `RegExp.prototype.exec` method
		// https://tc39.es/ecma262/#sec-regexp.prototype.exec
		$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
		  exec: exec
		});
		return es_regexp_exec;
	}

	requireEs_regexp_exec();

	var es_string_replace = {};

	var functionApply;
	var hasRequiredFunctionApply;

	function requireFunctionApply () {
		if (hasRequiredFunctionApply) return functionApply;
		hasRequiredFunctionApply = 1;
		var NATIVE_BIND = requireFunctionBindNative();

		var FunctionPrototype = Function.prototype;
		var apply = FunctionPrototype.apply;
		var call = FunctionPrototype.call;

		// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
		functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
		  return call.apply(apply, arguments);
		});
		return functionApply;
	}

	var fixRegexpWellKnownSymbolLogic;
	var hasRequiredFixRegexpWellKnownSymbolLogic;

	function requireFixRegexpWellKnownSymbolLogic () {
		if (hasRequiredFixRegexpWellKnownSymbolLogic) return fixRegexpWellKnownSymbolLogic;
		hasRequiredFixRegexpWellKnownSymbolLogic = 1;
		// TODO: Remove from `core-js@4` since it's moved to entry points
		requireEs_regexp_exec();
		var call = requireFunctionCall();
		var defineBuiltIn = requireDefineBuiltIn();
		var regexpExec = requireRegexpExec();
		var fails = requireFails();
		var wellKnownSymbol = requireWellKnownSymbol();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

		var SPECIES = wellKnownSymbol('species');
		var RegExpPrototype = RegExp.prototype;

		fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
		  var SYMBOL = wellKnownSymbol(KEY);

		  var DELEGATES_TO_SYMBOL = !fails(function () {
		    // String methods call symbol-named RegExp methods
		    var O = {};
		    O[SYMBOL] = function () { return 7; };
		    return ''[KEY](O) !== 7;
		  });

		  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
		    // Symbol-named RegExp methods call .exec
		    var execCalled = false;
		    var re = /a/;

		    if (KEY === 'split') {
		      // We can't use real regex here since it causes deoptimization
		      // and serious performance degradation in V8
		      // https://github.com/zloirock/core-js/issues/306
		      re = {};
		      // RegExp[@@split] doesn't call the regex's exec method, but first creates
		      // a new one. We need to return the patched regex when creating the new one.
		      re.constructor = {};
		      re.constructor[SPECIES] = function () { return re; };
		      re.flags = '';
		      re[SYMBOL] = /./[SYMBOL];
		    }

		    re.exec = function () {
		      execCalled = true;
		      return null;
		    };

		    re[SYMBOL]('');
		    return !execCalled;
		  });

		  if (
		    !DELEGATES_TO_SYMBOL ||
		    !DELEGATES_TO_EXEC ||
		    FORCED
		  ) {
		    var nativeRegExpMethod = /./[SYMBOL];
		    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
		      var $exec = regexp.exec;
		      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
		        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
		          // The native String method already delegates to @@method (this
		          // polyfilled function), leasing to infinite recursion.
		          // We avoid it by directly calling the native @@method method.
		          return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
		        }
		        return { done: true, value: call(nativeMethod, str, regexp, arg2) };
		      }
		      return { done: false };
		    });

		    defineBuiltIn(String.prototype, KEY, methods[0]);
		    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
		  }

		  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
		};
		return fixRegexpWellKnownSymbolLogic;
	}

	var stringMultibyte;
	var hasRequiredStringMultibyte;

	function requireStringMultibyte () {
		if (hasRequiredStringMultibyte) return stringMultibyte;
		hasRequiredStringMultibyte = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var toIntegerOrInfinity = requireToIntegerOrInfinity();
		var toString = requireToString();
		var requireObjectCoercible = requireRequireObjectCoercible();

		var charAt = uncurryThis(''.charAt);
		var charCodeAt = uncurryThis(''.charCodeAt);
		var stringSlice = uncurryThis(''.slice);

		var createMethod = function (CONVERT_TO_STRING) {
		  return function ($this, pos) {
		    var S = toString(requireObjectCoercible($this));
		    var position = toIntegerOrInfinity(pos);
		    var size = S.length;
		    var first, second;
		    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
		    first = charCodeAt(S, position);
		    return first < 0xD800 || first > 0xDBFF || position + 1 === size
		      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
		        ? CONVERT_TO_STRING
		          ? charAt(S, position)
		          : first
		        : CONVERT_TO_STRING
		          ? stringSlice(S, position, position + 2)
		          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
		  };
		};

		stringMultibyte = {
		  // `String.prototype.codePointAt` method
		  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
		  codeAt: createMethod(false),
		  // `String.prototype.at` method
		  // https://github.com/mathiasbynens/String.prototype.at
		  charAt: createMethod(true)
		};
		return stringMultibyte;
	}

	var advanceStringIndex;
	var hasRequiredAdvanceStringIndex;

	function requireAdvanceStringIndex () {
		if (hasRequiredAdvanceStringIndex) return advanceStringIndex;
		hasRequiredAdvanceStringIndex = 1;
		var charAt = requireStringMultibyte().charAt;

		// `AdvanceStringIndex` abstract operation
		// https://tc39.es/ecma262/#sec-advancestringindex
		advanceStringIndex = function (S, index, unicode) {
		  return index + (unicode ? charAt(S, index).length : 1);
		};
		return advanceStringIndex;
	}

	var getSubstitution;
	var hasRequiredGetSubstitution;

	function requireGetSubstitution () {
		if (hasRequiredGetSubstitution) return getSubstitution;
		hasRequiredGetSubstitution = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var toObject = requireToObject();

		var floor = Math.floor;
		var charAt = uncurryThis(''.charAt);
		var replace = uncurryThis(''.replace);
		var stringSlice = uncurryThis(''.slice);
		// eslint-disable-next-line redos/no-vulnerable -- safe
		var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
		var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

		// `GetSubstitution` abstract operation
		// https://tc39.es/ecma262/#sec-getsubstitution
		getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
		  var tailPos = position + matched.length;
		  var m = captures.length;
		  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
		  if (namedCaptures !== undefined) {
		    namedCaptures = toObject(namedCaptures);
		    symbols = SUBSTITUTION_SYMBOLS;
		  }
		  return replace(replacement, symbols, function (match, ch) {
		    var capture;
		    switch (charAt(ch, 0)) {
		      case '$': return '$';
		      case '&': return matched;
		      case '`': return stringSlice(str, 0, position);
		      case "'": return stringSlice(str, tailPos);
		      case '<':
		        capture = namedCaptures[stringSlice(ch, 1, -1)];
		        break;
		      default: // \d\d?
		        var n = +ch;
		        if (n === 0) return match;
		        if (n > m) {
		          var f = floor(n / 10);
		          if (f === 0) return match;
		          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
		          return match;
		        }
		        capture = captures[n - 1];
		    }
		    return capture === undefined ? '' : capture;
		  });
		};
		return getSubstitution;
	}

	var regexpFlagsDetection;
	var hasRequiredRegexpFlagsDetection;

	function requireRegexpFlagsDetection () {
		if (hasRequiredRegexpFlagsDetection) return regexpFlagsDetection;
		hasRequiredRegexpFlagsDetection = 1;
		var globalThis = requireGlobalThis();
		var fails = requireFails();

		// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
		var RegExp = globalThis.RegExp;

		var FLAGS_GETTER_IS_CORRECT = !fails(function () {
		  var INDICES_SUPPORT = true;
		  try {
		    RegExp('.', 'd');
		  } catch (error) {
		    INDICES_SUPPORT = false;
		  }

		  var O = {};
		  // modern V8 bug
		  var calls = '';
		  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

		  var addGetter = function (key, chr) {
		    // eslint-disable-next-line es/no-object-defineproperty -- safe
		    Object.defineProperty(O, key, { get: function () {
		      calls += chr;
		      return true;
		    } });
		  };

		  var pairs = {
		    dotAll: 's',
		    global: 'g',
		    ignoreCase: 'i',
		    multiline: 'm',
		    sticky: 'y'
		  };

		  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

		  for (var key in pairs) addGetter(key, pairs[key]);

		  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		  var result = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(O);

		  return result !== expected || calls !== expected;
		});

		regexpFlagsDetection = { correct: FLAGS_GETTER_IS_CORRECT };
		return regexpFlagsDetection;
	}

	var regexpGetFlags;
	var hasRequiredRegexpGetFlags;

	function requireRegexpGetFlags () {
		if (hasRequiredRegexpGetFlags) return regexpGetFlags;
		hasRequiredRegexpGetFlags = 1;
		var call = requireFunctionCall();
		var hasOwn = requireHasOwnProperty();
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var regExpFlagsDetection = requireRegexpFlagsDetection();
		var regExpFlagsGetterImplementation = requireRegexpFlags();

		var RegExpPrototype = RegExp.prototype;

		regexpGetFlags = regExpFlagsDetection.correct ? function (it) {
		  return it.flags;
		} : function (it) {
		  return (!regExpFlagsDetection.correct && isPrototypeOf(RegExpPrototype, it) && !hasOwn(it, 'flags'))
		    ? call(regExpFlagsGetterImplementation, it)
		    : it.flags;
		};
		return regexpGetFlags;
	}

	var regexpExecAbstract;
	var hasRequiredRegexpExecAbstract;

	function requireRegexpExecAbstract () {
		if (hasRequiredRegexpExecAbstract) return regexpExecAbstract;
		hasRequiredRegexpExecAbstract = 1;
		var call = requireFunctionCall();
		var anObject = requireAnObject();
		var isCallable = requireIsCallable();
		var classof = requireClassofRaw();
		var regexpExec = requireRegexpExec();

		var $TypeError = TypeError;

		// `RegExpExec` abstract operation
		// https://tc39.es/ecma262/#sec-regexpexec
		regexpExecAbstract = function (R, S) {
		  var exec = R.exec;
		  if (isCallable(exec)) {
		    var result = call(exec, R, S);
		    if (result !== null) anObject(result);
		    return result;
		  }
		  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
		  throw new $TypeError('RegExp#exec called on incompatible receiver');
		};
		return regexpExecAbstract;
	}

	var hasRequiredEs_string_replace;

	function requireEs_string_replace () {
		if (hasRequiredEs_string_replace) return es_string_replace;
		hasRequiredEs_string_replace = 1;
		var apply = requireFunctionApply();
		var call = requireFunctionCall();
		var uncurryThis = requireFunctionUncurryThis();
		var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
		var fails = requireFails();
		var anObject = requireAnObject();
		var isCallable = requireIsCallable();
		var isObject = requireIsObject();
		var toIntegerOrInfinity = requireToIntegerOrInfinity();
		var toLength = requireToLength();
		var toString = requireToString();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var advanceStringIndex = requireAdvanceStringIndex();
		var getMethod = requireGetMethod();
		var getSubstitution = requireGetSubstitution();
		var getRegExpFlags = requireRegexpGetFlags();
		var regExpExec = requireRegexpExecAbstract();
		var wellKnownSymbol = requireWellKnownSymbol();

		var REPLACE = wellKnownSymbol('replace');
		var max = Math.max;
		var min = Math.min;
		var concat = uncurryThis([].concat);
		var push = uncurryThis([].push);
		var stringIndexOf = uncurryThis(''.indexOf);
		var stringSlice = uncurryThis(''.slice);

		var maybeToString = function (it) {
		  return it === undefined ? it : String(it);
		};

		// IE <= 11 replaces $0 with the whole match, as if it was $&
		// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
		var REPLACE_KEEPS_$0 = (function () {
		  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
		  return 'a'.replace(/./, '$0') === '$0';
		})();

		// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
		var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
		  if (/./[REPLACE]) {
		    return /./[REPLACE]('a', '$0') === '';
		  }
		  return false;
		})();

		var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
		  var re = /./;
		  re.exec = function () {
		    var result = [];
		    result.groups = { a: '7' };
		    return result;
		  };
		  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
		  return ''.replace(re, '$<a>') !== '7';
		});

		// @@replace logic
		fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
		  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

		  return [
		    // `String.prototype.replace` method
		    // https://tc39.es/ecma262/#sec-string.prototype.replace
		    function replace(searchValue, replaceValue) {
		      var O = requireObjectCoercible(this);
		      var replacer = isObject(searchValue) ? getMethod(searchValue, REPLACE) : undefined;
		      return replacer
		        ? call(replacer, searchValue, O, replaceValue)
		        : call(nativeReplace, toString(O), searchValue, replaceValue);
		    },
		    // `RegExp.prototype[@@replace]` method
		    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
		    function (string, replaceValue) {
		      var rx = anObject(this);
		      var S = toString(string);

		      if (
		        typeof replaceValue == 'string' &&
		        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
		        stringIndexOf(replaceValue, '$<') === -1
		      ) {
		        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
		        if (res.done) return res.value;
		      }

		      var functionalReplace = isCallable(replaceValue);
		      if (!functionalReplace) replaceValue = toString(replaceValue);

		      var flags = toString(getRegExpFlags(rx));
		      var global = stringIndexOf(flags, 'g') !== -1;
		      var fullUnicode;
		      if (global) {
		        fullUnicode = stringIndexOf(flags, 'u') !== -1;
		        rx.lastIndex = 0;
		      }

		      var results = [];
		      var result;
		      while (true) {
		        result = regExpExec(rx, S);
		        if (result === null) break;

		        push(results, result);
		        if (!global) break;

		        var matchStr = toString(result[0]);
		        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
		      }

		      var accumulatedResult = '';
		      var nextSourcePosition = 0;
		      for (var i = 0; i < results.length; i++) {
		        result = results[i];

		        var matched = toString(result[0]);
		        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
		        var captures = [];
		        var replacement;
		        // NOTE: This is equivalent to
		        //   captures = result.slice(1).map(maybeToString)
		        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
		        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
		        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
		        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
		        var namedCaptures = result.groups;
		        if (functionalReplace) {
		          var replacerArgs = concat([matched], captures, position, S);
		          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
		          replacement = toString(apply(replaceValue, undefined, replacerArgs));
		        } else {
		          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
		        }
		        if (position >= nextSourcePosition) {
		          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
		          nextSourcePosition = position + matched.length;
		        }
		      }

		      return accumulatedResult + stringSlice(S, nextSourcePosition);
		    }
		  ];
		}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
		return es_string_replace;
	}

	requireEs_string_replace();

	var es_string_startsWith = {};

	var functionUncurryThisClause;
	var hasRequiredFunctionUncurryThisClause;

	function requireFunctionUncurryThisClause () {
		if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
		hasRequiredFunctionUncurryThisClause = 1;
		var classofRaw = requireClassofRaw();
		var uncurryThis = requireFunctionUncurryThis();

		functionUncurryThisClause = function (fn) {
		  // Nashorn bug:
		  //   https://github.com/zloirock/core-js/issues/1128
		  //   https://github.com/zloirock/core-js/issues/1130
		  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
		};
		return functionUncurryThisClause;
	}

	var isRegexp;
	var hasRequiredIsRegexp;

	function requireIsRegexp () {
		if (hasRequiredIsRegexp) return isRegexp;
		hasRequiredIsRegexp = 1;
		var isObject = requireIsObject();
		var classof = requireClassofRaw();
		var wellKnownSymbol = requireWellKnownSymbol();

		var MATCH = wellKnownSymbol('match');

		// `IsRegExp` abstract operation
		// https://tc39.es/ecma262/#sec-isregexp
		isRegexp = function (it) {
		  var isRegExp;
		  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
		};
		return isRegexp;
	}

	var notARegexp;
	var hasRequiredNotARegexp;

	function requireNotARegexp () {
		if (hasRequiredNotARegexp) return notARegexp;
		hasRequiredNotARegexp = 1;
		var isRegExp = requireIsRegexp();

		var $TypeError = TypeError;

		notARegexp = function (it) {
		  if (isRegExp(it)) {
		    throw new $TypeError("The method doesn't accept regular expressions");
		  } return it;
		};
		return notARegexp;
	}

	var correctIsRegexpLogic;
	var hasRequiredCorrectIsRegexpLogic;

	function requireCorrectIsRegexpLogic () {
		if (hasRequiredCorrectIsRegexpLogic) return correctIsRegexpLogic;
		hasRequiredCorrectIsRegexpLogic = 1;
		var wellKnownSymbol = requireWellKnownSymbol();

		var MATCH = wellKnownSymbol('match');

		correctIsRegexpLogic = function (METHOD_NAME) {
		  var regexp = /./;
		  try {
		    '/./'[METHOD_NAME](regexp);
		  } catch (error1) {
		    try {
		      regexp[MATCH] = false;
		      return '/./'[METHOD_NAME](regexp);
		    } catch (error2) { /* empty */ }
		  } return false;
		};
		return correctIsRegexpLogic;
	}

	var hasRequiredEs_string_startsWith;

	function requireEs_string_startsWith () {
		if (hasRequiredEs_string_startsWith) return es_string_startsWith;
		hasRequiredEs_string_startsWith = 1;
		var $ = require_export();
		var uncurryThis = requireFunctionUncurryThisClause();
		var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
		var toLength = requireToLength();
		var toString = requireToString();
		var notARegExp = requireNotARegexp();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var correctIsRegExpLogic = requireCorrectIsRegexpLogic();
		var IS_PURE = requireIsPure();

		var stringSlice = uncurryThis(''.slice);
		var min = Math.min;

		var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
		// https://github.com/zloirock/core-js/pull/702
		var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
		  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
		  return descriptor && !descriptor.writable;
		}();

		// `String.prototype.startsWith` method
		// https://tc39.es/ecma262/#sec-string.prototype.startswith
		$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
		  startsWith: function startsWith(searchString /* , position = 0 */) {
		    var that = toString(requireObjectCoercible(this));
		    notARegExp(searchString);
		    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
		    var search = toString(searchString);
		    return stringSlice(that, index, index + search.length) === search;
		  }
		});
		return es_string_startsWith;
	}

	requireEs_string_startsWith();

	function _defineProperty(e, r, t) {
	  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
	    value: t,
	    enumerable: true,
	    configurable: true,
	    writable: true
	  }) : e[r] = t, e;
	}
	function ownKeys(e, r) {
	  var t = Object.keys(e);
	  if (Object.getOwnPropertySymbols) {
	    var o = Object.getOwnPropertySymbols(e);
	    r && (o = o.filter(function (r) {
	      return Object.getOwnPropertyDescriptor(e, r).enumerable;
	    })), t.push.apply(t, o);
	  }
	  return t;
	}
	function _objectSpread2(e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var t = null != arguments[r] ? arguments[r] : {};
	    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
	      _defineProperty(e, r, t[r]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
	      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
	    });
	  }
	  return e;
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r);
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return ("string" === r ? String : Number)(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : i + "";
	}

	var es_array_includes = {};

	var addToUnscopables;
	var hasRequiredAddToUnscopables;

	function requireAddToUnscopables () {
		if (hasRequiredAddToUnscopables) return addToUnscopables;
		hasRequiredAddToUnscopables = 1;
		var wellKnownSymbol = requireWellKnownSymbol();
		var create = requireObjectCreate();
		var defineProperty = requireObjectDefineProperty().f;

		var UNSCOPABLES = wellKnownSymbol('unscopables');
		var ArrayPrototype = Array.prototype;

		// Array.prototype[@@unscopables]
		// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
		if (ArrayPrototype[UNSCOPABLES] === undefined) {
		  defineProperty(ArrayPrototype, UNSCOPABLES, {
		    configurable: true,
		    value: create(null)
		  });
		}

		// add a key to Array.prototype[@@unscopables]
		addToUnscopables = function (key) {
		  ArrayPrototype[UNSCOPABLES][key] = true;
		};
		return addToUnscopables;
	}

	var hasRequiredEs_array_includes;

	function requireEs_array_includes () {
		if (hasRequiredEs_array_includes) return es_array_includes;
		hasRequiredEs_array_includes = 1;
		var $ = require_export();
		var $includes = requireArrayIncludes().includes;
		var fails = requireFails();
		var addToUnscopables = requireAddToUnscopables();

		// FF99+ bug
		var BROKEN_ON_SPARSE = fails(function () {
		  // eslint-disable-next-line es/no-array-prototype-includes -- detection
		  return !Array(1).includes();
		});

		// `Array.prototype.includes` method
		// https://tc39.es/ecma262/#sec-array.prototype.includes
		$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
		  includes: function includes(el /* , fromIndex = 0 */) {
		    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
		  }
		});

		// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
		addToUnscopables('includes');
		return es_array_includes;
	}

	requireEs_array_includes();

	var es_array_push = {};

	var isArray;
	var hasRequiredIsArray;

	function requireIsArray () {
		if (hasRequiredIsArray) return isArray;
		hasRequiredIsArray = 1;
		var classof = requireClassofRaw();

		// `IsArray` abstract operation
		// https://tc39.es/ecma262/#sec-isarray
		// eslint-disable-next-line es/no-array-isarray -- safe
		isArray = Array.isArray || function isArray(argument) {
		  return classof(argument) === 'Array';
		};
		return isArray;
	}

	var arraySetLength;
	var hasRequiredArraySetLength;

	function requireArraySetLength () {
		if (hasRequiredArraySetLength) return arraySetLength;
		hasRequiredArraySetLength = 1;
		var DESCRIPTORS = requireDescriptors();
		var isArray = requireIsArray();

		var $TypeError = TypeError;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

		// Safari < 13 does not throw an error in this case
		var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
		  // makes no sense without proper strict mode support
		  if (this !== undefined) return true;
		  try {
		    // eslint-disable-next-line es/no-object-defineproperty -- safe
		    Object.defineProperty([], 'length', { writable: false }).length = 1;
		  } catch (error) {
		    return error instanceof TypeError;
		  }
		}();

		arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
		  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
		    throw new $TypeError('Cannot set read only .length');
		  } return O.length = length;
		} : function (O, length) {
		  return O.length = length;
		};
		return arraySetLength;
	}

	var doesNotExceedSafeInteger;
	var hasRequiredDoesNotExceedSafeInteger;

	function requireDoesNotExceedSafeInteger () {
		if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
		hasRequiredDoesNotExceedSafeInteger = 1;
		var $TypeError = TypeError;
		var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

		doesNotExceedSafeInteger = function (it) {
		  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
		  return it;
		};
		return doesNotExceedSafeInteger;
	}

	var hasRequiredEs_array_push;

	function requireEs_array_push () {
		if (hasRequiredEs_array_push) return es_array_push;
		hasRequiredEs_array_push = 1;
		var $ = require_export();
		var toObject = requireToObject();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var setArrayLength = requireArraySetLength();
		var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
		var fails = requireFails();

		var INCORRECT_TO_LENGTH = fails(function () {
		  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
		});

		// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
		// https://bugs.chromium.org/p/v8/issues/detail?id=12681
		var properErrorOnNonWritableLength = function () {
		  try {
		    // eslint-disable-next-line es/no-object-defineproperty -- safe
		    Object.defineProperty([], 'length', { writable: false }).push();
		  } catch (error) {
		    return error instanceof TypeError;
		  }
		};

		var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

		// `Array.prototype.push` method
		// https://tc39.es/ecma262/#sec-array.prototype.push
		$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
		  // eslint-disable-next-line no-unused-vars -- required for `.length`
		  push: function push(item) {
		    var O = toObject(this);
		    var len = lengthOfArrayLike(O);
		    var argCount = arguments.length;
		    doesNotExceedSafeInteger(len + argCount);
		    for (var i = 0; i < argCount; i++) {
		      O[len] = arguments[i];
		      len++;
		    }
		    setArrayLength(O, len);
		    return len;
		  }
		});
		return es_array_push;
	}

	requireEs_array_push();

	var es_regexp_toString = {};

	var hasRequiredEs_regexp_toString;

	function requireEs_regexp_toString () {
		if (hasRequiredEs_regexp_toString) return es_regexp_toString;
		hasRequiredEs_regexp_toString = 1;
		var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
		var defineBuiltIn = requireDefineBuiltIn();
		var anObject = requireAnObject();
		var $toString = requireToString();
		var fails = requireFails();
		var getRegExpFlags = requireRegexpGetFlags();

		var TO_STRING = 'toString';
		var RegExpPrototype = RegExp.prototype;
		var nativeToString = RegExpPrototype[TO_STRING];

		var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
		// FF44- RegExp#toString has a wrong name
		var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;

		// `RegExp.prototype.toString` method
		// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
		if (NOT_GENERIC || INCORRECT_NAME) {
		  defineBuiltIn(RegExpPrototype, TO_STRING, function toString() {
		    var R = anObject(this);
		    var pattern = $toString(R.source);
		    var flags = $toString(getRegExpFlags(R));
		    return '/' + pattern + '/' + flags;
		  }, { unsafe: true });
		}
		return es_regexp_toString;
	}

	requireEs_regexp_toString();

	var es_string_includes = {};

	var hasRequiredEs_string_includes;

	function requireEs_string_includes () {
		if (hasRequiredEs_string_includes) return es_string_includes;
		hasRequiredEs_string_includes = 1;
		var $ = require_export();
		var uncurryThis = requireFunctionUncurryThis();
		var notARegExp = requireNotARegexp();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var toString = requireToString();
		var correctIsRegExpLogic = requireCorrectIsRegexpLogic();

		var stringIndexOf = uncurryThis(''.indexOf);

		// `String.prototype.includes` method
		// https://tc39.es/ecma262/#sec-string.prototype.includes
		$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
		  includes: function includes(searchString /* , position = 0 */) {
		    return !!~stringIndexOf(
		      toString(requireObjectCoercible(this)),
		      toString(notARegExp(searchString)),
		      arguments.length > 1 ? arguments[1] : undefined
		    );
		  }
		});
		return es_string_includes;
	}

	requireEs_string_includes();

	var es_string_match = {};

	var hasRequiredEs_string_match;

	function requireEs_string_match () {
		if (hasRequiredEs_string_match) return es_string_match;
		hasRequiredEs_string_match = 1;
		var call = requireFunctionCall();
		var uncurryThis = requireFunctionUncurryThis();
		var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
		var anObject = requireAnObject();
		var isObject = requireIsObject();
		var toLength = requireToLength();
		var toString = requireToString();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var getMethod = requireGetMethod();
		var advanceStringIndex = requireAdvanceStringIndex();
		var getRegExpFlags = requireRegexpGetFlags();
		var regExpExec = requireRegexpExecAbstract();

		var stringIndexOf = uncurryThis(''.indexOf);

		// @@match logic
		fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
		  return [
		    // `String.prototype.match` method
		    // https://tc39.es/ecma262/#sec-string.prototype.match
		    function match(regexp) {
		      var O = requireObjectCoercible(this);
		      var matcher = isObject(regexp) ? getMethod(regexp, MATCH) : undefined;
		      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
		    },
		    // `RegExp.prototype[@@match]` method
		    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
		    function (string) {
		      var rx = anObject(this);
		      var S = toString(string);
		      var res = maybeCallNative(nativeMatch, rx, S);

		      if (res.done) return res.value;

		      var flags = toString(getRegExpFlags(rx));

		      if (stringIndexOf(flags, 'g') === -1) return regExpExec(rx, S);

		      var fullUnicode = stringIndexOf(flags, 'u') !== -1;
		      rx.lastIndex = 0;
		      var A = [];
		      var n = 0;
		      var result;
		      while ((result = regExpExec(rx, S)) !== null) {
		        var matchStr = toString(result[0]);
		        A[n] = matchStr;
		        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
		        n++;
		      }
		      return n === 0 ? null : A;
		    }
		  ];
		});
		return es_string_match;
	}

	requireEs_string_match();

	var esnext_iterator_constructor = {};

	var es_iterator_constructor = {};

	var anInstance;
	var hasRequiredAnInstance;

	function requireAnInstance () {
		if (hasRequiredAnInstance) return anInstance;
		hasRequiredAnInstance = 1;
		var isPrototypeOf = requireObjectIsPrototypeOf();

		var $TypeError = TypeError;

		anInstance = function (it, Prototype) {
		  if (isPrototypeOf(Prototype, it)) return it;
		  throw new $TypeError('Incorrect invocation');
		};
		return anInstance;
	}

	var correctPrototypeGetter;
	var hasRequiredCorrectPrototypeGetter;

	function requireCorrectPrototypeGetter () {
		if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
		hasRequiredCorrectPrototypeGetter = 1;
		var fails = requireFails();

		correctPrototypeGetter = !fails(function () {
		  function F() { /* empty */ }
		  F.prototype.constructor = null;
		  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
		  return Object.getPrototypeOf(new F()) !== F.prototype;
		});
		return correctPrototypeGetter;
	}

	var objectGetPrototypeOf;
	var hasRequiredObjectGetPrototypeOf;

	function requireObjectGetPrototypeOf () {
		if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
		hasRequiredObjectGetPrototypeOf = 1;
		var hasOwn = requireHasOwnProperty();
		var isCallable = requireIsCallable();
		var toObject = requireToObject();
		var sharedKey = requireSharedKey();
		var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();

		var IE_PROTO = sharedKey('IE_PROTO');
		var $Object = Object;
		var ObjectPrototype = $Object.prototype;

		// `Object.getPrototypeOf` method
		// https://tc39.es/ecma262/#sec-object.getprototypeof
		// eslint-disable-next-line es/no-object-getprototypeof -- safe
		objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
		  var object = toObject(O);
		  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
		  var constructor = object.constructor;
		  if (isCallable(constructor) && object instanceof constructor) {
		    return constructor.prototype;
		  } return object instanceof $Object ? ObjectPrototype : null;
		};
		return objectGetPrototypeOf;
	}

	var defineBuiltInAccessor;
	var hasRequiredDefineBuiltInAccessor;

	function requireDefineBuiltInAccessor () {
		if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
		hasRequiredDefineBuiltInAccessor = 1;
		var makeBuiltIn = requireMakeBuiltIn();
		var defineProperty = requireObjectDefineProperty();

		defineBuiltInAccessor = function (target, name, descriptor) {
		  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
		  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
		  return defineProperty.f(target, name, descriptor);
		};
		return defineBuiltInAccessor;
	}

	var createProperty;
	var hasRequiredCreateProperty;

	function requireCreateProperty () {
		if (hasRequiredCreateProperty) return createProperty;
		hasRequiredCreateProperty = 1;
		var DESCRIPTORS = requireDescriptors();
		var definePropertyModule = requireObjectDefineProperty();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();

		createProperty = function (object, key, value) {
		  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
		  else object[key] = value;
		};
		return createProperty;
	}

	var iteratorsCore;
	var hasRequiredIteratorsCore;

	function requireIteratorsCore () {
		if (hasRequiredIteratorsCore) return iteratorsCore;
		hasRequiredIteratorsCore = 1;
		var fails = requireFails();
		var isCallable = requireIsCallable();
		var isObject = requireIsObject();
		var create = requireObjectCreate();
		var getPrototypeOf = requireObjectGetPrototypeOf();
		var defineBuiltIn = requireDefineBuiltIn();
		var wellKnownSymbol = requireWellKnownSymbol();
		var IS_PURE = requireIsPure();

		var ITERATOR = wellKnownSymbol('iterator');
		var BUGGY_SAFARI_ITERATORS = false;

		// `%IteratorPrototype%` object
		// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
		var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

		/* eslint-disable es/no-array-prototype-keys -- safe */
		if ([].keys) {
		  arrayIterator = [].keys();
		  // Safari 8 has buggy iterators w/o `next`
		  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
		  else {
		    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
		    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
		  }
		}

		var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
		  var test = {};
		  // FF44- legacy iterators case
		  return IteratorPrototype[ITERATOR].call(test) !== test;
		});

		if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
		else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

		// `%IteratorPrototype%[@@iterator]()` method
		// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
		if (!isCallable(IteratorPrototype[ITERATOR])) {
		  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
		    return this;
		  });
		}

		iteratorsCore = {
		  IteratorPrototype: IteratorPrototype,
		  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
		};
		return iteratorsCore;
	}

	var hasRequiredEs_iterator_constructor;

	function requireEs_iterator_constructor () {
		if (hasRequiredEs_iterator_constructor) return es_iterator_constructor;
		hasRequiredEs_iterator_constructor = 1;
		var $ = require_export();
		var globalThis = requireGlobalThis();
		var anInstance = requireAnInstance();
		var anObject = requireAnObject();
		var isCallable = requireIsCallable();
		var getPrototypeOf = requireObjectGetPrototypeOf();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var createProperty = requireCreateProperty();
		var fails = requireFails();
		var hasOwn = requireHasOwnProperty();
		var wellKnownSymbol = requireWellKnownSymbol();
		var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
		var DESCRIPTORS = requireDescriptors();
		var IS_PURE = requireIsPure();

		var CONSTRUCTOR = 'constructor';
		var ITERATOR = 'Iterator';
		var TO_STRING_TAG = wellKnownSymbol('toStringTag');

		var $TypeError = TypeError;
		var NativeIterator = globalThis[ITERATOR];

		// FF56- have non-standard global helper `Iterator`
		var FORCED = IS_PURE
		  || !isCallable(NativeIterator)
		  || NativeIterator.prototype !== IteratorPrototype
		  // FF44- non-standard `Iterator` passes previous tests
		  || !fails(function () { NativeIterator({}); });

		var IteratorConstructor = function Iterator() {
		  anInstance(this, IteratorPrototype);
		  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
		};

		var defineIteratorPrototypeAccessor = function (key, value) {
		  if (DESCRIPTORS) {
		    defineBuiltInAccessor(IteratorPrototype, key, {
		      configurable: true,
		      get: function () {
		        return value;
		      },
		      set: function (replacement) {
		        anObject(this);
		        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
		        if (hasOwn(this, key)) this[key] = replacement;
		        else createProperty(this, key, replacement);
		      }
		    });
		  } else IteratorPrototype[key] = value;
		};

		if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

		if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
		  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
		}

		IteratorConstructor.prototype = IteratorPrototype;

		// `Iterator` constructor
		// https://tc39.es/ecma262/#sec-iterator
		$({ global: true, constructor: true, forced: FORCED }, {
		  Iterator: IteratorConstructor
		});
		return es_iterator_constructor;
	}

	var hasRequiredEsnext_iterator_constructor;

	function requireEsnext_iterator_constructor () {
		if (hasRequiredEsnext_iterator_constructor) return esnext_iterator_constructor;
		hasRequiredEsnext_iterator_constructor = 1;
		// TODO: Remove from `core-js@4`
		requireEs_iterator_constructor();
		return esnext_iterator_constructor;
	}

	requireEsnext_iterator_constructor();

	var esnext_iterator_find = {};

	var es_iterator_find = {};

	var functionBindContext;
	var hasRequiredFunctionBindContext;

	function requireFunctionBindContext () {
		if (hasRequiredFunctionBindContext) return functionBindContext;
		hasRequiredFunctionBindContext = 1;
		var uncurryThis = requireFunctionUncurryThisClause();
		var aCallable = requireACallable();
		var NATIVE_BIND = requireFunctionBindNative();

		var bind = uncurryThis(uncurryThis.bind);

		// optional / simple context binding
		functionBindContext = function (fn, that) {
		  aCallable(fn);
		  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
		    return fn.apply(that, arguments);
		  };
		};
		return functionBindContext;
	}

	var iterators;
	var hasRequiredIterators;

	function requireIterators () {
		if (hasRequiredIterators) return iterators;
		hasRequiredIterators = 1;
		iterators = {};
		return iterators;
	}

	var isArrayIteratorMethod;
	var hasRequiredIsArrayIteratorMethod;

	function requireIsArrayIteratorMethod () {
		if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
		hasRequiredIsArrayIteratorMethod = 1;
		var wellKnownSymbol = requireWellKnownSymbol();
		var Iterators = requireIterators();

		var ITERATOR = wellKnownSymbol('iterator');
		var ArrayPrototype = Array.prototype;

		// check on default Array iterator
		isArrayIteratorMethod = function (it) {
		  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
		};
		return isArrayIteratorMethod;
	}

	var getIteratorMethod;
	var hasRequiredGetIteratorMethod;

	function requireGetIteratorMethod () {
		if (hasRequiredGetIteratorMethod) return getIteratorMethod;
		hasRequiredGetIteratorMethod = 1;
		var classof = requireClassof();
		var getMethod = requireGetMethod();
		var isNullOrUndefined = requireIsNullOrUndefined();
		var Iterators = requireIterators();
		var wellKnownSymbol = requireWellKnownSymbol();

		var ITERATOR = wellKnownSymbol('iterator');

		getIteratorMethod = function (it) {
		  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
		    || getMethod(it, '@@iterator')
		    || Iterators[classof(it)];
		};
		return getIteratorMethod;
	}

	var getIterator;
	var hasRequiredGetIterator;

	function requireGetIterator () {
		if (hasRequiredGetIterator) return getIterator;
		hasRequiredGetIterator = 1;
		var call = requireFunctionCall();
		var aCallable = requireACallable();
		var anObject = requireAnObject();
		var tryToString = requireTryToString();
		var getIteratorMethod = requireGetIteratorMethod();

		var $TypeError = TypeError;

		getIterator = function (argument, usingIterator) {
		  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
		  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
		  throw new $TypeError(tryToString(argument) + ' is not iterable');
		};
		return getIterator;
	}

	var iteratorClose;
	var hasRequiredIteratorClose;

	function requireIteratorClose () {
		if (hasRequiredIteratorClose) return iteratorClose;
		hasRequiredIteratorClose = 1;
		var call = requireFunctionCall();
		var anObject = requireAnObject();
		var getMethod = requireGetMethod();

		iteratorClose = function (iterator, kind, value) {
		  var innerResult, innerError;
		  anObject(iterator);
		  try {
		    innerResult = getMethod(iterator, 'return');
		    if (!innerResult) {
		      if (kind === 'throw') throw value;
		      return value;
		    }
		    innerResult = call(innerResult, iterator);
		  } catch (error) {
		    innerError = true;
		    innerResult = error;
		  }
		  if (kind === 'throw') throw value;
		  if (innerError) throw innerResult;
		  anObject(innerResult);
		  return value;
		};
		return iteratorClose;
	}

	var iterate;
	var hasRequiredIterate;

	function requireIterate () {
		if (hasRequiredIterate) return iterate;
		hasRequiredIterate = 1;
		var bind = requireFunctionBindContext();
		var call = requireFunctionCall();
		var anObject = requireAnObject();
		var tryToString = requireTryToString();
		var isArrayIteratorMethod = requireIsArrayIteratorMethod();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var getIterator = requireGetIterator();
		var getIteratorMethod = requireGetIteratorMethod();
		var iteratorClose = requireIteratorClose();

		var $TypeError = TypeError;

		var Result = function (stopped, result) {
		  this.stopped = stopped;
		  this.result = result;
		};

		var ResultPrototype = Result.prototype;

		iterate = function (iterable, unboundFunction, options) {
		  var that = options && options.that;
		  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
		  var IS_RECORD = !!(options && options.IS_RECORD);
		  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
		  var INTERRUPTED = !!(options && options.INTERRUPTED);
		  var fn = bind(unboundFunction, that);
		  var iterator, iterFn, index, length, result, next, step;

		  var stop = function (condition) {
		    if (iterator) iteratorClose(iterator, 'normal');
		    return new Result(true, condition);
		  };

		  var callFn = function (value) {
		    if (AS_ENTRIES) {
		      anObject(value);
		      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
		    } return INTERRUPTED ? fn(value, stop) : fn(value);
		  };

		  if (IS_RECORD) {
		    iterator = iterable.iterator;
		  } else if (IS_ITERATOR) {
		    iterator = iterable;
		  } else {
		    iterFn = getIteratorMethod(iterable);
		    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
		    // optimisation for array iterators
		    if (isArrayIteratorMethod(iterFn)) {
		      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
		        result = callFn(iterable[index]);
		        if (result && isPrototypeOf(ResultPrototype, result)) return result;
		      } return new Result(false);
		    }
		    iterator = getIterator(iterable, iterFn);
		  }

		  next = IS_RECORD ? iterable.next : iterator.next;
		  while (!(step = call(next, iterator)).done) {
		    try {
		      result = callFn(step.value);
		    } catch (error) {
		      iteratorClose(iterator, 'throw', error);
		    }
		    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
		  } return new Result(false);
		};
		return iterate;
	}

	var getIteratorDirect;
	var hasRequiredGetIteratorDirect;

	function requireGetIteratorDirect () {
		if (hasRequiredGetIteratorDirect) return getIteratorDirect;
		hasRequiredGetIteratorDirect = 1;
		// `GetIteratorDirect(obj)` abstract operation
		// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
		getIteratorDirect = function (obj) {
		  return {
		    iterator: obj,
		    next: obj.next,
		    done: false
		  };
		};
		return getIteratorDirect;
	}

	var iteratorHelperWithoutClosingOnEarlyError;
	var hasRequiredIteratorHelperWithoutClosingOnEarlyError;

	function requireIteratorHelperWithoutClosingOnEarlyError () {
		if (hasRequiredIteratorHelperWithoutClosingOnEarlyError) return iteratorHelperWithoutClosingOnEarlyError;
		hasRequiredIteratorHelperWithoutClosingOnEarlyError = 1;
		var globalThis = requireGlobalThis();

		// https://github.com/tc39/ecma262/pull/3467
		iteratorHelperWithoutClosingOnEarlyError = function (METHOD_NAME, ExpectedError) {
		  var Iterator = globalThis.Iterator;
		  var IteratorPrototype = Iterator && Iterator.prototype;
		  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];

		  var CLOSED = false;

		  if (method) try {
		    method.call({
		      next: function () { return { done: true }; },
		      'return': function () { CLOSED = true; }
		    }, -1);
		  } catch (error) {
		    // https://bugs.webkit.org/show_bug.cgi?id=291195
		    if (!(error instanceof ExpectedError)) CLOSED = false;
		  }

		  if (!CLOSED) return method;
		};
		return iteratorHelperWithoutClosingOnEarlyError;
	}

	var hasRequiredEs_iterator_find;

	function requireEs_iterator_find () {
		if (hasRequiredEs_iterator_find) return es_iterator_find;
		hasRequiredEs_iterator_find = 1;
		var $ = require_export();
		var call = requireFunctionCall();
		var iterate = requireIterate();
		var aCallable = requireACallable();
		var anObject = requireAnObject();
		var getIteratorDirect = requireGetIteratorDirect();
		var iteratorClose = requireIteratorClose();
		var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();

		var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('find', TypeError);

		// `Iterator.prototype.find` method
		// https://tc39.es/ecma262/#sec-iterator.prototype.find
		$({ target: 'Iterator', proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
		  find: function find(predicate) {
		    anObject(this);
		    try {
		      aCallable(predicate);
		    } catch (error) {
		      iteratorClose(this, 'throw', error);
		    }

		    if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);

		    var record = getIteratorDirect(this);
		    var counter = 0;
		    return iterate(record, function (value, stop) {
		      if (predicate(value, counter++)) return stop(value);
		    }, { IS_RECORD: true, INTERRUPTED: true }).result;
		  }
		});
		return es_iterator_find;
	}

	var hasRequiredEsnext_iterator_find;

	function requireEsnext_iterator_find () {
		if (hasRequiredEsnext_iterator_find) return esnext_iterator_find;
		hasRequiredEsnext_iterator_find = 1;
		// TODO: Remove from `core-js@4`
		requireEs_iterator_find();
		return esnext_iterator_find;
	}

	requireEsnext_iterator_find();

	var esnext_iterator_forEach = {};

	var es_iterator_forEach = {};

	var hasRequiredEs_iterator_forEach;

	function requireEs_iterator_forEach () {
		if (hasRequiredEs_iterator_forEach) return es_iterator_forEach;
		hasRequiredEs_iterator_forEach = 1;
		var $ = require_export();
		var call = requireFunctionCall();
		var iterate = requireIterate();
		var aCallable = requireACallable();
		var anObject = requireAnObject();
		var getIteratorDirect = requireGetIteratorDirect();
		var iteratorClose = requireIteratorClose();
		var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();

		var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('forEach', TypeError);

		// `Iterator.prototype.forEach` method
		// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
		$({ target: 'Iterator', proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
		  forEach: function forEach(fn) {
		    anObject(this);
		    try {
		      aCallable(fn);
		    } catch (error) {
		      iteratorClose(this, 'throw', error);
		    }

		    if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);

		    var record = getIteratorDirect(this);
		    var counter = 0;
		    iterate(record, function (value) {
		      fn(value, counter++);
		    }, { IS_RECORD: true });
		  }
		});
		return es_iterator_forEach;
	}

	var hasRequiredEsnext_iterator_forEach;

	function requireEsnext_iterator_forEach () {
		if (hasRequiredEsnext_iterator_forEach) return esnext_iterator_forEach;
		hasRequiredEsnext_iterator_forEach = 1;
		// TODO: Remove from `core-js@4`
		requireEs_iterator_forEach();
		return esnext_iterator_forEach;
	}

	requireEsnext_iterator_forEach();

	var web_domCollections_iterator = {};

	var domIterables;
	var hasRequiredDomIterables;

	function requireDomIterables () {
		if (hasRequiredDomIterables) return domIterables;
		hasRequiredDomIterables = 1;
		// iterable DOM collections
		// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
		domIterables = {
		  CSSRuleList: 0,
		  CSSStyleDeclaration: 0,
		  CSSValueList: 0,
		  ClientRectList: 0,
		  DOMRectList: 0,
		  DOMStringList: 0,
		  DOMTokenList: 1,
		  DataTransferItemList: 0,
		  FileList: 0,
		  HTMLAllCollection: 0,
		  HTMLCollection: 0,
		  HTMLFormElement: 0,
		  HTMLSelectElement: 0,
		  MediaList: 0,
		  MimeTypeArray: 0,
		  NamedNodeMap: 0,
		  NodeList: 1,
		  PaintRequestList: 0,
		  Plugin: 0,
		  PluginArray: 0,
		  SVGLengthList: 0,
		  SVGNumberList: 0,
		  SVGPathSegList: 0,
		  SVGPointList: 0,
		  SVGStringList: 0,
		  SVGTransformList: 0,
		  SourceBufferList: 0,
		  StyleSheetList: 0,
		  TextTrackCueList: 0,
		  TextTrackList: 0,
		  TouchList: 0
		};
		return domIterables;
	}

	var domTokenListPrototype;
	var hasRequiredDomTokenListPrototype;

	function requireDomTokenListPrototype () {
		if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
		hasRequiredDomTokenListPrototype = 1;
		// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
		var documentCreateElement = requireDocumentCreateElement();

		var classList = documentCreateElement('span').classList;
		var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

		domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
		return domTokenListPrototype;
	}

	var setToStringTag;
	var hasRequiredSetToStringTag;

	function requireSetToStringTag () {
		if (hasRequiredSetToStringTag) return setToStringTag;
		hasRequiredSetToStringTag = 1;
		var defineProperty = requireObjectDefineProperty().f;
		var hasOwn = requireHasOwnProperty();
		var wellKnownSymbol = requireWellKnownSymbol();

		var TO_STRING_TAG = wellKnownSymbol('toStringTag');

		setToStringTag = function (target, TAG, STATIC) {
		  if (target && !STATIC) target = target.prototype;
		  if (target && !hasOwn(target, TO_STRING_TAG)) {
		    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
		  }
		};
		return setToStringTag;
	}

	var iteratorCreateConstructor;
	var hasRequiredIteratorCreateConstructor;

	function requireIteratorCreateConstructor () {
		if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
		hasRequiredIteratorCreateConstructor = 1;
		var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
		var create = requireObjectCreate();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();
		var setToStringTag = requireSetToStringTag();
		var Iterators = requireIterators();

		var returnThis = function () { return this; };

		iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
		  var TO_STRING_TAG = NAME + ' Iterator';
		  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
		  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
		  Iterators[TO_STRING_TAG] = returnThis;
		  return IteratorConstructor;
		};
		return iteratorCreateConstructor;
	}

	var functionUncurryThisAccessor;
	var hasRequiredFunctionUncurryThisAccessor;

	function requireFunctionUncurryThisAccessor () {
		if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
		hasRequiredFunctionUncurryThisAccessor = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var aCallable = requireACallable();

		functionUncurryThisAccessor = function (object, key, method) {
		  try {
		    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
		  } catch (error) { /* empty */ }
		};
		return functionUncurryThisAccessor;
	}

	var isPossiblePrototype;
	var hasRequiredIsPossiblePrototype;

	function requireIsPossiblePrototype () {
		if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
		hasRequiredIsPossiblePrototype = 1;
		var isObject = requireIsObject();

		isPossiblePrototype = function (argument) {
		  return isObject(argument) || argument === null;
		};
		return isPossiblePrototype;
	}

	var aPossiblePrototype;
	var hasRequiredAPossiblePrototype;

	function requireAPossiblePrototype () {
		if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
		hasRequiredAPossiblePrototype = 1;
		var isPossiblePrototype = requireIsPossiblePrototype();

		var $String = String;
		var $TypeError = TypeError;

		aPossiblePrototype = function (argument) {
		  if (isPossiblePrototype(argument)) return argument;
		  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
		};
		return aPossiblePrototype;
	}

	var objectSetPrototypeOf;
	var hasRequiredObjectSetPrototypeOf;

	function requireObjectSetPrototypeOf () {
		if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
		hasRequiredObjectSetPrototypeOf = 1;
		/* eslint-disable no-proto -- safe */
		var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
		var isObject = requireIsObject();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var aPossiblePrototype = requireAPossiblePrototype();

		// `Object.setPrototypeOf` method
		// https://tc39.es/ecma262/#sec-object.setprototypeof
		// Works with __proto__ only. Old v8 can't work with null proto objects.
		// eslint-disable-next-line es/no-object-setprototypeof -- safe
		objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
		  var CORRECT_SETTER = false;
		  var test = {};
		  var setter;
		  try {
		    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
		    setter(test, []);
		    CORRECT_SETTER = test instanceof Array;
		  } catch (error) { /* empty */ }
		  return function setPrototypeOf(O, proto) {
		    requireObjectCoercible(O);
		    aPossiblePrototype(proto);
		    if (!isObject(O)) return O;
		    if (CORRECT_SETTER) setter(O, proto);
		    else O.__proto__ = proto;
		    return O;
		  };
		}() : undefined);
		return objectSetPrototypeOf;
	}

	var iteratorDefine;
	var hasRequiredIteratorDefine;

	function requireIteratorDefine () {
		if (hasRequiredIteratorDefine) return iteratorDefine;
		hasRequiredIteratorDefine = 1;
		var $ = require_export();
		var call = requireFunctionCall();
		var IS_PURE = requireIsPure();
		var FunctionName = requireFunctionName();
		var isCallable = requireIsCallable();
		var createIteratorConstructor = requireIteratorCreateConstructor();
		var getPrototypeOf = requireObjectGetPrototypeOf();
		var setPrototypeOf = requireObjectSetPrototypeOf();
		var setToStringTag = requireSetToStringTag();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var defineBuiltIn = requireDefineBuiltIn();
		var wellKnownSymbol = requireWellKnownSymbol();
		var Iterators = requireIterators();
		var IteratorsCore = requireIteratorsCore();

		var PROPER_FUNCTION_NAME = FunctionName.PROPER;
		var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
		var IteratorPrototype = IteratorsCore.IteratorPrototype;
		var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
		var ITERATOR = wellKnownSymbol('iterator');
		var KEYS = 'keys';
		var VALUES = 'values';
		var ENTRIES = 'entries';

		var returnThis = function () { return this; };

		iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
		  createIteratorConstructor(IteratorConstructor, NAME, next);

		  var getIterationMethod = function (KIND) {
		    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
		    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

		    switch (KIND) {
		      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
		      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
		      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
		    }

		    return function () { return new IteratorConstructor(this); };
		  };

		  var TO_STRING_TAG = NAME + ' Iterator';
		  var INCORRECT_VALUES_NAME = false;
		  var IterablePrototype = Iterable.prototype;
		  var nativeIterator = IterablePrototype[ITERATOR]
		    || IterablePrototype['@@iterator']
		    || DEFAULT && IterablePrototype[DEFAULT];
		  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
		  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
		  var CurrentIteratorPrototype, methods, KEY;

		  // fix native
		  if (anyNativeIterator) {
		    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
		    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
		      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
		        if (setPrototypeOf) {
		          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
		        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
		          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
		        }
		      }
		      // Set @@toStringTag to native iterators
		      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
		      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
		    }
		  }

		  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
		  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
		    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
		      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
		    } else {
		      INCORRECT_VALUES_NAME = true;
		      defaultIterator = function values() { return call(nativeIterator, this); };
		    }
		  }

		  // export additional methods
		  if (DEFAULT) {
		    methods = {
		      values: getIterationMethod(VALUES),
		      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
		      entries: getIterationMethod(ENTRIES)
		    };
		    if (FORCED) for (KEY in methods) {
		      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
		        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
		      }
		    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
		  }

		  // define iterator
		  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
		    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
		  }
		  Iterators[NAME] = defaultIterator;

		  return methods;
		};
		return iteratorDefine;
	}

	var createIterResultObject;
	var hasRequiredCreateIterResultObject;

	function requireCreateIterResultObject () {
		if (hasRequiredCreateIterResultObject) return createIterResultObject;
		hasRequiredCreateIterResultObject = 1;
		// `CreateIterResultObject` abstract operation
		// https://tc39.es/ecma262/#sec-createiterresultobject
		createIterResultObject = function (value, done) {
		  return { value: value, done: done };
		};
		return createIterResultObject;
	}

	var es_array_iterator;
	var hasRequiredEs_array_iterator;

	function requireEs_array_iterator () {
		if (hasRequiredEs_array_iterator) return es_array_iterator;
		hasRequiredEs_array_iterator = 1;
		var toIndexedObject = requireToIndexedObject();
		var addToUnscopables = requireAddToUnscopables();
		var Iterators = requireIterators();
		var InternalStateModule = requireInternalState();
		var defineProperty = requireObjectDefineProperty().f;
		var defineIterator = requireIteratorDefine();
		var createIterResultObject = requireCreateIterResultObject();
		var IS_PURE = requireIsPure();
		var DESCRIPTORS = requireDescriptors();

		var ARRAY_ITERATOR = 'Array Iterator';
		var setInternalState = InternalStateModule.set;
		var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

		// `Array.prototype.entries` method
		// https://tc39.es/ecma262/#sec-array.prototype.entries
		// `Array.prototype.keys` method
		// https://tc39.es/ecma262/#sec-array.prototype.keys
		// `Array.prototype.values` method
		// https://tc39.es/ecma262/#sec-array.prototype.values
		// `Array.prototype[@@iterator]` method
		// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
		// `CreateArrayIterator` internal method
		// https://tc39.es/ecma262/#sec-createarrayiterator
		es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
		  setInternalState(this, {
		    type: ARRAY_ITERATOR,
		    target: toIndexedObject(iterated), // target
		    index: 0,                          // next index
		    kind: kind                         // kind
		  });
		// `%ArrayIteratorPrototype%.next` method
		// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
		}, function () {
		  var state = getInternalState(this);
		  var target = state.target;
		  var index = state.index++;
		  if (!target || index >= target.length) {
		    state.target = null;
		    return createIterResultObject(undefined, true);
		  }
		  switch (state.kind) {
		    case 'keys': return createIterResultObject(index, false);
		    case 'values': return createIterResultObject(target[index], false);
		  } return createIterResultObject([index, target[index]], false);
		}, 'values');

		// argumentsList[@@iterator] is %ArrayProto_values%
		// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
		// https://tc39.es/ecma262/#sec-createmappedargumentsobject
		var values = Iterators.Arguments = Iterators.Array;

		// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
		addToUnscopables('keys');
		addToUnscopables('values');
		addToUnscopables('entries');

		// V8 ~ Chrome 45- bug
		if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
		  defineProperty(values, 'name', { value: 'values' });
		} catch (error) { /* empty */ }
		return es_array_iterator;
	}

	var hasRequiredWeb_domCollections_iterator;

	function requireWeb_domCollections_iterator () {
		if (hasRequiredWeb_domCollections_iterator) return web_domCollections_iterator;
		hasRequiredWeb_domCollections_iterator = 1;
		var globalThis = requireGlobalThis();
		var DOMIterables = requireDomIterables();
		var DOMTokenListPrototype = requireDomTokenListPrototype();
		var ArrayIteratorMethods = requireEs_array_iterator();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var setToStringTag = requireSetToStringTag();
		var wellKnownSymbol = requireWellKnownSymbol();

		var ITERATOR = wellKnownSymbol('iterator');
		var ArrayValues = ArrayIteratorMethods.values;

		var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
		  if (CollectionPrototype) {
		    // some Chrome versions have non-configurable methods on DOMTokenList
		    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
		      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
		    } catch (error) {
		      CollectionPrototype[ITERATOR] = ArrayValues;
		    }
		    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
		    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
		      // some Chrome versions have non-configurable methods on DOMTokenList
		      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
		        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
		      } catch (error) {
		        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
		      }
		    }
		  }
		};

		for (var COLLECTION_NAME in DOMIterables) {
		  handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME);
		}

		handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
		return web_domCollections_iterator;
	}

	requireWeb_domCollections_iterator();

	var es_regexp_constructor = {};

	var inheritIfRequired;
	var hasRequiredInheritIfRequired;

	function requireInheritIfRequired () {
		if (hasRequiredInheritIfRequired) return inheritIfRequired;
		hasRequiredInheritIfRequired = 1;
		var isCallable = requireIsCallable();
		var isObject = requireIsObject();
		var setPrototypeOf = requireObjectSetPrototypeOf();

		// makes subclassing work correct for wrapped built-ins
		inheritIfRequired = function ($this, dummy, Wrapper) {
		  var NewTarget, NewTargetPrototype;
		  if (
		    // it can work only with native `setPrototypeOf`
		    setPrototypeOf &&
		    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
		    isCallable(NewTarget = dummy.constructor) &&
		    NewTarget !== Wrapper &&
		    isObject(NewTargetPrototype = NewTarget.prototype) &&
		    NewTargetPrototype !== Wrapper.prototype
		  ) setPrototypeOf($this, NewTargetPrototype);
		  return $this;
		};
		return inheritIfRequired;
	}

	var proxyAccessor;
	var hasRequiredProxyAccessor;

	function requireProxyAccessor () {
		if (hasRequiredProxyAccessor) return proxyAccessor;
		hasRequiredProxyAccessor = 1;
		var defineProperty = requireObjectDefineProperty().f;

		proxyAccessor = function (Target, Source, key) {
		  key in Target || defineProperty(Target, key, {
		    configurable: true,
		    get: function () { return Source[key]; },
		    set: function (it) { Source[key] = it; }
		  });
		};
		return proxyAccessor;
	}

	var setSpecies;
	var hasRequiredSetSpecies;

	function requireSetSpecies () {
		if (hasRequiredSetSpecies) return setSpecies;
		hasRequiredSetSpecies = 1;
		var getBuiltIn = requireGetBuiltIn();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var wellKnownSymbol = requireWellKnownSymbol();
		var DESCRIPTORS = requireDescriptors();

		var SPECIES = wellKnownSymbol('species');

		setSpecies = function (CONSTRUCTOR_NAME) {
		  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

		  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
		    defineBuiltInAccessor(Constructor, SPECIES, {
		      configurable: true,
		      get: function () { return this; }
		    });
		  }
		};
		return setSpecies;
	}

	var hasRequiredEs_regexp_constructor;

	function requireEs_regexp_constructor () {
		if (hasRequiredEs_regexp_constructor) return es_regexp_constructor;
		hasRequiredEs_regexp_constructor = 1;
		var DESCRIPTORS = requireDescriptors();
		var globalThis = requireGlobalThis();
		var uncurryThis = requireFunctionUncurryThis();
		var isForced = requireIsForced();
		var inheritIfRequired = requireInheritIfRequired();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var create = requireObjectCreate();
		var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var isRegExp = requireIsRegexp();
		var toString = requireToString();
		var getRegExpFlags = requireRegexpGetFlags();
		var stickyHelpers = requireRegexpStickyHelpers();
		var proxyAccessor = requireProxyAccessor();
		var defineBuiltIn = requireDefineBuiltIn();
		var fails = requireFails();
		var hasOwn = requireHasOwnProperty();
		var enforceInternalState = requireInternalState().enforce;
		var setSpecies = requireSetSpecies();
		var wellKnownSymbol = requireWellKnownSymbol();
		var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
		var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

		var MATCH = wellKnownSymbol('match');
		var NativeRegExp = globalThis.RegExp;
		var RegExpPrototype = NativeRegExp.prototype;
		var SyntaxError = globalThis.SyntaxError;
		var exec = uncurryThis(RegExpPrototype.exec);
		var charAt = uncurryThis(''.charAt);
		var replace = uncurryThis(''.replace);
		var stringIndexOf = uncurryThis(''.indexOf);
		var stringSlice = uncurryThis(''.slice);
		// TODO: Use only proper RegExpIdentifierName
		var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
		var re1 = /a/g;
		var re2 = /a/g;

		// "new" should create a new object, old webkit bug
		var CORRECT_NEW = new NativeRegExp(re1) !== re1;

		var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
		var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

		var BASE_FORCED = DESCRIPTORS &&
		  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
		    re2[MATCH] = false;
		    // RegExp constructor can alter flags and IsRegExp works correct with @@match
		    // eslint-disable-next-line sonarjs/inconsistent-function-call -- required for testing
		    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
		  }));

		var handleDotAll = function (string) {
		  var length = string.length;
		  var index = 0;
		  var result = '';
		  var brackets = false;
		  var chr;
		  for (; index <= length; index++) {
		    chr = charAt(string, index);
		    if (chr === '\\') {
		      result += chr + charAt(string, ++index);
		      continue;
		    }
		    if (!brackets && chr === '.') {
		      result += '[\\s\\S]';
		    } else {
		      if (chr === '[') {
		        brackets = true;
		      } else if (chr === ']') {
		        brackets = false;
		      } result += chr;
		    }
		  } return result;
		};

		var handleNCG = function (string) {
		  var length = string.length;
		  var index = 0;
		  var result = '';
		  var named = [];
		  var names = create(null);
		  var brackets = false;
		  var ncg = false;
		  var groupid = 0;
		  var groupname = '';
		  var chr;
		  for (; index <= length; index++) {
		    chr = charAt(string, index);
		    if (chr === '\\') {
		      chr += charAt(string, ++index);
		    } else if (chr === ']') {
		      brackets = false;
		    } else if (!brackets) switch (true) {
		      case chr === '[':
		        brackets = true;
		        break;
		      case chr === '(':
		        result += chr;
		        // ignore non-capturing groups
		        if (stringSlice(string, index + 1, index + 3) === '?:') {
		          continue;
		        }
		        if (exec(IS_NCG, stringSlice(string, index + 1))) {
		          index += 2;
		          ncg = true;
		        }
		        groupid++;
		        continue;
		      case chr === '>' && ncg:
		        if (groupname === '' || hasOwn(names, groupname)) {
		          throw new SyntaxError('Invalid capture group name');
		        }
		        names[groupname] = true;
		        named[named.length] = [groupname, groupid];
		        ncg = false;
		        groupname = '';
		        continue;
		    }
		    if (ncg) groupname += chr;
		    else result += chr;
		  } return [result, named];
		};

		// `RegExp` constructor
		// https://tc39.es/ecma262/#sec-regexp-constructor
		if (isForced('RegExp', BASE_FORCED)) {
		  var RegExpWrapper = function RegExp(pattern, flags) {
		    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
		    var patternIsRegExp = isRegExp(pattern);
		    var flagsAreUndefined = flags === undefined;
		    var groups = [];
		    var rawPattern = pattern;
		    var rawFlags, dotAll, sticky, handled, result, state;

		    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
		      return pattern;
		    }

		    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
		      pattern = pattern.source;
		      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
		    }

		    pattern = pattern === undefined ? '' : toString(pattern);
		    flags = flags === undefined ? '' : toString(flags);
		    rawPattern = pattern;

		    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
		      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
		      if (dotAll) flags = replace(flags, /s/g, '');
		    }

		    rawFlags = flags;

		    if (MISSED_STICKY && 'sticky' in re1) {
		      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
		      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
		    }

		    if (UNSUPPORTED_NCG) {
		      handled = handleNCG(pattern);
		      pattern = handled[0];
		      groups = handled[1];
		    }

		    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

		    if (dotAll || sticky || groups.length) {
		      state = enforceInternalState(result);
		      if (dotAll) {
		        state.dotAll = true;
		        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
		      }
		      if (sticky) state.sticky = true;
		      if (groups.length) state.groups = groups;
		    }

		    if (pattern !== rawPattern) try {
		      // fails in old engines, but we have no alternatives for unsupported regex syntax
		      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
		    } catch (error) { /* empty */ }

		    return result;
		  };

		  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
		    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
		  }

		  RegExpPrototype.constructor = RegExpWrapper;
		  RegExpWrapper.prototype = RegExpPrototype;
		  defineBuiltIn(globalThis, 'RegExp', RegExpWrapper, { constructor: true });
		}

		// https://tc39.es/ecma262/#sec-get-regexp-@@species
		setSpecies('RegExp');
		return es_regexp_constructor;
	}

	requireEs_regexp_constructor();

	var es_regexp_dotAll = {};

	var hasRequiredEs_regexp_dotAll;

	function requireEs_regexp_dotAll () {
		if (hasRequiredEs_regexp_dotAll) return es_regexp_dotAll;
		hasRequiredEs_regexp_dotAll = 1;
		var DESCRIPTORS = requireDescriptors();
		var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
		var classof = requireClassofRaw();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var getInternalState = requireInternalState().get;

		var RegExpPrototype = RegExp.prototype;
		var $TypeError = TypeError;

		// `RegExp.prototype.dotAll` getter
		// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
		if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
		  defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
		    configurable: true,
		    get: function dotAll() {
		      if (this === RegExpPrototype) return;
		      // We can't use InternalStateModule.getterFor because
		      // we don't add metadata for regexps created by a literal.
		      if (classof(this) === 'RegExp') {
		        return !!getInternalState(this).dotAll;
		      }
		      throw new $TypeError('Incompatible receiver, RegExp required');
		    }
		  });
		}
		return es_regexp_dotAll;
	}

	requireEs_regexp_dotAll();

	const GLOBAL_PREFIX = "[GT2]";

	/**
	 * Logging class for the script.
	 */
	class Logger {
	  constructor() {
	    let originPrefix = null;
	    for (var _len = arguments.length, origin = new Array(_len), _key = 0; _key < _len; _key++) {
	      origin[_key] = arguments[_key];
	    }
	    if (origin.length) originPrefix = "".concat(origin.join("/"), ":");
	    this.prefixes = [GLOBAL_PREFIX, originPrefix].filter(e => e);
	  }

	  /**
	   * Logs a message with the debug level.
	   * @param msg the message to log
	   */
	  debug() {
	    for (var _len2 = arguments.length, msg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      msg[_key2] = arguments[_key2];
	    }
	    console.debug(...this.prefixes, ...msg);
	  }

	  /**
	   * Logs a message with the info level.
	   * @param msg the message to log
	   */
	  info() {
	    for (var _len3 = arguments.length, msg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      msg[_key3] = arguments[_key3];
	    }
	    console.info(...this.prefixes, ...msg);
	  }

	  /**
	   * Logs a message with the warn level.
	   * @param msg the message to log
	   */
	  warn() {
	    for (var _len4 = arguments.length, msg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      msg[_key4] = arguments[_key4];
	    }
	    console.warn(...this.prefixes, ...msg);
	  }

	  /**
	   * Logs a message with the error level.
	   * @param msg the message to log
	   */
	  error() {
	    for (var _len5 = arguments.length, msg = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      msg[_key5] = arguments[_key5];
	    }
	    console.error(...this.prefixes, ...msg);
	  }
	}

	/**
	 * "Singleton" of the logger, used for general purposes.
	 */
	const globalLogger = new Logger();

	const RESOURCE = {
	  /**
	   * Userscript resource: emojiRegex
	   */
	  EMOJI_REGEX: "emojiRegex",
	  /**
	   * Userscript resource: stylesheet
	   */
	  CSS: "css"
	};

	/**
	 * Url of the default avatar.
	 */
	const DEFAULT_AVATAR_URL = "https://abs.twimg.com/sticky/default_profile_images/default_profile.png";

	/**
	 * RegExp constants
	 */
	const REGEX = {
	  AVATAR_SUFFIX: /_(bigger|normal|(reasonably_)?small|\d*x\d+)/,
	  /**
	   * The RegExp for emojis.
	   */
	  EMOJI: (() => {
	    let text = GM_getResourceText(RESOURCE.EMOJI_REGEX);
	    if (!text || text.length == 0) {
	      globalLogger.error("error getting resource ".concat(RESOURCE.EMOJI_REGEX));
	      return null;
	    }
	    return new RegExp("(".concat(text, ")"), "gu");
	  })()
	};

	/**
	 * Public bearer token, used for API requests.
	 *
	 * Found in https://abs.twimg.com/responsive-web/web/main.5c0baa34.js
	 */
	const PUBLIC_BEARER = "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

	/**
	 * Known modal pages.
	 */
	const MODAL_PAGES = {
	  "account": ["add", "switch"],
	  "compose": ["tweet", "post"],
	  "i": ["display", "keyboard_shortcuts", "flow", {
	    "lists": ["add_member", "create"]
	  }, "report", "twitter_blue_sign_up"],
	  "intent": [],
	  "search_advanced": [],
	  "settings": ["trends", "profile"]
	};

	/**
	 * Array of title adjustments.
	 */
	const TITLE_ADJUSTMENTS = [{
	  location: "/settings/gt2",
	  title: "GoodTwitter2"
	}];

	/**
	 * Keys for GM_getValue / GM_setValue functions.
	 */
	const GM_KEYS = {
	  THEME: "theme",
	  DISMISSED_SIDEBAR_NOTICES: "dismissedSidebarNotices",
	  SETTINGS: "opt_gt2",
	  LEGACY_PROFILE_BANNER_HEIGHT: "legacyProfile.bannerHeight"
	};

	/**
	 * Breakpoints for the layout.
	 *
	 * Breakpoints overview:
	 *
	 * name | left sb.  | right sb. | small sb. | dimensions        | note
	 * -----|-----------|-----------|-----------|-------------------|-----
	 * xxl  | yes       | yes       |           | > 1350px          |
	 * xl   | yes       | yes       | yes       | > 1230px          |
	 * lg   |           | yes       |           | 1095px - 1350px   |
	 * md   |           | yes       | yes       | 1095px - 1230px   |
	 * md   |           | yes       |           | 1005px - 1095px   | small sidebars auto applied
	 * sm   |           |           |           | < 1005px          |
	 * xs   |           |           |           | < 705px           |
	 */
	const BREAKPOINTS = {
	  EXTRA_EXTRA_LARGE: 1350,
	  EXTRA_LARGE: 1230,
	  MEDIUM: 1005};

	/**
	 * The top offset in px.
	 */
	const GLOBAL_TOP_OFFSET = 57;

	/**
	 * Sidebar visibility enum.
	 */
	let ESidebar = /*#__PURE__*/function (ESidebar) {
	  ESidebar[ESidebar["None"] = 1] = "None";
	  ESidebar[ESidebar["Left"] = 2] = "Left";
	  ESidebar[ESidebar["Right"] = 4] = "Right";
	  ESidebar[ESidebar["Both"] = 6] = "Both";
	  return ESidebar;
	}({});

	var es_object_assign = {};

	var objectAssign;
	var hasRequiredObjectAssign;

	function requireObjectAssign () {
		if (hasRequiredObjectAssign) return objectAssign;
		hasRequiredObjectAssign = 1;
		var DESCRIPTORS = requireDescriptors();
		var uncurryThis = requireFunctionUncurryThis();
		var call = requireFunctionCall();
		var fails = requireFails();
		var objectKeys = requireObjectKeys();
		var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
		var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
		var toObject = requireToObject();
		var IndexedObject = requireIndexedObject();

		// eslint-disable-next-line es/no-object-assign -- safe
		var $assign = Object.assign;
		// eslint-disable-next-line es/no-object-defineproperty -- required for testing
		var defineProperty = Object.defineProperty;
		var concat = uncurryThis([].concat);

		// `Object.assign` method
		// https://tc39.es/ecma262/#sec-object.assign
		objectAssign = !$assign || fails(function () {
		  // should have correct order of operations (Edge bug)
		  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
		    enumerable: true,
		    get: function () {
		      defineProperty(this, 'b', {
		        value: 3,
		        enumerable: false
		      });
		    }
		  }), { b: 2 })).b !== 1) return true;
		  // should work with symbols and should have deterministic property order (V8 bug)
		  var A = {};
		  var B = {};
		  // eslint-disable-next-line es/no-symbol -- safe
		  var symbol = Symbol('assign detection');
		  var alphabet = 'abcdefghijklmnopqrst';
		  A[symbol] = 7;
		  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
		  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
		  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
		}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
		  var T = toObject(target);
		  var argumentsLength = arguments.length;
		  var index = 1;
		  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
		  var propertyIsEnumerable = propertyIsEnumerableModule.f;
		  while (argumentsLength > index) {
		    var S = IndexedObject(arguments[index++]);
		    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
		    var length = keys.length;
		    var j = 0;
		    var key;
		    while (length > j) {
		      key = keys[j++];
		      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
		    }
		  } return T;
		} : $assign;
		return objectAssign;
	}

	var hasRequiredEs_object_assign;

	function requireEs_object_assign () {
		if (hasRequiredEs_object_assign) return es_object_assign;
		hasRequiredEs_object_assign = 1;
		var $ = require_export();
		var assign = requireObjectAssign();

		// `Object.assign` method
		// https://tc39.es/ecma262/#sec-object.assign
		// eslint-disable-next-line es/no-object-assign -- required for testing
		$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
		  assign: assign
		});
		return es_object_assign;
	}

	requireEs_object_assign();

	const INITIAL_SETTINGS = {
	  // timeline
	  forceLatest: false,
	  biggerPreviews: false,
	  // tweets
	  hideTranslateTweetButton: false,
	  tweetIconsPullLeft: false,
	  hidePromoteTweetButton: false,
	  showMediaWithContentWarnings: false,
	  showMediaWithContentWarningsSel: 7,
	  hideMoreTweets: false,
	  // sidebars
	  stickySidebars: true,
	  smallSidebars: false,
	  hideTrends: false,
	  leftTrends: true,
	  show5Trends: false,
	  // profile
	  legacyProfile: false,
	  squareAvatars: false,
	  disableHexagonAvatars: false,
	  leftMedia: false,
	  profileMediaRedirect: false,
	  // global look
	  hideFollowSuggestions: false,
	  hideFollowSuggestionsTimelineSel: 7,
	  hideFollowSuggestionsSidebarSel: 3,
	  hideFollowSuggestionsProfileSel: 1,
	  fontOverride: false,
	  fontOverrideValue: "Arial",
	  colorOverride: false,
	  colorOverrideValue: "85, 102, 68",
	  hideMessageBox: true,
	  rosettaIcons: false,
	  favoriteLikes: false,
	  birdIcon: true,
	  // other
	  updateNotifications: true,
	  expandTcoShortlinks: true,
	  mobileRedirect: true
	};
	/**
	 * Settings helper class.
	 */
	class Settings {
	  static get data() {
	    let value = INITIAL_SETTINGS;
	    Object.assign(value, GM_getValue(GM_KEYS.SETTINGS, {}));
	    return new Proxy(value, {
	      set(target, prop, value) {
	        target[prop] = value;
	        GM_setValue(GM_KEYS.SETTINGS, target);
	        return true;
	      }
	    });
	  }

	  /**
	   * Sets all currently active settings in the DOM.
	   */
	  static setAllInDom() {
	    let key;
	    for (key in Settings.data) {
	      Settings.setInDom(key, Settings.data[key]);
	    }
	  }

	  /**
	   * Sets a settings value by key
	   * @param key the key of the setting
	   * @param value the new value
	   */
	  static set(key, value) {
	    // set in DOM
	    Settings.setInDom(key, value);

	    // internal
	    Settings.data[key] = value;

	    // @option colorOverride
	    if (key == "colorOverride" || key == "colorOverrideValue") {
	      if (Settings.get("colorOverride")) {
	        document.documentElement.style.setProperty("--color-raw-accent-override", Settings.get("colorOverrideValue"));
	      } else {
	        document.documentElement.style.removeProperty("--color-raw-accent-override");
	      }
	    }

	    // @option fontOverride
	    if (key == "fontOverride" || key == "fontOverrideValue") {
	      if (Settings.get("fontOverride")) {
	        document.documentElement.style.setProperty("--font-family-override", Settings.get("fontOverrideValue"));
	      } else {
	        document.documentElement.style.removeProperty("--font-family-override");
	      }
	    }
	  }

	  /**
	   * Sets a settings value in the DOM by
	   * adding a new class to the body element.
	   * @param key the key of the settings
	   * @param value the new value
	   */
	  static setInDom(key, value) {
	    const className = Settings.getClassName(key, value);
	    if (value) document.body.classList.add(className);else document.body.classList.remove(className);
	  }

	  /**
	   * Gets a single value
	   * @param key the key of the setting
	   * @returns the current value
	   */
	  static get(key) {
	    return Settings.data[key];
	  }

	  /**
	   * Toggles a boolean settings value.
	   * @param key the key of the setting
	   */
	  static toggle(key) {
	    if (typeof Settings.data[key] == "boolean") {
	      Settings.set(key, !Settings.get(key));
	    }
	  }

	  /**
	   * XORs a numeric settings value with a given number.
	   * @param key the key of the setting
	   * @param value the value to XOR with
	   */
	  static xor(key, value) {
	    let current = Settings.get(key);
	    if (typeof current == "number") {
	      Settings.set(key, current ^ value);
	    }
	  }

	  /**
	   * Gets a valid className string from a setting.
	   * @param key the key of the setting
	   * @param value the value of the setting. Only important for numeric settings
	   * @returns a className string
	   */
	  static getClassName(key, value) {
	    return "gt2-opt-".concat(key.camelCaseToKebabCase()).concat(typeof value === "number" ? "-".concat(value) : "");
	  }
	}

	const _logger$d = new Logger("util");

	/**
	 * Checks if the current user is logged in.
	 * @return true if logged in, false if not
	 */
	function isLoggedIn() {
	  return document.cookie.match(/twid=u/) != null;
	}

	/**
	 * Gets the current display language.
	 * @return display language code
	 */
	function getLanguage() {
	  let lang = document.documentElement.lang;
	  return lang == "en-GB" ? "en" : lang;
	}

	/**
	 * Gets the localized version of a string.
	 * Defaults to the english version.
	 * @param key the key of the string
	 * @returns the localized string
	 */
	function getLocalizedString(key) {
	  if (!i18n) {
	    _logger$d.error("error getting i18n data.");
	    return key;
	  }
	  let lang = getLanguage();
	  if (!Object.keys(i18n).includes(lang)) {
	    _logger$d.warn("the language file for ".concat(lang, " does not exist yet. falling back to english."));
	    lang = "en";
	  }
	  if (!Object.keys(i18n[lang]).includes(key)) {
	    if (!hasLocalizedString(key)) {
	      _logger$d.error("the string \"".concat(key, "\" does not exist."));
	      return null;
	    }
	    _logger$d.warn("the language file for ".concat(lang, " does not contain a translation for the string \"").concat(key, "\". falling back to english."));
	    lang = "en";
	  }
	  return i18n[lang][key];
	}

	/**
	 * Checks whether a string has a localized version or not.
	 * @param key the key of the string
	 * @returns true if the string has a localized version
	 */
	function hasLocalizedString(key) {
	  return Object.keys(i18n["en"]).includes(key);
	}
	function getLocalizedReplaceableString(key, val) {
	  let loc = getLocalizedString(key);
	  Object.entries(val).forEach(e => {
	    loc = loc.replace("$".concat(e[0], "$"), e[1].toString());
	  });
	  return loc;
	}

	/**
	 * Execute a callback function on elements once they are available in the DOM.
	 * Heavily based on https://gist.github.com/BrockA/2625891 but without jQuery.
	 * @param selector a valid CSS selector string
	 * @param callback the callback function to execute. Gets passed the added element node
	 */
	function waitForElements(selector, callback) {
	  var _options$parentElemen, _options$mutationObse, _options$signal;
	  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  const parentElement = (_options$parentElemen = options.parentElement) !== null && _options$parentElemen !== void 0 ? _options$parentElemen : document.documentElement;
	  const waitOnce = typeof options.waitOnce == "undefined" ? true : options.waitOnce;
	  let results = parentElement.querySelectorAll(selector);
	  forEachNode(results, callback);
	  const observer = new MutationObserver(() => {
	    results = parentElement.querySelectorAll(selector);
	    if (results.length > 0) {
	      if (waitOnce) observer.disconnect();
	      forEachNode(results, callback);
	    }
	  });
	  observer.observe(parentElement, _objectSpread2({
	    childList: true,
	    subtree: true
	  }, (_options$mutationObse = options.mutationObserverOptions) !== null && _options$mutationObse !== void 0 ? _options$mutationObse : {}));
	  (_options$signal = options.signal) === null || _options$signal === void 0 || _options$signal.addEventListener("abort", () => observer.disconnect());
	}
	function forEachNode(results, callback) {
	  results.forEach(node => {
	    if (!node.alreadyFound) {
	      callback(node);
	      node.alreadyFound = true;
	    }
	  });
	}

	/**
	 * Watch a given element for changes and execute a callback function when they happen.
	 * @param selector a valid CSS selector string of the element to watch
	 * @param callback the function to execute when a change happens
	 * @param options additional options for the observe function
	 * @param waitOnce if set to false, continue to search for new elements even after the first match is found
	 */
	function watchForElementChanges(selector, callback) {
	  var _options$mutationObse2, _options$signal2;
	  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  let observer;
	  const observerOptions = (_options$mutationObse2 = options.mutationObserverOptions) !== null && _options$mutationObse2 !== void 0 ? _options$mutationObse2 : {};
	  options.mutationObserverOptions = {};
	  waitForElements(selector, element => {
	    callback(element);
	    if (observer) observer.disconnect();
	    observer = new MutationObserver(mutationRecord => {
	      mutationRecord.forEach(() => callback(element));
	    });
	    observer.observe(element, _objectSpread2({
	      attributes: true,
	      childList: true
	    }, observerOptions));
	  }, options);
	  (_options$signal2 = options.signal) === null || _options$signal2 === void 0 || _options$signal2.addEventListener("abort", () => {
	    var _observer;
	    return (_observer = observer) === null || _observer === void 0 ? void 0 : _observer.disconnect();
	  });
	}

	/**
	 * Waits for 2 elements.
	 * Usually used to transfer data from one element to the other.
	 *
	 * Same as using `watchForElementChanges` on the source element and `waitForElements` on the destination element.
	 * @param sourceSelector the selector for the first element (source)
	 * @param destinationSelector the selector for the second element (destination)
	 * @param callback the callback function to execute. Gets passed the added element nodes
	 * @param options additional options for the observe function
	 * @param waitOnce if set to false, continue to search for new elements even after the first match is found
	 */
	function watchForMultipleElementChanges(sourceSelector, destinationSelector, callback) {
	  let sourceOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  let destinationOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	  let source;
	  let destination;
	  watchForElementChanges(sourceSelector, e => {
	    source = e;
	    if (destination) callback(source, destination);
	  }, sourceOptions);
	  waitForElements(destinationSelector, e => {
	    destination = e;
	    if (source) callback(source, destination);
	  }, destinationOptions);
	}

	/**
	 * Get information about the currently logged in account.
	 * TODO use react thing
	 * @returns user info object
	 */
	function getCurrentUserInfo() {
	  if (window.userInfo) return window.userInfo;
	  let user = null;
	  try {
	    for (let e of Array.from(document.querySelectorAll("#react-root ~ script"))) {
	      if (e.textContent.includes("__INITIAL_STATE__")) {
	        let match = e.textContent.match(/__INITIAL_STATE__=(\{.*?});window/);
	        if (match) {
	          var _Object$values$, _initialState$entitie;
	          let initialState = JSON.parse(match[1]);
	          user = (_Object$values$ = Object.values(initialState === null || initialState === void 0 || (_initialState$entitie = initialState.entities) === null || _initialState$entitie === void 0 || (_initialState$entitie = _initialState$entitie.users) === null || _initialState$entitie === void 0 ? void 0 : _initialState$entitie.entities)[0]) !== null && _Object$values$ !== void 0 ? _Object$values$ : null;
	        }
	        break;
	      }
	    }
	  } catch (e) {
	    _logger$d.error(e);
	  }
	  if (user) {
	    window.userInfo = {
	      bannerUrl: user.profile_banner_url,
	      avatarUrl: user.profile_image_url_https.replace("_normal", "_bigger"),
	      screenName: user.screen_name,
	      name: user.name,
	      id: user.id_str,
	      stats: {
	        tweets: user.statuses_count,
	        followers: user.followers_count,
	        following: user.friends_count
	      }
	    };
	    _logger$d.info("got user info", window.userInfo);
	  } else {
	    _logger$d.error("match of __INITIAL_STATE__ unsuccessful, falling back to default values");
	    window.userInfo = {
	      bannerUrl: "",
	      avatarUrl: DEFAULT_AVATAR_URL,
	      screenName: "youarenotloggedin",
	      name: "Anonymous",
	      id: "0",
	      stats: {
	        tweets: 0,
	        followers: 0,
	        following: 0
	      }
	    };
	  }
	  return window.userInfo;
	}

	/**
	 * Adds a click EventListener to a mock element.
	 * @param mockElement the mock element to append the listener to
	 * @param originalElement the original element to click on
	 * @param callback an optional callback
	 */
	function addClickHandlerToMockElement(mockElement, originalElement, callback) {
	  mockElement.addEventListener("click", event => {
	    if (event.ctrlKey || originalElement == null) return;
	    event.preventDefault();
	    if (originalElement.onclick) originalElement.click();else originalElement.dispatchEvent(new MouseEvent("click", {
	      bubbles: true
	    }));
	    if (callback) callback();
	  });
	}

	/**
	 * Gets the current sidebar type.
	 */
	function getSidebarType() {
	  let smallSidebars = Settings.get("smallSidebars");
	  let width = window.innerWidth;
	  if (!smallSidebars && width > BREAKPOINTS.EXTRA_EXTRA_LARGE || smallSidebars && width > BREAKPOINTS.EXTRA_LARGE) return ESidebar.Both;
	  if (width > BREAKPOINTS.MEDIUM) return ESidebar.Right;
	  return ESidebar.None;
	}

	/**
	 * Checks, if an enum value is set via logical and.
	 * @param source the enum to check
	 * @param value the value
	 */
	function isSet(source, value) {
	  return value == (source & value);
	}

	/**
	 * Checks, if a sidebar notice has been dismissed.
	 * @param key the key of the notice to check
	 * @returns true, if the notice has been dismissed
	 */
	function isSidebarNoticeDismissed(key) {
	  return GM_getValue(GM_KEYS.DISMISSED_SIDEBAR_NOTICES, []).includes(key);
	}

	/**
	 * Dismisses a sidebar notice.
	 * @param key the key of the notice to dismiss.
	 */
	function dismissSidebarNotice(key) {
	  let notices = GM_getValue(GM_KEYS.DISMISSED_SIDEBAR_NOTICES, []);
	  notices.push(key);
	  GM_setValue(GM_KEYS.DISMISSED_SIDEBAR_NOTICES, notices);
	  _logger$d.debug("dismissed sidebar notice with key: ", key);
	}

	/**
	 * Expands a t.co shortlink.
	 * @param anchor the a element to replace its href
	 * @param urls the urls to search for the correct t.co expansion
	 */
	function expandTcoShortlink(anchor, urls) {
	  const tcoUrl = anchor.getAttribute("href").split("?")[0];
	  if (!tcoUrl.includes("//t.co/")) return;
	  const url = urls.find(e => e.url == tcoUrl);
	  if (!url) {
	    _logger$d.error("expandTcoShortlinks: error getting url object", anchor, tcoUrl);
	    return;
	  }
	  if (!url.expanded_url) {
	    _logger$d.error("expandTcoShortlinks: url object has no expanded_url", anchor, url);
	    return;
	  }
	  anchor.setAttribute("href", url.expanded_url);
	  _logger$d.debug("expanded", tcoUrl, "to", url.expanded_url);
	}
	function getSvgSelector(svg) {
	  const match = svg.match(/(d="[^"]+")/);
	  if (!match) {
	    _logger$d.error("Error extracting svg selector from svg:", svg);
	    return ".gt2-matches-nothing";
	  }
	  return "[".concat(match[1], "]");
	}

	var es_array_reduce = {};

	var arrayReduce;
	var hasRequiredArrayReduce;

	function requireArrayReduce () {
		if (hasRequiredArrayReduce) return arrayReduce;
		hasRequiredArrayReduce = 1;
		var aCallable = requireACallable();
		var toObject = requireToObject();
		var IndexedObject = requireIndexedObject();
		var lengthOfArrayLike = requireLengthOfArrayLike();

		var $TypeError = TypeError;

		var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

		// `Array.prototype.{ reduce, reduceRight }` methods implementation
		var createMethod = function (IS_RIGHT) {
		  return function (that, callbackfn, argumentsLength, memo) {
		    var O = toObject(that);
		    var self = IndexedObject(O);
		    var length = lengthOfArrayLike(O);
		    aCallable(callbackfn);
		    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
		    var index = IS_RIGHT ? length - 1 : 0;
		    var i = IS_RIGHT ? -1 : 1;
		    if (argumentsLength < 2) while (true) {
		      if (index in self) {
		        memo = self[index];
		        index += i;
		        break;
		      }
		      index += i;
		      if (IS_RIGHT ? index < 0 : length <= index) {
		        throw new $TypeError(REDUCE_EMPTY);
		      }
		    }
		    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
		      memo = callbackfn(memo, self[index], index, O);
		    }
		    return memo;
		  };
		};

		arrayReduce = {
		  // `Array.prototype.reduce` method
		  // https://tc39.es/ecma262/#sec-array.prototype.reduce
		  left: createMethod(false),
		  // `Array.prototype.reduceRight` method
		  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
		  right: createMethod(true)
		};
		return arrayReduce;
	}

	var arrayMethodIsStrict;
	var hasRequiredArrayMethodIsStrict;

	function requireArrayMethodIsStrict () {
		if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
		hasRequiredArrayMethodIsStrict = 1;
		var fails = requireFails();

		arrayMethodIsStrict = function (METHOD_NAME, argument) {
		  var method = [][METHOD_NAME];
		  return !!method && fails(function () {
		    // eslint-disable-next-line no-useless-call -- required for testing
		    method.call(null, argument || function () { return 1; }, 1);
		  });
		};
		return arrayMethodIsStrict;
	}

	var environment;
	var hasRequiredEnvironment;

	function requireEnvironment () {
		if (hasRequiredEnvironment) return environment;
		hasRequiredEnvironment = 1;
		/* global Bun, Deno -- detection */
		var globalThis = requireGlobalThis();
		var userAgent = requireEnvironmentUserAgent();
		var classof = requireClassofRaw();

		var userAgentStartsWith = function (string) {
		  return userAgent.slice(0, string.length) === string;
		};

		environment = (function () {
		  if (userAgentStartsWith('Bun/')) return 'BUN';
		  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
		  if (userAgentStartsWith('Deno/')) return 'DENO';
		  if (userAgentStartsWith('Node.js/')) return 'NODE';
		  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
		  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
		  if (classof(globalThis.process) === 'process') return 'NODE';
		  if (globalThis.window && globalThis.document) return 'BROWSER';
		  return 'REST';
		})();
		return environment;
	}

	var environmentIsNode;
	var hasRequiredEnvironmentIsNode;

	function requireEnvironmentIsNode () {
		if (hasRequiredEnvironmentIsNode) return environmentIsNode;
		hasRequiredEnvironmentIsNode = 1;
		var ENVIRONMENT = requireEnvironment();

		environmentIsNode = ENVIRONMENT === 'NODE';
		return environmentIsNode;
	}

	var hasRequiredEs_array_reduce;

	function requireEs_array_reduce () {
		if (hasRequiredEs_array_reduce) return es_array_reduce;
		hasRequiredEs_array_reduce = 1;
		var $ = require_export();
		var $reduce = requireArrayReduce().left;
		var arrayMethodIsStrict = requireArrayMethodIsStrict();
		var CHROME_VERSION = requireEnvironmentV8Version();
		var IS_NODE = requireEnvironmentIsNode();

		// Chrome 80-82 has a critical bug
		// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
		var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
		var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

		// `Array.prototype.reduce` method
		// https://tc39.es/ecma262/#sec-array.prototype.reduce
		$({ target: 'Array', proto: true, forced: FORCED }, {
		  reduce: function reduce(callbackfn /* , initialValue */) {
		    var length = arguments.length;
		    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
		  }
		});
		return es_array_reduce;
	}

	requireEs_array_reduce();

	var esnext_iterator_filter = {};

	var es_iterator_filter = {};

	var defineBuiltIns;
	var hasRequiredDefineBuiltIns;

	function requireDefineBuiltIns () {
		if (hasRequiredDefineBuiltIns) return defineBuiltIns;
		hasRequiredDefineBuiltIns = 1;
		var defineBuiltIn = requireDefineBuiltIn();

		defineBuiltIns = function (target, src, options) {
		  for (var key in src) defineBuiltIn(target, key, src[key], options);
		  return target;
		};
		return defineBuiltIns;
	}

	var iteratorCloseAll;
	var hasRequiredIteratorCloseAll;

	function requireIteratorCloseAll () {
		if (hasRequiredIteratorCloseAll) return iteratorCloseAll;
		hasRequiredIteratorCloseAll = 1;
		var iteratorClose = requireIteratorClose();

		iteratorCloseAll = function (iters, kind, value) {
		  for (var i = iters.length - 1; i >= 0; i--) {
		    if (iters[i] === undefined) continue;
		    try {
		      value = iteratorClose(iters[i].iterator, kind, value);
		    } catch (error) {
		      kind = 'throw';
		      value = error;
		    }
		  }
		  if (kind === 'throw') throw value;
		  return value;
		};
		return iteratorCloseAll;
	}

	var iteratorCreateProxy;
	var hasRequiredIteratorCreateProxy;

	function requireIteratorCreateProxy () {
		if (hasRequiredIteratorCreateProxy) return iteratorCreateProxy;
		hasRequiredIteratorCreateProxy = 1;
		var call = requireFunctionCall();
		var create = requireObjectCreate();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var defineBuiltIns = requireDefineBuiltIns();
		var wellKnownSymbol = requireWellKnownSymbol();
		var InternalStateModule = requireInternalState();
		var getMethod = requireGetMethod();
		var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
		var createIterResultObject = requireCreateIterResultObject();
		var iteratorClose = requireIteratorClose();
		var iteratorCloseAll = requireIteratorCloseAll();

		var TO_STRING_TAG = wellKnownSymbol('toStringTag');
		var ITERATOR_HELPER = 'IteratorHelper';
		var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
		var NORMAL = 'normal';
		var THROW = 'throw';
		var setInternalState = InternalStateModule.set;

		var createIteratorProxyPrototype = function (IS_ITERATOR) {
		  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

		  return defineBuiltIns(create(IteratorPrototype), {
		    next: function next() {
		      var state = getInternalState(this);
		      // for simplification:
		      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
		      //   for `%IteratorHelperPrototype%.next` - just a value
		      if (IS_ITERATOR) return state.nextHandler();
		      if (state.done) return createIterResultObject(undefined, true);
		      try {
		        var result = state.nextHandler();
		        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
		      } catch (error) {
		        state.done = true;
		        throw error;
		      }
		    },
		    'return': function () {
		      var state = getInternalState(this);
		      var iterator = state.iterator;
		      state.done = true;
		      if (IS_ITERATOR) {
		        var returnMethod = getMethod(iterator, 'return');
		        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
		      }
		      if (state.inner) try {
		        iteratorClose(state.inner.iterator, NORMAL);
		      } catch (error) {
		        return iteratorClose(iterator, THROW, error);
		      }
		      if (state.openIters) try {
		        iteratorCloseAll(state.openIters, NORMAL);
		      } catch (error) {
		        return iteratorClose(iterator, THROW, error);
		      }
		      if (iterator) iteratorClose(iterator, NORMAL);
		      return createIterResultObject(undefined, true);
		    }
		  });
		};

		var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
		var IteratorHelperPrototype = createIteratorProxyPrototype(false);

		createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

		iteratorCreateProxy = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
		  var IteratorProxy = function Iterator(record, state) {
		    if (state) {
		      state.iterator = record.iterator;
		      state.next = record.next;
		    } else state = record;
		    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
		    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
		    state.nextHandler = nextHandler;
		    state.counter = 0;
		    state.done = false;
		    setInternalState(this, state);
		  };

		  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

		  return IteratorProxy;
		};
		return iteratorCreateProxy;
	}

	var callWithSafeIterationClosing;
	var hasRequiredCallWithSafeIterationClosing;

	function requireCallWithSafeIterationClosing () {
		if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
		hasRequiredCallWithSafeIterationClosing = 1;
		var anObject = requireAnObject();
		var iteratorClose = requireIteratorClose();

		// call something on iterator step with safe closing on error
		callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
		  try {
		    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
		  } catch (error) {
		    iteratorClose(iterator, 'throw', error);
		  }
		};
		return callWithSafeIterationClosing;
	}

	var iteratorHelperThrowsOnInvalidIterator;
	var hasRequiredIteratorHelperThrowsOnInvalidIterator;

	function requireIteratorHelperThrowsOnInvalidIterator () {
		if (hasRequiredIteratorHelperThrowsOnInvalidIterator) return iteratorHelperThrowsOnInvalidIterator;
		hasRequiredIteratorHelperThrowsOnInvalidIterator = 1;
		// Should throw an error on invalid iterator
		// https://issues.chromium.org/issues/336839115
		iteratorHelperThrowsOnInvalidIterator = function (methodName, argument) {
		  // eslint-disable-next-line es/no-iterator -- required for testing
		  var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
		  if (method) try {
		    method.call({ next: null }, argument).next();
		  } catch (error) {
		    return true;
		  }
		};
		return iteratorHelperThrowsOnInvalidIterator;
	}

	var hasRequiredEs_iterator_filter;

	function requireEs_iterator_filter () {
		if (hasRequiredEs_iterator_filter) return es_iterator_filter;
		hasRequiredEs_iterator_filter = 1;
		var $ = require_export();
		var call = requireFunctionCall();
		var aCallable = requireACallable();
		var anObject = requireAnObject();
		var getIteratorDirect = requireGetIteratorDirect();
		var createIteratorProxy = requireIteratorCreateProxy();
		var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
		var IS_PURE = requireIsPure();
		var iteratorClose = requireIteratorClose();
		var iteratorHelperThrowsOnInvalidIterator = requireIteratorHelperThrowsOnInvalidIterator();
		var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();

		var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('filter', function () { /* empty */ });
		var filterWithoutClosingOnEarlyError = !IS_PURE && !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR
		  && iteratorHelperWithoutClosingOnEarlyError('filter', TypeError);

		var FORCED = IS_PURE || FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;

		var IteratorProxy = createIteratorProxy(function () {
		  var iterator = this.iterator;
		  var predicate = this.predicate;
		  var next = this.next;
		  var result, done, value;
		  while (true) {
		    result = anObject(call(next, iterator));
		    done = this.done = !!result.done;
		    if (done) return;
		    value = result.value;
		    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
		  }
		});

		// `Iterator.prototype.filter` method
		// https://tc39.es/ecma262/#sec-iterator.prototype.filter
		$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
		  filter: function filter(predicate) {
		    anObject(this);
		    try {
		      aCallable(predicate);
		    } catch (error) {
		      iteratorClose(this, 'throw', error);
		    }

		    if (filterWithoutClosingOnEarlyError) return call(filterWithoutClosingOnEarlyError, this, predicate);

		    return new IteratorProxy(getIteratorDirect(this), {
		      predicate: predicate
		    });
		  }
		});
		return es_iterator_filter;
	}

	var hasRequiredEsnext_iterator_filter;

	function requireEsnext_iterator_filter () {
		if (hasRequiredEsnext_iterator_filter) return esnext_iterator_filter;
		hasRequiredEsnext_iterator_filter = 1;
		// TODO: Remove from `core-js@4`
		requireEs_iterator_filter();
		return esnext_iterator_filter;
	}

	requireEsnext_iterator_filter();

	var esnext_iterator_map = {};

	var es_iterator_map = {};

	var hasRequiredEs_iterator_map;

	function requireEs_iterator_map () {
		if (hasRequiredEs_iterator_map) return es_iterator_map;
		hasRequiredEs_iterator_map = 1;
		var $ = require_export();
		var call = requireFunctionCall();
		var aCallable = requireACallable();
		var anObject = requireAnObject();
		var getIteratorDirect = requireGetIteratorDirect();
		var createIteratorProxy = requireIteratorCreateProxy();
		var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
		var iteratorClose = requireIteratorClose();
		var iteratorHelperThrowsOnInvalidIterator = requireIteratorHelperThrowsOnInvalidIterator();
		var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();
		var IS_PURE = requireIsPure();

		var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('map', function () { /* empty */ });
		var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
		  && iteratorHelperWithoutClosingOnEarlyError('map', TypeError);

		var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;

		var IteratorProxy = createIteratorProxy(function () {
		  var iterator = this.iterator;
		  var result = anObject(call(this.next, iterator));
		  var done = this.done = !!result.done;
		  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
		});

		// `Iterator.prototype.map` method
		// https://tc39.es/ecma262/#sec-iterator.prototype.map
		$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
		  map: function map(mapper) {
		    anObject(this);
		    try {
		      aCallable(mapper);
		    } catch (error) {
		      iteratorClose(this, 'throw', error);
		    }

		    if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);

		    return new IteratorProxy(getIteratorDirect(this), {
		      mapper: mapper
		    });
		  }
		});
		return es_iterator_map;
	}

	var hasRequiredEsnext_iterator_map;

	function requireEsnext_iterator_map () {
		if (hasRequiredEsnext_iterator_map) return esnext_iterator_map;
		hasRequiredEsnext_iterator_map = 1;
		// TODO: Remove from `core-js@4`
		requireEs_iterator_map();
		return esnext_iterator_map;
	}

	requireEsnext_iterator_map();

	var esnext_iterator_reduce = {};

	var es_iterator_reduce = {};

	var hasRequiredEs_iterator_reduce;

	function requireEs_iterator_reduce () {
		if (hasRequiredEs_iterator_reduce) return es_iterator_reduce;
		hasRequiredEs_iterator_reduce = 1;
		var $ = require_export();
		var iterate = requireIterate();
		var aCallable = requireACallable();
		var anObject = requireAnObject();
		var getIteratorDirect = requireGetIteratorDirect();
		var iteratorClose = requireIteratorClose();
		var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();
		var apply = requireFunctionApply();
		var fails = requireFails();

		var $TypeError = TypeError;

		// https://bugs.webkit.org/show_bug.cgi?id=291651
		var FAILS_ON_INITIAL_UNDEFINED = fails(function () {
		  // eslint-disable-next-line es/no-iterator-prototype-reduce, es/no-array-prototype-keys, array-callback-return -- required for testing
		  [].keys().reduce(function () { /* empty */ }, undefined);
		});

		var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError('reduce', $TypeError);

		// `Iterator.prototype.reduce` method
		// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
		$({ target: 'Iterator', proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
		  reduce: function reduce(reducer /* , initialValue */) {
		    anObject(this);
		    try {
		      aCallable(reducer);
		    } catch (error) {
		      iteratorClose(this, 'throw', error);
		    }

		    var noInitial = arguments.length < 2;
		    var accumulator = noInitial ? undefined : arguments[1];
		    if (reduceWithoutClosingOnEarlyError) {
		      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
		    }
		    var record = getIteratorDirect(this);
		    var counter = 0;
		    iterate(record, function (value) {
		      if (noInitial) {
		        noInitial = false;
		        accumulator = value;
		      } else {
		        accumulator = reducer(accumulator, value, counter);
		      }
		      counter++;
		    }, { IS_RECORD: true });
		    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
		    return accumulator;
		  }
		});
		return es_iterator_reduce;
	}

	var hasRequiredEsnext_iterator_reduce;

	function requireEsnext_iterator_reduce () {
		if (hasRequiredEsnext_iterator_reduce) return esnext_iterator_reduce;
		hasRequiredEsnext_iterator_reduce = 1;
		// TODO: Remove from `core-js@4`
		requireEs_iterator_reduce();
		return esnext_iterator_reduce;
	}

	requireEsnext_iterator_reduce();

	var es_string_trim = {};

	var whitespaces;
	var hasRequiredWhitespaces;

	function requireWhitespaces () {
		if (hasRequiredWhitespaces) return whitespaces;
		hasRequiredWhitespaces = 1;
		// a string of all valid unicode whitespaces
		whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
		  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
		return whitespaces;
	}

	var stringTrim;
	var hasRequiredStringTrim;

	function requireStringTrim () {
		if (hasRequiredStringTrim) return stringTrim;
		hasRequiredStringTrim = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var toString = requireToString();
		var whitespaces = requireWhitespaces();

		var replace = uncurryThis(''.replace);
		var ltrim = RegExp('^[' + whitespaces + ']+');
		var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

		// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
		var createMethod = function (TYPE) {
		  return function ($this) {
		    var string = toString(requireObjectCoercible($this));
		    if (TYPE & 1) string = replace(string, ltrim, '');
		    if (TYPE & 2) string = replace(string, rtrim, '$1');
		    return string;
		  };
		};

		stringTrim = {
		  // `String.prototype.{ trimLeft, trimStart }` methods
		  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
		  start: createMethod(1),
		  // `String.prototype.{ trimRight, trimEnd }` methods
		  // https://tc39.es/ecma262/#sec-string.prototype.trimend
		  end: createMethod(2),
		  // `String.prototype.trim` method
		  // https://tc39.es/ecma262/#sec-string.prototype.trim
		  trim: createMethod(3)
		};
		return stringTrim;
	}

	var stringTrimForced;
	var hasRequiredStringTrimForced;

	function requireStringTrimForced () {
		if (hasRequiredStringTrimForced) return stringTrimForced;
		hasRequiredStringTrimForced = 1;
		var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
		var fails = requireFails();
		var whitespaces = requireWhitespaces();

		var non = '\u200B\u0085\u180E';

		// check that a method works with the correct list
		// of whitespaces and has a correct name
		stringTrimForced = function (METHOD_NAME) {
		  return fails(function () {
		    return !!whitespaces[METHOD_NAME]()
		      || non[METHOD_NAME]() !== non
		      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
		  });
		};
		return stringTrimForced;
	}

	var hasRequiredEs_string_trim;

	function requireEs_string_trim () {
		if (hasRequiredEs_string_trim) return es_string_trim;
		hasRequiredEs_string_trim = 1;
		var $ = require_export();
		var $trim = requireStringTrim().trim;
		var forcedStringTrimMethod = requireStringTrimForced();

		// `String.prototype.trim` method
		// https://tc39.es/ecma262/#sec-string.prototype.trim
		$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
		  trim: function trim() {
		    return $trim(this);
		  }
		});
		return es_string_trim;
	}

	requireEs_string_trim();

	var es_array_flat = {};

	var flattenIntoArray_1;
	var hasRequiredFlattenIntoArray;

	function requireFlattenIntoArray () {
		if (hasRequiredFlattenIntoArray) return flattenIntoArray_1;
		hasRequiredFlattenIntoArray = 1;
		var isArray = requireIsArray();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
		var bind = requireFunctionBindContext();

		// `FlattenIntoArray` abstract operation
		// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
		var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
		  var targetIndex = start;
		  var sourceIndex = 0;
		  var mapFn = mapper ? bind(mapper, thisArg) : false;
		  var element, elementLen;

		  while (sourceIndex < sourceLen) {
		    if (sourceIndex in source) {
		      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

		      if (depth > 0 && isArray(element)) {
		        elementLen = lengthOfArrayLike(element);
		        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
		      } else {
		        doesNotExceedSafeInteger(targetIndex + 1);
		        target[targetIndex] = element;
		      }

		      targetIndex++;
		    }
		    sourceIndex++;
		  }
		  return targetIndex;
		};

		flattenIntoArray_1 = flattenIntoArray;
		return flattenIntoArray_1;
	}

	var isConstructor;
	var hasRequiredIsConstructor;

	function requireIsConstructor () {
		if (hasRequiredIsConstructor) return isConstructor;
		hasRequiredIsConstructor = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var isCallable = requireIsCallable();
		var classof = requireClassof();
		var getBuiltIn = requireGetBuiltIn();
		var inspectSource = requireInspectSource();

		var noop = function () { /* empty */ };
		var construct = getBuiltIn('Reflect', 'construct');
		var constructorRegExp = /^\s*(?:class|function)\b/;
		var exec = uncurryThis(constructorRegExp.exec);
		var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

		var isConstructorModern = function isConstructor(argument) {
		  if (!isCallable(argument)) return false;
		  try {
		    construct(noop, [], argument);
		    return true;
		  } catch (error) {
		    return false;
		  }
		};

		var isConstructorLegacy = function isConstructor(argument) {
		  if (!isCallable(argument)) return false;
		  switch (classof(argument)) {
		    case 'AsyncFunction':
		    case 'GeneratorFunction':
		    case 'AsyncGeneratorFunction': return false;
		  }
		  try {
		    // we can't check .prototype since constructors produced by .bind haven't it
		    // `Function#toString` throws on some built-it function in some legacy engines
		    // (for example, `DOMQuad` and similar in FF41-)
		    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
		  } catch (error) {
		    return true;
		  }
		};

		isConstructorLegacy.sham = true;

		// `IsConstructor` abstract operation
		// https://tc39.es/ecma262/#sec-isconstructor
		isConstructor = !construct || fails(function () {
		  var called;
		  return isConstructorModern(isConstructorModern.call)
		    || !isConstructorModern(Object)
		    || !isConstructorModern(function () { called = true; })
		    || called;
		}) ? isConstructorLegacy : isConstructorModern;
		return isConstructor;
	}

	var arraySpeciesConstructor;
	var hasRequiredArraySpeciesConstructor;

	function requireArraySpeciesConstructor () {
		if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
		hasRequiredArraySpeciesConstructor = 1;
		var isArray = requireIsArray();
		var isConstructor = requireIsConstructor();
		var isObject = requireIsObject();
		var wellKnownSymbol = requireWellKnownSymbol();

		var SPECIES = wellKnownSymbol('species');
		var $Array = Array;

		// a part of `ArraySpeciesCreate` abstract operation
		// https://tc39.es/ecma262/#sec-arrayspeciescreate
		arraySpeciesConstructor = function (originalArray) {
		  var C;
		  if (isArray(originalArray)) {
		    C = originalArray.constructor;
		    // cross-realm fallback
		    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
		    else if (isObject(C)) {
		      C = C[SPECIES];
		      if (C === null) C = undefined;
		    }
		  } return C === undefined ? $Array : C;
		};
		return arraySpeciesConstructor;
	}

	var arraySpeciesCreate;
	var hasRequiredArraySpeciesCreate;

	function requireArraySpeciesCreate () {
		if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
		hasRequiredArraySpeciesCreate = 1;
		var arraySpeciesConstructor = requireArraySpeciesConstructor();

		// `ArraySpeciesCreate` abstract operation
		// https://tc39.es/ecma262/#sec-arrayspeciescreate
		arraySpeciesCreate = function (originalArray, length) {
		  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
		};
		return arraySpeciesCreate;
	}

	var hasRequiredEs_array_flat;

	function requireEs_array_flat () {
		if (hasRequiredEs_array_flat) return es_array_flat;
		hasRequiredEs_array_flat = 1;
		var $ = require_export();
		var flattenIntoArray = requireFlattenIntoArray();
		var toObject = requireToObject();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var toIntegerOrInfinity = requireToIntegerOrInfinity();
		var arraySpeciesCreate = requireArraySpeciesCreate();

		// `Array.prototype.flat` method
		// https://tc39.es/ecma262/#sec-array.prototype.flat
		$({ target: 'Array', proto: true }, {
		  flat: function flat(/* depthArg = 1 */) {
		    var depthArg = arguments.length ? arguments[0] : undefined;
		    var O = toObject(this);
		    var sourceLen = lengthOfArrayLike(O);
		    var A = arraySpeciesCreate(O, 0);
		    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
		    return A;
		  }
		});
		return es_array_flat;
	}

	requireEs_array_flat();

	var es_array_unscopables_flat = {};

	var hasRequiredEs_array_unscopables_flat;

	function requireEs_array_unscopables_flat () {
		if (hasRequiredEs_array_unscopables_flat) return es_array_unscopables_flat;
		hasRequiredEs_array_unscopables_flat = 1;
		// this method was added to unscopables after implementation
		// in popular engines, so it's moved to a separate module
		var addToUnscopables = requireAddToUnscopables();

		// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
		addToUnscopables('flat');
		return es_array_unscopables_flat;
	}

	requireEs_array_unscopables_flat();

	const _logger$c = new Logger("react-util");
	function reactPropExists(element, propName) {
	  const key = Object.getOwnPropertyNames(element).find(e => e.startsWith("__reactProps"));
	  if (!key) _logger$c.error("Element has no react props:", element);
	  const reactProps = element[key];
	  return _getReactPropByName(reactProps, propName)[0];
	}
	function* recursiveComponents2(instance, element) {
	  if (instance.stateNode.containerInfo == element) yield instance;
	  if (instance.sibling) yield* recursiveComponents2(instance.sibling, element);
	  if (instance.child) yield* recursiveComponents2(instance.child, element);
	}
	function getRoot() {
	  const root = document.querySelector("#react-root");
	  const key = Object.keys(root).find(e => e.startsWith("__reactContainer"));
	  return root[key];
	}
	function getReactPropByName(element, propName) {
	  let quiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  const root = getRoot();
	  console.log(root);
	  let result = [false, null];
	  for (let component of recursiveComponents2(root, element)) {
	    result = _getReactPropByName(component.pendingProps, propName);
	    if (result[0]) break;
	    result = _getReactPropByName(component.props || [], propName);
	    if (result[0]) break;
	  }
	  if (!result[0] && !quiet) _logger$c.error("Error getting react prop \"".concat(propName, "\" from element:"), element);
	  return result[1];
	}
	function getRootReactPropByName(propName) {
	  let quiet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  const root = getRoot();
	  let result = [false, null];
	  result = _getReactPropByName(root.pendingProps, propName);
	  if (!result[0]) result = _getReactPropByName(root.props || [], propName);
	  if (!result[0] && !quiet) _logger$c.error("Error getting react prop \"".concat(propName, "\" from element:"), root);
	  return result[1];
	}
	function _getReactPropByName(reactProps, propName) {
	  const emptyResult = [false, null];
	  if (!reactProps) return emptyResult;
	  if (Object.keys(reactProps).includes(propName)) return [true, reactProps[propName]];
	  if (!reactProps.children || typeof reactProps.children == "function") return emptyResult;
	  if (!Array.isArray(reactProps.children)) return _getReactPropByName(reactProps.children.props, propName);
	  for (let e of reactProps.children.flat().filter(e => !!e) || []) {
	    const result = _getReactPropByName(e.props, propName);
	    if (result[0]) return result;
	  }
	  return emptyResult;
	}

	const _logger$b = new Logger("tweet");

	/**
	 * Gets the tweet id of a given tweet article element.
	 * @returns the if of the tweet or null if an error occurred
	 */
	function getTweetPageId() {
	  // on tweet page
	  if (document.body.dataset.pageType == "tweet") return location.pathname.replace(/.*\/status\/(\d+)/, "$1");

	  // error
	  _logger$b.error("Not on a tweet page");
	  return null;
	}
	function getTweetData(element) {
	  var tweet = getReactPropByName(element, "tweet");
	  if (tweet) return tweet;
	  _logger$b.error("Error getting tweet data from react props for element: ", element);
	  return null;
	}

	/**
	 * Re-adds the source label to tweets.
	 */
	function addSourceLabel() {
	  let tweetId = getTweetPageId();
	  waitForElements("[data-testid=tweet][tabindex=\"-1\"] [href*=\"".concat(tweetId, "\"] time"), element => {
	    var _element$parentElemen;
	    const tweet = getTweetData(element.closest("[data-testid=tweet]"));
	    if (!(tweet !== null && tweet !== void 0 && tweet.source)) {
	      _logger$b.warn("tweet with id ".concat(tweetId, " has no source label."));
	      return;
	    }
	    (_element$parentElemen = element.parentElement) === null || _element$parentElemen === void 0 || _element$parentElemen.insertAdjacentHTML("afterend", /*html*/"\n            <span class=\"gt2-tweet-source\">".concat(tweet.source, "</span>"));
	  });
	}

	/**
	 * Labels the "More Tweets" timeline elements for optional hiding.
	 */
	function labelMoreTweetsElement() {
	  let moreTweetsLocalized = getLocalizedString("moreTweets").trim();
	  waitForElements("[data-testid=cellInnerDiv] h2 span", header => {
	    if (header.innerText.match(moreTweetsLocalized)) {
	      _logger$b.debug("found more tweets header, adding label");
	      header.closest("[data-testid=cellInnerDiv]").classList.add("gt2-timeline-elem-more-tweets-header");
	    }
	  });
	}

	/**
	 * Scrolls up to make up for the added navbar height.
	 */
	function scrollTweetUp(amount) {
	  waitForElements("[data-testid=tweet][tabindex=\"-1\"] > :nth-child(1)", () => {
	    window.scroll(0, window.scrollY - amount);
	    _logger$b.debug("scrolled up ".concat(amount, "px to make up for the added navbar height"));
	  });
	}

	var NotificationsActiveSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M12 2C7.93 2 4.51 5.02 4 9.05L2.87 18H7.1c.46 2.28 2.48 4 4.9 4s4.44-1.72 4.9-4h4.24l-.64-5h-2.02l.38 3H5.13l.85-6.7C6.36 6.27 8.94 4 12 4V2zm0 18c-1.31 0-2.42-.83-2.83-2h5.66c-.41 1.17-1.52 2-2.83 2zm.3-12.29l1.41-1.42 1.76 1.76 4.29-4.72 1.48 1.34-5.7 6.28-3.24-3.24z\"/>\r\n    </g>\r\n</svg>\r\n";

	var NotificationAddSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-.86 13h-4.241c-.464 2.281-2.482 4-4.899 4s-4.435-1.719-4.899-4H2.87L4 9.05C4.51 5.02 7.93 2 12 2v2C8.94 4 6.36 6.27 5.98 9.3L5.13 16h13.73l-.38-3h2.02l.64 5zm-6.323 0H9.183c.412 1.164 1.51 2 2.817 2s2.405-.836 2.817-2z\"/>\r\n    </g>\r\n</svg>\r\n";

	const _logger$a = new Logger("style");

	/**
	 * Entry function for all style adjustments.
	 */
	function initializeStyle() {
	  // user color
	  waitForElements("header [href=\"/compose/tweet\"]", e => {
	    let bgColor = getComputedStyle(e).backgroundColor.replace(/rgb\((.*)\)/, "$1");
	    document.documentElement.style.setProperty("--color-raw-accent-normal", bgColor);
	    _logger$a.debug("set --color-raw-accent-normal to \"".concat(bgColor, "\""));
	  }, {
	    waitOnce: false
	  });

	  // font size
	  watchForElementChanges("html[style*=\"font-size\"]", e => {
	    let fontSize = e.style.fontSize;
	    let fontSizeCurrent = document.documentElement.style.getPropertyValue("--font-size");
	    if (fontSize != fontSizeCurrent) {
	      document.documentElement.style.setProperty("--font-size", fontSize);
	      _logger$a.debug("set --font-size to \"".concat(fontSize, "\""));
	    }
	  });

	  // theme from last time
	  setTheme(GM_getValue(GM_KEYS.THEME, "dim"));

	  // theme current
	  if (isLoggedIn()) {
	    waitForElements("[data-testid=SideNav_AccountSwitcher_Button] [style*=color]:not([style*=background-color]):first-child:last-child", handle => {
	      getComputedStyle(handle).color;
	      getComputedStyle(document.body).backgroundColor;
	    }, {
	      waitOnce: false
	    });
	  }

	  // not logged in
	  else {
	    if (document.cookie.match(/night_mode=1/)) ;else if (document.cookie.match(/night_mode=2/)) ;else ;
	  }

	  // scrollbar width
	  let scrollbarWidth = getScrollbarWidth();
	  document.documentElement.style.setProperty("--scrollbar-width", "".concat(scrollbarWidth, "px"));
	  _logger$a.debug("set --scrollbar-width to \"".concat(scrollbarWidth, "px\""));

	  // @option fontOverride
	  if (Settings.get("fontOverride")) {
	    let fontOverride = Settings.get("fontOverrideValue");
	    document.documentElement.style.setProperty("--font-family-override", fontOverride);
	    _logger$a.debug("set --font-family-override to \"".concat(fontOverride, "\""));
	  }

	  // @option colorOverride
	  if (Settings.get("colorOverride")) {
	    let colorOverride = Settings.get("colorOverrideValue");
	    document.documentElement.style.setProperty("--color-raw-accent-override", colorOverride);
	    _logger$a.debug("set --color-raw-accent-override to \"".concat(colorOverride, "\""));
	  }

	  // add stylesheet
	  GM_addStyle(GM_getResourceText(RESOURCE.CSS)).classList.add("gt2-style");
	  _logger$a.debug("added stylesheet");

	  // additional rules
	  setAdditionalStyleRules();
	}

	/**
	 * Get the current scrollbar width.
	 * Reference: https://stackoverflow.com/q/8079187
	 * @returns the width of the scrollbar
	 */
	function getScrollbarWidth() {
	  if (document.documentElement.dataset.hasOwnProperty("minimalscrollbar")) {
	    return 0;
	  }
	  let div = document.createElement("div");
	  div.style.setProperty("overflow-x", "hidden");
	  div.style.setProperty("overflow-y", "scroll");
	  div.style.setProperty("position", "absolute");
	  div.style.setProperty("top", "-100px");
	  document.body.appendChild(div);
	  let out = div.offsetWidth - div.clientWidth;
	  document.body.removeChild(div);
	  return out;
	}

	/**
	 * Sets a theme.
	 * @param theme theme to set
	 */
	function setTheme(theme) {
	  // TODO not needed anymore except for high contrast cases
	  // document.documentElement.dataset.theme = theme
	  // _logger.debug(`set theme to ${theme}`)
	  // GM_setValue(GM_KEYS.THEME, theme)
	}

	/**
	 * Hides follow suggestions.
	 * @option hideFollowSuggestions
	 */
	function hideFollowSuggestions() {
	  // helper function
	  function hideFromTimeline(div) {
	    if (!div) return div;
	    if (div.previousElementSibling) {
	      div = div.previousElementSibling;
	      if (div.querySelector("article")) return;
	      div.classList.add("gt2-hidden");
	    } else {
	      // if (window.scrollY < 500) return
	      setTimeout(() => {
	        div = hideFromTimeline(div);
	      }, 100);
	    }
	    return div;
	  }
	  let selector = ["connect_people", "topics/picker", "lists/suggested"].filter((_e, i) => {
	    return (Settings.get("hideFollowSuggestionsTimelineSel") & Math.pow(2, i)) == Math.pow(2, i);
	  }).map(e => "[data-testid=primaryColumn] section [href^=\"/i/".concat(e, "\"]")).join(", ");
	  waitForElements(selector, e => {
	    var _div, _div2;
	    let div = e.closest("[data-testid=cellInnerDiv]");
	    (_div = div) === null || _div === void 0 || (_div = _div.classList) === null || _div === void 0 || _div.add("gt2-hidden");
	    if ((_div2 = div) !== null && _div2 !== void 0 && (_div2 = _div2.nextElementSibling) !== null && _div2 !== void 0 && _div2.querySelector("div > div:empty")) {
	      div.nextElementSibling.classList.add("gt2-hidden");
	    }
	    for (let i = 0; i < 6; i++) {
	      div = hideFromTimeline(div);
	    }
	  });

	  // profile page (Who to follow / Suggested)
	  if ((Settings.get("hideFollowSuggestionsProfileSel") & 1) == 1) {
	    waitForElements("a[href$=\"/header_photo\"] ~ [style=\"\"] aside [data-testid=UserCell]:nth-child(1)", e => {
	      e.closest("[style=\"\"]").classList.add("gt2-hidden");
	    });
	  }
	}

	/**
	 * Shows media with content warnings.
	 * @option showMediaWithContentWarnings
	 */
	function showMediaWithContentWarnings() {
	  const selector = "\n        [data-testid=tweet] [href^=\"/\"][href*=\"/photo/1\"] [data-testid=tweetPhoto],\n        [data-testid=tweet] [data-testid=previewInterstitial]";
	  waitForElements(selector, e => {
	    let tweetArticle = e.closest("[data-testid=tweet]");
	    let opt = Settings.get("showMediaWithContentWarningsSel");
	    if (tweetArticle.querySelector("[d^=\"M3.693 21.707l-1.414-1.414 2.429-2.429c-2.479-2.421-3.606-5.376-3.658-5.513l-.131-.\"]")) {
	      const tweet = getTweetData(tweetArticle);
	      if (!tweet) return;
	      let score = tweet.extended_entities.media.filter(e => e.hasOwnProperty("sensitive_media_warning")).map(m => {
	        return ["adult_content", "graphic_violence", "other"].reduce((p, c, i) => {
	          return p + (m.sensitive_media_warning[c] ? Math.pow(2, i) : 0);
	        }, 0);
	      }).reduce((p, c) => p | c);
	      _logger$a.debug("got content warning. tweet id: ".concat(tweet.id_str, ", opt: ").concat(opt, " score: ").concat(score));
	      if ((score & opt) == score) {
	        tweetArticle.setAttribute("data-gt2-show-media", "1");
	      }
	    }
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Sets additional style rules.
	 * Mostly based on user specified options.
	 */
	function setAdditionalStyleRules() {
	  // @option hideMessageBox: minimize DMDrawer
	  if (Settings.get("hideMessageBox")) {
	    waitForElements("[data-testid=DMDrawer] path[d^=\"M12 19.344l-8.72\"]", e => {
	      let button = e.closest("[role=button]");
	      if (button) {
	        button.click();
	        _logger$a.debug("minimized DMDrawer");
	      }
	    });
	  }

	  // @option disableHexagonAvatars
	  if (Settings.get("disableHexagonAvatars")) {
	    waitForElements("#shape-hex path", e => {
	      let parent = e.parentElement;
	      parent.innerHTML = Settings.get("squareAvatars") ? /*html*/"<rect cx=\"100\" cy=\"100\" ry=\"10\" rx=\"10\" width=\"200\" height=\"200\"></rect>" : /*html*/"<circle cx=\"100\" cy=\"100\" r=\"100\" />";
	      parent.setAttribute("transform", "scale(0.005 0.005)");
	    });
	  }

	  // @option hideFollowSuggestions
	  if (Settings.get("hideFollowSuggestions")) {
	    hideFollowSuggestions();
	  }

	  // @option showMediaWithContentWarnings
	  if (Settings.get("showMediaWithContentWarnings") && Settings.get("showMediaWithContentWarningsSel") < 7) {
	    showMediaWithContentWarnings();
	  }

	  // @option colorOverride: ignore reply/like/retweet/share on tweets
	  waitForElements("[data-testid=tweet] [role=group] [role=button] *", e => {
	    e.setAttribute("data-gt2-color-override-ignore", "");
	  });

	  // @option colorOverride: ignore verified badge
	  waitForElements("path[d^=\"M22.5 12.5c0-1.58-.875\"]", e => {
	    e.closest("svg").setAttribute("data-gt2-color-override-ignore", "");
	  });

	  // @option colorOverride: ignore pickers at display settings page
	  waitForElements("[data-gt2-path=\"i/display\"] div:nth-last-child(2) > div > [role=radiogroup],\n                      [data-gt2-path=\"settings/display\"] div:nth-last-child(2) > div > [role=radiogroup]", e => {
	    let aria = e.closest("[aria-labelledby]");

	    // font size
	    aria === null || aria === void 0 || aria.querySelectorAll("[dir]:nth-child(3) + div:not([dir]) > div > div > div[dir] + div *").forEach(e => e.setAttribute("data-gt2-color-override-ignore", ""));

	    // color picker
	    aria === null || aria === void 0 || aria.querySelectorAll("[name*=COLOR_PICKER]").forEach(e => {
	      var _e$closest;
	      (_e$closest = e.closest("label")) === null || _e$closest === void 0 || _e$closest.querySelectorAll("*").forEach(e => e.setAttribute("data-gt2-color-override-ignore", ""));
	    });
	  });

	  // do not add dividers to tweet inline threads
	  waitForElements("[data-testid=cellInnerDiv] article,\n                      [data-testid=cellInnerDiv] a[href^=\"/i/status/\"]", e => {
	    var _e$closest2;
	    Array.from(((_e$closest2 = e.closest("[data-testid=cellInnerDiv]")) === null || _e$closest2 === void 0 ? void 0 : _e$closest2.children) || []).forEach(e => e.setAttribute("data-gt2-divider-add-ignore", ""));
	  });

	  // color notifications bell (activated)
	  waitForElements(getSvgSelector(NotificationsActiveSvg), e => {
	    var _e$closest3;
	    (_e$closest3 = e.closest("[role=button]")) === null || _e$closest3 === void 0 || _e$closest3.setAttribute("data-gt2-bell-full-color", "");
	  });

	  // color notifications bell (deactivated)
	  waitForElements(getSvgSelector(NotificationAddSvg), e => {
	    var _e$closest4;
	    (_e$closest4 = e.closest("[role=button]")) === null || _e$closest4 === void 0 || _e$closest4.removeAttribute("data-gt2-bell-full-color");
	  });
	}

	var es_json_stringify = {};

	var arraySlice;
	var hasRequiredArraySlice;

	function requireArraySlice () {
		if (hasRequiredArraySlice) return arraySlice;
		hasRequiredArraySlice = 1;
		var uncurryThis = requireFunctionUncurryThis();

		arraySlice = uncurryThis([].slice);
		return arraySlice;
	}

	var getJsonReplacerFunction;
	var hasRequiredGetJsonReplacerFunction;

	function requireGetJsonReplacerFunction () {
		if (hasRequiredGetJsonReplacerFunction) return getJsonReplacerFunction;
		hasRequiredGetJsonReplacerFunction = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var isArray = requireIsArray();
		var isCallable = requireIsCallable();
		var classof = requireClassofRaw();
		var toString = requireToString();

		var push = uncurryThis([].push);

		getJsonReplacerFunction = function (replacer) {
		  if (isCallable(replacer)) return replacer;
		  if (!isArray(replacer)) return;
		  var rawLength = replacer.length;
		  var keys = [];
		  for (var i = 0; i < rawLength; i++) {
		    var element = replacer[i];
		    if (typeof element == 'string') push(keys, element);
		    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
		  }
		  var keysLength = keys.length;
		  var root = true;
		  return function (key, value) {
		    if (root) {
		      root = false;
		      return value;
		    }
		    if (isArray(this)) return value;
		    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
		  };
		};
		return getJsonReplacerFunction;
	}

	var hasRequiredEs_json_stringify;

	function requireEs_json_stringify () {
		if (hasRequiredEs_json_stringify) return es_json_stringify;
		hasRequiredEs_json_stringify = 1;
		var $ = require_export();
		var getBuiltIn = requireGetBuiltIn();
		var apply = requireFunctionApply();
		var call = requireFunctionCall();
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var isCallable = requireIsCallable();
		var isSymbol = requireIsSymbol();
		var arraySlice = requireArraySlice();
		var getReplacerFunction = requireGetJsonReplacerFunction();
		var NATIVE_SYMBOL = requireSymbolConstructorDetection();

		var $String = String;
		var $stringify = getBuiltIn('JSON', 'stringify');
		var exec = uncurryThis(/./.exec);
		var charAt = uncurryThis(''.charAt);
		var charCodeAt = uncurryThis(''.charCodeAt);
		var replace = uncurryThis(''.replace);
		var numberToString = uncurryThis(1.1.toString);

		var tester = /[\uD800-\uDFFF]/g;
		var low = /^[\uD800-\uDBFF]$/;
		var hi = /^[\uDC00-\uDFFF]$/;

		var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
		  var symbol = getBuiltIn('Symbol')('stringify detection');
		  // MS Edge converts symbol values to JSON as {}
		  return $stringify([symbol]) !== '[null]'
		    // WebKit converts symbol values to JSON as null
		    || $stringify({ a: symbol }) !== '{}'
		    // V8 throws on boxed symbols
		    || $stringify(Object(symbol)) !== '{}';
		});

		// https://github.com/tc39/proposal-well-formed-stringify
		var ILL_FORMED_UNICODE = fails(function () {
		  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
		    || $stringify('\uDEAD') !== '"\\udead"';
		});

		var stringifyWithSymbolsFix = function (it, replacer) {
		  var args = arraySlice(arguments);
		  var $replacer = getReplacerFunction(replacer);
		  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
		  args[1] = function (key, value) {
		    // some old implementations (like WebKit) could pass numbers as keys
		    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
		    if (!isSymbol(value)) return value;
		  };
		  return apply($stringify, null, args);
		};

		var fixIllFormed = function (match, offset, string) {
		  var prev = charAt(string, offset - 1);
		  var next = charAt(string, offset + 1);
		  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
		    return '\\u' + numberToString(charCodeAt(match, 0), 16);
		  } return match;
		};

		if ($stringify) {
		  // `JSON.stringify` method
		  // https://tc39.es/ecma262/#sec-json.stringify
		  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
		    // eslint-disable-next-line no-unused-vars -- required for `.length`
		    stringify: function stringify(it, replacer, space) {
		      var args = arraySlice(arguments);
		      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
		      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
		    }
		  });
		}
		return es_json_stringify;
	}

	requireEs_json_stringify();

	const _logger$9 = new Logger("request");

	/**
	 * Gets the default request headers.
	 * @param additionalHeaders additional headers to add
	 * @returns valid request headers object, to be used for API calls
	 */
	function getRequestHeaders(additionalHeaders) {
	  let csrf = document.cookie.match(/ct0=([^;]+)(;|$)/)[1];
	  return Object.assign({
	    authorization: "Bearer ".concat(PUBLIC_BEARER),
	    origin: "https://twitter.com",
	    referer: location.href,
	    "x-twitter-client-language": getLanguage(),
	    "x-csrf-token": csrf,
	    "x-twitter-active-user": "yes"
	    // "x-twitter-auth-type": "OAuth2Session"
	  }, additionalHeaders);
	}

	/**
	 * Gets the translation of tweet.
	 * @param tweetId the id of the tweet
	 * @param callback the function to execute on success
	 */
	function getTweetTranslation(tweetId, callback) {
	  if (typeof tweetId != "string" || tweetId == "") {
	    _logger$9.error("getTweetTranslation: given tweetId \"".concat(tweetId, "\" is invalid."));
	    return;
	  }
	  let urlEnd = Object.entries({
	    tweetId: tweetId,
	    destinationLanguage: "None",
	    translationSource: "Some(Google)",
	    feature: "None",
	    timeout: "None",
	    onlyCached: "None/translation/service/translateTweet"
	  }).map(e => "".concat(e[0], "=").concat(e[1])).join(",");
	  GM_xmlhttpRequest({
	    method: "GET",
	    url: "https://twitter.com/i/api/1.1/strato/column/None/".concat(urlEnd),
	    headers: getRequestHeaders({
	      referer: "https://twitter.com/i/status/".concat(tweetId)
	    }),
	    onload: function onload(res) {
	      if (res.status == 200) {
	        callback(JSON.parse(res.response));
	      } else {
	        _logger$9.error("Error occurred while translating.", res);
	      }
	    }
	  });
	}

	/**
	 * Gets the translation of a profile description
	 * @param userId the id of the user profile
	 * @param callback the function execute on success
	 */
	function getProfileTranslation(userId, callback) {
	  {
	    _logger$9.error("getProfileTranslation: given userId \"".concat(userId, "\" is invalid."));
	    return;
	  }
	}

	var GoogleSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 74 24\">\r\n    <g>\r\n        <path d=\"M9.827 17.667c-4.82 0-8.873-3.927-8.873-8.747S5.007.173 9.827.173c2.667 0 4.567 1.047 5.993 2.413l-1.687 1.687c-1.027-.96-2.413-1.707-4.307-1.707-3.52 0-6.273 2.84-6.273 6.36s2.753 6.36 6.273 6.36c2.28 0 3.587-.92 4.413-1.747.68-.68 1.132-1.668 1.3-3.008H10v-2.4h7.873c.087.428.127.935.127 1.495 0 1.793-.493 4.013-2.067 5.587-1.54 1.6-3.5 2.453-6.106 2.453zm20.806-5.627c0 3.24-2.533 5.633-5.633 5.633-3.107 0-5.633-2.387-5.633-5.633 0-3.267 2.527-5.633 5.633-5.633 3.1.006 5.633 2.373 5.633 5.633zm-2.466 0c0-2.027-1.467-3.413-3.167-3.413-1.7 0-3.167 1.387-3.167 3.413 0 2.007 1.467 3.413 3.167 3.413 1.7 0 3.167-1.406 3.167-3.413zm15.133-.007c0 3.24-2.527 5.633-5.633 5.633s-5.633-2.387-5.633-5.633c0-3.267 2.527-5.633 5.633-5.633S43.3 8.773 43.3 12.033zm-2.467 0c0-2.027-1.467-3.413-3.167-3.413S34.5 10.007 34.5 12.033c0 2.007 1.467 3.413 3.167 3.413s3.166-1.406 3.166-3.413zm14.5-5.286V16.86c0 4.16-2.453 5.867-5.353 5.867-2.733 0-4.373-1.833-4.993-3.327l2.153-.893c.387.92 1.32 2.007 2.84 2.007 1.853 0 3.007-1.153 3.007-3.307v-.813H52.9c-.553.68-1.62 1.28-2.967 1.28-2.813 0-5.267-2.453-5.267-5.613 0-3.18 2.453-5.652 5.267-5.652 1.347 0 2.413.6 2.967 1.26h.087v-.92h2.346zm-2.173 5.306c0-1.987-1.32-3.433-3.007-3.433-1.707 0-3.007 1.453-3.007 3.433 0 1.96 1.3 3.393 3.007 3.393 1.68 0 3.007-1.426 3.007-3.393zM59.807.78v16.553h-2.473V.78h2.473zm9.886 13.113l1.92 1.28c-.62.92-2.113 2.493-4.693 2.493-3.2 0-5.587-2.473-5.587-5.633 0-3.347 2.413-5.633 5.313-5.633 2.92 0 4.353 2.327 4.82 3.587l.253.64-7.534 3.113c.573 1.133 1.473 1.707 2.733 1.707s2.133-.62 2.773-1.554zm-5.906-2.026l5.033-2.093c-.28-.707-1.107-1.193-2.093-1.193-1.254 0-3.007 1.107-2.94 3.287z\"/>\r\n    </g>\r\n</svg>\r\n";

	const _logger$8 = new Logger("location.page");

	/**
	 * Checks if the current location is in a given path object.
	 * @param path the path to check
	 * @param level internal path level
	 * @returns true if the current location is in the given path object
	 */
	function onPage(path) {
	  let level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  let pathSplit = location.pathname.split("/");
	  pathSplit.shift();

	  // given path is too deep
	  if (pathSplit.length < level) return false;
	  let pathCurrent = pathSplit[level];

	  // path is an array
	  if (Array.isArray(path)) {
	    for (const sub of path) {
	      // single string
	      if (typeof sub == "string" && (pathCurrent == sub || sub == "*")) return true;
	      // another path object
	      else if (typeof sub != "string" && onPage(sub, level)) return true;
	    }
	  }

	  // path object
	  else {
	    for (const [top, sub] of Object.entries(path)) {
	      if ((pathCurrent == top || top == "*") && onPage(sub, level + 1)) return true;
	    }
	  }
	  return false;
	}

	/**
	 * Checks whether the current location is a modal page.
	 * @returns true if the current location is a modal page
	 */
	function onModal() {
	  return onPage(MODAL_PAGES) || location.pathname.match(/\/(photo|video)\/\d\/?$/) != null;
	}

	/**
	 * Navigates to a url using the RichHistory prop.
	 *
	 * Falls back to normal History.pushState if RichHistory was not found.
	 * @param url the url to navigate to
	 */
	function navigate(url) {
	  const richHistory = getRootReactPropByName("history");
	  if (richHistory) {
	    richHistory === null || richHistory === void 0 || richHistory.push({
	      pathname: url
	    });
	  } else {
	    window.history.pushState(null, null, url);
	  }
	}

	/**
	 * Adds a link handler to an element for soft navigation
	 * @param element the element to add the handler to
	 * @param url the url to navigate to. leave out if element is an anchor
	 */
	function addLinkClickHandler(element, url) {
	  if (!url) {
	    if (element.nodeName != "A") {
	      _logger$8.error("Cannot add link handler to an element without a provided link", element);
	      return;
	    }
	    url = element.getAttribute("href");
	  }
	  _logger$8.debug("adding click handler to element", element);
	  element.addEventListener("click", event => {
	    if (event.ctrlKey) return;
	    event.preventDefault();
	    navigate(url);
	  });
	}

	const _logger$7 = new Logger("component", "translation");

	/**
	 * Entry function for the inline translation component.
	 */
	function initializeInlineTranslation() {
	  // @option hideTranslateTweetButton
	  if (!Settings.get("hideTranslateTweetButton")) addInlineTranslateTweetButton();

	  // translate quoted tweet
	  document.body.addEventListener("click", translateTweetHandler, true);
	  // translate LPL profile
	  document.body.addEventListener("click", translateProfileHandler, true);
	  // hide translation
	  document.body.addEventListener("click", hideTranslationHandler, true);
	}

	/**
	 * Adds a "Translate Tweet" button to all tweets
	 * in languages that differ from the current display
	 * language.
	 */
	function addInlineTranslateTweetButton() {
	  waitForElements("[data-testid=tweet] [lang]", e => {
	    // ignore tweets that already have a translate button
	    if (e.parentElement.querySelectorAll(":scope > [role=button]").length) return;
	    let tweetLang = e.getAttribute("lang");
	    if (tweetLang != getLanguage() && tweetLang != "und") {
	      e.insertAdjacentHTML("afterend", /*html*/"\n                <div class=\"gt2-translate-tweet\">\n                    ".concat(getLocalizedString("translateTweet"), "\n                </div>"));
	      _logger$7.debug("added translate button to element: ", e);
	    }
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Handler for clicking the "Translated from <language> by <provider>"
	 * button to hide it again.
	 * @param event the mouse event
	 */
	function hideTranslationHandler(event) {
	  let target = event.target;
	  if (!target.matches(".gt2-translated-tweet-info")) return;
	  event.preventDefault();
	  target.parentElement.querySelectorAll(".gt2-translated-tweet, .gt2-translated-tweet-info").forEach(e => e.classList.add("gt2-hidden"));
	  let prev = target;
	  while ((prev = prev.previousElementSibling) != null) {
	    if (prev.matches(".gt2-translate-tweet, [role=button]")) prev.classList.remove("gt2-hidden");
	  }
	  _logger$7.debug("translation hidden", target);
	}

	/**
	 * Handler for clicking a "Translate tweet" button.
	 * @param event the mouse event
	 */
	function translateTweetHandler(event) {
	  var _target$closest;
	  let target = event.target;
	  if (!target.matches(".gt2-translate-tweet")) return;
	  event.preventDefault();

	  // already translated
	  if (target.parentElement.querySelector(".gt2-translated-tweet")) {
	    target.classList.add("gt2-hidden");
	    target.parentElement.querySelectorAll(".gt2-translated-tweet, .gt2-translated-tweet-info").forEach(e => e.classList.remove("gt2-hidden"));
	    _logger$7.debug("translation shown", target);
	    return;
	  }
	  let isQuotedTweet = (target === null || target === void 0 || (_target$closest = target.closest("div[aria-labelledby]")) === null || _target$closest === void 0 ? void 0 : _target$closest.closest("article[data-testid=tweet]")) != null;
	  const tweet = getTweetData(target.closest("article[data-testid=tweet]"));
	  if (!tweet) return;

	  // quoted tweet
	  if (isQuotedTweet) {
	    _logger$7.debug("translating quoted tweet...");
	    getTweetTranslation(tweet.quoted_status.id_str, response => onTweetTranslationRequest(target, response));
	  }

	  // normal tweet
	  else {
	    _logger$7.debug("translating normal tweet...");
	    getTweetTranslation(tweet.id_str, response => onTweetTranslationRequest(target, response));
	  }
	}

	/**
	 * Callback function for tweet translation requests.
	 * @param target the target element
	 * @param response the API response
	 */
	function onTweetTranslationRequest(target, response) {
	  _logger$7.debug("got translation response", response);
	  let html = response.translationState == "Success" ? getTranslationHtml(response) : /*html*/"\n            <div class=\"gt2-translated-tweet-info\">Tweet translation</div>\n            <div class=\"gt2-translated-tweet\">API error translating tweet (status: ".concat(response.translationState, ")</div>");
	  target.classList.add("gt2-hidden");
	  target.insertAdjacentHTML("afterend", html);
	  target.parentElement.querySelectorAll(".gt2-translated-tweet a[href^=\"/\"]").forEach(e => addLinkClickHandler(e));
	}

	// TODO
	function translateProfileHandler(event) {
	  let target = event.target;
	  if (!target.matches(".gt2-translate-profile")) return;
	  event.preventDefault();
	  _logger$7.debug("translating profile...");
	  _logger$7.error("NOT IMPLEMENTED");
	  let userId;
	  getProfileTranslation(userId);
	}

	/**
	 * Gets a translated tweet DOM object from a translation object.
	 * @param translation tweet translation object
	 * @returns a translated tweet DOM object
	 */
	function getTranslationHtml(translation) {
	  let tl = translation.translation;
	  if (translation.entities) {
	    _logger$7.debug("adding entities to translation...");
	    tl = tl.populateWithEntities(translation.entities);
	  }
	  _logger$7.debug("replacing emojis...");
	  tl = tl.replaceEmojis();
	  let info = getLocalizedReplaceableString("translatedTweetInfo", {
	    lang: translation.localizedSourceLanguage,
	    source: translation.translationSource == "Google" ? /*html*/"<a href=\"https://translate.google.com\">\n            ".concat(GoogleSvg, "\n            </a>") : translation.translationSource
	  });
	  return /*html*/"\n        <div class=\"gt2-translated-tweet-info\">".concat(info, "</div>\n        <div class=\"gt2-translated-tweet\">").concat(tl, "</div>");
	}

	var es_string_endsWith = {};

	var hasRequiredEs_string_endsWith;

	function requireEs_string_endsWith () {
		if (hasRequiredEs_string_endsWith) return es_string_endsWith;
		hasRequiredEs_string_endsWith = 1;
		var $ = require_export();
		var uncurryThis = requireFunctionUncurryThisClause();
		var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
		var toLength = requireToLength();
		var toString = requireToString();
		var notARegExp = requireNotARegexp();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var correctIsRegExpLogic = requireCorrectIsRegexpLogic();
		var IS_PURE = requireIsPure();

		var slice = uncurryThis(''.slice);
		var min = Math.min;

		var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
		// https://github.com/zloirock/core-js/pull/702
		var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
		  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
		  return descriptor && !descriptor.writable;
		}();

		// `String.prototype.endsWith` method
		// https://tc39.es/ecma262/#sec-string.prototype.endswith
		$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
		  endsWith: function endsWith(searchString /* , endPosition = @length */) {
		    var that = toString(requireObjectCoercible(this));
		    notARegExp(searchString);
		    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
		    var len = that.length;
		    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
		    var search = toString(searchString);
		    return slice(that, end - search.length, end) === search;
		  }
		});
		return es_string_endsWith;
	}

	requireEs_string_endsWith();

	var es_array_reverse = {};

	var hasRequiredEs_array_reverse;

	function requireEs_array_reverse () {
		if (hasRequiredEs_array_reverse) return es_array_reverse;
		hasRequiredEs_array_reverse = 1;
		var $ = require_export();
		var uncurryThis = requireFunctionUncurryThis();
		var isArray = requireIsArray();

		var nativeReverse = uncurryThis([].reverse);
		var test = [1, 2];

		// `Array.prototype.reverse` method
		// https://tc39.es/ecma262/#sec-array.prototype.reverse
		// fix for Safari 12.0 bug
		// https://bugs.webkit.org/show_bug.cgi?id=188794
		$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
		  reverse: function reverse() {
		    // eslint-disable-next-line no-self-assign -- dirty hack
		    if (isArray(this)) this.length = this.length;
		    return nativeReverse(this);
		  }
		});
		return es_array_reverse;
	}

	requireEs_array_reverse();

	const _logger$6 = new Logger("component", "navbar");

	/**
	 * Entry function for adding the navbar component.
	 */
	function initializeNavbar() {
	  _logger$6.debug("initializing navbar");
	  addNavbar();
	  addSearch();
	}

	/**
	 * Adds the navbar to the page.
	 */
	function addNavbar() {
	  _logger$6.debug("waiting for header to appear");
	  waitForElements("nav > [data-testid]", () => {
	    if (document.querySelector(".gt2-nav")) return;
	    let loggedIn = isLoggedIn();
	    document.querySelector("main").insertAdjacentHTML("beforebegin", /*html*/"\n        <nav class=\"gt2-nav\">\n          <div class=\"gt2-nav-left\"></div>\n          <div class=\"gt2-nav-center\">\n            <a class=\"gt2-nav-bird\" href=\"".concat(loggedIn ? "/home" : "/", "\"></a>\n          </div>\n          <div class=\"gt2-nav-right\">\n            <div class=\"gt2-search\"></div>\n            ").concat(loggedIn ? "\n            <div class=\"gt2-toggle-navbar-dropdown\">\n              <img src=\"".concat(getCurrentUserInfo().avatarUrl, "\" />\n            </div>\n            <div class=\"gt2-compose\">").concat(getLocalizedString("composeNewTweet"), "</div>") : "", "\n          </div>\n        </nav>\n        <div class=\"gt2-search-overflow-hider\"></div>"));
	    _logger$6.debug("added navbar");
	    let navbarElementsToAdd = [];

	    // home, notifications, messages (and explore on smaller screens)
	    if (loggedIn) {
	      navbarElementsToAdd = [{
	        selector: "[data-testid=AppTabBar_Home_Link]",
	        localizedString: getLocalizedString("navHome")
	      }, {
	        selector: "[data-testid=AppTabBar_Notifications_Link]",
	        localizedString: getLocalizedString("navNotifications")
	      }, {
	        selector: "[data-testid=AppTabBar_DirectMessage_Link]",
	        localizedString: getLocalizedString("navMessages")
	      }];
	      if (window.innerWidth < 1005) navbarElementsToAdd.push({
	        selector: "[data-testid=AppTabBar_Explore_Link]",
	        localizedString: getLocalizedString("navExplore")
	      });
	    }

	    // not logged in
	    else {
	      navbarElementsToAdd = [{
	        selector: "[data-testid=AppTabBar_Explore_Link]",
	        localizedString: getLocalizedString("navExplore")
	      }, {
	        selector: "a[href=\"/settings\"]",
	        localizedString: getLocalizedString("navSettings")
	      }];
	    }
	    for (let elem of navbarElementsToAdd) {
	      // check for updates
	      watchForElementChanges("header ".concat(elem.selector), () => {
	        if (!onModal()) {
	          addOrUpdateNavbarElement(elem.selector, elem.localizedString);
	          highlightNavbarLocation();
	        }
	      }, {
	        mutationObserverOptions: {
	          subtree: true
	        }
	      });
	    }

	    // add bird
	    addBird();

	    // handler for compose tweet button
	    let composeTweetOrig = document.querySelector("header a[href*='/compose/']");
	    let composeTweetMock = document.querySelector(".gt2-nav .gt2-compose");
	    addClickHandlerToMockElement(composeTweetMock, composeTweetOrig);

	    // handler for dropdown button
	    document.querySelector(".gt2-toggle-navbar-dropdown").addEventListener("click", dropdownToggledHandler);
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Highlights the current location in the navbar.
	 */
	function highlightNavbarLocation() {
	  var _document$querySelect;
	  (_document$querySelect = document.querySelectorAll(".gt2-nav-left > a")) === null || _document$querySelect === void 0 || _document$querySelect.forEach(e => e.classList.remove("active"));
	  let elem = document.querySelector(".gt2-nav a[href^='/".concat(location.pathname.split("/")[1], "']"));
	  if (elem) {
	    elem.classList.add("active");
	    _logger$6.debug("highlighted location on navbar element:", elem);
	  }
	}

	/**
	 * Adds or updates a navbar element by a given selector.
	 * @param selector Selector string of the navbar element to add
	 * @param localizedString localized string of the text
	 */
	function addOrUpdateNavbarElement(selector, localizedString) {
	  let origElem = document.querySelector("header ".concat(selector));
	  if (!origElem) {
	    _logger$6.error("Error finding navbar element with selector \"".concat(selector, "\""));
	    return;
	  }
	  let mockElem = document.querySelector(".gt2-nav ".concat(selector));

	  // mock element does not exist
	  if (!mockElem) {
	    document.querySelector(".gt2-nav-left").insertAdjacentHTML("beforeend", origElem.outerHTML);
	    _logger$6.debug("added navbar element with selector \"".concat(selector, "\""));
	    mockElem = document.querySelector(".gt2-nav ".concat(selector));

	    // click handler
	    addClickHandlerToMockElement(mockElem, origElem);
	  }

	  // mock element already exists
	  else {
	    mockElem.innerHTML = origElem.innerHTML;
	    _logger$6.debug("updated navbar element with selector \"".concat(selector, "\""));
	  }
	  mockElem.firstElementChild.setAttribute("data-gt2-color-override-ignore", "");
	  mockElem.firstElementChild.insertAdjacentHTML("beforeend", /*html*/"\n        <div class=\"gt2-nav-header\">".concat(localizedString, "</div>"));
	}

	/**
	 * Adds the search box to the navbar.
	 */
	function addSearch() {
	  _logger$6.debug("waiting for search to appear");
	  waitForElements(".gt2-search", mockSearch => {
	    waitForElements("[data-testid=sidebarColumn] [data-testid=SearchBox_Search_Input]", search => {
	      var _search$closest;
	      let searchContainer = (_search$closest = search.closest("form")) === null || _search$closest === void 0 || (_search$closest = _search$closest.parentElement) === null || _search$closest === void 0 || (_search$closest = _search$closest.parentElement) === null || _search$closest === void 0 || (_search$closest = _search$closest.parentElement) === null || _search$closest === void 0 ? void 0 : _search$closest.parentElement;
	      if (!searchContainer) {
	        _logger$6.error("search container not found");
	        return;
	      }

	      // replace mock search
	      let hadInput = mockSearch.querySelector("input") != null;
	      mockSearch.replaceChildren(searchContainer);
	      _logger$6.debug(hadInput ? "updated search in navbar" : "added search to navbar");
	    }, {
	      waitOnce: false
	    });
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Removes the search from the navbar.
	 */
	function removeSearch() {
	  let search = document.querySelector(".gt2-search");
	  if (search) {
	    search.replaceChildren();
	    _logger$6.debug("removed search");
	  }
	}

	/**
	 * Adds the twitter bird to the navbar.
	 */
	function addBird() {
	  let bird = document.querySelector("header h1 svg");
	  if (!bird) {
	    _logger$6.error("couldn't find twitter bird");
	  } else {
	    let mockBird = document.querySelector(".gt2-nav-bird");
	    mockBird.insertAdjacentHTML("beforeend", bird.outerHTML);
	    addLinkClickHandler(mockBird);
	    _logger$6.debug("added twitter bird to navbar");
	  }
	}

	/**
	 * Handler for the dropdown button in the navbar.
	 */
	function dropdownToggledHandler() {
	  let info = getCurrentUserInfo();
	  _logger$6.debug("dropdown menu toggled");

	  // open "more menu"
	  let moreMenuButton = document.querySelector("header [data-testid=AppTabBar_More_Menu]");
	  moreMenuButton.click();

	  // add elements to navbar dropdown menu
	  waitForElements("#layers [data-testid=Dropdown]", moreMenu => {
	    var _moreMenu$querySelect, _moreMenu$querySelect2;
	    moreMenu.closest("[role=menu]").classList.add("gt2-navbar-dropdown");

	    // separator line
	    let separatorHtml = (_moreMenu$querySelect = (_moreMenu$querySelect2 = moreMenu.querySelector("[role=separator]")) === null || _moreMenu$querySelect2 === void 0 || (_moreMenu$querySelect2 = _moreMenu$querySelect2.parentElement) === null || _moreMenu$querySelect2 === void 0 ? void 0 : _moreMenu$querySelect2.outerHTML) !== null && _moreMenu$querySelect !== void 0 ? _moreMenu$querySelect : "";

	    // items from left menu to attach
	    let toAttach = [{
	      selector: "a[href=\"/".concat(info.screenName, "\"]"),
	      localizedString: getLocalizedString("navProfile")
	    }, {
	      selector: "a[href$=\"/lists\"]",
	      localizedString: getLocalizedString("navLists")
	    }, {
	      selector: "a[href$=\"/bookmarks\"]",
	      localizedString: getLocalizedString("navBookmarks")
	    }, {
	      selector: "a[href$=\"/communities\"]",
	      localizedString: getLocalizedString("navCommunities")
	    }, {
	      selector: "a[href=\"/explore\"]",
	      localizedString: getLocalizedString("navExplore")
	    }];
	    for (let elem of toAttach.reverse()) {
	      let origElem = document.querySelector("header nav ".concat(elem.selector));
	      if (!origElem) continue;
	      moreMenu.insertAdjacentHTML("afterbegin", origElem.outerHTML);
	      let mockElem = moreMenu.querySelector(elem.selector);
	      mockElem.firstElementChild.insertAdjacentHTML("beforeend", /*html*/"<span>".concat(elem.localizedString, "</span>"));
	      addClickHandlerToMockElement(mockElem, origElem, () => moreMenuButton.click());
	      _logger$6.debug("added dropdown element with selector \"".concat(elem.selector, "\""));
	    }

	    // expand sections
	    moreMenu.querySelectorAll("[aria-expanded=false]").forEach(e => {
	      e.click();
	      e.nextElementSibling.insertAdjacentHTML("afterend", separatorHtml);
	    });
	    moreMenu.insertAdjacentHTML("beforeend", /*html*/"<a href=\"/logout\" class=\"gt2-toggle-logout\">Logout</a>");
	    addLinkClickHandler(moreMenu.querySelector(".gt2-toggle-logout"));
	    moreMenu.classList.add("gt2-navbar-dropdown-buttons-added");

	    // add ability to middle mouse click all items
	    moreMenu.addEventListener("mouseup", event => {
	      event.preventDefault();
	      let target = event.target;
	      if (target.closest("a") && event.button == 1) {
	        target.dispatchEvent(new MouseEvent("click", {
	          ctrlKey: true
	        }));
	        _logger$6.debug("middle clicked dropdown element", target.closest("a"));
	      }
	    });
	  });
	}

	var es_parseInt = {};

	var numberParseInt;
	var hasRequiredNumberParseInt;

	function requireNumberParseInt () {
		if (hasRequiredNumberParseInt) return numberParseInt;
		hasRequiredNumberParseInt = 1;
		var globalThis = requireGlobalThis();
		var fails = requireFails();
		var uncurryThis = requireFunctionUncurryThis();
		var toString = requireToString();
		var trim = requireStringTrim().trim;
		var whitespaces = requireWhitespaces();

		var $parseInt = globalThis.parseInt;
		var Symbol = globalThis.Symbol;
		var ITERATOR = Symbol && Symbol.iterator;
		var hex = /^[+-]?0x/i;
		var exec = uncurryThis(hex.exec);
		var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
		  // MS Edge 18- broken with boxed symbols
		  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

		// `parseInt` method
		// https://tc39.es/ecma262/#sec-parseint-string-radix
		numberParseInt = FORCED ? function parseInt(string, radix) {
		  var S = trim(toString(string));
		  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
		} : $parseInt;
		return numberParseInt;
	}

	var hasRequiredEs_parseInt;

	function requireEs_parseInt () {
		if (hasRequiredEs_parseInt) return es_parseInt;
		hasRequiredEs_parseInt = 1;
		var $ = require_export();
		var $parseInt = requireNumberParseInt();

		// `parseInt` method
		// https://tc39.es/ecma262/#sec-parseint-string-radix
		$({ global: true, forced: parseInt !== $parseInt }, {
		  parseInt: $parseInt
		});
		return es_parseInt;
	}

	requireEs_parseInt();

	var pickr_min = {exports: {}};

	/*! Pickr 1.9.1 MIT | https://github.com/Simonwep/pickr */

	var hasRequiredPickr_min;

	function requirePickr_min () {
		if (hasRequiredPickr_min) return pickr_min.exports;
		hasRequiredPickr_min = 1;
		(function (module, exports) {
			!function(t,e){module.exports=e();}(self,(()=>(()=>{var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:true,get:o[n]});},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:true});}},e={};t.d(e,{default:()=>E});var o={};function n(t,e,o,n,i={}){e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]);for(const s of e)for(const e of o)s[t](e,n,{capture:false,...i});return Array.prototype.slice.call(arguments,1)}t.r(o),t.d(o,{adjustableInputNumbers:()=>p,createElementFromString:()=>r,createFromTemplate:()=>a,eventPath:()=>l,off:()=>s,on:()=>i,resolveElement:()=>c});const i=n.bind(null,"addEventListener"),s=n.bind(null,"removeEventListener");function r(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}function a(t){const e=(t,e)=>{const o=t.getAttribute(e);return t.removeAttribute(e),o},o=(t,n={})=>{const i=e(t,":obj"),s=e(t,":ref"),r=i?n[i]={}:n;s&&(n[s]=t);for(const n of Array.from(t.children)){const t=e(n,":arr"),i=o(n,t?{}:r);t&&(r[t]||(r[t]=[])).push(Object.keys(i).length?i:n);}return n};return o(r(t))}function l(t){let e=t.path||t.composedPath&&t.composedPath();if(e)return e;let o=t.target.parentElement;for(e=[t.target,o];o=o.parentElement;)e.push(o);return e.push(document,window),e}function c(t){return t instanceof Element?t:"string"==typeof t?t.split(/>>/g).reduce(((t,e,o,n)=>(t=t.querySelector(e),o<n.length-1?t.shadowRoot:t)),document):null}function p(t,e=(t=>t)){function o(o){const n=[.001,.01,.1][Number(o.shiftKey||2*o.ctrlKey)]*(o.deltaY<0?1:-1);let i=0,s=t.selectionStart;t.value=t.value.replace(/[\d.]+/g,((t,o)=>o<=s&&o+t.length>=s?(s=o,e(Number(t),n,i)):(i++,t))),t.focus(),t.setSelectionRange(s,s),o.preventDefault(),t.dispatchEvent(new Event("input"));}i(t,"focus",(()=>i(window,"wheel",o,{passive:false}))),i(t,"blur",(()=>s(window,"wheel",o)));}const{min:u,max:h,floor:d,round:m}=Math;function f(t,e,o){e/=100,o/=100;const n=d(t=t/360*6),i=t-n,s=o*(1-e),r=o*(1-i*e),a=o*(1-(1-i)*e),l=n%6;return [255*[o,r,s,s,a,o][l],255*[a,o,o,r,s,s][l],255*[s,s,a,o,o,r][l]]}function v(t,e,o){const n=(2-(e/=100))*(o/=100)/2;return 0!==n&&(e=1===n?0:n<.5?e*o/(2*n):e*o/(2-2*n)),[t,100*e,100*n]}function b(t,e,o){const n=u(t/=255,e/=255,o/=255),i=h(t,e,o),s=i-n;let r,a;if(0===s)r=a=0;else {a=s/i;const n=((i-t)/6+s/2)/s,l=((i-e)/6+s/2)/s,c=((i-o)/6+s/2)/s;t===i?r=c-l:e===i?r=1/3+n-c:o===i&&(r=2/3+l-n),r<0?r+=1:r>1&&(r-=1);}return [360*r,100*a,100*i]}function y(t,e,o,n){e/=100,o/=100;return [...b(255*(1-u(1,(t/=100)*(1-(n/=100))+n)),255*(1-u(1,e*(1-n)+n)),255*(1-u(1,o*(1-n)+n)))]}function g(t,e,o){e/=100;const n=2*(e*=(o/=100)<.5?o:1-o)/(o+e)*100,i=100*(o+e);return [t,isNaN(n)?0:n,i]}function _(t){return b(...t.match(/.{2}/g).map((t=>parseInt(t,16))))}function w(t){t=t.match(/^[a-zA-Z]+$/)?function(t){if("black"===t.toLowerCase())return "#000";const e=document.createElement("canvas").getContext("2d");return e.fillStyle=t,"#000"===e.fillStyle?null:e.fillStyle}(t):t;const e={cmyk:/^cmyk\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)/i,rgba:/^rgba?\D+([\d.]+)(%?)\D+([\d.]+)(%?)\D+([\d.]+)(%?)\D*?(([\d.]+)(%?)|$)/i,hsla:/^hsla?\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?(([\d.]+)(%?)|$)/i,hsva:/^hsva?\D+([\d.]+)\D+([\d.]+)\D+([\d.]+)\D*?(([\d.]+)(%?)|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},o=t=>t.map((t=>/^(|\d+)\.\d+|\d+$/.test(t)?Number(t):void 0));let n;t:for(const i in e)if(n=e[i].exec(t))switch(i){case "cmyk":{const[,t,e,s,r]=o(n);if(t>100||e>100||s>100||r>100)break t;return {values:y(t,e,s,r),type:i}}case "rgba":{let[,t,,e,,s,,,r]=o(n);if(t="%"===n[2]?t/100*255:t,e="%"===n[4]?e/100*255:e,s="%"===n[6]?s/100*255:s,r="%"===n[9]?r/100:r,t>255||e>255||s>255||r<0||r>1)break t;return {values:[...b(t,e,s),r],a:r,type:i}}case "hexa":{let[,t]=n;4!==t.length&&3!==t.length||(t=t.split("").map((t=>t+t)).join(""));const e=t.substring(0,6);let o=t.substring(6);return o=o?parseInt(o,16)/255:void 0,{values:[..._(e),o],a:o,type:i}}case "hsla":{let[,t,e,s,,r]=o(n);if(r="%"===n[6]?r/100:r,t>360||e>100||s>100||r<0||r>1)break t;return {values:[...g(t,e,s),r],a:r,type:i}}case "hsva":{let[,t,e,s,,r]=o(n);if(r="%"===n[6]?r/100:r,t>360||e>100||s>100||r<0||r>1)break t;return {values:[t,e,s,r],a:r,type:i}}}return {values:null,type:null}}function A(t=0,e=0,o=0,n=1){const i=(t,e)=>(o=-1)=>e(~o?t.map((t=>Number(t.toFixed(o)))):t),s={h:t,s:e,v:o,a:n,toHSVA(){const t=[s.h,s.s,s.v,s.a];return t.toString=i(t,(t=>`hsva(${t[0]}, ${t[1]}%, ${t[2]}%, ${s.a})`)),t},toHSLA(){const t=[...v(s.h,s.s,s.v),s.a];return t.toString=i(t,(t=>`hsla(${t[0]}, ${t[1]}%, ${t[2]}%, ${s.a})`)),t},toRGBA(){const t=[...f(s.h,s.s,s.v),s.a];return t.toString=i(t,(t=>`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s.a})`)),t},toCMYK(){const t=function(t,e,o){const n=f(t,e,o),i=n[0]/255,s=n[1]/255,r=n[2]/255,a=u(1-i,1-s,1-r);return [100*(1===a?0:(1-i-a)/(1-a)),100*(1===a?0:(1-s-a)/(1-a)),100*(1===a?0:(1-r-a)/(1-a)),100*a]}(s.h,s.s,s.v);return t.toString=i(t,(t=>`cmyk(${t[0]}%, ${t[1]}%, ${t[2]}%, ${t[3]}%)`)),t},toHEXA(){const t=function(t,e,o){return f(t,e,o).map((t=>m(t).toString(16).padStart(2,"0")))}(s.h,s.s,s.v),e=s.a>=1?"":Number((255*s.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return e&&t.push(e),t.toString=()=>`#${t.join("").toUpperCase()}`,t},clone:()=>A(s.h,s.s,s.v,s.a)};return s}const $=t=>Math.max(Math.min(t,1),0);function C(t){const e={options:Object.assign({lock:null,onchange:()=>0,onstop:()=>0},t),_keyboard(t){const{options:o}=e,{type:n,key:i}=t;if(document.activeElement===o.wrapper){const{lock:o}=e.options,s="ArrowUp"===i,r="ArrowRight"===i,a="ArrowDown"===i,l="ArrowLeft"===i;if("keydown"===n&&(s||r||a||l)){let n=0,i=0;"v"===o?n=s||r?1:-1:"h"===o?n=s||r?-1:1:(i=s?-1:a?1:0,n=l?-1:r?1:0),e.update($(e.cache.x+.01*n),$(e.cache.y+.01*i)),t.preventDefault();}else i.startsWith("Arrow")&&(e.options.onstop(),t.preventDefault());}},_tapstart(t){i(document,["mouseup","touchend","touchcancel"],e._tapstop),i(document,["mousemove","touchmove"],e._tapmove),t.cancelable&&t.preventDefault(),e._tapmove(t);},_tapmove(t){const{options:o,cache:n}=e,{lock:i,element:s,wrapper:r}=o,a=r.getBoundingClientRect();let l=0,c=0;if(t){const e=t&&t.touches&&t.touches[0];l=t?(e||t).clientX:0,c=t?(e||t).clientY:0,l<a.left?l=a.left:l>a.left+a.width&&(l=a.left+a.width),c<a.top?c=a.top:c>a.top+a.height&&(c=a.top+a.height),l-=a.left,c-=a.top;}else n&&(l=n.x*a.width,c=n.y*a.height);"h"!==i&&(s.style.left=`calc(${l/a.width*100}% - ${s.offsetWidth/2}px)`),"v"!==i&&(s.style.top=`calc(${c/a.height*100}% - ${s.offsetHeight/2}px)`),e.cache={x:l/a.width,y:c/a.height};const p=$(l/a.width),u=$(c/a.height);switch(i){case "v":return o.onchange(p);case "h":return o.onchange(u);default:return o.onchange(p,u)}},_tapstop(){e.options.onstop(),s(document,["mouseup","touchend","touchcancel"],e._tapstop),s(document,["mousemove","touchmove"],e._tapmove);},trigger(){e._tapmove();},update(t=0,o=0){const{left:n,top:i,width:s,height:r}=e.options.wrapper.getBoundingClientRect();"h"===e.options.lock&&(o=t),e._tapmove({clientX:n+s*t,clientY:i+r*o});},destroy(){const{options:t,_tapstart:o,_keyboard:n}=e;s(document,["keydown","keyup"],n),s([t.wrapper,t.element],"mousedown",o),s([t.wrapper,t.element],"touchstart",o,{passive:false});}},{options:o,_tapstart:n,_keyboard:r}=e;return i([o.wrapper,o.element],"mousedown",n),i([o.wrapper,o.element],"touchstart",n,{passive:false}),i(document,["keydown","keyup"],r),e}function k(t={}){t=Object.assign({onchange:()=>0,className:"",elements:[]},t);const e=i(t.elements,"click",(e=>{t.elements.forEach((o=>o.classList[e.target===o?"add":"remove"](t.className))),t.onchange(e),e.stopPropagation();}));return {destroy:()=>s(...e)}}const S={variantFlipOrder:{start:"sme",middle:"mse",end:"ems"},positionFlipOrder:{top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},position:"bottom",margin:8,padding:0},O=(t,e,o)=>{const n="object"!=typeof t||t instanceof HTMLElement?{reference:t,popper:e,...o}:t;return {update(t=n){const{reference:e,popper:o}=Object.assign(n,t);if(!o||!e)throw new Error("Popper- or reference-element missing.");return ((t,e,o)=>{const{container:n,arrow:i,margin:s,padding:r,position:a,variantFlipOrder:l,positionFlipOrder:c}={container:document.documentElement.getBoundingClientRect(),...S,...o},{left:p,top:u}=e.style;e.style.left="0",e.style.top="0";const h=t.getBoundingClientRect(),d=e.getBoundingClientRect(),m={t:h.top-d.height-s,b:h.bottom+s,r:h.right+s,l:h.left-d.width-s},f={vs:h.left,vm:h.left+h.width/2-d.width/2,ve:h.left+h.width-d.width,hs:h.top,hm:h.bottom-h.height/2-d.height/2,he:h.bottom-d.height},[v,b="middle"]=a.split("-"),y=c[v],g=l[b],{top:_,left:w,bottom:A,right:$}=n;for(const t of y){const o="t"===t||"b"===t;let n=m[t];const[s,a]=o?["top","left"]:["left","top"],[l,c]=o?[d.height,d.width]:[d.width,d.height],[p,u]=o?[A,$]:[$,A],[v,b]=o?[_,w]:[w,_];if(!(n<v||n+l+r>p))for(const p of g){let m=f[(o?"v":"h")+p];if(!(m<b||m+c+r>u)){if(m-=d[a],n-=d[s],e.style[a]=`${m}px`,e.style[s]=`${n}px`,i){const e=o?h.width/2:h.height/2,r=c/2,u=e>r,d=m+{s:u?r:e,m:r,e:u?r:c-e}[p],f=n+{t:l,b:0,r:0,l}[t];i.style[a]=`${d}px`,i.style[s]=`${f}px`;}return t+p}}}return e.style.left=p,e.style.top=u,null})(e,o,n)}}};class E{static utils=o;static version="1.9.1";static I18N_DEFAULTS={"ui:dialog":"color picker dialog","btn:toggle":"toggle color picker dialog","btn:swatch":"color swatch","btn:last-color":"use previous color","btn:save":"Save","btn:cancel":"Cancel","btn:clear":"Clear","aria:btn:save":"save and close","aria:btn:cancel":"cancel and close","aria:btn:clear":"clear and close","aria:input":"color input field","aria:palette":"color selection area","aria:hue":"hue selection slider","aria:opacity":"selection slider"};static DEFAULT_OPTIONS={appClass:null,theme:"classic",useAsButton:false,padding:8,disabled:false,comparison:true,closeOnScroll:false,outputPrecision:0,lockOpacity:false,autoReposition:true,container:"body",components:{interaction:{}},i18n:{},swatches:null,inline:false,sliders:null,default:"#42445a",defaultRepresentation:null,position:"bottom-middle",adjustableNumbers:true,showAlways:false,closeWithKey:"Escape"};_initializingActive=true;_recalc=true;_nanopop=null;_root=null;_color=A();_lastColor=A();_swatchColors=[];_setupAnimationFrame=null;_eventListener={init:[],save:[],hide:[],show:[],clear:[],change:[],changestop:[],cancel:[],swatchselect:[]};constructor(t){this.options=t=Object.assign({...E.DEFAULT_OPTIONS},t);const{swatches:e,components:o,theme:n,sliders:i,lockOpacity:s,padding:r}=t;["nano","monolith"].includes(n)&&!i&&(t.sliders="h"),o.interaction||(o.interaction={});const{preview:a,opacity:l,hue:c,palette:p}=o;o.opacity=!s&&l,o.palette=p||a||l||c,this._preBuild(),this._buildComponents(),this._bindEvents(),this._finalBuild(),e&&e.length&&e.forEach((t=>this.addSwatch(t)));const{button:u,app:h}=this._root;this._nanopop=O(u,h,{margin:r}),u.setAttribute("role","button"),u.setAttribute("aria-label",this._t("btn:toggle"));const d=this;this._setupAnimationFrame=requestAnimationFrame((function e(){if(!h.offsetWidth)return requestAnimationFrame(e);d.setColor(t.default),d._rePositioningPicker(),t.defaultRepresentation&&(d._representation=t.defaultRepresentation,d.setColorRepresentation(d._representation)),t.showAlways&&d.show(),d._initializingActive=false,d._emit("init");}));}static create=t=>new E(t);_preBuild(){const{options:t}=this;for(const e of ["el","container"])t[e]=c(t[e]);this._root=(t=>{const{components:e,useAsButton:o,inline:n,appClass:i,theme:s,lockOpacity:r}=t.options,l=t=>t?"":'style="display:none" hidden',c=e=>t._t(e),p=a(`\n      <div :ref="root" class="pickr">\n\n        ${o?"":'<button type="button" :ref="button" class="pcr-button"></button>'}\n\n        <div :ref="app" class="pcr-app ${i||""}" data-theme="${s}" ${n?'style="position: unset"':""} aria-label="${c("ui:dialog")}" role="window">\n          <div class="pcr-selection" ${l(e.palette)}>\n            <div :obj="preview" class="pcr-color-preview" ${l(e.preview)}>\n              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="${c("btn:last-color")}"></button>\n              <div :ref="currentColor" class="pcr-current-color"></div>\n            </div>\n\n            <div :obj="palette" class="pcr-color-palette">\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="${c("aria:palette")}" role="listbox"></div>\n            </div>\n\n            <div :obj="hue" class="pcr-color-chooser" ${l(e.hue)}>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="${c("aria:hue")}" role="slider"></div>\n            </div>\n\n            <div :obj="opacity" class="pcr-color-opacity" ${l(e.opacity)}>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="${c("aria:opacity")}" role="slider"></div>\n            </div>\n          </div>\n\n          <div class="pcr-swatches ${e.palette?"":"pcr-last"}" :ref="swatches"></div>\n\n          <div :obj="interaction" class="pcr-interaction" ${l(Object.keys(e.interaction).length)}>\n            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${l(e.interaction.input)} aria-label="${c("aria:input")}">\n\n            <input :arr="options" class="pcr-type" data-type="HEXA" value="${r?"HEX":"HEXA"}" type="button" ${l(e.interaction.hex)}>\n            <input :arr="options" class="pcr-type" data-type="RGBA" value="${r?"RGB":"RGBA"}" type="button" ${l(e.interaction.rgba)}>\n            <input :arr="options" class="pcr-type" data-type="HSLA" value="${r?"HSL":"HSLA"}" type="button" ${l(e.interaction.hsla)}>\n            <input :arr="options" class="pcr-type" data-type="HSVA" value="${r?"HSV":"HSVA"}" type="button" ${l(e.interaction.hsva)}>\n            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${l(e.interaction.cmyk)}>\n\n            <input :ref="save" class="pcr-save" value="${c("btn:save")}" type="button" ${l(e.interaction.save)} aria-label="${c("aria:btn:save")}">\n            <input :ref="cancel" class="pcr-cancel" value="${c("btn:cancel")}" type="button" ${l(e.interaction.cancel)} aria-label="${c("aria:btn:cancel")}">\n            <input :ref="clear" class="pcr-clear" value="${c("btn:clear")}" type="button" ${l(e.interaction.clear)} aria-label="${c("aria:btn:clear")}">\n          </div>\n        </div>\n      </div>\n    `),u=p.interaction;return u.options.find((t=>!t.hidden&&!t.classList.add("active"))),u.type=()=>u.options.find((t=>t.classList.contains("active"))),p})(this),t.useAsButton&&(this._root.button=t.el),t.container.appendChild(this._root.root);}_finalBuild(){const t=this.options,e=this._root;if(t.container.removeChild(e.root),t.inline){const o=t.el.parentElement;t.el.nextSibling?o.insertBefore(e.app,t.el.nextSibling):o.appendChild(e.app);}else t.container.appendChild(e.app);t.useAsButton?t.inline&&t.el.remove():t.el.parentNode.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),this.hide();}_buildComponents(){const t=this,e=this.options.components,o=(t.options.sliders||"v").repeat(2),[n,i]=o.match(/^[vh]+$/g)?o:[],s=()=>this._color||(this._color=this._lastColor.clone()),r={palette:C({element:t._root.palette.picker,wrapper:t._root.palette.palette,onstop:()=>t._emit("changestop","slider",t),onchange(o,n){if(!e.palette)return;const i=s(),{_root:r,options:a}=t,{lastColor:l,currentColor:c}=r.preview;t._recalc&&(i.s=100*o,i.v=100-100*n,i.v<0&&(i.v=0),t._updateOutput("slider"));const p=i.toRGBA().toString(0);this.element.style.background=p,this.wrapper.style.background=`\n                        linear-gradient(to top, rgba(0, 0, 0, ${i.a}), transparent),\n                        linear-gradient(to left, hsla(${i.h}, 100%, 50%, ${i.a}), rgba(255, 255, 255, ${i.a}))\n                    `,a.comparison?a.useAsButton||t._lastColor||l.style.setProperty("--pcr-color",p):(r.button.style.setProperty("--pcr-color",p),r.button.classList.remove("clear"));const u=i.toHEXA().toString();for(const{el:e,color:o}of t._swatchColors)e.classList[u===o.toHEXA().toString()?"add":"remove"]("pcr-active");c.style.setProperty("--pcr-color",p);}}),hue:C({lock:"v"===i?"h":"v",element:t._root.hue.picker,wrapper:t._root.hue.slider,onstop:()=>t._emit("changestop","slider",t),onchange(o){if(!e.hue||!e.palette)return;const n=s();t._recalc&&(n.h=360*o),this.element.style.backgroundColor=`hsl(${n.h}, 100%, 50%)`,r.palette.trigger();}}),opacity:C({lock:"v"===n?"h":"v",element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onstop:()=>t._emit("changestop","slider",t),onchange(o){if(!e.opacity||!e.palette)return;const n=s();t._recalc&&(n.a=Math.round(100*o)/100),this.element.style.background=`rgba(0, 0, 0, ${n.a})`,r.palette.trigger();}}),selectable:k({elements:t._root.interaction.options,className:"active",onchange(e){t._representation=e.target.getAttribute("data-type").toUpperCase(),t._recalc&&t._updateOutput("swatch");}})};this._components=r;}_bindEvents(){const{_root:t,options:e}=this,o=[i(t.interaction.clear,"click",(()=>this._clearColor())),i([t.interaction.cancel,t.preview.lastColor],"click",(()=>{this.setHSVA(...(this._lastColor||this._color).toHSVA(),true),this._emit("cancel");})),i(t.interaction.save,"click",(()=>{!this.applyColor()&&!e.showAlways&&this.hide();})),i(t.interaction.result,["keyup","input"],(t=>{this.setColor(t.target.value,true)&&!this._initializingActive&&(this._emit("change",this._color,"input",this),this._emit("changestop","input",this)),t.stopImmediatePropagation();})),i(t.interaction.result,["focus","blur"],(t=>{this._recalc="blur"===t.type,this._recalc&&this._updateOutput(null);})),i([t.palette.palette,t.palette.picker,t.hue.slider,t.hue.picker,t.opacity.slider,t.opacity.picker],["mousedown","touchstart"],(()=>this._recalc=true),{passive:true})];if(!e.showAlways){const n=e.closeWithKey;o.push(i(t.button,"click",(()=>this.isOpen()?this.hide():this.show())),i(document,"keyup",(t=>this.isOpen()&&(t.key===n||t.code===n)&&this.hide())),i(document,["touchstart","mousedown"],(e=>{this.isOpen()&&!l(e).some((e=>e===t.app||e===t.button))&&this.hide();}),{capture:true}));}if(e.adjustableNumbers){const e={rgba:[255,255,255,1],hsva:[360,100,100,1],hsla:[360,100,100,1],cmyk:[100,100,100,100]};p(t.interaction.result,((t,o,n)=>{const i=e[this.getColorRepresentation().toLowerCase()];if(i){const e=i[n],s=t+(e>=100?1e3*o:o);return s<=0?0:Number((s<e?s:e).toPrecision(3))}return t}));}if(e.autoReposition&&!e.inline){let t=null;const n=this;o.push(i(window,["scroll","resize"],(()=>{n.isOpen()&&(e.closeOnScroll&&n.hide(),null===t?(t=setTimeout((()=>t=null),100),requestAnimationFrame((function e(){n._rePositioningPicker(),null!==t&&requestAnimationFrame(e);}))):(clearTimeout(t),t=setTimeout((()=>t=null),100)));}),{capture:true}));}this._eventBindings=o;}_rePositioningPicker(){const{options:t}=this;if(!t.inline){if(!this._nanopop.update({container:document.body.getBoundingClientRect(),position:t.position})){const t=this._root.app,e=t.getBoundingClientRect();t.style.top=(window.innerHeight-e.height)/2+"px",t.style.left=(window.innerWidth-e.width)/2+"px";}}}_updateOutput(t){const{_root:e,_color:o,options:n}=this;if(e.interaction.type()){const t=`to${e.interaction.type().getAttribute("data-type")}`;e.interaction.result.value="function"==typeof o[t]?o[t]().toString(n.outputPrecision):"";}!this._initializingActive&&this._recalc&&this._emit("change",o,t,this);}_clearColor(t=false){const{_root:e,options:o}=this;o.useAsButton||e.button.style.setProperty("--pcr-color","rgba(0, 0, 0, 0.15)"),e.button.classList.add("clear"),o.showAlways||this.hide(),this._lastColor=null,this._initializingActive||t||(this._emit("save",null),this._emit("clear"));}_parseLocalColor(t){const{values:e,type:o,a:n}=w(t),{lockOpacity:i}=this.options,s=void 0!==n&&1!==n;return e&&3===e.length&&(e[3]=void 0),{values:!e||i&&s?null:e,type:o}}_t(t){return this.options.i18n[t]||E.I18N_DEFAULTS[t]}_emit(t,...e){this._eventListener[t].forEach((t=>t(...e,this)));}on(t,e){return this._eventListener[t].push(e),this}off(t,e){const o=this._eventListener[t]||[],n=o.indexOf(e);return ~n&&o.splice(n,1),this}addSwatch(t){const{values:e}=this._parseLocalColor(t);if(e){const{_swatchColors:t,_root:o}=this,n=A(...e),s=r(`<button type="button" style="--pcr-color: ${n.toRGBA().toString(0)}" aria-label="${this._t("btn:swatch")}"/>`);return o.swatches.appendChild(s),t.push({el:s,color:n}),this._eventBindings.push(i(s,"click",(()=>{this.setHSVA(...n.toHSVA(),true),this._emit("swatchselect",n),this._emit("change",n,"swatch",this);}))),true}return  false}removeSwatch(t){const e=this._swatchColors[t];if(e){const{el:o}=e;return this._root.swatches.removeChild(o),this._swatchColors.splice(t,1),true}return  false}applyColor(t=false){const{preview:e,button:o}=this._root,n=this._color.toRGBA().toString(0);return e.lastColor.style.setProperty("--pcr-color",n),this.options.useAsButton||o.style.setProperty("--pcr-color",n),o.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||t||this._emit("save",this._color),this}destroy(){cancelAnimationFrame(this._setupAnimationFrame),this._eventBindings.forEach((t=>s(...t))),Object.keys(this._components).forEach((t=>this._components[t].destroy()));}destroyAndRemove(){this.destroy();const{root:t,app:e}=this._root;t.parentElement&&t.parentElement.removeChild(t),e.parentElement.removeChild(e),Object.keys(this).forEach((t=>this[t]=null));}hide(){return !!this.isOpen()&&(this._root.app.classList.remove("visible"),this._emit("hide"),true)}show(){return !this.options.disabled&&!this.isOpen()&&(this._root.app.classList.add("visible"),this._rePositioningPicker(),this._emit("show",this._color),this)}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(t=360,e=0,o=0,n=1,i=false){const s=this._recalc;if(this._recalc=false,t<0||t>360||e<0||e>100||o<0||o>100||n<0||n>1)return  false;this._color=A(t,e,o,n);const{hue:r,opacity:a,palette:l}=this._components;return r.update(t/360),a.update(n),l.update(e/100,1-o/100),i||this.applyColor(),s&&this._updateOutput(),this._recalc=s,true}setColor(t,e=false){if(null===t)return this._clearColor(e),true;const{values:o,type:n}=this._parseLocalColor(t);if(o){const t=n.toUpperCase(),{options:i}=this._root.interaction,s=i.find((e=>e.getAttribute("data-type")===t));if(s&&!s.hidden)for(const t of i)t.classList[t===s?"add":"remove"]("active");return !!this.setHSVA(...o,e)&&this.setColorRepresentation(t)}return  false}setColorRepresentation(t){return t=t.toUpperCase(),!!this._root.interaction.options.find((e=>e.getAttribute("data-type").startsWith(t)&&!e.click()))}getColorRepresentation(){return this._representation}getColor(){return this._color}getSelectedColor(){return this._lastColor}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=true,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=false,this._root.button.classList.remove("disabled"),this}}return e=e.default})()));
			
		} (pickr_min));
		return pickr_min.exports;
	}

	var pickr_minExports = requirePickr_min();
	var Pickr = /*@__PURE__*/getDefaultExportFromCjs(pickr_minExports);

	var CheckSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z\"/>\r\n    </g>\r\n</svg>\r\n";

	var ChevronRightSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z\"/>\r\n    </g>\r\n</svg>\r\n";

	var WestSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z\"/>\r\n    </g>\r\n</svg>\r\n";

	const _logger$5 = new Logger("component", "page-settings");

	/**
	 * Inserts the GT2 settings menu item into the list of subsettings.
	 */
	function addSettingsMenuEntry() {
	  const selector = "\n        main section[aria-labelledby=root-header] div[role=tablist],\n        main > div > div > div > div:last-child > div[role=tablist],\n        main div[data-testid=loggedOutPrivacySection]";
	  waitForElements(selector, e => {
	    if (!document.querySelector(".gt2-toggle-settings")) {
	      e.insertAdjacentHTML("beforeend", /*html*/"\n                <a class=\"gt2-toggle-settings\" href=\"/settings/gt2\">\n                    <div>\n                        <span>GoodTwitter2</span>\n                        ".concat(ChevronRightSvg, "\n                    </div>\n                </a>"));
	      _logger$5.debug("added gt2 settings menu entry");
	      e.addEventListener("click", event => {
	        let target = event.target;
	        let menuElement = target.closest(".gt2-toggle-settings");

	        // toggle settings display
	        if (menuElement) {
	          event.preventDefault();
	          window.history.pushState({}, "", menuElement.getAttribute("href"));
	          addSettings();
	        }

	        // disable settings display again when clicking on another menu item
	        else hideSettings();
	      });
	    }
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Gets the HTML of a toggle setting.
	 * @param name the name of the setting
	 * @param additionalHtml additional HTML to add between the toggle and the description
	 * @returns the HTML of the toggle setting
	 */
	function getSettingToggleHtml(name) {
	  let additionalHtml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	  let description = "".concat(name, "Desc");
	  return /*html*/"\n        <div class=\"gt2-setting\">\n            <div>\n                <span>".concat(getLocalizedString(name), "</span>\n                <div class=\"gt2-setting-toggle ").concat(Settings.get(name) ? "gt2-active" : "", "\" data-setting-name=\"").concat(name, "\">\n                    <div class=\"gt2-icon-hover-dummy\"></div>\n                    <div>").concat(CheckSvg, "</div>\n              </div>\n            </div>\n            ").concat(additionalHtml, "\n            ").concat(hasLocalizedString(description) ? /*html*/"<span>".concat(getLocalizedString(description), "</span>") : "", "\n        </div>");
	}

	/**
	 * Gets the HTML of a selection setting.
	 * @param settingName the name of the setting
	 * @param options the options of the setting
	 * @returns the HTML of the selection setting
	 */
	function getSettingSelectionHtml(settingName, options) {
	  let html = "";
	  for (let [index, option] of options.entries()) {
	    let sel = Math.pow(2, index);
	    let isActive = (Settings.get(settingName) & sel) == sel;
	    html += /*html*/"\n            <div>\n                <span>".concat(getLocalizedString(option), "</span>\n                <div class=\"gt2-setting-toggle ").concat(isActive ? "gt2-active" : "", "\" data-sel=\"").concat(sel, "\">\n                    <div class=\"gt2-icon-hover-dummy\"></div>\n                    <div>").concat(CheckSvg, "</div>\n                </div>\n            </div>");
	  }
	  return /*html*/"<div data-setting-name=\"".concat(settingName, "\">").concat(html, "</div>");
	}

	/**
	 * Gets the HTML of the GT2 settings page.
	 * @returns the HTML of the settings page
	 */
	function getSettingsHtml() {
	  return /*html*/"\n        <div class=\"gt2-settings-header\">\n            <div class=\"gt2-settings-back\">\n                <div class=\"gt2-icon-hover-dummy\"></div>\n                ".concat(WestSvg, "\n            </div>\n            GoodTwitter2 v").concat(GM_info.script.version, "\n        </div>\n        <div class=\"gt2-settings\">\n            <div class=\"gt2-settings-sub-header\">").concat(getLocalizedString("settingsHeaderTimeline"), "</div>\n            ").concat(getSettingToggleHtml("forceLatest"), "\n            ").concat(getSettingToggleHtml("biggerPreviews"), "\n            <div class=\"gt2-settings-separator\"></div>\n\n            <div class=\"gt2-settings-sub-header\">").concat(getLocalizedString("statsTweets"), "</div>\n            ").concat(getSettingToggleHtml("hideTranslateTweetButton"), "\n            ").concat(getSettingToggleHtml("tweetIconsPullLeft"), "\n            ").concat(getSettingToggleHtml("hidePromoteTweetButton"), "\n            ").concat(getSettingToggleHtml("showMediaWithContentWarnings", /*html*/"\n                <div\n                    data-multi-selection-name=\"showMediaWithContentWarningsBox\"\n                    class=\"gt2-settings-multi-selection ".concat(Settings.get("showMediaWithContentWarnings") ? "" : "gt2-hidden", "\"\n                >\n                    ").concat(getSettingSelectionHtml("showMediaWithContentWarningsSel", ["contentWarningNudity", "contentWarningViolence", "contentWarningSensitiveContent"]), "\n                </div>")), "\n            ").concat(getSettingToggleHtml("hideMoreTweets"), "\n            <div class=\"gt2-settings-separator\"></div>\n\n            <div class=\"gt2-settings-sub-header\">").concat(getLocalizedString("settingsHeaderSidebars"), "</div>\n            ").concat(getSettingToggleHtml("stickySidebars"), "\n            ").concat(getSettingToggleHtml("smallSidebars"), "\n            ").concat(getSettingToggleHtml("hideTrends"), "\n            ").concat(getSettingToggleHtml("leftTrends"), "\n            ").concat(getSettingToggleHtml("show5Trends"), "\n            <div class=\"gt2-settings-separator\"></div>\n\n            <div class=\"gt2-settings-sub-header\">").concat(getLocalizedString("navProfile"), "</div>\n            ").concat(getSettingToggleHtml("legacyProfile"), "\n            ").concat(getSettingToggleHtml("squareAvatars"), "\n            ").concat(getSettingToggleHtml("disableHexagonAvatars"), "\n            ").concat(getSettingToggleHtml("leftMedia"), "\n            ").concat(getSettingToggleHtml("profileMediaRedirect"), "\n            <div class=\"gt2-settings-separator\"></div>\n\n            <div class=\"gt2-settings-sub-header\">\n                ").concat(getLocalizedString("settingsHeaderGlobalLook"), "\n            </div>\n            ").concat(getSettingToggleHtml("hideFollowSuggestions", /*html*/"\n                <div\n                    data-multi-selection-name=\"hideFollowSuggestionsBox\"\n                    class=\"gt2-settings-multi-selection ".concat(Settings.get("hideFollowSuggestions") ? "" : "gt2-hidden", "\"\n                >\n                <div>\n                    <div class=\"gt2-settings-selection-header\">\n                        ").concat(getLocalizedString("settingsHeaderTimeline"), "\n                    </div>\n                    ").concat(getSettingSelectionHtml("hideFollowSuggestionsTimelineSel", ["users", "topics", "navLists"]), "\n                </div>\n\n                <div>\n                    <div class=\"gt2-settings-selection-header\">\n                        ").concat(getLocalizedString("settingsHeaderSidebars"), "\n                    </div>\n                    ").concat(getSettingSelectionHtml("hideFollowSuggestionsSidebarSel", ["users", "topics"]), "\n                </div>\n\n                <div>\n                    <div class=\"gt2-settings-selection-header\">\n                        ").concat(getLocalizedString("navProfile"), "\n                    </div>\n                    ").concat(getSettingSelectionHtml("hideFollowSuggestionsProfileSel", ["users"]), "\n                </div>\n            </div>")), "\n            ").concat(getSettingToggleHtml("fontOverride", /*html*/"\n                <div class=\"gt2-setting-input\" data-setting-name=\"fontOverrideValue\">\n                    <input type=\"text\" value=\"".concat(Settings.get("fontOverrideValue"), "\">\n                </div>")), "\n            ").concat(getSettingToggleHtml("colorOverride", "<div class=\"gt2-pickr\"></div>"), "\n            ").concat(getSettingToggleHtml("hideMessageBox"), "\n            ").concat(getSettingToggleHtml("rosettaIcons"), "\n            ").concat(getSettingToggleHtml("favoriteLikes"), "\n            ").concat(getSettingToggleHtml("birdIcon"), "\n            <div class=\"gt2-settings-separator\"></div>\n\n            <div class=\"gt2-settings-sub-header\">").concat(getLocalizedString("settingsHeaderOther"), "</div>\n            ").concat(getSettingToggleHtml("updateNotifications"), "\n            ").concat(getSettingToggleHtml("expandTcoShortlinks"), "\n            ").concat(getSettingToggleHtml("mobileRedirect"), "\n        </div>");
	}

	/**
	 * Adds the GT2 settings.
	 * TODO (does not yet work on screens smaller than 1050px)
	 */
	function addSettings() {
	  if (document.querySelector(".gt2-settings")) {
	    document.querySelectorAll(".gt2-settings-header, .gt2-settings").forEach(e => e.classList.remove("gt2-hidden"));
	    return;
	  }
	  waitForElements("main a[href=\"/settings/about\"]", () => {
	    var _document$querySelect;
	    let settingsHtml = getSettingsHtml();

	    // add gt2 settings html to page
	    let settingsContainer = document.querySelector("main section[aria-labelledby=detail-header]");
	    if (settingsContainer) {
	      settingsContainer.insertAdjacentHTML("afterbegin", settingsHtml);
	    } else {
	      settingsContainer = document.querySelector("main > div > div > div");
	      settingsContainer.insertAdjacentHTML("beforeend", /*html*/"<section>".concat(settingsHtml, "</section>"));
	    }
	    _logger$5.debug("added gt2 settings to ", settingsContainer);

	    // add color pickr
	    initializeColorPickr();

	    // disable toggles
	    disableTogglesIfNeeded();

	    // event handlers

	    // click on the back button
	    (_document$querySelect = document.querySelector(".gt2-settings-back")) === null || _document$querySelect === void 0 || _document$querySelect.addEventListener("click", () => window.history.back());

	    // handler for the toggles
	    document.querySelectorAll(".gt2-setting-toggle").forEach(e => e.addEventListener("click", toggleClickHandler));

	    // handler for inputs
	    document.querySelectorAll(".gt2-setting-input input").forEach(e => e.addEventListener("keyup", inputKeyupHandler));
	  });
	}

	/**
	 * Hides the GT2 settings.
	 */
	function hideSettings() {
	  document.querySelectorAll(".gt2-settings-header, .gt2-settings").forEach(e => e.classList.add("gt2-hidden"));
	}

	/**
	 * Initializes the color pickr.
	 */
	function initializeColorPickr() {
	  Pickr.create({
	    el: ".gt2-pickr",
	    theme: "classic",
	    lockOpacity: true,
	    useAsButton: true,
	    appClass: "gt2-color-override-pickr",
	    inline: true,
	    default: "rgb(".concat(Settings.get("colorOverrideValue"), ")"),
	    components: {
	      preview: true,
	      hue: true,
	      interaction: {
	        hex: true,
	        rgba: true,
	        hsla: true,
	        hsva: true,
	        cmyk: true,
	        input: true
	      }
	    }
	  }).on("change", color => {
	    let val = color.toRGBA().toString(0).slice(5, -4);
	    Settings.set("colorOverrideValue", val);
	    _logger$5.debug("color picked: ".concat(val));
	  });
	  _logger$5.debug("color pickr initialized.");
	}

	/**
	 * Disables toggles and elements if they are not needed.
	 */
	function disableTogglesIfNeeded() {
	  // other trend related toggles are not needed when the trends are disabled
	  document.querySelectorAll("div[data-setting-name=leftTrends], div[data-setting-name=show5Trends]").forEach(e => {
	    let isDisabled = e.classList.contains("gt2-disabled");
	    if (Settings.get("hideTrends") && !isDisabled) {
	      e.classList.add("gt2-disabled");
	      _logger$5.debug("disabled component ", e);
	    } else if (!Settings.get("hideTrends") && isDisabled) {
	      e.classList.remove("gt2-disabled");
	      _logger$5.debug("enabled component ", e);
	    }
	  });

	  // @option fontOverride: hide font input if fontOverride is disabled
	  hideBasedOnToggle("fontOverride", "[data-setting-name=fontOverrideValue]");

	  // @option colorOverride: hide color input if colorOverride is disabled
	  hideBasedOnToggle("colorOverride", ".gt2-color-override-pickr");

	  // @option hideFollowSuggestions
	  hideBasedOnToggle("hideFollowSuggestions", "[data-multi-selection-name=hideFollowSuggestionsBox]");

	  // @option showMediaWithContentWarnings
	  hideBasedOnToggle("showMediaWithContentWarnings", "[data-multi-selection-name=showMediaWithContentWarningsBox]");
	}

	/**
	 * Hides elements based on the state of a toggle.
	 * @param toggle the name of the toggle
	 * @param selector the selector of the element to hide
	 */
	function hideBasedOnToggle(toggle, selector) {
	  let target = document.querySelector(selector);
	  if (!target) {
	    _logger$5.warn("Element with selector \"".concat(selector, "\" does not exist (yet)"));
	    return;
	  }
	  let isHidden = target.classList.contains("gt2-hidden");
	  if (Settings.get(toggle) && isHidden) {
	    target.classList.remove("gt2-hidden");
	    _logger$5.debug("revealed component ", target);
	  } else if (!Settings.get(toggle) && !isHidden) {
	    target.classList.add("gt2-hidden");
	    _logger$5.debug("hid component ", target);
	  }
	}

	/**
	 * Handler for click events on a toggle.
	 * @param event the mouse event
	 */
	function toggleClickHandler(event) {
	  let toggle = event.target;
	  toggle = toggle.closest(".gt2-setting-toggle");

	  // disabled
	  if (toggle.classList.contains("gt2-disabled")) return;

	  // ui
	  toggle.classList.toggle("gt2-active");
	  let settingName = toggle.closest("[data-setting-name]").getAttribute("data-setting-name");
	  let settingSel = toggle.getAttribute("data-sel");

	  // multi selection
	  if (settingSel) {
	    Settings.xor(settingName, parseInt(settingSel));
	    _logger$5.debug("setting selection changed: ".concat(settingName, " = ").concat(Settings.get(settingName)));
	  }

	  // normal toggle
	  else {
	    Settings.toggle(settingName);
	    _logger$5.debug("setting toggled: ".concat(settingName));
	  }

	  // disable toggles if needed
	  disableTogglesIfNeeded();
	}

	/**
	 * Handler for input events on text fields.
	 * @param event the event
	 */
	function inputKeyupHandler(event) {
	  let target = event.target;
	  let settingName = target.closest("[data-setting-name]").getAttribute("data-setting-name");
	  Settings.set(settingName, target.value);
	  _logger$5.debug("setting value changed: ".concat(settingName, " = ").concat(target.value));
	}

	const _logger$4 = new Logger("timeline");

	/**
	 * Enables the "Latest Tweets" timeline mode.
	 * @option forceLatest
	 */
	function enableLatestTweets() {
	  if (!Settings.get("forceLatest")) return;
	  waitForElements("[data-testid=primaryColumn] > :first-child > :first-child nav [role=presentation]:nth-child(2) > [aria-selected=false]", header => header.click());
	}

	/**
	 * Actions to execute when a new tweet is added to the DOM.
	 */
	function watchForTweets() {
	  if (Settings.get("expandTcoShortlinks")) expandTweetTcoShortlinks();
	  if (Settings.get("hideMoreTweets")) hideMoreTweets();
	}

	/**
	 * Expands t.co shortlinks in a tweet element.
	 */
	function expandTweetTcoShortlinks() {
	  const selector = "\n        article[data-testid=tweet] a[href^=\"http://t.co\"],\n        article[data-testid=tweet] a[href^=\"https://t.co\"]";
	  waitForElements(selector, expandTweetTcoShortlink, {
	    waitOnce: false
	  });
	}

	/**
	 * Expands a t.co shortlink in a tweet element.
	 * @param anchor the t.co shortlink DOM element
	 */
	function expandTweetTcoShortlink(anchor) {
	  var _tweet$note_tweet;
	  const tweetArticle = anchor.closest("article[data-testid=tweet]");
	  console.log("tco", anchor);
	  const tweet = getTweetData(tweetArticle);
	  if (!tweet) return;
	  const urls = tweet.entities.urls.concat(((_tweet$note_tweet = tweet.note_tweet) === null || _tweet$note_tweet === void 0 || (_tweet$note_tweet = _tweet$note_tweet.entity_set) === null || _tweet$note_tweet === void 0 ? void 0 : _tweet$note_tweet.urls) || []);
	  expandTcoShortlink(anchor, urls);
	}
	function hideMoreTweets() {
	  waitForElements("[data-testid=cellInnerDiv]", cell => {
	    var _entry$itemMetadata;
	    const entry = getReactPropByName(cell, "entry", true);
	    if (!entry) return;
	    if ((entry === null || entry === void 0 || (_entry$itemMetadata = entry.itemMetadata) === null || _entry$itemMetadata === void 0 || (_entry$itemMetadata = _entry$itemMetadata.clientEventInfo) === null || _entry$itemMetadata === void 0 || (_entry$itemMetadata = _entry$itemMetadata.details) === null || _entry$itemMetadata === void 0 || (_entry$itemMetadata = _entry$itemMetadata.conversationDetails) === null || _entry$itemMetadata === void 0 ? void 0 : _entry$itemMetadata.conversationSection) == "RelatedTweet") {
	      _logger$4.debug("Removed tweet from \"More tweets\" section: ", entry.entryId);
	      cell.remove();
	    }
	  }, {
	    waitOnce: false
	  });
	}

	const _logger$3 = new Logger("location");

	/**
	 * Entry function for all location adjustments.
	 */
	function initializeLocation() {
	  window.addEventListener("popstate", function () {
	    onLocationChange("pop");
	  });
	  onLocationChange("init");
	  watchTitle();
	  if (Settings.get("birdIcon")) watchFavicon();
	}

	/**
	 * Sets the type of the page.
	 * @param type type of the page
	 */
	function setPageType(type) {
	  if (document.body.dataset.pageType != type) {
	    document.body.dataset.pageType = type;
	    _logger$3.debug("page type set to: ".concat(type));
	  }
	}

	/**
	 * Resets the page type.
	 */
	function resetPageType() {
	  delete document.body.dataset.pageType;
	  _logger$3.debug("reset page type");
	}

	/**
	 * Sets the current page as an error page.
	 */
	function setErrorPage() {
	  document.body.dataset.pageError = "true";
	  _logger$3.debug("on error page");
	}

	/**
	 * Watches the page title for changes and modifies it if necessary.
	 */
	function watchTitle() {
	  watchForElementChanges("head title", title => {
	    if (title.textContent != title.getAttribute("content")) {
	      for (let adj of TITLE_ADJUSTMENTS) {
	        if (location.pathname == adj.location) changeTitle(adj.title);
	      }
	    }
	  }, {
	    mutationObserverOptions: {
	      attributes: false
	    }
	  });
	}
	function watchFavicon() {
	  watchForElementChanges("head [rel=\"shortcut icon\"]:not(.gt2-favicon)", favicon => {
	    var _document$querySelect;
	    const href = favicon.getAttribute("href").replace(".3", ".2");
	    _logger$3.debug("resetting favicon to twitter bird:", href);
	    (_document$querySelect = document.querySelector(".gt2-favicon")) === null || _document$querySelect === void 0 || _document$querySelect.remove();
	    favicon.insertAdjacentHTML("beforebegin", /*html*/"<link rel=\"shortcut icon\" class=\"gt2-favicon\" href=\"".concat(href, "\">"));
	  });
	}

	/**
	 * Changes the current page title.
	 * @param newTitle the new title of the page
	 */
	function changeTitle(newTitle) {
	  let title = document.querySelector("title");
	  if (!title) {
	    _logger$3.error("title element not found.");
	    return;
	  }
	  let newContent = title.textContent.replace(/(\(.*\) )?.*/, "$1".concat(newTitle, " / Twitter"));
	  if (title.textContent != newContent) {
	    title.setAttribute("content-old", title.textContent);
	    title.textContent = newContent;
	    title.setAttribute("content", newContent);
	    _logger$3.debug("title changed to \"".concat(newContent, "\""));
	  }
	}

	/**
	 * Resets the page title to the last one.
	 */
	function resetTitle() {
	  let title = document.querySelector("title");
	  if (!title) {
	    _logger$3.error("title element not found.");
	    return;
	  }
	  let oldContent = title.getAttribute("content-old");
	  if (oldContent) {
	    title.setAttribute("content", oldContent);
	    title.removeAttribute("content-old");
	    title.textContent = oldContent;
	    _logger$3.debug("reset title to: ", oldContent);
	  }
	}

	/**
	 * Changes to apply to the page whenever a location change happens.
	 * Gets called by push/pop/replace event listeners.
	 * @param type type of the change event
	 */
	function onLocationChange(type) {
	  _logger$3.info("location change: [".concat(type, "] ").concat(location.pathname));
	  document.body.dataset.pagePathname = location.pathname.slice(1);

	  // not logged in
	  if (!isLoggedIn()) {
	    document.body.classList.add("gt2-not-logged-in");
	  }

	  // error
	  delete document.body.dataset.pageError;
	  waitForElements("main > div > div > div [data-testid=error-detail]", e => {
	    if (!onPage({
	      settings: ["gt2"]
	    })) {
	      setErrorPage();
	    }
	  }, {
	    waitOnce: false
	  });

	  // tweet
	  if (onPage({
	    "*": ["status"],
	    i: {
	      web: ["status"]
	    }
	  }) && !onPage({
	    "*": {
	      "status": {
	        "*": {
	          "retweets": ["with_comments"]
	        }
	      }
	    },
	    i: {
	      web: {
	        "status": {
	          "*": {
	            "retweets": ["with_comments"]
	          }
	        }
	      }
	    }
	  })) {
	    setPageType("tweet");
	    addSourceLabel();
	    labelMoreTweetsElement();
	    scrollTweetUp(75);
	  }

	  // home
	  else if (onPage(["home"])) {
	    setPageType("home");
	    enableLatestTweets();
	  }

	  // search/explore
	  else if (onPage(["search", "explore"])) {
	    setPageType("search");

	    // remove navbar search
	    removeSearch();
	  }

	  // settings
	  else if (onPage(["settings"]) && !onModal()) {
	    setPageType("settings");
	    addSettingsMenuEntry();
	    if (onPage({
	      settings: ["gt2"]
	    })) {
	      changeTitle("GoodTwitter2");
	      addSettings();
	    } else {
	      resetTitle();
	      hideSettings();
	    }
	  }

	  // messages
	  else if (onPage(["messages"])) {
	    setPageType("messages");
	  }

	  // 404
	  else if (onPage(["404"])) {
	    setErrorPage();
	  } else if (onModal()) {
	    _logger$3.debug("on modal");
	  }

	  // unhandled / not important
	  else if (onPage(["hashtag", "i", "places", "notifications"]) || onPage({
	    "*": ["communities", "followers", "followers_you_follow", "following", "lists", "moments", "status", "topics"]
	  })) {
	    _logger$3.warn("on unhandled page");
	    resetPageType();
	  }

	  // profile page
	  else if (!onModal() || onPage({
	    intent: ["user"]
	  })) {
	    setPageType("profile");

	    // @option profileMediaRedirect
	    if (Settings.get("profileMediaRedirect") && !location.pathname.endsWith("/media")) {
	      waitForElements("[href$=\"/media\"][aria-selected=false]", e => e.click());
	      _logger$3.debug("redirected to /media page");
	    }
	  }

	  // unhandled modals
	  else {
	    _logger$3.warn("on unhandled modal");
	    // resetPageType()
	  }
	}

	/**
	 * Overrides various functions to change the behavior of the site.
	 */
	function overrideFunctions() {
	  // remove whitespace when inserting HTML
	  const Element_insertAdjacentHTML = Element.prototype.insertAdjacentHTML;
	  Element.prototype.insertAdjacentHTML = function (position, text) {
	    Element_insertAdjacentHTML.call(this, position, text.trim());
	  };

	  // remove "t" search parameter (probably used for tracking?)
	  // https://twitter.com/Outrojules/status/1543220843995619328?s=20&t=fCFEatQ_iAtlyiHQCWCxoQ
	  const Range_selectNodeContents = Range.prototype.selectNodeContents;
	  Range.prototype.selectNodeContents = function (node) {
	    node.textContent = node.textContent.replace(/&t=.*$/, "");
	    Range_selectNodeContents.call(this, node);
	  };

	  // Node removal interception
	  const Node_removeChild = Node.prototype.removeChild;
	  Node.prototype.removeChild = function (child) {
	    // prevent removal of untranslated tweet texts in timeline
	    if (child instanceof HTMLElement && child.dataset.testid == "tweetText") {
	      return child;
	    }
	    return Node_removeChild.call(this, child);
	  };

	  // location change: push
	  const History_push = History.prototype.pushState;
	  History.prototype.pushState = function () {
	    History_push.apply(this, arguments);
	    onLocationChange("push");
	  };

	  // location change: replace
	  const History_replace = History.prototype.replaceState;
	  History.prototype.replaceState = function () {
	    History_replace.apply(this, arguments);
	    onLocationChange("replace");
	  };

	  // adjust scrollBy with GLOBAL_TOP_OFFSET
	  GM_addElement("script", {
	    textContent: /*javascript*/"\n            const window_scrollBy = window.scrollBy\n            window.scrollBy = function() {\n                if (arguments.length == 2) {\n                    const x = arguments[0]\n                    const y = arguments[1] - ".concat(GLOBAL_TOP_OFFSET, "\n                    window_scrollBy.apply(this, [x, y])\n                } else {\n                    const options = arguments[0]\n                    options.top -= ").concat(GLOBAL_TOP_OFFSET, "\n                    window_scrollBy.apply(this, [options])\n                }\n            }")
	  });
	}

	Number.prototype.humanize = function () {
	  let t = this.toString().split("");
	  let out = "";
	  let c = 1;
	  for (let i = t.length - 1; i >= 0; i--) {
	    out = "".concat(t[i]).concat(out);
	    if (c++ % 3 == 0 && i - 1 >= 0) {
	      out = ",".concat(out);
	    }
	  }
	  return out;
	};
	Number.prototype.humanizeShort = function () {
	  let t = this.toString();
	  if (this >= 1000000) {
	    t = t.slice(0, -5);
	    return "".concat(t.slice(0, -1)).concat(t.slice(-1) != 0 ? ".".concat(t.slice(-1)) : "", "M");
	  } else if (this >= 10000) {
	    t = t.slice(0, -2);
	    return "".concat(t.slice(0, -1)).concat(t.slice(-1) != 0 ? ".".concat(t.slice(-1)) : "", "K");
	  } else return this.humanize();
	};

	var es_array_sort = {};

	var deletePropertyOrThrow;
	var hasRequiredDeletePropertyOrThrow;

	function requireDeletePropertyOrThrow () {
		if (hasRequiredDeletePropertyOrThrow) return deletePropertyOrThrow;
		hasRequiredDeletePropertyOrThrow = 1;
		var tryToString = requireTryToString();

		var $TypeError = TypeError;

		deletePropertyOrThrow = function (O, P) {
		  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
		};
		return deletePropertyOrThrow;
	}

	var arraySort;
	var hasRequiredArraySort;

	function requireArraySort () {
		if (hasRequiredArraySort) return arraySort;
		hasRequiredArraySort = 1;
		var arraySlice = requireArraySlice();

		var floor = Math.floor;

		var sort = function (array, comparefn) {
		  var length = array.length;

		  if (length < 8) {
		    // insertion sort
		    var i = 1;
		    var element, j;

		    while (i < length) {
		      j = i;
		      element = array[i];
		      while (j && comparefn(array[j - 1], element) > 0) {
		        array[j] = array[--j];
		      }
		      if (j !== i++) array[j] = element;
		    }
		  } else {
		    // merge sort
		    var middle = floor(length / 2);
		    var left = sort(arraySlice(array, 0, middle), comparefn);
		    var right = sort(arraySlice(array, middle), comparefn);
		    var llength = left.length;
		    var rlength = right.length;
		    var lindex = 0;
		    var rindex = 0;

		    while (lindex < llength || rindex < rlength) {
		      array[lindex + rindex] = (lindex < llength && rindex < rlength)
		        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
		        : lindex < llength ? left[lindex++] : right[rindex++];
		    }
		  }

		  return array;
		};

		arraySort = sort;
		return arraySort;
	}

	var environmentFfVersion;
	var hasRequiredEnvironmentFfVersion;

	function requireEnvironmentFfVersion () {
		if (hasRequiredEnvironmentFfVersion) return environmentFfVersion;
		hasRequiredEnvironmentFfVersion = 1;
		var userAgent = requireEnvironmentUserAgent();

		var firefox = userAgent.match(/firefox\/(\d+)/i);

		environmentFfVersion = !!firefox && +firefox[1];
		return environmentFfVersion;
	}

	var environmentIsIeOrEdge;
	var hasRequiredEnvironmentIsIeOrEdge;

	function requireEnvironmentIsIeOrEdge () {
		if (hasRequiredEnvironmentIsIeOrEdge) return environmentIsIeOrEdge;
		hasRequiredEnvironmentIsIeOrEdge = 1;
		var UA = requireEnvironmentUserAgent();

		environmentIsIeOrEdge = /MSIE|Trident/.test(UA);
		return environmentIsIeOrEdge;
	}

	var environmentWebkitVersion;
	var hasRequiredEnvironmentWebkitVersion;

	function requireEnvironmentWebkitVersion () {
		if (hasRequiredEnvironmentWebkitVersion) return environmentWebkitVersion;
		hasRequiredEnvironmentWebkitVersion = 1;
		var userAgent = requireEnvironmentUserAgent();

		var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

		environmentWebkitVersion = !!webkit && +webkit[1];
		return environmentWebkitVersion;
	}

	var hasRequiredEs_array_sort;

	function requireEs_array_sort () {
		if (hasRequiredEs_array_sort) return es_array_sort;
		hasRequiredEs_array_sort = 1;
		var $ = require_export();
		var uncurryThis = requireFunctionUncurryThis();
		var aCallable = requireACallable();
		var toObject = requireToObject();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var deletePropertyOrThrow = requireDeletePropertyOrThrow();
		var toString = requireToString();
		var fails = requireFails();
		var internalSort = requireArraySort();
		var arrayMethodIsStrict = requireArrayMethodIsStrict();
		var FF = requireEnvironmentFfVersion();
		var IE_OR_EDGE = requireEnvironmentIsIeOrEdge();
		var V8 = requireEnvironmentV8Version();
		var WEBKIT = requireEnvironmentWebkitVersion();

		var test = [];
		var nativeSort = uncurryThis(test.sort);
		var push = uncurryThis(test.push);

		// IE8-
		var FAILS_ON_UNDEFINED = fails(function () {
		  test.sort(undefined);
		});
		// V8 bug
		var FAILS_ON_NULL = fails(function () {
		  test.sort(null);
		});
		// Old WebKit
		var STRICT_METHOD = arrayMethodIsStrict('sort');

		var STABLE_SORT = !fails(function () {
		  // feature detection can be too slow, so check engines versions
		  if (V8) return V8 < 70;
		  if (FF && FF > 3) return;
		  if (IE_OR_EDGE) return true;
		  if (WEBKIT) return WEBKIT < 603;

		  var result = '';
		  var code, chr, value, index;

		  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
		  for (code = 65; code < 76; code++) {
		    chr = String.fromCharCode(code);

		    switch (code) {
		      case 66: case 69: case 70: case 72: value = 3; break;
		      case 68: case 71: value = 4; break;
		      default: value = 2;
		    }

		    for (index = 0; index < 47; index++) {
		      test.push({ k: chr + index, v: value });
		    }
		  }

		  test.sort(function (a, b) { return b.v - a.v; });

		  for (index = 0; index < test.length; index++) {
		    chr = test[index].k.charAt(0);
		    if (result.charAt(result.length - 1) !== chr) result += chr;
		  }

		  return result !== 'DGBEFHACIJK';
		});

		var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

		var getSortCompare = function (comparefn) {
		  return function (x, y) {
		    if (y === undefined) return -1;
		    if (x === undefined) return 1;
		    if (comparefn !== undefined) return +comparefn(x, y) || 0;
		    return toString(x) > toString(y) ? 1 : -1;
		  };
		};

		// `Array.prototype.sort` method
		// https://tc39.es/ecma262/#sec-array.prototype.sort
		$({ target: 'Array', proto: true, forced: FORCED }, {
		  sort: function sort(comparefn) {
		    if (comparefn !== undefined) aCallable(comparefn);

		    var array = toObject(this);

		    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

		    var items = [];
		    var arrayLength = lengthOfArrayLike(array);
		    var itemsLength, index;

		    for (index = 0; index < arrayLength; index++) {
		      if (index in array) push(items, array[index]);
		    }

		    internalSort(items, getSortCompare(comparefn));

		    itemsLength = lengthOfArrayLike(items);
		    index = 0;

		    while (index < itemsLength) array[index] = items[index++];
		    while (index < arrayLength) deletePropertyOrThrow(array, index++);

		    return array;
		  }
		});
		return es_array_sort;
	}

	requireEs_array_sort();

	String.prototype.camelCaseToSeparatedCase = function (separator) {
	  let arr = this.toString().split("");
	  return arr.map((e, i) => {
	    let addDash = i > 0 && (!isNaN(e) && isNaN(arr[i - 1]) || isNaN(e) && !isNaN(arr[i - 1]) || isNaN(e) && e == e.toUpperCase());
	    return "".concat(addDash ? separator : "").concat(e.toLowerCase());
	  }).join("");
	};
	String.prototype.camelCaseToSnakeCase = function () {
	  return this.camelCaseToSeparatedCase("_");
	};
	String.prototype.camelCaseToKebabCase = function () {
	  return this.camelCaseToSeparatedCase("-");
	};
	String.prototype.replaceAt = function (index, length, text) {
	  return "".concat(this.toString().slice(0, index)).concat(text).concat(this.toString().slice(index + length));
	};
	String.prototype.insertAt = function (index, text) {
	  return this.toString().replaceAt(index, 0, text);
	};
	String.prototype.populateWithEntities = function (entities) {
	  let text = this.toString();
	  let out = text;
	  let toReplace = [];

	  // urls
	  if (entities.urls) {
	    for (let url of entities.urls) {
	      toReplace.push({
	        [url.indices[0]]: "<a href=\"",
	        [url.indices[1]]: "\" target=\"_blank\">".concat(url.display_url, "</a> ")
	      });
	    }
	  }

	  // users
	  if (entities.user_mentions) {
	    for (let user of entities.user_mentions) {
	      let x = text.slice(user.indices[0], user.indices[0] + 1) == "@" ? 0 : 1;
	      toReplace.push({
	        [user.indices[0] + x]: "<a href=\"/".concat(user.screen_name, "\">"),
	        [user.indices[1] + x]: "</a> "
	      });
	    }
	  }

	  // hashtags
	  if (entities.hashtags) {
	    for (let hashtag of entities.hashtags) {
	      let x = text.slice(hashtag.indices[0], hashtag.indices[0] + 1) == "#" ? 0 : 1;
	      toReplace.push({
	        [hashtag.indices[0] + x]: "<a href=\"/hashtag/".concat(hashtag.text, "\">"),
	        [hashtag.indices[1] + x]: "</a> "
	      });
	    }
	  }

	  // change indices if emoji(s) appear before the entity
	  // reason: multiple > 0xFFFF codepoint emojis are counted wrong: all but the first emoji have their length reduced by 1.
	  // also, if any emoji > 0xFFFF precedes a url, the indices of the url are misaligned by -1.
	  if (!REGEX.EMOJI) {
	    globalLogger.error("error with emoji-regex.txt.");
	  } else {
	    let match;
	    let counter = 0;
	    while ((match = REGEX.EMOJI.exec(text)) != null) {
	      let e = match[1];
	      if (e.codePointAt(0) < 0xFFFF) continue;
	      counter++;
	      for (let i in toReplace) {
	        let tmp = Object.entries(toReplace[i]);
	        // skip if not url and first element
	        if (tmp[0][1] != "<a href=\"" && counter == 1) continue;
	        if (parseInt(tmp[0][0]) >= match.index) {
	          toReplace[i] = {
	            [parseInt(tmp[0][0]) + 1]: tmp[0][1],
	            [parseInt(tmp[1][0]) + 1]: tmp[1][1]
	          };
	        }
	      }
	    }
	  }

	  // sort array
	  toReplace = toReplace.sort((a, b) => parseInt(Object.keys(a)[0]) - parseInt(Object.keys(b)[0]));

	  // replace values
	  let offset = 0;
	  for (let e of toReplace) {
	    for (let [index, value] of Object.entries(e)) {
	      out = out.insertAt(parseInt(index) + offset, value);
	      offset += value.length;
	    }
	  }
	  if (Settings.get("expandTcoShortlinks")) {
	    let re = /href="(https:\/\/t\.co\/[^"]+)"/;
	    let match;
	    while ((match = re.exec(out)) != null) {
	      out = out.replace(new RegExp("href=\"".concat(match[1], "\"")), "href=\"".concat(entities.urls.find(e => e.url == match[1]).expanded_url, "\""));
	    }
	  }
	  return out;
	};
	String.prototype.replaceEmojis = function () {
	  if (!REGEX.EMOJI) {
	    globalLogger.error("error with emoji-regex.txt.");
	    return this;
	  }
	  let text = this.toString().replace(/([#\*0-9])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]\u20E3/g, "$1\u20E3").replace(/([#\*0-9])\uFE0F/g, "$1");
	  let out = text;
	  let match;
	  let offset = 0;
	  while ((match = REGEX.EMOJI.exec(text)) != null) {
	    let e = match[1];
	    // get unicode of emoji
	    let uni = [];
	    for (let i = 0; i < e.length; i++) {
	      uni.push(e.codePointAt(i).toString(16));
	      if (e.codePointAt(i) > 0xFFFF) i++;
	    }

	    // remove fe0f from non joined emojis
	    if (uni.length > 1 && uni[1].match(/^FE0F$/i)) uni.pop();

	    // replace with image
	    // https://abs-0.twimg.com/emoji/v2/svg/1f647.svg
	    // https://abs-0.twimg.com/emoji/v2/svg/1f647-200d-2640-fe0f.svg
	    let img = "<img src=\"https://abs-0.twimg.com/emoji/v2/svg/".concat(uni.join("-"), ".svg\" alt=\"").concat(e, "\" class=\"gt2-emoji\" />");
	    out = out.replaceAt(match.index + offset, e.length, img);
	    offset += img.length - e.length;
	  }
	  return out;
	};

	var CloseSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z\"/>\r\n    </g>\r\n</svg>\r\n";

	var MoreHoriz = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z\"/>\r\n    </g>\r\n</svg>\r\n";

	var MoonSvg = "<svg class=\"gt2-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <g>\r\n        <path d=\"M 13.277344 24 C 16.976562 24 20.355469 22.316406 22.597656 19.554688 C 22.929688 19.148438 22.566406 18.550781 22.054688 18.648438 C 16.234375 19.757812 10.886719 15.292969 10.886719 9.417969 C 10.886719 6.03125 12.699219 2.917969 15.644531 1.242188 C 16.097656 0.984375 15.984375 0.296875 15.46875 0.199219 C 14.746094 0.0664062 14.011719 0 13.277344 0 C 6.652344 0 1.277344 5.367188 1.277344 12 C 1.277344 18.625 6.644531 24 13.277344 24 Z M 13.277344 24 \"/>\r\n    </g>\r\n</svg>\r\n";

	const _logger$2 = new Logger("component/sidebar");

	/**
	 * Initializes the sidebars by adding them and watching the elements for changes.
	 */
	function initializeSidebar() {
	  _logger$2.debug("initializing sidebar");
	  addLeftSidebar();
	  addRightSidebar();
	  addSidebarElements();
	  handleTrends();
	  handleProfileMedia();
	  handleListenLiveInSpaces();
	  handleGetVerified();

	  // @option hideFollowSuggestions
	  if (Settings.get("hideFollowSuggestions")) {
	    let sel = Settings.get("hideFollowSuggestionsSidebarSel");

	    // user suggestions (Who to follow, You might like)
	    if ((sel & 1) == 1) {
	      waitForElements("div[data-testid=sidebarColumn] aside [data-testid=UserCell]", e => {
	        e.closest("aside").parentElement.remove();
	      }, {
	        waitOnce: false
	      });
	    }

	    // topic suggestions
	    if ((sel & 2) == 2) {
	      waitForElements("div[data-testid=sidebarColumn] section [href^=\"/i/topics/\"]", e => {
	        e.closest("section").parentElement.parentElement.remove();
	      }, {
	        waitOnce: false
	      });
	    }
	  }
	  waitForElements(".gt2-sidebar-notice-close > *", e => e.addEventListener("click", event => {
	    let container = event.target.closest(".gt2-sidebar-notice");
	    console.log(container.dataset.noticeId);
	    dismissSidebarNotice(container.dataset.noticeId);
	    container.remove();
	  }), {
	    waitOnce: false
	  });
	  waitForElements(".gt2-toggle-acc-switcher-dropdown", button => {
	    const original = document.querySelector("[data-testid=SideNav_AccountSwitcher_Button]");
	    addClickHandlerToMockElement(button, original, () => {
	      const position = button.getBoundingClientRect();
	      const style = /*html*/"\n                <style>\n                    [data-testid=hoverCardParent] {\n                        left: ".concat(Math.round(position.left) - 274, "px !important;\n                        top: ").concat(Math.round(position.top) + 35, "px !important;\n                    }\n                    [data-testid=HoverCard] > svg {\n                        display: none;\n                    }\n                </style>");
	      waitForElements("#layers [data-testid=hoverCardParent]", card => {
	        card.insertAdjacentHTML("beforebegin", style);
	      });
	    });
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Adds the left sidebar to the DOM.
	 */
	function addLeftSidebar() {
	  waitForElements("main > div > div > div", mainView => {
	    if (document.querySelector(".gt2-left-sidebar")) return;
	    mainView.insertAdjacentHTML("afterbegin", /*html*/"\n            <div class=\"gt2-left-sidebar-container\">\n                <div class=\"gt2-left-sidebar\"></div>\n            </div>");
	    _logger$2.debug("added left sidebar");
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Adds the right helper sidebar to the DOM
	 */
	function addRightSidebar() {
	  waitForElements("div[data-testid=sidebarColumn] > div > div:nth-child(2) > div > div > div", container => {
	    if (document.querySelector(".gt2-right-sidebar") || container.matches("[role=progressbar]")) return;
	    container.insertAdjacentHTML("afterbegin", /*html*/"<div class=\"gt2-right-sidebar\"></div>");
	    _logger$2.debug("added right sidebar");
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Adds the actual elements to the left sidebar.
	 *
	 * If the there isn't enough screen space available, they get added to the one on the right.
	 */
	function addSidebarElements() {
	  let insertAt = isSet(getSidebarType(), ESidebar.Left) ? ".gt2-left-sidebar" : ".gt2-right-sidebar";
	  waitForElements(insertAt, sidebar => {
	    if (sidebar.querySelector(".gt2-dashboard-profile")) return;
	    sidebar.replaceChildren();
	    sidebar.insertAdjacentHTML("afterbegin", /*html*/"\n            ".concat(getUpdateNoticeHtml(), "\n            ").concat(getDashboardProfileHtml(), "\n            ").concat(getLegacyProfileInfoHtml()));
	    _logger$2.debug("added static elements to", insertAt);
	    addClickHandlersToDashboardProfile();
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Gets the HTML of the current GT2 update notice.
	 * @returns the HTML of the current GT2 update notice
	 */
	function getUpdateNoticeHtml() {
	  let version = GM_info.script.version;
	  const key = "gt2-update-".concat(version);
	  // check if update notice needs to be shown
	  if (!Settings.get("updateNotifications") || isSidebarNoticeDismissed(key)) {
	    return "";
	  }
	  return /*html*/"\n        <div\n          class=\"gt2-sidebar-notice gt2-update-notice gt2-left-sidebar-element\"\n          data-notice-id=\"gt2-update-".concat(version, "\"\n        >\n            <div class=\"gt2-sidebar-notice-header\">\n                <span>GoodTwitter2</span>\n                <div class=\"gt2-sidebar-notice-close\">\n                    <div class=\"gt2-icon-hover-dummy\"></div>\n                    ").concat(CloseSvg, "\n                </div>\n            </div>\n            <div class=\"gt2-sidebar-notice-content\">\n                ").concat(CheckSvg, " ").concat(getLocalizedString("updatedInfo").replace("$version$", "v".concat(version)), "<br />\n                <a\n                    href=\"https://github.com/Bl4Cc4t/GoodTwitter2/releases/tag/v").concat(version, "\"\n                    target=\"_blank\"\n                >\n                    ").concat(getLocalizedString("updatedInfoChangelog"), "\n                </a>\n            </div>\n        </div>");
	}

	/**
	 * Gets the HTML of the dashboard profile.
	 * @returns the HTML of the dashboard profile
	 */
	function getDashboardProfileHtml() {
	  let i = getCurrentUserInfo();
	  let href = isLoggedIn() ? "href" : "data-href";
	  return /*html*/"\n        <div class=\"gt2-dashboard-profile gt2-left-sidebar-element\">\n            <a ".concat(href, "=\"/").concat(i.screenName, "\" class=\"gt2-banner\" style=\"background-image: ").concat(i.bannerUrl ? "url(".concat(i.bannerUrl, "/600x200)") : "unset", ";\"></a>\n                <div>\n                    <a ").concat(href, "=\"/").concat(i.screenName, "\" class=\"gt2-avatar\">\n                        <img src=\"").concat(i.avatarUrl, "\" alt=\"\" />\n                    </a>\n                <div class=\"gt2-user\">\n                    <a ").concat(href, "=\"/").concat(i.screenName, "\" class=\"gt2-name\">").concat(i.name.replaceEmojis(), "</a>\n                    <a ").concat(href, "=\"/").concat(i.screenName, "\" class=\"gt2-screenname\">\n                        @<span >").concat(i.screenName, "</span>\n                    </a>\n                </div>\n                ").concat(isLoggedIn() ? "\n                    <div class=\"gt2-toggle-acc-switcher-dropdown\">\n                        <div class=\"gt2-icon-hover-dummy\"></div>\n                        ".concat(MoreHoriz, "\n                    </div>") : "\n                    <div class=\"gt2-toggle-lo-nightmode\">\n                        <div class=\"gt2-icon-hover-dummy\"></div>\n                        ".concat(MoonSvg, "\n                    </div>"), "\n                <div class=\"gt2-stats\">\n                    <ul>\n                        <li>\n                            <a ").concat(href, "=\"/").concat(i.screenName, "\">\n                                <span>").concat(getLocalizedString("statsTweets"), "</span>\n                                <span>").concat(i.stats.tweets.humanize(), "</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a ").concat(href, "=\"/").concat(i.screenName, "/following\">\n                                <span>").concat(getLocalizedString("statsFollowing"), "</span>\n                                <span>").concat(i.stats.following.humanize(), "</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a ").concat(href, "=\"/").concat(i.screenName, "/followers\">\n                                <span>").concat(getLocalizedString("statsFollowers"), "</span>\n                                <span>").concat(i.stats.followers.humanize(), "</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>");
	}

	/**
	 * Adds click handlers to the dshboard profile for soft links.
	 */
	function addClickHandlersToDashboardProfile() {
	  _logger$2.debug("adding click handlers to dashboard profile");
	  document.querySelectorAll(".gt2-dashboard-profile a").forEach(e => addLinkClickHandler(e));
	}

	/**
	 * Gets the HTML for the legacy profile layout sidebar component
	 * @returns the HTML of the legacy profile layout sidebar component
	 */
	function getLegacyProfileInfoHtml() {
	  const element = document.querySelector(".gt2-legacy-profile-info");
	  if (element) return element.outerHTML;
	  return /*html*/"\n        <div class=\"gt2-legacy-profile-info gt2-left-sidebar-element\">\n            <div class=\"gt2-legacy-profile-name\"></div>\n            <div class=\"gt2-legacy-profile-screen-name-wrap\">\n                <span class=\"gt2-legacy-profile-screen-name\"></span>\n                <span class=\"gt2-legacy-profile-follows-you\"></span>\n            </div>\n            <div class=\"gt2-legacy-profile-automated\"></div>\n            <div class=\"gt2-legacy-profile-description\"></div>\n            <div class=\"gt2-legacy-profile-items\"></div>\n            <div class=\"gt2-legacy-profile-followers-you-follow\"></div>\n        </div>";
	}

	/**
	 * Handles trends in the sidebar (hiding, moving, wrapping as links).
	 */
	function handleTrends() {
	  let trendsSelector = "section:not(.gt2-trends-handled) div[data-testid=trend]:not(.gt2-trend-wrapped),\n     section[aria-labelledby^=accessible-list]:not(.gt2-trends-handled) a[href=\"/explore/tabs/for-you\"] > div > span:not(.gt2-trend-wrapped)";
	  waitForElements(trendsSelector, trends => {
	    let trendSection = trends.closest("section");
	    let trendContainer = trendSection.parentElement;

	    // actions for the whole container
	    if (!trendSection.classList.contains("gt2-trends-handled") && trends.closest("div[data-testid=sidebarColumn]")) {
	      // hide trends
	      if (Settings.get("hideTrends")) {
	        trendContainer.remove();
	        _logger$2.debug("removed trends");
	        return;
	      }
	      trendSection.classList.add("gt2-trends-handled");
	      trendContainer.classList.add("gt2-sidebar-element-trends");

	      // move trends
	      if (Settings.get("leftTrends")) {
	        trendContainer.classList.add("gt2-left-sidebar-element");
	        if (isSet(getSidebarType(), ESidebar.Left)) {
	          let leftSidebarTrends = document.querySelector(".gt2-left-sidebar .gt2-sidebar-element-trends");

	          // replace existing trends
	          if (leftSidebarTrends) {
	            leftSidebarTrends.replaceWith(trendContainer);
	            _logger$2.debug("replaced existing trends in left sidebar");
	          }

	          // move trends
	          else {
	            var _document$querySelect;
	            (_document$querySelect = document.querySelector(".gt2-left-sidebar")) === null || _document$querySelect === void 0 || _document$querySelect.append(trendContainer);
	            _logger$2.debug("moved trends to left sidebar");
	          }
	        }
	      }
	    }

	    // wrap trends in anchors
	    // TODO handle non-hashtags, reprocess on update
	    let toWrap = trends.querySelector(":scope > div > div:nth-child(2) > span [dir]");
	    if (toWrap) {
	      trends.classList.add("gt2-trend-wrapped");
	      let text = toWrap.innerText;
	      let query = encodeURIComponent(text.replace(/%/g, "%25")).replace(/'/g, "%27").replace(/(^"|"$)/g, "");
	      toWrap.innerHTML = /*html*/"<a class=\"gt2-trend\" href=\"/search?q=".concat(text.includes("#") ? query : "%22".concat(query, "%22"), "\">").concat(text, "</a>");
	      addLinkClickHandler(toWrap.querySelector(".gt2-trend"));
	    }
	  }, {
	    waitOnce: false
	  });
	}

	/**
	 * Moves sidebar elements to the specified side(bar).
	 * @param targetSide where to move the sidebar elements to
	 */
	function moveSidebarElements(targetSide) {
	  // check if there are elements to move
	  let opposite = targetSide == "left" ? "right" : "left";
	  if (document.querySelectorAll(".gt2-".concat(opposite, "-sidebar > *")).length == 0) return;
	  let sidebar = document.querySelector(".gt2-".concat(targetSide, "-sidebar"));
	  if (!sidebar) {
	    _logger$2.error("".concat(targetSide, " sidebar not found while trying to move elements."));
	    return;
	  }
	  let elements = document.querySelectorAll(".gt2-left-sidebar-element");
	  sidebar.append(...Array.from(elements));
	  _logger$2.debug("moved ".concat(elements.length, " elements to the ").concat(targetSide, " sidebar"));
	}

	/**
	 * Handles the profile page media element.
	 */
	function handleProfileMedia() {
	  let mediaSelector = "\n        [data-testid=sidebarColumn] div:nth-child(1) > a[href*=\"/photo/\"],\n        [data-testid=sidebarColumn] div:nth-child(1) > a[href*=\"/video/\"]";
	  waitForElements(mediaSelector, media => {
	    let container = document.querySelector(".gt2-sidebar-element-profile-media");
	    let placeLeft = Settings.get("leftMedia");

	    // add container element if it does not exist
	    if (!container) {
	      let sidebar = document.querySelector(".gt2-".concat(placeLeft && isSet(getSidebarType(), ESidebar.Left) ? "left" : "right", "-sidebar"));
	      if (!sidebar) {
	        _logger$2.error("sidebar not found");
	        return;
	      }
	      sidebar.insertAdjacentHTML("beforeend", /*html*/"\n                <div class=\"gt2-sidebar-element-profile-media ".concat(placeLeft ? "gt2-left-sidebar-element" : "", "\"></div>"));
	      container = document.querySelector(".gt2-sidebar-element-profile-media");
	    }
	    let containerIsLeft = container.classList.contains("gt2-left-sidebar-element");

	    // move container to left sidebar if needed
	    if (placeLeft && !containerIsLeft) {
	      _logger$2.debug("moving profile media to left sidebar");
	      document.querySelector(".gt2-left-sidebar").append(container);
	    }

	    // move container to right sidebar if needed
	    else if (!placeLeft && containerIsLeft) {
	      _logger$2.debug("moving profile media to right sidebar");
	      document.querySelector(".gt2-right-sidebar").append(container);
	    }

	    // replace content
	    let mediaElement = media.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	    container.replaceChildren(mediaElement);
	  }, {
	    waitOnce: false
	  });
	}
	function handleListenLiveInSpaces() {
	  const key = "listen-live-in-spaces";
	  waitForElements("[data-testid=placementTracking]", e => {
	    const propExists = reactPropExists(e, "socialProof");
	    if (!propExists || !e.querySelector("[data-testid=pill-contents-container]")) return;
	    handleSidebarNotice(e.parentElement, key);
	  }, {
	    waitOnce: false
	  });
	}
	function handleGetVerified() {
	  const key = "get-verified";
	  waitForElements("[data-testid=sidebarColumn] [href=\"/i/verified-choose\"]", e => {
	    var _e$closest;
	    const container = e === null || e === void 0 || (_e$closest = e.closest("aside")) === null || _e$closest === void 0 ? void 0 : _e$closest.parentElement;
	    if (!container) return;
	    handleSidebarNotice(container, key);
	  }, {
	    waitOnce: false
	  });
	}
	function handleSidebarNotice(container, key) {
	  container.classList.add("gt2-sidebar-element-".concat(key), "gt2-sidebar-notice");
	  container.dataset.noticeId = key;
	  if (isSidebarNoticeDismissed(key)) {
	    _logger$2.debug("removing sidebar notice with key \"".concat(key, "\""));
	    container.remove();
	    return;
	  }

	  // add close button
	  container.insertAdjacentHTML("beforeend", /*html*/"\n        <div class=\"gt2-sidebar-notice-close\">\n            <div class=\"gt2-icon-hover-dummy\"></div>\n            ".concat(CloseSvg, "\n        </div>"));
	}

	const _logger$1 = new Logger("responsive");

	/**
	 * Adds an event handler for document scroll events.
	 */
	function addScrollHandler() {
	  function scrollHandler() {
	    let currentY = window.scrollY;

	    // prevent auto scroll to top on /search and /explore
	    if (previousY > 1500 && currentY == 0 && document.body.dataset.pageType == "search") {
	      window.scroll(0, previousY);
	      return;
	    }
	    if (previousY < currentY) document.body.classList.add("gt2-scrolled-down");else document.body.classList.remove("gt2-scrolled-down");
	    previousY = currentY;

	    // legacy profile banner parallax
	    if (document.body.dataset.pageType == "profile") {
	      const bannerHeight = GM_getValue(GM_KEYS.LEGACY_PROFILE_BANNER_HEIGHT);
	      if (currentY > bannerHeight) {
	        document.body.classList.add("gt2-scrolled-down-banner");
	      } else {
	        document.body.classList.remove("gt2-scrolled-down-banner");
	        document.querySelector(".gt2-legacy-profile-banner img").style.transform = "translate3d(0px, ".concat(currentY / bannerHeight * 42, "%, 0px)");
	      }
	    }
	  }
	  let previousY = window.scrollY;
	  _logger$1.debug("adding scroll event handler");
	  document.addEventListener("scroll", scrollHandler);
	}

	/**
	 * Adds an event handler to the window for resize events.
	 */
	function addResizeHandler() {
	  function resizeHandler() {
	    // set banner height
	    const bannerHeight = (window.innerWidth - getScrollbarWidth()) / 3 - 15;
	    GM_setValue(GM_KEYS.LEGACY_PROFILE_BANNER_HEIGHT, bannerHeight);

	    // sidebar
	    const type = getSidebarType();
	    if (isSet(type, ESidebar.Left)) moveSidebarElements("left");else if (isSet(type, ESidebar.Right)) moveSidebarElements("right");
	  }
	  _logger$1.debug("adding resize event handler");
	  window.addEventListener("resize", resizeHandler);
	  resizeHandler();
	}

	/**
	 * Adds an event handler for visibility changes on the document
	 */
	function addVisibilityChangeHandler() {
	  document.addEventListener("visibilitychange", () => {
	    Settings.setAllInDom();
	  }, {
	    passive: true
	  });
	}

	var es_symbol_description = {};

	var hasRequiredEs_symbol_description;

	function requireEs_symbol_description () {
		if (hasRequiredEs_symbol_description) return es_symbol_description;
		hasRequiredEs_symbol_description = 1;
		var $ = require_export();
		var DESCRIPTORS = requireDescriptors();
		var globalThis = requireGlobalThis();
		var uncurryThis = requireFunctionUncurryThis();
		var hasOwn = requireHasOwnProperty();
		var isCallable = requireIsCallable();
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var toString = requireToString();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var copyConstructorProperties = requireCopyConstructorProperties();

		var NativeSymbol = globalThis.Symbol;
		var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

		if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
		  // Safari 12 bug
		  NativeSymbol().description !== undefined
		)) {
		  var EmptyStringDescriptionStore = {};
		  // wrap Symbol constructor for correct work with undefined description
		  var SymbolWrapper = function Symbol() {
		    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
		    var result = isPrototypeOf(SymbolPrototype, this)
		      // eslint-disable-next-line sonarjs/inconsistent-function-call -- ok
		      ? new NativeSymbol(description)
		      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
		      : description === undefined ? NativeSymbol() : NativeSymbol(description);
		    if (description === '') EmptyStringDescriptionStore[result] = true;
		    return result;
		  };

		  copyConstructorProperties(SymbolWrapper, NativeSymbol);
		  SymbolWrapper.prototype = SymbolPrototype;
		  SymbolPrototype.constructor = SymbolWrapper;

		  var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
		  var thisSymbolValue = uncurryThis(SymbolPrototype.valueOf);
		  var symbolDescriptiveString = uncurryThis(SymbolPrototype.toString);
		  var regexp = /^Symbol\((.*)\)[^)]+$/;
		  var replace = uncurryThis(''.replace);
		  var stringSlice = uncurryThis(''.slice);

		  defineBuiltInAccessor(SymbolPrototype, 'description', {
		    configurable: true,
		    get: function description() {
		      var symbol = thisSymbolValue(this);
		      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
		      var string = symbolDescriptiveString(symbol);
		      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
		      return desc === '' ? undefined : desc;
		    }
		  });

		  $({ global: true, constructor: true, forced: true }, {
		    Symbol: SymbolWrapper
		  });
		}
		return es_symbol_description;
	}

	requireEs_symbol_description();

	var es_string_trimStart = {};

	var es_string_trimLeft = {};

	var stringTrimStart;
	var hasRequiredStringTrimStart;

	function requireStringTrimStart () {
		if (hasRequiredStringTrimStart) return stringTrimStart;
		hasRequiredStringTrimStart = 1;
		var $trimStart = requireStringTrim().start;
		var forcedStringTrimMethod = requireStringTrimForced();

		// `String.prototype.{ trimStart, trimLeft }` method
		// https://tc39.es/ecma262/#sec-string.prototype.trimstart
		// https://tc39.es/ecma262/#String.prototype.trimleft
		stringTrimStart = forcedStringTrimMethod('trimStart') ? function trimStart() {
		  return $trimStart(this);
		// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
		} : ''.trimStart;
		return stringTrimStart;
	}

	var hasRequiredEs_string_trimLeft;

	function requireEs_string_trimLeft () {
		if (hasRequiredEs_string_trimLeft) return es_string_trimLeft;
		hasRequiredEs_string_trimLeft = 1;
		var $ = require_export();
		var trimStart = requireStringTrimStart();

		// `String.prototype.trimLeft` method
		// https://tc39.es/ecma262/#sec-string.prototype.trimleft
		// eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
		$({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimLeft !== trimStart }, {
		  trimLeft: trimStart
		});
		return es_string_trimLeft;
	}

	var hasRequiredEs_string_trimStart;

	function requireEs_string_trimStart () {
		if (hasRequiredEs_string_trimStart) return es_string_trimStart;
		hasRequiredEs_string_trimStart = 1;
		// TODO: Remove this line from `core-js@4`
		requireEs_string_trimLeft();
		var $ = require_export();
		var trimStart = requireStringTrimStart();

		// `String.prototype.trimStart` method
		// https://tc39.es/ecma262/#sec-string.prototype.trimstart
		// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
		$({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimStart !== trimStart }, {
		  trimStart: trimStart
		});
		return es_string_trimStart;
	}

	requireEs_string_trimStart();

	const _logger = new Logger("component", "profile");
	function initializeProfile() {
	  _logger.debug("initializing profile page");
	  addLegacyProfileHeaderSkeleton();
	  if (Settings.get("legacyProfile")) rebuildLegacyProfilePage();else if (Settings.get("expandTcoShortlinks")) expandProfileTcoShortlinks();
	}

	/**
	 * Checks for t.co shortlinks in the normal profile page and expands them.
	 */
	function expandProfileTcoShortlinks() {
	  let urls = [];
	  watchForElementChanges("[data-testid=UserName]", userNameElement => {
	    var _userInfo$entities$ur, _userInfo$entities$ur2, _userInfo$entities$de, _userInfo$entities$de2;
	    const userInfo = getReactPropByName(userNameElement, "user", true);
	    if (!userInfo) return;
	    urls = ((_userInfo$entities$ur = (_userInfo$entities$ur2 = userInfo.entities.url) === null || _userInfo$entities$ur2 === void 0 ? void 0 : _userInfo$entities$ur2.urls) !== null && _userInfo$entities$ur !== void 0 ? _userInfo$entities$ur : []).concat((_userInfo$entities$de = (_userInfo$entities$de2 = userInfo.entities.description) === null || _userInfo$entities$de2 === void 0 ? void 0 : _userInfo$entities$de2.urls) !== null && _userInfo$entities$de !== void 0 ? _userInfo$entities$de : []);
	  });
	  waitForElements("[data-testid=UserName] ~ * a", anchor => {
	    expandTcoShortlink(anchor, urls);
	  });
	}

	/**
	 * Adds the skeleton HTML of the legacy profile layout to the DOM.
	 */
	function addLegacyProfileHeaderSkeleton() {
	  waitForElements("header", header => {
	    if (document.querySelector(".gt2-legacy-profile-banner")) return;
	    header.insertAdjacentHTML("afterend", /*html*/"\n            <div class=\"gt2-legacy-profile-banner\">\n                <img src=\"\" alt=\"\" />\n            </div>\n            <div class=\"gt2-legacy-profile-nav\">\n                <div class=\"gt2-legacy-profile-nav-left\">\n                    <div class=\"gt2-legacy-profile-nav-avatar\">\n                        <img src=\"\" alt=\"\" />\n                    </div>\n                    <div>\n                        <div class=\"gt2-legacy-profile-name\"></div>\n                        <div class=\"gt2-legacy-profile-screen-name-wrap\">\n                            <span class=\"gt2-legacy-profile-screen-name\"></span>\n                            <span class=\"gt2-legacy-profile-follows-you\"></span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"gt2-legacy-profile-nav-center\">\n                    <a class=\"gt2-legacy-profile-stats-tweets\" href=\"\" title=\"\">\n                        <div>".concat(getLocalizedString("statsTweets"), "</div>\n                        <div data-gt2-stat-content></div>\n                    </a>\n                    <a class=\"gt2-legacy-profile-stats-following\" href=\"\" title=\"\">\n                        <div>").concat(getLocalizedString("statsFollowing"), "</div>\n                        <div data-gt2-stat-content></div>\n                    </a>\n                    <a class=\"gt2-legacy-profile-stats-followers\" href=\"\" title=\"\">\n                        <div>").concat(getLocalizedString("statsFollowers"), "</div>\n                        <div data-gt2-stat-content></div>\n                    </a>\n                    <a class=\"gt2-legacy-profile-stats-likes\" href=\"\" title=\"\">\n                        <div>").concat(getLocalizedString("statsLikes"), "</div>\n                        <div data-gt2-stat-content></div>\n                    </a>\n                </div>\n                <div class=\"gt2-legacy-profile-nav-right\"></div>\n            </div>"));
	  });
	}

	/**
	 * Adds data to the legacy profile page skeleton.
	 */
	function rebuildLegacyProfilePage() {
	  var _document$querySelect2;
	  _logger.debug("rebuilding legacy profile page");
	  let userInfo;
	  watchForMultipleElementChanges("[data-testid=UserName]", ".gt2-legacy-profile-info", userNameElement => {
	    var _userInfo$profile_ban;
	    userInfo = getReactPropByName(userNameElement, "user", true);
	    if (!userInfo) return;
	    _logger.debug("found changed userName element", userInfo);

	    // avatar
	    const avatarElement = document.querySelector(".gt2-legacy-profile-nav-avatar");
	    avatarElement.dataset.gt2AvatarHex = String(userInfo.profile_image_shape == "Hexagon");
	    avatarElement.querySelector("img").setAttribute("src", userInfo.profile_image_url_https.replace(REGEX.AVATAR_SUFFIX, "_400x400"));

	    // banner
	    document.querySelector(".gt2-legacy-profile-banner img").setAttribute("src", (_userInfo$profile_ban = userInfo.profile_banner_url) !== null && _userInfo$profile_ban !== void 0 ? _userInfo$profile_ban : "");

	    // name
	    const nameElement = userNameElement.querySelector(":scope > div:nth-child(1) > div > div:nth-child(1) > div");
	    document.querySelectorAll(".gt2-legacy-profile-name").forEach(e => e.replaceChildren(nameElement.cloneNode(true)));

	    // screenName
	    document.querySelectorAll(".gt2-legacy-profile-screen-name").forEach(e => e.replaceChildren(userInfo.screen_name));

	    // follows you
	    const followsYouElement = userNameElement.querySelector("[data-testid=userFollowIndicator]");
	    document.querySelectorAll(".gt2-legacy-profile-follows-you").forEach(e => {
	      var _followsYouElement$cl;
	      return e.replaceChildren((_followsYouElement$cl = followsYouElement === null || followsYouElement === void 0 ? void 0 : followsYouElement.cloneNode(true)) !== null && _followsYouElement$cl !== void 0 ? _followsYouElement$cl : "");
	    });

	    // stats
	    const statData = [{
	      selector: ".gt2-legacy-profile-stats-tweets",
	      href: "/".concat(userInfo.screen_name),
	      count: userInfo.statuses_count
	    }, {
	      selector: ".gt2-legacy-profile-stats-following",
	      href: "/".concat(userInfo.screen_name, "/following"),
	      count: userInfo.friends_count
	    }, {
	      selector: ".gt2-legacy-profile-stats-followers",
	      href: "/".concat(userInfo.screen_name, "/followers"),
	      count: userInfo.followers_count
	    }, {
	      selector: ".gt2-legacy-profile-stats-likes",
	      href: "/".concat(userInfo.screen_name, "/likes"),
	      count: userInfo.favourites_count
	    }];
	    for (const {
	      selector,
	      href,
	      count
	    } of statData) {
	      const anchor = document.querySelector(selector);
	      anchor.setAttribute("href", href);
	      anchor.setAttribute("title", count.humanize());
	      anchor.querySelector("[data-gt2-stat-content]").replaceChildren(count.humanizeShort());
	      addLinkClickHandler(anchor);
	    }

	    // description (empty)
	    if (!userInfo.description || userInfo.description == "") {
	      var _document$querySelect;
	      (_document$querySelect = document.querySelector(".gt2-legacy-profile-description")) === null || _document$querySelect === void 0 || _document$querySelect.replaceChildren("");
	    }

	    // buttons
	    const buttons = userNameElement.previousElementSibling.querySelector(":scope > :not([data-testid])");
	    if (buttons) {
	      document.querySelector(".gt2-legacy-profile-nav-right").replaceChildren(buttons);
	    }
	  }, {
	    waitOnce: false,
	    mutationObserverOptions: {
	      subtree: true
	    }
	  }, {
	    waitOnce: false
	  });

	  // items
	  watchForMultipleElementChanges("[data-testid=primaryColumn] [data-testid=UserProfileHeader_Items]", ".gt2-legacy-profile-items", (source, destination) => {
	    _logger.debug("found items element");
	    destination.replaceChildren(source.cloneNode(true));

	    // go over all links
	    destination.querySelectorAll("a").forEach(a => {
	      if (Settings.get("expandTcoShortlinks")) {
	        var _userInfo$entities$ur3, _userInfo$entities$ur4;
	        expandTcoShortlink(a, (_userInfo$entities$ur3 = (_userInfo$entities$ur4 = userInfo.entities.url) === null || _userInfo$entities$ur4 === void 0 ? void 0 : _userInfo$entities$ur4.urls) !== null && _userInfo$entities$ur3 !== void 0 ? _userInfo$entities$ur3 : []);
	      }
	    });

	    // mocked click handlers
	    const professionalCategory = destination.querySelector("[data-testid=UserProfessionalCategory]");
	    if (professionalCategory) {
	      addClickHandlerToMockElement(professionalCategory, source.querySelector("[data-testid=UserProfessionalCategory] [role=button]"));
	    }
	  }, {
	    waitOnce: false,
	    mutationObserverOptions: {
	      subtree: true
	    }
	  }, {
	    waitOnce: false
	  });

	  // description
	  watchForMultipleElementChanges("[data-testid=primaryColumn] [data-testid=UserDescription]", ".gt2-legacy-profile-description", (source, destination) => {
	    _logger.debug("found description element", source, destination);
	    destination.replaceChildren(source.cloneNode(true));

	    // go over all links
	    destination.querySelectorAll("a").forEach(a => {
	      // expand t.co links
	      if (Settings.get("expandTcoShortlinks")) {
	        var _userInfo$entities$de3, _userInfo$entities$de4;
	        expandTcoShortlink(a, (_userInfo$entities$de3 = (_userInfo$entities$de4 = userInfo.entities.description) === null || _userInfo$entities$de4 === void 0 ? void 0 : _userInfo$entities$de4.urls) !== null && _userInfo$entities$de3 !== void 0 ? _userInfo$entities$de3 : []);
	      }

	      // clicking @user
	      if (a.textContent.trimStart().startsWith("@")) {
	        const href = a.getAttribute("href");
	        const sourceA = source.querySelector("[href=\"".concat(href, "\"]"));
	        const onClick = getReactPropByName(sourceA, "onClick");
	        a.addEventListener("click", onClick);
	      }
	    });
	  }, {
	    waitOnce: false,
	    mutationObserverOptions: {
	      subtree: true
	    }
	  }, {
	    waitOnce: false
	  });

	  // followers you follow
	  (_document$querySelect2 = document.querySelector(".gt2-legacy-profile-followers-you-follow")) === null || _document$querySelect2 === void 0 || _document$querySelect2.replaceChildren("");
	  watchForMultipleElementChanges("[data-testid=primaryColumn] [href$=\"/followers_you_follow\"]", ".gt2-legacy-profile-followers-you-follow", (source, destination) => {
	    _logger.debug("found followers you follow element");
	    destination.replaceChildren(source.cloneNode(true));
	  }, {
	    waitOnce: false,
	    mutationObserverOptions: {
	      subtree: true
	    }
	  }, {
	    waitOnce: false
	  });
	}

	(() => {
	  // do not execute on these pages
	  if (!isLoggedIn() && location.pathname == "") return;

	  // redirect for mobile urls
	  if (location.host.startsWith("mobile.")) {
	    if (Settings.get("mobileRedirect")) {
	      location.href = location.href.replace("//mobile.", "//");
	    } else return;
	  }

	  // add settings to body
	  Settings.setAllInDom();
	  globalLogger.debug("set all settings in the dom");

	  // basic
	  overrideFunctions();
	  initializeLocation();
	  watchForTweets();

	  // styling
	  initializeStyle();

	  // components
	  initializeInlineTranslation();
	  initializeNavbar();
	  initializeSidebar();
	  initializeProfile();

	  // handlers
	  addScrollHandler();
	  addResizeHandler();
	  addVisibilityChangeHandler();
	})();

})();
