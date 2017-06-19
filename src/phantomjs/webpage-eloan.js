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

page.onConsoleMessage = function(msg) {
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
var loginJs = 'https://static66.eloancn.com/login/js/security.js';
var address = 'http://www.eloancn.com/';
var loginUrl = 'https://passport.eloancn.com/login?service=http://www.eloancn.com/new/loadAllWmpsRecords.action&v=1487482274246';
var actionUrl = 'http://www.eloancn.com/new/loadAllWmpsRecords.action';
var userinfo = 'http://account.eloancn.com/account/show';
var xiaomi = 'https://account.xiaomi.com/pass/serviceLogin';
//var address = 'http://www.baidu.com/';

function click(el){
  var ev = document.createEvent("MouseEvent");
  ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
  );
  el.dispatchEvent(ev);
}

page.onUrlChanged = function(targetUrl) {
  console.log('New URL: ' + targetUrl);
};
// 打开网址
page.open(loginUrl, function(status) {
  console.log('Status: login: ' + status);

  var title = page.evaluate(function () {

    //console.log($(document.body).html());
    /*      $("#username").val('13819493700');
     $("#pwd").val('zju308104');
     $("#login-button").click();*/

    $("#loginName").val('13819493700');
    $("#pwdshowtext").val('deng308104');
    $("#tpassword").val('deng308104');
    $(".loginBtn-new").click();

    return document.title;

  });

  var inter = setInterval(function(){

    page.open(actionUrl, function(status) {
      console.log('Status: login: ' + status);

      loadAllPage();

      function loadAllPage() {
        // page.render(title + '.jpeg', {
        //   format: 'jpeg',
        //   quality: '100'
        // });

        Date.prototype.Format = function (fmt) { //author: meizz
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        };

        console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'));

        var rect = page.evaluate(function() {
          return document.querySelector('#accountRealName>a').getBoundingClientRect();
        });

        console.log(rect.left, rect.width, rect.top, rect.height);
        page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);

        setTimeout(function() {
          page.render(123123 + '.png', {
            format: 'png',
            quality: '100'
          });
          phantom.exit();
        }, 3000);

        /*title = page.evaluate(function() {

          Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
              "M+": this.getMonth() + 1, //月份
              "d+": this.getDate(), //日
              "h+": this.getHours(), //小时
              "m+": this.getMinutes(), //分
              "s+": this.getSeconds(), //秒
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度
              "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
          };

          console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'));
          console.log($('#accountRealName').html());

          $('#accountRealName').click();

        /!*  var $items = $('a[class="qiangtou jieshubtn reddw"]');
          var len = $items.length;

          if(len > 0) {
            console.log('当前可投标的： ' + len);
            for(var i = 0; i < len; i++) {
              var $item = $($items[i]);

              var onclickStr = $item.attr('onclick');
              console.log(onclickStr);
              var regExp = /^lender.openbuywindow\(1,(\d+),\'(\d+.\d+)%\'\)$/;

              var mR = onclickStr.match(regExp);
              var itemId = mR[1];
              var rate = mR[2];
              console.log(itemId, rate);

              if(rate === '8.3' || rate === '9.3') {
                $item.click();

                setTimeout(function() {
                  var needAmount = "needAmount" + itemId;
                  var wmpsYuGouAmount = "wmpsYuGouAmount" + itemId;
                  var touzi = "touzi" + itemId;

                  console.log($('#' + needAmount).length);
                  console.log($('#' + needAmount).text());
                  var lef = $('#' + needAmount).text();
                  if(lef && Number(lef)) {
                    if(Number(lef) > 10000 ) {
                      $('#' + wmpsYuGouAmount).val(10000);
                      $('#' + touzi).click();
                      //lender.buywmps(1005513);
                    }
                  }
                }, 1000);
              }
            }
          } else {
            console.log('暂无标的');
          }*!/

          return document.title;

        });*/

      }

    });

  }, 10 * 1000);

  setTimeout(function() {
    if(inter)
      clearInterval(inter);
    phantom.exit();
  }, 10 * 60 * 1000);




});





