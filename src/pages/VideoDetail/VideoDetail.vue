<template>
  <div class="container" v-wechat-title="title">
    <div class="">
      <video class="video-player" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-orientation="h5" x5-video-player-fullscreen="true" x5-playsinline preload="auto" controlslist="nodownload" controls="false" ref="video" :src="videos[0].videopath" :poster="VideoObj.videoimg">
        <source :src="videos[0].videopath" type="video/mp4">
      </video>
    </div>

    <!-- 集数展示 -->
    <div class="episodes-wrapper row" v-if="videos && videos.length > 1">
      <div class="episodes col a-c j-c" v-for="(item, index) in videos" :key="index" @click="episodeSelect(index)" :class="defaultIdndex == index ? 'selectHover' : ''">
        {{ item.title }}
      </div>
    </div>
    <div class="detalItem " ref="detailHeight">
      <p class="title">视频介绍</p>
      <p class="desc" v-html="VideoObj.videocontent" v-if="VideoObj.videocontent"></p>
      <p class="desc" v-else style="margin-top:30px">暂无介绍内容~</p>
    </div>
    <!-- </div> -->
    <!-- 底部 -->
    <div class="btm row a-c van-hairline--top">
      <div class="btmHomeCon row a-c j-c">
        <img class="homeImg" :src="homeImg" alt="" />
        <div class="btmHome" @click="homeback">首页</div>
      </div>
      <!-- 免费 -->
      <div v-if="VideoObj.isfree == 0" class="value border-left-1px" @click="view">
        免费观看
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getVideoDetail } from 'api/index'

export default {
  data() {
    return {

      title: '',
      videos: [
        {
          videopath: ''
        }
      ],
      VideoObj: {},
      defaultIdndex: 0,
      homeImg: require('./img/shouye1.png'),

    }
  },

  created() {
    this._getVideoDetail()

  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    window.WeixinJSBridge.call('hideOptionMenu');


  },

  methods: {



    // 视频详情数据
    _getVideoDetail() {
      getVideoDetail({
        id: this.$route.query.id
      }).then(res => {
        console.log('视频详情', res)
        if (res.code === 0) {
          this.VideoObj = Object.assign({}, res.data)
          this.videos = this.VideoObj.videos
          this.title = this.VideoObj.videoname
          this.VideoStart()
          this.VideoEnded()




        }
      })
    },

    // 监听视频播放
    VideoStart() {
      this.$refs.video.addEventListener('play', () => {
        console.log('播放')
      })
    },
    // 监听播放结束
    VideoEnded() {
      this.$refs.video.addEventListener('ended', () => {
        console.log('播放结束')
        if (this.defaultIdndex < this.videos.length - 1) {
          this.episodeSelect(this.defaultIdndex++)
        }

      })
    },
    // 回首页
    homeback() {
      this.$router.replace({ path: '/train' })
    },
    // 精品课程点击  
    episodeSelect(flag) {
      this.defaultIdndex = flag
      this.videoIndex = flag
      this.$refs.video.src = this.videos[flag].videopath
      this.$refs.video.play()

    },
    // 点击底部观看
    view() {
      this.$refs.video.play()
    }



  }
}
</script>
<style scoped>
.container {
  font-size: 28px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}
.episodes-wrapper {
  background: #ffffff;
  margin-top: 20px;
}
.episodes {
  width: 80px;
  margin-left: 20px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 10px;
  color: #8a898a;
}
.selectHover {
  background: #b2a189;
  color: #ffffff;
}
.container .detalItem .title {
  font-size: 32px;
  font-weight: 700;
  color: #2d2d2d;
  padding-left: 13px;
  border-left: 6px solid #b2a189;
  margin-bottom: 20px;
}
.container .detalItem .desc {
  color: #8a898a;
}
.video-player {
  width: 100%;
  height: 420px;
  object-fit: fill;
}
.btm {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
}
.btmHomeCon {
  width: 25%;
  line-height: 100px;
  text-align: center;
  background: #ffffff;
}
.homeImg {
  width: 32px;
}
.btmHome {
  margin-left: 20px;
  color: #555658;
}
.value {
  width: 75%;
  line-height: 100px;
  text-align: center;
  background: #b2a189;
  color: #ffffff;
}
.topContent {
  /* position: absolute;
  width: 100%; */
}
.container > .detalItem {
  width: 100%;
  padding: 30px;
  background-color: #fff;
}

.topContent >>> .video-js:hover .vjs-big-play-button {
  background: rgba(0, 0, 0, 0);
}
</style>
<style scoped lang="stylus">
>>>img
  max-width 100%
>>> .video-js .vjs-big-play-button
  height 3em !important
  width 3em !important
  line-height 3em !important
  border-radius 1.5em !important
  margin-left -1.1em !important
</style>

