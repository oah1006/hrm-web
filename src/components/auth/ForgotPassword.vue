<template>
    <div class="w-full h-screen min-h-full bg-blue-100">
        <div class="flex items-center justify-center h-screen">
            <form @submit.prevent="handleSubmit" class="w-2/5 px-20 py-8 bg-white rounded-lg">
                <p class="text-center font-medium text-3xl">Bạn quên mật khẩu?</p>
                <p class="text-center text-base font-thin mt-1">Đừng lo lắng, hãy nhập email phía bên dưới để được nhận mã OTP xác thực người dùng và đổi mật khẩu nhé!</p>
                <p class="mt-3">Email</p>
                <input type="text" v-model="email" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-300" placeholder="Email" />
                <p class="text-red-500 mt-1" v-if="error">{{ error.data }}</p>
                <button class="px-4 py-2 bg-cyan-500 w-full mt-4 rounded-sm text-white">Gửi OTP</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            error: ''
        }
    },
    methods: {
        handleSubmit() {
            const data = {
                email: this.email,
            }
            
            axios
            .post('http://127.0.0.1:8000/api/admin/auth/send-otp', data)
            .then((response) => {
                this.$router.push(`/verify-otp?email=${this.email}`)
            }).catch((error) => {
                this.error = error.response.data
            })
        }
    }
}
</script>

<style>

</style>