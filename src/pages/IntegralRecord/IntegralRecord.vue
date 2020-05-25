<template>
  <div class="container col a-c">

    <div class="content">
      <div class="tab row a-c j-a van-hairline--bottom">
        <div class="tabItem row a-c" v-for="(item,index) in title" :class="{'active':isActive==index}" :key="index" @click="tab(index)">{{item}}</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="title">进货金兑换积分</div>
          <div class="tip">2020-02-02 12:01</div>
        </div>
        <div class="btn row a-c j-c">+399</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="title">每日签到</div>
          <div class="tip">2020-02-02 12:01</div>
        </div>
        <div class="btn row a-c j-c">+399</div>
      </div>
      <div class="item row a-c j-b van-hairline--bottom">
        <div class="left col">
          <div class="title">每日签到</div>
          <div class="tip">2020-02-02 12:01</div>
        </div>
        <div class="btn row a-c j-c">+399</div>
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
      title: ['收支积分', '支出积分'],
      isActive: 0,
      noinfoShow: false



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
    tab(flag) {
      this.isActive = flag
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
      img
        width 30px
        height 32px
        margin-right 5px
      .left
        width 400px
        .title
          color #b9a484
          font-weight 700
          font-size 30px
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