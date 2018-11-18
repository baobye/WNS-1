<template>

  <div id="changePassword">
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="onBack"
    />
    <van-cell-group>
      <van-field
        v-model="oldPassword"
        type="password"
        label="原密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="newPassword"
        type="password"
        label="新密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="newsPassword"
        type="password"
        label="确认密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button size="large" @click="onSubmit">确认修改</van-button>
  </div>
</template>

<script>
import {Toast} from 'vant'
import http from '../utils/request'

export default {
  name: 'changePassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newsPassword: '',
      params: {
        er: '',
        password: '',
        passwordNew: '',
        userId: ''
      },
      user: ''
    }
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  },
  methods: {
    validate () {
      if (!this.oldPassword) {
        Toast.fail('请输入原密码')
        return false
      }
      if (!this.newPassword) {
        Toast.fail('请输入新密码')
        return false
      }
      if (!this.newsPassword) {
        Toast.fail('请输入确认密码')
        return false
      }
      if (!Object.is(this.newPassword, this.newsPassword)) {
        Toast.fail('新密码和确认密码不一致')
        return false
      }
    },
    onSubmit () {
      if (this.validate()) {
        const self = this
        this.params.userId = this.user.USER_ID
        self.params.passwordNew = self.newPassword
        self.params.password = self.oldPassword
        http({
          url: '/wns/user/editPassWord',
          method: 'post',
          data: self.params
        }).then(function (res) {
          if (res.data.code === 200) {
            Toast.success('密码修改成功')
          } else if (res.data.code === 500) {
            Toast.fail(res.data.msg)
          } else {
            Toast.fail()
          }
        }).catch(function (err) {
          console.error(err)
        }).finally(function () {

        })
      }
    },
    onBack: function () {
      this.$router.go(-1)
    },
    refresh () {
      this.oldPassword = ''
      this.newPassword = ''
      this.newsPassword = ''
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../assets/css/search.less');

  .van-cell-group {
    margin-top: 5% !important;
  }

  .van-cell {
    /*border: 1px solid #eee;*/
  }

  .van-button--large {
    width: 37% !important;
    margin-top: 10%;
    color: #fff;
    background-color: #4b0;
    border: 1px solid #4b0;
    height: 40px;
    line-height: 40px;
    font-size: 0.9rem;
  }
</style>
