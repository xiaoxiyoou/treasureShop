import Vue from 'vue'
import App from './App.vue'
import 'assets/js/vant'
import 'assets/js/noScaling'
import 'assets/css/reset.css'
import 'assets/css/animate.css'
import 'amfe-flexible'
import store from './store/index'
import axios from 'axios'
// import wxShare from 'assets/js/share'
import router from './router'
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookies
import moment from 'moment'
import vueSwiper from 'vue-awesome-swiper'
Vue.use(vueSwiper);
import "../node_modules/swiper/css/swiper.css"
import LyTab from 'ly-tab'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.use(LyTab)

Vue.prototype.$moment = 'moment'
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.requireAuth) {
    let fromUrl = VueCookies.get('fromUrl', to.fullPath)
    if (!fromUrl) {
      localStorage.setItem('fromUrl', to.fullPath)
    }
    // if (localStorage.getItem('token') != "undefined" && localStorage.getItem('token') != null) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        path: '/LoginIn'
      })
    }
  } else {
    next()
  }
})
router.afterEach(() => {
 



})

Vue.filter('moment', function (value, formatString) {
  if (value) {
    formatString = formatString || 'YYYY年MM月DD日';
    return moment(value).format(formatString);
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')