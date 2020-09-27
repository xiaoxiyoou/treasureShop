<template>
  <div class="container">
    <div class="title">{{info.title}}</div>
    <div class="title2">{{info.subtitle}}</div>
    <div class="content"  v-html="info.contents"></div>
    <div class="des">被查看{{info.look}}次</div>
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
  .title2
    font-size 30px
    color #8a898a
    margin-top 10px
    padding-bottom 15px
  .des
    margin-top 5px
    padding-bottom 120px
    font-size 27px
    color #8a898a
  .content
    margin-bottom 50px
    >>>img
      max-width 100%
</style>