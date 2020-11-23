import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/demo/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/index.vue')
  },
  {
    path: '/demo/lifeHook',
    name: 'LifeHook',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/LifeHook.vue')
  },
  {
    path: '/demo/dataType',
    name: 'DataType',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DataType.vue')
  },
  {
    path: '/demo/dataType2',
    name: 'DataType2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DataType2.vue')
  },
  {
    path: '/demo/dataType3',
    name: 'DataType3',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DataType3.vue')
  },
  {
    path: '/demo/dataType4',
    name: 'DataType4',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DataType4.vue')
  },
  {
    path: '/demo/dataType5',
    name: 'DataType5',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DataType5.vue')
  },
  {
    path: '/demo/dataType6',
    name: 'DataType6',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DataType6.vue')
  },
  // {
  //   path: '/demo/demoVue2',
  //   name: 'DemoVue2',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DemoVue2.vue')
  // },
  {
    path: '/demo/demoVue3-0',
    name: 'DemoVue3-0',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DemoVue3-0.vue')
  },
  {
    path: '/demo/demoVue3-1',
    name: 'DemoVue3-1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo/DemoVue3-1.vue')
  },
  {
    path: '/psv/demo-1',
    name: 'PSV-Demo-1',
    component: () => import(/* webpackChunkName: "about" */ '../views/PSV/Demo-1.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
