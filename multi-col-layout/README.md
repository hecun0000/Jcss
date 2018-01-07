# 多列等高布局  
如此布局也比较常见, 直接上方法:  
- ### 方法一: display:flex;   

这是弹性盒模型中的布局方式, 也比较常用, 但是兼容性不是很好, 需要**IE10**以上, 具体使用在此略过. 

- ### 方法二: 利用伪类元素和text-align:justify  
现有如下的HTML结构:     
```html 
<div class="container">
    <div class="justify">
        <i>1</i>
        <i>2</i>
        <i>3</i>
        <i>4</i>
        <i>5</i>
    </div>
</div>  
```
css属性中text-align:justify通常是实现文本的两端对齐的效果.  
在w3c中, 看到这个属性是全兼容的, 但是要实现两端对齐, 需要在模块之间加上**空格或者tab**, 这样才会起作用.  
那就要在html做一些改动:  
```html 
<div class="container">
    <div class="justify">
        <i>1</i>
        
        <i>2</i>
        
        <i>3</i>
        
        <i>4</i>
        
        <i>5</i>
    </div>
</div>  
```
对应的css如下:  
```css
.justify{
  text-align: justify;
}

.justify i{
  width:24px;
  line-height:24px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
}
```
结果是并没有对齐, 在text-align-last 这个属性，text-align-last 属性规定如何对齐文本的最后一行，并且 text-align-last 属性只有在 text-align 属性设置为 justify 时才起作用。
```css 
.justify{
  text-align: justify;
  text-align-last: justify; // 新增这一行
}

.justify i{
  width:24px;
  line-height:24px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
}
```
[相关的demo](http://hecun0000.github.io/css/multi-col-layout/text-align.html)   
**兼容性: ie8+** 只要受到text-align-last属性的影响.  
接下来用伪类元素, 想办法去替换上面的text-align-last属性.   
只改变css:  
```css 
.justify{
  text-align: justify;
}

.justify i{
  width:24px;
  line-height:24px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
}

.justify:after {
  content: "";
  display: inline-block;
  position: relative;
  width: 100%;
}
```
[相关demo](http://hecun0000.github.io/css/multi-col-layout/text-align+after.html)  
再多配合几句 hack 代码，可以实现兼容到 IE6+ 
