<template>
  <div class="container">
    <div class="top">
      <img class="logo" src="./logo.png" alt="">
      <div class="tip">好友向您发出求助，索取100积分</div>
      <img class="banner" src="./banner.png" alt="">
    </div>
    <div class="header-wrap col a-c j-c">
      <img class="headerImg" :src="getIntegral.imgurl" alt="">
      <div class="headerName">{{getIntegral.orgname}}</div>
    </div>
    <div class="content col a-c j-c">
      <img class="bg" src="./bg.png" alt="">
      <transition name="slide-fade">
        <div class="cont row a-c j-b" v-if="slideshow && dataList.length">
          <img class="header" :src="dataList[msgIndex].postorglogo" alt="">
          <div class="msg">{{dataList[msgIndex].postorgname}}赠予{{dataList[msgIndex].getorgname}}</div>
          <div class="" style="color:#897f71">100积分</div>
        </div>
      </transition>
      <div class="wrap col a-c j-c">
        <div class="item col a-c j-c">
          <div class="tip">每次赠予100积分，赠与次数不限</div>
          <div class="tip">好友同意赠予后，即获得积分</div>
          <div class="share row a-c j-c" @click="_postgift">同意赠予好友</div>
        </div>
      </div>

    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { getGift, getinfobyid, postgift } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      msgIndex: 0,
      dataList: [

      ],
      slideshow: true,
      getIntegral: ''



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // 改变消息对象索引
    window.setInterval(() => {
      if (this.msgIndex < this.dataList.length - 1) {
        this.msgIndex++
      } else if (this.msgIndex >= this.dataList.length - 1) {
        this.msgIndex = 0
      }

    }, 3000)
    // 控制消息显示隐藏
    window.setInterval(() => {
      this.slideshow = !this.slideshow
    }, 1500)
    this._getGift()
    this._getinfobyid(this.$route.query.id)
  },
  methods: {
    _postgift() {
      postgift({
        getid: this.$route.query.id
      }).then(res => {
        console.log('同意赠送积分', res)
        Toast(res.msg)

      })
    },

    _getinfobyid(oid) {
      getinfobyid({
        oid,
      }).then(res => {
        console.log('索要用户信息', res)
        this.getIntegral = res.data.info

      })
    },
    _getGift() {
      getGift({
      }).then(res => {
        console.log('赠送数据', res)
        this.dataList = res.data.list

      })
    },

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  background-color #f2f2f2
  top 0px
  width 100%
  height 100%
  bottom 0
  .top
    position relative
    color #ffffff
    font-weight 700
    .logo
      position absolute
      width 177px
      left 38px
      top 22px
    .title
      position absolute
      left 50%
      transform translate(-50%, -50%)
      top 43%
      font-size 41px
    .tip
      position absolute
      white-space nowrap
      left 50%
      top 47%
      font-size 36px
      transform translate(-50%, -50%)
    .banner
      width 100%
  .header-wrap
    position relative
    z-index 1
    margin-bottom 120px
    margin-top -80px
    .headerImg
      width 119px
      border-radius 50%
      margin-bottom 20px
  .content
    width 750px
    position relative
    margin-top -50px
    .bg
      width 691px
    .cont
      top 50px
      position absolute
      width 661px
      font-size 27px
      .header
        width 70px
        height 70px
        border-radius 50px
      .msg
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
        width 400px
    .wrap
      position relative
      z-index 1
      width 691px
      font-size 27px
      padding 0 20px
      .item
        // top 150px
        position relative
        background #ffffff
        width 691px
        border-bottom-left-radius 10px
        border-bottom-right-radius 10px
        .tip
          font-weight 700
          font-size 32px
          color #000000
        .share
          width 600px
          height 91px
          background-color #a29076
          border-radius 10px
          color #ffffff
          font-size 36px
          font-weight 700
          margin-top 30px
          margin-bottom 60px
</style>
<style >
/* 消息动画 */
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
</style>