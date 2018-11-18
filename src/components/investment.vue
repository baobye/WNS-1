<template>
  <div id="app">
    <div class="toUp-main">
      <van-nav-bar
        title="复投"
        left-arrow
        @click-left="onBack"
      />
      <div class="toUp-header">
        <p>当前复投卷</p>
        <h3>{{obj.FTB}}</h3>
      </div>
      <div class="toUp-con">
        <p>复投金额</p>
        <van-field
          type="number"
          v-model="money"
          left-icon="after-sale"
          :error-message="errMsg"
        />
        <van-button class="toUp-con-btn" type="default" @click="onSubmit">确认复投</van-button>
        <div class="toUp-sm">
          复投说明：复投金额只能是600的倍数，复投后不能取消。
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import http from '../utils/request'
import {Toast} from 'vant'

export default {
  name: 'investment',
  data () {
    return {
      obj: {},
      money: '',
      errMsg: '',
      params: {
        bdFtb: '',
        userId: ''
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
        this.errMsg = '请正确填写复投卷数量'
      } else if (parseInt(this.money) < 600) {
        this.errMsg = '复投卷不能低于600'
      } else if ((parseInt(this.obj.FTB) + parseInt(this.obj.JJB)) < this.money) {
        this.errMsg = '复投卷及奖金币不足'
      } else {
        this.errMsg = ''
      }
    }
  },
  methods: {
    getData () {
      const self = this
      http({
        url: `/wns/user/get/${self.user.USER_ID}`,
        method: 'get'
      }).then(function (res) {
        self.obj = res.data
      }).catch(function (err) {
        console.error(err)
      })
    },
    onSubmit () {
      const self = this
      this.params.userId = this.user.USER_ID
      if (this.money === '') {
        this.errMsg = '复投卷不能为空'
        return
      } else {
        this.params.bdFtb = this.money
      }
      if (this.errMsg === '') {
        http({
          url: '/wns/user/repeat',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.code === 200) {
            Toast.success('复投成功')
            self.$router.push('/investmentDetails')
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
        Toast.fail('复投卷验证错误')
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
