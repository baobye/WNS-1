<template>
  <!-- 登录注册 组件 -->
  <div id="apps" class="login_cell_title">
    <div class="login">
      <!--<Swiper class="swiper" :tabs="images"></Swiper>-->
      <div class="loaddings" v-show="loadding">
        <van-loading type="spinner" color="white"/>
      </div>
      <van-cell-group>
        <div class="login_form">
          <van-field
            v-model="nickName"
            label='微信昵称:'
            disabled
          />
          <van-field
            type="number"
            v-model="parId"
            label="推荐人电话:"
            placeholder="输入推荐人电话"
            required
            @blur="changeParId"
            :error-message="s3ms"
          />
          <van-field
            v-model="params.parName"
            label="推荐人姓名:"
            disabled
          />
          <van-field
            type="number"
            v-model="bdId"
            label="报单中心电话:"
            placeholder="输入报单中心电话"
            required
            @blur="changeBdId"
            :error-message="s2ms"
          />
          <van-field
            v-model="params.bdName"
            label="报单中心姓名:"
            disabled
          />
          <van-radio-group v-model="params.level" @blur="sds()" class="levelList">
            <van-cell-group>
              <van-cell title="初级会员" clickable @click="radio = '1'">
                <van-radio name="1"/>
              </van-cell>
              <van-cell title="中级会员" clickable @click="radio = '2'">
                <van-radio name="2"/>
              </van-cell>
              <van-cell title="高级会员" clickable @click="radio = '2'">
                <van-radio name="3"/>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <!--<van-radio-group v-model="params.level" disabled>-->
          <!--<van-radio name="1">等级1</van-radio>-->
          <!--<van-radio name="2">等级2</van-radio>-->
          <!--<van-radio name="3">等级3</van-radio>-->
          <!--</van-radio-group>-->
          <van-field
            v-model="params.phone"
            label="注册电话:"
            placeholder="输入注册电话"
            required
            @blur="changePhone"
            :error-message="s1ms"
          />
          <van-field
            type="password"
            v-model="password"
            label="您的密码:"
            placeholder="输入密码"
            required
            @blur="changePassword"
            :error-message="passwordError"
          />
          <van-field
            type="password"
            v-model="params.passwordEr"
            label="确认密码:"
            placeholder="输入确认密码"
            required
            @blur="changePasswordEr"
            :error-message="passwordErError"
          />
          <van-field
            v-model="params.bankName"
            label="银行名称:"
            placeholder="输入银行名称"
            required
            @blur="changeBankName"
            :error-message="bankNameError"
          />
          <van-field
            v-model="params.bankCode"
            label="银行卡号:"
            placeholder="输入银行卡号"
            required
            @blur="changeBankCod"
            :error-message="bankCodError"
          />
        </div>
        <van-button size="large" class="toUp-con-btn" @click="onSubmit">申请</van-button>
      </van-cell-group>
    </div>
  </div>

</template>

<script>
import Swiper from './swiper'
import http from '../utils/request'
import {Toast} from 'vant'

export default {
  name: 'login',
  components: {Swiper},
  data () {
    return {
      bankCodError: '',
      bankNameError: '',
      parIdError: '',
      passwordErError: '',
      passwordError: '',
      s1ms: '',
      s2ms: '',
      s3ms: '',
      status: false,
      status1: false,
      status2: false,
      loadding: false,
      nickName: '',
      params: {
        bankCode: '',
        bankName: '',
        bdId: '',
        bdName: '',
        parId: '',
        parName: '',
        passwordEr: '',
        phone: '',
        weChatId: '',
        level: '1'
      },
      parId: '',
      vaPhone: {
        bdTel: '',
        parTel: '',
        tel: ''
      },
      images: [
        'http://www.huoyanshijue.com/dist/static/images/w1.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w2.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w3.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w4.jpg',
        'http://www.huoyanshijue.com/dist/static/images/w5.jpg'
      ],
      password: '',
      bdId: ''
    }
  },
  created () {
    const use = JSON.parse(sessionStorage.getItem('wechat'))
    this.nickName = use.NICK_NAME
  },
  methods: {
    // changeBdName () {
    //   if (Object.is(this.params.bdName, '')) {
    //     this.bdNameError = '请输入报单中心姓名'
    //     return false
    //   } else {
    //     this.bdNameError = ''
    //     return true
    //   }
    // },
    changeBankCod () {
      if (Object.is(this.params.bankCod, '')) {
        this.bankCodError = '请输入银行卡号'
        return false
      } else {
        this.bankCodError = ''
        return true
      }
    },
    changeBankName () {
      if (Object.is(this.params.bankName, '')) {
        this.bankNameError = '请输入银行名称'
        return false
      } else {
        this.bankNameError = ''
        return true
      }
    },
    // changeParName () {
    //   if (Object.is(this.params.parName, '')) {
    //     this.parNameError = '请输入推荐人'
    //     return false
    //   } else {
    //     this.parNameError = ''
    //     return true
    //   }
    // },
    changePassword () {
      if (Object.is(this.password, '')) {
        this.passwordError = '请输入密码'
        return false
      } else {
        this.passwordError = ''
        return true
      }
    },
    changePasswordEr () {
      if (Object.is(this.params.passwordEr, '')) {
        this.passwordErError = '请重复输入密码'
        return false
      } else if (!Object.is(this.params.passwordEr, this.password)) {
        this.passwordErError = '密码输入不一致'
        return false
      } else {
        this.passwordErError = ''
        return true
      }
    },
    onSubmit () {
      const self = this
      self.loadding = true
      // this.changeParId()
      // this.changeBdId()
      // this.changePhone()
      if (!this.status) {
        Toast.fail('注册电话错误')
        return false
      }
      if (!this.status1) {
        Toast.fail('报单中心电话错误')
        return false
      }
      if (!this.status2) {
        Toast.fail('推荐人电话错误')
        return false
      }
      if (this.changeBankCod() && this.changeBankName() && this.changePassword() && this.changePasswordEr()) {
        const use = JSON.parse(sessionStorage.getItem('wechat'))
        this.params.weChatId = use.WECHAT_ID
        http({
          url: '/wns/user/saveU',
          method: 'post',
          data: this.params
        }).then(res => {
          console.log('Loginres', res)
          if (Object.is(res.data.result, 'success')) {
            Toast.success('注册成功')
            sessionStorage.setItem('user', JSON.stringify(res.data.user))
            self.$router.push({path: '/home', query: {status: true}})
          } else {
            Toast.fail(res.data.msg)
          }
        }).catch(err => {
          console.error(err)
        }).finally(() => {
          self.loadding = false
        })
      } else {
        Toast.fail('验证失败')
      }
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (r != null) return unescape(r[2])
      return null // 返回参数值
    },
    changePhone () {
      if (Object.is(this.params.phone, '')) {
        this.s1ms = '请输入注册电话'
        return false
      }
      const regExp = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!regExp.test(this.params.phone)) {
        this.s3ms = '请输入正确的手机号码'
        return false
      }
      this.vaPhone.tel = this.params.phone
      this.vaPhone.bdTel = ''
      this.vaPhone.parTel = ''
      const self = this
      http({
        url: '/wns/user/saveCheck',
        method: 'post',
        data: this.vaPhone
      }).then(res => {
        if (Object.is(res.data.result, 'error')) {
          self.s1ms = res.data.msg
          self.status = false
        } else {
          self.s1ms = ''
          self.status = true
        }
      }).catch(err => {
        console.error(err)
      })
    },
    changeBdId () {
      if (Object.is(this.bdId, '')) {
        this.s2ms = '请输入报单中心电话'
        return false
      }
      const regExp = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!regExp.test(this.bdId)) {
        this.s3ms = '请输入正确的手机号码'
        return false
      }
      this.vaPhone.tel = ''
      this.vaPhone.bdTel = this.bdId
      this.vaPhone.parTel = ''
      const self = this
      http({
        url: '/wns/user/saveCheck',
        method: 'post',
        data: this.vaPhone
      }).then(res => {
        if (Object.is(res.data.result, 'error') || !res.data.result) {
          self.s2ms = res.data.msg
          self.status1 = false
        } else {
          self.s2ms = ''
          self.status1 = true
          this.params.bdId = res.data.user.USER_ID
          this.params.bdName = res.data.user.NAME
        }
      }).catch(err => {
        console.error(err)
      })
    },
    changeParId () {
      if (Object.is(this.parId, '')) {
        this.s3ms = '请输入推荐人电话'
        return false
      }
      const regExp = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!regExp.test(this.parId)) {
        this.s3ms = '请输入正确的手机号码'
        return false
      }
      this.vaPhone.tel = ''
      this.vaPhone.bdTel = ''
      this.vaPhone.parTel = this.parId
      const self = this
      http({
        url: '/wns/user/saveCheck',
        method: 'post',
        data: this.vaPhone
      }).then(res => {
        if (Object.is(res.data.result, 'error') || !res.data.result) {
          self.s3ms = res.data.msg
          self.status2 = false
        } else {
          self.s3ms = ''
          self.status2 = true
          self.params.parId = res.data.user.USER_ID
          self.params.parName = res.data.user.NAME
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>
  .login_cell_title .van-field .van-cell__title {
    max-width: 110px !important;
    text-align: center !important;
  }

  .login_cell_title .van-icon-checked {
    color: rgb(86, 119, 252);
  }
</style>

<style lang="less" scoped>
  @import url('../assets/css/login.less');

  .loaddings {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10000;
  }

  .van-loading--white {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .van-radio {
    text-align: center !important;
  }

  #apps {
    background: url('../../static/background_picture/background_20.jpg');
    /*background-image: url('../../static/images/background_picture/background_20.jpg');*/
    background-repeat: no-repeat;
    background-size: cover;
    -moz-background-size: cover;
    /*background: rgb(234, 233, 233) !important;*/
    /*padding-bottom: 8% !important;*/
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 25px 15px;
  }

  .van-cell-group {
    /*display: inline-block;*/
    box-sizing: border-box;
    margin: 0 auto;
    /*margin-top: 2% !important;*/
    width: 100% !important;
    background: #fff !important;
    opacity: 0.9;
    border: 1px solid #fff;
    border-radius: 10px !important;
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    .van-button--large, .van-button__text {
      line-height: 39.2px;
    }
  }

  .toUp-con-btn {
    display: block;
    box-sizing: border-box;
    margin: 20px auto;
    /*margin-top: 6.5%;*/
    width: 60% !important;
    background: rgb(86, 119, 252);
    color: #fff;
    border-radius: 20px;
    /*padding-bottom: 5% !important;*/
  }

  .van-swipe-item img {
    width: 100%;
    height: 200px !important;
  }

  [class*=van-hairline]::after {
    border: none;
  }

  .van-cell {
    border-bottom: 1px solid rgba(229, 229, 229, .7);
    font-size: 0.9rem !important;
    padding: 15px 15px;
  }

  /*.van-cell:last-of-type {*/
  /*border: none !important;*/
  /*}*/

  .van-cell__title {
    text-align: left !important;
    max-width: 100px !important;
  }

  .login {
    /*padding-bottom: 5%;*/
    display: flex;
    .login_form {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 3.5%;
    }
  }

  .levelList {
    .van-cell-group {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      .van-cell {
        flex: 1;
        display: flex;
        flex-flow: column;
        .van-cell__title{
          span{
            font-size: 0.9rem !important;
          }
        }
      }
    }
    /*.van-cell-group {*/
    /*margin: 0 !important;*/
    /*}*/
    /*.van-cell {*/
    /*display: inline-block;*/
    /*float: left;*/
    /*box-sizing: border-box;*/
    /*width: 33.3334% !important;*/
    /*border-right: 1px solid #e5e5e5;*/
    /*}*/
    /*.van-cell:last-of-type {*/
    /*border-right: none !important;*/
    /*}*/
  }
</style>
