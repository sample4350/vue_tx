import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// // 路由前置守卫
// router.beforeEach((to,from,next) => {
//   const {token} = store.state.user
//   if (token) {
//     console.log(token);
//     next({path: '/map'})
//   }else {
//     next({path: '/'})
//   }
// })

export default router
