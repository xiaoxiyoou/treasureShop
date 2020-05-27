<template>
  <div class="container">
    <ul class="videoList" ref="videoList">

      <li @click="handleList(item.videoid)" class="item row border-bottom-1px j-c a-c" v-for="(item, index) in videoList" :key="index">
        <img class="itemImg" :src="item.videoconver" alt="">
        <div class="itemInfo col j-b">
          <div class="infoTitle">
            <div class="title">{{item.videoname}}</div>
            <div class="desc">{{item.videodesc}}</div>
          </div>
          <div class="infoData row j-b">
            <div class="viewNum">{{item.createtime | moment}}</div>
            <div class="integral" v-if="item.isfree == 2">{{item.videoprice}}积分</div>
            <div class="integral" v-if="item.isfree == 1">{{item.saleprice}}元</div>
            <div class="integral" v-else>免费</div>
          </div>
        </div>
      </li>

    </ul>
    <noMessage :noinfoShow="noinfoShow" />
  </div>
</template>
<script type="text/ecmascript-6">
import { getVideoList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      noinfoShow:false,
      videoList: [],
      pageIndex: 1,
      pageSize: 10


    }
  },
  created() {
    this._getVideoList()

  },
  mounted() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })
  },
  methods: {
    _getVideoList() {
      getVideoList({
        // pageIndex: this.pageIndex,
        // pageSize: this.pageSize,
        cate:  this.$route.query.cate
      }).then(res => {
        console.log('课程列表', res)
        if (res.code === 0) {
          this.videoList = res.data.concat(this.videoList)
          if (this.videoList.length) {
            this.noinfoShow = false
          } else {
            this.noinfoShow = true
          }
          console.log('  this.videoList', this.videoList)
        }
      })
    },
    // 进入课程详情
    handleList(videoId) {
      this.$router.push({
        path: '/VideoDetail',
        query: { id: videoId }
      })
    }

  },
  components: {
    noMessage

  }
}
</script>
<style scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;

  font-size: 28px;
  background: #ffffff;
}
.videoList > .item {
  height: 231px;
}
.videoList > .item > .itemImg {
  width: 290px;
  height: 165px;
  border-radius: 5px;
}
.videoList > .item > .itemInfo {
  height: 165px;
  width: 320px;
  margin-left: 30px;
}
.videoList > .item > .itemInfo > .infoTitle > .title {
  color: #2d2d2d;
  font-weight: 700;
  font-size: 30px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}
.videoList > .item > .itemInfo > .infoTitle > .desc {
  color: #8a898a;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
.videoList > .item > .itemInfo > .infoData > .viewNum {
  color: #8a898a;
}
.videoList > .item > .itemInfo > .infoData > .integral {
  color: #b2a189;
}
</style>