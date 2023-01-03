<template>
    <div class="w-full h-screen min-h-full bg-blue-100">
        <div class="flex items-center justify-center h-screen">
            <form @submit.prevent="handleSubmit" class="w-2/5 px-20 py-8 bg-white rounded-lg">
                <p class="text-center font-medium text-3xl">Khôi phục mật khẩu</p>
                <p class="text-red-500 mt-1" v-if="error">{{ error.message }}</p>
                <p class="mt-3">Mật khẩu mới</p>
                <input type="password" v-model="new_password" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Mật khẩu" />
                <p class="mt3">Nhập lại mật khẩu mới</p>
                <input type="password" v-model="new_password_confirmation" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Nhập lại mật khẩu" />             
                <button class="px-4 py-2 bg-cyan-500 w-full mt-4 rounded-sm text-white">Khôi phục</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            new_password: '',
            new_password_confirmation: '',
            error: ''
        }
    },
    methods: {
        handleSubmit() {
            const data = {
                new_password: this.new_password,
                new_password_confirmation: this.new_password_confirmation,
                email: this.$route.query.email
            }

            const token = this.$cookies.get('tokenOtp')
            
            console.log(token)

            axios
            .post('http://127.0.0.1:8000/api/admin/auth/forgot-password', data, {
                headers: {
                    token: token
                }
            })
            .then((response) => {
                this.$router.push('/')
            })
            .catch((error) => {
                this.error = error.response.data
            })
        }
    }
}
</script>

<style>

</style>