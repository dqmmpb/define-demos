'use strict';

const {Image} = require('canvas');
const fs = require('fs');

const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = error => reject(error);
    image.src = url;
  });
};

const imageUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536514169918&di=f2bf10ade68e2485bc703a04a456f048&imgtype=0&src=http%3A%2F%2Fpic.xiudodo.com%2Ffigure%2F00%2F00%2F33%2F16%2F73%2F1655bda6abbcd26.jpg';
preloadImage(imageUrl).then(image => {
  console.log(image._source);
  fs.writeFile(__dirname + '/preloadImage.jpg', image._source, function(err) {
    console.log(err);
  });
}, error => {
  console.log(error);
});

