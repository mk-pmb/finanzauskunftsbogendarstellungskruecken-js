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
      var tbl = tr.parentNode.parentNode, ch = tr.firstElementChild, idx = 0,
        colCls = kisi.attrStr(tbl, 'col-cls').trim().split(/\s*[\|,]\s*/);
      while (ch) {
        kisi.addCls(ch, colCls[idx]);
        ch = ch.nextElementSibling;
        idx += 1;
      }
    });
  };


  EX.tableSideAnnot = function tblAnnot(dl) {
    if (typeof dl === 'string') { return kisi.qsa(dl).forEach(tblAnnot); }
    var rows = kisi.sub('tbody tr', dl.previousElementSibling), cell;
    dl.parentNode.removeChild(dl);
    kisi.addCls(rows[0].lastElementChild, 'last-cell');
    cell = rows[0].appendChild(kisi.mktag('td'));
    cell.setAttribute('rowspan', 0);
    cell.className = 'annot';
    cell.appendChild(dl);
  };




















  return EX;
});
