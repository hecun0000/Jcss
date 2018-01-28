# css--background AND border
## 半透明边框   
假设, 我们想给一个容器设置一个白色的背景和一道透明的白色边框, body的背景会从它的半透明的边框上透过来;  
![image](http://oxi9lrcsm.bkt.clouddn.com/背景.png)
css如下:   
```
border: 10px solid hsla(0,0%,100%,.5);
background: #fff;
background-clip: padding-box;
```
详细代码可查看: background1.html  

**padding-box:** 在默认情况下, 背景会延伸到边框的区域下层. 如果我们不希望背景入侵到边框的所在范围内就是把它的值设置为padding-box. 

## 多重边框  

### box-shadow
在box-shadow中, 第四个参数(扩张半径), 通过指定正值或负值, 可以让投影的面积增大或减小. 
```
background: yellowgreen;
box-shadow: 0 0 0 10px #655;
```
上面的效果可以实现border的效果, 同时box-shadow的好处, **支持逗号分隔语法, 可以创建任意数量的投影**. 
```
box-shadow: 0 0 0 10px #655, 0 0 0 15px deepink;
```
注意事项:  
- 投影的行为和边框不完全一致, 它不会影响布局, 也不会受到box-sizing的影响, 不过我们可以通过外边距或内边距来模拟所需要的空间. 
- 它们不会相应鼠标事件, 如果这一点非常重要, 则需在box-shadow加入inset属性, 将应绘制在内圈里面, 在通过内边距腾出空间.

### outline 方案
当我们只需要两层的边框, 那就可以先设置一层常规的边框, 在加上outline(描边)来产生外层的边框. 也可以方便的制造出虚线的效果. 
css: 
```
border: 10px solid #655;
outline:  5px solid deeppink;
```
同时, 可以通过**outline-offset**属性来控制它跟元素之间间距. 这个属性也可以接受负值.  
注意事项:   
- 只适用于双层边框的情况. 
- 边框不一定贴合与border-radius属性产生的圆角. 

## 灵活的背景定位  
### background-position  
> 它允许我们指定背景图片距离任意角的偏移量, 只要我在偏移量前面指定相应的关键字.   

```
background-position: right 20px bottom 10px;
```
### background-origin  
在默认情况下, background-position是以padding-box为主的. 我们可以通过 background-origin修改, 属性值有padding-box(默认值), content box, border-box.

```
padding: 10px;
background: yellowgreen url(./57114102_p0.jpg) right bottom no-repeat;
background-origin: content-box;
```

### calc()方案  
```
background-position: calc(100% - 20px) calc(100% - 10px);
```

## 边框内圆角