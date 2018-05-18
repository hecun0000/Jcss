<template>
  <div class="login">
      <div class="header">
          <div>
               <img src="http://static.ledouya.com/FnPBS_l8Oqgp9r967KRhcFIm6XSe?imageMogr2/auto-orient" alt="乐店云-小程序商城-新零售解决方案-乐店云logo">
          </div>
      </div>
        <div class="main">
             <div class="container">
                <!-- 环形动画 -->
                <div class="circle">
                    <div class="path1">
                        <div class="item1"></div>    
                    </div>
                    <div class="border1"></div>
                    <div class="path2">
			            <div  class="item2"></div>
		            </div>
                     <div class="border2"></div>
                </div>
                <div class="content">
                    <div class="left">

                    </div>
                    <div class="right">
                        <carousel></carousel>
                    </div>
                </div>
            </div>
        </div>
     
  </div>
</template>
<script>
import carousel    from "./swiper";
export default {
  components: {
    carousel
  }
};
</script>

<style scoped>
.login {
  background: #f5f6fc;
  position: relative;
}
.header {
  height: 60px;
  background: #fff;
  /* background: #6cf; */
  justify-content: center;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
}
.main {
  height: 100vh;
  position: relative;
}
.main .container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 1100px;
  height: 600px;
  background: #f5f6fc;
}
.main .circle {
  position: absolute;
  background: #f5f6fc;
  width: 620px;
  height: 620px;
  top: -193px;
  left: -258px;
  z-index: 1;
}
.main .content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  overflow: hidden;
}
.main .content .left {
  width: 400px;
  flex: 1;
  background: red;
}
.main .content .right {
  width: 700px;
}

.path1 {
  width: 620px;
  height: 620px;
  border-radius: 50%;
  text-align: center;
}
.path1 .item1 {
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  background: #fff;
  border: 10px solid #ffdb8d;
  border-radius: 50%;
  animation: spin 15s infinite linear;
  transform-origin: 50% 310px;
  display: inline-block;
}
.border1 {
  width: 584px;
  height: 584px;
  border-radius: 50%;
  border: 2px solid #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
}
.path2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 410px;
  height: 410px;
  border-radius: 50%;
  text-align: center;
}
.path2 .item2 {
  width: 28px;
  height: 28px;
  background: #fff;
  border: 8px solid #8dc2ff;
  box-sizing: border-box;
  border-radius: 50%;
  animation: spin 12s infinite linear;
  transform-origin: 50% 150px;
  display: inline-block;
}
.border2 {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 2px solid #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>