<template>
  <div class="flex items-center border-b shadow-md" v-if="employeeData?.id">
    <div class="flex w-1/6 border-r py-3 px-10">
      <router-link :to="{name: 'dashboard'}" class="font-medium text-xl">HRM-HT</router-link>
    </div>
    <div class="flex gap-8 items-center ml-auto mr-10">
      <div class="flex gap-2 bg-red-500 px-2 py-0.5 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path class="text-white" stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <router-link :to="{name: 'detailEmployee', params: {id: employeeData?.id}}" class="text-white font-medium">{{ employeeData?.first_name }}</router-link>
      </div>
      <div class="flex gap-2 items-center align-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <a href="#" @click="logout" class="bg-black text-white px-2 py-0.5 rounded-lg">Đăng xuất</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  methods: {
    logout() {
      const token = this.$cookies.get('token')

      axios
        .post('http://127.0.0.1:8000/api/admin/logout', {} ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }, {
          withCredentials: true
        })
        .then((response) => {
          this.$cookies.remove('token');
          this.$router.push('/')
        })
    },
  },

  computed: {
    ...mapState(['employeeData'])
  }

}
</script>
