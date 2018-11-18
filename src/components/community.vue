<template>
  <!-- 社区组件 -->
  <div id="app">

    <!-- 搜索区 -->
    <van-row gutter="20" class="row-1 community-main">
      <div class="banner-main">
        <img src="https://img.alicdn.com/simba/img/TB1CCFSnjuhSKJjSspjSuwi8VXa.jpg"/>
      </div>
      <div class="community-main-menu">
        <div class="community-main-menu-item">
          <h4>我的代理</h4>
          <div class="iconfont-con-yh">
            <van-col span="8">
              <div @click="redirects('/teamList')">
                <i class="iconfont" style="color:rgb(134, 23, 23);">&#xe68c;</i>
                <h5 style="margin-top: 5px">我的团队</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/storeList')">
                <i class="iconfont" style="color:rgb(229, 28, 35);">&#xe654;</i>
                <h5 style="margin-top: 5px">店铺列表</h5>
              </div>
            </van-col>
            <!--<van-col span="8" >-->
              <!--<div @click="redirects('/share')">-->
                <!--<i class="iconfont" style="color: #000;">&#xe608;</i>-->
                <!--<h5 style="margin-top: 5px">分享</h5>-->
              <!--</div>-->
            <!--</van-col>-->
            <!--<van-col span="8">-->
              <!--<div @click="redirects('/certificate')">-->
                <!--<i class="iconfont" style="color: rgb(255, 152, 0);">&#xe663;</i>-->
                <!--<h5 style="margin-top: 5px">我的证书</h5>-->
              <!--</div>-->
            <!--</van-col>-->
          </div>
          <h4>资金管理</h4>
          <div class="iconfont-con-yh">
            <van-col span="8">
              <div @click="redirects('/topUpCenter')">
                <i class="iconfont" style="color: rgb(139, 195, 74);">&#xe682;</i>
                <h5 style="margin-top: 5px">充值</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/withdrawal')">
                <i class="iconfont" style="color: rgb(229, 28, 35);">&#xe688;</i>
                <h5 style="margin-top: 5px">提现</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/transfer')">
                <i class="iconfont" style=" color: rgb(37, 155, 36);">&#xef05;</i>
                <h5 style="margin-top: 5px">转账</h5>
              </div>
            </van-col>
          </div>
          <h4>账单</h4>
          <div class="iconfont-con-yh">
            <van-col span="8">
              <div @click="redirects('/balanceDetails')">
                <i class="iconfont" style=" color: rgb(39, 217, 210);">&#xe647;</i>
                <h5 style="margin-top: 5px">余额账单</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/cardDetails')">
                <i class="iconfont" style="color: rgb(45, 26, 217);">&#xe6d6;</i>
                <h5 style="margin-top: 5px">积分账单</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/investmentDetails')">
                <i class="iconfont" style="color: rgb(37, 155, 36);">&#xe60f;</i>
                <h5 style="margin-top: 5px">复投券账单</h5>
              </div>
            </van-col>
          </div>
          <h4>奖金</h4>
          <div class="iconfont-con-yh">
            <van-col span="8">
              <div @click="redirects('/bonusDetails')">
                <i class="iconfont" style="color: rgb(229, 28, 35);">&#xe65a;</i>
                <h5 style="margin-top: 5px">奖金明细</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/bonusList')">
                <i class="iconfont" style="color: rgb(229, 28, 35);">&#xe6cd;</i>
                <h5 style="margin-top: 5px">奖金统计</h5>
              </div>
            </van-col>
            <van-col span="8">
              <div @click="redirects('/investment')">
                <i class="iconfont" style="color: rgb(139, 195, 74);">&#xe653;</i>
                <h5 style="margin-top: 5px">复投</h5>
              </div>
            </van-col>
          </div>
        </div>
      </div>
    </van-row>
    <van-tabbar v-model="tabarActive">
      <van-tabbar-item icon="wap-home" @click="redirects('/home')">主页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" @click="redirects('/community')">功能</van-tabbar-item>
      <van-tabbar-item icon="shop" @click="redirects('/shoppingMall')">商城</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="redirects('/me')">我的</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>

export default {
  name: 'community',
  data () {
    return {
      tabarActive: 1
    }
  },
  methods: {
    redirects (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../assets/css/home.less');
  @import url('../../static/images/icon/iconfont.css');
  .community-main-menu{
    padding-bottom: 15% !important;
  }
  .community-main{
    box-sizing: border-box;
    margin: 0 !important;
    width: 100% !important;
    overflow-x: hidden;
    margin-bottom: 8% !important;
  }
</style>
