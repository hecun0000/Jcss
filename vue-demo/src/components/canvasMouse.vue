<template>
  <div class="canvas">
    <canvas id="canvas" @mousemove="init"></canvas>
  </div>
</template>

<script>
  import CanvasMouse from '@/utils/canvas'

  export default {
    name: "canvasMouse",
    data(){
      return {
        windowWidth:window.innerWidth,
        windowHeight:window.innerHeight,
        ctx:''
      }
    },
    methods:{
      init(e){

        let canvas = document.getElementById('canvas');
        this.ctx  = canvas.getContext('2d');

        let opts = {
          wW:this.windowWidth,
          wH:this.windowHeight,
          ctx:this.ctx,
          x:e.offsetX,
          y:e.offsetY
        }
        new CanvasMouse(opts);
      }
    },
    mounted() {

      canvas.width= this.windowWidth;
      canvas.height= this.windowHeight;







    }
  }
</script>

<style scoped>

</style>
