<template>
  <div class="container col a-c">
    <!-- <img class="banner" src="./banner.png" alt=""> -->
    <div class="top col a-c j-c">
      <div class="intergralCon row a-c">
        <div class="intergral">{{capi.integral}}</div>
        <div class="">积分</div>
      </div>
      <div class="btn row a-c j-c" @click="record">积分纪录</div>
    </div>
    <div class="content">
      <!-- <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">获得1000积分</div>
          </div>
          <div class="des">关注“家族宝诚商联盟”服务号
            并登录诚商入口</div>
          <div class="tip">在诚商联盟公众号内完成在每日签到</div>
        </div>
        <div class="btn row a-c j-c" v-if="loginsign" @click="_loginsign">领取</div>
        <div class="btn row a-c j-c" v-else>已领取</div>
      </div> -->
      <!-- <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">获得10积分</div>
          </div>
          <div class="des">每日签到</div>
          <div class="tip">在诚商联盟公众号内完成在每日签到</div>
        </div>
        <div class="btn row a-c j-c" v-if="sign" @click="_sign">签到</div>
        <div class="btn row a-c j-c" v-else>已签到</div>
      </div>-->
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col j-a" style="height:100%">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">获得1:10积分</div>
          </div>
          <div class="des">完成家族宝进货换取积分</div>
          <div class="tip" style="white-space:nowrap">根据进货金额按10元货得1积分原则兑换积分</div>
        </div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col j-a" style="height:100%">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">学习得积分</div>
          </div>
          <div class="des">线下学习获得积分</div>
          <div class="tip">公司报名学习1元积1分（如：300元会务费即得300元积分)每多加一位员工+10积分</div>
        </div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col j-a" style="height:100%">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">排名得积分</div>
          </div>
          <div class="des">当月增长率前十名奖励300积分</div>
          <div class="tip" style="white-space:nowrap">增长率计算方法为</div>
          <div class="tip">（当月进货额—前三个月进货额平均值/前三个月进货平均值）</div>
        </div>
        <div class="btn row a-c j-c" @click="integralRank">查看排名</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col j-a" style="height:100%">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">与好友索要获得积分</div>
          </div>
          <div class="des">分享给好友索要积分</div>
          <div class="tip">每次索要积分为100积分，不限次数。</div>
          <div class="tip">好友同意赠予积分后，即获得积分。</div>
        </div>
        <div class="btn row a-c j-c" @click="getIntegral">索要积分</div>
      </div>
    </div>
    <!-- <van-popup v-model="show" class="pop " round>
      <div class="wrapper col a-c">
        <div class="title">兑换积分</div>
        <div class="des">必须为10的倍数进行兑换</div>
        <input class="input" type="number" placeholder="请输入兑换数量" v-model="num">
        <div class="get">可获得积分：{{num / 10}}</div>
        <div class="btn row a-c j-c" @click="confirm">立即兑换</div>
      </div>
    </van-popup> -->
  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
import { Integral, sign, loginsign } from 'api/index'
export default {
  data() {
    return {
      show: false,
      num: '',
      loginsign: '',
      sign: '',
      capi: ''

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._Integral()
    window.WeixinJSBridge.call('hideOptionMenu');


  },
  methods: {
    getIntegral() {
      this.$router.push({
        path: '/getIntegral',

      })
    },
    integralRank() {
      this.$router.push({
        path: '/integralRank',
        query: {
          type: 4,
        }
      })
    },
    _Integral() {
      Integral().then(res => {
        console.log('获取积分状态', res)
        this.capi = res.data.capi
        this.loginsign = res.data.loginsign
        this.sign = res.data.sign

      })
    },
    _sign() {
      sign().then(res => {
        console.log('签到', res)
        if (res.code == 0) {
          Toast('签到成功')
          this._Integral()
        } else {
          Toast(res.msg)
        }
      })
    },
    _loginsign() {
      loginsign().then(res => {
        console.log('领取', res)
        if (res.code == 0) {
          Toast('领取成功')
          this._Integral()
        } else {
          Toast(res.msg)
        }
      })
    },
    record() {
      this.$router.push({
        path: '/IntegralRecord',

      })
    },
    exchange() {
      this.show = true
    },
    confirm() {
      Toast('兑换成功')
      this.show = false
    }

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 340px
    position absolute
  .top
    width 100%
    height 278px
    z-index 1
    color #000000
    top 0
    .intergralCon
      font-size 35px
      margin-top 40px
      .intergral
        font-size 72px
        font-weight 700
    .btn
      width 146px
      height 46px
      border-radius 23px
      border 2px solid #ffffff
      font-size 27px
      margin-top 24px
      border 2px solid #969696
  .content
    width 690px
    // box-shadow 1px 1px 5px #eaeaea
    // border-radius 20px
    margin-bottom 70px
    background-color #ffffff
    .item
      border 2px solid #000000
      padding 10px 40px
      height 226px
      margin-top 20px
      img
        width 30px
        height 32px
        margin-right 5px
      .left
        // width 400px
        .row
          .title
            color #000000
            font-size 32px
        .des
          font-size 27px
          color #000000
          margin-top 10px
        .tip
          font-size 25px
          color #d5d5d5
          margin-top 10px
      .btn
        width 133px
        height 55px
        border-radius 5px
        background-color #b9a484
        color #ffffff
        font-size 27px
        position absolute
        right 50px
        top 50px
  .pop
    .wrapper
      width 475px
      height 100%
      background-color #ffffff
      border-radius 30px
      overflow hidden
      color #b9a484
      .title
        font-size 75px
        margin-top 47px
        font-weight 700
      .des
        font-size 27px
      .input
        width 399px
        height 83px
        border 1px solid #b9a484
        margin-top 30px
        padding 10px
      .get
        margin-top 20px
        font-size 35px
      .btn
        margin-top 10px
        width 246px
        height 73px
        border-radius 36px
        background-color #b9a484
        color #ffffff
        font-size 35px
        margin-bottom 40px
</style>