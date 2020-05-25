<template>
  <div class="container">
    <div class="item" v-for="(item,index) in list" :key="index"  @click="caseDetail(item.id)">
      <img class="banner" :src="item.imgurl" alt="">
      <div class="title">{{item.title}}</div>
      <div class="des">{{item.subtitle}}</div>
    </div>
    <!-- <div class="item">
      <img class="banner" src="./banner.png" alt="">
      <div class="title">家族宝诚信联盟商家——客单价翻倍</div>
      <div class="des">昌图王永新客单价翻倍家族宝精选案例</div>
    </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
import { articleapi } from 'api/index'
export default {
  data() {
    return {
      list:[]


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._articleapi()


  },
  methods: {
    _articleapi() {
      articleapi().then(res => {
        console.log('案例', res)
        this.list = res.data.list

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
  .item
    background-color #ffffff
    margin-bottom 17px
    .title
      padding 0 28px
      margin-top 10px
      font-size 35px
      color #2d2d2d
    .des
      padding 0 28px
      margin-top 10px
      padding-bottom 20px
      font-size 27px
      color #8a898a
    .banner
      height 420px
      width 100%
</style>