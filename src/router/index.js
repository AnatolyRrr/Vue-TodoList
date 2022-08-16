import { createRouter, createWebHistory } from 'vue-router';
import NewView from '../views/NewView.vue';
import TaskView from '../views/TaskView.vue';
import TasksView from '../views/TasksView.vue';

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: TasksView
  },
  {
    path: '/new',
    name: 'New',
    component: NewView,
  },
  {
    path: '/task/:id',
    name: 'Task',
    props: true,
    component: TaskView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
