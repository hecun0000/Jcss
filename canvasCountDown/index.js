
var canvasWidth = document.documentElement.clientWidth || document.body.clientWidth;
var canvasHeight = (document.documentElement.clientHeight || document.body.clientHeight) -200;
var R= 8;
var MARGIN_TOP= 60;
// var MARGIN_LEFT= 250;
var curShowTimeSeconds = 0;
const endTime = new Date(2018, 1, 16, 0, 0, 0);
var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function(){
    
    MARGIN_LEFT = canvasWidth/2-52*(R+1);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //定时器方法
    // setInterval(function () {
    //     render(ctx);
    //     update();
    // },50)
    animation();

}

function animation(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    render(ctx);
    update();
    window.requestAnimationFrame(animation);
}
function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 60 / 60 % 24, 10);
    var nextMinutes = parseInt(nextShowTimeSeconds / 60 % 60, 10);
    var nextSeconds = parseInt(nextShowTimeSeconds % 60, 10);
  
    var curHours = parseInt(curShowTimeSeconds / 60 / 60 % 24, 10);
    var curMinutes = parseInt(curShowTimeSeconds / 60 % 60, 10);
    var curSeconds = parseInt(curShowTimeSeconds % 60, 10);

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(curHours / 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
        
    }

    updateBalls();

}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        var y1 = balls[i].y;
        if (balls[i].y >= canvasHeight - R) {
            balls[i].y = canvasHeight - R;
            balls[i].vy = - balls[i].vy * 0.5;
            var y2 = balls[i].y;
            if (Math.abs(y1 - y2)< 1*R){
                balls.splice(i, 1);
            }
        }

    }

}
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++){
        for (var j = 0; j < digit[num][i].length; j++){
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (R + 1) + (R + 1),
                    y: y + i * 2 * (R + 1) + (R + 1),
                    g: 2 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 6,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }

                balls.push(aBall)
            }
        }
    }
}
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000)
    return ret >= 0 ? ret : 0;
}


function render(ctx){

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    var days = parseInt(curShowTimeSeconds / 60 / 60 / 24, 10); //计算剩余的天数 
    document.getElementById("day").innerHTML= days;
    var hours = parseInt(curShowTimeSeconds / 60 / 60 % 24, 10); //计算剩余的小时 
    var minutes = parseInt(curShowTimeSeconds  / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(curShowTimeSeconds  % 60, 10);//计算剩余的秒数 

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+15*(R+1),MARGIN_TOP,parseInt(hours%10),ctx);
    renderDigit(MARGIN_LEFT+30*(R+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (R + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);
    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
    }
}

function renderDigit(x,y,num,ctx){
    ctx.fillStyle="#9966cc";
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j]===1){
                ctx.beginPath();
                ctx.arc(x + j * 2 * (R + 1) + (R + 1), y + i * 2 * (R + 1) + (R + 1),R, 0,2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
            
        }
        
    }
}