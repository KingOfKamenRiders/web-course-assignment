import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import Login from '../pages/login'
import MakePoster from '../pages/make-poster'
import SignUp from '../pages/signUp'
import PersonCenter from '../pages/person-center'
import MyHero from '../pages/person-center/MyHero'
import PosterSea from '../pages/poster-sea'
import Poster from '../pages/poster'
import TagSea from '../pages/tag-sea'
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
      name:'MakePoster',
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
    },
    {
      path:'/poster-sea',
      name:'PosterSea',
      component:PosterSea,
    },
    {
      path:'/poster-detail',
      name:'poster',
      component:Poster,
    },
    {
      path:'/tag-sea',
      name:'tag-sea',
      component:TagSea,
    }

  ]
})
