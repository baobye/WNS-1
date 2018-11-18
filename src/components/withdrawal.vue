<template>
  <div id="app">
    <div class="toUp-main">
      <van-nav-bar
        title="提现"
        left-arrow
        @click-left="onBack"
      />
      <div class="toUp-header">
        <p>当前积分</p>
        <h3>{{obj.JJB}}</h3>
      </div>
      <div class="toUp-con">
        <p>提现金额</p>
        <van-field
          type="number"
          v-model="money"
          left-icon="after-sale"
          :error-message="errMsg"
        />
        <van-button class="toUp-con-btn" type="default" @click="onSubmit">确认提现</van-button>
        <div class="toUp-sm">
          提现说明：提现后，公司将打款给您，请与公司取得联系。提现将扣除5%手续费，到手即提现金额的95%。
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import http from '../utils/request'
import {Toast} from 'vant'

export default {
  name: 'withdrawal',
  data () {
    return {
      obj: {},
      money: '',
      errMsg: '',
      params: {
        'money': '',
        'tel': '',
        'userId': '12'
      },
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getData()
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
  methods: {
    getData () {
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
      const self = this
      if (this.money === '') {
        this.errMsg = '金额不能为空'
        return
      } else {
        this.params.money = this.money
      }
      if (this.errMsg === '') {
        this.params.userId = this.user.USER_ID
        http({
          url: '/api/reward/withdraw',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.code === 200) {
            Toast.success('提现成功')
            self.$router.push('/cardDetails')
          } else if (res.data.code === 500) {
            Toast.fail(res.data.msg)
          } else {
            Toast.fail()
          }
        }).catch(err => {
          console.error(err)
        }).finally(() => {
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
      this.params.tel = ''
      // this.params.userId =
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../assets/css/home.less');
</style>
