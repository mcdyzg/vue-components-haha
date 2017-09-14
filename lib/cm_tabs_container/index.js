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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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

/***/ 114:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue__);


__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a.install = function (Vue) {
	Vue.component(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a);
};

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_vue___default.a);

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(77),
  /* template */
  __webpack_require__(133),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_scss__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__cm_tabs_container_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_array_find_index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_array_find_index__);
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
});

/***/ })

/******/ });
});