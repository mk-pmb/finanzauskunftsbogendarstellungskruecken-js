/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
/*global define:true */
define(function () {
  'use strict';
  var EX;

  function isset(x) { return ((x !== undefined) && (x !== null)); }
  function ifset(a, b) { return (isset(a) ? a : b); }
  function isint(x) { return ((x === +x) && ((x % 1) === 0)); }

  EX = function numFmt(amountOrData, opt) {
    if (!opt) { opt = false; }
    var amnt, prec = +ifset(opt.prec, 2), decimals = '',
      factor = +opt.factor,
      prefixCirca = (amountOrData.quali === '~'),
      prefixMax = (amountOrData.quali === '<');
    amnt = (+ifset(amountOrData.amount, amountOrData)) * Math.pow(10, prec);
    if (factor) {
      amnt *= factor;
      if (prefixMax) { amnt = Math.ceil(amnt); }
      if (!isint(factor)) { prefixCirca = true; }
    }
    amnt = amnt.toFixed(0);
    if (prec) {
      if (amnt.length > prec) {
        decimals = amnt.slice(-prec);
        amnt = amnt.slice(0, -prec);
      } else {
        decimals = ('00000000000000000000000' + amnt).slice(-prec);
        amnt = '0';
      }
    }
    amnt = EX.separateGroups(amnt, opt.numGrpChar, opt.numGrpWidth);
    if (prec) {
      amnt += '<span class="deci-frac"><span class="deci-comma">,</span>' +
        '<span class="deci-digits">' + decimals + '</span></span>';
    }
    if (prefixCirca) { amnt = (opt.avgHint || 'ca. ') + amnt; }
    if (prefixMax) { amnt = 'max. ' + amnt; }
    amnt = ('<span class="numfmt prec-' + prec + ' deci-' + decimals +
      '">' + amnt + '</span>');
    return amnt;
  };


  EX.separateGroups = function (intStr, numGrpSep, numGrpWidth) {
    if (numGrpSep === undefined) { numGrpSep = ' '; }
    if (numGrpWidth === undefined) { numGrpWidth = 3; }
    var grouped = '';
    while (intStr.length > numGrpWidth) {
      grouped = numGrpSep + intStr.slice(-numGrpWidth) + grouped;
      intStr = intStr.slice(0, -numGrpWidth);
    }
    return intStr + grouped;
  };
















  return EX;
});
