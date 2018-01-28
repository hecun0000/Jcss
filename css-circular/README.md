# css动画---环形平移的动画  
> 在网上我们经常会看到一些环形的动画, 感觉很炫酷, 那怎么用css来实现呢!   

## 简单的开始  
首先, 我们先做个小例子, 让用户头像图片沿着环形录井动起来,   
html:   
```html 
<div class="path">
	<img src="./57114102_p0.jpg" class="avatar">
</div>
```
初步样式如图:   
![image](http://oxi9lrcsm.bkt.clouddn.com/环形平移.png)  
接下来, 就该考虑动画了.  
我们希望头像可以沿着行业大圆以转圈的方式进行移动. 这个时候我们可能会想到下面的代码:   
```css
.path .avatar {
	animation: spin 3s infinite linear;
	transform-origin : 50% 100px;
	/*100px 为路径的半径*/
}
@keyframes spin {
	to { transform: rotate(1turn); }
}
```
虽然旋转的效果是做出来了, 它不仅是沿着环形在旋转, 而且头像本身还会自身旋转, 在一定程度上会影响可读性. 因此, 我们希望它只是沿着环形在旋转, 同时, 保持自己本来的朝向.  

## 利用两个元素来解决  
思路: 利用两层元素做相反的运动, 然后"负负得正", 得到我们想要的结果.  
下来, 修改代码:  
html:  
```html
<div class="wai">
	<div class="path">
		<img src="./57114102_p0.jpg" class="avatar">
	</div>
</div>
```
css:  
```css
.wai,.path{
	width: 200px;
	height: 200px;
	background: yellow;
	border-radius: 50%;
	text-align: center;
}
.path{
	animation: spin 3s infinite linear;
	transform-origin : 50% 100px;
}
.path .avatar {
	width: 50px ;
	height: 50px;
	border-radius: 50%;
	animation: inherit;
	animation-name: spin-reverse;
}
@keyframes spin {
	to { transform: rotate(1turn); }
}
@keyframes spin-reverse {
	from { transform: rotate(1turn); }
}
```
效果已经实现了, 下来简化代码.
css:  
```css
.path .avatar {
	animation: inherit;
	animation-direction: reverse;
}
@keyframes spin {
	to { transform: rotate(1turn); }
}
```
这样只用了一个动画函数来解决问题, 但是还有别的问题, 外面套上了一层额外的元素.  
## 单个元素的解决方案  
> 每个transform-origin都是可以被两个translate()模拟出来  

下面两段代码的效果其实是一样的: 
```css
transform : rotaote(30deg);
transform-origin: 200px 300px;

transfrom: translate(200px 300px)
            rotate(30deg)
            translate(-200px, -300px);
transfrom-origin: 0 0;
```

