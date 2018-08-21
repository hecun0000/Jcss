<template>
    <div class="sku">

        <!--<el-table :data="tableData" stripe size="small" class="skuTable" @cell-mouse-enter="cellMouseEnter" ref="multipleTable" @cell-mouse-leave="cellMouseLeave" :row-class-name="tableRowClassName">-->
        <el-table :data="tableData" size="small" class="skuTable" @cell-mouse-enter="cellMouseEnter" border
                  :span-method="objectSpanMethod" tooltip-effect="light"
                  ref="multipleTable" @cell-mouse-leave="cellMouseLeave" :row-class-name="tableRowClassName">
            <el-table-column
                    v-for="(col,index) in cols" :key="index" width="160px" show-overflow-tooltip
                    :property="col.prop" :label="col.label">
            </el-table-column>
            <el-table-column prop="stock" label="库存" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.stock " class="sku-input" @keyup.native="checkStock(scope.$index)" maxlength="6"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="售价" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.price_original " class="sku-input" maxlength="9"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="packaging_fee" label="状态">
                <template slot-scope="scope">
                    <el-button type="text" @click="del(scope.$index,scope.row)">删除</el-button>
                    <!--<el-input  size="small" v-model="scope.row.packaging_fee "></el-input>-->
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    export default {
        props: {
            skuInfo: {
                type: Array,
                default: [],
            },
            editSkuValue: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                cols: [],
                tableData: [],
                contactArray: [],
                contactDot: '',
                curRowArr: [],
                tableDataIndexArr: [],
            }
        },
        watch: {
            skuInfo: {
                handler(val) {
                    this.computedSku(val);
                },
                deep: true
            },
            tableData: {
                handler(val) {
                    this.$emit('skuResult', val)
                },
                deep: true
            },
            editSkuValue: {
                handler(val) {
                    console.log(val);
                },
                deep: true
            }
        },
        mounted() {
            // console.log(this.editSkuValue);
            if (this.editSkuValue.length > 0) {
                //编辑
                this.editDateShow(this.editSkuValue);
            } else {
                //创建
                this.computedSku(this.skuInfo);
            }

        },
        methods: {
            //验证库存
            checkStock(index) {

                this.tableData[index].stock = this.tableData[index].stock.replace(/[^\.\d]/g, '');
                this.tableData[index].stock = this.tableData[index].stock.replace('.', '');
            },
            editDateShow(data) {
                let ret = data;
                var skuResult = [];
                let col = [];
                for (var i = 0; i < ret.length; i++) {
                    let item = ret[i];
                    var sku = {
                        price_original: (item.price_original) / 100,
                        stock: item.stock,
                        packaging_fee: "",
                        attr_info: []
                    };
                    for (var j = 0; j < ret[i].sku_value.length; j++) {

                        col[j] = {prop: `attr_info[${j}].attr_value`, label: ret[i].sku_value[j].attributeValue};

                        sku.attr_info.push({
                            attributeId: ret[i].sku_value[j].attributeId,
                            attributeValue: ret[i].sku_value[j].attributeValue,
                            attributeValId: ret[i].sku_value[j].attributeValId,
                            attr_value: ret[i].sku_value[j].attr_value
                        });

                    }

                    skuResult.push(sku);
                }
                this.tableData = skuResult;
                this.cols = col;
                this._normalize(skuResult);
            },
            del(index, item) {
                this.tableData.splice(index, 1);
                this.$emit('delSkuItem', item)
                this._normalize(this.tableData)
            },
            addCol() {
                this.cols.push({prop: 'address', label: '地址'})
            },
            computedSku(result) {
                var ret = this.descartes(result);
                var skuResult = [];
                let col = [];
                for (var i = 0; i < ret.length; i++) {
                    var sku = {
                        price_original: "",
                        stock: "",
                        packaging_fee: ""
                    };
                    sku.attr_info = [];
                    for (var j = 0; j < ret[i].length; j++) {

                        col[j] = {prop: `attr_info[${j}].attr_value`, label: ret[i][j].attributeValue};
                        sku.attr_info.push({
                            attributeId: ret[i][j].attributeId,
                            attributeValue: ret[i][j].attributeValue,
                            attributeValId: ret[i][j].attributeValId,
                            attr_value: ret[i][j].attr_value
                        });

                    }

                    skuResult.push(sku);
                }
                this.tableData = skuResult;
                this.cols = col;
                this._normalize(skuResult);
            },
            //笛卡尔积算法
            descartes(list) {
                //parent上一级索引;count指针计数
                var point = {};
                var result = [];
                var pIndex = null;
                var tempCount = 0;
                var temp = [];
                //根据参数列生成指针对象
                for (var index in list) {
                    if (typeof list[index] == 'object') {
                        point[index] = {
                            'parent': pIndex,
                            'count': 0
                        }
                        pIndex = index;
                    }
                }
                //单维度数据结构直接返回
                if (pIndex == null) {
                    return list;
                }
                //动态生成笛卡尔积
                while (true) {
                    for (var index in list) {
                        tempCount = point[index]['count'];
                        temp.push(list[index][tempCount]);
                    }
                    //压入结果数组
                    result.push(temp);
                    temp = [];
                    //检查指针最大值问题
                    while (true) {
                        if (point[index]['count'] + 1 >= list[index].length) {
                            point[index]['count'] = 0;
                            pIndex = point[index]['parent'];
                            if (pIndex == null) {
                                return result;
                            }
                            //赋值parent进行再次检查
                            index = pIndex;
                        } else {
                            point[index]['count']++;
                            break;
                        }
                    }
                }
            },
            _normalize(data) {
                var dataObj = {}
                let result;
                this.cols.forEach((val, $i) => {
                    this.contactArray[$i] = [];
                    result = data.map((item, index) => {

                        //第一行则不做判断
                        if (index === 0) {
                            this.contactArray[$i].push(1);
                            this.contactDot = 0;
                        } else {
                            //判断第二列，

                            //若第一列中，该行数值为0

                            //若为第二行则判断，该列的值和上一列值进行对比
                            let newVal = data[index].attr_info[$i].attributeValId;
                            let last = data[index - 1].attr_info[$i].attributeValId;
                            if (newVal === last) {
                                // console.log('该值和上一个相同')
                                this.contactArray[$i][this.contactDot] += 1;
                                this.contactArray[$i].push(0);
                                //添加第二列验证
                                // console.log($i);
                                if ($i > 0) {

                                }

                            } else {
                                this.contactArray[$i].push(1);
                                this.contactDot = index;
                            }

                        }

                    })
                })

                data.forEach((v, i) => {
                    let firstItem = data[i].attr_info[0].attr_value;
                    // console.log(firstItem);
                    v.rowIndex = i
                    if (dataObj[firstItem]) {
                        dataObj[firstItem].push(i)
                    } else {
                        dataObj[firstItem] = []
                        dataObj[firstItem].push(i)
                    }
                })
                // console.log(dataObj);

                for (var k in dataObj) {
                    if (dataObj[k].length > 0) {
                        this.tableDataIndexArr.push(dataObj[k])
                    }
                }

                return result

            },
            //合并单元格
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                let index = columnIndex;
                if (index == 0) {
                    const _row = this.contactArray[0][rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    // console.log(_col);
                    // console.log(_row);
                    return {
                        rowspan: _row,  //需要合并的列数量
                        colspan: _col    //单元格的宽，若为0就不显示单元格
                    };
                }

                // if (this.cols.length >= 2) {
                //     if (index == 1) {
                //         const _row = this.contactArray[1][rowIndex];
                //         const _col = _row > 0 ? 1 : 0;
                //         // console.log(_col);
                //         // console.log(_row);
                //         return {
                //             rowspan: _row,  //需要合并的列数量
                //             colspan: _col    //单元格的宽，若为0就不显示单元格
                //         };
                //     }
                // }
            },
            // 单元格中的鼠标玉移出事件
            cellMouseLeave(row, column, cell, event) {
                this.curRowArr = [];
            },
            // 单元格中的鼠标玉移入事件
            cellMouseEnter(row, column, cell, event) {
                // console.log(row);
                this.tableDataIndexArr.forEach((arr, i) => {
                    if (arr.indexOf(row.rowIndex) != -1) {
                        this.curRowArr = arr;
                    }
                })

            },
            tableRowClassName({row, rowIndex}) {
                let temArr = this.curRowArr;
                for (let i = 0; i < temArr.length; i++) {
                    if (rowIndex == temArr[i]) {
                        return 'span-method-row-class'
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .skuTable {
        width: 100%;
    }

    .sku-input {
        width: 100px;
    }
</style>
