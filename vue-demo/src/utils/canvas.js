const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
let ball = [];
class CanvasMouse {
  constructor(opts) {
    this.opts = opts;
    this.ctx = opts.ctx;

    this.init()
    setTimeout(this.draw(),3000)
  }


  init() {
    this.render(this.ctx);
  }

  /**
   * 绘制粒子
   * @param ctx
   */
  render(ctx) {



    let randomIndex = ~~this.random(0, colors.length);

    let x = this.opts.x;
    let y = this.opts.y;
    let R = this.random(5, 35);
    let color =colors[randomIndex]

    ball.push({
      x:x,
      y:y,
      R:R,
      color:color
    })

    console.log(ball);

    this.draw()
    // this.init()

  }

  draw(){
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.opts.wW, this.opts.wh);
    ctx.beginPath();

    ball.map((v,i)=>{
      ctx.arc(v.x, v.y, v.R, 0, 2 * Math.PI);
      ctx.fillStyle = v.color;

    })
    ctx.closePath();
    ctx.fill();
    this.update()





  }

  update(){
    ball.map((v,i)=>{
      v.x+=10;
      v.y+=10;
    });

    this.draw()


  }

  /**
   * 生成随机数
   * @param min  最小值
   * @param max  最大值
   * @returns {*} 随机数
   */
  random(min, max) {
    return min + Math.random() * (max - min)
  }


}


export default CanvasMouse
