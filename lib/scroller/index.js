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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
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

/***/ 1:
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

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(136)
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
  null
)

module.exports = Component.exports


/***/ }),

/***/ 116:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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
  })])
},staticRenderFns: []}

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "haha-scroller-wrap",
    staticStyle: {
      "background": "#eee"
    }
  }, [_c('div', {
    staticClass: "haha-scroller-content",
    class: {
      'haha-scroller-transition': !_vm.touch
    },
    on: {
      "mousedown": _vm.mousedown,
      "mouseup": _vm.mouseup,
      "mousemove": _vm.mousemove,
      "touchstart": _vm.touchstart,
      "touchmove": _vm.touchmove,
      "touchend": _vm.touchend
    }
  }, [(_vm._events.onRefresh && _vm.showRefresh) ? _c('div', {
    staticClass: "haha-scroller-spin-top"
  }, [_c('loading')], 1) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm._events.onInfinite) ? _c('div', {
    staticClass: "haha-scroller-spin-bottom"
  }, [_c('loading')], 1) : _vm._e()], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3e066c7f", content, true);

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

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
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroller_vue__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroller_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroller_vue__);


__WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a.install = function (Vue) {
	Vue.component(__WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a);
};

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__scroller_vue___default.a);

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

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
  null
)

module.exports = Component.exports


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroller_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroller_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroller_scss__);
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'loading'
});

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroller_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroller_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroller_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__loading__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			this.once(e.currentTarget, 'webkitTransitionEnd', function (_) {
				_this.$nextTick(function () {
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
			});
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
			this.once(e.currentTarget, 'webkitTransitionEnd', function (_) {
				_this2.$nextTick(function () {
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
			});
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
});

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".haha-scroller-spin[data-v-1821e56d]{-webkit-animation:roll 1s linear infinite;animation:roll 1s linear infinite}@-webkit-keyframes roll{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes roll{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}", ""]);

// exports


/***/ })

/******/ });
});