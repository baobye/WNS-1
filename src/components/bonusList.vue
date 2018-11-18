<template>
  <div id="apps">
    <div class="bonusDetails">
      <div class="teamList-header">
        <van-nav-bar
          title="奖金统计"
          left-arrow
          @click-left="onBack"
        />
      </div>
      <div class="bonusDetails-con bonusDetails-con-total">
        <div class="bonusDetails-con-key">
          <!--<van-field v-model="value" placeholder="请输入开始日期"/>-->
          <!--<van-field v-model="value" placeholder="请输入结束日期"/>-->
        </div>
        <ul v-for="(item,index) in datas" :key="index">
          <h4>{{item.INSERT_DATE}}</h4>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>业绩奖</span>
            </div>
            <div class="item-right">
              <span>{{item.ZTJ}}</span>
            </div>
          </li>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>领导奖</span>
            </div>
            <div class="item-right">
              <span>{{item.LDJ}}</span>
            </div>
          </li>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>报单中心店补</span>
            </div>
            <div class="item-right">
              <span>{{item.DBJ}}</span>
            </div>
          </li>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>幸运奖</span>
            </div>
            <div class="item-right">
              <span>{{item.DDJ}}</span>
            </div>
          </li>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>分红奖</span>
            </div>
            <div class="item-right">
              <span>{{item.FHJ}}</span>
            </div>
          </li>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>实收奖金</span>
            </div>
            <div class="item-right">
              <span>{{item.JJB_TOTAL}}</span>
            </div>
          </li>
          <li class="bonusDetails-item" style="border-bottom: 1px solid #eee;">
            <div class="item-left">
              <span>转复投卷</span>
            </div>
            <div class="item-right">
              <span>{{item.FTB_TOTAL}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import http from '../utils/request'

export default {
  name: 'aboutMe',
  components: {},
  data () {
    return {
      datas: [],
      params: {
        'currentPage': 1,
        'endDate': '',
        'showCount': 100,
        'startDate': '',
        'userId': ''
      },
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
      this.params.userId = this.user.USER_ID
      http({
        url: '/api/reward/totalList',
        method: 'post',
        data: this.params
      }).then(function (res) {
        console.log(res.data.data)
        self.datas = res.data.data
      }).catch(function (err) {
        console.error(err)
      })
    },
    onBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
  @import url('../assets/css/about.less');
  .bonusDetails-con-total{
    .bonusDetails-con-key{
      margin-bottom: 2%;
    }
    ul{
      box-sizing: border-box;
      width: 95%;
      border-radius: 5px;
      display: block;
      margin: 0 auto;
      border: 1px solid #ccc;
      margin-bottom: 3%;
      h4{
        box-sizing: border-box;
        font-size: 0.9rem;
        color: #333;
        margin: 0;
        /*margin-left: 2% !important;*/
        padding: 2% 2%;
        /*text-align: left;*/
        border-bottom: 1px solid #ccc;
      }
      .item-left{
        span{
          font-size: 0.9rem !important;
          color: #666 !important;
        }
      }
    }
  }
</style>
