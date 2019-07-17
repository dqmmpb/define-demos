const url = require('url');
const http = require('http');
const sizeOf = require('image-size');

const imgUrl = 'http://pm.izaiqi.com/music/000006_interval_100.jpg';

const options = url.parse(imgUrl);
http.get(options, function (response) {
  const chunks = [];
  response.on('data', function (chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    const buffer = Buffer.concat(chunks);
    const dimensions = sizeOf(buffer);
    console.log(dimensions);
  });
});
