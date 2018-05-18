<template>
  <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for='(item,index) in imgs' :key='index'> 
            <img :src="item" alt="乐店云-小程序商城-新零售解决方案">
        </swiper-slide>
       
      </swiper>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {    
      swiperOption: {
        effect: "fade",
        autoplay: {
          delay: 8000,
          disableOnInteraction: false
        },
        loop: true,
      },
      imgs:[
          'http://static.ledouya.com/FjmsvNzz4cwdZ9diWKFVeIDvj5iJ?imageMogr2/auto-orient',
          'http://static.ledouya.com/Fsyo4l03E7vQszHJ3O8dcMEHqcH3?imageMogr2/auto-orient'
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style scoped>

</style>

