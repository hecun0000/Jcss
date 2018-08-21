# AEDemo

[lottie-web](https://github.com/airbnb/lottie-web)

## start 

- 引入lottie.js

html部分：

```html
<body>
    <div id="bm"> </div>

    <script src='js/lottie.js'></script>
    <script src='js/index.js'></script>

</body>
```

- 进行配置

```js
var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json'
})
```

其中：data.json为用AE导出的动画数据

[参考文章](https://www.cnblogs.com/zamhown/p/6688369.html)