const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // The gathered artifacts are typically removed as they can be quite large (~50MB+)
      delete results.artifacts;
      return chrome.kill().then(() => results)
    });
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects']
};

// Usage:
launchChromeAndRunLighthouse('http://www.xiniudata.com/search/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD', opts).then(results => {
  // Use results!
});
