import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/homeIndex',
    name: 'HomeIndex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeIndex.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if(to.name == 'login' || to.name == 'register'){  //如果要去的页面是登录或祖册页面，就进行下一步，不做判断
        next()
    }else{
        if(localStorage.getItem('isLogin')==='ok' ){
            next()
        }else{
            next('/login')
        }
    }
})
export default router
