import Vue from 'vue'
import VueRouter from 'vue-router'
import LatestMovie from '@/components/LatestMovie'
import Movie from '@/components/Movie'
import SearchMovie from '@/components/SearchMovie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LatestMovie',
    component: LatestMovie
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    props: true,
    component: Movie
  },
  {
    path: '/search/:name',
    name: 'SearchMovie',
    props: true,
    component: SearchMovie
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
