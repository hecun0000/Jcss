"use strict";
$(function () {
    // 移动端手势
    var EventUtil = {
        addHandler: function addHandler(element, type, handler) {
            if (element.addEventListener) element.addEventListener(type, handler, false);
            else if (element.attachEvent) element.attachEvent("on" + type, handler);
            else element["on" + type] = handler;
        },
        removeHandler: function removeHandler(element, type, handler) {
            if (element.removeEventListener) element.removeEventListener(type, handler, false);
            else if (element.detachEvent) element.detachEvent("on" + type, handler);
            else element["on" + type] = handler;
        },
        /**
         * 监听触摸的方向
         * @param target            要绑定监听的目标元素
         * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为
         * @param rightCallback     向右滑动的监听回调
         * @param leftCallback      向左滑动的监听回调
         */
        listenTouchDirection: function listenTouchDirection(target, isPreventDefault, rightCallback, leftCallback) {
            this.addHandler(target, "touchstart", handleTouchEvent);
            this.addHandler(target, "touchend", handleTouchEvent);
            this.addHandler(target, "touchmove", handleTouchEvent);
            var startX;
            var startY;

            function handleTouchEvent(event) {
                switch (event.type) {
                    case "touchstart":
                        startX = event.touches[0].pageX;
                        startY = event.touches[0].pageY;
                        break;
                    case "touchend":
                        var spanX = event.changedTouches[0].pageX - startX;
                        var spanY = event.changedTouches[0].pageY - startY;

                        if (Math.abs(spanX) > Math.abs(spanY)) {
                            //认定为水平方向滑动
                            if (spanX > 30) {
                                //向右
                                if (rightCallback) rightCallback();
                            } else if (spanX < -30) {
                                //向左
                                if (leftCallback) leftCallback();
                            }
                        }
                        break;
                    case "touchmove":
                        //阻止默认行为
                        if (isPreventDefault) event.preventDefault();
                        break;
                }
            }
        }
    };

    var $bannerUl = $("#banner>ul.banner-img");
    var $bannerLink = $("#banner>ul.ui-pages-link");
    var ul = $bannerUl[0];
    var left = $("#banner>a.ui-left")[0];
    var right = $("#banner>a.ui-right")[0];
    var buttons = $("#banner>ul.ui-pages-link>li");
    var imgHeight = $("#banner>ul.banner-img img").height();

    $("#banner").height(imgHeight);
    var width = $("#banner").width();
    $bannerUl.css({
        left: -width,
        width: width * 5
    });

    $("#banner>ul.banner-img>li").css({
        width: width
    });
    var index = 1;
    var timer1 = 0;
    // 下一页按钮
    right.onclick = function () {
        next();
    };

    function next() {
        var timer2 = new Date().getTime();
        if (timer2 - timer1 > 300) {
            if (ul.style.left == "-" + width * 2 + "px") {
                setTimeout(function () {
                    ul.style.transition = "";
                    ul.style.left = 0;
                }, 300);
            }
            index >= 3 ? index = 1 : index++;
            ul.style.transition = " all .3s linear";
            ul.style.left = parseInt(ul.style.left) - width + "px";
        }
        showButton(index);
        timer1 = new Date().getTime();
    }
    // 定时器自动轮播
    var timer = setInterval(function () {
        right.onclick();
    }, 3000);
    var timer3 = 0;
    // 上一页按钮
    left.onclick = function () {
        prev();
    };

    function prev() {
        var timer4 = new Date().getTime();
        if (timer4 - timer3 > 300) {
            if (ul.style.left == "0px") {
                setTimeout(function () {
                    ul.style.transition = "";
                    ul.style.left = -width * 2 + "px";
                }, 300);
            }
            index > 1 ? index-- : index = 3;
            ul.style.transition = " all .3s linear";
            ul.style.left = parseInt(ul.style.left) + width + "px";
        }
        timer3 = new Date().getTime();
        showButton(index);
    }
    // 鼠标移入轮播图中
    var banner = document.getElementById("banner");
    banner.onmouseover = function () {
        clearInterval(timer);
    };
    // 两秒切换一次
    banner.onmouseout = function () {
        timer = setInterval(function () {
            right.onclick();
        }, 2000);
    };
    // 移动端手势, 左滑加右滑
    EventUtil.listenTouchDirection(document, true, prev, next);

    function showButton(index) {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'hover') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'hover';
    }

    var _loop = function _loop(i) {
        buttons[i].onclick = function () {
            if (this.className == 'hover') {
                return;
            }
            ul.style.left = -width * (i + 1) + "px";
            if (i == 2) {
                ul.style.left = 0;
            }
            index = i + 1;
            showButton(index);
        };
    };

    for (var i = 0; i < buttons.length; i++) {
        _loop(i);
    }

    //这个在谷歌浏览器会有跨域请求报错 
    $.ajax({
        url: './js/info.json',
        type: 'GET',
        dataType: 'json',
        success: function success(data) {
            var info = data.info;
            var anli = data.anli;
            var html = "";
            for (var i = 0; i < info.length; i++) {
                html += "\n                <div class=\"item  col-4 col-sm-4 col-md-2\">\n                    <i class=\"icon\"></i>\n                    <p class=\"title\">" + info[i].title + "</p>\n                </div>\n                ";
            }
            $(".info").html(html);

            var anliHtml = "";
            for (var _i = 0; _i < anli.length; _i++) {

                if (_i > anli.length - 3) {
                    anliHtml += "\n                    <li class=\"col-4 col-sm-3 d-none d-sm-block\">\n                        <img src=\"" + anli[_i].src + "\" alt=\"\">\n                    </li>\n                ";
                } else {
                    anliHtml += "\n                    <li class=\"col-4 col-sm-3\">\n                        <img src=\"" + anli[_i].src + "\" alt=\"\">\n                    </li>\n                ";
                }
            }
            $(".anli").html(anliHtml);
        }
    });
});