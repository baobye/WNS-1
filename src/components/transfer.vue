<template>
  <div id="app">
    <div class="toUp-main">
      <van-nav-bar
        title="转账"
        left-arrow
        @click-left="onBack"
      />
      <div class="toUp-header">
        <p>当前积分</p>
        <h3>{{obj.JJB}}</h3>
      </div>
      <div class="toUp-con">
        <div class="toUp-con-zz">
          <van-cell-group>
            <!--<van-field-->
            <!--v-model="username"-->
            <!--required-->
            <!--label="收款人姓名"-->
            <!--placeholder="请输入收款人姓名"-->
            <!--/>-->
            <van-field
              v-model="params.tel"
              label="收款人电话"
              placeholder="请输入收款人电话"
              required
            />
            <van-field
              v-model="money"
              type="number"
              label="转账金额"
              placeholder="请输入转账金额"
              required
              :error-message="errMsg"
            />
          </van-cell-group>
        </div>
        <van-button class="toUp-con-btn" type="default" @click="onSubmit">确认转账</van-button>
        <div class="toUp-sm">
          转账说明：只有积分可以转账，转到对方将变成“余额”，转账余额只能报单，不可提现。转账完成后不可回转。
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import http from '../utils/request'
import {Toast} from 'vant'

export default {
  name: 'transfer',
  data () {
    return {
      obj: '',
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
          url: '/api/reward/transfer',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.code === 200) {
            Toast.success('转账成功')
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
