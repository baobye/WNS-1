<template>
  <van-loading type="spinner" />
</template>

<script>
import Swiper from './swiper'
import Tab from './tab'

export default {
  name: 'home',
  components: {Tab, Swiper},
  data () {
    return {
      wxAppID: 'wx0451b8fd734c304e'
    }
  },
  created () {
    this.getWxCode()
  },
  methods: {

  }
}
</script>

<style lang="less">
  .van-loading{
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
  }
</style>
