var request = require('request');
var fs = require('fs');
var path = require('path');
var css = require('css');

function mkdirsSync(dirpath, mode) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp;
    console.log(dirpath)
    console.log(dirpath.split(path.sep))
    dirpath.split(path.sep).forEach(function(dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      }
      else {
        pathtmp = path.join(path.sep, dirname);
      }
      if(pathtmp) {
        if (!fs.existsSync(pathtmp)) {
          if (!fs.mkdirSync(pathtmp, mode)) {
            return false;
          }
        }
      }
    });
  }
  return true;
}

/*
 * url 网络文件地址
 * filename 文件名
 * callback 回调函数
 */
function downloadFile(uri,filename,callback){
  var stream = fs.createWriteStream(filename);
  request(uri).pipe(stream).on('close', callback);
}

var fileUrls = [];
var fileContent = fs.readFileSync(path.resolve(__dirname, 'bank-logo.css'), 'utf-8')
var regExp = /https:\/\/([\w\/\-.]*)/g;
var matches = fileContent.match(regExp);
matches.forEach(function(fileUrl) {
  fileUrls.push(fileUrl);
})

fileUrls.forEach(function(fileUrl) {
  var dir = '2017.5.22';
  var filename = fileUrl.slice(fileUrl.lastIndexOf(path.sep) + 1, fileUrl.length);
  mkdirsSync(path.resolve(__dirname, dir), 0777);
  var filepath = path.resolve(__dirname, path.join(dir, filename));
  downloadFile(fileUrl, filepath, function() {
    console.log(fileUrl, filename + '下载完成');
  })
})
