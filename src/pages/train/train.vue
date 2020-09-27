s<template>
  <div class="container col ">
    <div class="bannerWrapper">
      <img class="banner" src="./banner.png" alt="" />
      <div class="avertwraper row a-c ">
        <img class="avert" :src="userinfo.imgurl" alt="">
        <div class="name col">
          <div class="row a-c">
            <div class="orgname">{{userinfo.orgname}}</div>
            <img class="sincerity" src="./sincerity.png" alt="" />
          </div>
          <div class="integral">当前积分 {{capi.integral}}</div>
        </div>
      </div>
      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="integral">获得积分</div>
    </div>
    <div class="itemWrapper row f-w j-b " ref="itemwrapper">
      <div class="item col j-c a-c border-right" @click="VideoList(18)">
        <img src="./icon1.png" alt="" />
        <div class="text-wrap">
          <div class="text1">专属课程</div>
          <div class="text2">EXCLUSIVE COURSE</div>
        </div>
      </div>
      <!-- <div class="item col j-c a-c  border-right" @click="VideoList(19)">
        <img src="./integralcourse.png" alt="" />
        <div>积分课程</div>
      </div>
      <div class="item col j-c a-c " @click="VideoList(20)">
        <img src="./pay.png" alt="" />
        <div>付费课程</div>
      </div> -->
      <div class="item col j-c a-c" @click="integralRank()">
        <img src="./icon2.png" alt="" />
        <div class="text-wrap">
          <div class="text1">专属积分</div>
          <div class="text2">HONESTLY INTEGRAL</div>
        </div>
      </div>
      <div class="item col j-c a-c  border-right" @click="broadcast()">
        <img src="./icon3.png" alt="" />
        <div class="text-wrap">
          <div class="text1">专属直播</div>
          <div class="text2">LIVE HONESTLY</div>
        </div>
      </div>
      <div class="item col j-c a-c " @click="memorial()">
        <img src="./icon4.png" alt="" />
        <div class="text-wrap">
          <div class="text1">专属讣告</div>
          <div class="text2">EXCLUSIVE OBITUARY</div>
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c">
      <img src="./btm.png" alt="" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getinfo, selfDetail } from 'api/index'
export default {
  data() {
    return {
      userinfo: '',
      capi: ''


    }
  },
  mounted() {
    this._getinfo()
    // this.computedHeight()
    // window.addEventListener('resize', () => {
    //   this.computedHeight()
    // })
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {
    computedHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        console.log('执行')
        // this.$refs.itemwrapper.style.height = document.documentElement.clientHeight/100 + 'rem'
        this.$refs.itemwrapper.style.height = window.screen.availHeight + 'rem'
      }, 10)
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
    _getinfo() {
      getinfo().then(res => {
        console.log('获取商家信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
          this.capi = res.data.capi
          let shopId = this.userinfo.id
          localStorage.setItem("shopId",shopId)
        } else {
          this.$router.push({
            path: '/login',
          })
        }
      })

    },
    broadcast() {
      window.location.href = "https://appt2ipqewv9303.h5.xiaoeknow.com/mp_more/eyJpZCI6IjI1MDU3MDgiLCJjaGFubmVsX2lkIjoiIiwiY29tcG9uZW50X2lkIjoiIn0?entry=2&entry_type=2001"

    },
    yiJing() {
      this.$router.push({ path: '/yiJing' })
    },
    VideoList(cate) {
      this.$router.push({
        path: '/VideoList',
        query: {
          cate: cate,
        }

      })
    },
    memorial() {
      this.$router.push({ path: '/memorial' })
    },
    mechan() {
      this.$router.push({ path: '/mechan' })
    },
    integralRank() {
      this.$router.push({ path: '/integralRank' })
    },

    integral() {
      this.$router.push({ path: '/integral' })
    },

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
        .row
          .orgname
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
            text-overflow ellipsis
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
      width 170px
      height 50px
      border-radius 25px
      border 2px solid #c1b199
      right 13px
      bottom 25px
      color #c1b199
      font-size 30px
      z-index 100
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
      background-color #b2a189
      .text-wrap
        position absolute
        top 20px
        left 20px
        .text1
          font-size 30px
        .text2
          font-size 13px
      img
        width 115px
        position absolute
        bottom 0
        right 0
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
