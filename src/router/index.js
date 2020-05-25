import Vue from 'vue'
import VueRouter from 'vue-router'

// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routes = [{
    path: '/',
    redirect: '/LoginIn'
  },

  {
    path: '/train',
    name: 'train',
    component: () => import('pages/train/train'),
    meta: {
      title: '诚商培训',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/policy',
    name: 'policy',
    component: () => import('pages/policy/policy'),
    meta: {
      title: '诚商政策',
      // requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/LoginIn',
    name: 'LoginIn',
    component: () => import('pages/LoginIn/LoginIn'),
    meta: {
      title: '登录',
      depth: 1
    },

  },
  // {
  //   path: '/unionShop',
  //   name: 'unionShop',
  //   component: () => import('pages/unionShop/unionShop'),
  //   meta: {
  //     title: '家族宝诚商',
  //     requireAuth: true,
  //     depth: 1
  //   },

  // },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('pages/apply/apply'),
    meta: {
      title: '诚商申请',
      // requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/alliancePolicy',
    name: 'alliancePolicy',
    component: () => import('pages/alliancePolicy/alliancePolicy'),
    meta: {
      title: '家族宝诚信联盟商家政策',
      // requireAuth: true,
      depth: 1
    },

  },
  // {
  //   path: '/alliancePolicy',
  //   name: 'alliancePolicy',
  //   component: () => import('pages/alliancePolicy/alliancePolicy'),
  //   meta: {
  //     title: '家族宝诚信联盟商家政策',
  //     requireAuth: true,
  //     depth: 1
  //   },

  // },
  {
    path: '/add',
    name: 'add',
    component: () => import('pages/add/add'),
    meta: {
      title: '家族宝诚信联盟商家补充政策',
      // requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/integral',
    name: 'integral',
    component: () => import('pages/integral/integral'),
    meta: {
      title: '我的积分',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/IntegralRecord',
    name: 'IntegralRecord',
    component: () => import('pages/IntegralRecord/IntegralRecord'),
    meta: {
      title: '积分记录',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/integralRank',
    name: 'integralRank',
    component: () => import('pages/integralRank/integralRank'),
    meta: {
      title: '积分排行榜',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/case',
    name: 'case',
    component: () => import('pages/case/case'),
    meta: {
      title: '联盟案例',
      depth: 1
    },

  },
  {
    path: '/caseDetail',
    name: 'caseDetail',
    component: () => import('pages/caseDetail/caseDetail'),
    meta: {
      title: '案例详情',
      depth: 1
    },

  },
  {
    path: '/memorial',
    name: 'memorial',
    component: () => import('pages/memorial/memorial'),
    meta: {
      title: '专属讣告',
      requireAuth: true,
      depth: 1
    },

  },
]

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router