/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function () {
  'use strict';
  var EX = {};


  EX.parseList = function (spec) {
    spec = String(spec).trim();
    if (spec[0] === '[') { return EX.parseCommaJson(spec); }
    if (spec[0] === '{') { return EX.parseCommaJson('[' + spec + ']'); }
    return spec.split(/\s+/);
  };


  EX.urldecode = function (s) {
    return decodeURIComponent(String(s || '').replace(/\+/g, ' '));
  };


  EX.parseCommaJson = function (data) {
    return JSON.parse(data.trim().replace(/,\s*(\]|\})\s*$/, '$1'));
  };


  EX.parseFuncSpec = function (opt, spec) {
    var funcName;
    if (!spec) { return; }
    if (typeof spec === 'string') {
      spec = spec.split(/\?|&/);
      funcName = spec.shift();
      spec.forEach(function (arg) {
        var eql = arg.indexOf('=');
        if (eql < 0) { return; }
        spec[arg.slice(0, eql)] = EX.urldecode(arg.slice(eql + 1));
      });
      spec = [ spec ];
    } else {
      funcName = spec[''];
      if (typeof funcName === 'string') {
        spec = [ spec ];
      } else {    // assume array
        funcName = spec[0];
        spec = spec.slice(1);
      }
    }
    spec.func = funcName;
    if (opt.funcsDict) {
      spec.func = opt.funcsDict[funcName];
      if (typeof spec.func !== 'function') {
        throw new Error((opt.errFuncNotFound || 'Unsupported function: '
          ) + funcName);
      }
    }
    return spec;
  };

















  return EX;
});
