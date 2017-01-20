/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function (require) {
  'use strict';
  var EX = {}, kisi = require('./kitchen-sink'), tabu = require('./tabulate');

  EX.enchant = function () {
    tabu('table.key-value tbody', function (row, descr) {
      var data = descr.match(/ ([wmy#])([~<]?)=(\S*)$/);
      if (data) { descr = descr.slice(0, data.index); }
      tabu.renderCaptions(row, descr, 'td');
      if (data) { EX.appendDataCell(row, data); }
    });
  };


  EX.appendDataCell = function (row, data) {
    data = kisi.match2dict(data, [ null, 'range', 'quali', 'value' ]);
    var cell = row.appendChild(kisi.mktag('td'));
    if ((data.range === '#') && (!data.quali)) {
      cell.innerHTML = data.value.replace(/_/g, ' ');
      return;
    }
    cell.data = data;
    data = JSON.stringify(data);
    cell.setAttribute('data-unsupported', data);
    cell.innerHTML = data;
    setTimeout(this.applyDataFuncs.bind(this, cell), 1);
  };


  EX.applyDataFuncs = function (cell) {
    var row = cell.parentNode,
      funcSpec = kisi.attrStr(row.parentNode, 'row-data').trim();
    funcSpec = (funcSpec[0] === '[' ? JSON.parse(funcSpec)
      : funcSpec.split(/\s+/));
  };


















  return EX;
});