import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/admin/Dashboard.vue'
import Login from '../components/auth/Login.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'
import ResetPassword from '../components/auth/ResetPassword.vue'
import VerifyOTP from '../components/auth/VerifyOTP.vue'
import IndexEmployee from '../components/admin/employee/IndexEmployee.vue'
import CreateEmployee from '../components/admin/employee/CreateEmployee.vue'
import UpdateEmployee from '../components/admin/employee/UpdateEmployee.vue'
import DetailEmployee from '../components/admin/employee/DetailEmployee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // admin
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    // employee
    {
      path: '/admin/employee',
      name: 'employee',
      component: IndexEmployee
    },
    {
      path: '/admin/employee/create-employee',
      name: 'createEmployee',
      component: CreateEmployee
    },
    {
      path: '/admin/employee/update-employee/:id',
      name: 'updateEmployee',
      component: UpdateEmployee
    },
    {
      path: '/admin/employee/detail-employee/:id',
      name: 'detailEmployee',
      component: DetailEmployee
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/verify-otp',
      name: 'verify-otp',
      component: VerifyOTP
    }
  ]
})

export default router
