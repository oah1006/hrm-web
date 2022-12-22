<template>
  <div class="flex items-center border-b shadow-md">
    <div class="flex w-1/6 border-r py-3 px-10">
        <router-link :to="{name: 'dashboard'}" class="font-medium text-xl">HRM-HT</router-link>
    </div>
    <div class="flex gap-8 items-center ml-auto mr-10">
          <router-link :to="{name: 'detailEmployee', params: {id: user.id}}" class="text-red-500 font-medium">{{ user.first_name }}</router-link>
          <a href="#" @click="logout">Logout</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    user: Object
  },
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
    }
  }
}
</script>
