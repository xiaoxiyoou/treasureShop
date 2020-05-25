<template>
  <div class="container col a-c j-a">
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
    <div class="btn row a-c j-c" @click="login">立即登录</div>
    <van-divider :style="{ color: '#b8275c', borderColor: '#eaeaea'}" @click="apply">
      申请入驻
    </van-divider>
  </div>

</template>
<script type="text/ecmascript-6">
import axios from 'axios'
import { Toast } from 'vant'
export default {
  data() {
    return {
      username: '',
      password: ''


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
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
            password: this.password
          }
        })
          .then(res => {

            console.log(res);
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
    }

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
    margin-bottom 148px
  .inputCon
    width 602px
    padding-bottom 20px
    margin-top 59px
    img
      width 33px
      height 37px
    input
      margin-left 39px
  .btn
    width 626px
    height 87px
    background-color #b8275c
    color #ffffff
    font-size 35px
    border-radius 43px
    margin-top 84px
</style>