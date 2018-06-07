import Vue from 'vue';
import Router from 'vue-router';
import TaskList from '@/components/TaskList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList,
    },
  ],
});
