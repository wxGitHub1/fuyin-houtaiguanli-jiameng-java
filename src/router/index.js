import Vue from 'vue';
import Router from 'vue-router';
import path from './path';
import { Main } from 'element-ui';

Vue.use(Router);
import VueRouter from "vue-router";

const [routerPush, routerReplace] = [VueRouter.prototype.push, VueRouter.prototype.replace];
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
}
export default new Router({
  mode:'hash',
  routes: [
    {
      path: '*',
      name: '404',
      component: path.Error,
    },
    {
      path: '/',
      name: 'Login',
      component: path.LoginPage,
    },
    {
      path: '/home',
      name: 'home',
      component: path.Home,
    },
    {
      path: '/login',
      name: 'login',
      component: path.LoginPage,
    },
    // {
    //   path: '/support',
    //   name: 'supports',
    //   component: path.Support,
    // },
    // {
    //   path: '/evaluation',
    //   name: 'evaluationPage',
    //   component: path.Evaluation,
    // },
    // {
    //   path: '/taketype',
    //   name: 'take',
    //   component: path.TakeType,
    // },
    // {
    //   path: '/modify',
    //   name: 'modifytype',
    //   component: path.Modify,
    // },
    // {
    //   path: '/front',
    //   name: 'frontdesk',
    //   component: path.Front,
    // },
    // {
    //   path: '/specialUser',
    //   name: 'specialUser',
    //   component: path.FrontUser,
    // },
    // {
    //   path: '/bigclient',
    //   name: 'bigClient',
    //   meta: {
    //     requireAuth: true
    //   },
    //   component: path.BigClient,
    // },
    // {
    //   path: '/outwork',
    //   name: 'outwork',
    //   meta: {
    //     requireAuth: true
    //   },
    //   component: path.OutWork,
    // },
    // {
    //   path: '/process',
    //   name: 'process',
    //   component: path.Process,
    // },
    // {
    //   path: '/quality',
    //   name: 'quality',
    //   component: path.Quality,
    // },
    // {
    //   path: '/clothes',
    //   name: 'tryclothes',
    //   component: path.TryClothes,
    // },
    // {

    //   path: '/fiance',
    //   name:'fiance',
    //   component: path.Fiance,
    // },
    // {
    //   path: '/warehouse',
    //   name: 'warehouse',
    //   component: path.Warehouse,
    // },
    // {
    //   path: '/return',
    //   name: 'return',
    //   component: path.Return,
    // },
    // {
    //   path: '/supermanage',
    //   name: 'super',
    //   component: path.SuperManage,
    // },
    // {
    //   path: '/theory',
    //   name: 'theory',
    //   component: path.Theory,
    // },
  ],
});
