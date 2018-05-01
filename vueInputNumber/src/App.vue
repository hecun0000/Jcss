<template>
  <div id="app">
    <!-- <router-view/> -->
    <input-number v-model="value" :max='10' :min='0'></input-number>
  </div>
</template>

<script>
import inputNumber from '@/components/inputNumber'
export default {
  name: 'App',
  data () {
    return {
      value:5
    }
  },
  components: {
    inputNumber
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
