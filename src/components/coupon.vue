<template>
  <div id="apps">
    <div class="bonusDetails">
      <div class="teamList-header">
        <van-nav-bar
          title="优惠卷"
          left-arrow
          @click-left="onBack"
        />
      </div>
      <div class="coupon-con">
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />

        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </div>
    </div>
  </div>

</template>

<script>
import http from '../utils/request'

const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  originCondition: 0,
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000
}

export default {
  name: 'coupon',
  components: {},
  data () {
    return {
      showList: false,
      datas: [],
      user: {},
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    }
  },
  created () {
  },
  methods: {
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    onBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
  @import url('../assets/css/about.less');
  /*.bonusDetails-con-total{*/
  /*.bonusDetails-con-key{*/
  /*margin-bottom: 2%;*/
  /*}*/
  /*ul{*/
  /*box-sizing: border-box;*/
  /*width: 95%;*/
  /*border-radius: 5px;*/
  /*display: block;*/
  /*margin: 0 auto;*/
  /*border: 1px solid #ccc;*/
  /*margin-bottom: 3%;*/
  /*h4{*/
  /*box-sizing: border-box;*/
  /*font-size: 0.9rem;*/
  /*color: #333;*/
  /*margin: 0;*/
  /*!*margin-left: 2% !important;*!*/
  /*padding: 2% 2%;*/
  /*!*text-align: left;*!*/
  /*border-bottom: 1px solid #ccc;*/
  /*}*/
  /*.item-left{*/
  /*span{*/
  /*font-size: 0.9rem !important;*/
  /*color: #666 !important;*/
  /*}*/
  /*}*/
  /*}*/
  /*}*/
</style>
