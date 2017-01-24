/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function () {
  'use strict';
  var EX = {};


  EX.unitNames = (function (n) {
    n.lookup = function (x) { return (n[x] || String(x)); };
    return n;
  }({
    m: 'month',
    w: 'week',
    y: 'year',
  }));


  EX.ratios = (function (r) {
    r.monthsPerYear = 12;
    r.weeksPerYear = 52;

    r.monthsPerWeek = (r.monthsPerYear / r.weeksPerYear);
    r.weeksPerMonth = (r.weeksPerYear / r.monthsPerYear);
    r.yearsPerMonth = (1 / r.monthsPerYear);

    r.per = function (a, b) {
      a = EX.unitNames.lookup(a);
      b = EX.unitNames.lookup(b);
      if (a === b) { return 1; }
      b = a + 'sPer' + b[0].toUpperCase() + b.slice(1);
      a = r[b];
      if (!a) { throw new Error('Unknown timespan ratio: ' + b); }
      return a;
    };
    return r;
  }({}));




















  return EX;
});
