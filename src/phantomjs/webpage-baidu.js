/**
 * Command in Terminal
 *   phantomjs webpage.js
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

page.onConsoleMessage = function (msg) {
  console.log('Evaluate: ' + msg);
};

/*page.onResourceRequested = function(requestData, networkRequest) {
 console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
 };

 page.onResourceReceived = function (response) {
 console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
 };*/

console.log(page);

var cdn_jquery = 'http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js';
var baiduUrl = 'https://www.baidu.com/';


page.onUrlChanged = function (targetUrl) {
  console.log('New URL: ' + targetUrl);
};


// 指定浏览器视口的大小，height必须指定，不可省略
page.vieportSize = {
  width: 1920,
  height: 1080
};

// 打开网址
page.open(baiduUrl, function (status) {
  console.log('Status: login: ' + status);

  // 加载外部脚本，加载结束后调用回调函数
  page.includeJs(cdn_jquery, function () {

    // page.includeJs('https://raw.githubusercontent.com/jquery/jquery-simulate/master/jquery.simulate.js', function() {
    //
    //   var title = page.evaluate(function() {
    //     console.log($('a[name="tj_login"]').length);
    //     var tj_login = $('a[name="tj_login"]')[1];
    //     console.log($(tj_login).html());
    //     $(tj_login).simulate('click');
    //     return document.title;
    //   });
    //
    //   console.log(title);
    //
    //   phantom.exit();
    //
    // });

    // var a = page.evaluate(function() {
    //   console.log($('a[name="tj_login"]').length);
    //   var tj_login = $('a[name="tj_login"]')[1];
    //   $(tj_login).trigger('click');
    //   return tj_login;
    // });

    var rect = page.evaluate(function () {
      // 必须把u1的right去掉，才能够点击到， 估计phantom在页面定位的识别上有些问题
      document.querySelector('#u1').style.right = 'auto';

      return document.querySelector('#u1>a[name="tj_login"]').getBoundingClientRect();
    });
    console.log(rect.left, rect.width, rect.top, rect.height);
    page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);

    setTimeout(function () {
      page.render(123123 + '.png', {
        format: 'png',
        quality: '100'
      });
      phantom.exit();
    }, 3000);

  });

});





