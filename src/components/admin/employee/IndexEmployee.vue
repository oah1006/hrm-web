<template>
  <Navbar :user="user" />
  <div class="flex">
    <NavigationBar />
    <div class="bg-sky-50 grow h-screen px-10 py-6">
      <p class="font-base text-zinc-500">HRM-HT/ Nhân viên</p>
      <div class="my-4 bg-white px-4 py-3 rounded-md">
        <div class="flex items-center align-center">
          <p class="text-2xl font-medium">Nhân viên</p>
          <router-link
            :to="{ name: 'storeEmployee' }"
            class="ml-auto px-4 py-2 bg-sky-500 rounded-md text-white font-medium">
            Tạo mới
          </router-link>
        </div>
        <div class="border-t border-zinc-100 mt-4">
          <div class="flex items-center align-center gap-10 mt-3">
            <div class="w-1/4">
              <p>Tìm kiếm theo từ khóa</p>
              <input type="text" v-model="search" placeholder="Tra cứu ..." class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900" />
            </div>
            <div class="w-1/4">
              <p>Phòng ban</p>
              <select name="filterDepartment" v-model="filterDepartment" class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
                <option value="">Tất cả</option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                      {{ department.department_name }}
                </option>   
              </select>
            </div>
            <div class="w-1/4">
              <p>Vai trò</p>
              <select name="filterRole" v-model="filterRole" class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
                <option value="">Tất cả</option>  
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div class="w-1/4">
              <p>Trạng thái</p>
              <select name="filterStatus" v-model="filterStatus" class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
                <option value="">Tất cả</option>  
                <option value="active">Active</option>
                <option value="disabled">disabled</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex mt-4 gap-4">
          <button class="px-4 py-2 text-white bg-sky-500 rounded-xl hover:bg-sky-400">Tìm kiếm</button>
          <button @click="resetListEmployees" class="px-4 py-2 bg-zinc-100 rounded-xl hover:bg-zinc-300">Reset tìm kiếm</button>
        </div>
      </div>

      <table class="w-full text-left bg-white rounded-lg">
        <thead class="uppercase rounded-lg">
          <tr class="text-xs text-zinc-400 font-bold border-b">
            <td class="lg:px-4 py-3">TÊN</td>
            <td class="lg:px-4 py-3">EMAIL</td>
            <td class="lg:px-4 py-3">SỐ ĐIỆN THOẠI</td>
            <td class="lg:px-4 py-3">PHÒNG BAN</td>
            <td class="lg:px-4 py-3">VAI TRÒ</td>
            <td class="lg:px-4 py-3">TRẠNG THÁI</td>
            <td class=""></td>
          </tr>
        </thead>

        <tbody v-for="employee in employees" :key="employee.id">
          <tr class="text-gray-600 text-sm">
            <td class="px-4 py-3">
              {{ employee.first_name }}
            </td>
            <td class="px-4 py-3">
              {{ employee.email }}
            </td>
            <td class="px-4 py-3">
              {{ employee.phone_number }}
            </td>
            <td class="px-4 py-3">
              {{ employee.department.department_name }}
            </td>
            <td class="px-4 py-3">
              <p
                v-if="employee.role === 'admin'"
                class="text-red-500 rounded-md font-medium"
              >
                {{ employee.role }}
              </p>
              <p v-else class="text-green-500 rounded-md font-medium">
                {{ employee.role }}
              </p>
            </td>
            <td class="px-4 py-3">
              <p v-if="employee.status === 'active'" class="bg-sky-500 text-white rounded-md inline-block text-center font-medium py-0 px-2">
                {{ employee.status }}
              </p>
              <p v-else class="bg-zinc-400 text-white rounded-md inline-block text-center font-medium py-0 px-2 text-sm">
                {{ employee.status }}
              </p>
            </td>
            <td class="lg:pl-4 py-3 text-zinc-500 hover:underline flex gap-3 items-center">
              <router-link
                :to="{ 
                    name: 'detailEmployee', 
                    params: { id: employee.id } 
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </router-link>
              <router-link
                :to="{ 
                    name: 'updateEmployee', 
                    params: { id: employee.id } 
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </router-link>
              <button @click="showModal(employee.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>
          <ModalDelete :idEmployee="idEmployee" v-if="isModal" @close="isModal=false" @remove-item="removeEmployee"/>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "../../navbar/Navbar.vue";
import NavigationBar from "../../NavigationBar/NavigationBar.vue";
import ModalDelete from "../modal/ModalDelete.vue"


import axios from "axios";

export default {
  components: {
    Navbar,
    NavigationBar,
    ModalDelete,
  },

  data() {
    return {
      isModal: false,
      search: '',
      idEmployee: '',
      filterDepartment: '',
      filterRole: '',
      filterStatus: '',
      debounce: '',
      employees: {},
      departments: {},
      user: this.$cookies.get("user"),
    };
  },

  methods: {
    getEmployees() {
      const token = this.$cookies.get("token");

      axios
        .get("http://127.0.0.1:8000/api/admin/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.employees = response.data.data;
        });
    },

    removeEmployee(id) {
      const token = this.$cookies.get("token");

      axios
        .delete("http://127.0.0.1:8000/api/admin/employees/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.getEmployees()
        });
    },

    getDepartments() {
      const token = this.$cookies.get("token");

      axios
        .get("http://127.0.0.1:8000/api/admin/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.departments = response.data.data;
        });
    },


    filterData() {
      clearTimeout(this.debounce)
      
      const token = this.$cookies.get('token')

      this.debounce = setTimeout(() => {
        axios
          .get('http://127.0.0.1:8000/api/admin/employees?', {
            headers: {
              Authorization: 'Bearer ' + token
            },
            params: {
              department_id: this.filterDepartment,
              status: this.filterStatus,
              role: this.filterRole,
              keywords: this.search
            }
          })
          .then((response) => {
            this.employees = response.data.data
          })
      }, 400)
    },

    resetListEmployees() {
      this.filterDepartment = '';
      this.filterRole = '';
      this.filterStatus = '';
      this.search = '';
      this.getEmployees();
    },

    showModal(id) {
      this.isModal = true;
      this.idEmployee = id;
    }
  },
  created() {
    this.getEmployees();
    this.getDepartments();
  },
  watch: {
    search() {
      this.filterData()
    },

    filterDepartment() {
      this.filterData()
    },

    filterRole() {
      this.filterData()
    },

    filterStatus() {
      this.filterData()
    }
  }
};
</script>

