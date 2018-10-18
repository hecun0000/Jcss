
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
        let childNode = el.childNodes;

    },

    node2Fragment(el){
        let fragment = document.createDocumentFragment(), child;

        while (child = el.firstChild) {
            fragment.appendChild(child)
        }

        return fragment;
    },
    isElementNode:function (node) {
        return node.nodeType == 1;
    }
}