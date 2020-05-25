<template>
  <div class="container col a-c">
    <img class="banner" src="./banner.png" alt="">
    <div class="top col a-c j-c">
      <div class="intergralCon row a-c">
        <div class="intergral">2855</div>
        <div class="">积分</div>
      </div>
      <div class="btn row a-c j-c" @click="record">积分纪录</div>
    </div>
    <div class="content">
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">获得1000积分</div>
          </div>
          <div class="des">关注“家族宝诚商联盟”服务号
            并登录诚商入口</div>
          <div class="tip">在诚商联盟公众号内完成在每日签到</div>
        </div>
        <div class="btn row a-c j-c">领取</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">获得10积分</div>
          </div>
          <div class="des">每日签到</div>
          <div class="tip">在诚商联盟公众号内完成在每日签到</div>
        </div>
        <div class="btn row a-c j-c">签到</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="row a-c">
            <img class="icon" src="./icon.png" alt="">
            <div class="title">获得1:10积分</div>
          </div>
          <div class="des">完成家族宝进货换取积分</div>
          <div class="tip">根据进货金额按10元货得1积分原则兑换积分</div>
        </div>
        <div class="btn row a-c j-c" @click="exchange">兑换</div>
      </div>
    </div>
    <van-popup v-model="show" class="pop " round>
      <div class="wrapper col a-c">
        <div class="title">兑换积分</div>
        <div class="des">必须为10的倍数进行兑换</div>
        <input class="input" type="number" placeholder="请输入兑换数量" v-model="num">
        <div class="get">可获得积分：{{num / 10}}</div>
        <div class="btn row a-c j-c" @click="confirm">立即兑换</div>
      </div>
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
export default {
  data() {
    return {
      show: false,
      num: ''


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
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
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 340px
  .top
    width 100%
    height 340px
    position absolute
    z-index 1
    color #ffffff
    top 0
    .intergralCon
      font-size 35px
      .intergral
        font-size 72px
    .btn
      width 146px
      height 46px
      border-radius 23px
      border 2px solid #ffffff
      font-size 27px
      margin-top 20px
  .content
    width 690px
    box-shadow 1px 1px 5px #eaeaea
    border-radius 20px
    margin-top -70px
    background-color #ffffff
    .item
      margin 0 62px 0 33px
      height 202px
      img
        width 30px
        height 32px
        margin-right 5px
      .left
        width 400px
        .row
          .title
            color #b9a484
        .des
          font-size 27px
          color #808080
        .tip
          font-size 25px
          color #d5d5d5
      .btn
        width 133px
        height 55px
        border-radius 5px
        background-color #b9a484
        color #ffffff
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