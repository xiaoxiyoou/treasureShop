<template>
  <div class="container col a-c">
    <img class="banner" src="./banner.png" alt="">
    <div class="top row j-b a-c">
      <div class="item row a-c">
        <img class="grail" src="./grail.png" alt="">
        <div>积分排行榜</div>
      </div>
      <div class="btn row a-c j-c" @click="IntegralRecord">积分纪录</div>
    </div>
    <div class="mid row j-b a-c">
      <div class="item col a-c">
        <div class="title">我的排名</div>
        <div class="des">7</div>
      </div>
      <div class="item col a-c">
        <img class="titleImg" src="./title.png" alt="">
        <div class="title2">林小小</div>
      </div>
      <div class="item col a-c">
        <div class="title">积分</div>
        <div class="des">3580</div>
      </div>
    </div>
    <div class="content">
      <div class="tab row a-c j-a van-hairline--bottom">
        <div class="tabItem row a-c" v-for="(item,index) in title" :class="{'active':isActive==index}" :key="index" @click="tab(index)">{{item}}</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left row a-c">
          <div class="title row a-c j-c">1</div>
          <img class="headImg" src="./title.png" alt="">
          <div class="tip">CENTER</div>
        </div>
        <div class="btn row a-c j-c">399</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left row a-c">
          <img class="titleImg" src="./champion.png" alt="">
          <img class="headImg" src="./title.png" alt="">
          <div class="tip">CENTER</div>
        </div>
        <div class="btn row a-c j-c">399</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left row a-c">
          <img class="titleImg" src="./runner.png" alt="">
          <img class="headImg" src="./title.png" alt="">
          <div class="tip">CENTER</div>
        </div>
        <div class="btn row a-c j-c">+399</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left row a-c">
          <img class="titleImg" src="./June.png" alt="">
          <img class="headImg" src="./title.png" alt="">
          <div class="tip">CENTER</div>
        </div>
        <div class="btn row a-c j-c">399</div>
      </div>

      <noMessage :noinfoShow="noinfoShow" />
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      title: ['总积分排行', '使用积分排名'],
      isActive: 0,
      noinfoShow: false

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
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
    width 100%
    padding 0 19px 0 26px
    margin-top 41px
    color #ffffff
    .item
      font-size 44px
      .grail
        width 42px
        height 44px
        margin-right 20px
    .btn
      width 146px
      height 46px
      background-color #b8275c
      border-radius 23px
      font-size 27px
  .mid
    width 690px
    background-color #ffffff
    border-radius 20px
    margin-top 162px
    padding 0 50px
    box-shadow 1px 1px 5px #eaeaea
    .item
      .titleImg
        width 184px
        height 184px
        border-radius 50%
        margin-top -70px
      .title
        font-size 32px
        color #666666
        margin-bottom 10px
      .des
        font-size 42px
        color #b9a484
      .title2
        color #666666
        font-size 32px
        margin-bottom 30px
        margin-top 10px
.content
  width 691px
  box-shadow 1px 1px 5px #eaeaea
  border-radius 20px
  background-color #ffffff
  margin-top 38px
  // height 80%
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
      .titleImg
        width 52px
        height 61px
        margin-right 30px
      .des
        font-size 27px
        color #808080
      .tip
        font-size 27px
        color #d5d5d5
        margin-top 5px
    .btn
      margin-right 50px
      color #b9a484
</style>