<template>
  <div class="flex items-center border-b shadow-md">
    <div class="flex w-1/6 border-r py-3 px-10">
        <p class="font-medium text-xl">HRM-HT</p>
    </div>
    <div class="flex gap-8 items-center ml-auto mr-10">
          <p class="text-red-500 font-medium">{{ user.first_name }}</p>
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
          this.$router.push('/login')
        })
    }
  }
}
</script>
