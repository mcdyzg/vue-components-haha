(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["Component"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue__);


__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a.install = function (Vue) {
	Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a);
};

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_vue___default.a);

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('div', {
    ref: "haha_tabbar",
    staticClass: "haha-tabbar-container"
  }, [_c('div', {
    ref: "wrap",
    staticClass: "haha-tabbar-wrap",
    class: {
      active: _vm.fixed
    },
    style: ({
      top: _vm.fixed ? _vm.topOffset + "px" : "auto"
    })
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.fixed) ? _c('div', {
    staticStyle: {
      "width": "100%"
    },
    style: ({
      height: _vm.wrapHeight
    })
  }) : _vm._e()])])
},staticRenderFns: []}

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(74),
  /* template */
  __webpack_require__(153),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_scss__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabbar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabbar_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset__);
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




/* harmony default export */ __webpack_exports__["default"] = ({
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

			var originTop = __WEBPACK_IMPORTED_MODULE_1_domtoolkit_getOffset___default()(this.$refs.haha_tabbar).top;

			if (scrollTop >= originTop - this.topOffset) {
				this.fixed = true;
			} else {
				this.fixed = false;
			}
		}
	},
	mounted: function mounted() {
		this.$nextTick(function () {
			this.wrapHeight = window.getComputedStyle(this.$refs.haha_tabbar, null).height;

			// this.originTop = getOffset(this.$refs.haha_tabbar).top
			//  + 56.69*this.$refs.haha_tabbar.getBoundingClientRect().width/414;

			window.addEventListener('scroll', this.checkScroll);
		});
	},
	beforeDestroy: function beforeDestroy() {
		window.removeEventListener('scroll', this.checkScroll);
	}
});

/***/ })

/******/ });
});