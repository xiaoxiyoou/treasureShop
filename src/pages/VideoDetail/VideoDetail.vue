<template>
  <div class="container" v-wechat-title="title">
    <div class="" v-show="!popShow1&&!popShow2">
      <video class="video-player" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-orientation="h5" x5-video-player-fullscreen="true" x5-playsinline preload="auto" controlslist="nodownload" controls="false" ref="video" :src="videos[0].videopath" :poster="VideoObj.videoimg">
        <source :src="videos[0].videopath" type="video/mp4">
      </video>
    </div>
    <img v-if="popShow1 || popShow2" class="videoImg" :src="VideoObj.videoimg" alt="">

    <!-- 集数展示 -->
    <div class="episodes-wrapper row" v-if="videos && videos.length > 1">
      <div class="episodes col a-c j-c" v-for="(item, index) in videos" :key="index" @click="episodeSelect(index,item.title,item.looktime)" :class="defaultIdndex == index ? 'selectHover' : ''">
        {{ item.title }}
      </div>
    </div>
    <div class="detalItem " ref="detailHeight">
      <p class="title">视频介绍</p>
      <p class="desc" v-html="VideoObj.videocontent" v-if="VideoObj.videocontent"></p>
      <p class="desc" v-else style="margin-top:30px">暂无介绍内容~</p>
    </div>
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
      <div v-if="VideoObj.isfree == 2 &&VideoObj.isbuy==0" class="value border-left-1px" @click="view">
        {{VideoObj.videoprice}}积分
      </div>
      <div v-if="VideoObj.isfree == 2 &&VideoObj.isbuy==1" class="value border-left-1px" @click="view">
        已购买
      </div>
    </div>
    <!-- 购买积分 -->
    <van-popup v-model="popShow1" class="popShow col a-c" closeable>
      <div class="title">学习课程</div>
      <div class="user">使用{{VideoObj.videoprice}}积分学习该课程</div>
      <div class="save">当前剩余积分：{{capi.integral}}</div>
      <div class="btn row a-c j-c" @click="_buyvideo">确认</div>
    </van-popup>
    <!-- 积分不足弹出 -->
    <van-popup v-model="popShow2" class="popShow col a-c" closeable>
      <div class="title2">抱歉，您当前积分不足！</div>
      <div class="user">使用{{VideoObj.videoprice}}积分学习该课程</div>
      <div class="save">当前剩余积分：{{capi.integral}}</div>
      <div class="btn1 row a-c j-c" @click="cancel">取消</div>
      <div class="btn1 row a-c j-c" @click="call">联系客服</div>
      <div class="tip">提示：如果您已经进货未获取积分
        请联系客服。</div>
    </van-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import { getVideoDetail, getinfo, buyvideo, playlook } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      Pause: true,
      state: 0,
      duration: '',
      looktime: '',
      videotitle: '',
      capi: '',
      popShow1: false,
      popShow2: false,
      videoIndex: 0,
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
    this._getinfo()

  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    window.WeixinJSBridge.call('hideOptionMenu');


  },
  beforeDestroy() {
    console.log('执行')
    this.$refs.video.pause()
    this.Pause = false

    this._playlook(this.$refs.video.currentTime)
  },

  methods: {
    // 播放暂停记录
    _playlook(looktime) {
      if (looktime < this.duration) {
        playlook({
          id: this.VideoObj.videoid,
          title: this.videotitle,
          state: 0,
          looktime: looktime,
        }).then(res => {
          console.log('播放暂停记录', res)
          console.log('this.videotitle', this.videotitle)
          console.log('looktime', looktime)

        })
      }
    },
    // 播放结束记录
    _playEnd(looktime) {
      playlook({
        id: this.VideoObj.videoid,
        title: this.videotitle,
        state: 1,
        looktime: looktime,
      }).then(res => {
        console.log('记录播放结束', res)
        console.log('this.videotitle', this.videotitle)
        console.log('looktime', looktime)

      })

    },
    // 积分购买
    _buyvideo() {
      buyvideo({
        id: this.VideoObj.videoid
      }).then(res => {
        console.log('积分购买', res)
        if (res.code == 0) {
          Toast('购买成功')
          this.popShow1 = false
          this._getVideoDetail()
        } else if (res.code == 1) {
          this.popShow2 = true
          this.popShow1 = false
        } else {
          Toast(res.msg)
        }

      })
    },
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
          this.looktime = this.videos[0].looktime
          this.videotitle = this.videos[0].title
          console.log('this.looktime', this.looktime)
          this.$nextTick(() => {
            this.VideoStart()
            this.VideoEnded()
            this.VideoPause()
          })
        }
      })
    },
    // 获取商家信息
    _getinfo() {
      getinfo().then(res => {
        console.log('获取商家信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
          this.capi = res.data.capi
        } else {
          this.$router.push({
            path: '/login',
          })
        }
      })

    },

    // 监听播放
    VideoStart() {
      this.$refs.video.addEventListener('play', () => {
        if (this.looktime) {
            this.$refs.video.currentTime = this.looktime
        }
        this.looktime = 0
        this.duration = this.$refs.video.duration
        // 如果是积分课程未购买
        if (this.VideoObj.isbuy == 0 && this.VideoObj.isfree == 2) {
          this.popShow1 = true
          setTimeout(() => {
            this.$refs.video.pause()
          }, "500");
        }
      })
    },

    // 监听结束
    VideoEnded() {
      this.$refs.video.addEventListener('ended', () => {
        this._playEnd(this.$refs.video.currentTime)
        // 切换下一集
        if (this.defaultIdndex < this.videos.length - 1) {
          this.episodeSelect(this.videoIndex + 1, this.videos[this.videoIndex + 1].title)
        }
      })
    },
    // 监听暂停
    VideoPause() {
      console.log("打印", this.Pause)
      if (this.Pause) {
        this.$refs.video.addEventListener('pause', () => {
          if (this.$refs.video.currentTime) {
            this._playlook(this.$refs.video.currentTime)
          }
        })
      }
    },
    // 回首页
    homeback() {
      this.$router.replace({ path: '/train' })
    },
    // 精品课程点击  
    episodeSelect(flag, videotitle, looktime) {
      this.defaultIdndex = flag
      this.videoIndex = flag
      this.$refs.video.src = this.videos[flag].videopath
      this.$refs.video.play()
      // 只在最初和切换视频时候设定
      this.videotitle = videotitle
      this.looktime = looktime
    },
    // 点击底部观看
    view() {
      this.$refs.video.play()
    },
    call() {
      window.location.href = 'tel:' + 13125418768
    },
    // 取消购买
    cancel() {
      this.popShow2 = false
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
.videoImg {
  height: 420px;
  width: 100%;
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

.container > .detalItem {
  width: 100%;
  padding: 30px;
  background-color: #fff;
}

.topContent >>> .video-js:hover .vjs-big-play-button {
  background: rgba(0, 0, 0, 0);
}
/* 积分购买弹框 */
.popShow {
  width: 511px;
  border-radius: 10px;
}
.popShow > .title {
  color: #000000;
  font-size: 40px;
  letter-spacing: 30px;
  margin-top: 65px;
}
.popShow > .title2 {
  color: #000000;
  font-size: 40px;
  margin-top: 65px;
}
.popShow > .user {
  color: #ae9f88;
  font-size: 40px;
  margin-top: 65px;
}
.popShow > .save {
  color: #000000;
  font-size: 27px;
  margin-top: 70px;
}
.popShow > .tip {
  color: #000000;
  font-size: 27px;
  width: 400px;
  margin-top: 22px;
  margin-bottom: 22px;
}
.popShow > .btn {
  color: #ffffff;
  font-size: 40px;
  width: 400px;
  height: 74px;
  border-radius: 5px;
  background-color: #ae9f88;
  margin-top: 22px;
  margin-bottom: 48px;
}
.popShow > .btn1 {
  color: #ffffff;
  font-size: 40px;
  width: 400px;
  height: 74px;
  border-radius: 5px;
  background-color: #ae9f88;
  margin-top: 22px;
}
</style>


