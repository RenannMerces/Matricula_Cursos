import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'matricula',
    component: () => import('../views/MatriculaCursos.vue')
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: () => import('../views/MatriculasAlunos.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router