<template>
  <div class="container" v-wechat-title="title">
    <div class="item" v-for="(item,index) in list" :key="index" @click="caseDetail(item.id)">
      <img class="banner" :src="item.imgurl" alt="">
      <div class="btm-wrap">
        <div class="title"><span v-if="item.tag">{{item.tag}}</span>{{item.title}}</div>
        <div class="des">{{item.subtitle}}</div>
      </div>
    </div>
    <noMessage :noinfoShow="noinfoShow" />
  </div>
</template>
<script type="text/ecmascript-6">
import { articleapi } from 'api/index'

import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      list: [],
      noinfoShow: false,
      title:''


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._articleapi(this.$route.query.catid)
    if(this.$route.query.catid == 1){
      this.title = "联盟案例"
    }else{
      this.title = "团体标准"
    }
    window.WeixinJSBridge.call('hideOptionMenu');


  },
  methods: {
    _articleapi(catid) {
      articleapi({
        catid:catid
      }).then(res => {
        console.log('案例', res)
        this.list = res.data.list
        if (res.data.list.length == 0) {
          this.noinfoShow = true
        }

      })
    },
    caseDetail(id) {
      this.$router.push({
        path: '/caseDetail',
        query: {
          id: id,
        }
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
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #f5f5f5
  border-bottom 1px solid #f5f5f5
  position absolute
  .item
    background-color #ffffff
    margin-bottom 17px
    .btm-wrap
      padding 0 28px
      .title
        margin-top 10px
        font-size 30px
        color #2d2d2d
        span
          margin-right 8px
          width 110px
          padding 2px 5px
          border 1px solid #9c9082
          color #9c9082
          font-size 24px
          margin-bottom 20px
      .des
        margin-top 17px
        padding-bottom 20px
        font-size 26px
        color #8a898a
    .banner
      height 420px
      width 100%
</style>