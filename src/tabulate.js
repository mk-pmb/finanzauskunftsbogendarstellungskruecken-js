/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function (require) {
  'use strict';
  var EX, kisi = require('./kitchen-sink');

  EX = function tabulate(tagName, renderFunc, opts) {
    kisi.qsa(tagName + '[spec]').forEach(function (dest) {
      EX.popSpec(dest).forEach(function (rowData) {
        renderFunc(dest.appendChild(kisi.mktag('tr')), rowData, opts);
      });
    });
  };


  EX.warnUnprocSpec = function () {
    var unproc = kisi.qsa('[spec]');
    if (unproc.length === 0) { return; }
    console.error('remaining unprocessed spec tags:', unproc);
    window.unprocessedSpecTags = unproc;
  };


  EX.popSpec = function (elem) {
    return kisi.unindent(kisi.popAttr(elem, 'spec')
      ).trim().replace(/\n +/g, ' ').replace(/( ){2,}/g, '$1'
      ).split(/\n+/);
  };


  EX.renderCaptions = function (row, captions, tagName) {
    captions.split(/ +\| +/).forEach(function (cpt) {
      row.appendChild(kisi.mktag(tagName)
        ).innerHTML = cpt.replace(/\s*¶\s*/g, '<br>');
    });
  };


















  return EX;
});
