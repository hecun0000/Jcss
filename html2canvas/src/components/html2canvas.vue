<template>
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
</template>

<script>
    import html2canvas from 'html2canvas';

    export default {
        data() {
            return {
                tableData2: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-04",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                ]
            }
                ;
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return "warning-row";
                } else if (rowIndex === 3) {
                    return "success-row";
                }
                return "";
            },
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
        }
    };
</script>

<style>
    .demo {
        padding: 20px;
    }

    .demo .demo-nav {
        margin: 20px 0px;
    }

    .box {
        width: 800px;
    }

    .todo {
        margin-top: 20px;
    }

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>

