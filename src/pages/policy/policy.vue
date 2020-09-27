<template>
  <div class="container col">
    <div class="bannerWrapper">
      <img class="banner" src="./banner.png" alt="" />
      <!-- <div class="avertwraper row a-c " @click="personalCenter">
        <img class="avert" :src="userinfo.headimgurl" alt="">
        <div class="name col">
          <div class="row a-c" >
            <div>{{userinfo.nickname}}</div>
            <img class="sincerity" src="./sincerity.png" alt="" />
          </div>
          <div class="integral">当前积分  120 </div>
        </div>
      </div>
      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="personalCenter">赋予爱商家入口</div> -->
    </div>
    <div class="itemWrapper row j-b f-w ">
      <div class="item col j-c a-c " @click="alliancePolicy()">
        <img src="./icon1.png" alt="" />
        <div class="text-wrap">
          <div class="text1">联盟政策</div>
          <div class="text2">UNION POLICY</div>
        </div>
      </div>
      <div class="item col j-c a-c " @click="toCase(1)">
        <img src="./icon3.png" alt="" />
        <div class="text-wrap">
          <div class="text1">联盟案例</div>
          <div class="text2">UNION CASE</div>
        </div>
      </div>
      <div class="item col j-c a-c " @click="toCase(2)">
        <img src="./icon4.png" alt="" />
        <div class="text-wrap">
          <div class="text1">团体标准</div>
          <div class="text2">GROUP STANDARD</div>
        </div>
      </div>
      <div class="item col j-c a-c " @click="btmbanner()">
        <img src="./icon5.png" alt="" />
        <div class="text-wrap">
          <div class="text1">殡业获客神器</div>
          <div class="text3">加入赋予爱</div>
        </div>
        <img class="finger " src="./finger.png" alt="">
      </div>
      <!-- <div class="btm-wrap">
        <img class="btmbanner" src="./btmbanner.png" alt="" @click="btmbanner">
      </div> -->
    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c">
      <img src="./btm.png" alt="" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getuserinfo, selfDetail } from 'api/index'
export default {
  data() {
    return {
      userinfo: ''


    }
  },
  mounted() {
    // this._selfDetail()
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {
    btmbanner() {
      window.location.href = "http://b.fuyulove.com/extion/invited.aspx?extid=6"
    },
    add() {
      this.$router.push({
        path: '/add',

      })

    },
    _selfDetail() {
      selfDetail().then(res => {
        console.log('信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
        } else {
          this.$router.push({
            path: '/login',
          })
        }

      })

    },
    _getuserinfo() {
      getuserinfo().then(res => {
        console.log('用户信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.userinfo
        } else {
          this.$router.push({
            path: '/login',
          })
        }
      })

    },
    toCase(catid) {
      this.$router.push({
        path: '/case',
        query: {
          catid: catid,
        }
      })
    },
    brand() {
      this.$router.push({ path: '/brand' })
    },
    mechan() {
      this.$router.push({ path: '/mechan' })
    },
    alliancePolicy() {
      this.$router.push({ path: '/alliancePolicy' })
    },
    personalCenter() {
      this.$router.push({ path: '/personalCenter' })
    },

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
@keyframes finger
  0%
    transform translate(-5px)
  25%
    transform translate(5px)
  50%
    transform translate(-5px)
  75%
    transform translate(5px)
  100%
    transform translate(-5px)
.container
  position absolute
  top 0px
  width 100%
  height 100%
  .bannerWrapper
    position relative
    .banner
      width 100%
      height 549px
      vertical-align bottom
    .avertwraper
      position absolute
      color #ffffff
      bottom 40px
      left 43px
      z-index 1
      font-size 35px
      .avert
        border-radius 50%
        width 139px
        height 139px
        border 1px solid #ffffff
        margin-right 16px
      .name
        font-size 35px
        margin-top 45px
        img
          width 38px
          margin-left 10px
        .integral
          margin-top 8px
          font-size 27px
    .shadow
      position absolute
      height 141px
      background rgba(0, 0, 0, 0.5)
      bottom 0
      width 100%
    .center
      position absolute
      width 270px
      height 50px
      background-color #a9365d
      border-radius 25px
      right 13px
      bottom 25px
      color #ffffff
      font-size 30px
  .itemWrapper
    color #ffffff
    padding 30px 35px
    font-size 30px
    height auto
    overflow scroll
    position absolute
    width 100%
    bottom 96px
    top 549px
    .border-right
      border-right 2px solid rgba(255, 255, 255, 0.2)
    .border-bottom
      border-bottom 2px solid rgba(255, 255, 255, 0.2)
    .item
      position relative
      width 48%
      height 45%
      border-radius 10px
      background-color #a29076
      .finger
        position absolute
        left 144px
        top 65px
        width 80px
        animation finger infinite 2s
      .text-wrap
        position absolute
        top 20px
        left 20px
        .text1
          font-size 30px
        .text2
          font-size 13px
        .text3
          font-size 24px
      img
        width 115px
        position absolute
        bottom 0
        right 0
    .btm-wrap
      position relative
      .btmbanner
        width 677px
        height 253px
        margin-top 15px
        border-radius 10px
  .bar
    width 100%
    height 96px
  .btm
    background-color #a29076
    position fixed
    bottom 0
    width 100%
    height 96px
    img
      width 152px
</style>
