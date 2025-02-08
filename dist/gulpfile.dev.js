"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.watch = exports.delDocs = exports.clear = exports.images = exports.fonts = exports.files = exports.js = exports.css = exports.html = exports.browserSyncFunc = void 0;

var _browserSync = _interopRequireWildcard(require("browser-sync"));

var _gulp = _interopRequireDefault(require("gulp"));

var _del = _interopRequireDefault(require("del"));

var _gulpPug = _interopRequireDefault(require("gulp-pug"));

var _sass = _interopRequireDefault(require("sass"));

var _gulpSass = _interopRequireDefault(require("gulp-sass"));

var _gulpAutoprefixer = _interopRequireDefault(require("gulp-autoprefixer"));

var _gulpConcat = _interopRequireDefault(require("gulp-concat"));

var _gulpUglifyEs = _interopRequireDefault(require("gulp-uglify-es"));

var _gulpImagemin = _interopRequireDefault(require("gulp-imagemin"));

var _gulpCache = _interopRequireDefault(require("gulp-cache"));

var _gulpGroupCssMediaQueries = _interopRequireDefault(require("gulp-group-css-media-queries"));

var _gulpCleanCss = _interopRequireDefault(require("gulp-clean-css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sass = (0, _gulpSass["default"])(_sass["default"]);

var browserSyncFunc = function browserSyncFunc() {
  (0, _browserSync["default"])({
    server: {
      baseDir: "docs"
    },
    open: true,
    browser: "chrome" //port:8080

  });
};

exports.browserSyncFunc = browserSyncFunc;

var html = function html() {
  return _gulp["default"].src(["src/pug/*.pug"]).pipe((0, _gulpPug["default"])({//pretty:true
  })).pipe(_gulp["default"].dest("docs")).pipe(_browserSync["default"].reload({
    stream: true
  }));
};

exports.html = html;

var css = function css() {
  return _gulp["default"].src(["src/sass/*.css", "src/sass/*.sass"]).pipe(sass({
    outputStyle: "compressed" //extended compact

  }).on("error", sass.logError)).pipe((0, _gulpAutoprefixer["default"])(["last 15 versions"], {
    cascade: true
  })).pipe((0, _gulpGroupCssMediaQueries["default"])("styles.css")).pipe((0, _gulpConcat["default"])("styles.css")).pipe((0, _gulpCleanCss["default"])({
    compatibility: "ie8"
  })).pipe(_gulp["default"].dest("docs/css")).pipe(_browserSync["default"].reload({
    stream: true
  }));
};

exports.css = css;

var js = function js() {
  return _gulp["default"].src(["src/js/**/*.js"]).pipe(_gulpUglifyEs["default"]["default"]()).pipe((0, _gulpConcat["default"])("scripts.js")).pipe(_gulp["default"].dest("docs/js")).pipe(_browserSync["default"].reload({
    stream: true
  }));
};

exports.js = js;

var files = function files() {
  return _gulp["default"].src(["src/*.*"], {
    dot: true
  }).pipe(_gulpUglifyEs["default"]["default"]()).pipe(_gulp["default"].dest("docs")).pipe(_browserSync["default"].reload({
    stream: true
  }));
};

exports.files = files;

var fonts = function fonts() {
  return _gulp["default"].src(["src/fonts/**/*.*"]).pipe(_gulp["default"].dest("docs/font")).pipe(_browserSync["default"].reload({
    stream: true
  }));
};

exports.fonts = fonts;

var images = function images() {
  return _gulp["default"].src(["src/img/**/*"]).pipe((0, _gulpCache["default"])((0, _gulpImagemin["default"])())).pipe(_gulp["default"].dest("docs/img")).pipe(_browserSync["default"].reload({
    stream: true
  }));
};

exports.images = images;

var clear = function clear() {
  return _gulpCache["default"].clearAll();
};

exports.clear = clear;

var delDocs = function delDocs() {
  return (0, _del["default"])("docs");
};

exports.delDocs = delDocs;

var watch = function watch() {
  _gulp["default"].watch("src/sass/**/*.sass", _gulp["default"].parallel(css));

  _gulp["default"].watch("src/js/**/*.js", _gulp["default"].parallel(js));

  _gulp["default"].watch("src/pug/**/*.pug", _gulp["default"].parallel(html));

  _gulp["default"].watch("src/*.*", _gulp["default"].parallel(html));

  _gulp["default"].watch("src/fonts/**/*.*", _gulp["default"].parallel(fonts));

  _gulp["default"].watch("src/img/**/*.*", _gulp["default"].parallel(images));
};

exports.watch = watch;

var _default = _gulp["default"].series(delDocs, _gulp["default"].parallel(watch, html, css, js, files, fonts, images, browserSyncFunc));

exports["default"] = _default;