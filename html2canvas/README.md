# html2canvas

## 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 所用插件

[html2canvas](https://github.com/niklasvh/html2canvas)

### 基本用法

html部分:
```html
<div id="capture" style="padding: 10px; background: #f5da55">
    <h4 style="color: #000; ">Hello world!</h4>
</div>
```
js部分：
```js
html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
});
```
## 上手
思路：
- 利用html2canvas将前端静态页面转化成canvas；
- 利用canvas里面的toDataURL方法会将canvas内容转化为base64的数据；
- 结合，a标签的download属性，完成图片的下载


本次采用vue+element;

1. 首先，简单写点样式：

```html
<div class="demo">
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="demo-nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData2" :row-class-name="tableRowClassName">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>

        <div class="todo">
            <el-button type="primary" @click="save">保 存</el-button>
        </div>
    </div>
</div>
```
2. 利用html2canvas生成图片

> 利用官网的方式，生成图片会使得照片变得模糊。  

解决方式：
- 先创建一个canva，使其的宽高放大，设置缩放
- 关闭canvas中的抗锯齿


```js
save() {
    let cntElem = document.querySelector('.demo');
    var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
    };

    html2canvas(shareContent, opts).then((canvas) => {

        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        this.saveAs(canvas.toDataURL());

    });
}
```

3. 利用a标签完成下载功能

直接调用就可以了。
```js
 //利用a标签实现下载
saveAs(obj, fileName) {
    var tmpa = document.createElement("a");
    tmpa.download = fileName || "下载图片";
    tmpa.href = obj; //绑定a标签
    tmpa.click(); //模拟点击实现下载
    setTimeout(function () { //延时释放
        URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
},
```

## 遗留问题:
- 关于图片跨域的问题。
- Invalid value given for Length: "auto" 报错问题 [issues相关链接](https://github.com/niklasvh/html2canvas/issues/1514)