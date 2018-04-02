var path = require('path');
var Jimp = require("jimp");

// 本地文件
var localPath = path.resolve(__dirname, './grids.png');
var localOutPath = path.resolve(__dirname, './localOut');
var remoteOutPath = path.resolve(__dirname, './remoteOut');

/* Resize */
// Contain
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.background(0x000000)
    .contain(256, 256)
    .write(path.resolve(localOutPath, "./contain.png"));
});
// Cover
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.cover(256, 256)
    .write(path.resolve(localOutPath, "./cover.png"));
});
// Resize
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.resize(256, 256)
    .write(path.resolve(localOutPath, "./resize.png"));
});
// Scale
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.scale(0.5)
    .write(path.resolve(localOutPath, "./scale.png"));
});
// ScaleToFit
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.scaleToFit(256, 256)
    .write(path.resolve(localOutPath, "./scaleToFit.png"));
});

/* Crop */
// Crop
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.crop(50, 50, 50, 200)
    .write(path.resolve(localOutPath, "./crop.png"));
});

/* Flip and rotate */
// Rotate
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.rotate(90)
    .write(path.resolve(localOutPath, "./rotate.png"));
});

/* Alpha channel */
// fade
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.fade(0.1)
    .write(path.resolve(localOutPath, "./fade.png"));
});
// opacity
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.opacity(0.9)
    .write(path.resolve(localOutPath, "./opacity.png"));
});
// opaque
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.opaque()
    .write(path.resolve(localOutPath, "./opaque.png"));
});

/* Colour */
// brightness
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.brightness(-0.4)
    .write(path.resolve(localOutPath, "./brightness.png"));
});
// contrast
Jimp.read(localPath, function (err, lenna) {
  if (err) throw err;
  lenna.contrast(-0.4)
    .write(path.resolve(localOutPath, "./contrast.png"));
});

// 远程文件
var remotePath = 'https://blog.webkid.io/content/images/old/image-processing-in-javascript/header_fun_effects.png';

// Rotate
Jimp.read(remotePath, function (err, lenna) {
  if (err) throw err;
  lenna.rotate(90)
    .write(path.resolve(remoteOutPath, "./rotate.png"));
});
