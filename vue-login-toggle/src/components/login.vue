<template>
    <div class="account">
        <div class="container">
            <div class="content">
                <h2 class="title">登录</h2>    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            toForget:false,
            toForgetCLass:'hide',
            blockStatus:false
        }
    },
    methods:{
        forget(){
            
        }
    }
}
</script>



<style scoped>
.account{
    width: 100%;
    height:100%;
    background: #B9887D;
    position: absolute;
}
.account .container {
    position: absolute;
    width: 400px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    
}



</style>
