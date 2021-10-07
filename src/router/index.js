import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint)

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/cmsLogin',
    component: (resolve) => require(['@/views/cmsLogin'], resolve),
    hidden: true
  },
  {
    path: '/loginMobile',
    component: (resolve) => require(['@/views/Mobile/loginMobile'], resolve),
    hidden: true
  },
  {
    path: '/orgenRegisterMobile',
    component: (resolve) => require(['@/views/Mobile/orgenRegisterMobile'], resolve),
    hidden: true
  },
  {
    path: '/orgenForgetPasswordMobile',
    component: (resolve) => require(['@/views/Mobile/orgenForgetPasswordMobile'], resolve),
    hidden: true
  },
  {
    path: '/registerationTermsMobile',
    component: (resolve) => require(['@/views/Mobile/registrationTerms'], resolve),
    hidden: true
  },
  {
    path: '/authorizationUserMobile',
    component: (resolve) => require(['@/views/Mobile/authorizationUser'], resolve),
    hidden: true
  },

  {
    path: '/forgetPasswordMobile',
    component: (resolve) => require(['@/views/Mobile/forgetPasswordMobile'], resolve),
    hidden: true
  },
  {
    path: '/registerationTerms',
    component: (resolve) => require(['@/views/register/registrationTerms'], resolve),
    hidden: true
  },
  {
    path: '/authorizationUser',
    component: (resolve) => require(['@/views/register/authorizationUser'], resolve),
    hidden: true
  },
  {
    path: '/personalRegisterMobile',
    component: (resolve) => require(['@/views/Mobile/personalRegisterMobile'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },
  {
    path: '/xinxwh',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/xinxwh',
        component: (resolve) => require(['@/views/mainpage/xinxwh'], resolve),
        name: '首页',
        meta: { title: '信息维护'}
      }
    ]
  },
  {
    path: '/gongpailx',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gongpailx',
        component: (resolve) => require(['@/views/mainpage/gongpailx'], resolve),
        name: '首页',
        meta: { title: '公派留学'}
      }
    ]
  },
  {
    path: '/jiuyelh',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/jiuyelh',
        component: (resolve) => require(['@/views/mainpage/jiuyelh'], resolve),
        name: '首页',
        meta: { title: '就业落户'}
      }
    ]
  },
  {
    path: '/liuxuecd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/liuxuecd',
        component: (resolve) => require(['@/views/mainpage/liuxuecd'], resolve),
        name: '首页',
        meta: { title: '留学存档'}
      }
    ]
  },
  {
    path: '/pinganlxpx',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/pinganlxpx',
        component: (resolve) => require(['@/views/mainpage/pinganlxpx'], resolve),
        name: '首页',
        meta: { title: '平安留学培训'}
      }
    ]
  },
  {
    path: '/xueweixl',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/xueweixl',
        component: (resolve) => require(['@/views/mainpage/xueweixl'], resolve),
        name: '首页',
        meta: { title: '学位学历认证'}
      }
    ]
  },
  {
    path: '/bangdingsf',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/bangdingsf',
        component: (resolve) => require(['@/views/mainpage/bangdingsf'], resolve),
        name: '首页',
        meta: { title: '绑定第三方登陆'}
      }
    ]
  },
  {
    path: '/shiminrz',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/shiminrz',
        component: (resolve) => require(['@/views/mainpage/shiminrz'], resolve),
        name: '首页',
        meta: { title: '实名认证'}
      }
    ]
  },
  {
    path: '/personalRegister',
    component: (resolve) => require(['@/views/register/personalRegister'], resolve),
    hidden: true
  },
  {
    path: '/orgenRegister',
    component: (resolve) => require(['@/views/register/orgenRegister'], resolve),
    hidden: true
  },
  {
    path: '/otherLogin',
    component: (resolve) => require(['@/views/otherThreeLogin/otherLogin'], resolve),
    hidden: true
  },
  {
    path: '/otherUserInfo',
    component: (resolve) => require(['@/views/otherThreeLogin/otherUserInfo'], resolve),
    hidden: true
  },
  {
    path: '/forgetPassword',
    component: (resolve) => require(['@/views/register/forgetPassword'], resolve),
    hidden: true
  },
  {
    path: '/orgenForgetPassword',
    component: (resolve) => require(['@/views/register/orgenForgetPassword'], resolve),
    hidden: true
  },
  {
    path: '/bangdingsf',
    component: (resolve) => require(['@/views/mainpage/bangdingsf'], resolve),
    hidden: true
  },
  {
    path: '/wechatCompleteInfo',
    component: (resolve) => require(['@/views/wechatInfo/wechatCompleteInfo'], resolve),
    hidden: true
  },
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
