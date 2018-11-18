<template>
  <div id="apps">
    <div class="storeList">
      <div class="teamList-header">
        <van-nav-bar
          title="店铺"
          left-arrow
          @click-left="onBack"
        />
      </div>
      <div class="storeH">
        <span></span>
        <van-area :area-list="areaList" />
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
      user: {}
    }
  },
  created () {
    // this.user = JSON.parse(sessionStorage.getItem('user'))
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

  .bonusDetails-con-total {
    .bonusDetails-con-key {
      margin-bottom: 2%;
    }
    ul {
      box-sizing: border-box;
      width: 95%;
      border-radius: 5px;
      display: block;
      margin: 0 auto;
      border: 1px solid #ccc;
      margin-bottom: 3%;
      h4 {
        box-sizing: border-box;
        font-size: 0.9rem;
        color: #333;
        margin: 0;
        /*margin-left: 2% !important;*/
        padding: 2% 2%;
        /*text-align: left;*/
        border-bottom: 1px solid #ccc;
      }
      .item-left {
        span {
          font-size: 0.9rem !important;
          color: #666 !important;
        }
      }
    }
  }
</style>
