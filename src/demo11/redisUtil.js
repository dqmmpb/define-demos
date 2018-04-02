/**
 * Created by alphabeta on 17-11-12.
 */

var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');

// redis 链接错误
client.on("error", function (error) {
  console.log(error);
});

// redis 验证 (reids.conf未开启验证，此项可不需要)
client.auth("123456");

client.select('0', function (error) {
  if (error) {
    console.log(error);
  } else {
    client.keys("*", function (error, res) {
      if (error) {
        console.log(error);
      } else {
        console.log(res);
      }

      // 关闭链接
      client.quit();
    });

  }
});
