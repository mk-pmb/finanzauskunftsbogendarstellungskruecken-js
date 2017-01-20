/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function (require) {
  'use strict';
  var EX = {}, kisi = require('./kitchen-sink');


  EX.distributeInnerHtml = function (spec, html) {
    kisi.qsa(spec).forEach(function (el) {
      if (!el.innerHTML) { el.innerHTML = html; }
    });
  };


  EX.checkboxRows = function () {
    function cbr(yn, symbol) {
      kisi.qsa('tr.checkbox-' + yn).forEach(function (tr) {
        tr.className = tr.className.replace(/^(\w+)/, '$1 $1');
        tr.insertBefore(kisi.mktag('td'), tr.firstChild).innerHTML = symbol;
      });
    }
    cbr('n', '\u2610');
    cbr('y', '\u2612');
  };


  EX.applyColumnClassNames = function () {
    kisi.qsa('table[col-cls] tr').forEach(function (tr) {
      var tbl = tr.parentNode.parentNode, ch = tr.firstElementChild,
        cls, idx = 0,
        colCls = kisi.attrStr(tbl, 'col-cls').trim().split(/\s*[\|,]\s*/);
      while (ch) {
        cls = String(ch.className || '');
        ch.className = (cls ? cls + ' ' : '') + colCls[idx];
        ch = ch.nextElementSibling;
        idx += 1;
      }
    });
  };















  return EX;
});