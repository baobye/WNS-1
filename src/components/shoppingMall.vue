<template>
  <!-- 首页组件 -->
  <div id="app">
    <van-nav-bar
      title="商城"
      left-arrow
      @click-left="onBack"
    />
    <div class="shop-con">
      <div class="card-goods van-checkbox-group">

        <div class="card-goods__item van-checkbox">
          <div class="van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked">
            <i class="van-icon van-icon-success"></i>
          </div>
          <span class="van-checkbox__label">
              <div class="van-card">
                <a href="javascript:;" class="van-card__thumb">
                  <img src="https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
                       class="van-card__img"></a>
                <div class="van-card__content">
                  <div class="van-card__left">
                    <div class="van-card__title">进口香蕉</div>
                    <div class="van-card__desc van-ellipsis">约250g，2根</div>
                  </div>
                  <div class="van-card__right">
                  <div>¥ 2.00</div>
                    <!--<div class="van-card__num">x 1</div>-->
                  </div>
                  <van-stepper v-model="value" class="shopItem-stepper"/>
              </div>
             </div>
          </span>
        </div>

        <!--<div class="card-goods__item van-checkbox">-->
        <!--<div class="van-checkbox__icon van-checkbox__icon&#45;&#45;round van-checkbox__icon&#45;&#45;checked"><i-->
        <!--class="van-icon van-icon-success">&lt;!&ndash;&ndash;&gt;</i></div>-->
        <!--<span class="van-checkbox__label"><div class="van-card"><a href="javascript:;" class="van-card__thumb"><img-->
        <!--src="https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"-->
        <!--class="van-card__img">&lt;!&ndash;&ndash;&gt;</a><div class="van-card__content"><div class="van-card__left"><div-->
        <!--class="van-card__title">陕西蜜梨</div><div class="van-card__desc van-ellipsis">约600g</div></div><div-->
        <!--class="van-card__right"><div>¥ 6.90</div>&lt;!&ndash;&ndash;&gt;<div class="van-card__num">x 1</div></div></div>-->
        <!--&lt;!&ndash;&ndash;&gt;</div></span></div>-->

        <!--<div class="card-goods__item van-checkbox">-->
        <!--<div class="van-checkbox__icon van-checkbox__icon&#45;&#45;round van-checkbox__icon&#45;&#45;checked"><i-->
        <!--class="van-icon van-icon-success">&lt;!&ndash;&ndash;&gt;</i></div>-->
        <!--<span class="van-checkbox__label"><div class="van-card"><a href="javascript:;" class="van-card__thumb"><img-->
        <!--src="https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"-->
        <!--class="van-card__img">&lt;!&ndash;&ndash;&gt;</a><div class="van-card__content"><div class="van-card__left"><div-->
        <!--class="van-card__title">美国伽力果</div><div class="van-card__desc van-ellipsis">约680g/3个</div></div><div-->
        <!--class="van-card__right"><div>¥ 26.80</div>&lt;!&ndash;&ndash;&gt;<div class="van-card__num">x 1</div></div></div>-->
        <!--&lt;!&ndash;&ndash;&gt;</div></span></div>-->

      </div>
    </div>
    <van-submit-bar
      :price="0"
      button-text="提交订单"
      @submit="onSubmit"
    />
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
import {Toast} from 'vant'

export default {
  name: 'home',
  data () {
    return {
      tabarActive: 2,
      obj: {},
      user: {},
      params: {
        currentPage: '1',
        showCount: '10'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const self = this
      // this.params.userId = this.user.USER_ID
      http({
        url: '/api/order/goodList',
        method: 'post',
        data: self.params
      }).then(function (res) {
        debugger
        console.log(res)
      }).catch(function (err) {
        console.error(err)
      })
    },
    redirects (url) {
      this.$router.push(url)
    },
    onBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
  body {
    background: #fafafa;
  }
</style>
<style lang="less" scoped>
  .card-goods__item {
    display: block;
    margin: 0 auto;
    background: #fff;
    width: 96%;
    border-radius: 7px;
    z-index: 1000;
    padding: 5px 0;
  }

  .shop-con {
    width: 100%;
    margin: 10px 0;
  }

  .van-submit-bar {
    bottom: 50px !important;
  }

  .van-card__content {
    position: relative;
    display: flex;
    width: 100%;
  }

  .van-card__left {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
  }

  .shopItem-stepper {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .van-card__right {
    display: block;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    line-height: 20px;
    padding-left: 10px;
    text-align: right;
  }

  .van-checkbox__label {
    width: 100%;
    padding: 0 10px 0 15px;
    box-sizing: border-box;
  }

  .card-goods__item {
    position: relative;
    /*background-color: #fafafa;*/
  }

  .card-goods__item .van-checkbox__icon {
    top: 50%;
    left: 10px;
    z-index: 1;
    position: absolute;
    margin-top: -10px;
    display: inline-block;
    vertical-align: middle;
    line-height: 20px;
  }

  .van-card__left {
    text-align: left;
  }

  /*.van-checkbox__icon--checked .van-icon{*/
  /*color: #fff;*/
  /*border-color: #1989fa;*/
  /*background-color: #1989fa;*/
  /*}*/
  .van-card {
    background: #fff !important;
  }
</style>
