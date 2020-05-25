<template>
  <!-- 头像上传 -->
  <div class="crop-con" v-if="showCrop">
    <div class="return" @click="hideCrop">返回</div>
    <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber" :can-move="option.canMove" :can-scale="option.canScale" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" @real-time="realTime" :high="option.high" @img-load="imgLoad" mode="cover"></vue-cropper>
    <div class="bottom-button row j-b">
      <div class="selectImg" @click="uploadImg">
        <span class="text">选择图片</span>
      </div>
      <button @click="rotateLeft" class="btn">向左旋转</button>
      <button @click="rotateRight" class="btn">向右旋转</button>
      <div class="uploading" @click="finish()">确认上传</div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import axios from 'axios'
var wx = require('weixin-js-sdk')
export default {
  name: "upImg",
  data() {
    return {
      fixed: true,
      fixedNumber: [1, 1.2],
      //裁剪组件的基础配置option
      option: {
        img: require('./imgselect.png'),
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: false,
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        // autoCropHeight: ,
        centerBox: false,
        high: true
      },
      isShowCropper: false //是否显示截图框
    }
  },
  props: {
    showCrop: Boolean
  },
  methods: {
      // 选择本地图片
    uploadImg() {
      wx.ready(() => {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            this.upLoad(res.localIds[0])
          }
        })
      })
    },
    // 上传头像
    upLoad(localId) {
      wx.uploadImage({
        localId,
        success: (res) => {
          this._postMediaId(res.serverId)
        },
        fail: function () {
        }
      })
    },
    // 下载上传到微信的图片
    _postMediaId(id) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/action/wxImgDown.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          media_id: id,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log(res);
        this.option.img = res.data.msg;
        console.log(res.data.msg)


      }).catch(function (error) {
        console.log(error);
      });


    },
    // 上传图片（点击上传按钮）
    finish() {
      this.$refs.cropper.getCropData((data) => {
        console.log(data)
        this.toBase64(data)
        this.showCrop = false
      })
    },
    // 把base64转化为图片地址
    toBase64(meg) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/Action/UploadImageChaiJian.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          image: meg,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((response) => {
        console.log(response);
        if (this.selecetImgurl == 1) {
          this.firstImgurl = response.data
        } else {
          this.secondImgurl = response.data
        }


      }).catch(function (error) {
        console.log(error);
      });

    },
    //  实时预览函数
    realTime(data) {
      console.log(data);
      this.previews = data;
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    hideCrop() {
      this.showCrop = !this.showCrop
    },
    imgLoad(msg) {
      console.log(msg)
    },

  },
  components: {
    VueCropper

  }
};
</script>

<style lang="stylus" scoped>
.crop-con
  position fixed
  top 0
  width 100%
  height 100%
  z-index 999
  .return
    position absolute
    right 20px
    top 20px
    padding 12px 16px
    background-color #65a2e7
    border-radius 4px
    font-size 32px
    color #ffffff
    z-index 100
  .bottom-button
    position fixed
    bottom 0
    width 100%
    height 140px
    display flex
    align-items center
    justify-content space-between
    .btn
      width 180px
      height 80px
      line-height 80px
      text-align center
      background #40ce53
      color white
      border-radius 10px
      font-size 32px
    .uploading
      width 180px
      height 80px
      line-height 80px
      text-align center
      background #40ce53
      color white
      border-radius 10px
      font-size 32px
    .selectImg
      width 180px
      height 80px
      line-height 80px
      text-align center
      color white
      font-size 32px
      background #65a2e7
      border-radius 10px
      position relative
      .text
        z-index 5
      .uploads
        opacity 0
        position absolute
        top 0
        left 0
        z-index 99
        width 100%
        height 100%
        cursor pointer
</style>