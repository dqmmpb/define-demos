'use strict';
/**
 * detect(window.navigator.userAgent)
 * @param appRegExp @see defaultAppRegExp
 * @returns {{os: {}, brower: {}, app: {}}}
 */
function detect(userAgent, appRegExp) {

  const ua = userAgent;

  const os = {},
    browser = {},
    app = {},
    webkit = ua.match(/Web[kK]it[/]?([\d.]+)/),
    android = ua.match(/(Android);?[\s/]+([\d.]+)?/),
    osx = !!ua.match(/\(Macintosh; Intel /),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    webos = ua.match(/(webOS|hpwOS)[\s/]([\d.]+)/),
    win = ua.match(/Win\d{2}|Windows/),
    wp = ua.match(/Windows Phone ([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^?]+).*rv:([0-9.].)/),
    webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

  /**
   * default RegExp of all apps
   * @type {{wechat: RegExp, qq: RegExp, weibo: RegExp, uc: RegExp, alipay: RegExp, taobao: RegExp, dingtalk: RegExp, xmddapp: RegExp, xmdd: RegExp, xmddmarket: RegExp, xmddshop: RegExp, xmhzproxy: RegExp}}
   */
  const defaultAppRegExp = {
    wechat: /MicroMessenger[/]?([\d.]+)/i,
    qq: /QQ[/]?([\d.]+)/i,
    weibo: /WeiBo(?:(?:__)?[/]?)?([\d.]+)/i,
    uc: /UCBrowser[/]?([\d.]+)/i,
    alipay: /AliApp\(AP[/]?([\d.]+)\)/i,
    taobao: /AliApp\(TB[/]?([\d.]+)\)/i,
    dingtalk: /AliApp\(DingTalk[/]?([\d.]+)\)/i,
    xmdata: /(?:ZQApp\()?XmData[/]?([\d.]+)(?:\))?/i,
    xmbiaozhu: /(?:ZQApp\()?XmBiaozhu[/]?([\d.]+)(?:\))?/i,
  };

  // extend RegExp of apps
  const allAppRegExp = {
    ...defaultAppRegExp,
    ...appRegExp,
  };

  // match RegExp of apps
  const allApp = {};
  for (let oneAppRegExp in allAppRegExp) {
    allApp[oneAppRegExp] = ua.match(allAppRegExp[oneAppRegExp]);
  }

  // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes

  if (webkit) {
    browser.webkit = !!webkit;
    browser.version = webkit[1];
  }

  if (android) {
    os.android = true;
    os.version = android[2];
  }
  if (iphone && !ipod) {
    os.ios = os.iphone = true;
    os.version = iphone[2].replace(/_/g, '.');
  }
  if (ipad) {
    os.ios = os.ipad = true;
    os.version = ipad[2].replace(/_/g, '.');
  }
  if (ipod) {
    os.ios = os.ipod = true;
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  }
  if (wp) {
    os.wp = true;
    os.version = wp[1];
  }
  if (webos) {
    os.webos = true;
    os.version = webos[2];
  }
  if (touchpad) {
    os.touchpad = true;
  }
  if (blackberry) {
    os.blackberry = true;
    os.version = blackberry[2];
  }
  if (bb10) {
    os.bb10 = true;
    os.version = bb10[2];
  }
  if (rimtabletos) {
    os.rimtabletos = true;
    os.version = rimtabletos[2];
  }
  if (playbook) {
    browser.playbook = true;
  }
  if (kindle) {
    os.kindle = true;
    os.version = kindle[1];
  }
  if (silk) {
    browser.silk = true;
    browser.version = silk[1];
  }
  if (!silk && os.android && ua.match(/Kindle Fire/)) {
    browser.silk = true;
  }
  if (chrome) {
    browser.chrome = true;
    browser.version = chrome[1];
  }
  if (firefox) {
    browser.firefox = true;
    browser.version = firefox[1];
  }
  if (firefoxos) {
    os.firefoxos = true;
    os.version = firefoxos[1];
  }
  if (ie) {
    browser.ie = true;
    browser.version = ie[1];
  }
  if (safari && (osx || os.ios || win)) {
    browser.safari = true;
    if (!os.ios) {
      browser.version = safari[1];
    }
  }
  if (webview) {
    browser.webview = true;
  }

  for (let oneApp in allApp) {
    if (allApp[oneApp]) {
      app[oneApp] = true;
      app.version = allApp[oneApp][1];
    }
  }

  os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));

  os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

  return {
    os: os,
    browser: browser,
    app: app
  };
}

export default detect;
