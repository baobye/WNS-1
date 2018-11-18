<!--<template>-->
  <!--&lt;!&ndash; tabBar &ndash;&gt;-->
  <!--<van-tabbar v-model="tabarActive">-->
    <!--<van-tabbar-item icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" dot @click="redirects('/community')">社区</van-tabbar-item>-->
    <!--<van-tabbar-item icon="shopping-cart" info="5" v-infos="shop_info" @click="redirects('/shoppingCart')">购物车-->
    <!--</van-tabbar-item>-->
    <!--<van-tabbar-item icon="contact" info="2" v-infos="my_info" @click="redirects('/me')">我的</van-tabbar-item>-->
  <!--</van-tabbar>-->

<!--</template>-->

<!--<script>-->

<!--export default {-->
  <!--name: 'tab',-->
  <!--data() {-->
    <!--return {}-->
  <!--},-->
  <!--props: {-->
    <!--tabarActive: {-->
      <!--type: Number,-->
      <!--required: true,-->
      <!--default() {-->
        <!--return {-->
          <!--tabs: '0'-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--methods: {}-->
<!--}-->
<!--</script>-->

<!--<style lang="less" scoped>-->
  <!--/*@import url('../assets/css/login.less');*/-->
<!--</style>-->
<template>
  <van-tabbar v-model="active" style="z-index: 1999">
    <van-tabbar-item
      v-for="(tab, index) in tabbar"
      :icon="tab.icon"
      :to="tab.path"
      :dot="tab.dot"
      :info="tab.info"
      :key="index">
      {{ tab.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  data() {
    return {
      active: 0,
      tabbar: [
        {
          name: '主页',
          path: '/',
          pathName: 'home',
          icon: 'compass-full',
          dot: false,
          info: ''
        },
        {
          name: '功能',
          path: '/community',
          pathName: 'community',
          icon: 'class-full',
          dot: false,
          info: ''
        },
        {
          name: '我的',
          path: '/me',
          pathName: 'Me',
          icon: 'cart-full',
          dot: false,
          info: ''
        }
        // {
        //   name: 'Demo',
        //   path: '/demo',
        //   pathName: 'demo',
        //   icon: 'wode',
        //   dot: false,
        //   info: ''
        // }
      ]
    }
  },

  watch: {
    '$route': 'changeActive'
  },

  created() {
    const toName = this.$route.name
    this.setActive(toName)
  },

  methods: {
    changeActive({ name }) {
      this.setActive(name)
    },
    setActive(name) {
      this.tabbar.forEach((tab, i) => {
        if (tab.pathName === name) {
          this.active = i
          return false
        }
      })
    }
  },

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}

</script>

<style>
  .van-tabbar-item--active,
  .van-tabbar-item--active {
    color: rgb(0,0180,210) !important;
  }
</style>
