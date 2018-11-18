<template>
  <!-- 首页组件 -->
  <div id="app">
    <!--<van-nav-bar-->
    <!--title="威尼斯酒店"-->
    <!--/>-->
    <Swiper class="swiper" :tabs="images"></Swiper>
    <!--<van-notice-bar mode="closeable">-->
    <!--沈阳威尼斯度假酒店集客房、餐饮、水疗、茶楼、SPA、健身、游泳、商务于一体的酒店，是荣达集团又一巨献。酒店将意式复古与现代欧式完美结合，卢浮宫式外观、欧风艺术浮雕立柱，壮丽雄伟。-->
    <!--</van-notice-bar>-->
    <div class="card-main">
      <div class="card-item">
        <ul>
          <li>
            <van-col class="card-title" span="12">微会员卡</van-col>
            <van-col class="card-status" span="12" v-if="obj.STATE == 0">
              已激活
            </van-col>
            <van-col class="card-status" span="12" v-else>
              未激活
            </van-col>
          </li>
          <li class="card-h"><p>No.{{obj.USERNAME}}</p></li>
          <li class="card-rank">
            <span>威尼斯酒店VIP</span>
          </li>
        </ul>
      </div>
      <div class="account-information">
        <van-col class="account-information-item" span="7">
          <div @click="redirects('/balanceDetails')">
            <span>余额</span>
            <span>￥{{obj.DZB || 0}}</span>
          </div>
        </van-col>
        <van-col class="account-information-item" span="7">
          <div @click="redirects('/cardDetails')">
            <span>积分</span>
            <span>{{obj.JJB || 0}}</span>
          </div>
        </van-col>
        <van-col class="account-information-item account-information-item-b" span="7">
          <div @click="redirects('/investmentDetails')">
            <span>复投卷</span>
            <span>{{obj.FTB || 0}}</span>
          </div>
        </van-col>
        <div class="account-information-item"></div>
      </div>
    </div>
    <van-tabbar v-model="tabarActive">
      <van-tabbar-item icon="wap-home" @click="redirects('/home')">主页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" @click="redirects('/community')">功能</van-tabbar-item>
      <van-tabbar-item icon="shop" @click="redirects('/shoppingMall')">商城</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="redirects('/me')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Swiper from './swiper'
import Tab from './tab'
import http from '../utils/request'
import {Toast} from 'vant'

export default {
  name: 'home',
  components: {Tab, Swiper},
  data () {
    return {
      tabarActive: 0,
      obj: {},
      images: [
        'http://www.huoyanshijue.com/dist/static/images/w1.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w2.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w3.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w4.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w5.jpg'
      ],
      params: {
        'currentPage': 1,
        'endDate': '2018-10-15 01:34:23',
        'showCount': 10,
        'startDate': '2018-10-01 01:34:23',
        'status': '1',
        'types': [
          '2'
        ],
        'userId': ''
      },
      statusT: false,
      user: {}
    }
  },
  created () {
    sessionStorage.setItem('user', JSON.parse(this.user))
    this.getData()
    //
    // const code = this.getUrlParam('code')
    // if (!code) {
    //   this.getWxCode()
    // } else {
    //   const status = this.$route.query.status || false
    //   if (status) {
    //     const user = sessionStorage.getItem('user')
    //     this.user = JSON.parse(user)
    //     this.getData()
    //   } else {
    //     const userddd = JSON.parse(sessionStorage.getItem('user'))
    //     if (!userddd) {
    //       const self = this
    //       http({
    //         url: '/getLoginUser?code=' + code,
    //         method: 'post'
    //       }).then(res => {
    //         if (res.data.user) {
    //           sessionStorage.setItem('user', JSON.stringify(res.data.user))
    //           self.user = JSON.parse(sessionStorage.getItem('user'))
    //           this.getData()
    //         } else {
    //           Toast.fail('请先注册')
    //           sessionStorage.setItem('wechat', JSON.stringify(res.data.wechat))
    //           this.statusT = true
    //           this.redirects('/login')
    //         }
    //       }).catch(err => {
    //         console.error(err)
    //       })
    //     } else {
    //       this.user = userddd
    //       this.getData()
    //     }
    //   }
    // }
  },
  methods: {
    getData () {
      // console.log('getData', this.user)
      const self = this
      http({
        url: `/wns/user/get/${this.user.USER_ID}`,
        // url: `/wns/user/get/12`,
        method: 'get'
      }).then(res => {
        console.log('res.data', res.data)
        self.obj = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    redirects (url) {
      this.$router.push(url)
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (r != null) return unescape(r[2])
      return null // 返回参数值
    },
    getWxCode () {
      // const uri = 'http://www.huoyanshijue.com/dist/#/home'
      // const redirectUri = encodeURIComponent(uri)
      // const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.wxAppID + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=http%3A%2F%2Fwww.huoyanshijue.com%2Fdist&appid=wx0451b8fd734c304e&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      console.log('url:', url)
      location.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../assets/css/home.less');

  body {
    color: #333333;
    font-family: BlinkMacSystemFont, "Helvetica Neue", Arial, "Microsoft Yahei", "WenQuanYi Micro Hei", "Pingfang SC", sans-serif;
  }

  .van-notice-bar {
    display: block;
    width: 85%;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 3% !important;
  }

  .account-information {
    padding-bottom: 15% !important;
  }

  .account-information-item-b {
    border: none !important;
  }
</style>
