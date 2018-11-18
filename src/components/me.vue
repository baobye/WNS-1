<template>
  <div id="app">
    <div>
      <div class="user-header">
        <van-col span="10" class="user-img">
          <img src="https://pic.qqtn.com/up/2018-8/15332606302773710.jpg" alt="头像">
        </van-col>
        <van-col span="14" class="user-message">
          <p>姓名: {{obj.NAME}}</p>
          <p>积分: {{obj.JJB}}</p>
          <p>激活日期: {{obj.START_DATE}}</p>
        </van-col>
      </div>
      <van-row class="user-links user-links-list">
        <van-col span="8" class="list-item">
          <span>可提层数</span>
          <span>{{ceng || 0 }}层</span>
        </van-col>
        <van-col span="8" class="list-item">
          <span>直推人数</span>
          <span>{{obj.ZT_NUM || 0}}人</span>
        </van-col>
        <van-col span="8" class="list-item">
          <span>积分余额</span>
          <span>{{obj.JJB || 0}}</span>
        </van-col>
      </van-row>
    </div>
    <van-cell-group class="user-group">
      <van-cell icon="records" title="修改密码" @click="redirects('/changePassword')"><i class="van-icon van-icon-arrow van-cell__right-icon"></i></van-cell>
      <van-cell class="van-cell-bo" icon="points" title="我的优惠卷" @click="redirects('/conpon')"><i class="van-icon van-icon-arrow van-cell__right-icon"></i></van-cell>
    </van-cell-group>
    <!--<van-cell-group class="user-group">-->
    <!--</van-cell-group>-->
    <van-tabbar v-model="tabarActive">
      <van-tabbar-item icon="wap-home" @click="redirects('/home')">主页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" @click="redirects('/community')">功能</van-tabbar-item>
      <van-tabbar-item icon="shop" @click="redirects('/shoppingMall')">商城</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="redirects('/me')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import http from '../utils/request'

export default {
  name: 'me',
  data () {
    return {
      tabarActive: 3,
      obj: {},
      ceng: 0,
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },
  methods: {
    getData () {
      const self = this
      http({
        url: `/wns/user/get/${self.user.USER_ID}`,
        method: 'get'
      }).then(function (res) {
        self.obj = res.data
        if (parseInt(self.obj.ZT_NUM) >= 2 && parseInt(self.obj.ZT_NUM) < 5) {
          self.ceng = 5
        } else if (parseInt(self.obj.ZT_NUM) >= 5 && parseInt(self.obj.ZT_NUM) < 7) {
          self.ceng = 10
        } else if (parseInt(self.obj.ZT_NUM) >= 7) {
          self.ceng = 15
        } else {
          self.ceng = 0
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    redirects (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less">
  /*.van-cell-bo {*/
    /*box-sizing: border-box;*/
    /*border-top: 1px solid #eee;*/
  /*}*/
  .van-cell__right-icon {
    color: #999;
    font-size: 12px !important;
    line-height: 24px;
    margin-left: 5px;
  }
  .van-cell__title{
    box-sizing: border-box;
    text-align: left !important;
    padding-left: 20px;
  }
  .user {
    &-poster {
      width: 7.5rem;
      height: 4rem;
      display: block;
    }
    &-group {
      margin-bottom: .3rem;
    }
    &-links {
      padding: 15px 0;
      font-size: 0.9rem;
      text-align: center;
      background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
      .list-item {
        font-size: 0.95rem;
      }
    }
  }

  .van-icon {
    font-size: 20px;
  }

  .van-cell__title {
    span {
      font-size: 1rem;
    }
  }

  .user-header {
    box-sizing: border-box;
    width: 100%;
    height: 155px;
    padding: 4%;
    background: url("../../static/images/jdXqOp2qmP.jpg") no-repeat;
    background-size: cover;
    .user-img {
      margin-top: 4.1%;
      img {
        width: 95px;
        height: 95px;
        border-radius: 50%;
      }
    }
    .user-message {
      box-sizing: border-box;
      padding-left: 1%;
      text-align: left;
      margin-top: 6.1%;
      p {
        margin: 0;
        line-height: 28px;
        color: #ffffff;
        font-size: 0.95rem;
      }
    }
  }

  .user-links-list {
    .list-item {
      border-right: 1px solid #eee;
      height: 60px;
      /*border-right: none;*/
      span {
        display: inline-block;
        line-height: 30px;
        width: 100%;
        /*color: #fff;*/
      }
    }
    .list-item:nth-last-of-type(1) {
      border-right: none;
    }
  }
</style>
