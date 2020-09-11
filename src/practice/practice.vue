<template>
  <div>
    <div class="div1" @click.stop="handleDiv1">
    </div>
    <div class="div2" @click.stop="handleDiv2">div2</div>
    <input type="text" placeholder="请输入内容">
  </div>
</template>

<script>
  export default {
    name: "practice",
    data() {
      return {
        obj: {
          a:1
        }
      }
    },
    watch:{
      obj: {
        deep: true,
        immediate: true,
        handler: function(val) {
          console.log('val', val.a)
        }
      }
    },
    methods: {
      handleDiv1() {
        console.log('div1')
        this.obj.a = this.obj.a + 1
      },
      handleDiv2() {
        console.log('div2')
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  .div1 {
    width 300px
    height 300px
    background-color black
    margin-top 10px
    display inline-block
    /*vertical-align top*/
  }
  .div2 {
    width: 0;
    height: 0;
    border-width: 50px;
    border-style: solid;
    border-color: #f00 transparent transparent;
    border-radius: 50%;
  }
  input{
    color red
  }
</style>
