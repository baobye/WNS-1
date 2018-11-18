<template>
  <div id="apps">
    <div class="balance-header">
      <van-nav-bar
        title="卡积分"
        left-arrow
        @click-left="onBack"
      />
    </div>
    <div class="balance-main">
      <div class="balance-main-title">
        <h2>
          {{datas.money || 0}}
        </h2>
        <p>可用积分</p>
        <div class="balance-main-details">
          <van-col span="12">收入: {{datas.income || 0}}</van-col>
          <van-col span="12">支出: {{datas.expenditure || 0}}</van-col>
        </div>
      </div>
    </div>
    <div class="balance-main-con">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        @load="onLoad">
        <div class="notSend bgc van-cell-group van-hairline--top-bottom van-panel" v-for="(item,index) in datas"
             :key="index">
          <div class="van-cell van-hairline van-panel__header">
            <div class="van-cell__title">
              <span v-if="item.REASON_TYPE == 1">注册</span>
              <span v-if="item.REASON_TYPE == 2">重复消费</span>
              <span v-if="item.REASON_TYPE == 3">充值</span>
              <span v-if="item.REASON_TYPE == 4">提现</span>
              <span v-if="item.REASON_TYPE == 5">转账</span>
              <span v-if="item.REASON_TYPE == 6">奖金</span>
              <div class="van-cell__label">{{item.START_TIME}}</div>
            </div>
            <div class="van-cell__value"><span :class="[item.TYPE == 1 ? 'notSend' : 'send']">{{item.TYPE == 1 ? '+' : '-'}}{{item.ONE_MONEY}}</span>
            </div>
          </div>
          <div class="van-panel__content">
            <img v-if="item.STATUS == 3"
                 src="data:image/png;base64,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"
                 class="statusImg">
            <img v-if="item.STATUS == 2"
                 src="data:image/png;base64,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"
                 class="statusImg">
            <img v-if="item.STATUS == 1"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRF/2lp/4eH//X1/6+v/9fX/+vr/+Hh/5ub/319/8PD/2Zm/7m5/3Nz/5GR/83N/3Bw/6Wl/9nZ/7Ky/4yM/8XF/6Cg/3l5/+zs/7y8/4OD/6mp/5aW/+Li/8/P/19f/////yJOGQAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAAKoUlEQVR42sRbh3KsOgw1LoDpbGFbwv7/Xz4ZcDdt2dzH3LmTScA+lo+KZQm9P3gYJU0U9fpBUUQIZZ+MhfZ+QEmE1KzyUTgI/VMALI/GeZrcXS6jeTMiK3P2NwBYnorJEx7PvxPzRIBId2DYCqAqxcAkXn8zJgJoWX0TAM6Lvi+azctijXg/x18CgAmINar2cUtIDBH8DQBi+uQDDWOJgHAYQFWEp6cVIVoNCaloGEJRHQLAQO0id/o4L4s+HSadHg5gir4oc5ejrAx8vwMASL+wV4Z5iYokD5obmicFKrm97xRUgnwIQCzf/paXa2YmBmPhYIBVpOwTABw+jC3dQukWzQKDhSzWwEIQ3w8ACNSYoiz7JN6qAHHSl+YuESDyTgA47ZExRBxt0mnLdkTG9xSkifcAiAtz31iyc/oJgrERsKAi3g4gRn2iZ8xR2A6xfAVCYtqhpEfxVgAVMrYsTtMZH08ESXFezguHpgaNSY+qbQB432vS5vNaTEVkAI5viZvE+NwadwFAZbyHo2J+eDqGQcWyQqQRNhBU6wBg/7nmYrJAvmoEYChYGdgOYEKsEfg8QAvzc7REMz4FgqX+FVgcykjhjJkbI/oInJdxoVfETdJwlwqNColz03iJJ/VInWtOFHgRQKrnJxbYSHi1KomMN9VTGRZPPI2/rYnGmC4BSLTBSmxhwdiosBjHeOlsAksdQCEEqYMP2duKWHD9anGWScfIYkA8nRdCdl8jgI+qOQAM9VTtv0OWMrQ4sG7Y/Fo+JISAK+1FbAZAqr5058cTvRzxUQtQk/qsCCEgfRQGQBQ/YkRdbsqHL1p/oRoFxIg0aDZiNVoeAsCUUcWFq//GQXTx8MeWLHMu94shYxOQMYncgMhnEa4mDCvng3QpACyjwCYgLSGpYnkwdmCWyZk/j2DtR1xZ4IIonJULAEzgJNx4RoipxZ0ND/cIo4am2qAgTyopmdvCeB8Ag/iK56lSYGIDAPPAnHe+8PgI5OqYsiBICiCRDKXvP0RAJf+VCJAjgERqQBN/AwF1902Or0SAJpedSMiSxYNBrUpyEAFHtkopCSeTTo0ACimASE0obBpaOFBsfRKHUySSIig0gEqqANV4i1mrvvNxtApLEZTj2Mj4GeAS17fiwwCY69jlYkdXjgxpwA9Yn6XG5wtUzO1NwHK7x31HAwUnL9skdsAr0nLHReBuglQEMtAQDUZ2WqcSVlUoBOk3dBHbxgFP8k5HAGoHeGpGfMWWc8dGTbBFkHLpXdgAQO1AmTtx90fy/wl5UmugvJQHhnwAUE47gO3X4s908JTd10QgJ4qFHgCAfvIH3HG36QdGqH105xoHfIL1u4hLPRAAqAytk/zoXuNrdsW3+ur/JeKhPUggBkGTNgg+soPTn+pz93jjc9b6LiGybZMMWQgAiCYKxAf5DhNf3m127R6Awvtjb61uyj4ycAHojfpJLsf8Tts9s+f7VmcnQOHz0NYwSUoE0zPpiA5R4PaqT/iUPbMrMOBW+zy090CSIOrBPUsrkB4IhU61mBN3dQtqeK3Pt8AeWLaxkNaYIsXBXhnOQf13eaHL78D934EFgoOtx0N7fZMlABYCADolc3Tqp6RN0dO9BqjF93P9qq/ZHcNWuH9vSAAOiB9JJagiO/fUb1HK20X/3D3qus1et/er7johBIcEZcAu4D4CANN2ELVbm70grs+GDcxegAj+nTP4LX5lF9slWhKQswEA5ADA6WyWwX9+1Sy4fr0E92/X7PXM2nvdXZY+JBPzUY+kFk73bLE8iW87B2nD374HHt5BEd5dXV9WguVI5dUkgOlMrw/iy5b5PrCsvWXDU0senp5YeITnmh+nswAYURDKpRGumTB+HUz6Ol3PExW6DmzgqX78rAdJswCmgzgihFQru//K6uwXd2fDHIAz7ELxwD4AIiHFV4cAud/f3dXg4butwQud5pZvXTksA+BbMgHnDgvKGTzEj+xnW958DQDecj/yFD73B6a8gROcvrsvHU+s8HYZwKzdMf4H9t1A4YS6nYaF387zk1My3KjHBwG0Dzz4/dHGttmj/nmfT4BIBCCnel7+U5a1LxLOFgCshsDCw4Cbqe8TgF9AIAC8f7tnl2XX26zk9DEHBQyR6wvmn0cG6xTz4JvQwxbsfX3F7597nWXnn8VEiZvnJCok8p3Rgtef5vkVPujW4uE3w3NtV86n0/or1zkP3pDZ7jhwizAK8gkz3Qc/B+HX5I6zEzy/q0qTuMmGacMhHkTNFHlQ0/8G/ABI/ymCvUttWPpTti1aQe7dSiEDEuKHZP45YrA72QPEfAfrawR84IO3JctEBUphpvF7afJyHZSaF3TEu3W5nOQuPFrDI102pqriIZVOQkGpCstL7ketjguuxfwgi+elvT9/3vhy3XV8jrEflmMkDgf+wSRAgrbLzpcMjj+X88D89kjCINcHk/DRzD+lAPdFzP07HADa39PldgDAtN0MYg5xOOX+qisvJr2/sDB/7V35niMZXPNwSmX8aR3fwiEheCCwh+1RAPbxXCcoykAqy9mHevBCOzM3zH0/tRIUigRWioaF8kN4OPCcNwVdZm60DKeMZIpGlQiYimhkjU1nIPS+veykvJtvdZNUTJ6CzDSdm9wbo956P98o9y773DTd+IPHPF8EP8/T3hSlDAPMUk8vURlI1Y7vscP6ho079ng+VauT1ZbYk/J4jhSrUETdBQaS1aF0/fDx8csC4QjHYxZ20/WVTtcHLyzEr7+QKqfuYT94YRG6shkEEh0GMFV66IGCVzahS6uRQ0fvrMRpO00NADh8aRW4tpvw8IMAiKjFbTSAmWs7fXGJ7YvLCn3n+rBS5i18cWmIwLnh4d9BoIzg3NUtiKB03jmAIJ5Lus5fXgtFmLm+5/tvk4uZHN/S9f1CAQPvdzKRzJQ6aKUKFDCYJRylE4xQPVy+Zhw5IWQuy6jMSh4q4RAphNkiFi3DtUsFpI/irhk1ilj6UBEL4Jot4zHMSrzNAfvlTLqMJzL/hKzhyQL1c0KSQKUadjaFe+7PtWnE2qCtpVxD8k4K1w64nDdlqtedP1cymi3lAimpvzUeAh4sZqKuTKZcd++eBIxiNmsByPFdc+V8+pCvZ2SU0sK93K1CAKxyPlvH5gsafRm45WQyqVtyZhoBlBBkA9he0CjySc2cCaSua9eX/EZeGYuPWGQyo9I+dbWkc6mo1YstDFp4tjI29X9HUetSWW/UFw2xAMhNWPJXe8t63cJmozabiR/jtPBVbqn1qbAKm30Dt1baTbz6PObbhnhTinprafdQ3K51e764fRiySBaKHN3i9tB7G8r7CZor8Gai9StOZwB8Xt4/NjgY9bIrDQ7BzpNDDQ5eiwf91y0eo+G1rjhKtKfJxZpehEjNbAAxH9s4/UFb23wwD7T5zAdSS41Oqdusxss+Wm50YnnpNjrlaLHbC61El+n2Vq+Yh1u9FrsUNjS7levNbqLzDmheei2vot/uSLPbe2u7X0P437T7jXbof214fE8tn+XObAn9Xsvn+4OmV/LVpteRC5vbfsf+5O+2/RoDG5ePoXdAE/+o8VmZmbHFnLut35hy8set35JdpPSb34t/1Pyul5uDEUBW+3/zYfv/fwIMAL0q4wSdiDSRAAAAAElFTkSuQmCC"
                 class="statusImg">
          </div>
        </div>
        <!--<p v-show="" style="color:#666; font-size: 0.9rem; padding: 5px 0; padding-bottom: 9px;">加载完成～</p>-->
      </van-list>
      <p v-if="listFinished" class="zwxx">暂无信息~</p>
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
        currentPage: 1,
        moneyType: '2',
        showCount: 10,
        userId: ''
      },
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    // this.getData()
  },
  methods: {
    onLoad () {
      const self = this
      self.params.userId = this.user.USER_ID
      setTimeout(() => {
        self.listLoading = true
        if (!self.statusS) {
          http({
            url: '/api/reward/moneyChangeList',
            method: 'post',
            data: this.params
          }).then(res => {
            self.datas = res.data.data
            self.params.currentPage = res.data.page.currentPage
            self.totalPage = res.data.page.totalResult
            // debugger
          }).catch(err => {
            console.error(err)
          }).finally(() => {
            self.listLoading = false
            self.statusS = true
          })
        } else {
          if (self.totalPage > (self.params.showCount * self.params.currentPage)) {
            self.params.currentPage = self.params.currentPage + 1
            http({
              url: '/api/reward/moneyChangeList',
              method: 'post',
              data: this.params
            }).then(res => {
              self.datas = self.datas.concat(res.data.data)
              self.params.currentPage = res.data.page.currentPage
              self.totalPage = res.data.page.totalResult
            }).catch(err => {
              console.error(err)
            }).finally(() => {
              self.listLoading = false
            })
          } else {
            self.listLoading = false
            self.listFinished = true
          }
        }
      }, 500)
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
