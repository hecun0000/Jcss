
function Compile(el,vm) {
    this.$vm = vm;
    //判断el是不是元素节点
    this.$el = this.isElementNode(el)? el: document.querySelector(el);

    if(this.$el){
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}


Compile.prototype = {
    init:function(){
        this.compileElement(this.$fragment);
    },
    compileElement:function(el){
        let childNodes = el.childNodes,me = this;

        [].slice.call(childNodes).forEach(node => {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if(me.isElementNode(node)){
            //    编译指令
                me.compile(node);
            }else if(me.isTextNode(node)&& reg.test(text)){
                me.compileText(node,RegExp.$el)
            }

            // 判断是不是有子节点
            if(node.childNodes&&node.childNodes.length){
                me.compileElement(node)
            }
        });

    },
    // 编译双大括号
    compileText:function(node,exp){
        compileUtil.text(node,this.$vm,exp);
    },
    compile:function(){

    },

    node2Fragment:function(el){
        let fragment = document.createDocumentFragment(), child;

        while (child = el.firstChild) {
            fragment.appendChild(child)
        }

        return fragment;
    },
    isElementNode:function (node) {
        return node.nodeType == 1;
    },
    isTextNode:function(node){
        return node.nodeType == 0;
    },
    isDirective:function(attr){
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function(dir){
        return dir.indexOf('on') == 0;
    },
    // 获取data中的值
    _getVMVal:function(vm,exp){
        let val  = vm._data;
        exp = exp.split('.');
        exp.forEach((k)=>{
            val = val[k]
        });
        return val;
    }
}

let compileUtil =  {
    text:function(node,vm,exp) {
        this.bind(node,vm,exp,'text');
    },
    html:function(node,vm,exp) {
        this.bind(node,vm,exp,'html');
    },
    model:function(node,vm,exp) {
        this.bind(node,vm,exp,'model');

        var me = this, val = this._getVMVal(vm,exp);

        node.addEventListener('input',function(e){
            
            var  newValue = e.target.value;
            if(val == newValue){

            }
        })
    },
    bind:function(node,vm,exp,dir){
        let updateFn = updater[dir+'Updater'];

        updateFn && updateFn(node,this._getVMVal(vm,exp));

        new Watcher(vm,exp,function(value,oldValue){
            updateFn && updateFn(node,value,oldValue);
        })
    },

}

var updater  = {
    textUpdater: function(node,value){
        node.textContent = typeof value == 'undefined'?'':value;
    },
    htmlUpdater: function(node,value){
        node.innerHTML= typeof value == 'undefined'?'':value;
    },
    classUpdater:function(node,value,oldValue){
        let className = node.className;
        className = className.replace(oldValue,'').replace(/\s$/,'');

        let space = className && String(value)?' ':'';
        node.className = className+space+value;
    },
    modelUpdater:function(node,value,oldValue){
        node.value = typeof value == 'undefined'?'':value;
    }
}