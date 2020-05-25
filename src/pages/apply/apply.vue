<template>
  <div class="container col a-c">
    <img class="bannerPic" src="./banner.png" alt="">
    <img class="title" src="./pic1.png" alt="">
    <div class="bannerCon">
      <swiper :options="swiperOption" class="banner col a-c">
        <div class="swiper-slide" v-for="(image,index) in banner" :key="index"> <img class="swiper-picture" :src="image" alt="" />
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="swiper-button-next leftOne" slot="button-next"></div>
      <div class="swiper-button-prev rightOne" slot="button-prev"></div>
      <div class="shop">连云港永安堂殡葬服务公司</div>
    </div>
    <img class="pic" src="./pic2.png" alt="">
    <div class="content col a-c">
      <img class="top" src="./title.png" alt="" ref="pronbit">
      <div class="item col a-c">
        <input class="name com" type="text" placeholder="请输入您的姓名" v-model="name">
        <input class="tel com" type="number" placeholder="请输入手机号码" v-model="mobie">
        <input class="address com" placeholder="请选择您所在的城市" v-model="address" @click="areaShowList" readonly="readonly">
        <div class="receive row a-c">
          <img class="" src="./../../assets/img/noselect.png" v-if="select" @click="selectShow(false)">
          <img class="" src="./../../assets/img/select1.png" v-if="!select" @click="selectShow(true)">
          <div class="text" v-if="select">我已阅读并接受《服务须知》《隐私政策》</div>
          <div class="text textHover" v-if="!select">我已阅读并接受《服务须知》《隐私政策》</div>
        </div>
        <div class="textbtn row j-c a-c" @click="_unionApply">立即申请</div>
        <div class="tip">请填写您的联系方式以便为您安排专员服务。</div>
      </div>
    </div>
    <div class="btmFix row a-c j-c" v-if="showBtn"></div>
    <div class="btn row j-c a-c" v-if="showBtn" @click="scrollIntoView">立即申请</div>
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择地址" @confirm="adConfirm" @cancel="adcancel" />
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
import { unionApply } from 'api/index'
import area from 'assets/js/area';
export default {
  data() {
    return {
      // 防止被弹起
      showBtn: true,
      clientHeight: document.documentElement.clientHeight,
      areaShow: false,
      name: '',
      address: '',
      mobie: '',
      areaList: area,
      select: true,
      banner: [require('./swiper.png'), require('./swiper1.png'), require('./swiper2.png')],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // 防止被弹起
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    }


  },
  methods: {
    scrollIntoView() {
      this.$refs.pronbit.scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        block: "start"  // 上边框与视窗顶部平齐。默认值
      });

    },
    selectShow(flag) {
      this.select = flag
    },
    areaShowList() {
      this.areaShow = true
    },
    adcancel() {
      this.areaShow = false
    },
    // 地址选择
    adConfirm(value) {
      console.log(value)
      let result = value.map(function (item) {
        return item.name;
      }).join("");
      this.address = result
      this.areaShow = false
    },
    _unionApply() {
      if (this.name == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.mobie == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.mobie))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.address == '') {
        Toast('请选择您所在的城市')
        return false
      } else if (this.select) {
        Toast('请先阅读并接受《服务须知》《隐私政策》')
        return false
      } else {
        unionApply({
          name: this.name,
          mobile: this.mobie,
          address: this.address
        }).then(res => {
          console.log('申请', res)
          if (res.code == 0) {
            Toast('申请成功！')
          } else {
            Toast('申请失败，请重试！')
          }

        })
      }

    },

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
  background url('./bg.png')
  background-size 100% 100%
  .bannerPic
    width 689px
    margin-top 326px
  .title
    width 650px
    height 1194px
  .pic
    width 650px
    display block
    margin 0 auto
  .bannerCon
    background-color #9c9082
    width 650px
    text-align center
    position relative
    .banner
      width 569px
      position relative
      left 2.3px
      text-align center
      background-color #7c7161
      padding 30px 0 50px
      img
        width 396px
        height 593px
    .shop
      color #ffffff
      margin 0 auto
      display block
      text-align center
      font-size 25px
      margin-top 10px
  .content
    background-color #9D8E80
    width 650px
    margin 0 auto
    text-align center
    padding-bottom 38px
    .top
      width 420px
      margin-bottom 36px
    .title
      width 535px
      margin 40px auto
    .item
      background-color #ffffff
      width 569px
      margin-bottom 150px
      .com
        width 495px
        height 66px
        border-radius 39px
        border 2px solid #b2a189
        margin-top 33px
        padding-left 20px
        font-size 30px
      .receive
        color #e0e0e0
        margin-top 28px
        img
          width 30px
          height 30px
          margin-right 10px
        .text
          font-size 25px
        .textHover
          color #b2a189
      .tip
        font-size 25px
        color #9c9082
        margin-bottom 30px
        margin-top 30px
      .textbtn
        width 502px
        height 77px
        border-radius 10px
        background-color #7c7161
        color #ffffff
        font-size 36px
        margin-top 30px
  .btmFix
    position fixed
    bottom 0
    width 100%
    background-color #7c7161
    opacity 0.6
    height 136px
    z-index 1000
  .btn
    position fixed
    bottom 18px
    width 600px
    height 91px
    border-radius 10px
    background-color #ffffff
    color #7c7161
    font-size 36px
    font-weight 700
    left 50%
    transform translateX(-50%)
    z-index 1001
</style>
<style scoped>
.swiper-button-white {
  outline: none;
}
.swiper-button-prev {
  left: 60px;
  background-image: url(./left1.png) !important;

  position: absolute;
  z-index: 10;
  cursor: pointer;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: #f5f5f5;
  opacity: 1 !important;
  width: 30px !important;
  height: 54px !important;
  top: 49%;
}
.swiper-button-next {
  background-image: url(./right1.png) !important;
  top: 49%;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: #f5f5f5;
  opacity: 1 !important;
  width: 30px !important;
  height: 54px !important;
  right: 60px;
}
.leftOne {
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 0;
}
>>> .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
}
>>> .swiper-pagination-bullet-active {
  background-color: #ffffff !important;
}
</style>