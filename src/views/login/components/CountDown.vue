<template>
  <div>
    <el-button @click="start" :disabled="isDisabled">{{
      currentText
    }}</el-button>
  </div>
</template>

<script>
export default {
  props:{
    isDo: {
        type: Boolean,
        default: false
    }  
  },  
  data() {
    return {
      isDisabled: false,
      currentText: '免费获取验证码',
      timer: 0,
    };
  },
  methods: {
    start() {
      if(this.isDo){
        let time = 60;
        this.isDisabled = true;
        this.timer = setInterval(() => {
          time--;
          this.currentText = `免费获取验证码(${time})`;
          if (time <= 0) {
            this.currentText = '免费获取验证码';
            this.isDisabled = false;
            clearInterval(this.timer);
          }
        }, 1000);
      } 
    },
  },
  watch:{
    isDo: function(val){
      if(val){
          this.start();
      }else{
        
        this.isDisabled = true;
        this.currentText = '免费获取验证码';
        this.timer = 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  font-size: 14px;
  padding: 0;
  height: 32px;
  line-height: 30px;
  width: 130px;
  text-align: center;
}
</style>