/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function (require) {
  'use strict';
  var EX, kisi = require('./kitchen-sink');

  EX = function tabulate(tagName, renderFunc, opts) {
    opts = (opts || false);
    var lnTags = (opts.lineTags || EX.lineTagNamesByParent);
    kisi.qsa(tagName + '[spec]').forEach(function (dest) {
      var lnTag = (lnTags[dest.tagName.toLowerCase()] || lnTags[''] || 'div');
      EX.popSpec(dest).forEach(function (rowData) {
        renderFunc(dest.appendChild(kisi.mktag(lnTag)), rowData, opts);
      });
    });
  };


  EX.lineTagNamesByParent = { dl: 'dt', ol: 'li', ul: 'li',
    table: 'tr', thead: 'tr', tbody: 'tr', tfoot: 'tr', tr: 'td',
    };


  EX.warnUnprocSpec = function () {
    var unproc = kisi.qsa('[spec]');
    if (unproc.length === 0) { return; }
    console.error('remaining unprocessed spec tags:', unproc);
    window.unprocessedSpecTags = unproc;
  };


  EX.popSpec = function (elem) {
    return kisi.unindent(kisi.popAttr(elem, 'spec')
      ).trim().replace(/\n +/g, ' ').split(/\n+/);
  };


  EX.renderCaptions = function (row, captions, tagName) {
    captions.split(/ +\| +/).forEach(function (cpt) {
      row.appendChild(kisi.mktag(tagName)
        ).innerHTML = cpt.replace(/\s*¶\s*/g, '<br>');
    });
  };


  EX.explainSymbolsByDefListSpec = function dlSpec(dest, ln) {
    var fx, term = (ln.match(/^([\S\s]*?)\s*=\s*/)
      || ln.match(/^(\S+)\s{2,}/));
    if (!term) { return console.error('no term in def spec:', dest, ln); }
    ln = ln.slice(term[0].length);
    term = term[1];
    fx = term.match(/(\^)$/);
    if (fx) {
      term = term.slice(0, fx.index);
      fx = fx[1];
      if (fx === '^') { term = '<sup>' + term + '</sup>'; }
    }
    dest.innerHTML = term;
    dest = dest.parentNode.appendChild(kisi.mktag('dd'));
    dest.innerHTML = ln;
  };



















  return EX;
});
