var path = require('path');
var Caman = require('caman').Caman;
var Canvas = require('canvas');

var crop = require('./plugins/crop.js');

// 本地文件
var localPath = path.resolve(__dirname, './grids.png');
var localOutPath = path.resolve(__dirname, './localOut');
var remoteOutPath = path.resolve(__dirname, './remoteOut');

Caman.DEBUG = true;

Caman(localPath, function () {
  // 亮度
  this.brightness(40);

  this.render(function () {
    this.save(path.resolve(localOutPath, './brightness-40.png'));
  });
});

Caman(localPath, function () {
  // 旋转
  this.rotate(90);

  this.render(function () {
    this.save(path.resolve(localOutPath, './rotate-90.png'));
  });
});

Caman(localPath, function () {
  // 曝光
  this.exposure(-10);

  // 新的layer
  this.newLayer(function () {
    // 混合模式
    this.setBlendingMode("multiply");
    // 图层透明度
    this.opacity(80);
    // 图层颜色
    this.fillColor('#000');
    // 复制Parent
    this.copyParent();
  });

  this.clip(20);

  this.render(function () {
    this.save(path.resolve(localOutPath, './exposure-layoer.png'));
  });
});

Caman(localPath, function () {
  // 修改大小
  this.resize({
    width: 500,
    height: 300
  });

  this.render(function () {
    this.save(path.resolve(localOutPath, './resize-500x300.png'));
  });
});

Caman(localPath, function () {
  // 裁剪 width,height,x,y
  this.crop(50, 30, 50, 200);

  this.render(function () {
    this.save(path.resolve(localOutPath, './crop-w50-h30-x50-y200.png'));
  });
});

// Caman(localPath, function () {
//   // 通道
//   this.channels({
//     red: 10,
//     green: -5,
//     blue: 2
//   });
//
//   this.render(function () {
//     this.save(path.resolve(localOutPath, './channels.png'));
//   });
// });

// Caman(localPath, function () {
//   // 修剪
//   this.clip(20);
//
//   this.render(function () {
//     this.save(path.resolve(localOutPath, './clip-20.png'));
//   });
// });

// 远程文件
var remotePath = 'https://blog.webkid.io/content/images/old/image-processing-in-javascript/header_fun_effects.png';

Caman(remotePath, function () {
  this.rotate(90);
  this.render(function () {
    this.save(path.resolve(remoteOutPath, './rotate-90.png'));
  });
});
