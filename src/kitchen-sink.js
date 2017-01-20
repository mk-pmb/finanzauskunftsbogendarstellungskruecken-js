/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function () {
  'use strict';
  var EX = {};

  EX.qsa = function (s) { return Array.from(document.querySelectorAll(s)); };
  //function mktxt(tx) { return document.createTextNode(tx); }
  EX.mktag = function (tn) { return document.createElement(tn); };
  EX.attrStr = function (el, at) { return String(el.getAttribute(at) || ''); };


  EX.popAttr = function (el, at) {
    var val = EX.attrStr(el, at);
    el.removeAttribute(at);
    return val;
  };


  EX.unindent = function (tx) {
    var ind = tx.match(/^\n*(\n +)/);
    return (ind ? tx.replace(new RegExp(ind[1], 'g'), '\n') : tx);
  };


  EX.match2dict = function (m, keys) {
    var d = {};
    keys.forEach(function (k, i) { if (k !== null) { d[k] = m[i]; } });
    return d;
  };














  return EX;
});