// 远程文件
var remotePath = 'https://blog.webkid.io/content/images/old/image-processing-in-javascript/header_fun_effects.png';

Caman.DEBUG = ('console' in window);

Caman('#image-id', function () {
  this.brightness(5).render();
  // this.render(function () {
  //   alert("Done!");
  //   //this.save(path.resolve(remoteOutPath, './rotate-90.png'));
  // });
});
