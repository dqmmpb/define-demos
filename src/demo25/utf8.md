
# UTF-8 编码的诡异问题

汉字”用“

使用[站长工具](http://tools.jb51.net/transcoding/decode_encode_tool)


```
用
\uXXXX  ->  \u7528
\xXX    ->  \xE7\x94\xA8
10进制   ->  29992

⽤
\uXXXX  ->  \u2F64
\xXX    ->  \xE2\xBD\xA4
10进制   ->  12132
```

这两个字符看起来都是中文的“用”

但在浏览器中这两个“用”却有不同的表现，

issue:
```
windows下的chrome对 '\u2F64' 的“用”显示为乱码字符
```
这是为什么呢？

## 问题的解决

参看[Unicode 完整码表](https://blog.csdn.net/hherima/article/details/9045861) 发现
```
其实这两个“用”字是不同的。'\u7528'是汉字的“用”；
而'\u2F64'是“康熙字典部首 (Kangxi Radicals) ”，并不是汉字“用”。
```
这也就解释了为什么在windows下的chrome会显示乱码的原因（暂时只发现windows下的chrome会出现这样的情况），其他浏览器内核和linux下的chrome都不会有这种现象
