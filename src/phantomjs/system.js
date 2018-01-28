/**
 * Command in Terminal
 *   phantomjs system.js
 * @type {*}
 */
/*

 phantom.onError = function(msg, trace) {
 var msgStack = ['PHANTOM ERROR: ' + msg];
 if (trace && trace.length) {
 msgStack.push('TRACE:');
 trace.forEach(function(t) {
 msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
 });
 }
 console.error(msgStack.join('\n'));
 //phantom.exit(1);
 };
 */


var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
  console.log('Usage: system.js <some URL>');
  phantom.exit();
}

var t = Date.now();
var address = system.args[1];


// 打开网址
page.open(address, function (status) {
  console.log('Status: ' + status);

  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading time ' + t + ' ms');
  }
  phantom.exit();

});
