<template>
  <div class="container col a-c j-a" v-if="conShow">
    <img class="bg" src="./bg.png" alt="">
    <img class="banner" src="./banner.png" alt="">
    <div class="inputCon row a-c van-hairline--bottom">
      <img class="name" src="./name.png" alt="">
      <input type="text" placeholder="请输入账号" v-model="username">
    </div>
    <div class="inputCon row a-c van-hairline--bottom">
      <img class="name" src="./password.png" alt="">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="checked-wrap row a-c j-c" v-if="checkedWrap">
      <img class="checked-img" src="./check.png" v-if="select" @click="selectShow(false)">
      <img class="checked-img" src="./check-hover.png" v-if="!select" @click="selectShow(true)">
      <div class="checked-text">绑定此微信</div>
    </div>
    <div class="btn row a-c j-c" @click="login">立即登录</div>
    <van-divider :style="{ color: '#b8275c', borderColor: '#eaeaea'}" @click="apply">
      申请入驻
    </van-divider>
  </div>

</template>
<script type="text/ecmascript-6">
import axios from 'axios'
import { Toast } from 'vant'
import { autologin } from 'api/index'
export default {
  data() {
    return {
      checkedWrap: true,
      conShow: false,
      username: '',
      password: '',
      select: true,
      sid: 658,
      userid: '',
      bindwx: 0

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // 判断是否为微信
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
      // 是微信直接授权
      this._getCode()
    } else {
      // 不是微信直接显示登陆不显示绑定微信
      this.conShow = true
      this.checkedWrap = false
    }
    document.addEventListener('WeixinJSBridgeReady', () => {
      // 通过下面这个API隐藏右上角按钮
      window.WeixinJSBridge.call('hideOptionMenu');
    })

  },
  methods: {
    // 获取链接上参数
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    // 判断是否授权
    _getCode() {
      let uid = this.getUrlParam('uid')
      console.log('uid', uid)
      if (uid === '' || uid === undefined || uid === null) {
        this.GetCode(this.sid)
      } else {
        this.GetOpenId(uid, this.sid)
      }
    },
    // 获取userid
    GetOpenId(uid, sid) {
      axios.get('http://passport.fuyulove.com/sns/getoken', {
        method: 'get',
        params: {
          uid: uid,
          sid: sid
        }
      }).then((res) => {
        console.log('登陆', res);
        this.userid = res.data.data.userid
        this._autologin(this.userid)
      })
    },
    // 微信上授权
    GetCode: function (sid) {
      let redirectUrl = window.location.href
      let url = 'http://passport.fuyulove.com/connect/authorize?sid=' + sid + '&redirect_uri=' + redirectUrl;
      window.location.href = url
    },
    // 判断是否绑定
    _autologin(userid) {
      autologin({
        userid: userid
      }).then(res => {
        console.log('自动登录', res)
        if (res.code == 0) {
          // 已经绑定
          var token = res.data.token
          localStorage.setItem('token', token)
          this.$router.push({
            path: '/train',
          })
        } else {
          // 未绑定
          this.conShow = true
        }

      })
    },
    // 账号密码登陆
    loginIn() {
      if (!this.username) {
        Toast('请输入用户名')
        return false

      } else if (!this.password) {
        Toast('请输入密码')
        return false
      } else {
        axios.get('http://union.app.jzb768.com/api/union/login', {
          params: {
            username: this.username,
            password: this.password,
            bindwx: this.bindwx,
            userid: this.userid

          }
        })
          .then(res => {
            console.log('账号密码登陆', res);
            if (res.data.code == 0) {
              var token = res.data.data.token
              localStorage.setItem('token', token)
              this.$router.push({
                path: '/train',
              })
            } else {
              Toast(res.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }


    },
    login() {
      this.loginIn()

    },
    apply() {
      this.$router.push({
        path: '/apply',
      })
    },
    // 勾选绑定微信
    selectShow(flag) {
      this.select = flag
      if (this.select) {
        this.bindwx = 0
      } else {
        this.bindwx = 1
      }
      console.log(this.bindwx)
    },

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
>>>.van-divider
  width 308px
  margin-top 75px
.container
  width 100%
  height 100%
  .bg
    position absolute
    right 0
    top 0
    width 237px
  .banner
    width 342px
    margin-top 190px
    margin-bottom 100px
  .inputCon
    width 602px
    padding-bottom 20px
    margin-top 59px
    img
      width 33px
      height 37px
    input
      margin-left 39px
      font-size 28px
  .checked-wrap
    width 602px
    margin-top 40px
    .checked-img
      width 28px
      margin-right 5px
  .checked-text
    color #666666
    font-size 28px
    margin-top 3px
  .btn
    width 626px
    height 87px
    background-color #b8275c
    color #ffffff
    font-size 35px
    border-radius 43px
    margin-top 60px
</style>