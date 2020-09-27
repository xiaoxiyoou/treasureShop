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
    // component: () => import('pages/train/train'),
    component: resolve=>(require(['pages/train/train'],resolve)),
    meta: {
      title: '诚商培训',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/policy',
    name: 'policy',
    // component: () => import('pages/policy/policy'),
    component: resolve=>(require(['pages/policy/policy'],resolve)),
    meta: {
      title: '诚商政策',
      depth: 1
    },

  },
  {
    path: '/LoginIn',
    name: 'LoginIn',
    // component: () => import('pages/LoginIn/LoginIn'),
    component: resolve=>(require(['pages/LoginIn/LoginIn'],resolve)),
    meta: {
      title: '登录',
      depth: 1
    },

  },

  {
    path: '/apply',
    name: 'apply',
    // component: () => import('pages/apply/apply'),
    component: resolve=>(require(['pages/apply/apply'],resolve)),
    meta: {
      title: '诚商申请',
      depth: 1
    },

  },
  {
    path: '/alliancePolicy',
    name: 'alliancePolicy',
    // component: () => import('pages/alliancePolicy/alliancePolicy'),
    component: resolve=>(require(['pages/alliancePolicy/alliancePolicy'],resolve)),
    meta: {
      title: '家族宝诚信联盟商家政策',
      depth: 1
    },

  },

  {
    path: '/add',
    name: 'add',
    // component: () => import('pages/add/add'),
    component: resolve=>(require(['pages/add/add'],resolve)),
    meta: {
      title: '家族宝诚信联盟商家补充政策',
      depth: 1
    },

  },
  {
    path: '/integral',
    name: 'integral',
    // component: () => import('pages/integral/integral'),
    component: resolve=>(require(['pages/integral/integral'],resolve)),
    meta: {
      title: '我的积分',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/IntegralRecord',
    name: 'IntegralRecord',
    // component: () => import('pages/IntegralRecord/IntegralRecord'),
    component: resolve=>(require(['pages/IntegralRecord/IntegralRecord'],resolve)),
    meta: {
      title: '积分记录',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/integralRank',
    name: 'integralRank',
    // component: () => import('pages/integralRank/integralRank'),
    component: resolve=>(require(['pages/integralRank/integralRank'],resolve)),
    meta: {
      title: '积分排行榜',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/case',
    name: 'case',
    // component: () => import('pages/case/case'),
    component: resolve=>(require(['pages/case/case'],resolve)),
    meta: {
      title: '联盟案例',
      depth: 1
    },

  },
  {
    path: '/caseDetail',
    name: 'caseDetail',
    // component: () => import('pages/caseDetail/caseDetail'),
    component: resolve=>(require(['pages/caseDetail/caseDetail'],resolve)),
    meta: {
      title: '案例详情',
      depth: 1
    },

  },
  {
    path: '/memorial',
    name: 'memorial',
    // component: () => import('pages/memorial/memorial'),
    component: resolve=>(require(['pages/memorial/memorial'],resolve)),
    meta: {
      title: '专属讣告',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/VideoList',
    name: 'VideoList',
    // component: () => import('pages/VideoList/VideoList'),
    component: resolve=>(require(['pages/VideoList/VideoList'],resolve)),
    meta: {
      title: '专属课程',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/VideoDetail',
    name: 'VideoDetail',
    // component: () => import('pages/VideoDetail/VideoDetail'),
    component: resolve=>(require(['pages/VideoDetail/VideoDetail'],resolve)),
    meta: {
      title: '视频详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/getIntegral',
    name: 'getIntegral',
    component: resolve=>(require(['pages/getIntegral/getIntegral'],resolve)),
    meta: {
      title: '索要积分',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/giveIntegral',
    name: 'giveIntegral',
    component: resolve=>(require(['pages/giveIntegral/giveIntegral'],resolve)),
    meta: {
      title: '索要积分',
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