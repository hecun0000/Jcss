import html2canvas from 'html2canvas';

class downloadImage {
    constructor(query, fileName) {
        this.$el = document.querySelector(query);
        this.fileName = fileName || "下载图片";
    }
    save() {
       let shareContent = this.$el; //需要截图的包裹的（原生的）DOM 对象
       let width = shareContent.offsetWidth; //获取dom 宽度
       let height = shareContent.offsetHeight; //获取dom 高度
       let canvas = document.createElement("canvas"); //创建一个canvas节点
       let scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
       let opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: false, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true // 【重要】开启跨域配置
        };

        html2canvas(shareContent, opts).then((canvas) => {

           let context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            this.saveAs(canvas.toDataURL());
        });
    }

    //利用a标签实现下载
    saveAs(obj) {
       let tmpa = document.createElement("a");
        tmpa.download = this.fileName;
        tmpa.href = obj; //绑定a标签
        tmpa.click(); //模拟点击实现下载
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    }
}
    
export default downloadImage;