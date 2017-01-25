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


  EX.symbolRows = function () {
    kisi.qsa('tr[symb]').forEach(function (tr) {
      var symb = kisi.attrStr(tr, 'symb');
      kisi.addCls(tr, 'symbol');
      symb.replace(/^[a-z]+\-/, function (prefix) {
        kisi.addCls(tr, 'symbol-' + prefix.slice(0, -1));
      });
      kisi.addCls(tr, 'symbol-' + symb);
      tr.insertBefore(kisi.mktag('td'), tr.firstChild
        ).innerHTML = '<s ymb="' + symb + '"></s>';
    });
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
