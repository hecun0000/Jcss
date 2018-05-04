<template>
  <div class="login">
      <div class="header">
          <div>
               <img src="http://static.ledouya.com/FpK0rN_nJHMe0c63AhEh34h9x4II?imageMogr2" alt="">
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
      
                </div>
            </div>
        </div>
     
  </div>
</template>

<style scoped>
.login {
  background: #f5f6fc;
  position: relative;
}
.header {
  height: 60px;
  background: #6cf;
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
  height: 500px;
  background: #fff;
}

.main .circle {
  position: absolute;
  background: #fff;
  width: 620px;
  height: 620px;
  top: -250px;
  left: -250px;
  z-index: 1;
}
.main .content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: yellow;
}
.path1 {
  width: 620px;
  height: 620px;
  border-radius: 50%;
  text-align: center;
}
.path1 .item1 {
  width: 50px;
  height: 50px;
  background: red;
  border-radius: 50%;
  animation: spin 10s infinite linear;
  transform-origin: 50% 310px;
  display: inline-block;
}
.border1 {
  width: 570px;
  height: 570px;
  border-radius: 50%;
  border: 1px solid red;
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
  width: 300px;
  height: 300px;
  border-radius: 50%;
  text-align: center;

}
.path2 .item2 {
  width: 50px;
  height: 50px;
  background: #333;
  border-radius: 50%;
  animation: spin 10s infinite linear;
  transform-origin: 50% 150px;
  display: inline-block;
}
.border2 {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 1px solid red;
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

