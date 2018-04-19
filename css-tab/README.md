# 纯css实现Tab导航切换　　

使用纯css的方式, 不用js  
实现 Tab 切换的难点在于如何使用 CSS接收到用户的点击事情并对相关的节点进行操作。

- ### 方法一: 利用:target伪类元素  
> :target伪类元素的介绍: 该元素是css3新增的一个元素, URL 带有后面跟有锚名称 #，指向文档内某个具体的元素。这个被链接的元素就是目标元素(target element)。:target 选择器可用于选取当前活动的目标元素。  　　

兼容性:IE9版本以上　  
首先要使用:target, 需要html锚点, 以及锚点对应的html片段, 所以html代码如下:  
```html
<ul class='nav'>
    <li><a href="#frist">列表一</a></li>
    <li><a href="#second">列表二</a></li>
</ul>
<div id="frist">列表1内容:123456</div>
<div id="second">列表2内容:abcdefgkijkl</div>

```
然后使用:target接受点击事件, 修改DOM
```css
#frist,#second{
    display: none;
}
#frist:target,#second:target{
    display: block;
}
```
然而基本效果得以实现, 开始时标签里面的内容都为隐藏, 点击li元素后内容显示, 接下来要做的就是实现点击的同时实现对应li的样式切换, 这里我们只能用到css3的后代选择器来实现, 所以要更改一下html的代码:    
```html
<div id="frist">列表1内容:123456</div>
<div id="second">列表2内容:abcdefgkijkl</div>
<ul class='nav'>
    <li><a href="#frist">列表一</a></li>
    <li><a href="#second">列表二</a></li>
</ul>
```
对应的css样式切换如下:   
```css
#frist:target ~ .nav li:first-child{
    background:#ff7300;
    color:#fff;
}
#second:target ~ .nav li:last-child{
    background:#ff7300;
    color:#fff;
}
```
基本方法与思路已经实现, 下来就是小的修补: 

[对应的demo可点击查看](http://hecun.tech/Jcss/css-tab/tab-target.html)

- ### 方法二：input type="radio" && label for=""  

上面的方法利用a标签添加锚点的方法接受点击的事件, 其次还有拥有checked的表单元素, input type="radio" 或者 input type="checkbox"。  

通常在点击切换tab的时候,点击的时li元素而不是表单元素, 此时就应该用到label元素. 
```html
<input class="nav1" id="li1" type="radio">

<ul class='nav'>
    <li><label for="li1">列表1</label></li>
</ul>  
```
**简单思路**: 利用label元素的for属性绑定表单元素, 然后对应的表单元素触发checked, 最后利用checked通过后代选择器来改变对应元素的样式.  
整个过程中表单元素只是接受checked的. 并没有其他的作用, 我们需要设置为不可见: 
```css
input{
    display:none;
}
```
[对应的demo可点击查看](http://hecun.tech/Jcss/css-tab/tab-input.html)
