<template>
  <div class="input-number">
      <input type="text" :value="currentValue" @change="handleChange">
      <button @click="handleDown" :disabled="currentValue<=min">-</button>
      <button @click='handleUp' :disabled="currentValue>=max">+</button>

  </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
      this.$emit("on-change", val);
    },
    value(val) {
      this.updateValue(val);
    }
  },
  methods: {
    updateValue(val) {
      if (val > this.max) {
        val = this.max;
      }
      if (val < this.min) {
        val = this.min;
      }
      this.currentValue = val;
    },
    handleDown() {
      if (this.currentValue <= this.min) {
        return;
      }

      this.currentValue--;
    },
    handleUp() {
      if (this.currentValue >= this.max) {
        return;
      }
      this.currentValue++;
    },
    isNumber(val) {
      return /^[0-9]+.?[0-9]*$/.test(val + "");
    },
    handleChange(event) {

        console.log(12)
      var val = event.target.value.trim();
      var max = this.mix;
      var min = this.min;

      if (this.isNumber(val)) {
        val = Number(val);
        this.currentValue = val;

        if (val > max) {
          this.currentValue = max;
        } else if (val < min) {
          this.currentValue = min;
        }
      } else {
        event.value = this.currentValue;
      }
    }
  },
  mounted() {
    this.updateValue(this.value);
  }
};
</script>

