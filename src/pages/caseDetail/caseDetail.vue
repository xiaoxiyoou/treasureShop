<template>
  <div class="container">
    <div class="title">{{info.title}}</div>
    <div class="title">家族宝精选案例</div>
    <!-- <div class="des">{{info.subtitle}}</div> -->
    <div class="des">被查看{{info.look}}次</div>
    <div class="content" v-html="info.contents"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { articleapiDetail } from 'api/index'
export default {
  data() {
    return {
      info: ''


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._articleapiDetail()
    window.WeixinJSBridge.call('hideOptionMenu');


  },
  methods: {
    _articleapiDetail() {
      articleapiDetail({
        id: this.$route.query.id
      }).then(res => {
        console.log('案例详情', res)
        this.info = res.data.info

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
  top 0px
  width 100%
  height 100%
  bottom 0
  padding 42px
  .title
    font-size 35px
    color #252525
  .des
    margin-top 10px
    padding-bottom 20px
    font-size 27px
    color #8a898a
  .content
    margin-bottom 100px
    >>>img
      max-width 100%
</style>