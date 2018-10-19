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
    import downloadImage  from "../utils/download.js";

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

            save() {
                new downloadImage('.box','小程序二维码').save();
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

