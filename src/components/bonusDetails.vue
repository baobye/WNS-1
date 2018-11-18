<template>
  <div id="apps">
    <div class="bonusDetails">
      <div class="teamList-header">
        <van-nav-bar
          title="奖金明细"
          left-arrow
          @click-left="onBack"
        />
      </div>
      <div class="bonusDetails-con">
        <!--<van-panel title="标题" desc="描述信息" status="状态">-->
        <!--</van-panel>-->
        <van-checkbox-group v-model="result" class="resultS">
          <van-checkbox
            v-for="(item, index) in list"
            :key="index"
            :name="item.value"
          >
            {{ item.name }}
          </van-checkbox>
        </van-checkbox-group>
        <ul>
          <van-list
            v-model="listLoading"
            :finished="listFinished"
            @load="onLoad"
          >
            <li class="bonusDetails-item" v-for="(item,index) in datas" :key="index">
              <div class="item-left">
                <span>{{item.REASON}}</span>
                <p>奖金来源:
                  <span v-if="item.TYPE == 1">直推奖</span>
                  <span v-else-if="item.TYPE == 2">领导奖</span>
                  <span v-else-if="item.TYPE == 3">点点奖</span>
                  <span v-else-if="item.TYPE == 4">分红奖</span>
                  <span v-else-if="item.TYPE == 5">店补奖</span>
                  <span v-else></span>
                </p>
              </div>
              <div class="item-right">
                <span>{{item.MONEY}}</span>
                <p>{{item.START_TIME}}</p>
              </div>
            </li>
          </van-list>
          <p v-show="listFinished" style="color:#666; font-size: 0.9rem; padding: 5px 0; padding-bottom: 9px;">加载完成～</p>
        </ul>
        <p v-if="listFinished" class="zwxx">暂无信息~</p>
        <!--<van-pagination-->
        <!--v-model="pageNumber.totalPage"-->
        <!--:page-count="pageNumber.currentPage"-->
        <!--mode="simple"-->
        <!--/>-->
      </div>
    </div>
  </div>

</template>

<script>
import http from '../utils/request'

export default {
  name: 'aboutMe',
  data () {
    return {
      datas: [],
      listLoading: false,
      listFinished: false,
      showCount: 12,
      totalPage: 0,
      params: {
        currentPage: 1,
        endDate: '',
        showCount: 10,
        startDate: '',
        status: '0',
        types: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7'
        ],
        userId: ''
      },
      user: {},
      list: [
        {
          name: '直推奖',
          value: '1'
        },
        {
          name: '领导奖',
          value: '2'
        },
        {
          name: '点点奖',
          value: '3'
        },
        {
          name: '分红奖',
          value: '4'
        },
        {
          name: '店补奖',
          value: '5'
        }
      ],
      result: [],
      statusS: false
    }
  },
  watch: {
    result (newQuestion, oldQuestion) {
      if (newQuestion.length > 0) {
        this.params.types = newQuestion
      } else {
        this.params.types = [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7'
        ]
      }
      this.getInitData()
    }
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    // this.getInitData()
  },
  methods: {
    onLoad () {
      const self = this
      self.params.userId = this.user.USER_ID
      setTimeout(() => {
        // debugger
        self.listLoading = true
        if (!self.statusS) {
          http({
            url: '/api/reward/info',
            method: 'post',
            data: self.params
          }).then(function (res) {
            self.datas = res.data.data
            self.params.currentPage = res.data.page.currentPage
            self.totalPage = res.data.page.totalResult
          }).catch(function (error) {
            console.log(error)
          }).finally(() => {
            self.listLoading = false
            self.statusS = true
          })
        } else {
          if (self.totalPage > (self.params.showCount * self.params.currentPage)) {
            self.params.currentPage = self.params.currentPage + 1
            http({
              url: '/api/reward/info',
              method: 'post',
              data: self.params
            }).then(function (res) {
              self.datas = self.datas.concat(res.data.data)
              self.params.currentPage = res.data.page.currentPage
              self.totalPage = res.data.page.totalResult
            }).catch(function (error) {
              console.log(error)
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
    // getInitData () {
    //   const self = this
    //   // this.params.userId = this.user.USER_ID
    //
    // },
    onBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
  @import url('../assets/css/about.less');

  .resultS {
    margin: 10px 0;
    overflow: hidden;
    .van-checkbox {
      text-align: center;
      width: 19%;
      margin: 0 0.5%;
      float: left;
      span {
        display: inline-block;
        width: 100%;
        border: 1px solid #666666;
        /*background: #;*/
        box-sizing: border-box;
        /*height: 35px;*/
        /*line-height: 35px;*/
        border-radius: 5px;
        font-size: 0.9rem;
        padding: 5px;
        margin: 0 !important;
      }
    }
    .van-icon {
      display: none;
    }
  }

  .van-checkbox {
    line-height: 35px !important;
  }

  .van-checkbox__icon {
    display: none;
  }

  .van-checkbox__icon--checked + .van-checkbox__label {
    background: #00b4d2 !important;
    color: #fff !important;
    border-color: #00b4d2 !important;
  }
  .zwxx{
    //border-top: 1px solid #666;
    font-size: 0.9rem;
    color: #666;
  }
</style>
