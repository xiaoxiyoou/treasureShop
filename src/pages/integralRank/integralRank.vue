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
      <div class="tab row a-c j-b van-hairline--bottom">
        <div class="tabItem row a-c " v-for="(item,index) in title" :class="{'active':isActive==item.type}" :key="index" @click="tab(item.type)">{{item.name}}</div>
      </div>
      <div class="item row a-c j-b " v-for="(item,index) in list" :key="index">
        <div class="left row a-c">
          <img class="titleImg" v-if="index == 0" src="./champion.png" alt="">
          <img class="titleImg" v-else-if="index == 1" src="./June.png" alt="">
          <img class="titleImg" v-else-if="index == 2" src="./runner.png" alt="">
          <div class="title row a-c j-c" v-else>{{index + 1}}</div>
          <div>
            <img class="headImg" :src="item.imgurl" alt="">
          </div>
          <div class="tip">{{item.orgname}}</div>
        </div>
        <div class="btn row4 a-c j-c" v-if="type == 4">{{item.integral}}%</div>
        <div class="btn row2 a-c j-c" v-else>{{item.integral}}积分</div>
      </div>
      <noMessage :noinfoShow="noinfoShow" />
    </div>
    <div class="btmFix row a-c j-c"></div>
    <div class="btnCord row j-c a-c" @click="getCord">获取积分</div>
  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { IntegralRank } from 'api/index'
export default {
  data() {
    return {
      // title: [{ name: '总计积分', type: 0 }, { name: '学习积分', type: 1 }, { name: ' 当月积分', type: 3 }, { name: '增长排名', type: 4 }],
      title: [{ name: '学习使用排名', type: 1 }, { name: ' 线下学习积分', type: 5 }, { name: '增长率排名', type: 4 }],
      isActive: this.$route.query.type || 1,
      noinfoShow: false,
      list: [],
      self: "",
      type: this.$route.query.type || 1

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._IntegralRank(this.type)
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {

    _IntegralRank(type) {
      IntegralRank({
        type: type
      }).then(res => {
        console.log('积分排行', res)
        this.list = res.data.list
        this.self = res.data.self
      })
    },

    tab( type) {
      this.isActive = type
      this.type = type
      this._IntegralRank(type)
    },
    IntegralRecord() {
      this.$router.push({
        path: '/IntegralRecord',

      })
    },
    getCord() {
        this.$router.push({
        path: '/integral',

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
  // position absolute
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
    height 44px
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
  padding-bottom 200px
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
        width 42px
        height 38px
      .headImg
        width 75px
        height 75px
        border-radius 50%
        display block
        margin-left 15px
      .titleImg
        width 42px
        height 38px
      .des
        font-size 27px
        color #808080
      .tip
        margin-left 15px
        font-size 27px
        color #969696
        margin-top 5px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
        width 280px
    .btn
      color #000000
.btmFix
  position fixed
  bottom 0
  width 100%
  background-color #7c7161
  opacity 0.6
  height 136px
  z-index 1000
.btnCord
  position fixed
  bottom 18px
  width 600px
  height 91px
  border-radius 10px
  background-color #ffffff
  color #7c7161
  font-size 36px
  font-weight 700
  left 50%
  transform translateX(-50%)
  z-index 1001
</style>