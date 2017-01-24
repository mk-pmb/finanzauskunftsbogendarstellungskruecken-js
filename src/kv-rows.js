/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function (require) {
  'use strict';
  var EX = {}, kisi = require('./kitchen-sink'),
    mattr = require('./mattr'),
    timespans = require('./timespans'),
    numFmt = require('./numfmt'),
    tabu = require('./tabulate');


  EX.enchant = function () {
    tabu('table.key-value tbody', function (row, descr) {
      var data = descr.match(/ ([wmy#])([~<]?)=(\S*)$/);
      if (data) { descr = descr.slice(0, data.index); }
      tabu.renderCaptions(row, descr, 'td');
      if (data) { EX.appendDataCell(row, data); }
    });
  };


  EX.appendDataCell = function (row, data) {
    if (data[0].trim() === '#<=') {
      return row.lastChild.setAttribute('colspan', 2);
    }
    data = kisi.match2dict(data, [ null, 'ref', 'quali', 'value' ]);
    var cell = row.appendChild(kisi.mktag('td')), amount,
      funcListElem = row.parentNode, funcs = funcListElem.dataFuncs;
    if ((data.ref === '#') && (!data.quali)) {
      cell.innerHTML = data.value.replace(/_/g, ' ');
      return;
    }
    amount = data.value.match(/^\d+(?:|[\.,]\d{2})$/);
    if (amount) {
      amount = +(amount[0].replace(/,/g, '.'));
      if (Number.isFinite(amount)) { data.amount = amount; }
    }
    row.dataCell = cell;
    cell.data = data;
    data = JSON.stringify(data);
    cell.setAttribute('data-unsupported', data);
    cell.innerHTML = data;
    if (!funcs) {
      funcs = mattr.parseList(kisi.attrStr(funcListElem, 'row-data')
        ).map(mattr.parseFuncSpec.bind(null, { funcsDict: EX }));
      funcListElem.dataFuncs = funcs;
    }
    funcs.forEach(function (funcSpec) {
      funcSpec.func.apply(funcSpec, [ row ].concat(funcSpec));
    });
  };


  EX.setDataCellHtml = function (dc, html) {
    if (dc.data && kisi.attrStr(dc, 'data-unsupported')) {
      dc.removeAttribute('data-unsupported');
      dc.innerHTML = '';
    }
    if (dc.innerHTML) {
      return console.error('setDataCellHtml: flinching: double set', dc);
    }
    dc.innerHTML = html;
    return dc;
  };


  EX.amountPerTimespan = function (row, opt) {
    if (!opt.span) {
      console.error('amountPerTimespan: no span', row, opt);
      return;
    }
    var cell = row.dataCell, data = cell.data, origTimespan = opt.span[0];
    if (opt.append) { cell = row.appendChild(kisi.mktag(opt.append)); }
    if (data.ref !== origTimespan) {
      opt = Object.assign({}, opt);
      opt.factor = timespans.ratios.per(data.ref, origTimespan);
      kisi.addCls(cell, 'scaled');
    }
    data = numFmt(data, opt);
    return EX.setDataCellHtml(cell, data);
  };


  EX.monthlyPlusNoBonusEqYear = function (row, opt) {
    if (!opt.append) { opt.append = 'td'; }
    if (!opt.span) { opt.span = 'year'; }
    var bonus = row.appendChild(kisi.mktag(opt.append)),
      data = row.dataCell.data;
    bonus.innerHTML = (opt['ref_' + data.ref] || numFmt(0, opt));
    EX.amountPerTimespan(row, opt);
  };


  EX.smallParensText = function (row) {
    var cap = row.firstChild, par = cap.innerHTML.split(/(\([\S\s]+?\))/);
    if (par.length < 2) { return; }
    cap.innerHTML = par.map(function (tx) {
      if (tx[0] === '(') { tx = '<small class="parens">' + tx + '</small>'; }
      return tx;
    }).join('');
  };




















  return EX;
});
