<template>
  <div class="container col a-c">
    <div class="content">
      <div class="tab row a-c j-a van-hairline--bottom">
        <div class="tabItem row a-c" v-for="(item,index) in title" :class="{'active':isActive==index}" :key="index" @click="tab(index)">{{item}}</div>
      </div>
      <noMessage style="margin:70px auto 90px" :noinfoShow="noinfoShow" />
      <div class="item row a-c j-b van-hairline--bottom" v-for="(item,index) in list" :key="index">
        <div class="left col">
          <div class="title">{{item.remark}}</div>
          <div class="tip">{{item.createdate}}</div>
        </div>
        <div class="btn row a-c j-c">{{item.number}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { GetIntegral } from 'api/index'
export default {
  data() {
    return {
      title: ['收入积分', '支出积分'],
      isActive: 0,
      list: [],
      noinfoShow: false



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._GetIntegral(0)
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {
    _GetIntegral(state) {
      GetIntegral({
        state: state
      }).then(res => {
        console.log('积分收支', res)
        this.list = res.data.list
        if (res.data.list.length) {
          this.noinfoShow = false
        } else {
          this.noinfoShow = true
        }
      })
    },
    record() {
      this.$router.push({
        path: '/IntegralRecord',

      })
    },
    tab(flag) {
      this.isActive = flag
      console.log('flag', flag)
      this._GetIntegral(flag)
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
    width 703px
    // box-shadow 1px 1px 5px #eaeaea
    // border-radius 20px
    border 2px solid #000000
    background-color #ffffff
    margin-top 38px
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
          color #000000
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