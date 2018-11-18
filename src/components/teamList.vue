<template>
  <div id="apps">
    <div class="teamList">
      <div class="teamList-header">
        <van-nav-bar
          title="我的团队"
          left-arrow
          @click-left="onBack"
        />
      </div>
      <div class="teamList-main">
        <!--<van-search placeholder="请输入搜索关键词" v-model="value"/>-->
        <div class="teamItem" v-for="(item,index) in datas" :key="index">
          <div class="teamItemH">
            <span class="team-size">{{item.NAME}}</span>
            <p>{{item.PHONE}}</p>
          </div>
          <van-panel :title="'等级:'+item.LEVEL" :desc="item.START_DATE">
            <p class="succresStatus" v-if="item.STATE == 0">已激活</p>
            <p class="errorStatus" v-else>未激活</p>
          </van-panel>
        </div>
      </div>
    </div>
    <p v-if="!datas.length > 0" class="zwxx">暂无信息～</p>
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
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },
  methods: {
    getData () {
      const self = this
      http({
        url: `/wns/user/team/${self.user.USER_ID}`,
        method: 'get'
      }).then(function (res) {
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
</style>
