import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'
import AuthLayout from "../layouts/AuthLayout.vue"
import MainLayout from "../layouts/MainLayout.vue"
import MainProducts from "../views/MainProducts.vue"
import CalculateProduct from "../views/CalculateProduct.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta:{
      layout:AuthLayout
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta:{
      layout:AuthLayout
    }
  },
  {
    path: '/',
    name: 'Main',
    component: MainView,
    redirect: { name:"MainProducts" },
    meta:{
      layout:MainLayout
    },
    children:[
      {
        path:"/products",
        name:"MainProducts",
        component:MainProducts,
        meta:{
          layout:MainLayout
        }
      },
      {
        path:"/product-calculate",
        name:"CalculateProduct",
        component:CalculateProduct,
        meta:{
          layout:MainLayout
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated =  !!localStorage.getItem("user");
  // console.log(!isAuthenticated)
  // console.log(to.meta.layout.name === "AuthLayout")
  if (to.meta.layout.name !== 'AuthLayout' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
