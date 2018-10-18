/****
 * 类似于vued的构造函数
 * @param options
 * @constructor
 */
function MVVM(options) {
    //将配置对象保存到vm
    this.$options = options;
    //将data对象保存到vm和变量data中
    let data = this._data = this.$options.data;
    //记录this
    let that  = this;
    //遍历data中的属性
    Object.keys(data).forEach((key)=>{
        that._proxy(key)
    })







}

MVVM.prototype= {
    //实现数据代理
    _proxy: function (key) {
        let that = this;
        //给vm添加指定名称的属性（使用属性描述符）
        Object.defineProperty(that,key,{
            configurable:false, //不能重新定义
            enumerable:true,    //可以枚举遍历
            // 当通过vm.xxx读取属性值调用时， 从data中获取对应的属性值返回，  代理读操作
            get:function peoxyGetter() {
                return that._data[key];
            },
            //当通过vm.xxx = value时，
            set:function proxySetter(newVal) {
                that._data[key] = newVal;
            }
        })
    }
}

