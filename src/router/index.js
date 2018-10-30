import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import Login from '../pages/login'
import MakePoster from '../pages/make-poster'
import SignUp from '../pages/signUp'
import PersonCenter from '../pages/person-center'
import MyHero from '../pages/person-center/MyHero'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/poster',
      name:'Poster',
      component:MakePoster,
    },
    {
      path:'/signUp',
      name:'SignUp',
      component:SignUp,
    },
    {
      path:'/person-center',
      name:'personCenter',
      component:PersonCenter,
      children:[
        {path:'',component:MyHero}
      ]
    }

  ]
})
