<template>
  <div class="container col a-c">
    <div class="content-wrap col j-c a-c">
      <img class="" src="./top.png" alt="">
      <div class="content col a-c">
        <img class="call" src="./join.png" alt="">
        <div class="item col a-c">
          <input class="name com" type="text" placeholder="请输入您的称呼" v-model="name">
          <input class="tel com" type="number" placeholder="请输入手机号码" v-model="mobile">
          <input class="address com" placeholder="请选择您所在的城市" v-model="address" @click="areaShowList" readonly="readonly">
          <div class="receive row a-c">
            <img class="" src="./../../assets/img/noselect.png" v-if="select" @click="selectShow(false)">
            <img class="" src="./../../assets/img/select1.png" v-if="!select" @click="selectShow(true)">
            <div class="text" v-if="select">我已阅读并接受《服务须知》《隐私政策》</div>
            <div class="text textHover" v-if="!select">我已阅读并接受《服务须知》《隐私政策》</div>
          </div>
          <div class="textbtn row j-c a-c" @click="_unionApply">马上了解</div>
          <div class="tip">请填写您的联系方式以便为您安排专员服务。</div>
        </div>
      </div>
      <div class="phone-wrap row a-c" @click="callPhone">
        <img class="phone" src="./phone.png" alt="">
        <div class="">点击拨打：400-6568-666</div>
        <div></div>
      </div>
    </div>
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择地址" @confirm="adConfirm" @cancel="adcancel" />
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import area from 'assets/js/area';
import { Toast } from 'vant'
import { unionApply } from 'api/index'
export default {
  data() {
    return {
      select: true,
      areaShow: false,
      name: '',
      address: '',
      mobile: '',
      areaList: area,
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    window.WeixinJSBridge.call('hideOptionMenu');

  },
  methods: {
    _unionApply() {
      if (this.name == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.mobile == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.mobile))) {
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
          mobile: this.mobile,
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
    add() {
      this.$router.push({
        path: '/add',

      })

    },
    callPhone() {
      window.location.href = 'tel:400-6568-666'
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
    selectShow(flag) {
      this.select = flag
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
  .content-wrap
    background-color #9c9082
    width 650px
    padding 50px 39px 39px
    img
      width 573px
    .btm
      width 477px
    .call
      width 344px
      margin-top 37px
    .add
      width 427px
      position absolute
      z-index 1
      bottom 73px
    .content
      background-color #9D8E80
      width 600px
      text-align center
      margin-top 66px
      background-color #ffffff
      .top
        width 420px
        margin-bottom 36px
      .title
        width 535px
        margin 40px auto
      .item
        width 100%
        .com
          width 495px
          height 66px
          border-radius 39px
          border 2px solid #b2a189
          margin-top 33px
          padding-left 20px
          font-size 25px
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
          font-size 30px
          margin-top 30px
    .phone-wrap
      color #ffffff
      font-size 40px
      margin-top 44px
      .phone
        width 49px
        height 38px
        margin-right 8px
</style>