"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function startsWith(string, target, position) {
  var length = string.length;
  position = position == null ? 0 : position;

  if (position < 0) {
    position = 0;
  } else if (position > length) {
    position = length;
  }

  target = "".concat(target);
  return string.slice(position, position + target.length) == target;
}

function getBrowserLang() {
  if (typeof window === "undefined") {
    return null;
  }

  var lang = window.navigator.languages && window.navigator.languages[0] || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage || window.navigator.systemLanguage || null;
  return lang;
}

function normalizeCode(code) {
  return code.toLowerCase().replace(/-/, "_");
}

function getPreferredLanguage(options) {
  if (!options) {
    return getBrowserLang();
  }

  var languages = options.languages,
      fallback = options.fallback;

  if (!options.languages) {
    return fallback;
  } // some browsers report language as en-US instead of en_US


  var browserLanguage = normalizeCode(getBrowserLang());

  if (!browserLanguage) {
    return fallback;
  }

  var match = languages.filter(function (lang) {
    return normalizeCode(lang) === browserLanguage;
  });

  if (match.length > 0) {
    return match[0] || fallback;
  } // en == en_US


  var matchCodeOnly = languages.filter(function (lang) {
    return browserLanguage.startsWith(lang) || lang.startsWith(browserLanguage);
  });
  return matchCodeOnly[0] || fallback;
}

var _default = getPreferredLanguage;
exports.default = _default;