<template>
  <div id="app">
    分享
  </div>
</template>

<script>

export default {
  name: 'share',
  data () {
    return {}
  },
  methods: {
    onBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../assets/css/home.less');
</style>
