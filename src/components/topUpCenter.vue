<template>
  <div id="app">
    <div class="toUp-main">
      <van-nav-bar
        title="充值"
        left-arrow
        @click-left="onBack"
      />
      <div class="toUp-header">
        <p>当前余额</p>
        <h3>¥{{obj.DZB}}</h3>
      </div>
      <div class="toUp-con">
        <p>充值金额</p>
        <van-field
          type="number"
          v-model="money"
          left-icon="after-sale"
          :error-message="errMsg"
        />
        <van-button class="toUp-con-btn" type="default" @click="onSubmit">确认充值</van-button>
        <div class="toUp-sm">
          充值说明：充值后，请打款给公司财务，财务收到款后,会给予该笔申请进行审核。充值后的余额只能报单。
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import http from '../utils/request'
import {Toast} from 'vant'

export default {
  name: 'topUpCenter',
  data () {
    return {
      money: '',
      errMsg: '',
      params: {
        money: '',
        tel: '18640244765',
        userId: ''
      },
      obj: {},
      user: {}
    }
  },
  watch: {
    money: function (val) {
      const regExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (!regExp.test(val)) {
        this.errMsg = '请正确填写金额'
      } else {
        this.errMsg = ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      const self = this
      http({
        url: `/wns/user/get/${this.user.USER_ID}`,
        method: 'get'
      }).then(function (res) {
        self.obj = res.data
      }).catch(function (err) {
        console.error(err)
      })
    },
    onSubmit () {
      if (this.money === '') {
        this.errMsg = '金额不能为空'
        return
      } else {
        this.params.money = this.money
      }
      this.params.userId = this.user.USER_ID
      if (this.errMsg === '') {
        const self = this
        http({
          url: '/api/reward/recharge',
          method: 'post',
          data: this.params
        }).then(function (res) {
          if (res.data.code === 200) {
            Toast.success('充值成功')
            self.$router.push('/balanceDetails')
          } else if (res.data.code === 500) {
            Toast.fail(res.data.msg)
          } else {
            Toast.fail()
          }
        }).catch(function (err) {
          console.error(err)
        }).finally(function () {
          self.refresh()
        })
      } else {
        Toast.fail('金额验证错误')
      }
    },
    onBack: function () {
      this.$router.go(-1)
    },
    refresh () {
      this.params.money = ''
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../assets/css/home.less');
</style>
