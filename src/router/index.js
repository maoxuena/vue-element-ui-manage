import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth'
import Login from '@/views/login'
import Layout from '@/views/layout'

Vue.use(VueRouter)
// 如果已引用，不需要重复引用
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'// 重定向到login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/main',
    children: [
      {
        path: '/main',
        meta: {
          title: '首页'
        },
        name: 'Main',
        // 路由懒加载
        component: () => import('@/views/main')
      }
    ]
  },
  {
    path: '/survey',
    meta: {
      title: '问卷调查'
    },
    name: 'Survey',
    component: Layout,
    redirect: '/survey/list',
    children: [
      {
        path: 'list',
        meta: {
          title: '问卷列表',
          auth: true
        },
        name: 'SurveyList',
        component: () => import('@/views/survey')
      }, {
        path: 'create',
        meta: {
          title: '创建问卷',
          auth: true
        },
        name: 'SurveyCreate',
        component: () => import('@/views/survey/Create')
      }, {
        path: 'edit/:id(\\d+)',
        meta: {
          title: '编辑问卷',
          auth: true
        },
        name: 'SurveyEdit',
        component: () => import('@/views/survey/Edit')
      }
    ]
  },
  {
    path: '/user',
    meta: {
      title: '用户管理'
    },
    name: 'user',
    component: Layout,
    redirect: '/user/list',
    children: [
      {
        path: 'list',
        meta: {
          title: '用户列表',
          auth: true
        },
        name: 'UserList',
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/settings',
    meta: {
      title: '图标'
    },
    name: 'Settings',
    component: Layout,
    redirect: '/settings/list',
    children: [
      {
        path: 'list',
        meta: {
          title: '图标列表',
          auth: true
        },
        name: 'SettingsList',
        component: () => import('@/views/settings')
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // 改为history模式方便服务端渲染做SEO
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (to.meta.auth) {
    // 需要认证，则检查
    if (hasToken) { // 已登录
      next()
    } else {
      // 未登录
      next({
        path: '/login',
        query: { redirect: to.path }
      })
      NProgress.done()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
