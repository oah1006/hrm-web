<template>
  <Navbar :user="user"/>
    <div class="flex h-screen">
        <NavigationBar />
        <div class="bg-sky-50 grow px-10 py-6">
            <p class="font-base text-zinc-500">HRM-HT/ Cập nhật mật khẩu</p>
            <div class="my-4 bg-white px-4 py-3 rounded-md flex justify-center items-center">
                <p class="text-2xl font-medium">Cập nhật mật khẩu</p>
                <router-link
                    :to="{ 
                        name: 'profile', 
                    }"
                    class="inline-flex items-center gap-3 px-3 py-2 rounded-lg text-black font-medium text-lg ml-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Quay về
                </router-link>
            </div>
            
            <form @submit.prevent="handleSubmit">
                <div class="bg-white w-full mt-5 rounded-lg shadow-md">
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/12">Mật khẩu cũ</p>
                        <input type="password" name="old_password" v-model="old_password" placeholder="Mật khẩu cũ" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                    </div>
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/12">Mật khẩu mới</p>
                        <input type="password" name="password" v-model="password" placeholder="Mật khẩu mới" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                    </div>
                    
                </div>
                <div class="flex justify-end mt-4">
                    <button class="flex items-center gap-2 py-2 px-4 hover:bg-blue-400 bg-blue-500 rounded-lg text-white font-medium text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Navbar from '../../navbar/Navbar.vue'
import NavigationBar from '../../NavigationBar/NavigationBar.vue'

import axios from 'axios'

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            user: this.$cookies.get('user'),
            old_password: '',
            password: ''
        }
    },
    methods: {
        handleSubmit() {
            const token = this.$cookies.get('token')

            const data = {
                old_password: this.old_password,
                password: this.password
            }

            axios
            .post('http://127.0.0.1:8000/api/admin/change-password', data, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                console.log(response)
            })
        }
    }
}
</script>
