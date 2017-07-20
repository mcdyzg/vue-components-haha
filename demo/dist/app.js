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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (true) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (true) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (true) {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (true) {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (true) {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (true) {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (true) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (true) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.3';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (true) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}}"
}

function genForScopedSlot (key, el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el)) +
    '})'
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (true) {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(18)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(15);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);

	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory(__webpack_require__(0));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["Component"] = factory(require("vue"));else root["Component"] = factory(root["Vue"]);
})(this, function (__WEBPACK_EXTERNAL_MODULE_5__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
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
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "/";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 145);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports) {

      /* globals __VUE_SSR_CONTEXT__ */

      // this module is a runtime utility for cleaner component module output and will
      // be included in the final webpack user bundle

      module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, injectStyles, scopeId, moduleIdentifier /* server only */
      ) {
        var esModule;
        var scriptExports = rawScriptExports = rawScriptExports || {};

        // ES6 modules interop
        var type = _typeof2(rawScriptExports.default);
        if (type === 'object' || type === 'function') {
          esModule = rawScriptExports;
          scriptExports = rawScriptExports.default;
        }

        // Vue.extend constructor export interop
        var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports;

        // render functions
        if (compiledTemplate) {
          options.render = compiledTemplate.render;
          options.staticRenderFns = compiledTemplate.staticRenderFns;
        }

        // scopedId
        if (scopeId) {
          options._scopeId = scopeId;
        }

        var hook;
        if (moduleIdentifier) {
          // server build
          hook = function hook(context) {
            // 2.3 injection
            context = context || // cached call
            this.$vnode && this.$vnode.ssrContext || // stateful
            this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
              context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (injectStyles) {
              injectStyles.call(this, context);
            }
            // register component module identifier for async chunk inferrence
            if (context && context._registeredComponents) {
              context._registeredComponents.add(moduleIdentifier);
            }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
        } else if (injectStyles) {
          hook = injectStyles;
        }

        if (hook) {
          var functional = options.functional;
          var existing = functional ? options.render : options.beforeCreate;
          if (!functional) {
            // inject component registration as beforeCreate hook
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          } else {
            // register for functioal component in vue file
            options.render = function renderWithStyleInjection(h, context) {
              hook.call(context);
              return existing(h, context);
            };
          }
        }

        return {
          esModule: esModule,
          exports: scriptExports,
          options: options
        };
      };

      /***/
    },
    /* 1 */
    /***/function (module, exports) {

      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */
      // css base code, injected by the css-loader
      module.exports = function (useSourceMap) {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);
            if (item[2]) {
              return "@media " + item[2] + "{" + content + "}";
            } else {
              return content;
            }
          }).join("");
        };

        // import a list of modules into the list
        list.i = function (modules, mediaQuery) {
          if (typeof modules === "string") modules = [[null, modules, ""]];
          var alreadyImportedModules = {};
          for (var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if (typeof id === "number") alreadyImportedModules[id] = true;
          }
          for (i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
              if (mediaQuery && !item[2]) {
                item[2] = mediaQuery;
              } else if (mediaQuery) {
                item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
              }
              list.push(item);
            }
          }
        };
        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || '';
        var cssMapping = item[3];
        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function (source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
          });

          return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
        }

        return [content].join('\n');
      }

      // Adapted from convert-source-map (MIT)
      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
        var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

        return '/*# ' + data + ' */';
      }

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
        Modified by Evan You @yyx990803
      */

      var hasDocument = typeof document !== 'undefined';

      if (typeof DEBUG !== 'undefined' && DEBUG) {
        if (!hasDocument) {
          throw new Error('vue-style-loader cannot be used in a non-browser environment. ' + "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        }
      }

      var listToStyles = __webpack_require__(3);

      /*
      type StyleObject = {
        id: number;
        parts: Array<StyleObjectPart>
      }
      
      type StyleObjectPart = {
        css: string;
        media: string;
        sourceMap: ?string
      }
      */

      var stylesInDom = {/*
                         [id: number]: {
                         id: number,
                         refs: number,
                         parts: Array<(obj?: StyleObjectPart) => void>
                         }
                         */};

      var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
      var singletonElement = null;
      var singletonCounter = 0;
      var isProduction = false;
      var noop = function noop() {};

      // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
      // tags it will allow on a page
      var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

      module.exports = function (parentId, list, _isProduction) {
        isProduction = _isProduction;

        var styles = listToStyles(parentId, list);
        addStylesToDom(styles);

        return function update(newList) {
          var mayRemove = [];
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            domStyle.refs--;
            mayRemove.push(domStyle);
          }
          if (newList) {
            styles = listToStyles(parentId, newList);
            addStylesToDom(styles);
          } else {
            styles = [];
          }
          for (var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i];
            if (domStyle.refs === 0) {
              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j]();
              }
              delete stylesInDom[domStyle.id];
            }
          }
        };
      };

      function addStylesToDom(styles /* Array<StyleObject> */) {
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];
          if (domStyle) {
            domStyle.refs++;
            for (var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j]);
            }
            for (; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j]));
            }
            if (domStyle.parts.length > item.parts.length) {
              domStyle.parts.length = item.parts.length;
            }
          } else {
            var parts = [];
            for (var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j]));
            }
            stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
          }
        }
      }

      function createStyleElement() {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        head.appendChild(styleElement);
        return styleElement;
      }

      function addStyle(obj /* StyleObjectPart */) {
        var update, remove;
        var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');

        if (styleElement) {
          if (isProduction) {
            // has SSR styles and in production mode.
            // simply do nothing.
            return noop;
          } else {
            // has SSR styles but in dev mode.
            // for some reason Chrome can't handle source map in server-rendered
            // style tags - source maps in <style> only works if the style tag is
            // created and inserted dynamically. So we remove the server rendered
            // styles and inject new ones.
            styleElement.parentNode.removeChild(styleElement);
          }
        }

        if (isOldIE) {
          // use singleton mode for IE9.
          var styleIndex = singletonCounter++;
          styleElement = singletonElement || (singletonElement = createStyleElement());
          update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
          remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
        } else {
          // use multi-style-tag mode in all other cases
          styleElement = createStyleElement();
          update = applyToTag.bind(null, styleElement);
          remove = function remove() {
            styleElement.parentNode.removeChild(styleElement);
          };
        }

        update(obj);

        return function updateStyle(newObj /* StyleObjectPart */) {
          if (newObj) {
            if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
              return;
            }
            update(obj = newObj);
          } else {
            remove();
          }
        };
      }

      var replaceText = function () {
        var textStore = [];

        return function (index, replacement) {
          textStore[index] = replacement;
          return textStore.filter(Boolean).join('\n');
        };
      }();

      function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? '' : obj.css;

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = styleElement.childNodes;
          if (childNodes[index]) styleElement.removeChild(childNodes[index]);
          if (childNodes.length) {
            styleElement.insertBefore(cssNode, childNodes[index]);
          } else {
            styleElement.appendChild(cssNode);
          }
        }
      }

      function applyToTag(styleElement, obj) {
        var css = obj.css;
        var media = obj.media;
        var sourceMap = obj.sourceMap;

        if (media) {
          styleElement.setAttribute('media', media);
        }

        if (sourceMap) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
        }

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = css;
        } else {
          while (styleElement.firstChild) {
            styleElement.removeChild(styleElement.firstChild);
          }
          styleElement.appendChild(document.createTextNode(css));
        }
      }

      /***/
    },
    /* 3 */
    /***/function (module, exports) {

      /**
       * Translates the list format produced by css-loader into something
       * easier to manipulate.
       */
      module.exports = function listToStyles(parentId, list) {
        var styles = [];
        var newStyles = {};
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = item[0];
          var css = item[1];
          var media = item[2];
          var sourceMap = item[3];
          var part = {
            id: parentId + ':' + i,
            css: css,
            media: media,
            sourceMap: sourceMap
          };
          if (!newStyles[id]) {
            styles.push(newStyles[id] = { id: id, parts: [part] });
          } else {
            newStyles[id].parts.push(part);
          }
        }
        return styles;
      };

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = function (arr, predicate, ctx) {
        if (typeof Array.prototype.findIndex === 'function') {
          return arr.findIndex(predicate, ctx);
        }

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        var list = Object(arr);
        var len = list.length;

        if (len === 0) {
          return -1;
        }

        for (var i = 0; i < len; i++) {
          if (predicate.call(ctx, list[i], i, list)) {
            return i;
          }
        }

        return -1;
      };

      /***/
    },
    /* 5 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

      /***/
    },
    /* 6 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__swiper_vue__ = __webpack_require__(41);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__swiper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__swiper_vue__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__slide_vue__ = __webpack_require__(40);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__slide_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__slide_vue__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__swiper_scss__ = __webpack_require__(32);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__swiper_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__swiper_scss__);
      /* harmony reexport (default from non-hamory) */__webpack_require__.d(__webpack_exports__, "SwiperComponent", function () {
        return __WEBPACK_IMPORTED_MODULE_0__swiper_vue___default.a;
      });
      /* harmony reexport (default from non-hamory) */__webpack_require__.d(__webpack_exports__, "SlideComponent", function () {
        return __WEBPACK_IMPORTED_MODULE_1__slide_vue___default.a;
      });

      if (typeof window !== 'undefined') {
        window.Swiper = Swiper;
      }

      var swiper = {
        install: function install(Vue) {
          Vue.component('swiper', __WEBPACK_IMPORTED_MODULE_0__swiper_vue___default.a);
          Vue.component('swiper-slide', __WEBPACK_IMPORTED_MODULE_1__slide_vue___default.a);
        }
      };

      /* harmony default export */__webpack_exports__["default"] = swiper;

      /***/
    },
    /* 7 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 8 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue__ = __webpack_require__(35);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_backtop_vue___default.a;

      /***/
    },
    /* 9 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_badge_vue__ = __webpack_require__(36);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_badge_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_badge_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_badge_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_badge_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_badge_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_badge_vue___default.a;

      /***/
    },
    /* 10 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue__ = __webpack_require__(37);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_vue___default.a;

      /***/
    },
    /* 11 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_modal_vue__ = __webpack_require__(38);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_modal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_modal_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_modal_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_modal_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_modal_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_modal_vue___default.a;

      /***/
    },
    /* 12 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_rate_vue__ = __webpack_require__(39);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_rate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_rate_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_rate_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_rate_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_rate_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_rate_vue___default.a;

      /***/
    },
    /* 13 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__responsive_css__ = __webpack_require__(31);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__responsive_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__responsive_css__);

      var install = function install() {
        function adopt() {
          var docEl = document.documentElement;
          var width = docEl.clientWidth;
          docEl.style.fontSize = width / 375 * 16 + 'px';
        }
        adopt();
        window.onresize = function () {
          adopt();
        };
      };
      /* harmony default export */__webpack_exports__["default"] = install;

      /***/
    },
    /* 14 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue__ = __webpack_require__(42);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a;

      /***/
    },
    /* 15 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue__ = __webpack_require__(43);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_vue___default.a;

      /***/
    },
    /* 16 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue__ = __webpack_require__(44);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a;

      /***/
    },
    /* 17 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue__ = __webpack_require__(45);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_vue___default.a;

      /***/
    },
    /* 18 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_title_vue__ = __webpack_require__(46);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_title_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_title_vue__);

      __WEBPACK_IMPORTED_MODULE_0__cm_title_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_title_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_title_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__cm_title_vue___default.a;

      /***/
    },
    /* 19 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__cm_toast_vue__ = __webpack_require__(47);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__cm_toast_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__cm_toast_vue__);

      var ToastConstructor = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__cm_toast_vue___default.a);
      var ToastFunction = function ToastFunction() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (typeof options === 'string') {
          options = {
            data: {
              message: options
            }
          };
        } else {
          options = {
            data: options
          };
        }
        var instance = new ToastConstructor(options);
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        instance.vm.visible = true;
        return instance.vm;
      };

      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$toast = ToastFunction;

      /* harmony default export */__webpack_exports__["default"] = ToastFunction;

      /***/
    },
    /* 20 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__haha_swiper__ = __webpack_require__(48);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__haha_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__haha_swiper__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__haha_swiper_item__ = __webpack_require__(49);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__haha_swiper_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__haha_swiper_item__);
      /* harmony reexport (default from non-hamory) */__webpack_require__.d(__webpack_exports__, "HahaSwiper", function () {
        return __WEBPACK_IMPORTED_MODULE_0__haha_swiper___default.a;
      });
      /* harmony reexport (default from non-hamory) */__webpack_require__.d(__webpack_exports__, "HahaSwiperItem", function () {
        return __WEBPACK_IMPORTED_MODULE_1__haha_swiper_item___default.a;
      });

      var install = function install(Vue) {
        Vue.component(Swiper.name, Swiper);
        Vue.component(SwiperItem.name, SwiperItem);
      };

      /* harmony default export */__webpack_exports__["default"] = install;

      /***/
    },
    /* 21 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__infinite_load_js__ = __webpack_require__(22);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__infinite_load_scss__ = __webpack_require__(33);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__infinite_load_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__infinite_load_scss__);

      __WEBPACK_IMPORTED_MODULE_0__infinite_load_js__["a" /* default */].install = function (Vue) {
        Vue.directive('InfiniteScroll', __WEBPACK_IMPORTED_MODULE_0__infinite_load_js__["a" /* default */]);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__infinite_load_js__["a" /* default */];

      /***/
    },
    /* 22 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

      var ctx = '@@InfiniteScroll';

      var throttle = function throttle(fn, delay) {
        var now, lastExec, timer, context, args; //eslint-disable-line

        var execute = function execute() {
          fn.apply(context, args);
          lastExec = now;
        };

        return function () {
          context = this;
          args = arguments;

          now = Date.now();

          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          if (lastExec) {
            var diff = delay - (now - lastExec);
            if (diff < 0) {
              execute();
            } else {
              timer = setTimeout(function () {
                execute();
              }, diff);
            }
          } else {
            execute();
          }
        };
      };

      var getScrollTop = function getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        }

        return element.scrollTop;
      };

      var getComputedStyle = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer ? {} : document.defaultView.getComputedStyle;

      var getScrollEventTarget = function getScrollEventTarget(element) {
        var currentNode = element;
        // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          var overflowY = getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      };

      var getVisibleHeight = function getVisibleHeight(element) {
        if (element === window) {
          return document.documentElement.clientHeight;
        }

        return element.clientHeight;
      };

      var getElementTop = function getElementTop(element) {
        if (element === window) {
          return getScrollTop(window);
        }
        return element.getBoundingClientRect().top + getScrollTop(window);
      };

      var isAttached = function isAttached(element) {
        var currentNode = element.parentNode;
        while (currentNode) {
          if (currentNode.tagName === 'HTML') {
            return true;
          }
          if (currentNode.nodeType === 11) {
            return false;
          }
          currentNode = currentNode.parentNode;
        }
        return false;
      };

      var doBind = function doBind() {
        if (this.binded) return; // eslint-disable-line
        this.binded = true;

        var directive = this;
        var element = directive.el;

        directive.scrollEventTarget = getScrollEventTarget(element);
        directive.scrollListener = throttle(doCheck.bind(directive), 200);
        directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

        var disabledExpr = element.getAttribute('infinite-scroll-disabled');
        var disabled = false;

        if (disabledExpr) {
          this.vm.$watch(disabledExpr, function (value) {
            directive.disabled = value;
            if (!value && directive.immediateCheck) {
              doCheck.call(directive);
            }
          });
          disabled = Boolean(directive.vm[disabledExpr]);
        }
        directive.disabled = disabled;

        var distanceExpr = element.getAttribute('infinite-scroll-distance');
        var distance = 0;
        if (distanceExpr) {
          distance = Number(directive.vm[distanceExpr] || distanceExpr);
          if (isNaN(distance)) {
            distance = 0;
          }
        }
        directive.distance = distance;

        var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
        var immediateCheck = true;
        if (immediateCheckExpr) {
          immediateCheck = Boolean(directive.vm[immediateCheckExpr]);
        }
        directive.immediateCheck = immediateCheck;

        if (immediateCheck) {
          doCheck.call(directive);
        }

        var eventName = element.getAttribute('infinite-scroll-listen-for-event');
        if (eventName) {
          directive.vm.$on(eventName, function () {
            doCheck.call(directive);
          });
        }
      };

      var doCheck = function doCheck(force) {
        var scrollEventTarget = this.scrollEventTarget;
        var element = this.el;
        var distance = this.distance;

        if (force !== true && this.disabled) return; //eslint-disable-line
        var viewportScrollTop = getScrollTop(scrollEventTarget);
        var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

        var shouldTrigger = false;

        if (scrollEventTarget === element) {
          shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
        } else {
          var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

          shouldTrigger = viewportBottom + distance >= elementBottom;
        }

        if (shouldTrigger && this.expression) {
          this.expression();
        }
      };

      /* harmony default export */__webpack_exports__["a"] = {
        bind: function bind(el, binding, vnode) {
          el[ctx] = {
            el: el,
            vm: vnode.context,
            expression: binding.value
          };
          var args = arguments;
          var cb = function cb() {
            el[ctx].vm.$nextTick(function () {
              if (isAttached(el)) {
                doBind.call(el[ctx], args);
              }

              el[ctx].bindTryCount = 0;

              var tryBind = function tryBind() {
                if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
                el[ctx].bindTryCount++;
                if (isAttached(el)) {
                  doBind.call(el[ctx], args);
                } else {
                  setTimeout(tryBind, 50);
                }
              };

              tryBind();
            });
          };
          if (el[ctx].vm._isMounted) {
            cb();
            return;
          }
          el[ctx].vm.$on('hook:mounted', cb);
        },
        unbind: function unbind(el) {
          if (el[ctx] && el[ctx].scrollEventTarget) {
            el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
          }
        }
      };

      /***/
    },
    /* 23 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__loadmore_vue__ = __webpack_require__(50);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__loadmore_vue__);

      __WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__loadmore_vue___default.a;

      /***/
    },
    /* 24 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Menu_vue__ = __webpack_require__(51);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Menu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Menu_vue__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__menu_scss__ = __webpack_require__(34);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__menu_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__menu_scss__);

      __WEBPACK_IMPORTED_MODULE_0__Menu_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__Menu_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__Menu_vue___default.a);
      };
      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__Menu_vue___default.a;

      /***/
    },
    /* 25 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_card_vue__ = __webpack_require__(52);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_card_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_card_vue__);

      __WEBPACK_IMPORTED_MODULE_0__mm_card_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__mm_card_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__mm_card_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__mm_card_vue___default.a;

      /***/
    },
    /* 26 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_concern_vue__ = __webpack_require__(53);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_concern_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_concern_vue__);

      __WEBPACK_IMPORTED_MODULE_0__mm_concern_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__mm_concern_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__mm_concern_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__mm_concern_vue___default.a;

      /***/
    },
    /* 27 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue__ = __webpack_require__(54);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue__);

      __WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__mm_countdown_vue___default.a;

      /***/
    },
    /* 28 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_person_vue__ = __webpack_require__(55);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_person_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_person_vue__);

      __WEBPACK_IMPORTED_MODULE_0__mm_person_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__mm_person_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__mm_person_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__mm_person_vue___default.a;

      /***/
    },
    /* 29 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue__ = __webpack_require__(56);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue__);

      __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_vue___default.a;

      /***/
    },
    /* 30 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__scroller_vue__ = __webpack_require__(57);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__scroller_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroller_vue__);

      __WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a.install = function (Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a);
      };

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a;

      /***/
    },
    /* 31 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 32 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 33 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 34 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 35 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(141);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(58),
      /* template */
      __webpack_require__(131),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-890d548e",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 36 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(59),
      /* template */
      __webpack_require__(121),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 37 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(138);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(60),
      /* template */
      __webpack_require__(123),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-501a2267",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 38 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(139);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(61),
      /* template */
      __webpack_require__(125),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-69f6f1ce",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 39 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(62),
      /* template */
      __webpack_require__(112),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 40 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(63),
      /* template */
      __webpack_require__(111),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 41 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(64),
      /* template */
      __webpack_require__(115),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 42 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(65),
      /* template */
      __webpack_require__(132),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 43 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(66),
      /* template */
      __webpack_require__(120),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 44 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(67),
      /* template */
      __webpack_require__(113),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 45 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(68),
      /* template */
      __webpack_require__(126),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 46 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(69),
      /* template */
      __webpack_require__(114),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 47 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(140);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(70),
      /* template */
      __webpack_require__(130),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-74fc3059",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 48 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(71),
      /* template */
      __webpack_require__(118),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 49 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(135);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(72),
      /* template */
      __webpack_require__(129),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-6f827ec6",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 50 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(137);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(73),
      /* template */
      __webpack_require__(122),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-4c441e79",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 51 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(74),
      /* template */
      __webpack_require__(119),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 52 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(75),
      /* template */
      __webpack_require__(124),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 53 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(76),
      /* template */
      __webpack_require__(117),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 54 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(77),
      /* template */
      __webpack_require__(128),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 55 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(78),
      /* template */
      __webpack_require__(133),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 56 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(79),
      /* template */
      __webpack_require__(127),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 57 */
    /***/function (module, exports, __webpack_require__) {

      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(81),
      /* template */
      __webpack_require__(134),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 58 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_backtop_scss__ = __webpack_require__(93);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_backtop_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_backtop_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-backtop',
        props: {
          // scrollTop是多少时隐藏
          offsetTop: {
            type: Number,
            default: 200
          }
        },
        components: {},
        computed: {},
        data: function data() {
          return {
            show: false
          };
        },
        created: function created() {},

        methods: {
          scrollTop: function scrollTop() {
            // this.show = true;
            window.scrollTo(0, 0);
            this.$emit('click');
          },
          checkScroll: function checkScroll() {
            document.body.scrollTop >= this.offsetTop ? this.show = true : this.show = false;
          }
        },
        mounted: function mounted() {
          this.$nextTick(function () {
            // if(document.body.scrollTop >)
            window.addEventListener('scroll', this.checkScroll);
          });
        },
        beforeDestroy: function beforeDestroy() {
          window.removeEventListener('scroll', this.checkScroll);
        }
      };

      /***/
    },
    /* 59 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_badge_scss__ = __webpack_require__(94);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_badge_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_badge_scss__);
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-badge'
      };

      /***/
    },
    /* 60 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_scss__ = __webpack_require__(95);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_dropdown_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_dropdown_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-dropdown',
        props: [],
        components: {},
        computed: {},
        data: function data() {
          return {
            show: true
          };
        },

        methods: {}
      };

      /***/
    },
    /* 61 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_modal_scss__ = __webpack_require__(96);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_modal_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_modal_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /**
       * modal
       * @module components/modal
       * @desc 模态框组件
       *
       * @param {string[]} value - 选中值的数组
       * @param {string} title - 标题
       *
       *
       * @example
       * <cm-modal 
            :overlayClose='true'
            msg='haha'
            @onClose=''
            :show='false'>
          </cm-modal>
       */

      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-modal',
        props: [
        // 模态框的样式
        'modalStyle',
        // 遮罩层的样式
        'overlayStyle',
        // 是否显示
        'show',
        // 错误信息
        'msg',
        // 是否显示关闭按钮
        'showCloseBtn',
        // 遮罩点击是否隐藏
        'overlayClose',
        // 倒计时几秒消失，number
        'time'],
        data: function data() {
          return {
            closedown: this.time,
            Interval: '',

            showModal: this.show
          };
        },
        mounted: function mounted() {
          var _this = this;

          this.show ? this.$emit('onShow') : this.$emit('onHide');

          // 设置自动关闭的定时器
          if (this.show === true && this.time !== undefined && typeof +this.time === 'number') {
            this.closedown = this.time;
            this.Interval = setInterval(function () {
              if (_this.closedown === 0) {
                _this.$emit('onClose');
                clearInterval(_this.Interval);
              } else {
                _this.closedown--;
              }
            }, 1000);
          }
        },
        updated: function updated() {
          this.show ? this.$emit('onShow') : this.$emit('onHide');
        },

        watch: {
          show: function show(val) {
            var _this2 = this;

            this.showModal = val;
            // 设置自动关闭的定时器
            if (val === true && this.time !== undefined && typeof +this.time === 'number') {
              this.closedown = this.time;
              this.Interval = setInterval(function () {
                if (_this2.closedown === 0) {
                  _this2.$emit('onClose');
                  clearInterval(_this2.Interval);
                } else {
                  _this2.closedown--;
                }
              }, 1000);
            }
          }
        },
        methods: {
          innerClose: function innerClose() {
            clearInterval(this.Interval);
            this.$emit('onClose');
          },
          overlayClick: function overlayClick() {
            if (this.overlayClose) {
              clearInterval(this.Interval);
              this.$emit('onClose');
            }
          }
        }
      };

      /***/
    },
    /* 62 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_rate_scss__ = __webpack_require__(97);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_rate_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_rate_scss__);
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-rate',
        props: ['count'],
        components: {},
        computed: {},
        data: function data() {
          return {};
        },
        created: function created() {},

        methods: {}
      };

      /***/
    },
    /* 63 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      //
      //
      //
      //
      //
      //

      /* harmony default export */__webpack_exports__["default"] = {
        name: 'swiper-slide',
        data: function data() {
          return {
            slideClass: 'swiper-slide'
          };
        },
        ready: function ready() {
          this.update();
        },
        mounted: function mounted() {
          this.update();
          if (this.$parent.options.slideClass) {
            this.slideClass = this.$parent.options.slideClass;
          }
        },
        updated: function updated() {
          this.update();
        },
        attached: function attached() {
          this.update();
        },

        methods: {
          update: function update() {
            if (this.$parent && this.$parent.swiper && this.$parent.swiper.update) {
              this.$parent.swiper.update(true);
              if (this.$parent.options.loop) {
                this.$parent.swiper.reLoop();
              }
            }
          }
        }
      };

      /***/
    },
    /* 64 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      var browser = typeof window !== 'undefined';
      if (browser) {
        window.Swiper = __webpack_require__(82);
        __webpack_require__(91);
      }
      /* harmony default export */__webpack_exports__["default"] = {
        name: 'swiper',
        props: {
          options: {
            type: Object,
            default: function _default() {
              return {
                autoplay: 3500
              };
            }
          }
        },
        data: function data() {
          return {
            defaultSwiperClasses: {
              wrapperClass: 'swiper-wrapper'
            }
          };
        },
        ready: function ready() {
          if (!this.swiper && browser) {
            this.swiper = new Swiper(this.$el, this.options);
          }
        },
        mounted: function mounted() {
          var self = this;
          var mount = function mount() {
            if (!self.swiper && browser) {
              delete self.options.notNextTick;
              var setClassName = false;
              for (var className in self.defaultSwiperClasses) {
                if (self.defaultSwiperClasses.hasOwnProperty(className)) {
                  if (self.options[className]) {
                    setClassName = true;
                    self.defaultSwiperClasses[className] = self.options[className];
                  }
                }
              }
              var mountInstance = function mountInstance() {
                self.swiper = new Swiper(self.$el, self.options);
              };
              setClassName ? self.$nextTick(mountInstance) : mountInstance();
            }
          };
          this.options.notNextTick ? mount() : this.$nextTick(mount);
        },
        updated: function updated() {
          if (this.swiper) {
            this.swiper.update();
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (this.swiper) {
            this.swiper.destroy();
            delete this.swiper;
          }
        }
      };

      /***/
    },
    /* 65 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_scss__ = __webpack_require__(98);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_scss__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset__ = __webpack_require__(90);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-tabbar',
        props: {
          value: {
            type: String,
            default: '1'
          },
          topOffset: {
            type: Number,
            default: 0
          }
        },
        components: {},
        computed: {},
        data: function data() {
          return {
            currentActive: this.value,
            // tabbar的原始getBoundingClientRect
            originTop: 0,
            // tabbar的高度，用于fixed的时候撑开原位置高度
            wrapHeight: '0px',
            fixed: false
          };
        },

        watch: {
          value: function value(val) {
            this.currentActive = val;
          }
        },
        methods: {
          checkScroll: function checkScroll() {
            var scrollTop = document.body.scrollTop;

            if (scrollTop >= this.originTop - this.topOffset) {
              this.fixed = true;
            } else {
              this.fixed = false;
            }
          }
        },
        mounted: function mounted() {
          this.$nextTick(function () {
            this.wrapHeight = window.getComputedStyle(this.$refs.haha_tabbar, null).height;

            this.originTop = __WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset___default()(this.$refs.haha_tabbar).top;

            window.addEventListener('scroll', this.checkScroll);
          });
        },
        beforeDestroy: function beforeDestroy() {
          window.removeEventListener('scroll', this.checkScroll);
        }
      };

      /***/
    },
    /* 66 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_scss__ = __webpack_require__(99);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_item_scss__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_array_find_index__ = __webpack_require__(4);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_array_find_index__);
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-tabbar-item',
        props: [],
        components: {},
        computed: {},
        data: function data() {
          var _this = this;

          return {
            index: (__WEBPACK_IMPORTED_MODULE_1_array_find_index___default()(this.$parent.$children, function (item) {
              return item._uid === _this._uid;
            }) + 1).toString()
          };
        },

        methods: {
          changeTab: function changeTab() {
            this.$parent.$emit('input', this.index);
          }
        }
      };

      /***/
    },
    /* 67 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_scss__ = __webpack_require__(100);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_scss__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_array_find_index__ = __webpack_require__(4);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_array_find_index__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-tabs-container',
        props: {
          value: {
            // type:String
          },
          swipeable: Boolean
        },
        data: function data() {
          return {
            start: { x: 0, y: 0 },
            swiping: false,
            pageWidth: 0,
            currentActive: this.value
          };
        },

        watch: {
          value: function value(val) {
            this.currentActive = val;
          },
          currentActive: function currentActive(val, oldValue) {
            // 触发组将上的input事件
            this.$emit('input', val);
            if (!this.swipeable) return;
            var lastIndex = __WEBPACK_IMPORTED_MODULE_1_array_find_index___default()(this.$children, function (item) {
              return item.id === oldValue;
            });
            this.swipeLeaveTransition(lastIndex);
          }
        },
        mounted: function mounted() {
          if (!this.swipeable) return;

          this.wrap = this.$refs.wrap;
          this.pageWidth = this.wrap.clientWidth;
          this.limitWidth = this.pageWidth / 4;
        },

        methods: {
          startDrag: function startDrag(evt) {
            if (!this.swipeable) return;

            evt = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.dragging = true;
            this.start.x = evt.pageX;
            this.start.y = evt.pageY;
          },
          endDrag: function endDrag(evt) {
            if (!this.swiping) return;

            var direction = this.offsetLeft > 0 ? -1 : 1;
            var isChange = Math.abs(this.offsetLeft) > this.limitWidth;

            if (isChange) {
              this.index += direction;
              var child = this.$children[this.index];
              if (child) {
                this.currentActive = child.id;
                return;
              }
            }
            this.swipeLeaveTransition();
          },
          onDrag: function onDrag(evt) {
            var _this = this;

            if (!this.dragging) return;

            var swiping = void 0;
            var e = evt.changedTouches ? evt.changedTouches[0] : evt;
            var offsetTop = e.pageY - this.start.y;
            var offsetLeft = e.pageX - this.start.x;
            var y = Math.abs(offsetTop);
            var x = Math.abs(offsetLeft);

            swiping = !(x < 5 || x >= 5 && y >= x * 1.73);
            if (!swiping) return;
            evt.preventDefault();

            var len = this.$children.length - 1;
            var index = __WEBPACK_IMPORTED_MODULE_1_array_find_index___default()(this.$children, function (item) {
              return item.id === _this.currentActive;
            });
            var currentPageOffset = index * this.pageWidth;
            var offset = offsetLeft - currentPageOffset;
            var absOffset = Math.abs(offset);

            if (absOffset > len * this.pageWidth || offset > 0 && offset < this.pageWidth) {
              this.swiping = false;
              return;
            }

            this.offsetLeft = offsetLeft;
            this.index = index;
            this.swipeMove(offset);
          },
          swipeMove: function swipeMove(offset) {
            this.wrap.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
            this.swiping = true;
          },
          swipeLeaveTransition: function swipeLeaveTransition() {
            var _this2 = this;

            var lastIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (typeof this.index !== 'number') {
              this.index = __WEBPACK_IMPORTED_MODULE_1_array_find_index___default()(this.$children, function (item) {
                return item.id === _this2.currentActive;
              });
              this.swipeMove(-lastIndex * this.pageWidth);
            }
            setTimeout(function () {
              _this2.wrap.classList.add('haha-swipe-transition');
              _this2.swipeMove(-_this2.index * _this2.pageWidth);

              _this2.once(_this2.wrap, 'webkitTransitionEnd', function (_) {
                _this2.wrap.classList.remove('haha-swipe-transition');
                _this2.wrap.style.webkitTransform = '';
                _this2.swiping = false;
                _this2.index = null;
              });
            }, 0);
          },
          once: function once(el, event, fn) {
            var t = this;
            var listener = function listener() {
              if (fn) {
                fn.apply(this, arguments);
              }
              t.off(el, event, listener);
            };
            this.on(el, event, listener);
          },
          on: function on(elem, type, eventHandle) {
            if (elem == null || typeof elem === 'undefined') {
              return;
            }
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent('on' + type, eventHandle);
            } else {
              elem['on' + type] = eventHandle;
            }
          },
          off: function off(elem, type, eventHandle) {
            if (elem == null || typeof elem === 'undefined') {
              return;
            }
            if (elem.removeEventListenerListener) {
              elem.removeEventListenerListener(type, eventHandle, false);
            } else if (elem.detachEvent) {
              elem.detachEvent('on' + type, eventHandle);
            } else {
              elem['on' + type] = null;
            }
          }
        }
      };

      /***/
    },
    /* 68 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_scss__ = __webpack_require__(101);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_item_scss__);
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-tabs-item',
        props: ['id'],
        components: {},
        computed: {},
        data: function data() {
          return {};
        },
        created: function created() {
          // console.log(this)
        },

        methods: {}
      };

      /***/
    },
    /* 69 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_title_css__ = __webpack_require__(92);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_title_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_title_css__);
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-title',
        props: ['title', 'showMore', 'moreLink'],
        components: {},
        computed: {},
        data: function data() {
          return {};
        },
        created: function created() {},

        methods: {}
      };

      /***/
    },
    /* 70 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_toast_scss__ = __webpack_require__(102);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_toast_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_toast_scss__);
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'cm-toast',
        components: {},
        watch: {
          // visible(newVal){
          // 	if(newVal){
          //
          // 	}
          // }
        },
        data: function data() {
          return {
            visible: false,
            message: '请稍候重试'
          };
        },
        mounted: function mounted() {
          this.startTimer();
        },

        methods: {
          startTimer: function startTimer() {
            var _this = this;

            setTimeout(function () {
              _this.visible = false;
              _this.$el.addEventListener('transitionend', _this.destroyElement);
            }, 3000);
          },
          destroyElement: function destroyElement() {
            this.$el.removeEventListener('transitionend', this.destroyElement);
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
          }
        }
      };

      /***/
    },
    /* 71 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__haha_swiper_scss__ = __webpack_require__(103);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__haha_swiper_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__haha_swiper_scss__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_array_find_index__ = __webpack_require__(4);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_array_find_index__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'haha-swiper',
        props: {
          default: {
            type: Number,
            default: 1
          },
          pagination: {
            type: Boolean,
            default: true
          },
          autoplay: {
            type: Boolean,
            default: true
          }
        },
        computed: {},
        watch: {
          currentActive: function currentActive(val, oldValue) {
            // 触发组将上的input事件
            // this.$emit('input', val);
            // const lastIndex = arrayFindIndex(this.$children,
            // item => item.id === oldValue);
            this.swipeLeaveTransition(+val);
          }
        },
        data: function data() {
          return {
            start: { x: 0, y: 0 },
            swiping: false,
            pageWidth: 0,
            currentActive: this.default,
            childrenNum: 0,
            interval: ''
          };
        },
        mounted: function mounted() {
          this.childrenNum = this.$children.length;
          this.wrap = this.$refs.wrap;
          this.pageWidth = this.wrap.clientWidth;
          this.limitWidth = this.pageWidth / 4;

          this.AutoPlay();
        },

        methods: {
          AutoPlay: function AutoPlay() {
            var _this = this;

            if (this.autoplay) {
              this.interval = setInterval(function () {
                _this.next();
              }, 3000);
            }
          },
          startDrag: function startDrag(evt) {
            this.dragging = true;
            evt = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.start.x = evt.pageX;
            this.start.y = evt.pageY;
            // 取消自动轮播
            clearInterval(this.interval);
          },
          endDrag: function endDrag(evt) {
            if (!this.swiping) return;

            var len = this.$children.length - 1;
            var direction = this.offsetLeft > 0 ? -1 : 1;
            var isChange = Math.abs(this.offsetLeft) > this.limitWidth;
            // 如果移动的超出边界，返回原位置
            if (Math.abs(this.offset) > len * this.pageWidth || this.offset > 0) {
              isChange = false;
            }

            if (isChange) {
              this.index += direction;
              this.currentActive = this.index + 1;
              this.AutoPlay();
              return;
            }

            this.AutoPlay();
            this.swipeLeaveTransition();
          },
          onDrag: function onDrag(evt) {
            if (!this.dragging) return;

            var swiping = void 0;
            var e = evt.changedTouches ? evt.changedTouches[0] : evt;
            // 移动的垂直距离
            var offsetTop = e.pageY - this.start.y;
            // 移动的水平距离
            var offsetLeft = e.pageX - this.start.x;
            var y = Math.abs(offsetTop);
            var x = Math.abs(offsetLeft);
            swiping = !(x < 5 || x >= 5 && y >= x * 1.73);
            if (!swiping) return;
            evt.preventDefault();

            // 当前的轮播所在的index
            var index = +this.currentActive - 1;
            // 当前轮播的偏移位置
            var currentPageOffset = index * this.pageWidth;
            // 包裹层将要偏移的位置
            var offset = offsetLeft - currentPageOffset;
            // 移动的距离
            // const absOffset = Math.abs(offset)


            this.offset = offset;
            this.offsetLeft = offsetLeft;
            this.index = index;
            this.swipeMove(offset);
          },
          swipeMove: function swipeMove(offset) {
            this.wrap.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
            this.swiping = true;
          },
          swipeLeaveTransition: function swipeLeaveTransition() {
            var _this2 = this;

            var nowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            // setTimeout(() => {
            this.wrap.classList.add('haha-swipe-transition');
            var index = this.index === null ? nowIndex - 1 : this.index;
            this.swipeMove(-index * this.pageWidth);

            this.once(this.wrap, 'webkitTransitionEnd', function (_) {
              _this2.wrap.classList.remove('haha-swipe-transition');
              // this.wrap.style.webkitTransform = '';
              _this2.swiping = false;
              _this2.index = null;
            });
            // },0)
          },
          once: function once(el, event, fn) {
            var t = this;
            var listener = function listener() {
              if (fn) {
                fn.apply(t, arguments);
              }
              t.off(el, event, listener);
            };
            t.on(el, event, listener);
          },
          on: function on(elem, type, eventHandle) {
            if (elem == null || typeof elem === 'undefined') {
              return;
            }
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent('on' + type, eventHandle);
            } else {
              elem['on' + type] = eventHandle;
            }
          },
          off: function off(elem, type, eventHandle) {
            if (elem == null || typeof elem === 'undefined') {
              return;
            }
            if (elem.removeEventListener) {
              elem.removeEventListener(type, eventHandle, false);
            } else if (elem.detachEvent) {
              elem.detachEvent('on' + type, eventHandle);
            } else {
              elem['on' + type] = null;
            }
          },
          next: function next() {
            this.currentActive < this.childrenNum ? this.currentActive++ : this.currentActive = 1;
          },
          prev: function prev() {
            this.currentActive > 1 ? this.currentActive-- : this.currentActive = this.childrenNum;
          },
          setPage: function setPage() {}
        }
      };

      /***/
    },
    /* 72 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      //
      //
      //
      //
      //
      //


      // import arrayFindIndex from 'array-find-index';

      /* harmony default export */__webpack_exports__["default"] = {
        name: 'haha-swiper-item',
        props: [],
        components: {},
        computed: {},
        data: function data() {
          return {};
        },
        created: function created() {},

        methods: {}
      };

      /***/
    },
    /* 73 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__loadmore_scss__ = __webpack_require__(104);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__loadmore_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__loadmore_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      // import spinner from 'mint-ui/packages/spinner/src/spinner/fading-circle.vue';
      /* harmony default export */__webpack_exports__["default"] = {
        name: 'loadmore',
        components: {
          // 'spinner': spinner
        },

        props: {
          maxDistance: {
            type: Number,
            default: 0
          },
          autoFill: {
            type: Boolean,
            default: true
          },
          distanceIndex: {
            type: Number,
            default: 2
          },
          topPullText: {
            type: String,
            default: '下拉刷新'
          },
          topDropText: {
            type: String,
            default: '释放更新'
          },
          topLoadingText: {
            type: String,
            default: '加载中...'
          },
          topDistance: {
            type: Number,
            default: 70
          },
          topMethod: {
            type: Function
          },
          bottomPullText: {
            type: String,
            default: '上拉刷新'
          },
          bottomDropText: {
            type: String,
            default: '释放更新'
          },
          bottomLoadingText: {
            type: String,
            default: '加载中...'
          },
          bottomDistance: {
            type: Number,
            default: 70
          },
          bottomMethod: {
            type: Function
          },
          bottomAllLoaded: {
            type: Boolean,
            default: false
          }
        },

        data: function data() {
          return {
            translate: 0,
            scrollEventTarget: null,
            containerFilled: false,
            topText: '',
            topDropped: false,
            bottomText: '',
            bottomDropped: false,
            bottomReached: false,
            direction: '',
            startY: 0,
            startScrollTop: 0,
            currentY: 0,
            topStatus: '',
            bottomStatus: ''
          };
        },

        watch: {
          topStatus: function topStatus(val) {
            this.$emit('top-status-change', val);
            switch (val) {
              case 'pull':
                this.topText = this.topPullText;
                break;
              case 'drop':
                this.topText = this.topDropText;
                break;
              case 'loading':
                this.topText = this.topLoadingText;
                break;
            }
          },
          bottomStatus: function bottomStatus(val) {
            this.$emit('bottom-status-change', val);
            switch (val) {
              case 'pull':
                this.bottomText = this.bottomPullText;
                break;
              case 'drop':
                this.bottomText = this.bottomDropText;
                break;
              case 'loading':
                this.bottomText = this.bottomLoadingText;
                break;
            }
          }
        },

        methods: {
          onTopLoaded: function onTopLoaded() {
            var _this = this;

            this.translate = 0;
            setTimeout(function () {
              _this.topStatus = 'pull';
            }, 200);
          },
          onBottomLoaded: function onBottomLoaded() {
            var _this2 = this;

            this.bottomStatus = 'pull';
            this.bottomDropped = false;
            this.$nextTick(function () {
              if (_this2.scrollEventTarget === window) {
                document.body.scrollTop += 50;
              } else {
                _this2.scrollEventTarget.scrollTop += 50;
              }
              _this2.translate = 0;
            });
            if (!this.bottomAllLoaded && !this.containerFilled) {
              this.fillContainer();
            }
          },
          getScrollEventTarget: function getScrollEventTarget(element) {
            var currentNode = element;
            while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
              var overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
              if (overflowY === 'scroll' || overflowY === 'auto') {
                return currentNode;
              }
              currentNode = currentNode.parentNode;
            }
            return window;
          },
          getScrollTop: function getScrollTop(element) {
            if (element === window) {
              return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
              return element.scrollTop;
            }
          },
          bindTouchEvents: function bindTouchEvents() {
            this.$el.addEventListener('touchstart', this.handleTouchStart);
            this.$el.addEventListener('touchmove', this.handleTouchMove);
            this.$el.addEventListener('touchend', this.handleTouchEnd);
          },
          init: function init() {
            this.topStatus = 'pull';
            this.bottomStatus = 'pull';
            this.topText = this.topPullText;
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            if (typeof this.bottomMethod === 'function') {
              this.fillContainer();
              this.bindTouchEvents();
            }
            if (typeof this.topMethod === 'function') {
              this.bindTouchEvents();
            }
          },
          fillContainer: function fillContainer() {
            var _this3 = this;

            if (this.autoFill) {
              this.$nextTick(function () {
                if (_this3.scrollEventTarget === window) {
                  _this3.containerFilled = _this3.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom;
                } else {
                  _this3.containerFilled = _this3.$el.getBoundingClientRect().bottom >= _this3.scrollEventTarget.getBoundingClientRect().bottom;
                }
                if (!_this3.containerFilled) {
                  _this3.bottomStatus = 'loading';
                  _this3.bottomMethod();
                }
              });
            }
          },
          checkBottomReached: function checkBottomReached() {
            if (this.scrollEventTarget === window) {
              return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
            } else {
              return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
            }
          },
          handleTouchStart: function handleTouchStart(event) {
            this.startY = event.touches[0].clientY;
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.bottomReached = false;
            if (this.topStatus !== 'loading') {
              this.topStatus = 'pull';
              this.topDropped = false;
            }
            if (this.bottomStatus !== 'loading') {
              this.bottomStatus = 'pull';
              this.bottomDropped = false;
            }
          },
          handleTouchMove: function handleTouchMove(event) {
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
              return;
            }
            this.currentY = event.touches[0].clientY;
            var distance = (this.currentY - this.startY) / this.distanceIndex;
            this.direction = distance > 0 ? 'down' : 'up';
            if (typeof this.topMethod === 'function' && this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {
              event.preventDefault();
              event.stopPropagation();
              if (this.maxDistance > 0) {
                this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
              } else {
                this.translate = distance - this.startScrollTop;
              }
              if (this.translate < 0) {
                this.translate = 0;
              }
              this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
            }

            if (this.direction === 'up') {
              this.bottomReached = this.bottomReached || this.checkBottomReached();
            }
            if (typeof this.bottomMethod === 'function' && this.direction === 'up' && this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
              event.preventDefault();
              event.stopPropagation();
              if (this.maxDistance > 0) {
                this.translate = Math.abs(distance) <= this.maxDistance ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
              } else {
                this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
              }
              if (this.translate > 0) {
                this.translate = 0;
              }
              this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
            }
            this.$emit('translate-change', this.translate);
          },
          handleTouchEnd: function handleTouchEnd() {
            if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
              this.topDropped = true;
              if (this.topStatus === 'drop') {
                this.translate = '50';
                this.topStatus = 'loading';
                this.topMethod();
              } else {
                this.translate = '0';
                this.topStatus = 'pull';
              }
            }
            if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
              this.bottomDropped = true;
              this.bottomReached = false;
              if (this.bottomStatus === 'drop') {
                this.translate = '-50';
                this.bottomStatus = 'loading';
                this.bottomMethod();
              } else {
                this.translate = '0';
                this.bottomStatus = 'pull';
              }
            }
            this.$emit('translate-change', this.translate);
            this.direction = '';
          }
        },

        mounted: function mounted() {
          this.init();
        }
      };

      /***/
    },
    /* 74 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */__webpack_exports__["default"] = {
        name: 'bottom-menu',
        props: ['background', "type"],
        data: function data() {
          return {
            list: [{
              name: '首页',
              type: 'main',
              to: 'main'
            }, {
              name: '已购',
              type: 'bied',
              to: 'bied'
            }, {
              name: '关注',
              type: 'concern',
              to: 'concern'

            }, {
              name: '我的',
              type: 'me',
              to: 'me'
            }]
          };
        },

        methods: {
          toOther: function toOther(to, run) {

            // console.log(this.$route.path,to)
            // if(!run){
            //     location.hash = to;
            // }
          }
        }
      };

      /***/
    },
    /* 75 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_card_scss__ = __webpack_require__(105);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_card_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_card_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'mm-card',
        props: ['data'],
        components: {},
        computed: {},
        data: function data() {
          return {};
        },
        created: function created() {},

        methods: {
          courseTime: function courseTime(time) {
            var date = new Date(time);
            var minute = date.getMinutes();
            if (minute.toString().length === 1) {
              minute = '0' + minute;
            }
            return date.getMonth() + 1 + '\u6708' + date.getDate() + '\u65E5 ' + date.getHours() + ':' + minute;
          }
        }
      };

      /***/
    },
    /* 76 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_concern_scss__ = __webpack_require__(106);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_concern_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_concern_scss__);
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'mm-concern',
        props: ['text', 'selected'],
        components: {},
        computed: {
          color: function color() {
            return this.selected ? '#9a9a9a' : '#f95c25';
          }
        },
        data: function data() {
          return {
            choosed: false
          };
        },
        created: function created() {
          // this.$emit('concern')
        },

        methods: {}
      };

      /***/
    },
    /* 77 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_countdown_scss__ = __webpack_require__(107);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_countdown_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_countdown_scss__);
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'mm-countdown',
        props: ['duration'],
        components: {},
        computed: {
          context: function context() {
            return this.closedown === 0 ? '发送验证码' : '\u91CD\u65B0\u53D1\u9001 ' + this.closedown;
          }
        },
        data: function data() {
          return {
            allowClick: true,
            Interval: '',
            closedown: 0
          };
        },
        created: function created() {},

        methods: {
          countdown: function countdown(e) {
            var _this = this;

            if (!this.allowClick) return;

            this.allowClick = false;
            this.closedown = this.duration === undefined ? 60 : +this.duration;
            this.Interval = setInterval(function () {
              _this.closedown--;
              if (_this.closedown === 0) {
                clearInterval(_this.Interval);
                _this.allowClick = true;
                return;
              }
            }, 1000);
            this.$emit('onClick', e);
          }
        }
      };

      /***/
    },
    /* 78 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_person_scss__ = __webpack_require__(108);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_person_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_person_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      // import Contern from '../mm_concern'

      /* harmony default export */__webpack_exports__["default"] = {
        name: 'mm-person',
        props: ['headimg', 'personName', 'personIntro'],
        components: {},
        computed: {},
        data: function data() {
          return {};
        },
        created: function created() {},

        methods: {}
      };

      /***/
    },
    /* 79 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_scss__ = __webpack_require__(109);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mm_toolbar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mm_toolbar_scss__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'mm-toolbar',
        props: ['background', 'text'],
        components: {},
        computed: {
          // buytext(){
          // 	return this.hasBuy ? '去听课':'立即报名'
          // }
        },
        data: function data() {
          return {};
        },
        created: function created() {},

        methods: {}
      };

      /***/
    },
    /* 80 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__scroller_scss__ = __webpack_require__(7);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__scroller_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroller_scss__);
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'loading'
      };

      /***/
    },
    /* 81 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__scroller_scss__ = __webpack_require__(7);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__scroller_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroller_scss__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__loading__ = __webpack_require__(110);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__loading__);
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      /* harmony default export */__webpack_exports__["default"] = {
        name: 'scroller',
        props: [
          // 'onRefresh'
        ],
        components: {
          loading: __WEBPACK_IMPORTED_MODULE_1__loading___default.a
        },
        computed: {},
        data: function data() {
          return {
            touch: false,
            lastY: 0,
            offsetY: 0,

            lastTwoY: 0,

            target: '',

            showRefresh: false
          };
        },
        created: function created() {},

        methods: {
          mousedown: function mousedown(e) {
            this.touch = true;
            this.lastY = e.clientY;
            this.lastTwoY = this.lastY;
          },
          mouseup: function mouseup(e) {
            var _this = this;

            this.touch = false;
            var temY = (this.lastY - this.lastTwoY) * 6;
            this.offsetY += temY;
            var target = e.currentTarget;
            e.currentTarget.style.transform = 'translate(0px,' + this.offsetY + 'px)';
            // this.once(e.currentTarget,'webkitTransitionEnd',_=>{
            this.$nextTick(function () {
              var contentH = +getComputedStyle(document.querySelector('.haha-scroller-content')).height.slice(0, -2);
              var containerH = +getComputedStyle(document.querySelector('.haha-scroller-wrap')).height.slice(0, -2);

              if (Math.abs(_this.offsetY) + containerH > contentH && _this.offsetY < 0) {
                _this.offsetY = -(contentH - containerH);
                target.style.transform = 'translate(0px,' + _this.offsetY + 'px)';
              } else if (_this.offsetY > 0) {
                _this.offsetY = 0;
                target.style.transform = 'translate(0px,' + _this.offsetY + 'px)';
              }
            });

            // })
          },
          mousemove: function mousemove(e) {
            e.preventDefault();
            if (this.touch) {
              this.lastTwoY = this.lastY;
              var temY = e.clientY - this.lastY;
              this.offsetY += temY;
              e.currentTarget.style.transform = 'translate(0px,' + this.offsetY + 'px)';
              this.lastY = e.clientY;
            }
          },
          touchstart: function touchstart(e) {
            this.touch = true;
            this.lastY = e.touches[0].clientY;
            this.lastTwoY = this.lastY;
          },
          touchmove: function touchmove(e) {
            e.preventDefault();
            if (this.touch) {
              this.lastTwoY = this.lastY;
              var temY = e.touches[0].clientY - this.lastY;
              this.offsetY += temY;
              e.currentTarget.style.transform = 'translate(0px,' + this.offsetY + 'px)';
              this.lastY = e.touches[0].clientY;
            }
          },
          touchend: function touchend(e) {
            var _this2 = this;

            this.touch = false;
            var temY = (this.lastY - this.lastTwoY) * 4;
            console.log(this.offsetY);

            var hasRefresh = false;
            // 如果触发了上拉刷新
            if (this.offsetY > 46) {
              hasRefresh = this._events.onRefresh && this._events.onRefresh.length !== 0;
              hasRefresh && this._events.onRefresh[0]();
              this.showRefresh = true;
            }

            this.offsetY += temY;
            var target = e.currentTarget;
            this.target = target;
            e.currentTarget.style.transform = 'translate(0px,' + this.offsetY + 'px)';
            // this.once(e.currentTarget,'webkitTransitionEnd',_=>{
            this.$nextTick(function () {
              var contentH = +getComputedStyle(document.querySelector('.haha-scroller-content')).height.slice(0, -2);
              var containerH = +getComputedStyle(document.querySelector('.haha-scroller-wrap')).height.slice(0, -2);

              if (Math.abs(_this2.offsetY) + containerH > contentH && _this2.offsetY < 0) {
                // 如果下拉加载更多
                var hasInfinite = _this2._events.onInfinite && _this2._events.onInfinite.length !== 0;
                hasInfinite && _this2._events.onInfinite[0]();

                var offY = hasInfinite ? 46 : 0;
                _this2.offsetY = -(contentH - containerH);
                target.style.transform = 'translate(0px,' + (_this2.offsetY - offY) + 'px)';
              } else if (_this2.offsetY > 0) {

                _this2.offsetY = 0;
                var _offY = hasRefresh ? 46 : 0;
                target.style.transform = 'translate(0px,' + _offY + 'px)';
              }
            });

            // })
            // console.log(e.changedTouches[0].clientY-this.lastTwoY)
          },
          finishRefresh: function finishRefresh() {
            this.target.style.transform = 'translate(0px,' + this.offsetY + 'px)';
            this.showRefresh = false;
          },
          finishInfinite: function finishInfinite() {
            this.target.style.transform = 'translate(0px,' + this.offsetY + 'px)';
          },
          once: function once(el, event, fn) {
            var t = this;
            var listener = function listener() {
              if (fn) {
                fn.apply(t, arguments);
              }
              t.off(el, event, listener);
            };
            t.on(el, event, listener);
          },
          on: function on(elem, type, eventHandle) {
            if (elem == null || typeof elem === 'undefined') {
              return;
            }
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent('on' + type, eventHandle);
            } else {
              elem['on' + type] = eventHandle;
            }
          },
          off: function off(elem, type, eventHandle) {
            if (elem == null || typeof elem === 'undefined') {
              return;
            }
            if (elem.removeEventListener) {
              elem.removeEventListener(type, eventHandle, false);
            } else if (elem.detachEvent) {
              elem.detachEvent('on' + type, eventHandle);
            } else {
              elem['on' + type] = null;
            }
          }
        }
      };

      /***/
    },
    /* 82 */
    /***/function (module, exports, __webpack_require__) {

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      /**
       * Swiper 3.4.2
       * Most modern mobile touch slider and framework with hardware accelerated transitions
       * 
       * http://www.idangero.us/swiper/
       * 
       * Copyright 2017, Vladimir Kharlampidi
       * The iDangero.us
       * http://www.idangero.us/
       * 
       * Licensed under MIT
       * 
       * Released on: March 10, 2017
       */
      !function () {
        "use strict";

        var e,
            a = function a(s, i) {
          function r(e) {
            return Math.floor(e);
          }function n() {
            var e = T.params.autoplay,
                a = T.slides.eq(T.activeIndex);a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || T.params.autoplay), T.autoplayTimeoutId = setTimeout(function () {
              T.params.loop ? (T.fixLoop(), T._slideNext(), T.emit("onAutoplay", T)) : T.isEnd ? i.autoplayStopOnLast ? T.stopAutoplay() : (T._slideTo(0), T.emit("onAutoplay", T)) : (T._slideNext(), T.emit("onAutoplay", T));
            }, e);
          }function o(a, t) {
            var s = e(a.target);if (!s.is(t)) if ("string" == typeof t) s = s.parents(t);else if (t.nodeType) {
              var i;return s.parents().each(function (e, a) {
                a === t && (i = t);
              }), i ? t : void 0;
            }if (0 !== s.length) return s[0];
          }function l(e, a) {
            a = a || {};var t = window.MutationObserver || window.WebkitMutationObserver,
                s = new t(function (e) {
              e.forEach(function (e) {
                T.onResize(!0), T.emit("onObserverUpdate", T, e);
              });
            });s.observe(e, { attributes: void 0 === a.attributes || a.attributes, childList: void 0 === a.childList || a.childList, characterData: void 0 === a.characterData || a.characterData }), T.observers.push(s);
          }function p(e) {
            e.originalEvent && (e = e.originalEvent);var a = e.keyCode || e.charCode;if (!T.params.allowSwipeToNext && (T.isHorizontal() && 39 === a || !T.isHorizontal() && 40 === a)) return !1;if (!T.params.allowSwipeToPrev && (T.isHorizontal() && 37 === a || !T.isHorizontal() && 38 === a)) return !1;if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
              if (37 === a || 39 === a || 38 === a || 40 === a) {
                var t = !1;if (T.container.parents("." + T.params.slideClass).length > 0 && 0 === T.container.parents("." + T.params.slideActiveClass).length) return;var s = { left: window.pageXOffset, top: window.pageYOffset },
                    i = window.innerWidth,
                    r = window.innerHeight,
                    n = T.container.offset();T.rtl && (n.left = n.left - T.container[0].scrollLeft);for (var o = [[n.left, n.top], [n.left + T.width, n.top], [n.left, n.top + T.height], [n.left + T.width, n.top + T.height]], l = 0; l < o.length; l++) {
                  var p = o[l];p[0] >= s.left && p[0] <= s.left + i && p[1] >= s.top && p[1] <= s.top + r && (t = !0);
                }if (!t) return;
              }T.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !T.rtl || 37 === a && T.rtl) && T.slideNext(), (37 === a && !T.rtl || 39 === a && T.rtl) && T.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && T.slideNext(), 38 === a && T.slidePrev()), T.emit("onKeyPress", T, a);
            }
          }function d(e) {
            var a = 0,
                t = 0,
                s = 0,
                i = 0;return "detail" in e && (t = e.detail), "wheelDelta" in e && (t = -e.wheelDelta / 120), "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (a = t, t = 0), s = 10 * a, i = 10 * t, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || i) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, i *= 40) : (s *= 800, i *= 800)), s && !a && (a = s < 1 ? -1 : 1), i && !t && (t = i < 1 ? -1 : 1), { spinX: a, spinY: t, pixelX: s, pixelY: i };
          }function u(e) {
            e.originalEvent && (e = e.originalEvent);var a = 0,
                t = T.rtl ? -1 : 1,
                s = d(e);if (T.params.mousewheelForceToAxis) {
              if (T.isHorizontal()) {
                if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;a = s.pixelX * t;
              } else {
                if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;a = s.pixelY;
              }
            } else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;if (0 !== a) {
              if (T.params.mousewheelInvert && (a = -a), T.params.freeMode) {
                var i = T.getWrapperTranslate() + a * T.params.mousewheelSensitivity,
                    r = T.isBeginning,
                    n = T.isEnd;if (i >= T.minTranslate() && (i = T.minTranslate()), i <= T.maxTranslate() && (i = T.maxTranslate()), T.setWrapperTransition(0), T.setWrapperTranslate(i), T.updateProgress(), T.updateActiveIndex(), (!r && T.isBeginning || !n && T.isEnd) && T.updateClasses(), T.params.freeModeSticky ? (clearTimeout(T.mousewheel.timeout), T.mousewheel.timeout = setTimeout(function () {
                  T.slideReset();
                }, 300)) : T.params.lazyLoading && T.lazy && T.lazy.load(), T.emit("onScroll", T, e), T.params.autoplay && T.params.autoplayDisableOnInteraction && T.stopAutoplay(), 0 === i || i === T.maxTranslate()) return;
              } else {
                if (new window.Date().getTime() - T.mousewheel.lastScrollTime > 60) if (a < 0) {
                  if (T.isEnd && !T.params.loop || T.animating) {
                    if (T.params.mousewheelReleaseOnEdges) return !0;
                  } else T.slideNext(), T.emit("onScroll", T, e);
                } else if (T.isBeginning && !T.params.loop || T.animating) {
                  if (T.params.mousewheelReleaseOnEdges) return !0;
                } else T.slidePrev(), T.emit("onScroll", T, e);T.mousewheel.lastScrollTime = new window.Date().getTime();
              }return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
            }
          }function c(a, t) {
            a = e(a);var s,
                i,
                r,
                n = T.rtl ? -1 : 1;s = a.attr("data-swiper-parallax") || "0", i = a.attr("data-swiper-parallax-x"), r = a.attr("data-swiper-parallax-y"), i || r ? (i = i || "0", r = r || "0") : T.isHorizontal() ? (i = s, r = "0") : (r = s, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px", a.transform("translate3d(" + i + ", " + r + ",0px)");
          }function m(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
          }if (!(this instanceof a)) return new a(s, i);var h = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, zoom: !1, zoomMax: 3, zoomMin: 1, zoomToggle: !0, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, mousewheelEventsTarged: "container", hashnav: !1, hashnavWatchState: !1, history: !1, replaceState: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, touchReleaseOnEdges: !1, uniqueNavElements: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", normalizeSlideIndex: !0, allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", passiveListeners: !0, containerModifierClass: "swiper-container-", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", paginationClickableClass: "swiper-pagination-clickable", paginationModifierClass: "swiper-pagination-", lazyLoadingClass: "swiper-lazy", lazyStatusLoadingClass: "swiper-lazy-loading", lazyStatusLoadedClass: "swiper-lazy-loaded", lazyPreloaderClass: "swiper-lazy-preloader", notificationClass: "swiper-notification", preloaderClass: "preloader", zoomContainerClass: "swiper-zoom-container", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
              g = i && i.virtualTranslate;i = i || {};var f = {};for (var v in i) {
            if ("object" != _typeof(i[v]) || null === i[v] || i[v].nodeType || i[v] === window || i[v] === document || void 0 !== t && i[v] instanceof t || "undefined" != typeof jQuery && i[v] instanceof jQuery) f[v] = i[v];else {
              f[v] = {};for (var w in i[v]) {
                f[v][w] = i[v][w];
              }
            }
          }for (var y in h) {
            if (void 0 === i[y]) i[y] = h[y];else if ("object" == _typeof(i[y])) for (var x in h[y]) {
              void 0 === i[y][x] && (i[y][x] = h[y][x]);
            }
          }var T = this;if (T.params = i, T.originalParams = f, T.classNames = [], void 0 !== e && void 0 !== t && (e = t), (void 0 !== e || (e = void 0 === t ? window.Dom7 || window.Zepto || window.jQuery : t)) && (T.$ = e, T.currentBreakpoint = void 0, T.getActiveBreakpoint = function () {
            if (!T.params.breakpoints) return !1;var e,
                a = !1,
                t = [];for (e in T.params.breakpoints) {
              T.params.breakpoints.hasOwnProperty(e) && t.push(e);
            }t.sort(function (e, a) {
              return parseInt(e, 10) > parseInt(a, 10);
            });for (var s = 0; s < t.length; s++) {
              (e = t[s]) >= window.innerWidth && !a && (a = e);
            }return a || "max";
          }, T.setBreakpoint = function () {
            var e = T.getActiveBreakpoint();if (e && T.currentBreakpoint !== e) {
              var a = e in T.params.breakpoints ? T.params.breakpoints[e] : T.originalParams,
                  t = T.params.loop && a.slidesPerView !== T.params.slidesPerView;for (var s in a) {
                T.params[s] = a[s];
              }T.currentBreakpoint = e, t && T.destroyLoop && T.reLoop(!0);
            }
          }, T.params.breakpoints && T.setBreakpoint(), T.container = e(s), 0 !== T.container.length)) {
            if (T.container.length > 1) {
              var b = [];return T.container.each(function () {
                b.push(new a(this, i));
              }), b;
            }T.container[0].swiper = T, T.container.data("swiper", T), T.classNames.push(T.params.containerModifierClass + T.params.direction), T.params.freeMode && T.classNames.push(T.params.containerModifierClass + "free-mode"), T.support.flexbox || (T.classNames.push(T.params.containerModifierClass + "no-flexbox"), T.params.slidesPerColumn = 1), T.params.autoHeight && T.classNames.push(T.params.containerModifierClass + "autoheight"), (T.params.parallax || T.params.watchSlidesVisibility) && (T.params.watchSlidesProgress = !0), T.params.touchReleaseOnEdges && (T.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(T.params.effect) >= 0 && (T.support.transforms3d ? (T.params.watchSlidesProgress = !0, T.classNames.push(T.params.containerModifierClass + "3d")) : T.params.effect = "slide"), "slide" !== T.params.effect && T.classNames.push(T.params.containerModifierClass + T.params.effect), "cube" === T.params.effect && (T.params.resistanceRatio = 0, T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.centeredSlides = !1, T.params.spaceBetween = 0, T.params.virtualTranslate = !0), "fade" !== T.params.effect && "flip" !== T.params.effect || (T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.watchSlidesProgress = !0, T.params.spaceBetween = 0, void 0 === g && (T.params.virtualTranslate = !0)), T.params.grabCursor && T.support.touch && (T.params.grabCursor = !1), T.wrapper = T.container.children("." + T.params.wrapperClass), T.params.pagination && (T.paginationContainer = e(T.params.pagination), T.params.uniqueNavElements && "string" == typeof T.params.pagination && T.paginationContainer.length > 1 && 1 === T.container.find(T.params.pagination).length && (T.paginationContainer = T.container.find(T.params.pagination)), "bullets" === T.params.paginationType && T.params.paginationClickable ? T.paginationContainer.addClass(T.params.paginationModifierClass + "clickable") : T.params.paginationClickable = !1, T.paginationContainer.addClass(T.params.paginationModifierClass + T.params.paginationType)), (T.params.nextButton || T.params.prevButton) && (T.params.nextButton && (T.nextButton = e(T.params.nextButton), T.params.uniqueNavElements && "string" == typeof T.params.nextButton && T.nextButton.length > 1 && 1 === T.container.find(T.params.nextButton).length && (T.nextButton = T.container.find(T.params.nextButton))), T.params.prevButton && (T.prevButton = e(T.params.prevButton), T.params.uniqueNavElements && "string" == typeof T.params.prevButton && T.prevButton.length > 1 && 1 === T.container.find(T.params.prevButton).length && (T.prevButton = T.container.find(T.params.prevButton)))), T.isHorizontal = function () {
              return "horizontal" === T.params.direction;
            }, T.rtl = T.isHorizontal() && ("rtl" === T.container[0].dir.toLowerCase() || "rtl" === T.container.css("direction")), T.rtl && T.classNames.push(T.params.containerModifierClass + "rtl"), T.rtl && (T.wrongRTL = "-webkit-box" === T.wrapper.css("display")), T.params.slidesPerColumn > 1 && T.classNames.push(T.params.containerModifierClass + "multirow"), T.device.android && T.classNames.push(T.params.containerModifierClass + "android"), T.container.addClass(T.classNames.join(" ")), T.translate = 0, T.progress = 0, T.velocity = 0, T.lockSwipeToNext = function () {
              T.params.allowSwipeToNext = !1, T.params.allowSwipeToPrev === !1 && T.params.grabCursor && T.unsetGrabCursor();
            }, T.lockSwipeToPrev = function () {
              T.params.allowSwipeToPrev = !1, T.params.allowSwipeToNext === !1 && T.params.grabCursor && T.unsetGrabCursor();
            }, T.lockSwipes = function () {
              T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !1, T.params.grabCursor && T.unsetGrabCursor();
            }, T.unlockSwipeToNext = function () {
              T.params.allowSwipeToNext = !0, T.params.allowSwipeToPrev === !0 && T.params.grabCursor && T.setGrabCursor();
            }, T.unlockSwipeToPrev = function () {
              T.params.allowSwipeToPrev = !0, T.params.allowSwipeToNext === !0 && T.params.grabCursor && T.setGrabCursor();
            }, T.unlockSwipes = function () {
              T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !0, T.params.grabCursor && T.setGrabCursor();
            }, T.setGrabCursor = function (e) {
              T.container[0].style.cursor = "move", T.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", T.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", T.container[0].style.cursor = e ? "grabbing" : "grab";
            }, T.unsetGrabCursor = function () {
              T.container[0].style.cursor = "";
            }, T.params.grabCursor && T.setGrabCursor(), T.imagesToLoad = [], T.imagesLoaded = 0, T.loadImage = function (e, a, t, s, i, r) {
              function n() {
                r && r();
              }var o;e.complete && i ? n() : a ? (o = new window.Image(), o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n();
            }, T.preloadImages = function () {
              function e() {
                void 0 !== T && null !== T && T && (void 0 !== T.imagesLoaded && T.imagesLoaded++, T.imagesLoaded === T.imagesToLoad.length && (T.params.updateOnImagesReady && T.update(), T.emit("onImagesReady", T)));
              }T.imagesToLoad = T.container.find("img");for (var a = 0; a < T.imagesToLoad.length; a++) {
                T.loadImage(T.imagesToLoad[a], T.imagesToLoad[a].currentSrc || T.imagesToLoad[a].getAttribute("src"), T.imagesToLoad[a].srcset || T.imagesToLoad[a].getAttribute("srcset"), T.imagesToLoad[a].sizes || T.imagesToLoad[a].getAttribute("sizes"), !0, e);
              }
            }, T.autoplayTimeoutId = void 0, T.autoplaying = !1, T.autoplayPaused = !1, T.startAutoplay = function () {
              return void 0 === T.autoplayTimeoutId && !!T.params.autoplay && !T.autoplaying && (T.autoplaying = !0, T.emit("onAutoplayStart", T), void n());
            }, T.stopAutoplay = function (e) {
              T.autoplayTimeoutId && (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplaying = !1, T.autoplayTimeoutId = void 0, T.emit("onAutoplayStop", T));
            }, T.pauseAutoplay = function (e) {
              T.autoplayPaused || (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplayPaused = !0, 0 === e ? (T.autoplayPaused = !1, n()) : T.wrapper.transitionEnd(function () {
                T && (T.autoplayPaused = !1, T.autoplaying ? n() : T.stopAutoplay());
              }));
            }, T.minTranslate = function () {
              return -T.snapGrid[0];
            }, T.maxTranslate = function () {
              return -T.snapGrid[T.snapGrid.length - 1];
            }, T.updateAutoHeight = function () {
              var e,
                  a = [],
                  t = 0;if ("auto" !== T.params.slidesPerView && T.params.slidesPerView > 1) for (e = 0; e < Math.ceil(T.params.slidesPerView); e++) {
                var s = T.activeIndex + e;if (s > T.slides.length) break;a.push(T.slides.eq(s)[0]);
              } else a.push(T.slides.eq(T.activeIndex)[0]);for (e = 0; e < a.length; e++) {
                if (void 0 !== a[e]) {
                  var i = a[e].offsetHeight;t = i > t ? i : t;
                }
              }t && T.wrapper.css("height", t + "px");
            }, T.updateContainerSize = function () {
              var e, a;e = void 0 !== T.params.width ? T.params.width : T.container[0].clientWidth, a = void 0 !== T.params.height ? T.params.height : T.container[0].clientHeight, 0 === e && T.isHorizontal() || 0 === a && !T.isHorizontal() || (e = e - parseInt(T.container.css("padding-left"), 10) - parseInt(T.container.css("padding-right"), 10), a = a - parseInt(T.container.css("padding-top"), 10) - parseInt(T.container.css("padding-bottom"), 10), T.width = e, T.height = a, T.size = T.isHorizontal() ? T.width : T.height);
            }, T.updateSlidesSize = function () {
              T.slides = T.wrapper.children("." + T.params.slideClass), T.snapGrid = [], T.slidesGrid = [], T.slidesSizesGrid = [];var e,
                  a = T.params.spaceBetween,
                  t = -T.params.slidesOffsetBefore,
                  s = 0,
                  i = 0;if (void 0 !== T.size) {
                "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * T.size), T.virtualSize = -a, T.rtl ? T.slides.css({ marginLeft: "", marginTop: "" }) : T.slides.css({ marginRight: "", marginBottom: "" });var n;T.params.slidesPerColumn > 1 && (n = Math.floor(T.slides.length / T.params.slidesPerColumn) === T.slides.length / T.params.slidesPerColumn ? T.slides.length : Math.ceil(T.slides.length / T.params.slidesPerColumn) * T.params.slidesPerColumn, "auto" !== T.params.slidesPerView && "row" === T.params.slidesPerColumnFill && (n = Math.max(n, T.params.slidesPerView * T.params.slidesPerColumn)));var o,
                    l = T.params.slidesPerColumn,
                    p = n / l,
                    d = p - (T.params.slidesPerColumn * p - T.slides.length);for (e = 0; e < T.slides.length; e++) {
                  o = 0;var u = T.slides.eq(e);if (T.params.slidesPerColumn > 1) {
                    var c, m, h;"column" === T.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({ "-webkit-box-ordinal-group": c, "-moz-box-ordinal-group": c, "-ms-flex-order": c, "-webkit-order": c, order: c })) : (h = Math.floor(e / p), m = e - h * p), u.css("margin-" + (T.isHorizontal() ? "top" : "left"), 0 !== h && T.params.spaceBetween && T.params.spaceBetween + "px").attr("data-swiper-column", m).attr("data-swiper-row", h);
                  }"none" !== u.css("display") && ("auto" === T.params.slidesPerView ? (o = T.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), T.params.roundLengths && (o = r(o))) : (o = (T.size - (T.params.slidesPerView - 1) * a) / T.params.slidesPerView, T.params.roundLengths && (o = r(o)), T.isHorizontal() ? T.slides[e].style.width = o + "px" : T.slides[e].style.height = o + "px"), T.slides[e].swiperSlideSize = o, T.slidesSizesGrid.push(o), T.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === s && 0 !== e && (t = t - T.size / 2 - a), 0 === e && (t = t - T.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % T.params.slidesPerGroup == 0 && T.snapGrid.push(t), T.slidesGrid.push(t)) : (i % T.params.slidesPerGroup == 0 && T.snapGrid.push(t), T.slidesGrid.push(t), t = t + o + a), T.virtualSize += o + a, s = o, i++);
                }T.virtualSize = Math.max(T.virtualSize, T.size) + T.params.slidesOffsetAfter;var g;if (T.rtl && T.wrongRTL && ("slide" === T.params.effect || "coverflow" === T.params.effect) && T.wrapper.css({ width: T.virtualSize + T.params.spaceBetween + "px" }), T.support.flexbox && !T.params.setWrapperSize || (T.isHorizontal() ? T.wrapper.css({ width: T.virtualSize + T.params.spaceBetween + "px" }) : T.wrapper.css({ height: T.virtualSize + T.params.spaceBetween + "px" })), T.params.slidesPerColumn > 1 && (T.virtualSize = (o + T.params.spaceBetween) * n, T.virtualSize = Math.ceil(T.virtualSize / T.params.slidesPerColumn) - T.params.spaceBetween, T.isHorizontal() ? T.wrapper.css({ width: T.virtualSize + T.params.spaceBetween + "px" }) : T.wrapper.css({ height: T.virtualSize + T.params.spaceBetween + "px" }), T.params.centeredSlides)) {
                  for (g = [], e = 0; e < T.snapGrid.length; e++) {
                    T.snapGrid[e] < T.virtualSize + T.snapGrid[0] && g.push(T.snapGrid[e]);
                  }T.snapGrid = g;
                }if (!T.params.centeredSlides) {
                  for (g = [], e = 0; e < T.snapGrid.length; e++) {
                    T.snapGrid[e] <= T.virtualSize - T.size && g.push(T.snapGrid[e]);
                  }T.snapGrid = g, Math.floor(T.virtualSize - T.size) - Math.floor(T.snapGrid[T.snapGrid.length - 1]) > 1 && T.snapGrid.push(T.virtualSize - T.size);
                }0 === T.snapGrid.length && (T.snapGrid = [0]), 0 !== T.params.spaceBetween && (T.isHorizontal() ? T.rtl ? T.slides.css({ marginLeft: a + "px" }) : T.slides.css({ marginRight: a + "px" }) : T.slides.css({ marginBottom: a + "px" })), T.params.watchSlidesProgress && T.updateSlidesOffset();
              }
            }, T.updateSlidesOffset = function () {
              for (var e = 0; e < T.slides.length; e++) {
                T.slides[e].swiperSlideOffset = T.isHorizontal() ? T.slides[e].offsetLeft : T.slides[e].offsetTop;
              }
            }, T.currentSlidesPerView = function () {
              var e,
                  a,
                  t = 1;if (T.params.centeredSlides) {
                var s,
                    i = T.slides[T.activeIndex].swiperSlideSize;for (e = T.activeIndex + 1; e < T.slides.length; e++) {
                  T.slides[e] && !s && (i += T.slides[e].swiperSlideSize, t++, i > T.size && (s = !0));
                }for (a = T.activeIndex - 1; a >= 0; a--) {
                  T.slides[a] && !s && (i += T.slides[a].swiperSlideSize, t++, i > T.size && (s = !0));
                }
              } else for (e = T.activeIndex + 1; e < T.slides.length; e++) {
                T.slidesGrid[e] - T.slidesGrid[T.activeIndex] < T.size && t++;
              }return t;
            }, T.updateSlidesProgress = function (e) {
              if (void 0 === e && (e = T.translate || 0), 0 !== T.slides.length) {
                void 0 === T.slides[0].swiperSlideOffset && T.updateSlidesOffset();var a = -e;T.rtl && (a = e), T.slides.removeClass(T.params.slideVisibleClass);for (var t = 0; t < T.slides.length; t++) {
                  var s = T.slides[t],
                      i = (a + (T.params.centeredSlides ? T.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + T.params.spaceBetween);if (T.params.watchSlidesVisibility) {
                    var r = -(a - s.swiperSlideOffset),
                        n = r + T.slidesSizesGrid[t];(r >= 0 && r < T.size || n > 0 && n <= T.size || r <= 0 && n >= T.size) && T.slides.eq(t).addClass(T.params.slideVisibleClass);
                  }s.progress = T.rtl ? -i : i;
                }
              }
            }, T.updateProgress = function (e) {
              void 0 === e && (e = T.translate || 0);var a = T.maxTranslate() - T.minTranslate(),
                  t = T.isBeginning,
                  s = T.isEnd;0 === a ? (T.progress = 0, T.isBeginning = T.isEnd = !0) : (T.progress = (e - T.minTranslate()) / a, T.isBeginning = T.progress <= 0, T.isEnd = T.progress >= 1), T.isBeginning && !t && T.emit("onReachBeginning", T), T.isEnd && !s && T.emit("onReachEnd", T), T.params.watchSlidesProgress && T.updateSlidesProgress(e), T.emit("onProgress", T, T.progress);
            }, T.updateActiveIndex = function () {
              var e,
                  a,
                  t,
                  s = T.rtl ? T.translate : -T.translate;for (a = 0; a < T.slidesGrid.length; a++) {
                void 0 !== T.slidesGrid[a + 1] ? s >= T.slidesGrid[a] && s < T.slidesGrid[a + 1] - (T.slidesGrid[a + 1] - T.slidesGrid[a]) / 2 ? e = a : s >= T.slidesGrid[a] && s < T.slidesGrid[a + 1] && (e = a + 1) : s >= T.slidesGrid[a] && (e = a);
              }T.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), t = Math.floor(e / T.params.slidesPerGroup), t >= T.snapGrid.length && (t = T.snapGrid.length - 1), e !== T.activeIndex && (T.snapIndex = t, T.previousIndex = T.activeIndex, T.activeIndex = e, T.updateClasses(), T.updateRealIndex());
            }, T.updateRealIndex = function () {
              T.realIndex = parseInt(T.slides.eq(T.activeIndex).attr("data-swiper-slide-index") || T.activeIndex, 10);
            }, T.updateClasses = function () {
              T.slides.removeClass(T.params.slideActiveClass + " " + T.params.slideNextClass + " " + T.params.slidePrevClass + " " + T.params.slideDuplicateActiveClass + " " + T.params.slideDuplicateNextClass + " " + T.params.slideDuplicatePrevClass);var a = T.slides.eq(T.activeIndex);a.addClass(T.params.slideActiveClass), i.loop && (a.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-swiper-slide-index="' + T.realIndex + '"]').addClass(T.params.slideDuplicateActiveClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + T.realIndex + '"]').addClass(T.params.slideDuplicateActiveClass));var t = a.next("." + T.params.slideClass).addClass(T.params.slideNextClass);T.params.loop && 0 === t.length && (t = T.slides.eq(0), t.addClass(T.params.slideNextClass));var s = a.prev("." + T.params.slideClass).addClass(T.params.slidePrevClass);if (T.params.loop && 0 === s.length && (s = T.slides.eq(-1), s.addClass(T.params.slidePrevClass)), i.loop && (t.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicateNextClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicateNextClass), s.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicatePrevClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicatePrevClass)), T.paginationContainer && T.paginationContainer.length > 0) {
                var r,
                    n = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length;if (T.params.loop ? (r = Math.ceil((T.activeIndex - T.loopedSlides) / T.params.slidesPerGroup), r > T.slides.length - 1 - 2 * T.loopedSlides && (r -= T.slides.length - 2 * T.loopedSlides), r > n - 1 && (r -= n), r < 0 && "bullets" !== T.params.paginationType && (r = n + r)) : r = void 0 !== T.snapIndex ? T.snapIndex : T.activeIndex || 0, "bullets" === T.params.paginationType && T.bullets && T.bullets.length > 0 && (T.bullets.removeClass(T.params.bulletActiveClass), T.paginationContainer.length > 1 ? T.bullets.each(function () {
                  e(this).index() === r && e(this).addClass(T.params.bulletActiveClass);
                }) : T.bullets.eq(r).addClass(T.params.bulletActiveClass)), "fraction" === T.params.paginationType && (T.paginationContainer.find("." + T.params.paginationCurrentClass).text(r + 1), T.paginationContainer.find("." + T.params.paginationTotalClass).text(n)), "progress" === T.params.paginationType) {
                  var o = (r + 1) / n,
                      l = o,
                      p = 1;T.isHorizontal() || (p = o, l = 1), T.paginationContainer.find("." + T.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(T.params.speed);
                }"custom" === T.params.paginationType && T.params.paginationCustomRender && (T.paginationContainer.html(T.params.paginationCustomRender(T, r + 1, n)), T.emit("onPaginationRendered", T, T.paginationContainer[0]));
              }T.params.loop || (T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.isBeginning ? (T.prevButton.addClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(T.prevButton)) : (T.prevButton.removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.enable(T.prevButton))), T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.isEnd ? (T.nextButton.addClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(T.nextButton)) : (T.nextButton.removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.enable(T.nextButton))));
            }, T.updatePagination = function () {
              if (T.params.pagination && T.paginationContainer && T.paginationContainer.length > 0) {
                var e = "";if ("bullets" === T.params.paginationType) {
                  for (var a = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length, t = 0; t < a; t++) {
                    e += T.params.paginationBulletRender ? T.params.paginationBulletRender(T, t, T.params.bulletClass) : "<" + T.params.paginationElement + ' class="' + T.params.bulletClass + '"></' + T.params.paginationElement + ">";
                  }T.paginationContainer.html(e), T.bullets = T.paginationContainer.find("." + T.params.bulletClass), T.params.paginationClickable && T.params.a11y && T.a11y && T.a11y.initPagination();
                }"fraction" === T.params.paginationType && (e = T.params.paginationFractionRender ? T.params.paginationFractionRender(T, T.params.paginationCurrentClass, T.params.paginationTotalClass) : '<span class="' + T.params.paginationCurrentClass + '"></span> / <span class="' + T.params.paginationTotalClass + '"></span>', T.paginationContainer.html(e)), "progress" === T.params.paginationType && (e = T.params.paginationProgressRender ? T.params.paginationProgressRender(T, T.params.paginationProgressbarClass) : '<span class="' + T.params.paginationProgressbarClass + '"></span>', T.paginationContainer.html(e)), "custom" !== T.params.paginationType && T.emit("onPaginationRendered", T, T.paginationContainer[0]);
              }
            }, T.update = function (e) {
              function a() {
                T.rtl, T.translate;t = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate()), T.setWrapperTranslate(t), T.updateActiveIndex(), T.updateClasses();
              }if (T) {
                T.updateContainerSize(), T.updateSlidesSize(), T.updateProgress(), T.updatePagination(), T.updateClasses(), T.params.scrollbar && T.scrollbar && T.scrollbar.set();var t;if (e) {
                  T.controller && T.controller.spline && (T.controller.spline = void 0), T.params.freeMode ? (a(), T.params.autoHeight && T.updateAutoHeight()) : (("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0)) || a();
                } else T.params.autoHeight && T.updateAutoHeight();
              }
            }, T.onResize = function (e) {
              T.params.onBeforeResize && T.params.onBeforeResize(T), T.params.breakpoints && T.setBreakpoint();var a = T.params.allowSwipeToPrev,
                  t = T.params.allowSwipeToNext;T.params.allowSwipeToPrev = T.params.allowSwipeToNext = !0, T.updateContainerSize(), T.updateSlidesSize(), ("auto" === T.params.slidesPerView || T.params.freeMode || e) && T.updatePagination(), T.params.scrollbar && T.scrollbar && T.scrollbar.set(), T.controller && T.controller.spline && (T.controller.spline = void 0);var s = !1;if (T.params.freeMode) {
                var i = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate());T.setWrapperTranslate(i), T.updateActiveIndex(), T.updateClasses(), T.params.autoHeight && T.updateAutoHeight();
              } else T.updateClasses(), s = ("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0);T.params.lazyLoading && !s && T.lazy && T.lazy.load(), T.params.allowSwipeToPrev = a, T.params.allowSwipeToNext = t, T.params.onAfterResize && T.params.onAfterResize(T);
            }, T.touchEventsDesktop = { start: "mousedown", move: "mousemove", end: "mouseup" }, window.navigator.pointerEnabled ? T.touchEventsDesktop = { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled && (T.touchEventsDesktop = { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }), T.touchEvents = { start: T.support.touch || !T.params.simulateTouch ? "touchstart" : T.touchEventsDesktop.start, move: T.support.touch || !T.params.simulateTouch ? "touchmove" : T.touchEventsDesktop.move, end: T.support.touch || !T.params.simulateTouch ? "touchend" : T.touchEventsDesktop.end }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === T.params.touchEventsTarget ? T.container : T.wrapper).addClass("swiper-wp8-" + T.params.direction), T.initEvents = function (e) {
              var a = e ? "off" : "on",
                  t = e ? "removeEventListener" : "addEventListener",
                  s = "container" === T.params.touchEventsTarget ? T.container[0] : T.wrapper[0],
                  r = T.support.touch ? s : document,
                  n = !!T.params.nested;if (T.browser.ie) s[t](T.touchEvents.start, T.onTouchStart, !1), r[t](T.touchEvents.move, T.onTouchMove, n), r[t](T.touchEvents.end, T.onTouchEnd, !1);else {
                if (T.support.touch) {
                  var o = !("touchstart" !== T.touchEvents.start || !T.support.passiveListener || !T.params.passiveListeners) && { passive: !0, capture: !1 };s[t](T.touchEvents.start, T.onTouchStart, o), s[t](T.touchEvents.move, T.onTouchMove, n), s[t](T.touchEvents.end, T.onTouchEnd, o);
                }(i.simulateTouch && !T.device.ios && !T.device.android || i.simulateTouch && !T.support.touch && T.device.ios) && (s[t]("mousedown", T.onTouchStart, !1), document[t]("mousemove", T.onTouchMove, n), document[t]("mouseup", T.onTouchEnd, !1));
              }window[t]("resize", T.onResize), T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.nextButton[a]("click", T.onClickNext), T.params.a11y && T.a11y && T.nextButton[a]("keydown", T.a11y.onEnterKey)), T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.prevButton[a]("click", T.onClickPrev), T.params.a11y && T.a11y && T.prevButton[a]("keydown", T.a11y.onEnterKey)), T.params.pagination && T.params.paginationClickable && (T.paginationContainer[a]("click", "." + T.params.bulletClass, T.onClickIndex), T.params.a11y && T.a11y && T.paginationContainer[a]("keydown", "." + T.params.bulletClass, T.a11y.onEnterKey)), (T.params.preventClicks || T.params.preventClicksPropagation) && s[t]("click", T.preventClicks, !0);
            }, T.attachEvents = function () {
              T.initEvents();
            }, T.detachEvents = function () {
              T.initEvents(!0);
            }, T.allowClick = !0, T.preventClicks = function (e) {
              T.allowClick || (T.params.preventClicks && e.preventDefault(), T.params.preventClicksPropagation && T.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
            }, T.onClickNext = function (e) {
              e.preventDefault(), T.isEnd && !T.params.loop || T.slideNext();
            }, T.onClickPrev = function (e) {
              e.preventDefault(), T.isBeginning && !T.params.loop || T.slidePrev();
            }, T.onClickIndex = function (a) {
              a.preventDefault();var t = e(this).index() * T.params.slidesPerGroup;T.params.loop && (t += T.loopedSlides), T.slideTo(t);
            }, T.updateClickedSlide = function (a) {
              var t = o(a, "." + T.params.slideClass),
                  s = !1;if (t) for (var i = 0; i < T.slides.length; i++) {
                T.slides[i] === t && (s = !0);
              }if (!t || !s) return T.clickedSlide = void 0, void (T.clickedIndex = void 0);if (T.clickedSlide = t, T.clickedIndex = e(t).index(), T.params.slideToClickedSlide && void 0 !== T.clickedIndex && T.clickedIndex !== T.activeIndex) {
                var r,
                    n = T.clickedIndex,
                    l = "auto" === T.params.slidesPerView ? T.currentSlidesPerView() : T.params.slidesPerView;if (T.params.loop) {
                  if (T.animating) return;r = parseInt(e(T.clickedSlide).attr("data-swiper-slide-index"), 10), T.params.centeredSlides ? n < T.loopedSlides - l / 2 || n > T.slides.length - T.loopedSlides + l / 2 ? (T.fixLoop(), n = T.wrapper.children("." + T.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + T.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                    T.slideTo(n);
                  }, 0)) : T.slideTo(n) : n > T.slides.length - l ? (T.fixLoop(), n = T.wrapper.children("." + T.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + T.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                    T.slideTo(n);
                  }, 0)) : T.slideTo(n);
                } else T.slideTo(n);
              }
            };var S,
                C,
                z,
                M,
                E,
                P,
                I,
                k,
                L,
                D,
                B = "input, select, textarea, button, video",
                H = Date.now(),
                G = [];T.animating = !1, T.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };var X, A;T.onTouchStart = function (a) {
              if (a.originalEvent && (a = a.originalEvent), (X = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
                if (T.params.noSwiping && o(a, "." + T.params.noSwipingClass)) return void (T.allowClick = !0);if (!T.params.swipeHandler || o(a, T.params.swipeHandler)) {
                  var t = T.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                      s = T.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;if (!(T.device.ios && T.params.iOSEdgeSwipeDetection && t <= T.params.iOSEdgeSwipeThreshold)) {
                    if (S = !0, C = !1, z = !0, E = void 0, A = void 0, T.touches.startX = t, T.touches.startY = s, M = Date.now(), T.allowClick = !0, T.updateContainerSize(), T.swipeDirection = void 0, T.params.threshold > 0 && (k = !1), "touchstart" !== a.type) {
                      var i = !0;e(a.target).is(B) && (i = !1), document.activeElement && e(document.activeElement).is(B) && document.activeElement.blur(), i && a.preventDefault();
                    }T.emit("onTouchStart", T, a);
                  }
                }
              }
            }, T.onTouchMove = function (a) {
              if (a.originalEvent && (a = a.originalEvent), !X || "mousemove" !== a.type) {
                if (a.preventedByNestedSwiper) return T.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void (T.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);if (T.params.onlyExternal) return T.allowClick = !1, void (S && (T.touches.startX = T.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, T.touches.startY = T.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, M = Date.now()));if (X && T.params.touchReleaseOnEdges && !T.params.loop) if (T.isHorizontal()) {
                  if (T.touches.currentX < T.touches.startX && T.translate <= T.maxTranslate() || T.touches.currentX > T.touches.startX && T.translate >= T.minTranslate()) return;
                } else if (T.touches.currentY < T.touches.startY && T.translate <= T.maxTranslate() || T.touches.currentY > T.touches.startY && T.translate >= T.minTranslate()) return;if (X && document.activeElement && a.target === document.activeElement && e(a.target).is(B)) return C = !0, void (T.allowClick = !1);if (z && T.emit("onTouchMove", T, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                  if (T.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, T.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === E) {
                    var t;T.isHorizontal() && T.touches.currentY === T.touches.startY || !T.isHorizontal() && T.touches.currentX === T.touches.startX ? E = !1 : (t = 180 * Math.atan2(Math.abs(T.touches.currentY - T.touches.startY), Math.abs(T.touches.currentX - T.touches.startX)) / Math.PI, E = T.isHorizontal() ? t > T.params.touchAngle : 90 - t > T.params.touchAngle);
                  }if (E && T.emit("onTouchMoveOpposite", T, a), void 0 === A && (T.touches.currentX === T.touches.startX && T.touches.currentY === T.touches.startY || (A = !0)), S) {
                    if (E) return void (S = !1);if (A) {
                      T.allowClick = !1, T.emit("onSliderMove", T, a), a.preventDefault(), T.params.touchMoveStopPropagation && !T.params.nested && a.stopPropagation(), C || (i.loop && T.fixLoop(), I = T.getWrapperTranslate(), T.setWrapperTransition(0), T.animating && T.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), T.params.autoplay && T.autoplaying && (T.params.autoplayDisableOnInteraction ? T.stopAutoplay() : T.pauseAutoplay()), D = !1, !T.params.grabCursor || T.params.allowSwipeToNext !== !0 && T.params.allowSwipeToPrev !== !0 || T.setGrabCursor(!0)), C = !0;var s = T.touches.diff = T.isHorizontal() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY;s *= T.params.touchRatio, T.rtl && (s = -s), T.swipeDirection = s > 0 ? "prev" : "next", P = s + I;var r = !0;if (s > 0 && P > T.minTranslate() ? (r = !1, T.params.resistance && (P = T.minTranslate() - 1 + Math.pow(-T.minTranslate() + I + s, T.params.resistanceRatio))) : s < 0 && P < T.maxTranslate() && (r = !1, T.params.resistance && (P = T.maxTranslate() + 1 - Math.pow(T.maxTranslate() - I - s, T.params.resistanceRatio))), r && (a.preventedByNestedSwiper = !0), !T.params.allowSwipeToNext && "next" === T.swipeDirection && P < I && (P = I), !T.params.allowSwipeToPrev && "prev" === T.swipeDirection && P > I && (P = I), T.params.threshold > 0) {
                        if (!(Math.abs(s) > T.params.threshold || k)) return void (P = I);if (!k) return k = !0, T.touches.startX = T.touches.currentX, T.touches.startY = T.touches.currentY, P = I, void (T.touches.diff = T.isHorizontal() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY);
                      }T.params.followFinger && ((T.params.freeMode || T.params.watchSlidesProgress) && T.updateActiveIndex(), T.params.freeMode && (0 === G.length && G.push({ position: T.touches[T.isHorizontal() ? "startX" : "startY"], time: M }), G.push({ position: T.touches[T.isHorizontal() ? "currentX" : "currentY"], time: new window.Date().getTime() })), T.updateProgress(P), T.setWrapperTranslate(P));
                    }
                  }
                }
              }
            }, T.onTouchEnd = function (a) {
              if (a.originalEvent && (a = a.originalEvent), z && T.emit("onTouchEnd", T, a), z = !1, S) {
                T.params.grabCursor && C && S && (T.params.allowSwipeToNext === !0 || T.params.allowSwipeToPrev === !0) && T.setGrabCursor(!1);var t = Date.now(),
                    s = t - M;if (T.allowClick && (T.updateClickedSlide(a), T.emit("onTap", T, a), s < 300 && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                  T && (T.params.paginationHide && T.paginationContainer.length > 0 && !e(a.target).hasClass(T.params.bulletClass) && T.paginationContainer.toggleClass(T.params.paginationHiddenClass), T.emit("onClick", T, a));
                }, 300)), s < 300 && t - H < 300 && (L && clearTimeout(L), T.emit("onDoubleTap", T, a))), H = Date.now(), setTimeout(function () {
                  T && (T.allowClick = !0);
                }, 0), !S || !C || !T.swipeDirection || 0 === T.touches.diff || P === I) return void (S = C = !1);S = C = !1;var i;if (i = T.params.followFinger ? T.rtl ? T.translate : -T.translate : -P, T.params.freeMode) {
                  if (i < -T.minTranslate()) return void T.slideTo(T.activeIndex);if (i > -T.maxTranslate()) return void (T.slides.length < T.snapGrid.length ? T.slideTo(T.snapGrid.length - 1) : T.slideTo(T.slides.length - 1));if (T.params.freeModeMomentum) {
                    if (G.length > 1) {
                      var r = G.pop(),
                          n = G.pop(),
                          o = r.position - n.position,
                          l = r.time - n.time;T.velocity = o / l, T.velocity = T.velocity / 2, Math.abs(T.velocity) < T.params.freeModeMinimumVelocity && (T.velocity = 0), (l > 150 || new window.Date().getTime() - r.time > 300) && (T.velocity = 0);
                    } else T.velocity = 0;T.velocity = T.velocity * T.params.freeModeMomentumVelocityRatio, G.length = 0;var p = 1e3 * T.params.freeModeMomentumRatio,
                        d = T.velocity * p,
                        u = T.translate + d;T.rtl && (u = -u);var c,
                        m = !1,
                        h = 20 * Math.abs(T.velocity) * T.params.freeModeMomentumBounceRatio;if (u < T.maxTranslate()) T.params.freeModeMomentumBounce ? (u + T.maxTranslate() < -h && (u = T.maxTranslate() - h), c = T.maxTranslate(), m = !0, D = !0) : u = T.maxTranslate();else if (u > T.minTranslate()) T.params.freeModeMomentumBounce ? (u - T.minTranslate() > h && (u = T.minTranslate() + h), c = T.minTranslate(), m = !0, D = !0) : u = T.minTranslate();else if (T.params.freeModeSticky) {
                      var g,
                          f = 0;for (f = 0; f < T.snapGrid.length; f += 1) {
                        if (T.snapGrid[f] > -u) {
                          g = f;break;
                        }
                      }u = Math.abs(T.snapGrid[g] - u) < Math.abs(T.snapGrid[g - 1] - u) || "next" === T.swipeDirection ? T.snapGrid[g] : T.snapGrid[g - 1], T.rtl || (u = -u);
                    }if (0 !== T.velocity) p = T.rtl ? Math.abs((-u - T.translate) / T.velocity) : Math.abs((u - T.translate) / T.velocity);else if (T.params.freeModeSticky) return void T.slideReset();T.params.freeModeMomentumBounce && m ? (T.updateProgress(c), T.setWrapperTransition(p), T.setWrapperTranslate(u), T.onTransitionStart(), T.animating = !0, T.wrapper.transitionEnd(function () {
                      T && D && (T.emit("onMomentumBounce", T), T.setWrapperTransition(T.params.speed), T.setWrapperTranslate(c), T.wrapper.transitionEnd(function () {
                        T && T.onTransitionEnd();
                      }));
                    })) : T.velocity ? (T.updateProgress(u), T.setWrapperTransition(p), T.setWrapperTranslate(u), T.onTransitionStart(), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function () {
                      T && T.onTransitionEnd();
                    }))) : T.updateProgress(u), T.updateActiveIndex();
                  }return void ((!T.params.freeModeMomentum || s >= T.params.longSwipesMs) && (T.updateProgress(), T.updateActiveIndex()));
                }var v,
                    w = 0,
                    y = T.slidesSizesGrid[0];for (v = 0; v < T.slidesGrid.length; v += T.params.slidesPerGroup) {
                  void 0 !== T.slidesGrid[v + T.params.slidesPerGroup] ? i >= T.slidesGrid[v] && i < T.slidesGrid[v + T.params.slidesPerGroup] && (w = v, y = T.slidesGrid[v + T.params.slidesPerGroup] - T.slidesGrid[v]) : i >= T.slidesGrid[v] && (w = v, y = T.slidesGrid[T.slidesGrid.length - 1] - T.slidesGrid[T.slidesGrid.length - 2]);
                }var x = (i - T.slidesGrid[w]) / y;if (s > T.params.longSwipesMs) {
                  if (!T.params.longSwipes) return void T.slideTo(T.activeIndex);"next" === T.swipeDirection && (x >= T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) : T.slideTo(w)), "prev" === T.swipeDirection && (x > 1 - T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) : T.slideTo(w));
                } else {
                  if (!T.params.shortSwipes) return void T.slideTo(T.activeIndex);"next" === T.swipeDirection && T.slideTo(w + T.params.slidesPerGroup), "prev" === T.swipeDirection && T.slideTo(w);
                }
              }
            }, T._slideTo = function (e, a) {
              return T.slideTo(e, a, !0, !0);
            }, T.slideTo = function (e, a, t, s) {
              void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), T.snapIndex = Math.floor(e / T.params.slidesPerGroup), T.snapIndex >= T.snapGrid.length && (T.snapIndex = T.snapGrid.length - 1);var i = -T.snapGrid[T.snapIndex];if (T.params.autoplay && T.autoplaying && (s || !T.params.autoplayDisableOnInteraction ? T.pauseAutoplay(a) : T.stopAutoplay()), T.updateProgress(i), T.params.normalizeSlideIndex) for (var r = 0; r < T.slidesGrid.length; r++) {
                -Math.floor(100 * i) >= Math.floor(100 * T.slidesGrid[r]) && (e = r);
              }return !(!T.params.allowSwipeToNext && i < T.translate && i < T.minTranslate()) && !(!T.params.allowSwipeToPrev && i > T.translate && i > T.maxTranslate() && (T.activeIndex || 0) !== e) && (void 0 === a && (a = T.params.speed), T.previousIndex = T.activeIndex || 0, T.activeIndex = e, T.updateRealIndex(), T.rtl && -i === T.translate || !T.rtl && i === T.translate ? (T.params.autoHeight && T.updateAutoHeight(), T.updateClasses(), "slide" !== T.params.effect && T.setWrapperTranslate(i), !1) : (T.updateClasses(), T.onTransitionStart(t), 0 === a || T.browser.lteIE9 ? (T.setWrapperTranslate(i), T.setWrapperTransition(0), T.onTransitionEnd(t)) : (T.setWrapperTranslate(i), T.setWrapperTransition(a), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function () {
                T && T.onTransitionEnd(t);
              }))), !0));
            }, T.onTransitionStart = function (e) {
              void 0 === e && (e = !0), T.params.autoHeight && T.updateAutoHeight(), T.lazy && T.lazy.onTransitionStart(), e && (T.emit("onTransitionStart", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeStart", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextStart", T) : T.emit("onSlidePrevStart", T)));
            }, T.onTransitionEnd = function (e) {
              T.animating = !1, T.setWrapperTransition(0), void 0 === e && (e = !0), T.lazy && T.lazy.onTransitionEnd(), e && (T.emit("onTransitionEnd", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeEnd", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextEnd", T) : T.emit("onSlidePrevEnd", T))), T.params.history && T.history && T.history.setHistory(T.params.history, T.activeIndex), T.params.hashnav && T.hashnav && T.hashnav.setHash();
            }, T.slideNext = function (e, a, t) {
              if (T.params.loop) {
                if (T.animating) return !1;T.fixLoop();T.container[0].clientLeft;return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t);
              }return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t);
            }, T._slideNext = function (e) {
              return T.slideNext(!0, e, !0);
            }, T.slidePrev = function (e, a, t) {
              if (T.params.loop) {
                if (T.animating) return !1;T.fixLoop();T.container[0].clientLeft;return T.slideTo(T.activeIndex - 1, a, e, t);
              }return T.slideTo(T.activeIndex - 1, a, e, t);
            }, T._slidePrev = function (e) {
              return T.slidePrev(!0, e, !0);
            }, T.slideReset = function (e, a, t) {
              return T.slideTo(T.activeIndex, a, e);
            }, T.disableTouchControl = function () {
              return T.params.onlyExternal = !0, !0;
            }, T.enableTouchControl = function () {
              return T.params.onlyExternal = !1, !0;
            }, T.setWrapperTransition = function (e, a) {
              T.wrapper.transition(e), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTransition(e), T.params.parallax && T.parallax && T.parallax.setTransition(e), T.params.scrollbar && T.scrollbar && T.scrollbar.setTransition(e), T.params.control && T.controller && T.controller.setTransition(e, a), T.emit("onSetTransition", T, e);
            }, T.setWrapperTranslate = function (e, a, t) {
              var s = 0,
                  i = 0;T.isHorizontal() ? s = T.rtl ? -e : e : i = e, T.params.roundLengths && (s = r(s), i = r(i)), T.params.virtualTranslate || (T.support.transforms3d ? T.wrapper.transform("translate3d(" + s + "px, " + i + "px, 0px)") : T.wrapper.transform("translate(" + s + "px, " + i + "px)")), T.translate = T.isHorizontal() ? s : i;var n,
                  o = T.maxTranslate() - T.minTranslate();n = 0 === o ? 0 : (e - T.minTranslate()) / o, n !== T.progress && T.updateProgress(e), a && T.updateActiveIndex(), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTranslate(T.translate), T.params.parallax && T.parallax && T.parallax.setTranslate(T.translate), T.params.scrollbar && T.scrollbar && T.scrollbar.setTranslate(T.translate), T.params.control && T.controller && T.controller.setTranslate(T.translate, t), T.emit("onSetTranslate", T, T.translate);
            }, T.getTranslate = function (e, a) {
              var t, s, i, r;return void 0 === a && (a = "x"), T.params.virtualTranslate ? T.rtl ? -T.translate : T.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = i.transform || i.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function (e) {
                return e.replace(",", ".");
              }).join(", ")), r = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (r = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = r.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? r.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? r.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), T.rtl && s && (s = -s), s || 0);
            }, T.getWrapperTranslate = function (e) {
              return void 0 === e && (e = T.isHorizontal() ? "x" : "y"), T.getTranslate(T.wrapper[0], e);
            }, T.observers = [], T.initObservers = function () {
              if (T.params.observeParents) for (var e = T.container.parents(), a = 0; a < e.length; a++) {
                l(e[a]);
              }l(T.container[0], { childList: !1 }), l(T.wrapper[0], { attributes: !1 });
            }, T.disconnectObservers = function () {
              for (var e = 0; e < T.observers.length; e++) {
                T.observers[e].disconnect();
              }T.observers = [];
            }, T.createLoop = function () {
              T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove();var a = T.wrapper.children("." + T.params.slideClass);"auto" !== T.params.slidesPerView || T.params.loopedSlides || (T.params.loopedSlides = a.length), T.loopedSlides = parseInt(T.params.loopedSlides || T.params.slidesPerView, 10), T.loopedSlides = T.loopedSlides + T.params.loopAdditionalSlides, T.loopedSlides > a.length && (T.loopedSlides = a.length);var t,
                  s = [],
                  i = [];for (a.each(function (t, r) {
                var n = e(this);t < T.loopedSlides && i.push(r), t < a.length && t >= a.length - T.loopedSlides && s.push(r), n.attr("data-swiper-slide-index", t);
              }), t = 0; t < i.length; t++) {
                T.wrapper.append(e(i[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
              }for (t = s.length - 1; t >= 0; t--) {
                T.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
              }
            }, T.destroyLoop = function () {
              T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove(), T.slides.removeAttr("data-swiper-slide-index");
            }, T.reLoop = function (e) {
              var a = T.activeIndex - T.loopedSlides;T.destroyLoop(), T.createLoop(), T.updateSlidesSize(), e && T.slideTo(a + T.loopedSlides, 0, !1);
            }, T.fixLoop = function () {
              var e;T.activeIndex < T.loopedSlides ? (e = T.slides.length - 3 * T.loopedSlides + T.activeIndex, e += T.loopedSlides, T.slideTo(e, 0, !1, !0)) : ("auto" === T.params.slidesPerView && T.activeIndex >= 2 * T.loopedSlides || T.activeIndex > T.slides.length - 2 * T.params.slidesPerView) && (e = -T.slides.length + T.activeIndex + T.loopedSlides, e += T.loopedSlides, T.slideTo(e, 0, !1, !0));
            }, T.appendSlide = function (e) {
              if (T.params.loop && T.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
                e[a] && T.wrapper.append(e[a]);
              } else T.wrapper.append(e);T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0);
            }, T.prependSlide = function (e) {
              T.params.loop && T.destroyLoop();var a = T.activeIndex + 1;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
                for (var t = 0; t < e.length; t++) {
                  e[t] && T.wrapper.prepend(e[t]);
                }a = T.activeIndex + e.length;
              } else T.wrapper.prepend(e);T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.slideTo(a, 0, !1);
            }, T.removeSlide = function (e) {
              T.params.loop && (T.destroyLoop(), T.slides = T.wrapper.children("." + T.params.slideClass));var a,
                  t = T.activeIndex;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
                for (var s = 0; s < e.length; s++) {
                  a = e[s], T.slides[a] && T.slides.eq(a).remove(), a < t && t--;
                }t = Math.max(t, 0);
              } else a = e, T.slides[a] && T.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.params.loop ? T.slideTo(t + T.loopedSlides, 0, !1) : T.slideTo(t, 0, !1);
            }, T.removeAllSlides = function () {
              for (var e = [], a = 0; a < T.slides.length; a++) {
                e.push(a);
              }T.removeSlide(e);
            }, T.effects = { fade: { setTranslate: function setTranslate() {
                  for (var e = 0; e < T.slides.length; e++) {
                    var a = T.slides.eq(e),
                        t = a[0].swiperSlideOffset,
                        s = -t;T.params.virtualTranslate || (s -= T.translate);var i = 0;T.isHorizontal() || (i = s, s = 0);var r = T.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);a.css({ opacity: r }).transform("translate3d(" + s + "px, " + i + "px, 0px)");
                  }
                }, setTransition: function setTransition(e) {
                  if (T.slides.transition(e), T.params.virtualTranslate && 0 !== e) {
                    var a = !1;T.slides.transitionEnd(function () {
                      if (!a && T) {
                        a = !0, T.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
                          T.wrapper.trigger(e[t]);
                        }
                      }
                    });
                  }
                } }, flip: { setTranslate: function setTranslate() {
                  for (var a = 0; a < T.slides.length; a++) {
                    var t = T.slides.eq(a),
                        s = t[0].progress;T.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));var i = t[0].swiperSlideOffset,
                        r = -180 * s,
                        n = r,
                        o = 0,
                        l = -i,
                        p = 0;if (T.isHorizontal() ? T.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + T.slides.length, T.params.flip.slideShadows) {
                      var d = T.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                          u = T.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0));
                    }t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
                  }
                }, setTransition: function setTransition(a) {
                  if (T.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), T.params.virtualTranslate && 0 !== a) {
                    var t = !1;T.slides.eq(T.activeIndex).transitionEnd(function () {
                      if (!t && T && e(this).hasClass(T.params.slideActiveClass)) {
                        t = !0, T.animating = !1;for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < a.length; s++) {
                          T.wrapper.trigger(a[s]);
                        }
                      }
                    });
                  }
                } }, cube: { setTranslate: function setTranslate() {
                  var a,
                      t = 0;T.params.cube.shadow && (T.isHorizontal() ? (a = T.wrapper.find(".swiper-cube-shadow"), 0 === a.length && (a = e('<div class="swiper-cube-shadow"></div>'), T.wrapper.append(a)), a.css({ height: T.width + "px" })) : (a = T.container.find(".swiper-cube-shadow"), 0 === a.length && (a = e('<div class="swiper-cube-shadow"></div>'), T.container.append(a))));for (var s = 0; s < T.slides.length; s++) {
                    var i = T.slides.eq(s),
                        r = 90 * s,
                        n = Math.floor(r / 360);T.rtl && (r = -r, n = Math.floor(-r / 360));var o = Math.max(Math.min(i[0].progress, 1), -1),
                        l = 0,
                        p = 0,
                        d = 0;s % 4 == 0 ? (l = 4 * -n * T.size, d = 0) : (s - 1) % 4 == 0 ? (l = 0, d = 4 * -n * T.size) : (s - 2) % 4 == 0 ? (l = T.size + 4 * n * T.size, d = T.size) : (s - 3) % 4 == 0 && (l = -T.size, d = 3 * T.size + 4 * T.size * n), T.rtl && (l = -l), T.isHorizontal() || (p = l, l = 0);var u = "rotateX(" + (T.isHorizontal() ? 0 : -r) + "deg) rotateY(" + (T.isHorizontal() ? r : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";if (o <= 1 && o > -1 && (t = 90 * s + 90 * o, T.rtl && (t = 90 * -s - 90 * o)), i.transform(u), T.params.cube.slideShadows) {
                      var c = T.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                          m = T.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
                    }
                  }if (T.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + T.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + T.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + T.size / 2 + "px", "transform-origin": "50% 50% -" + T.size / 2 + "px" }), T.params.cube.shadow) if (T.isHorizontal()) a.transform("translate3d(0px, " + (T.width / 2 + T.params.cube.shadowOffset) + "px, " + -T.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + T.params.cube.shadowScale + ")");else {
                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                        g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                        f = T.params.cube.shadowScale,
                        v = T.params.cube.shadowScale / g,
                        w = T.params.cube.shadowOffset;a.transform("scale3d(" + f + ", 1, " + v + ") translate3d(0px, " + (T.height / 2 + w) + "px, " + -T.height / 2 / v + "px) rotateX(-90deg)");
                  }var y = T.isSafari || T.isUiWebView ? -T.size / 2 : 0;T.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (T.isHorizontal() ? 0 : t) + "deg) rotateY(" + (T.isHorizontal() ? -t : 0) + "deg)");
                }, setTransition: function setTransition(e) {
                  T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), T.params.cube.shadow && !T.isHorizontal() && T.container.find(".swiper-cube-shadow").transition(e);
                } }, coverflow: { setTranslate: function setTranslate() {
                  for (var a = T.translate, t = T.isHorizontal() ? -a + T.width / 2 : -a + T.height / 2, s = T.isHorizontal() ? T.params.coverflow.rotate : -T.params.coverflow.rotate, i = T.params.coverflow.depth, r = 0, n = T.slides.length; r < n; r++) {
                    var o = T.slides.eq(r),
                        l = T.slidesSizesGrid[r],
                        p = o[0].swiperSlideOffset,
                        d = (t - p - l / 2) / l * T.params.coverflow.modifier,
                        u = T.isHorizontal() ? s * d : 0,
                        c = T.isHorizontal() ? 0 : s * d,
                        m = -i * Math.abs(d),
                        h = T.isHorizontal() ? 0 : T.params.coverflow.stretch * d,
                        g = T.isHorizontal() ? T.params.coverflow.stretch * d : 0;Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);var f = "translate3d(" + g + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";if (o.transform(f), o[0].style.zIndex = 1 - Math.abs(Math.round(d)), T.params.coverflow.slideShadows) {
                      var v = T.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                          w = T.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
                    }
                  }if (T.browser.ie) {
                    T.wrapper[0].style.perspectiveOrigin = t + "px 50%";
                  }
                }, setTransition: function setTransition(e) {
                  T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
                } } }, T.lazy = { initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(a, t) {
                if (void 0 !== a && (void 0 === t && (t = !0), 0 !== T.slides.length)) {
                  var s = T.slides.eq(a),
                      i = s.find("." + T.params.lazyLoadingClass + ":not(." + T.params.lazyStatusLoadedClass + "):not(." + T.params.lazyStatusLoadingClass + ")");!s.hasClass(T.params.lazyLoadingClass) || s.hasClass(T.params.lazyStatusLoadedClass) || s.hasClass(T.params.lazyStatusLoadingClass) || (i = i.add(s[0])), 0 !== i.length && i.each(function () {
                    var a = e(this);a.addClass(T.params.lazyStatusLoadingClass);var i = a.attr("data-background"),
                        r = a.attr("data-src"),
                        n = a.attr("data-srcset"),
                        o = a.attr("data-sizes");T.loadImage(a[0], r || i, n, o, !1, function () {
                      if (void 0 !== T && null !== T && T) {
                        if (i ? (a.css("background-image", 'url("' + i + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), o && (a.attr("sizes", o), a.removeAttr("data-sizes")), r && (a.attr("src", r), a.removeAttr("data-src"))), a.addClass(T.params.lazyStatusLoadedClass).removeClass(T.params.lazyStatusLoadingClass), s.find("." + T.params.lazyPreloaderClass + ", ." + T.params.preloaderClass).remove(), T.params.loop && t) {
                          var e = s.attr("data-swiper-slide-index");if (s.hasClass(T.params.slideDuplicateClass)) {
                            var l = T.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + T.params.slideDuplicateClass + ")");T.lazy.loadImageInSlide(l.index(), !1);
                          } else {
                            var p = T.wrapper.children("." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');T.lazy.loadImageInSlide(p.index(), !1);
                          }
                        }T.emit("onLazyImageReady", T, s[0], a[0]);
                      }
                    }), T.emit("onLazyImageLoad", T, s[0], a[0]);
                  });
                }
              }, load: function load() {
                var a,
                    t = T.params.slidesPerView;if ("auto" === t && (t = 0), T.lazy.initialImageLoaded || (T.lazy.initialImageLoaded = !0), T.params.watchSlidesVisibility) T.wrapper.children("." + T.params.slideVisibleClass).each(function () {
                  T.lazy.loadImageInSlide(e(this).index());
                });else if (t > 1) for (a = T.activeIndex; a < T.activeIndex + t; a++) {
                  T.slides[a] && T.lazy.loadImageInSlide(a);
                } else T.lazy.loadImageInSlide(T.activeIndex);if (T.params.lazyLoadingInPrevNext) if (t > 1 || T.params.lazyLoadingInPrevNextAmount && T.params.lazyLoadingInPrevNextAmount > 1) {
                  var s = T.params.lazyLoadingInPrevNextAmount,
                      i = t,
                      r = Math.min(T.activeIndex + i + Math.max(s, i), T.slides.length),
                      n = Math.max(T.activeIndex - Math.max(i, s), 0);for (a = T.activeIndex + t; a < r; a++) {
                    T.slides[a] && T.lazy.loadImageInSlide(a);
                  }for (a = n; a < T.activeIndex; a++) {
                    T.slides[a] && T.lazy.loadImageInSlide(a);
                  }
                } else {
                  var o = T.wrapper.children("." + T.params.slideNextClass);o.length > 0 && T.lazy.loadImageInSlide(o.index());var l = T.wrapper.children("." + T.params.slidePrevClass);l.length > 0 && T.lazy.loadImageInSlide(l.index());
                }
              }, onTransitionStart: function onTransitionStart() {
                T.params.lazyLoading && (T.params.lazyLoadingOnTransitionStart || !T.params.lazyLoadingOnTransitionStart && !T.lazy.initialImageLoaded) && T.lazy.load();
              }, onTransitionEnd: function onTransitionEnd() {
                T.params.lazyLoading && !T.params.lazyLoadingOnTransitionStart && T.lazy.load();
              } }, T.scrollbar = { isTouched: !1, setDragPosition: function setDragPosition(e) {
                var a = T.scrollbar,
                    t = T.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                    s = t - a.track.offset()[T.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                    i = -T.minTranslate() * a.moveDivider,
                    r = -T.maxTranslate() * a.moveDivider;s < i ? s = i : s > r && (s = r), s = -s / a.moveDivider, T.updateProgress(s), T.setWrapperTranslate(s, !0);
              }, dragStart: function dragStart(e) {
                var a = T.scrollbar;a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), T.params.scrollbarHide && a.track.css("opacity", 1), T.wrapper.transition(100), a.drag.transition(100), T.emit("onScrollbarDragStart", T);
              }, dragMove: function dragMove(e) {
                var a = T.scrollbar;a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), T.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), T.emit("onScrollbarDragMove", T));
              }, dragEnd: function dragEnd(e) {
                var a = T.scrollbar;a.isTouched && (a.isTouched = !1, T.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
                  a.track.css("opacity", 0), a.track.transition(400);
                }, 1e3)), T.emit("onScrollbarDragEnd", T), T.params.scrollbarSnapOnRelease && T.slideReset());
              }, draggableEvents: function () {
                return T.params.simulateTouch !== !1 || T.support.touch ? T.touchEvents : T.touchEventsDesktop;
              }(), enableDraggable: function enableDraggable() {
                var a = T.scrollbar,
                    t = T.support.touch ? a.track : document;e(a.track).on(a.draggableEvents.start, a.dragStart), e(t).on(a.draggableEvents.move, a.dragMove), e(t).on(a.draggableEvents.end, a.dragEnd);
              }, disableDraggable: function disableDraggable() {
                var a = T.scrollbar,
                    t = T.support.touch ? a.track : document;e(a.track).off(a.draggableEvents.start, a.dragStart), e(t).off(a.draggableEvents.move, a.dragMove), e(t).off(a.draggableEvents.end, a.dragEnd);
              }, set: function set() {
                if (T.params.scrollbar) {
                  var a = T.scrollbar;a.track = e(T.params.scrollbar), T.params.uniqueNavElements && "string" == typeof T.params.scrollbar && a.track.length > 1 && 1 === T.container.find(T.params.scrollbar).length && (a.track = T.container.find(T.params.scrollbar)), a.drag = a.track.find(".swiper-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = T.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = T.size / T.virtualSize, a.moveDivider = a.divider * (a.trackSize / T.size), a.dragSize = a.trackSize * a.divider, T.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "", T.params.scrollbarHide && (a.track[0].style.opacity = 0);
                }
              }, setTranslate: function setTranslate() {
                if (T.params.scrollbar) {
                  var e,
                      a = T.scrollbar,
                      t = (T.translate, a.dragSize);e = (a.trackSize - a.dragSize) * T.progress, T.rtl && T.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), T.isHorizontal() ? (T.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (T.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), T.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                    a.track[0].style.opacity = 0, a.track.transition(400);
                  }, 1e3));
                }
              }, setTransition: function setTransition(e) {
                T.params.scrollbar && T.scrollbar.drag.transition(e);
              } }, T.controller = { LinearSpline: function LinearSpline(e, a) {
                var t = function () {
                  var e, a, t;return function (s, i) {
                    for (a = -1, e = s.length; e - a > 1;) {
                      s[t = e + a >> 1] <= i ? a = t : e = t;
                    }return e;
                  };
                }();this.x = e, this.y = a, this.lastIndex = e.length - 1;var s, i;this.x.length;this.interpolate = function (e) {
                  return e ? (i = t(this.x, e), s = i - 1, (e - this.x[s]) * (this.y[i] - this.y[s]) / (this.x[i] - this.x[s]) + this.y[s]) : 0;
                };
              }, getInterpolateFunction: function getInterpolateFunction(e) {
                T.controller.spline || (T.controller.spline = T.params.loop ? new T.controller.LinearSpline(T.slidesGrid, e.slidesGrid) : new T.controller.LinearSpline(T.snapGrid, e.snapGrid));
              }, setTranslate: function setTranslate(e, t) {
                function s(a) {
                  e = a.rtl && "horizontal" === a.params.direction ? -T.translate : T.translate, "slide" === T.params.controlBy && (T.controller.getInterpolateFunction(a), r = -T.controller.spline.interpolate(-e)), r && "container" !== T.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (T.maxTranslate() - T.minTranslate()), r = (e - T.minTranslate()) * i + a.minTranslate()), T.params.controlInverse && (r = a.maxTranslate() - r), a.updateProgress(r), a.setWrapperTranslate(r, !1, T), a.updateActiveIndex();
                }var i,
                    r,
                    n = T.params.control;if (Array.isArray(n)) for (var o = 0; o < n.length; o++) {
                  n[o] !== t && n[o] instanceof a && s(n[o]);
                } else n instanceof a && t !== n && s(n);
              }, setTransition: function setTransition(e, t) {
                function s(a) {
                  a.setWrapperTransition(e, T), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                    r && (a.params.loop && "slide" === T.params.controlBy && a.fixLoop(), a.onTransitionEnd());
                  }));
                }var i,
                    r = T.params.control;if (Array.isArray(r)) for (i = 0; i < r.length; i++) {
                  r[i] !== t && r[i] instanceof a && s(r[i]);
                } else r instanceof a && t !== r && s(r);
              } }, T.hashnav = { onHashCange: function onHashCange(e, a) {
                var t = document.location.hash.replace("#", "");t !== T.slides.eq(T.activeIndex).attr("data-hash") && T.slideTo(T.wrapper.children("." + T.params.slideClass + '[data-hash="' + t + '"]').index());
              }, attachEvents: function attachEvents(a) {
                var t = a ? "off" : "on";e(window)[t]("hashchange", T.hashnav.onHashCange);
              }, setHash: function setHash() {
                if (T.hashnav.initialized && T.params.hashnav) if (T.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + T.slides.eq(T.activeIndex).attr("data-hash") || "");else {
                  var e = T.slides.eq(T.activeIndex),
                      a = e.attr("data-hash") || e.attr("data-history");document.location.hash = a || "";
                }
              }, init: function init() {
                if (T.params.hashnav && !T.params.history) {
                  T.hashnav.initialized = !0;var e = document.location.hash.replace("#", "");if (e) for (var a = 0, t = T.slides.length; a < t; a++) {
                    var s = T.slides.eq(a),
                        i = s.attr("data-hash") || s.attr("data-history");if (i === e && !s.hasClass(T.params.slideDuplicateClass)) {
                      var r = s.index();T.slideTo(r, 0, T.params.runCallbacksOnInit, !0);
                    }
                  }T.params.hashnavWatchState && T.hashnav.attachEvents();
                }
              }, destroy: function destroy() {
                T.params.hashnavWatchState && T.hashnav.attachEvents(!0);
              } }, T.history = { init: function init() {
                if (T.params.history) {
                  if (!window.history || !window.history.pushState) return T.params.history = !1, void (T.params.hashnav = !0);T.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, T.params.runCallbacksOnInit), T.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState));
                }
              }, setHistoryPopState: function setHistoryPopState() {
                T.history.paths = T.history.getPathValues(), T.history.scrollToSlide(T.params.speed, T.history.paths.value, !1);
              }, getPathValues: function getPathValues() {
                var e = window.location.pathname.slice(1).split("/"),
                    a = e.length;return { key: e[a - 2], value: e[a - 1] };
              }, setHistory: function setHistory(e, a) {
                if (T.history.initialized && T.params.history) {
                  var t = T.slides.eq(a),
                      s = this.slugify(t.attr("data-history"));window.location.pathname.includes(e) || (s = e + "/" + s), T.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s);
                }
              }, slugify: function slugify(e) {
                return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
              }, scrollToSlide: function scrollToSlide(e, a, t) {
                if (a) for (var s = 0, i = T.slides.length; s < i; s++) {
                  var r = T.slides.eq(s),
                      n = this.slugify(r.attr("data-history"));if (n === a && !r.hasClass(T.params.slideDuplicateClass)) {
                    var o = r.index();T.slideTo(o, e, t);
                  }
                } else T.slideTo(0, e, t);
              } }, T.disableKeyboardControl = function () {
              T.params.keyboardControl = !1, e(document).off("keydown", p);
            }, T.enableKeyboardControl = function () {
              T.params.keyboardControl = !0, e(document).on("keydown", p);
            }, T.mousewheel = { event: !1, lastScrollTime: new window.Date().getTime() }, T.params.mousewheelControl && (T.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
              var e = "onwheel" in document;if (!e) {
                var a = document.createElement("div");a.setAttribute("onwheel", "return;"), e = "function" == typeof a.onwheel;
              }return !e && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e;
            }() ? "wheel" : "mousewheel"), T.disableMousewheelControl = function () {
              if (!T.mousewheel.event) return !1;var a = T.container;return "container" !== T.params.mousewheelEventsTarged && (a = e(T.params.mousewheelEventsTarged)), a.off(T.mousewheel.event, u), T.params.mousewheelControl = !1, !0;
            }, T.enableMousewheelControl = function () {
              if (!T.mousewheel.event) return !1;var a = T.container;return "container" !== T.params.mousewheelEventsTarged && (a = e(T.params.mousewheelEventsTarged)), a.on(T.mousewheel.event, u), T.params.mousewheelControl = !0, !0;
            }, T.parallax = { setTranslate: function setTranslate() {
                T.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                  c(this, T.progress);
                }), T.slides.each(function () {
                  var a = e(this);a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                    c(this, Math.min(Math.max(a[0].progress, -1), 1));
                  });
                });
              }, setTransition: function setTransition(a) {
                void 0 === a && (a = T.params.speed), T.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                  var t = e(this),
                      s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || a;0 === a && (s = 0), t.transition(s);
                });
              } }, T.zoom = { scale: 1, currentScale: 1, isScaling: !1, gesture: { slide: void 0, slideWidth: void 0, slideHeight: void 0, image: void 0, imageWrap: void 0, zoomMax: T.params.zoomMax }, image: { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 }, getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
                if (e.targetTouches.length < 2) return 1;var a = e.targetTouches[0].pageX,
                    t = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    i = e.targetTouches[1].pageY;return Math.sqrt(Math.pow(s - a, 2) + Math.pow(i - t, 2));
              }, onGestureStart: function onGestureStart(a) {
                var t = T.zoom;if (!T.support.gestures) {
                  if ("touchstart" !== a.type || "touchstart" === a.type && a.targetTouches.length < 2) return;t.gesture.scaleStart = t.getDistanceBetweenTouches(a);
                }if (!(t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = e(this), 0 === t.gesture.slide.length && (t.gesture.slide = T.slides.eq(T.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + T.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || T.params.zoomMax, 0 !== t.gesture.imageWrap.length))) return void (t.gesture.image = void 0);t.gesture.image.transition(0), t.isScaling = !0;
              }, onGestureChange: function onGestureChange(e) {
                var a = T.zoom;if (!T.support.gestures) {
                  if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;a.gesture.scaleMove = a.getDistanceBetweenTouches(e);
                }a.gesture.image && 0 !== a.gesture.image.length && (T.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < T.params.zoomMin && (a.scale = T.params.zoomMin + 1 - Math.pow(T.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"));
              }, onGestureEnd: function onGestureEnd(e) {
                var a = T.zoom;!T.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), T.params.zoomMin), a.gesture.image.transition(T.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0));
              }, onTouchStart: function onTouchStart(e, a) {
                var t = e.zoom;t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY));
              }, onTouchMove: function onTouchMove(e) {
                var a = T.zoom;if (a.gesture.image && 0 !== a.gesture.image.length && (T.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                  a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = T.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = T.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), T.rtl && (a.image.startX = -a.image.startX), T.rtl && (a.image.startY = -a.image.startY));var t = a.image.width * a.scale,
                      s = a.image.height * a.scale;if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                    if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                      if (T.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void (a.image.isTouched = !1);if (!T.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void (a.image.isTouched = !1);
                    }e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)");
                  }
                }
              }, onTouchEnd: function onTouchEnd(e, a) {
                var t = e.zoom;if (t.gesture.image && 0 !== t.gesture.image.length) {
                  if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void (t.image.isMoved = !1);t.image.isTouched = !1, t.image.isMoved = !1;var s = 300,
                      i = 300,
                      r = t.velocity.x * s,
                      n = t.image.currentX + r,
                      o = t.velocity.y * i,
                      l = t.image.currentY + o;0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (i = Math.abs((l - t.image.currentY) / t.velocity.y));var p = Math.max(s, i);t.image.currentX = n, t.image.currentY = l;var d = t.image.width * t.scale,
                      u = t.image.height * t.scale;t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - u / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)");
                }
              }, onTransitionEnd: function onTransitionEnd(e) {
                var a = e.zoom;a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1);
              }, toggleZoom: function toggleZoom(a, t) {
                var s = a.zoom;if (s.gesture.slide || (s.gesture.slide = a.clickedSlide ? e(a.clickedSlide) : a.slides.eq(a.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + a.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
                  var i, r, n, o, l, p, d, u, c, m, h, g, f, v, w, y, x, T;void 0 === s.image.touchesStart.x && t ? (i = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, r = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (i = s.image.touchesStart.x, r = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || a.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + x / 2 - i, p = o + T / 2 - r, c = s.gesture.image[0].offsetWidth, m = s.gesture.image[0].offsetHeight, h = c * s.scale, g = m * s.scale, f = Math.min(x / 2 - h / 2, 0), v = Math.min(T / 2 - g / 2, 0), w = -f, y = -v, d = l * s.scale, u = p * s.scale, d < f && (d = f), d > w && (d = w), u < v && (u = v), u > y && (u = y)) : (d = 0, u = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + u + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"));
                }
              }, attachEvents: function attachEvents(a) {
                var t = a ? "off" : "on";if (T.params.zoom) {
                  var s = (T.slides, !("touchstart" !== T.touchEvents.start || !T.support.passiveListener || !T.params.passiveListeners) && { passive: !0, capture: !1 });T.support.gestures ? (T.slides[t]("gesturestart", T.zoom.onGestureStart, s), T.slides[t]("gesturechange", T.zoom.onGestureChange, s), T.slides[t]("gestureend", T.zoom.onGestureEnd, s)) : "touchstart" === T.touchEvents.start && (T.slides[t](T.touchEvents.start, T.zoom.onGestureStart, s), T.slides[t](T.touchEvents.move, T.zoom.onGestureChange, s), T.slides[t](T.touchEvents.end, T.zoom.onGestureEnd, s)), T[t]("touchStart", T.zoom.onTouchStart), T.slides.each(function (a, s) {
                    e(s).find("." + T.params.zoomContainerClass).length > 0 && e(s)[t](T.touchEvents.move, T.zoom.onTouchMove);
                  }), T[t]("touchEnd", T.zoom.onTouchEnd), T[t]("transitionEnd", T.zoom.onTransitionEnd), T.params.zoomToggle && T.on("doubleTap", T.zoom.toggleZoom);
                }
              }, init: function init() {
                T.zoom.attachEvents();
              }, destroy: function destroy() {
                T.zoom.attachEvents(!0);
              } }, T._plugins = [];for (var Y in T.plugins) {
              var O = T.plugins[Y](T, T.params[Y]);O && T._plugins.push(O);
            }return T.callPlugins = function (e) {
              for (var a = 0; a < T._plugins.length; a++) {
                e in T._plugins[a] && T._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
              }
            }, T.emitterEventListeners = {}, T.emit = function (e) {
              T.params[e] && T.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);var a;if (T.emitterEventListeners[e]) for (a = 0; a < T.emitterEventListeners[e].length; a++) {
                T.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
              }T.callPlugins && T.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }, T.on = function (e, a) {
              return e = m(e), T.emitterEventListeners[e] || (T.emitterEventListeners[e] = []), T.emitterEventListeners[e].push(a), T;
            }, T.off = function (e, a) {
              var t;if (e = m(e), void 0 === a) return T.emitterEventListeners[e] = [], T;if (T.emitterEventListeners[e] && 0 !== T.emitterEventListeners[e].length) {
                for (t = 0; t < T.emitterEventListeners[e].length; t++) {
                  T.emitterEventListeners[e][t] === a && T.emitterEventListeners[e].splice(t, 1);
                }return T;
              }
            }, T.once = function (e, a) {
              e = m(e);var t = function t() {
                a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), T.off(e, t);
              };return T.on(e, t), T;
            }, T.a11y = { makeFocusable: function makeFocusable(e) {
                return e.attr("tabIndex", "0"), e;
              }, addRole: function addRole(e, a) {
                return e.attr("role", a), e;
              }, addLabel: function addLabel(e, a) {
                return e.attr("aria-label", a), e;
              }, disable: function disable(e) {
                return e.attr("aria-disabled", !0), e;
              }, enable: function enable(e) {
                return e.attr("aria-disabled", !1), e;
              }, onEnterKey: function onEnterKey(a) {
                13 === a.keyCode && (e(a.target).is(T.params.nextButton) ? (T.onClickNext(a), T.isEnd ? T.a11y.notify(T.params.lastSlideMessage) : T.a11y.notify(T.params.nextSlideMessage)) : e(a.target).is(T.params.prevButton) && (T.onClickPrev(a), T.isBeginning ? T.a11y.notify(T.params.firstSlideMessage) : T.a11y.notify(T.params.prevSlideMessage)), e(a.target).is("." + T.params.bulletClass) && e(a.target)[0].click());
              }, liveRegion: e('<span class="' + T.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'), notify: function notify(e) {
                var a = T.a11y.liveRegion;0 !== a.length && (a.html(""), a.html(e));
              }, init: function init() {
                T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.a11y.makeFocusable(T.nextButton), T.a11y.addRole(T.nextButton, "button"), T.a11y.addLabel(T.nextButton, T.params.nextSlideMessage)), T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.a11y.makeFocusable(T.prevButton), T.a11y.addRole(T.prevButton, "button"), T.a11y.addLabel(T.prevButton, T.params.prevSlideMessage)), e(T.container).append(T.a11y.liveRegion);
              }, initPagination: function initPagination() {
                T.params.pagination && T.params.paginationClickable && T.bullets && T.bullets.length && T.bullets.each(function () {
                  var a = e(this);T.a11y.makeFocusable(a), T.a11y.addRole(a, "button"), T.a11y.addLabel(a, T.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1));
                });
              }, destroy: function destroy() {
                T.a11y.liveRegion && T.a11y.liveRegion.length > 0 && T.a11y.liveRegion.remove();
              } }, T.init = function () {
              T.params.loop && T.createLoop(), T.updateContainerSize(), T.updateSlidesSize(), T.updatePagination(), T.params.scrollbar && T.scrollbar && (T.scrollbar.set(), T.params.scrollbarDraggable && T.scrollbar.enableDraggable()), "slide" !== T.params.effect && T.effects[T.params.effect] && (T.params.loop || T.updateProgress(), T.effects[T.params.effect].setTranslate()), T.params.loop ? T.slideTo(T.params.initialSlide + T.loopedSlides, 0, T.params.runCallbacksOnInit) : (T.slideTo(T.params.initialSlide, 0, T.params.runCallbacksOnInit), 0 === T.params.initialSlide && (T.parallax && T.params.parallax && T.parallax.setTranslate(), T.lazy && T.params.lazyLoading && (T.lazy.load(), T.lazy.initialImageLoaded = !0))), T.attachEvents(), T.params.observer && T.support.observer && T.initObservers(), T.params.preloadImages && !T.params.lazyLoading && T.preloadImages(), T.params.zoom && T.zoom && T.zoom.init(), T.params.autoplay && T.startAutoplay(), T.params.keyboardControl && T.enableKeyboardControl && T.enableKeyboardControl(), T.params.mousewheelControl && T.enableMousewheelControl && T.enableMousewheelControl(), T.params.hashnavReplaceState && (T.params.replaceState = T.params.hashnavReplaceState), T.params.history && T.history && T.history.init(), T.params.hashnav && T.hashnav && T.hashnav.init(), T.params.a11y && T.a11y && T.a11y.init(), T.emit("onInit", T);
            }, T.cleanupStyles = function () {
              T.container.removeClass(T.classNames.join(" ")).removeAttr("style"), T.wrapper.removeAttr("style"), T.slides && T.slides.length && T.slides.removeClass([T.params.slideVisibleClass, T.params.slideActiveClass, T.params.slideNextClass, T.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), T.paginationContainer && T.paginationContainer.length && T.paginationContainer.removeClass(T.params.paginationHiddenClass), T.bullets && T.bullets.length && T.bullets.removeClass(T.params.bulletActiveClass), T.params.prevButton && e(T.params.prevButton).removeClass(T.params.buttonDisabledClass), T.params.nextButton && e(T.params.nextButton).removeClass(T.params.buttonDisabledClass), T.params.scrollbar && T.scrollbar && (T.scrollbar.track && T.scrollbar.track.length && T.scrollbar.track.removeAttr("style"), T.scrollbar.drag && T.scrollbar.drag.length && T.scrollbar.drag.removeAttr("style"));
            }, T.destroy = function (e, a) {
              T.detachEvents(), T.stopAutoplay(), T.params.scrollbar && T.scrollbar && T.params.scrollbarDraggable && T.scrollbar.disableDraggable(), T.params.loop && T.destroyLoop(), a && T.cleanupStyles(), T.disconnectObservers(), T.params.zoom && T.zoom && T.zoom.destroy(), T.params.keyboardControl && T.disableKeyboardControl && T.disableKeyboardControl(), T.params.mousewheelControl && T.disableMousewheelControl && T.disableMousewheelControl(), T.params.a11y && T.a11y && T.a11y.destroy(), T.params.history && !T.params.replaceState && window.removeEventListener("popstate", T.history.setHistoryPopState), T.params.hashnav && T.hashnav && T.hashnav.destroy(), T.emit("onDestroy"), e !== !1 && (T = null);
            }, T.init(), T;
          }
        };a.prototype = { isSafari: function () {
            var e = window.navigator.userAgent.toLowerCase();return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
          }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent), isArray: function isArray(e) {
            return "[object Array]" === Object.prototype.toString.apply(e);
          }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1, lteIE9: function () {
              var e = document.createElement("div");return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length;
            }() }, device: function () {
            var e = window.navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);return { ios: t || i || s, android: a };
          }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
              return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
              var e = document.createElement("div").style;return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
            }(), flexbox: function () {
              for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
                if (a[t] in e) return !0;
              }
            }(), observer: function () {
              return "MutationObserver" in window || "WebkitMutationObserver" in window;
            }(), passiveListener: function () {
              var e = !1;try {
                var a = Object.defineProperty({}, "passive", { get: function get() {
                    e = !0;
                  } });window.addEventListener("testPassiveListener", null, a);
              } catch (e) {}return e;
            }(), gestures: function () {
              return "ongesturestart" in window;
            }() }, plugins: {} };for (var t = function () {
          var e = function e(_e) {
            var a = this,
                t = 0;for (t = 0; t < _e.length; t++) {
              a[t] = _e[t];
            }return a.length = _e.length, this;
          },
              a = function a(_a, t) {
            var s = [],
                i = 0;if (_a && !t && _a instanceof e) return _a;if (_a) if ("string" == typeof _a) {
              var r,
                  n,
                  o = _a.trim();if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                var l = "div";for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = _a, i = 0; i < n.childNodes.length; i++) {
                  s.push(n.childNodes[i]);
                }
              } else for (r = t || "#" !== _a[0] || _a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(_a) : [document.getElementById(_a.split("#")[1])], i = 0; i < r.length; i++) {
                r[i] && s.push(r[i]);
              }
            } else if (_a.nodeType || _a === window || _a === document) s.push(_a);else if (_a.length > 0 && _a[0].nodeType) for (i = 0; i < _a.length; i++) {
              s.push(_a[i]);
            }return new e(s);
          };return e.prototype = { addClass: function addClass(e) {
              if (void 0 === e) return this;for (var a = e.split(" "), t = 0; t < a.length; t++) {
                for (var s = 0; s < this.length; s++) {
                  this[s].classList.add(a[t]);
                }
              }return this;
            }, removeClass: function removeClass(e) {
              for (var a = e.split(" "), t = 0; t < a.length; t++) {
                for (var s = 0; s < this.length; s++) {
                  this[s].classList.remove(a[t]);
                }
              }return this;
            }, hasClass: function hasClass(e) {
              return !!this[0] && this[0].classList.contains(e);
            }, toggleClass: function toggleClass(e) {
              for (var a = e.split(" "), t = 0; t < a.length; t++) {
                for (var s = 0; s < this.length; s++) {
                  this[s].classList.toggle(a[t]);
                }
              }return this;
            }, attr: function attr(e, a) {
              if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;for (var t = 0; t < this.length; t++) {
                if (2 === arguments.length) this[t].setAttribute(e, a);else for (var s in e) {
                  this[t][s] = e[s], this[t].setAttribute(s, e[s]);
                }
              }return this;
            }, removeAttr: function removeAttr(e) {
              for (var a = 0; a < this.length; a++) {
                this[a].removeAttribute(e);
              }return this;
            }, data: function data(e, a) {
              if (void 0 !== a) {
                for (var t = 0; t < this.length; t++) {
                  var s = this[t];s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = a;
                }return this;
              }if (this[0]) {
                var i = this[0].getAttribute("data-" + e);return i ? i : this[0].dom7ElementDataStorage && (e in this[0].dom7ElementDataStorage) ? this[0].dom7ElementDataStorage[e] : void 0;
              }
            }, transform: function transform(e) {
              for (var a = 0; a < this.length; a++) {
                var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
              }return this;
            }, transition: function transition(e) {
              "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
                var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
              }return this;
            }, on: function on(e, t, s, i) {
              function r(e) {
                var i = e.target;if (a(i).is(t)) s.call(i, e);else for (var r = a(i).parents(), n = 0; n < r.length; n++) {
                  a(r[n]).is(t) && s.call(r[n], e);
                }
              }var n,
                  o,
                  l = e.split(" ");for (n = 0; n < this.length; n++) {
                if ("function" == typeof t || t === !1) for ("function" == typeof t && (s = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) {
                  this[n].addEventListener(l[o], s, i);
                } else for (o = 0; o < l.length; o++) {
                  this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({ listener: s, liveListener: r }), this[n].addEventListener(l[o], r, i);
                }
              }return this;
            }, off: function off(e, a, t, s) {
              for (var i = e.split(" "), r = 0; r < i.length; r++) {
                for (var n = 0; n < this.length; n++) {
                  if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], s = arguments[2] || !1), this[n].removeEventListener(i[r], t, s);else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) {
                    this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[r], this[n].dom7LiveListeners[o].liveListener, s);
                  }
                }
              }return this;
            }, once: function once(e, a, t, s) {
              function i(n) {
                t(n), r.off(e, a, i, s);
              }var r = this;"function" == typeof a && (a = !1, t = arguments[1], s = arguments[2]), r.on(e, a, i, s);
            }, trigger: function trigger(e, a) {
              for (var t = 0; t < this.length; t++) {
                var s;try {
                  s = new window.CustomEvent(e, { detail: a, bubbles: !0, cancelable: !0 });
                } catch (t) {
                  s = document.createEvent("Event"), s.initEvent(e, !0, !0), s.detail = a;
                }this[t].dispatchEvent(s);
              }return this;
            }, transitionEnd: function transitionEnd(e) {
              function a(r) {
                if (r.target === this) for (e.call(this, r), t = 0; t < s.length; t++) {
                  i.off(s[t], a);
                }
              }var t,
                  s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                  i = this;if (e) for (t = 0; t < s.length; t++) {
                i.on(s[t], a);
              }return this;
            }, width: function width() {
              return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
            }, outerWidth: function outerWidth(e) {
              return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
            }, height: function height() {
              return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
            }, outerHeight: function outerHeight(e) {
              return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
            }, offset: function offset() {
              if (this.length > 0) {
                var e = this[0],
                    a = e.getBoundingClientRect(),
                    t = document.body,
                    s = e.clientTop || t.clientTop || 0,
                    i = e.clientLeft || t.clientLeft || 0,
                    r = window.pageYOffset || e.scrollTop,
                    n = window.pageXOffset || e.scrollLeft;return { top: a.top + r - s, left: a.left + n - i };
              }return null;
            }, css: function css(e, a) {
              var t;if (1 === arguments.length) {
                if ("string" != typeof e) {
                  for (t = 0; t < this.length; t++) {
                    for (var s in e) {
                      this[t].style[s] = e[s];
                    }
                  }return this;
                }if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
              }if (2 === arguments.length && "string" == typeof e) {
                for (t = 0; t < this.length; t++) {
                  this[t].style[e] = a;
                }return this;
              }return this;
            }, each: function each(e) {
              for (var a = 0; a < this.length; a++) {
                e.call(this[a], a, this[a]);
              }return this;
            }, html: function html(e) {
              if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;for (var a = 0; a < this.length; a++) {
                this[a].innerHTML = e;
              }return this;
            }, text: function text(e) {
              if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;for (var a = 0; a < this.length; a++) {
                this[a].textContent = e;
              }return this;
            }, is: function is(t) {
              if (!this[0]) return !1;var s, i;if ("string" == typeof t) {
                var r = this[0];if (r === document) return t === document;if (r === window) return t === window;if (r.matches) return r.matches(t);if (r.webkitMatchesSelector) return r.webkitMatchesSelector(t);if (r.mozMatchesSelector) return r.mozMatchesSelector(t);if (r.msMatchesSelector) return r.msMatchesSelector(t);for (s = a(t), i = 0; i < s.length; i++) {
                  if (s[i] === this[0]) return !0;
                }return !1;
              }if (t === document) return this[0] === document;if (t === window) return this[0] === window;if (t.nodeType || t instanceof e) {
                for (s = t.nodeType ? [t] : t, i = 0; i < s.length; i++) {
                  if (s[i] === this[0]) return !0;
                }return !1;
              }return !1;
            }, index: function index() {
              if (this[0]) {
                for (var e = this[0], a = 0; null !== (e = e.previousSibling);) {
                  1 === e.nodeType && a++;
                }return a;
              }
            }, eq: function eq(a) {
              if (void 0 === a) return this;var t,
                  s = this.length;return a > s - 1 ? new e([]) : a < 0 ? (t = s + a, new e(t < 0 ? [] : [this[t]])) : new e([this[a]]);
            }, append: function append(a) {
              var t, s;for (t = 0; t < this.length; t++) {
                if ("string" == typeof a) {
                  var i = document.createElement("div");for (i.innerHTML = a; i.firstChild;) {
                    this[t].appendChild(i.firstChild);
                  }
                } else if (a instanceof e) for (s = 0; s < a.length; s++) {
                  this[t].appendChild(a[s]);
                } else this[t].appendChild(a);
              }return this;
            }, prepend: function prepend(a) {
              var t, s;for (t = 0; t < this.length; t++) {
                if ("string" == typeof a) {
                  var i = document.createElement("div");for (i.innerHTML = a, s = i.childNodes.length - 1; s >= 0; s--) {
                    this[t].insertBefore(i.childNodes[s], this[t].childNodes[0]);
                  }
                } else if (a instanceof e) for (s = 0; s < a.length; s++) {
                  this[t].insertBefore(a[s], this[t].childNodes[0]);
                } else this[t].insertBefore(a, this[t].childNodes[0]);
              }return this;
            }, insertBefore: function insertBefore(e) {
              for (var t = a(e), s = 0; s < this.length; s++) {
                if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
                  t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i]);
                }
              }
            }, insertAfter: function insertAfter(e) {
              for (var t = a(e), s = 0; s < this.length; s++) {
                if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0].nextSibling);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
                  t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i].nextSibling);
                }
              }
            }, next: function next(t) {
              return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : []);
            }, nextAll: function nextAll(t) {
              var s = [],
                  i = this[0];if (!i) return new e([]);for (; i.nextElementSibling;) {
                var r = i.nextElementSibling;t ? a(r).is(t) && s.push(r) : s.push(r), i = r;
              }return new e(s);
            }, prev: function prev(t) {
              return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []);
            }, prevAll: function prevAll(t) {
              var s = [],
                  i = this[0];if (!i) return new e([]);for (; i.previousElementSibling;) {
                var r = i.previousElementSibling;t ? a(r).is(t) && s.push(r) : s.push(r), i = r;
              }return new e(s);
            }, parent: function parent(e) {
              for (var t = [], s = 0; s < this.length; s++) {
                e ? a(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode);
              }return a(a.unique(t));
            }, parents: function parents(e) {
              for (var t = [], s = 0; s < this.length; s++) {
                for (var i = this[s].parentNode; i;) {
                  e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                }
              }return a(a.unique(t));
            }, find: function find(a) {
              for (var t = [], s = 0; s < this.length; s++) {
                for (var i = this[s].querySelectorAll(a), r = 0; r < i.length; r++) {
                  t.push(i[r]);
                }
              }return new e(t);
            }, children: function children(t) {
              for (var s = [], i = 0; i < this.length; i++) {
                for (var r = this[i].childNodes, n = 0; n < r.length; n++) {
                  t ? 1 === r[n].nodeType && a(r[n]).is(t) && s.push(r[n]) : 1 === r[n].nodeType && s.push(r[n]);
                }
              }return new e(a.unique(s));
            }, remove: function remove() {
              for (var e = 0; e < this.length; e++) {
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
              }return this;
            }, add: function add() {
              var e,
                  t,
                  s = this;for (e = 0; e < arguments.length; e++) {
                var i = a(arguments[e]);for (t = 0; t < i.length; t++) {
                  s[s.length] = i[t], s.length++;
                }
              }return s;
            } }, a.fn = e.prototype, a.unique = function (e) {
            for (var a = [], t = 0; t < e.length; t++) {
              a.indexOf(e[t]) === -1 && a.push(e[t]);
            }return a;
          }, a;
        }(), s = ["jQuery", "Zepto", "Dom7"], i = 0; i < s.length; i++) {
          window[s[i]] && function (e) {
            e.fn.swiper = function (t) {
              var s;return e(this).each(function () {
                var e = new a(this, t);s || (s = e);
              }), s;
            };
          }(window[s[i]]);
        }var r;r = void 0 === t ? window.Dom7 || window.Zepto || window.jQuery : t, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function (e) {
          function a(r) {
            if (r.target === this) for (e.call(this, r), t = 0; t < s.length; t++) {
              i.off(s[t], a);
            }
          }var t,
              s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
              i = this;if (e) for (t = 0; t < s.length; t++) {
            i.on(s[t], a);
          }return this;
        }), "transform" in r.fn || (r.fn.transform = function (e) {
          for (var a = 0; a < this.length; a++) {
            var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
          }return this;
        }), "transition" in r.fn || (r.fn.transition = function (e) {
          "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
            var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
          }return this;
        }), "outerWidth" in r.fn || (r.fn.outerWidth = function (e) {
          return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
        })), window.Swiper = a;
      }(), true ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";

        return window.Swiper;
      });
      //# sourceMappingURL=maps/swiper.min.js.map

      /***/
    },
    /* 83 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, "\n.haha-swiper-item[data-v-6f827ec6] {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  width: 100%;\n}\n", ""]);

      // exports


      /***/
    },
    /* 84 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, ".haha-scroller-spin[data-v-1821e56d]{-webkit-animation:roll 1s linear infinite;animation:roll 1s linear infinite}@-webkit-keyframes roll{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes roll{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}", ""]);

      // exports


      /***/
    },
    /* 85 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, ".circular[data-v-4c441e79]{width:42px;height:42px;-webkit-animation:loading-rotate 2s linear infinite;animation:loading-rotate 2s linear infinite}.path[data-v-4c441e79]{-webkit-animation:loading-dash 1.5s ease-in-out infinite;animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90,150;stroke-dashoffset:0;stroke-width:2;stroke:#20a0ff;stroke-linecap:round}@-webkit-keyframes loading-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}docs.bbc11ec.css:\\1 50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}docs.bbc11ec.css:\\1 to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}@keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}docs.bbc11ec.css:\\1 50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}docs.bbc11ec.css:\\1 to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}", ""]);

      // exports


      /***/
    },
    /* 86 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, ".slide-enter-active[data-v-501a2267],.slide-leave-active[data-v-501a2267]{-webkit-transition:all .5s;transition:all .5s}.slide-enter[data-v-501a2267],.slide-leave-active[data-v-501a2267]{opacity:0}", ""]);

      // exports


      /***/
    },
    /* 87 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, ".fade-enter-active[data-v-69f6f1ce],.fade-leave-active[data-v-69f6f1ce]{-webkit-transition:all .5s;transition:all .5s}.fade-enter[data-v-69f6f1ce],.fade-leave-active[data-v-69f6f1ce]{opacity:0}", ""]);

      // exports


      /***/
    },
    /* 88 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, ".fade-enter-active[data-v-74fc3059],.fade-leave-active[data-v-74fc3059]{-webkit-transition:all .5s;transition:all .5s}.fade-enter[data-v-74fc3059],.fade-leave-active[data-v-74fc3059]{opacity:0}", ""]);

      // exports


      /***/
    },
    /* 89 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(undefined);
      // imports


      // module
      exports.push([module.i, ".slide-enter-active[data-v-890d548e],.slide-leave-active[data-v-890d548e]{-webkit-transition:all .5s;transition:all .5s}.slide-enter[data-v-890d548e],.slide-leave-active[data-v-890d548e]{-webkit-transform:translateY(50px);transform:translateY(50px);opacity:0}", ""]);

      // exports


      /***/
    },
    /* 90 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = function (element) {
        var rect = element.getBoundingClientRect();

        if (rect.width || rect.height) {
          var doc = element.ownerDocument;
          var docElem = doc.documentElement;

          return {
            top: rect.top + window.pageYOffset - docElem.clientTop,
            left: rect.left + window.pageXOffset - docElem.clientLeft
          };
        }
      };

      /***/
    },
    /* 91 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 92 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 93 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 94 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 95 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 96 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 97 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 98 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 99 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 100 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 101 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 102 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 103 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 104 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 105 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 106 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 107 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 108 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 109 */
    /***/function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/},
    /* 110 */
    /***/function (module, exports, __webpack_require__) {

      function injectStyle(ssrContext) {
        __webpack_require__(136);
      }
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(80),
      /* template */
      __webpack_require__(116),
      /* styles */
      injectStyle,
      /* scopeId */
      "data-v-1821e56d",
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;

      /***/
    },
    /* 111 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            class: _vm.slideClass
          }, [_vm._t("default")], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 112 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-rate-wrap"
          }, _vm._l(_vm.count, function (item) {
            return _c('i', {
              staticClass: "haha-rate-item"
            });
          }));
        }, staticRenderFns: [] };

      /***/
    },
    /* 113 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-tabs-container",
            on: {
              "touchstart": _vm.startDrag,
              "mousedown": _vm.startDrag,
              "touchmove": _vm.onDrag,
              "mousemove": _vm.onDrag,
              "touchend": _vm.endDrag,
              "mouseleave": _vm.endDrag
            }
          }, [_c('div', {
            ref: "wrap",
            staticClass: "haha-tabs-wrap"
          }, [_vm._t("default")], 2)]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 114 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "top-title"
          }, [_vm._l(_vm.title.split(""), function (name, index) {
            return _c('span', [_vm._v(_vm._s(name) + "\n\t"), index !== _vm.title.length - 1 ? _c('span', {
              staticClass: "top-title-line"
            }, [_vm._v("/")]) : _vm._e()]);
          }), _vm._v(" "), _vm.showMore ? _c('a', {
            staticClass: "top-title-more",
            attrs: {
              "href": _vm.moreLink
            }
          }, [_vm._v("更多 "), _c('span', {
            staticClass: "more-icon"
          }, [_vm._v(">")])]) : _vm._e()], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 115 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "swiper-container"
          }, [_vm._t("parallax-bg"), _vm._v(" "), _c('div', {
            class: _vm.defaultSwiperClasses.wrapperClass
          }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("pagination"), _vm._v(" "), _vm._t("button-prev"), _vm._v(" "), _vm._t("button-next"), _vm._v(" "), _vm._t("scrollbar")], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 116 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('svg', {
            staticClass: "haha-scroller-spin",
            attrs: {
              "viewBox": "0 0 1024 1024",
              "width": "32",
              "height": "32"
            }
          }, [_c('path', {
            attrs: {
              "d": "M476.16 102.4l71.68 0 0 204.8-71.68 0 0-204.8Z",
              "fill": "#E9E9E9"
            }
          }), _c('path', {
            attrs: {
              "d": "M685.760604 139.359897l62.076701 35.84-102.4 177.362002-62.076701-35.84 102.4-177.362002Z",
              "fill": "#989697"
            }
          }), _c('path', {
            attrs: {
              "d": "M848.800103 276.168408l35.84 62.076701-177.362002 102.4-35.84-62.076701 177.362002-102.4Z",
              "fill": "#9B999A"
            }
          }), _c('path', {
            attrs: {
              "d": "M921.6 476.16l0 71.68-204.8 0 0-71.68 204.8 0Z",
              "fill": "#A3A1A2"
            }
          }), _c('path', {
            attrs: {
              "d": "M884.640103 685.763902l-35.84 62.076701-177.362002-102.4 35.84-62.076701 177.362002 102.4Z",
              "fill": "#ABA9AA"
            }
          }), _c('path', {
            attrs: {
              "d": "M747.852913 848.800103l-62.076701 35.84-102.4-177.362002 62.076701-35.84 102.4 177.362002Z",
              "fill": "#B2B2B2"
            }
          }), _c('path', {
            attrs: {
              "d": "M547.84 921.6l-71.68 0 0-204.8 71.68 0 0 204.8Z",
              "fill": "#BAB8B9"
            }
          }), _c('path', {
            attrs: {
              "d": "M338.223788 884.640103l-62.076701-35.84 102.4-177.362002 62.076701 35.84-102.4 177.362002Z",
              "fill": "#C2C0C1"
            }
          }), _c('path', {
            attrs: {
              "d": "M175.199897 747.840603l-35.84-62.076701 177.362002-102.4 35.84 62.076701-177.362002 102.4Z",
              "fill": "#CBCBCB"
            }
          }), _c('path', {
            attrs: {
              "d": "M102.4 547.84l0-71.68 204.8 0 0 71.68-204.8 0Z",
              "fill": "#D2D2D2"
            }
          }), _c('path', {
            attrs: {
              "d": "M139.359897 338.245109l35.84-62.076701 177.362002 102.4-35.84 62.076701-177.362002-102.4Z",
              "fill": "#DADADA"
            }
          }), _c('path', {
            attrs: {
              "d": "M276.162695 175.199897l62.076701-35.84 102.4 177.362002-62.076701 35.84-102.4-177.362002Z",
              "fill": "#E2E2E2"
            }
          })]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 117 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-components-concern",
            style: {
              'border-color': _vm.color,
              color: _vm.color
            },
            on: {
              "click": function click($event) {
                _vm.$emit("concern");
              }
            }
          }, [!_vm.selected ? _c('svg', {
            staticClass: "hcc-icon",
            attrs: {
              "viewBox": "0 0 1024 1024",
              "width": "0.8rem",
              "height": "0.8rem"
            }
          }, [_c('path', {
            attrs: {
              "d": "M568.479339 456.002638 568.479339 59.983139 455.915657 59.983139 455.915657 456.002638 59.896158 456.002638 59.896158 568.56632 455.915657 568.56632 455.915657 964.585819 568.479339 964.585819 568.479339 568.56632 964.498838 568.56632 964.498838 456.002638Z",
              "fill": "#f95c25"
            }
          })]) : _vm._e(), _vm._v(" "), _c('span', {
            staticClass: "hcc-text"
          }, [_vm._v(_vm._s(_vm.selected ? '已关注' : '关注'))])]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 118 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-swiper-container",
            on: {
              "touchstart": _vm.startDrag,
              "mousedown": _vm.startDrag,
              "touchmove": _vm.onDrag,
              "mousemove": _vm.onDrag,
              "touchend": _vm.endDrag,
              "mouseleave": _vm.endDrag
            }
          }, [_c('div', {
            ref: "wrap",
            staticClass: "haha-swiper-wrap",
            style: {
              transform: "translate3d(" + -(_vm.currentActive - 1) * _vm.pageWidth + "px,0,0)"
            }
          }, [_vm._t("default")], 2), _vm._v(" "), _vm.pagination ? _c('div', {
            staticClass: "haha-swiper-pagination"
          }, _vm._l(_vm.childrenNum, function (num) {
            return _c('div', {
              staticClass: "haha-swiper-pagination-item",
              class: {
                active: _vm.currentActive === num
              }
            });
          })) : _vm._e()]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 119 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('dl', {
            style: {
              backgroundColor: _vm.background
            },
            attrs: {
              "id": "my_bottom_menu"
            }
          }, _vm._l(_vm.list, function (item, index) {
            return _c('dd', {
              on: {
                "click": function click($event) {
                  _vm.toOther(item.to, _vm.type === item.type || +_vm.type === index + 1);
                }
              }
            }, [_c('i', {
              class: item.type
            }), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.name))])]);
          }));
        }, staticRenderFns: [] };

      /***/
    },
    /* 120 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-tabbar-item",
            class: {
              active: _vm.$parent.currentActive === _vm.index
            },
            on: {
              "click": _vm.changeTab
            }
          }, [_vm._t("default")], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 121 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-badge"
          }, [_vm._t("default", [_vm._v("暂无")])], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 122 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "mint-loadmore"
          }, [_c('div', {
            staticClass: "mint-loadmore-content",
            class: {
              'is-dropped': _vm.topDropped || _vm.bottomDropped
            },
            style: {
              'transform': 'translate3d(0, ' + _vm.translate + 'px, 0)'
            }
          }, [_vm._t("top", [_vm.topMethod ? _c('div', {
            staticClass: "mint-loadmore-top"
          }, [_vm.topStatus === 'loading' ? _c('svg', {
            staticClass: "circular",
            attrs: {
              "viewBox": "25 25 50 50"
            }
          }, [_c('circle', {
            staticClass: "path",
            attrs: {
              "cx": "50",
              "cy": "50",
              "r": "20",
              "fill": "#fff"
            }
          })]) : _vm._e(), _vm._v(" "), _c('span', {
            staticClass: "mint-loadmore-text"
          }, [_vm._v(_vm._s(_vm.topText))])]) : _vm._e()]), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm._t("bottom", [_vm.bottomMethod ? _c('div', {
            staticClass: "mint-loadmore-bottom"
          }, [_vm.bottomStatus === 'loading' ? _c('svg', {
            staticClass: "circular",
            attrs: {
              "viewBox": "25 25 50 50"
            }
          }, [_c('circle', {
            staticClass: "path",
            attrs: {
              "cx": "50",
              "cy": "50",
              "r": "20",
              "fill": "#fff"
            }
          })]) : _vm._e(), _vm._v(" "), _c('span', {
            staticClass: "mint-loadmore-text"
          }, [_vm._v(_vm._s(_vm.bottomText))])]) : _vm._e()])], 2)]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 123 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', [_c('div', {
            on: {
              "click": function click($event) {
                _vm.show = !_vm.show;
              }
            }
          }, [_vm._t("header")], 2), _vm._v(" "), _c('transition', {
            attrs: {
              "name": "slide"
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.show,
              expression: "show"
            }]
          }, [_vm._t("content")], 2)])], 1);
        }, staticRenderFns: [] };

      /***/
    },
    /* 124 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('a', {
            attrs: {
              "href": _vm.data.link || ""
            }
          }, [_c('div', {
            staticClass: "haha-card-wrap"
          }, [_c('img', {
            staticClass: "haha-card-img",
            attrs: {
              "src": _vm.data.cover_750x300 || ''
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "haha-card-content"
          }, [_c('span', [_vm._v(_vm._s(_vm.courseTime(_vm.data.start_time)))]), _vm._v(" "), _c('span', {
            staticClass: "haha-card-baoming"
          }, [_vm._v(_vm._s(_vm.data.category || "暂无") + " ")])])])]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 125 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('transition', {
            attrs: {
              "name": "fade"
            }
          }, [_vm.showModal ? _c('div', {
            staticClass: "haha-modal-wrap"
          }, [_c('div', {
            staticClass: "haha-modal-overlay",
            style: _vm.overlayStyle,
            on: {
              "click": this.overlayClick
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "haha-modal",
            style: _vm.modalStyle
          }, [_vm._t("default", [_c('div', {
            staticStyle: {
              "text-align": "center",
              "padding": "20px 10px"
            }
          }, [_c('svg', {
            staticClass: "icon",
            staticStyle: {
              "margin": "15px 0"
            },
            attrs: {
              "viewBox": "0 0 1024 1024",
              "width": "3rem",
              "height": "3rem"
            }
          }, [_c('path', {
            attrs: {
              "d": "M516.461 20.457c-274.346 0-496.742 222.394-496.742 496.742s222.394 496.742 496.742 496.742 496.742-222.394 496.742-496.742-222.394-496.742-496.742-496.742zM516.461 964.278c-246.527 0-447.079-200.547-447.079-447.079s200.547-447.079 447.079-447.079 447.079 200.547 447.079 447.079-200.547 447.079-447.079 447.079z",
              "fill": "#ff5600"
            }
          }), _c('path', {
            attrs: {
              "d": "M741.978 291.67c-12.099-12.117-31.79-12.117-43.905 0l-181.633 181.633-181.633-181.633c-12.102-12.117-31.795-12.117-43.905 0-12.117 12.102-12.117 31.79 0 43.905l181.633 181.633-181.633 181.633c-12.117 12.102-12.117 31.79 0 43.905 6.032 6.061 13.984 9.073 21.942 9.073 7.926 0 15.886-3.03 21.942-9.073l181.633-181.633 181.633 181.633c6.061 6.061 14.002 9.073 21.942 9.073s15.886-3.03 21.942-9.073c12.117-12.102 12.117-31.79 0-43.905l-181.669-181.633 181.633-181.633c12.117-12.102 12.117-31.79 0-43.905z",
              "fill": "#ff5600"
            }
          })]), _vm._v(" "), _c('div', {
            staticClass: "error-text"
          }, [_vm._v(_vm._s(_vm.msg))])])])], 2), _vm._v(" "), (_vm.showCloseBtn === undefined ? true : _vm.showCloseBtn) ? _c('img', {
            staticClass: "haha-modal-close-btn",
            attrs: {
              "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA450kA+8VNrHz+/goCnPaZiCVW8maEeu/LKVTMQaOa7dvPxmqxKddQ8uEykX+X2rqAAAD5klEQVRo3qzU626iUBSG4W8DG9ggyFkR8ay1tt/9397E6SRMAy0u5flHArx7rQTwKPe63/jFXBvS6Hnhb/ZXF1OytyvFAWq1tTGJ2W1Okvpcxo1nVxHaKq29Ji7PmiTntxleVG0LkmYXrx30OOt4Z0gW2+qVIcqQNNbVwY+cq2XIsHx2HHsVkLs8wogo35HByoacmwUMrdmDI1shg8yFUKIZWCkelloBdQKJdEku1xBZ358RHCvXXLxBLF9Q53hMW5K+iye4Plm2eMDxg2GCJyUhP44YVSsqD0/zFFU9epNmccQLjgX1yCEPhn6El0Q+zeHXOQwvLV7UXmh+maXWPDl4mXOhrvGDo6LfYgKOT3XEoLZgEWESUcGixZCSysVEXEULA3KGHibjhczRk2puMaGEuv+3XNLHpHwu++GFi0m5Cyb4plrwDRN7o67wv4xLTG7JDOjYQbBGn5dXeEyVe+ipg8BGZ0ULfQ2pbDzCVmSDHour7mIWhCn6Tuwqow2e0JOGwQzdt15iwJ5dZbTBPToDL3ZDzjDAsbrKaMPCgBlDF19i7oDxirwB7Bjjy5wNBBVBAw3n+GvNRQtBRdCAs+AadzdmgKAiaAAZb/+2dYCgImrg8LUvm9qBtDLe6PZlA9jyBAgqogZw4hbAhQkEFWEDCS8AFGsIKsIGairApXEgqAgbcAxdXHkGBBVhAzjzE3tmEFTEDWTcY8MYkoq0gZgb+GwgqggbaOjjnR5kFVkDHt+hmEJW+RQ1kFJBs4KsEogaqKhhGEFWkTUQ0YCEgHPi3QkCpDBiK94pWxYxjGQNaSWigWYlbMxllYoairasYf2p1o5WG4TBKAC7mBiFGkGH0rrJ1ovJLv73f70xEM6NNTkaUvsA5YOK5s/5j1aUkssbXsZQA29l+MtYykgaUII/K5M4zmAVJxM+9YRBKa1849BiDChBhxaOX8qAEnL8YpDgDCj+QQIjEWtA8Y9EGO78Bq1guMtl0IRBKBhTMXDTBhTvwJ1N0hIGpeDq8CGDJgxK0YNYXOcIg1FGaXAxJQxK+RLnuWLD4BVcsbfDgh5GkFKshgWe2GOGEaTMq7GHJ8CxMIIU+yjAQRR1XYk+Sxc8j7myW4uiLqlDtaw38ePBTkyfIuhMGtkifAYcK3xOEKOvPmQVeSGQYLXx+/mUJQ3WTT86gnETc91cnN10BKOyz1wBYplZHDGKdzH2DGvZNAvmLKvVkVW5qomlf7dv6T+fq76wu4hxxkrJ/y+5cszlSM3HqPtWzeeuzM6aD/4014hIVT4qLJWViDTu8Dlkp6V61S7Vq6zuczu6dqleTfZVSmQR6nB/HKye8nVLWgoAAAAASUVORK5CYII="
            },
            on: {
              "click": this.innerClose
            }
          }) : _vm._e()]) : _vm._e()]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 126 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.$parent.swiping || _vm.$parent.currentActive === _vm.id,
              expression: "$parent.swiping || $parent.currentActive === id"
            }],
            staticClass: "haha-tabs-item"
          }, [_vm._t("default")], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 127 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-mm-toolbar"
          }, [_c('div', {
            staticClass: "haha-mm-toolbar-btn",
            style: {
              background: _vm.background
            },
            on: {
              "click": function click($event) {
                _vm.$emit("buyClick");
              }
            }
          }, [_vm._v(_vm._s(_vm.text || '暂无'))])]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 128 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-countdown",
            class: {
              active: _vm.closedown === 0
            },
            on: {
              "click": _vm.countdown
            }
          }, [_vm._v("\n\t" + _vm._s(_vm.context) + "\n\t"), _vm._t("default")], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 129 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-swiper-item"
          }, [_vm._t("default")], 2);
        }, staticRenderFns: [] };

      /***/
    },
    /* 130 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('transition', {
            attrs: {
              "name": "fade"
            }
          }, [_vm.visible ? _c('div', {
            staticClass: "haha-toast"
          }, [_vm._v("\n\t\t" + _vm._s(_vm.message) + "\n\t")]) : _vm._e()]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 131 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('transition', {
            attrs: {
              "name": "slide"
            }
          }, [_vm.show ? _c('div', {
            staticClass: "haha-backToTop",
            on: {
              "click": _vm.scrollTop
            }
          }) : _vm._e()]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 132 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {}, [_c('div', {
            ref: "haha_tabbar",
            staticClass: "haha-tabbar-container",
            class: {
              active: _vm.fixed
            },
            style: {
              top: _vm.fixed ? _vm.topOffset + "px" : "auto"
            }
          }, [_c('div', {
            ref: "wrap",
            staticClass: "haha-tabbar-wrap"
          }, [_vm._t("default")], 2)]), _vm._v(" "), _vm.fixed ? _c('div', {
            staticClass: "haha-tabbar-container",
            style: {
              height: _vm.wrapHeight
            }
          }) : _vm._e()]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 133 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-people-container"
          }, [_c('img', {
            staticClass: "hpc-headimg",
            attrs: {
              "src": _vm.headimg || ''
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "hpc-right-content"
          }, [_c('div', {
            staticClass: "hpc-name"
          }, [_vm._v("\n\t\t\t" + _vm._s(_vm.personName || '暂无') + "\n\t\t")]), _vm._v(" "), _c('div', {
            staticClass: "hpc-intro"
          }, [_vm._v("\n\t\t\t" + _vm._s(_vm.personIntro || '暂无') + "\n\t\t")])])]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 134 */
    /***/function (module, exports) {

      module.exports = { render: function render() {
          var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "haha-scroller-wrap",
            staticStyle: {
              "background": "#eee"
            }
          }, [_c('div', {
            staticClass: "haha-scroller-content",
            class: {
              'haha-scroller-transition': false
            },
            on: {
              "mousedown": _vm.mousedown,
              "mouseup": _vm.mouseup,
              "mousemove": _vm.mousemove,
              "touchstart": _vm.touchstart,
              "touchmove": _vm.touchmove,
              "touchend": _vm.touchend
            }
          }, [_vm._events.onRefresh && _vm.showRefresh ? _c('div', {
            staticClass: "haha-scroller-spin-top"
          }, [_c('loading')], 1) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm._events.onInfinite ? _c('div', {
            staticClass: "haha-scroller-spin-bottom"
          }, [_c('loading')], 1) : _vm._e()], 2)]);
        }, staticRenderFns: [] };

      /***/
    },
    /* 135 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(83);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("834fd3e2", content, true);

      /***/
    },
    /* 136 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(84);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("3e066c7f", content, true);

      /***/
    },
    /* 137 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(85);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("52ae635d", content, true);

      /***/
    },
    /* 138 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(86);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("7aea7046", content, true);

      /***/
    },
    /* 139 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(87);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("b462f0b6", content, true);

      /***/
    },
    /* 140 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(88);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("3a9b2330", content, true);

      /***/
    },
    /* 141 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(89);
      if (typeof content === 'string') content = [[module.i, content, '']];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var update = __webpack_require__(2)("8cb6b67a", content, true);

      /***/
    },,,,
    /* 142 */
    /* 143 */
    /* 144 */
    /* 145 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_title__ = __webpack_require__(18);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__menu__ = __webpack_require__(24);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__cm_swiper__ = __webpack_require__(6);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__cm_responsive__ = __webpack_require__(13);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__cm_tabs_container__ = __webpack_require__(16);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__cm_tabs_item__ = __webpack_require__(17);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__cm_badge__ = __webpack_require__(9);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__cm_tabbar__ = __webpack_require__(14);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__cm_tabbar_item__ = __webpack_require__(15);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_9__mm_person__ = __webpack_require__(28);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_10__mm_concern__ = __webpack_require__(26);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_11__mm_card__ = __webpack_require__(25);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_12__mm_toolbar__ = __webpack_require__(29);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_13__cm_modal__ = __webpack_require__(11);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_14__cm_rate__ = __webpack_require__(12);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_15__mm_countdown__ = __webpack_require__(27);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_16__cm_dropdown__ = __webpack_require__(10);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_17__haha_swiper__ = __webpack_require__(20);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_18__cm_toast__ = __webpack_require__(19);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_19__cm_backtop__ = __webpack_require__(8);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_20__infinite_load__ = __webpack_require__(21);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_21__loadmore__ = __webpack_require__(23);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_22__scroller__ = __webpack_require__(30);

      // 响应式组件不需要注册成vue组件，只需要执行一次

      // 轮播组件


      // tab头部组件


      // 人物介绍


      // 课程详情页的底部工具条

      // 模态框组件

      // 评分组件

      // 发送验证码的倒计时组件

      // 下拉列表组件

      // 轮播组件2.0

      // Toast组件

      // 返回顶部组件

      // import cm_infiniteload from './cm_infiniteload'

      // 下拉上拉刷新组件

      // 平滑滚动下拉上拉刷新组件


      var install = function install(Vue) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_title__["default"].name, __WEBPACK_IMPORTED_MODULE_0__cm_title__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_1__menu__["default"].name, __WEBPACK_IMPORTED_MODULE_1__menu__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_2__cm_swiper__["SwiperComponent"].name, __WEBPACK_IMPORTED_MODULE_2__cm_swiper__["SwiperComponent"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_2__cm_swiper__["SlideComponent"].name, __WEBPACK_IMPORTED_MODULE_2__cm_swiper__["SlideComponent"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_4__cm_tabs_container__["default"].name, __WEBPACK_IMPORTED_MODULE_4__cm_tabs_container__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_5__cm_tabs_item__["default"].name, __WEBPACK_IMPORTED_MODULE_5__cm_tabs_item__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_6__cm_badge__["default"].name, __WEBPACK_IMPORTED_MODULE_6__cm_badge__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_9__mm_person__["default"].name, __WEBPACK_IMPORTED_MODULE_9__mm_person__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_10__mm_concern__["default"].name, __WEBPACK_IMPORTED_MODULE_10__mm_concern__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_11__mm_card__["default"].name, __WEBPACK_IMPORTED_MODULE_11__mm_card__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_7__cm_tabbar__["default"].name, __WEBPACK_IMPORTED_MODULE_7__cm_tabbar__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_8__cm_tabbar_item__["default"].name, __WEBPACK_IMPORTED_MODULE_8__cm_tabbar_item__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_12__mm_toolbar__["default"].name, __WEBPACK_IMPORTED_MODULE_12__mm_toolbar__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_13__cm_modal__["default"].name, __WEBPACK_IMPORTED_MODULE_13__cm_modal__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_14__cm_rate__["default"].name, __WEBPACK_IMPORTED_MODULE_14__cm_rate__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_15__mm_countdown__["default"].name, __WEBPACK_IMPORTED_MODULE_15__mm_countdown__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_16__cm_dropdown__["default"].name, __WEBPACK_IMPORTED_MODULE_16__cm_dropdown__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_17__haha_swiper__["HahaSwiper"].name, __WEBPACK_IMPORTED_MODULE_17__haha_swiper__["HahaSwiper"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_17__haha_swiper__["HahaSwiperItem"].name, __WEBPACK_IMPORTED_MODULE_17__haha_swiper__["HahaSwiperItem"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_19__cm_backtop__["default"].name, __WEBPACK_IMPORTED_MODULE_19__cm_backtop__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_21__loadmore__["default"].name, __WEBPACK_IMPORTED_MODULE_21__loadmore__["default"]);
        Vue.component(__WEBPACK_IMPORTED_MODULE_22__scroller__["default"].name, __WEBPACK_IMPORTED_MODULE_22__scroller__["default"]);
        // Vue.use(cm_infiniteload)
        Vue.use(__WEBPACK_IMPORTED_MODULE_20__infinite_load__["default"]);

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__cm_responsive__["default"])();

        // Vue.prototype.$toast = Toast;
      };

      /* harmony default export */__webpack_exports__["default"] = install;

      /***/
    }])
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(17),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_style_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__App_vue__);





// 全局可引用

__WEBPACK_IMPORTED_MODULE_2_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1__lib___default.a);

// import { cm_title,menu,cm_swiper,cm_responsive } from '..'
// Vue.use(cm_title)
// Vue.use(cm_responsive)
// Vue.use(menu)
// Vue.use(cm_swiper)

new __WEBPACK_IMPORTED_MODULE_2_vue__["default"]({
	el: '#app',
	data: function data() {
		return {};
	},

	template: '<App/>',
	components: { App: __WEBPACK_IMPORTED_MODULE_3__App_vue___default.a },
	created: function created() {}
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory(__webpack_require__(0));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["Component"] = factory(require("vue"));else root["Component"] = factory(root["Vue"]);
})(this, function (__WEBPACK_EXTERNAL_MODULE_5__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
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
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "/";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 19);
      /******/
    }(
    /************************************************************************/
    /******/{

      /***/0:
      /***/function _(module, exports) {

        /* globals __VUE_SSR_CONTEXT__ */

        // this module is a runtime utility for cleaner component module output and will
        // be included in the final webpack user bundle

        module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, injectStyles, scopeId, moduleIdentifier /* server only */
        ) {
          var esModule;
          var scriptExports = rawScriptExports = rawScriptExports || {};

          // ES6 modules interop
          var type = _typeof(rawScriptExports.default);
          if (type === 'object' || type === 'function') {
            esModule = rawScriptExports;
            scriptExports = rawScriptExports.default;
          }

          // Vue.extend constructor export interop
          var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports;

          // render functions
          if (compiledTemplate) {
            options.render = compiledTemplate.render;
            options.staticRenderFns = compiledTemplate.staticRenderFns;
          }

          // scopedId
          if (scopeId) {
            options._scopeId = scopeId;
          }

          var hook;
          if (moduleIdentifier) {
            // server build
            hook = function hook(context) {
              // 2.3 injection
              context = context || // cached call
              this.$vnode && this.$vnode.ssrContext || // stateful
              this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (injectStyles) {
                injectStyles.call(this, context);
              }
              // register component module identifier for async chunk inferrence
              if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
              }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
          } else if (injectStyles) {
            hook = injectStyles;
          }

          if (hook) {
            var functional = options.functional;
            var existing = functional ? options.render : options.beforeCreate;
            if (!functional) {
              // inject component registration as beforeCreate hook
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            } else {
              // register for functioal component in vue file
              options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return existing(h, context);
              };
            }
          }

          return {
            esModule: esModule,
            exports: scriptExports,
            options: options
          };
        };

        /***/
      },

      /***/1:
      /***/function _(module, exports) {

        /*
        	MIT License http://www.opensource.org/licenses/mit-license.php
        	Author Tobias Koppers @sokra
        */
        // css base code, injected by the css-loader
        module.exports = function (useSourceMap) {
          var list = [];

          // return the list of modules as css string
          list.toString = function toString() {
            return this.map(function (item) {
              var content = cssWithMappingToString(item, useSourceMap);
              if (item[2]) {
                return "@media " + item[2] + "{" + content + "}";
              } else {
                return content;
              }
            }).join("");
          };

          // import a list of modules into the list
          list.i = function (modules, mediaQuery) {
            if (typeof modules === "string") modules = [[null, modules, ""]];
            var alreadyImportedModules = {};
            for (var i = 0; i < this.length; i++) {
              var id = this[i][0];
              if (typeof id === "number") alreadyImportedModules[id] = true;
            }
            for (i = 0; i < modules.length; i++) {
              var item = modules[i];
              // skip already imported module
              // this implementation is not 100% perfect for weird media query combinations
              //  when a module is imported multiple times with different media queries.
              //  I hope this will never occur (Hey this way we have smaller bundles)
              if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                if (mediaQuery && !item[2]) {
                  item[2] = mediaQuery;
                } else if (mediaQuery) {
                  item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                }
                list.push(item);
              }
            }
          };
          return list;
        };

        function cssWithMappingToString(item, useSourceMap) {
          var content = item[1] || '';
          var cssMapping = item[3];
          if (!cssMapping) {
            return content;
          }

          if (useSourceMap && typeof btoa === 'function') {
            var sourceMapping = toComment(cssMapping);
            var sourceURLs = cssMapping.sources.map(function (source) {
              return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
            });

            return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
          }

          return [content].join('\n');
        }

        // Adapted from convert-source-map (MIT)
        function toComment(sourceMap) {
          // eslint-disable-next-line no-undef
          var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
          var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

          return '/*# ' + data + ' */';
        }

        /***/
      },

      /***/102:
      /***/function _(module, exports) {

        // removed by extract-text-webpack-plugin

        /***/},

      /***/130:
      /***/function _(module, exports) {

        module.exports = { render: function render() {
            var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
            return _c('transition', {
              attrs: {
                "name": "fade"
              }
            }, [_vm.visible ? _c('div', {
              staticClass: "haha-toast"
            }, [_vm._v("\n\t\t" + _vm._s(_vm.message) + "\n\t")]) : _vm._e()]);
          }, staticRenderFns: [] };

        /***/
      },

      /***/140:
      /***/function _(module, exports, __webpack_require__) {

        // style-loader: Adds some css to the DOM by adding a <style> tag

        // load the styles
        var content = __webpack_require__(88);
        if (typeof content === 'string') content = [[module.i, content, '']];
        if (content.locals) module.exports = content.locals;
        // add the styles to the DOM
        var update = __webpack_require__(2)("3a9b2330", content, true);

        /***/
      },

      /***/19:
      /***/function _(module, __webpack_exports__, __webpack_require__) {

        "use strict";

        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
        /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
        /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__cm_toast_vue__ = __webpack_require__(47);
        /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__cm_toast_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__cm_toast_vue__);

        var ToastConstructor = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__cm_toast_vue___default.a);
        var ToastFunction = function ToastFunction() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (typeof options === 'string') {
            options = {
              data: {
                message: options
              }
            };
          } else {
            options = {
              data: options
            };
          }
          var instance = new ToastConstructor(options);
          instance.vm = instance.$mount();
          document.body.appendChild(instance.vm.$el);
          instance.vm.visible = true;
          return instance.vm;
        };

        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$toast = ToastFunction;

        /* harmony default export */__webpack_exports__["default"] = ToastFunction;

        /***/
      },

      /***/2:
      /***/function _(module, exports, __webpack_require__) {

        /*
          MIT License http://www.opensource.org/licenses/mit-license.php
          Author Tobias Koppers @sokra
          Modified by Evan You @yyx990803
        */

        var hasDocument = typeof document !== 'undefined';

        if (typeof DEBUG !== 'undefined' && DEBUG) {
          if (!hasDocument) {
            throw new Error('vue-style-loader cannot be used in a non-browser environment. ' + "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
          }
        }

        var listToStyles = __webpack_require__(3);

        /*
        type StyleObject = {
          id: number;
          parts: Array<StyleObjectPart>
        }
        
        type StyleObjectPart = {
          css: string;
          media: string;
          sourceMap: ?string
        }
        */

        var stylesInDom = {/*
                           [id: number]: {
                           id: number,
                           refs: number,
                           parts: Array<(obj?: StyleObjectPart) => void>
                           }
                           */};

        var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
        var singletonElement = null;
        var singletonCounter = 0;
        var isProduction = false;
        var noop = function noop() {};

        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

        module.exports = function (parentId, list, _isProduction) {
          isProduction = _isProduction;

          var styles = listToStyles(parentId, list);
          addStylesToDom(styles);

          return function update(newList) {
            var mayRemove = [];
            for (var i = 0; i < styles.length; i++) {
              var item = styles[i];
              var domStyle = stylesInDom[item.id];
              domStyle.refs--;
              mayRemove.push(domStyle);
            }
            if (newList) {
              styles = listToStyles(parentId, newList);
              addStylesToDom(styles);
            } else {
              styles = [];
            }
            for (var i = 0; i < mayRemove.length; i++) {
              var domStyle = mayRemove[i];
              if (domStyle.refs === 0) {
                for (var j = 0; j < domStyle.parts.length; j++) {
                  domStyle.parts[j]();
                }
                delete stylesInDom[domStyle.id];
              }
            }
          };
        };

        function addStylesToDom(styles /* Array<StyleObject> */) {
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            if (domStyle) {
              domStyle.refs++;
              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j](item.parts[j]);
              }
              for (; j < item.parts.length; j++) {
                domStyle.parts.push(addStyle(item.parts[j]));
              }
              if (domStyle.parts.length > item.parts.length) {
                domStyle.parts.length = item.parts.length;
              }
            } else {
              var parts = [];
              for (var j = 0; j < item.parts.length; j++) {
                parts.push(addStyle(item.parts[j]));
              }
              stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
            }
          }
        }

        function createStyleElement() {
          var styleElement = document.createElement('style');
          styleElement.type = 'text/css';
          head.appendChild(styleElement);
          return styleElement;
        }

        function addStyle(obj /* StyleObjectPart */) {
          var update, remove;
          var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');

          if (styleElement) {
            if (isProduction) {
              // has SSR styles and in production mode.
              // simply do nothing.
              return noop;
            } else {
              // has SSR styles but in dev mode.
              // for some reason Chrome can't handle source map in server-rendered
              // style tags - source maps in <style> only works if the style tag is
              // created and inserted dynamically. So we remove the server rendered
              // styles and inject new ones.
              styleElement.parentNode.removeChild(styleElement);
            }
          }

          if (isOldIE) {
            // use singleton mode for IE9.
            var styleIndex = singletonCounter++;
            styleElement = singletonElement || (singletonElement = createStyleElement());
            update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
            remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
          } else {
            // use multi-style-tag mode in all other cases
            styleElement = createStyleElement();
            update = applyToTag.bind(null, styleElement);
            remove = function remove() {
              styleElement.parentNode.removeChild(styleElement);
            };
          }

          update(obj);

          return function updateStyle(newObj /* StyleObjectPart */) {
            if (newObj) {
              if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                return;
              }
              update(obj = newObj);
            } else {
              remove();
            }
          };
        }

        var replaceText = function () {
          var textStore = [];

          return function (index, replacement) {
            textStore[index] = replacement;
            return textStore.filter(Boolean).join('\n');
          };
        }();

        function applyToSingletonTag(styleElement, index, remove, obj) {
          var css = remove ? '' : obj.css;

          if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = replaceText(index, css);
          } else {
            var cssNode = document.createTextNode(css);
            var childNodes = styleElement.childNodes;
            if (childNodes[index]) styleElement.removeChild(childNodes[index]);
            if (childNodes.length) {
              styleElement.insertBefore(cssNode, childNodes[index]);
            } else {
              styleElement.appendChild(cssNode);
            }
          }
        }

        function applyToTag(styleElement, obj) {
          var css = obj.css;
          var media = obj.media;
          var sourceMap = obj.sourceMap;

          if (media) {
            styleElement.setAttribute('media', media);
          }

          if (sourceMap) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
          }

          if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
          } else {
            while (styleElement.firstChild) {
              styleElement.removeChild(styleElement.firstChild);
            }
            styleElement.appendChild(document.createTextNode(css));
          }
        }

        /***/
      },

      /***/3:
      /***/function _(module, exports) {

        /**
         * Translates the list format produced by css-loader into something
         * easier to manipulate.
         */
        module.exports = function listToStyles(parentId, list) {
          var styles = [];
          var newStyles = {};
          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = item[0];
            var css = item[1];
            var media = item[2];
            var sourceMap = item[3];
            var part = {
              id: parentId + ':' + i,
              css: css,
              media: media,
              sourceMap: sourceMap
            };
            if (!newStyles[id]) {
              styles.push(newStyles[id] = { id: id, parts: [part] });
            } else {
              newStyles[id].parts.push(part);
            }
          }
          return styles;
        };

        /***/
      },

      /***/47:
      /***/function _(module, exports, __webpack_require__) {

        function injectStyle(ssrContext) {
          __webpack_require__(140);
        }
        var Component = __webpack_require__(0)(
        /* script */
        __webpack_require__(70),
        /* template */
        __webpack_require__(130),
        /* styles */
        injectStyle,
        /* scopeId */
        "data-v-74fc3059",
        /* moduleIdentifier (server only) */
        null);

        module.exports = Component.exports;

        /***/
      },

      /***/5:
      /***/function _(module, exports) {

        module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

        /***/
      },

      /***/70:
      /***/function _(module, __webpack_exports__, __webpack_require__) {

        "use strict";

        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_toast_scss__ = __webpack_require__(102);
        /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__cm_toast_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_toast_scss__);
        //
        //
        //
        //
        //
        //
        //
        //


        /* harmony default export */__webpack_exports__["default"] = {
          name: 'cm-toast',
          components: {},
          watch: {
            // visible(newVal){
            // 	if(newVal){
            //
            // 	}
            // }
          },
          data: function data() {
            return {
              visible: false,
              message: '请稍候重试'
            };
          },
          mounted: function mounted() {
            this.startTimer();
          },

          methods: {
            startTimer: function startTimer() {
              var _this = this;

              setTimeout(function () {
                _this.visible = false;
                _this.$el.addEventListener('transitionend', _this.destroyElement);
              }, 3000);
            },
            destroyElement: function destroyElement() {
              this.$el.removeEventListener('transitionend', this.destroyElement);
              this.$destroy(true);
              this.$el.parentNode.removeChild(this.$el);
            }
          }
        };

        /***/
      },

      /***/88:
      /***/function _(module, exports, __webpack_require__) {

        exports = module.exports = __webpack_require__(1)(undefined);
        // imports


        // module
        exports.push([module.i, ".fade-enter-active[data-v-74fc3059],.fade-leave-active[data-v-74fc3059]{-webkit-transition:all .5s;transition:all .5s}.fade-enter[data-v-74fc3059],.fade-leave-active[data-v-74fc3059]{opacity:0}", ""]);

        // exports


        /***/
      }

      /******/ })
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cm_toast_style_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_cm_toast_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_cm_toast_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_cm_toast__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_cm_toast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__lib_cm_toast__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__base_css__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 组件内可用
// import TopTitle from '../dist'



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'app',
    components: {
        // TopTitle
    },
    data: function data() {
        return {
            bnaners: ['http://p3.pstatp.com/large/213a0005a66b2a9e2fc2', 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2', 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2'],
            swiperOption: {
                notNextTick: true,
                loop: true,
                slidesPerView: 1.45,
                centeredSlides: true,
                spaceBetween: -10
            },
            cardData: {
                score: 8.5,
                title: '205起',
                cover_240x140: 'https://cdn.xueyuan.xiaobao100.com/course/592e2a508d6a9f01db85556e/s_240x140.png',
                buy_count: 3478,
                start_time: 1498564922202,
                category: '市场招生'
            },
            chooseTab: '3',
            chooseTab2: 3,
            headimg: 'http://p3.pstatp.com/large/213a0005a66b2a9e2fc2',
            personName: '我是天天团',
            personIntro: '我是格式简介我是格式简我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介我是格式简我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介我是格式简介介介我是格式简介我是格式简介我是格式简介我是格式简介',

            showModal: false,

            // 无线滚动正在加载
            loading: false

        };
    },

    methods: {
        concern: function concern() {
            __WEBPACK_IMPORTED_MODULE_1__lib_cm_toast___default()('sss');
            console.log(111);
        },
        closeModal: function closeModal() {
            console.log(222);
            this.showModal = false;
        },
        go: function go() {
            this.$refs.hahaSwiper.next();
        },
        back: function back() {
            this.$refs.hahaSwiper.prev();
        },
        clickCountDown: function clickCountDown(e) {
            e.stopPropagation();
        },
        loadMore: function loadMore() {
            console.log(11111);
        },
        refresh: function refresh() {
            var _this = this;

            console.log(1111);
            setTimeout(function (_) {
                _this.$refs.scroller.finishRefresh();
            }, 2000);
        },
        infinite: function infinite() {
            var _this2 = this;

            console.log(2222);
            setTimeout(function (_) {
                _this2.$refs.scroller.finishInfinite();
            }, 2000);
        },
        loadBottom: function loadBottom() {
            var _this3 = this;

            console.log(123);
            setTimeout(function (_) {
                _this3.$refs.loadmore.onBottomLoaded();
            }, 2000);
        }
    },
    mounted: function mounted() {
        // 全局引用
        // this.$toast('sss')
        // 局部引用

    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";body,input,textarea{-webkit-tap-highlight-color:transparent}.btn,thead th{white-space:nowrap}.flex-h,.flex-v{-webkit-box-direction:normal}a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;outline:0;font:inherit;vertical-align:baseline;font-style:initial}td,textarea,th{vertical-align:top}b,strong,th{font-weight:700}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{font-size:14px;line-height:1;background-color:#fff;position:static!important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn,body{-webkit-user-select:none}ol,ul{list-style-type:none}img,table,td,th{border:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}input,textarea{-webkit-appearance:none;outline:0}textarea{overflow:auto}button,input{line-height:normal}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}input[disabled]{background:0 0}.flex-h,.flex-v{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.flex-v{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.flex-wrap{-ms-flex-wrap:wrap;flex-wrap:wrap}.ai-start{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.ai-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ai-end{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.ai-baseline{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.ai-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.ac-start{-webkit-box-align:start;-webkit-align-content:flex-start;-ms-flex-align:start;-ms-flex-line-pack:start;align-content:flex-start}.ac-center{-webkit-box-align:center;-webkit-align-content:center;-ms-flex-align:center;-ms-flex-line-pack:center;align-content:center}.ac-end{-webkit-box-align:end;-webkit-align-content:flex-end;-ms-flex-align:end;-ms-flex-line-pack:end;align-content:flex-end}.jc-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jc-end{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.jc-start{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.jc-space-between{-webkit-box-pack:space-between;-ms-flex-pack:space-between;justify-content:space-between}.jc-space-around{-webkit-box-pack:space-around;-ms-flex-pack:space-around;justify-content:space-around}.flex1{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.flex2{-webkit-box-flex:2;-ms-flex-positive:2;flex-grow:2}.flex3{-webkit-box-flex:3;-ms-flex-positive:3;flex-grow:3}.flex4{-webkit-box-flex:4;-ms-flex-positive:4;flex-grow:4}.flex5{-webkit-box-flex:5;-ms-flex-positive:5;flex-grow:5}.flex6{-webkit-box-flex:6;-ms-flex-positive:6;flex-grow:6}.flex7{-webkit-box-flex:7;-ms-flex-positive:7;flex-grow:7}.flex8{-webkit-box-flex:8;-ms-flex-positive:8;flex-grow:8}.flex9{-webkit-box-flex:9;-ms-flex-positive:9;flex-grow:9}.flex10{-webkit-box-flex:10;-ms-flex-positive:10;flex-grow:10}.flex-h>.flex1,.flex-h>.flex10,.flex-h>.flex2,.flex-h>.flex3,.flex-h>.flex4,.flex-h>.flex5,.flex-h>.flex6,.flex-h>.flex7,.flex-h>.flex8,.flex-h>.flex9{width:0}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".haha-toast {\n  padding: 0.8rem 0.5rem;\n  background: #333;\n  border-radius: 5px;\n  color: #fff;\n  position: fixed;\n  bottom: 20%;\n  left: 50%;\n  z-index: 1003;\n  -webkit-transform: translate3d(-50%, 0, 0);\n  transform: translate3d(-50%, 0, 0);\n  font-size: .88rem; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".haha-backToTop {\n  height: 2.81rem;\n  position: fixed;\n  width: 2.81rem;\n  background: url(\"https://cdn.xueyuan.xiaobao100.com/shield/image/topbtn.png\") no-repeat center;\n  background-size: 100%;\n  right: 1rem;\n  bottom: 4.69rem;\n  z-index: 1010; }\n.haha-badge {\n  background: #58cfc5;\n  border-radius: 3px;\n  display: inline;\n  color: #fff;\n  height: 1rem;\n  font-size: 0.75rem;\n  padding: 0.125rem 0.25rem; }\n.haha-modal-wrap .haha-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 998;\n  opacity: 0.7;\n  background: #333; }\n\n.haha-modal-wrap .haha-modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 88%;\n  min-width: 200px;\n  max-width: 800px;\n  border-radius: 5px;\n  color: #333;\n  background: #fff;\n  z-index: 999;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%); }\n  .haha-modal-wrap .haha-modal .error-text {\n    padding: 1rem;\n    font-size: 1.0rem; }\n\n.haha-modal-wrap .haha-modal-close-btn {\n  height: 3.125rem;\n  width: 3.125rem;\n  position: fixed;\n  bottom: 10%;\n  left: 50%;\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  z-index: 1000; }\n.haha-rate-wrap {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n  .haha-rate-wrap .haha-rate-item {\n    display: block;\n    width: 0.625rem;\n    height: 0.625rem;\n    margin-right: 0.3125rem;\n    background-size: 100%;\n    background-repeat: no-repeat;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAlCAMAAAAHvluBAAAAflBMVEUAAADcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDJj0vRAAAAAKXRSTlMACQLmnjL56m5gWg338MzHkIR+VdTQs6t6d3NEEgft2MK8o5ZoTktGGNNKwkMAAAENSURBVDjLnZTploIwDEZTSougCLIoivs2k/d/wZkDYqSly/H+LJecLl8COj+ct+AB44j8AG5m+M/MryAiZ05xhx07lzePejFylWzwxdZR8DiIx7lVLPBNYfP2KYnp3iKu8IPV9OZE2YRn+SnKc9iUgrYqkuKaRWgkyq5FIgBu6MUNFn7iAjZ+4hrY2stjAAePmpsun0Ho8sIAenK7l2svQhhfaIsahrzdpcG7g0I87cWgIqZFAV9XzO1XQ1ymxYsmckMatW5BA7+K2JrEVhtNRJYhoc4WStDyCfBcUnIUcfhSP6DjUQ//jb2gb52qpKWy6pslGIlMIuIpGS0GyQkRJVMOk1bxWyO1TofZ+wclo3X2s7HvBQAAAABJRU5ErkJggg==\"); }\n/**\n * Swiper 3.4.2\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * \n * http://www.idangero.us/swiper/\n * \n * Copyright 2017, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n * \n * Licensed under MIT\n * \n * Released on: March 10, 2017\n */\n.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-box-lines:multiple;-moz-box-lines:multiple;-ms-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-transition-property:-webkit-transform,height;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-wp8-horizontal{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-wp8-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s;transition:.3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-white .swiper-pagination-bullet{background:#fff}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:5px 0;display:block}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}.swiper-pagination-progress{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progress .swiper-pagination-progressbar{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progress{width:100%;height:4px;left:0;top:0}.swiper-container-vertical>.swiper-pagination-progress{width:4px;height:100%;left:0;top:0}.swiper-pagination-progress.swiper-pagination-white{background:rgba(255,255,255,.5)}.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}.swiper-container-3d{-webkit-perspective:1200px;-o-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top, right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-coverflow .swiper-wrapper,.swiper-container-flip .swiper-wrapper{-ms-perspective:1200px}.swiper-container-cube,.swiper-container-flip{overflow:visible}.swiper-container-cube .swiper-slide,.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide,.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active,.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top,.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-slide{visibility:hidden;-webkit-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:\"\";width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.swiper-slide {\n  height: 160px;\n  overflow: hidden;\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n  -webkit-transform: translate(0, -5px) scale(0.8) !important;\n  transform: translate(0, -5px) scale(0.8) !important; }\n\n.swiper-slide-active {\n  -webkit-transform: scale(1) !important;\n  transform: scale(1) !important; }\n\n@supports (font-size: 1vw) {\n  .swiper-slide {\n    height: 42.66667vw; } }\n.haha-tabbar-container {\n  overflow: scroll;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  background: #fff; }\n  .haha-tabbar-container::-webkit-scrollbar {\n    width: 0;\n    height: 0; }\n  .haha-tabbar-container .haha-tabbar-wrap {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  .haha-tabbar-container.active {\n    position: fixed;\n    z-index: 1005; }\n.haha-tabbar-item {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  height: 2.5rem;\n  line-height: 2.5rem;\n  text-align: center;\n  font-size: 0.875rem;\n  color: #666666; }\n  .haha-tabbar-item.active {\n    color: #dc2832;\n    border-bottom: 2px solid #dc2832; }\n.haha-tabs-container {\n  overflow: hidden;\n  position: relative; }\n  .haha-tabs-container .haha-tabs-wrap {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  .haha-tabs-container .haha-swipe-transition {\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s; }\n.haha-tabs-item {\n  width: 100%;\n  -ms-flex-negative: 0;\n  flex-shrink: 0; }\n.top-title{\n\tfont-size: .88rem;\n\tpadding:1.0rem 0 0.625rem;\n\ttext-align:center;\n\tposition:relative;\n}\n.top-title-line{\n\t\tfont-size: 0.75rem;\n\t\tpadding:0 0.3125rem;\n\t}\n.top-title-more{\n\t\tposition:absolute;\n\t\tright: 1.125rem;\n\t\ttop:1rem;\n\t\tfont-size: 0.75rem;\n\t\tcolor: #9494a3;\n\t\ttext-decoration: none;\n\t}\n.more-icon{\n\tmargin-top: -0.6rem;\n    display: inline-block;\n}\n.haha-toast {\n  padding: 0.8rem 0.5rem;\n  background: #333;\n  border-radius: 5px;\n  color: #fff;\n  position: fixed;\n  bottom: 20%;\n  left: 50%;\n  z-index: 1003;\n  -webkit-transform: translate3d(-50%, 0, 0);\n  transform: translate3d(-50%, 0, 0);\n  font-size: .88rem; }\n.haha-swiper-container {\n  overflow: hidden;\n  position: relative; }\n  .haha-swiper-container .haha-swiper-wrap {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  .haha-swiper-container .haha-swipe-transition {\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s; }\n  .haha-swiper-container .haha-swiper-pagination {\n    position: absolute;\n    left: 50%;\n    bottom: 4%;\n    -webkit-transform: translateX(-50%);\n    transform: translateX(-50%); }\n    .haha-swiper-container .haha-swiper-pagination .haha-swiper-pagination-item {\n      background: #000;\n      display: inline-block;\n      width: 0.5rem;\n      height: 0.5rem;\n      opacity: .4;\n      margin: 0 0.25rem;\n      border-radius: 100%;\n      z-index: 1; }\n      .haha-swiper-container .haha-swiper-pagination .haha-swiper-pagination-item.active {\n        background: #fff; }\n#my_bottom_menu {\n  position: fixed;\n  bottom: 0;\n  -webkit-margin-before: 0;\n  -webkit-margin-after: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0 1px 5px 3px #ddd;\n  box-shadow: 0 1px 5px 3px #ddd; }\n  #my_bottom_menu dd {\n    -webkit-margin-start: 0;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    #my_bottom_menu dd i {\n      height: 18px;\n      width: 100%;\n      background-size: contain;\n      background-repeat: no-repeat;\n      background-position: center; }\n      #my_bottom_menu dd i.main {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAkCAMAAADIF1gZAAAAaVBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmaNxYJpAAAAInRSTlMApCLzWrpFFgvo28uMMnAGBOfUxKqdUjoacijrtZZ7aZGKVuEj7wAAAQdJREFUOMu9k9luwyAQRQ1eSewsjrc4W3v+/yMrtbgOGoP9lPuCGA5o5l4RLakso206KlDHLWSREsekxTqZ7zlX1Zl9vkbqHTs9LUFVhn1uHzdViMxsk7blzE8moE7T5qQg8ZEHcAz9husyWcJB3vUYn4iO3DDEFHJOaXy0IBGGdNw9EsZLiTBkQ3IMZ0wpEcZVmCdV/obRC+M9QfZR3nTRBnWNnfty8RDyFEIofBTVZQ31l15Hn1g919AHtH1R9C08wmj3H3cW0wXRmtdUe1GHUM1t/rE3xgCacZ+Ld7IAmqDmoiJZQGMGPzoQv6EN6ehDx5TmDdUGKwe1Ms4PHVrjQ007/O1/AIieHR4uAJuxAAAAAElFTkSuQmCC\"); }\n      #my_bottom_menu dd i.bied {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjBAMAAAAHwBVpAAAAG1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ8aTmeAAAACHRSTlMA8cStGSa3KPjA1osAAAB9SURBVCjPYwCDYImOjkZTBjhgBfKBIgFwAeY2BwYGlgwDuABjC4j0EIALcDRASKoJsBp2KHA0MHVASOEAhkAIE0aKMlikIGtxa2aQcEAWYGlk6EA1tIMoAQQY7AIaHXDQhCFAnqESDsh8lkZQIMMBOJALO1CAOCiikIBwAADgQ02ifnFgjQAAAABJRU5ErkJggg==\"); }\n      #my_bottom_menu dd i.concern {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAdCAMAAAD1qz7PAAAAe1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmY+mZAPAAAAKHRSTlMABAnTQPr25ofvcTAVD+rFv6gkHK+inGFMRuDat5aTUzYqIMuOemhcn9gQUQAAAYNJREFUOMuFUdlywjAMFHZsJ+SGUCAHRyiw//+FlQx40mky3RdH8ma1WtMLV32jP/hy0bQ8JihnSDD7CceiVn9JqxgIrNTiRLNYw7wnqg47WkCMInt/aLVEWlX4knNrcKFFXA2ufHz/Gqaic5RPWSeRUglSoqw/SCcbLABTj1IMvbjYwCo6QHu5QbQdcKtLg0R2umEt3BJnvo7ZXwJu5y2qjbhskGw5PbgVV3fOpwIPitD5NUvuCnrvU/OVcEtyGCW0geVcWHNrrJKfYvmGI4NcLK1f1Qc34T9Ry76wBPCIAQ+iEVUg9TLpjEbyhCGLXITvXF6yQGoll4dPO0NBnZR7Fp7iiIL1dz6DFJoaPCUxaQaMrVznCTb0Erh7TY0ovOm4TnwW+5fHmn9Ivchx9/ETWQB9Lg/SpLKc19McuyCQiuYQKtErSXbQK1qE6vCUo8VjmXR/S5xhr0uci/lstEOXzXM2BeLPXA29neOkDk3wm2m0aobkUE3aeeXyGdLpFHT+xw+iTSAWfqfrcQAAAABJRU5ErkJggg==\"); }\n      #my_bottom_menu dd i, #my_bottom_menu dd i.me {\n        background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAMAAACGE/kZAAAAZlBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmaud1slAAAAIXRSTlMABvnUilVDJwvx32us2nFvUOTEppIrz3xb68apXDwUtC3YEnElAAABDUlEQVQ4y5WS2XLCMAxFLS9x7GxACFBoac///2RLhy1xTIb7ZGuOJVlXaiRxfdTB9E5UVquGq5pVBhELpvUivjVg55NZdCVXvtLYOcahi8et0LiUkTXV871inRY8YEZBMXwmUE07DrTUCRTx44AnJpBGJk2iEyhMoXIGaqblBuJy4x31+yPID3PZlpzBt3POYCVbMJ2XcugMbCWzUPuP+9K5eeRsb0isD5LJEiBaN5zl1nrcT1Bv4PtrvPCwG5lQBOIDuaciFE+PNHWpEpU1evUYXO7D9j7gn4BVGW0Jw3/Shl5l1dNcGjmxK/NQueN08TV49UI+4NSRTr1Ux1FpkmLproNaEKjNZoH5I34BLk8THLJMBkgAAAAASUVORK5CYII=\"); }\n    #my_bottom_menu dd span {\n      color: #36363c;\n      font-size: 10px;\n      padding-top: 3px; }\n    #my_bottom_menu dd.on i.main {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAkCAMAAADIF1gZAAAAUVBMVEUAAADcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDJ6DQIqAAAAGnRSTlMA+aXp93EZBfLcRTUiC8y5nYxatalpiolZV8N9X0oAAADaSURBVDjL1dNJDoMwDAVQO4YMJFCgs+9/0DaCFlBNzLZfURbWW33LIGUY4FicYTbuiGxPjMinVpe244rfr7OaTCHLbEMqy0hZTpZiSTaekecg+2ZfjpjlYnHckzX/pJblwEIGuXgxxknFS/J3GbbLUrad3RY/SdmGtCm+GIqr4pX45lu8Ghzn4m+avDPXb5l/jU7KhgfoFJ7BAjg4QCcGxyj8OcU+tm3sUafVvO6mUun1M7tqlNz3gkih52V4VqhZhkakvkz9il7K9LKiiUqU0ua4e9qj1M/H/QJe5VG9fWujUAAAAABJRU5ErkJggg==\"); }\n    #my_bottom_menu dd.on i.bied {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjBAMAAAAHwBVpAAAAHlBMVEUAAADcKDLcKDLcKDLcKDLcKDLcKDLcKDL////3zdDYfrx6AAAAB3RSTlMA8a0mGbcoC4KDWwAAAGNJREFUKM9jAAMj8fLyQmUGOGAG8oEiBnABplIHBgaWcAW4AGMJiHQXgAuwF0BIqgkwK5YjASEDBsNyFCDMoI4qUMQgjipQyFCOBoaZwIwOOOjEECDLUIwgxAzkRFQBMYyIAgDdVciecDNRmgAAAABJRU5ErkJggg==\"); }\n    #my_bottom_menu dd.on i.concern {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAdCAMAAAD1qz7PAAAAkFBMVEUAAADcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDKFYB9qAAAAL3RSTlMA5QmmA/qGL/bTkz4kDO6cYUcpHRUQBuncya5UTsS+oZaMb2g58dbRuHhcQXx0sGKYMikAAAF+SURBVDjLjZHpkoIwEIQnQORQUREQUMH7dvv9325nokvFEqq2f4ATP3rohl5KTiV9aaKG9jg7Yt0BQU8tJoA7/oa8AdBSfoCIOrWDfm90CrjUowEW6ftH6PRBXo2J3OcaB+pVopHwbfuxzDkshx8ZIrFyjvCJ0stKTtIoAKDduQybS87XEYIxrXA2dhvxVngplkwlnsKusWS7AVEeg4/HBfBHsdcMymPoiohBXjREYWK2Mu8ZYkbCrklhJKXJNmVBeiwPDSQ9FGnwuMVTJktSy834OQgI8DgI9kSJzcimFSrpE5oCZGL8IMpsRnrZm7YzxHSScWqMS4tZsH+DnXx+hFThJo0tuLilBV25kaNkMgZX4xnizteqZcpc/q2J5bKfb5zvTSpBmjdzyeSDVL6cxeJ34tpbDV2FuFq1s/iVJBnOHvUqL3ATP4V9P/RAaCyWCJI+5qAlkahBkXYzowW29JJzRjjvYnyFn/Z90xDK6YAUaus4q1XWAUVRTv/WLw5TNSet1rf2AAAAAElFTkSuQmCC\"); }\n    #my_bottom_menu dd.on i, #my_bottom_menu dd.on i.me {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAMAAABNTyq8AAAASFBMVEUAAADcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDLcKDIhEbg7AAAAF3RSTlMABvD54olV2qt9W1Aq9enSw6aUQ0AUDnWH9x4AAACuSURBVDjLjdPZDoUgDEVRkMl51v7/n97khih6imU/r7QEUT3SfrFmCIvXKlsXKBa6DNGOkhw/LJpLccbTK88ss29kcWFLUAuoRlQDsogsIIPIAKpKUBDWiQeXr0C+TPmzFH5gTK+pWbXiVXNdVtXw5nAjJY3u+JqSndZPxDT1qdnjGBi236YzlMlcf812G1RbPE+6Czf+z3UG+iyc+EbYF+NJzKtZRrMaZDQoKugHfPY7Luay38MAAAAASUVORK5CYII=\"); }\n    #my_bottom_menu dd.on span {\n      color: #dc2832; }\n\n@supports (font-size: 1vw) {\n  #my_bottom_menu {\n    height: 13.33333vw;\n    -webkit-box-shadow: 0 0.26667vw 1.33333vw 0.8vw #ddd;\n    box-shadow: 0 0.26667vw 1.33333vw 0.8vw #ddd; }\n    #my_bottom_menu dd i {\n      height: 4.8vw; }\n    #my_bottom_menu dd span {\n      font-size: 2.66667vw;\n      padding-top: 0.8vw; } }\n@charset \"UTF-8\";\n.haha-people-container {\n  padding: 1rem 1rem 1.25rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  .haha-people-container .hpc-headimg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    height: 3.125rem;\n    width: 3.125rem;\n    border-radius: 50%; }\n  .haha-people-container .hpc-right-content {\n    position: relative;\n    -webkit-box-flex: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    padding-left: 0.75rem; }\n    .haha-people-container .hpc-right-content .hpc-name {\n      font-size: 0.875rem;\n      color: #333;\n      margin-bottom: 0.2rem;\n      overflow: hidden;\n      -webkit-box-orient: vertical;\n      display: -webkit-box;\n      -webkit-line-clamp: 1;\n      line-height: normal; }\n    .haha-people-container .hpc-right-content .hpc-intro {\n      font-size: 0.75rem;\n      color: #666;\n      line-height: 1.5;\n      overflow: hidden;\n      /* text-overflow: ellipsis; */\n      /* white-space: nowrap; */\n      -webkit-box-orient: vertical;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      word-wrap: break-word;\n      word-break: break-all; }\n.haha-components-concern {\n  width: 3.75rem;\n  height: 1.375rem;\n  border: 1px solid #f95c25;\n  border-radius: 3px;\n  font-size: 0.75rem;\n  color: #f95c25;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n  .haha-components-concern .hcc-icon {\n    margin-right: 0.375rem;\n    margin-top: -0.0625rem; }\n.haha-card-wrap {\n  position: relative;\n  height: 100%;\n  overflow: hidden; }\n  .haha-card-wrap .haha-card-img {\n    width: 100%; }\n  .haha-card-wrap .haha-card-content {\n    position: absolute;\n    width: 100%;\n    height: 2.5rem;\n    background: #fff;\n    bottom: 0;\n    padding: 0 0.9375rem;\n    line-height: 2.5rem;\n    color: #333;\n    font-size: .88rem; }\n    .haha-card-wrap .haha-card-content .haha-card-baoming {\n      color: #999;\n      font-size: .75rem;\n      position: absolute;\n      right: 0.9375rem; }\n.haha-mm-toolbar {\n  height: 3.125rem;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  -webkit-box-shadow: 0 2px 10px 3px #ddd;\n  box-shadow: 0 2px 10px 3px #ddd;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background: #fff; }\n  .haha-mm-toolbar .haha-mm-toolbar-item {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 1 auto;\n    flex: 0 1 auto;\n    width: 5.0rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    font-size: 0.625rem;\n    color: #333; }\n    .haha-mm-toolbar .haha-mm-toolbar-item > img {\n      width: 1rem;\n      padding-bottom: 0.375rem; }\n  .haha-mm-toolbar .haha-mm-toolbar-btn {\n    -webkit-box-flex: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    color: #fff;\n    background: #db2932;\n    font-size: 1.125rem; }\n    .haha-mm-toolbar .haha-mm-toolbar-btn.hasBuy {\n      background: #5aace9; }\n.haha-countdown {\n  font-size: 0.75rem;\n  color: #999;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  position: relative; }\n  .haha-countdown.active {\n    color: #333; }\n.mint-loadmore {\n  overflow: hidden; }\n\n.mint-loadmore-content.is-dropped {\n  -webkit-transition: .2s;\n  transition: .2s; }\n\n.mint-loadmore-top, .mint-loadmore-bottom {\n  text-align: center;\n  height: 50px;\n  line-height: 50px; }\n\n.mint-loadmore-top {\n  margin-top: -50px; }\n\n.mint-loadmore-bottom {\n  margin-bottom: -50px; }\n\n.mint-loadmore-spinner {\n  display: inline-block;\n  margin-right: 5px;\n  vertical-align: middle; }\n\n.mint-loadmore-text {\n  vertical-align: middle; }\n.haha-scroller-wrap {\n  height: 100%;\n  width: 100%;\n  overflow: hidden; }\n  .haha-scroller-wrap .haha-scroller-transition {\n    -webkit-transition: -webkit-transform .3s ease-out;\n    transition: -webkit-transform .3s ease-out;\n    transition: transform .3s ease-out;\n    transition: transform .3s ease-out, -webkit-transform .3s ease-out; }\n  .haha-scroller-wrap .haha-scroller-content {\n    position: relative;\n    -webkit-overflow-scrolling: touch; }\n    .haha-scroller-wrap .haha-scroller-content .haha-scroller-spin-top {\n      text-align: center;\n      padding: 6px 0;\n      position: absolute;\n      top: -46px;\n      width: 100%; }\n    .haha-scroller-wrap .haha-scroller-content .haha-scroller-spin-bottom {\n      text-align: center;\n      padding: 6px 0;\n      position: absolute;\n      bottom: -46px;\n      width: 100%; }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!./base.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!./base.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('cm-title', {
    attrs: {
      "showMore": true,
      "moreLink": "http://www.baidu.com",
      "title": "课程直播"
    }
  }), _vm._v(" "), _c('swiper', {
    ref: "mySwiper",
    attrs: {
      "options": _vm.swiperOption
    }
  }, _vm._l((_vm.bnaners), function(banner, index) {
    return _c('swiper-slide', {
      key: index
    }, [_c('img', {
      attrs: {
        "src": banner
      }
    })])
  })), _vm._v(" "), _c('cm-badge', [_vm._v("共四节课")]), _vm._v(" "), _c('mm-person', {
    attrs: {
      "personIntro": _vm.personIntro,
      "personName": _vm.personName,
      "headimg": _vm.headimg
    }
  }), _vm._v(" "), _c('mm-concern', {
    attrs: {
      "selected": false
    },
    on: {
      "concern": _vm.concern
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "10rem"
    }
  }, [_c('mm-card', {
    attrs: {
      "data": _vm.cardData
    }
  })], 1), _vm._v(" "), _c('cm-rate', {
    attrs: {
      "count": 4
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "2rem",
      "width": "5rem",
      "border": "1px solid #ddd"
    }
  }, [_c('mm-countdown', {
    attrs: {
      "duration": "4"
    },
    on: {
      "onClick": _vm.concern
    }
  }, [_c('div', {
    staticStyle: {
      "position": "absolute",
      "top": "0",
      "right": "0",
      "bottom": "0",
      "left": "0"
    },
    on: {
      "click": _vm.clickCountDown
    }
  })])], 1), _vm._v(" "), _c('cm-dropdown', [_c('div', {
    slot: "header"
  }, [_vm._v("哈哈哈")]), _vm._v(" "), _c('div', {
    slot: "content"
  }, [_vm._v("\n            dfasdfasdf\n        ")])]), _vm._v(" "), _c('br'), _c('br'), _vm._v("\n\n    平滑滚动组件\n    "), _c('div', {
    staticStyle: {
      "height": "300px",
      "background": "#eee"
    }
  }, [_c('scroller', {
    ref: "scroller",
    on: {
      "onRefresh": _vm.refresh,
      "onInfinite": _vm.infinite
    }
  }, _vm._l((40), function(item) {
    return _c('div', [_vm._v("\n                " + _vm._s(item) + "\n            ")])
  }))], 1), _vm._v(" "), _c('br'), _c('br'), _vm._v(" "), _c('div', {
    directives: [{
      name: "infinite-scroll",
      rawName: "v-infinite-scroll",
      value: (_vm.loadMore),
      expression: "loadMore"
    }],
    staticStyle: {
      "height": "100px",
      "overflow": "auto",
      "background": "#eee"
    },
    attrs: {
      "infinite-scroll-distance": "30",
      "infinite-scroll-disabled": "loading"
    }
  }, _vm._l((30), function(item, index) {
    return _c('div', {}, [_vm._v("\n            " + _vm._s(index) + "\n        ")])
  })), _vm._v(" "), _c('haha-swiper', {
    ref: "hahaSwiper",
    attrs: {
      "pagination": true,
      "default": 1
    }
  }, [_c('haha-swiper-item', {
    staticStyle: {
      "height": "200px",
      "background": "red"
    }
  }, [_vm._v("111")]), _vm._v(" "), _c('haha-swiper-item', {
    staticStyle: {
      "height": "200px",
      "background": "red"
    }
  }, [_vm._v("222")]), _vm._v(" "), _c('haha-swiper-item', {
    staticStyle: {
      "height": "200px",
      "background": "red"
    }
  }, [_vm._v("333")])], 1), _vm._v(" "), _c('div', {
    on: {
      "click": _vm.go
    }
  }, [_vm._v("下一页")]), _vm._v(" "), _c('div', {
    on: {
      "click": _vm.back
    }
  }, [_vm._v("上一页")]), _vm._v(" "), _c('cm-tabbar', {
    model: {
      value: (_vm.chooseTab),
      callback: function($$v) {
        _vm.chooseTab = $$v
      },
      expression: "chooseTab"
    }
  }, [_c('cm-tabbar-item', [_vm._v("课程介绍")]), _vm._v(" "), _c('cm-tabbar-item', [_vm._v("课程目录")]), _vm._v(" "), _c('cm-tabbar-item', [_vm._v("课程评价")])], 1), _vm._v(" "), _c('button', {
    on: {
      "click": function($event) {
        _vm.chooseTab = "2"
      }
    }
  }, [_vm._v("1")]), _vm._v(" "), _c('button', {
    on: {
      "click": function($event) {
        _vm.chooseTab = "2"
      }
    }
  }, [_vm._v("2")]), _vm._v(" "), _c('button', {
    on: {
      "click": function($event) {
        _vm.chooseTab = "3"
      }
    }
  }, [_vm._v("3")]), _vm._v(" "), _c('cm-tabs-container', {
    attrs: {
      "swipeable": true
    },
    on: {
      "input": _vm.concern
    },
    model: {
      value: (_vm.chooseTab),
      callback: function($$v) {
        _vm.chooseTab = $$v
      },
      expression: "chooseTab"
    }
  }, [_c('cm-tabs-item', {
    staticStyle: {
      "height": "1200px",
      "background": "red"
    },
    attrs: {
      "id": "1"
    }
  }, [_vm._v("111")]), _vm._v(" "), _c('cm-tabs-item', {
    staticStyle: {
      "height": "100px",
      "background": "red"
    },
    attrs: {
      "id": "2"
    }
  }, [_vm._v("222")]), _vm._v(" "), _c('cm-tabs-item', {
    staticStyle: {
      "height": "300px",
      "background": "red"
    },
    attrs: {
      "id": "3"
    }
  }, [_vm._v("333")])], 1), _vm._v(" "), _c('loadmore', {
    ref: "loadmore",
    staticStyle: {
      "padding-bottom": "100px"
    },
    attrs: {
      "auto-fill": false,
      "bottomLoadingText": "",
      "bottom-method": _vm.loadBottom,
      "bottom-all-loaded": false
    }
  }, [_c('ul', _vm._l((10), function(item) {
    return _c('li', [_vm._v("222222")])
  }))]), _vm._v(" "), _c('mm-toolbar', {
    attrs: {
      "background": "#db2932",
      "text": "听课"
    },
    on: {
      "shareClick": function($event) {},
      "giftClick": function($event) {},
      "inviteClick": function($event) {},
      "buyClick": function($event) {
        _vm.showModal = true
      }
    }
  }), _vm._v(" "), _c('cm-modal', {
    attrs: {
      "time": 3,
      "overlayClose": true,
      "show": _vm.showModal
    },
    on: {
      "onClose": _vm.closeModal
    }
  }), _vm._v(" "), _c('cm-backtop', {
    on: {
      "click": function($event) {
        _vm.concern()
      }
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);