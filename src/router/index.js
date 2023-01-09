import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/admin/Dashboard.vue'
import Login from '../components/auth/Login.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'
import ResetPassword from '../components/auth/ResetPassword.vue'
import VerifyOTP from '../components/auth/VerifyOTP.vue'

import IndexEmployee from '../components/admin/employee/IndexEmployee.vue'
import StoreEmployee from '../components/admin/employee/StoreEmployee.vue'
import UpdateEmployee from '../components/admin/employee/UpdateEmployee.vue'
import DetailEmployee from '../components/admin/employee/DetailEmployee.vue'
import Profile from '../components/admin/employee/Profile.vue'
import ChangePassword from '../components/admin/employee/ChangePassword.vue'

import IndexDepartment from '../components/admin/department/IndexDepartment.vue'
import StoreDepartment from '../components/admin/department/StoreDepartment.vue'
import UpdateDepartment from '../components/admin/department/UpdateDepartment.vue'
import DetailDepartment from '../components/admin/department/DetailDepartment.vue'

import IndexLeaveType from '../components/admin/leave-type/IndexLeaveType.vue'
import StoreLeaveType from '../components/admin/leave-type/StoreLeaveType.vue'
import UpdateLeaveType from '../components/admin/leave-type/UpdateLeaveType.vue'
import DetailLeaveType from '../components/admin/leave-type/DetailLeaveType.vue'

import IndexLeave from '../components/admin/leave/IndexLeave.vue'
import StoreLeave from '../components/admin/leave/StoreLeave.vue'
import UpdateLeave from '../components/admin/leave/UpdateLeave.vue'
import DetailLeave from '../components/admin/leave/DetailLeave.vue'

import TableLoading from '../components/admin/loading-table/LoadingTable.vue'
import Pagination from '../components/pagination/Pagination.vue'
import ModalDelete from '../components/admin/modal/ModalDelete.vue'
import LoadingPage from '../components/admin/loading-page/LoadingPage.vue'
import ToastNotification from '../components/admin/toast/ToastNotification.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // admin
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    // employee
    {
      path: '/admin/employee',
      name: 'employee',
      component: IndexEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/employee/change-password',
      name: 'change-password',
      component: ChangePassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/employee/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/employee/store-employee',
      name: 'storeEmployee',
      component: StoreEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/employee/update-employee/:id',
      name: 'updateEmployee',
      component: UpdateEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/employee/detail-employee/:id',
      name: 'detailEmployee',
      component: DetailEmployee,
      meta: {
        requiresAuth: true
      }
    },
    // end employee

    // department
    {
      path: '/admin/department',
      name: 'department',
      component: IndexDepartment,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/department/store-department',
      name: 'storeDepartment',
      component: StoreDepartment,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/department/update-department/:id',
      name: 'updateDepartment',
      component: UpdateDepartment,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/department/detail-department/:id',
      name: 'detailDepartment',
      component: DetailDepartment,
      meta: {
        requiresAuth: true
      }
    },
    // end department

    // leave-type
    {
      path: '/admin/leave-type',
      name: 'leaveType',
      component: IndexLeaveType,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/leave-type/store-leave-type',
      name: 'storeLeaveType',
      component: StoreLeaveType,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/leave-type/update-leave-type/:id',
      name: 'updateLeaveType',
      component: UpdateLeaveType,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/leave-type/detail-leave-type/:id',
      name: 'detailLeaveType',
      component: DetailLeaveType,
      meta: {
        requiresAuth: true
      }
    },
    // end leave type
    
    {
      path: '/admin/leave',
      name: 'leave',
      component: IndexLeave,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/leave/store-leave',
      name: 'storeLeave',
      component: StoreLeave,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/leave/update-leave/:id',
      name: 'updateLeave',
      component: UpdateLeave,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/leave/detail-leave/:id',
      name: 'detailLeave',
      component: DetailLeave,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
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
    },
    
    {
      path: '/toast',
      name: 'toast',
      component: ToastNotification
    },


  ]
})

router.beforeEach((to, from, next) => {
  const token = $cookies.get('token')
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        name: 'login'
      })
    }
  } else if (to.meta.guest) {
    if (token) {
      next({
        name: 'dashboard'
      })
    } else {
      next();
    }
  } else {
    next()
  }
});



export default router
