s<template>
  <div class="container col j-b">
    <div class="bannerWrapper">
      <img class="banner" src="./banner.png" alt="" />
      <div class="avertwraper row a-c ">
        <img class="avert" :src="userinfo.imgurl" alt="">
        <div class="name col">
          <div class="row a-c">
            <div>{{userinfo.orgname}}</div>
            <img class="sincerity" src="./sincerity.png" alt="" />
          </div>
          <div class="integral">当前积分 {{capi.integral}}</div>

        </div>
      </div>

      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="integral">获得积分</div>
    </div>
    <div class="item-wrapper row f-w j-c a-c">
      <div class="item col j-c a-c border-right" @click="VideoList(18)">
        <img src="./course.png" alt="" />
        <div>免费课程</div>
      </div>
      <div class="item col j-c a-c  border-right" @click="VideoList(19)">
        <img src="./integralcourse.png" alt="" />
        <div>积分课程</div>
      </div>
      <div class="item col j-c a-c " @click="VideoList(20)">
        <img src="./pay.png" alt="" />
        <div>付费课程</div>
      </div>
      <div class="item col j-c a-c border-right" @click="integralRank()">
        <img src="./integral.png" alt="" />
        <div>诚商积分</div>
      </div>
      <div class="item col j-c a-c  border-right" @click="broadcast()">
        <img src="./broadcast.png" alt="" />
        <div>诚商直播</div>
      </div>
      <div class="item col j-c a-c " @click="memorial()">
        <img src="./pay.png" alt="" />
        <div>专属讣告</div>
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
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {
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
        console.log('用户信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
          this.capi = res.data.capi
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
  background-color #b2a189
  .bannerWrapper
    position relative
    .banner
      width 100%
      height 590px
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
      width 170px
      height 50px
      border-radius 25px
      border 2px solid #c1b199
      right 13px
      bottom 25px
      color #c1b199
      font-size 30px
  .item-wrapper
    color #ffffff
    font-size 30px
    height 500px
    .border-right
      border-right 2px solid rgba(255, 255, 255, 0.2)
    .border-bottom
      border-bottom 2px solid rgba(255, 255, 255, 0.2)
    .item
      width 33%
      height 100px
      img
        width 57px
        margin-bottom 15px
  .bar
    width 100%
    height 96px
  .btm
    background-color #797062
    position fixed
    bottom 0
    width 100%
    height 96px
    img
      width 152px
</style>
