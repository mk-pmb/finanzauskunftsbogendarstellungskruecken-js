﻿/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*globals define:true */
define(function (require) {
  'use strict';
  var EX = {}, kisi = require('./src/kitchen-sink'),
    tabu = require('./src/tabulate'),
    miscDeco = require('./src/misc-deco');

  EX.enchant = function () {
    miscDeco.distributeInnerHtml('.page-title',
      kisi.qsa('title')[0].innerHTML);
    miscDeco.checkboxRows();
    tabu('thead', tabu.renderCaptions, 'th');
    require('./src/kv-rows').enchant();
    miscDeco.applyColumnClassNames();
    tabu.warnUnprocSpec();
    require('css!./res/fab1.css');
  };



























  return EX;
});
