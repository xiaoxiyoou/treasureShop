<template>
  <div class="container col a-c">
    <!-- <img class="banner" src="./banner.png" alt=""> -->
    <div class="top row j-b a-c">
      <div class="item row a-c">
        <!-- <img class="grail" src="./grail.png" alt="">
        <div>积分排行榜</div> -->
      </div>
      <div class="btn row a-c j-c" @click="IntegralRecord">积分纪录</div>
    </div>
    <div class="mid row j-b a-c">
      <div class="item col a-c" style="width:25%">
        <div class="title">我的排名</div>
        <div class="des">{{self.rank}}</div>
      </div>
      <div class="item col a-c">
        <img class="titleImg" :src="self.imgurl" alt="">
        <div class="title2" style="color:#000000">{{self.orgname}}</div>
      </div>
      <div class="item col a-c" style="width:25%">
        <div class="title">积分</div>
        <div class="des">{{self.integral}}</div>
      </div>
    </div>
    <div class="content">
      <div class="tab row a-c  van-hairline--bottom">
        <div class="tabItem row a-c" v-for="(item,index) in title" :class="{'active':isActive==index}" :key="index" @click="tab(index)">{{item}}</div>
      </div>
      <div class="item row a-c j-b " v-for="(item,index) in list" :key="index">
        <div class="left row a-c">
          <img class="titleImg" v-if="index == 0" src="./champion.png" alt="">
          <img class="titleImg" v-else-if="index == 1" src="./June.png" alt="">
          <img class="titleImg" v-else-if="index == 2" src="./runner.png" alt="">
          <div class="title row a-c j-c" v-else>1</div>
          <div>
            <img class="headImg" :src="item.imgurl" alt="">
          </div>
          <div class="tip">{{item.orgname}}</div>
        </div>
        <div class="btn row a-c j-c">{{item.integral}}积分</div>
      </div>

      <noMessage :noinfoShow="noinfoShow" />
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { IntegralRank } from 'api/index'
export default {
  data() {
    return {
      title: ['总积分排行'],
      isActive: 0,
      noinfoShow: false,
      list: [],
      self: ""

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._IntegralRank()
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {
    _IntegralRank() {
      IntegralRank().then(res => {
        console.log('积分排行', res)
        this.list = res.data.list
        this.self = res.data.self
      })
    },

    tab(flag) {
      this.isActive = flag
    },
    IntegralRecord() {
      this.$router.push({
        path: '/IntegralRecord',

      })
    }

  },
  components: {
    noMessage
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
    position absolute
    width 100%
    height 310px
    z-index -1
  .top
    width 703px
    padding 0 19px 0 26px
    margin-top 41px
    text-align right
    .item
      font-size 44px
      .grail
        width 42px
        height 44px
        margin-right 20px
    .btn
      color #000000
      width 146px
      height 46px
      // background-color #b8275c
      border-radius 23px
      border 2px solid #969696
      font-size 27px
  .mid
    width 690px
    background-color #ffffff
    margin-top 36px
    height 165px
    padding 0 50px
    // border-radius 20px
    // box-shadow 1px 1px 5px #eaeaea
    border 2px solid #000000
    white-space nowrap
    .item
      .titleImg
        width 135px
        height 135px
        border-radius 50%
        margin-top -67px
        box-shadow 1px 1px 5px #eaeaee
      .title
        font-size 32px
        color #666666
        margin-bottom 10px
      .des
        font-size 27px
        color #b9a484
      .title2
        color #666666
        font-size 32px
        margin-bottom 30px
        margin-top 10px
        overflow hidden
        // display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
        width 300px
        text-align center
        margin-top 10px
.content
  width 691px
  // box-shadow 1px 1px 5px #eaeaea
  // border-radius 20px
  background-color #ffffff
  margin-top 22px
  border 2px solid #000000
  .tab
    margin 0 38px 0 56px
    height 85px
    .tabItem
      height 100%
      font-size 30px
    .active
      color #b9a484
      border-bottom 3px solid #b9a484
  .item
    margin 0 38px 0 56px
    height 155px
    .left
      width 400px
      .title
        color #333333
        font-weight 700
        font-size 30px
        margin-right 30px
        width 52px
        height 61px
      .headImg
        width 75px
        height 75px
        border-radius 50%
        margin-right 10px
        display block
      .titleImg
        width 42px
        height 38px
        margin-right 30px
      .des
        font-size 27px
        color #808080
      .tip
        font-size 27px
        color #969696
        margin-top 5px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
    .btn
      margin-right 50px
      color #000000
</style>