<template>
    <div style="margin-bottom: 50px">
        <div id="toolbar">
            <!-- Add font size dropdown -->
            <select class="ql-size" title="标题样式">
                <option value="small"></option>
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
            <select class="ql-header" title="标题样式">
                <option value="1"></option>
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
                <option selected></option>
            </select>
            <!-- Add a bold button -->
            <button class="ql-bold" title="粗体"></button>
            <button class="ql-italic" title="斜体"></button>
            <button class="ql-underline" title="下划线"></button>
            <button class="ql-strike" title="删除线"></button>
            <!-- <button class="ql-italic"></button> -->
            <button class="ql-list" value="ordered" title="有序列表"></button>
            <button class="ql-list" value="bullet"  title="无序列表"></button>

            <!-- Add subscript and superscript buttons -->
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>

            <button class="ql-indent" value="-1"></button>
            <button class="ql-indent" value="+1" title="首行缩进"></button>
            <select class="ql-color" title="字体颜色"> </select>
            <select class="ql-align" title="对齐方式"> </select>
            <button class="ql-image" title="添加图片"></button>
        </div>

        <quill-editor :style="{width:width,height:height}"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
        </quill-editor>
        <el-upload class="uploader" action="//upload.qiniup.com" :data="form" :show-file-list="false" :on-error="handleError"  ref="upload"
                   :on-success="handleSuccess" :before-upload="beforeUpload">
            <el-button size="small" type="primary" id="imgInput">点击上传</el-button>
        </el-upload>


    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import * as Quill from 'quill'
    import getUpToken from '@/api/getUpToken'
    import {Loading} from 'element-ui';
    import moment from 'moment'

    import { quillEditor } from 'vue-quill-editor'
    // import Quill from 'quill'
    export default {
        name: "editor-vue",
        data() {
            return {
                editorOption: {
                    modules: {
                        // toolbar: [
                        //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        //     [{'list': 'ordered'}, {'list': 'bullet'}],
                        //     [{'script': 'sub'}, {'script': 'super'}],
                        //     [{'indent': '-1'}, {'indent': '+1'}],
                        //     [{'direction': 'rtl'}],
                        //     [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        //     [{'color': []}],
                        //     [{'align': []}],
                        //     ['image']
                        // ]
                        toolbar: '#toolbar'
                    },
                    placeholder: '请在此处编辑商品详情',
                },
                imageUrl: '',
                form: {
                    key: '',
                    token: ''
                },
                addRange:[]
            }
        },
        props: {
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            },
            editDetail:{
                type:String,
                default:''
            }
        },
        watch:{
            editDetail(val){
                if(val!=''){
                    //将请求回来的HTML插入到编辑器中
                    this.$refs.myQuillEditor.quill.clipboard.dangerouslyPasteHTML(val);
                    //获取HTML的长度
                    let length =  this.$refs.myQuillEditor.quill.getLength();
                    //将光标移到最后
                    this.$refs.myQuillEditor.quill.setSelection(length);
                }
            }
        },
        methods: {
            onEditorChange({editor, html, text}) {
                this.$emit('getEditorHtml',html)
            },
            onEditorFocus() {

            },
            onEditorReady() {

            },
            onEditorBlur() {

            },
            //图片上传成功
            handleSuccess(res, file) {
                Loading.service({}).close();
                this.$message.success('图片上传成功')
                this.imageUrl = res.domain + res.truekey;
                this.$emit('getImgUrl',this.imageUrl);
                let vm = this
                let url = this.imageUrl;
                if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
                    let value = url
                    // API: https://segmentfault.com/q/1010000008951906
                    // this.$refs.myTextEditor.quillEditor.getSelection();
                    // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
                    vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
                    let index = vm.addRange !== null ? vm.addRange.index : 0;
                    vm.$refs.myQuillEditor.quill.insertEmbed(index, 'image', value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
                    vm.$refs.myQuillEditor.quill.setSelection(index + 1, 0)
                } else {
                    this.$message.error(`${vm.uploadType}插入失败`)
                }
                this.$refs.upload.clearFiles() // 插入成功后清除input的内容

            },
            //图片上传之前
            beforeUpload(file) {
                Loading.service({ fullscreen: true, text: '图片上传中' });
                let splitArray = file.name.split('.');
                let current = moment().format('YYYYMMDD').toString(),
                    prefix = moment(file.lastModified).format('HHmmss').toString(),
                    suffix = new Date().getTime() + '.' + splitArray[splitArray.length - 1 ],
                    key = encodeURI(`${current}/${prefix}_${suffix}`);
                return getUpToken({ key }).then(res => {
                    this.form = {
                        key: key,
                        token: res.data.uptoken
                    }
                }).catch(() => {
                    Loading.service({}).close();
                    this.$message.error('上传图片失败')
                })
            },
            //图片上传失败
            handleError(){
                Loading.service({}).close();
                this.$message.error('上传图片失败')
            },
            imgHandler(){
                document.getElementById('imgInput').click();
            }
        },
        mounted(){
            this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler)
        },
        components: {quillEditor},
    }
</script>

<style scoped>
.uploader {
    display: none;
}

    #toolbar {
    border-bottom: 0;
}
</style>
