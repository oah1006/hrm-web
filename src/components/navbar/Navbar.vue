<template>
  <div class="px-4 bg-blue-50 flex w-full max-h-full">
    <div class="w-1/5 flex-none mx-4 my-4 ">
        <p class="font-medium text-xl">HRM-HT</p>
    </div>
    <div class="w-4/5 flex grow mx-4 my-4 ">
        <div class="ml-auto flex gap-4">
            <button type="logout" @click="logout">Logout</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
          this.$router.push('/login')
        })
    }
  }
}
</script>
