<template>
  <div class="w-full h-screen min-h-full bg-blue-100">
        <div class="flex items-center justify-center h-screen">
            <form @submit.prevent="handleSubmit" class="w-2/5 px-20 py-8 bg-white rounded-lg">
                <p class="text-center font-medium text-3xl">Xác thực mã OTP</p>
                <p class="text-center text-base font-thin mt-1">Vui lòng nhập mã OTP 6 chữ số đã được gửi đến email của bạn</p>
                <p class="text-center text-base font-thin">Mã OTP sẽ có hiệu lực trong 1 phút</p>
                <p class="mt-3">Mã OTP</p>
                <input type="text" v-model="otpCode" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Your OTP" />         
                <input type="hidden" v-model="email" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Your OTP" />
                <button class="px-4 py-2 bg-cyan-500 w-full mt-4 rounded-sm text-white">Xác thực OTP</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            otpCode: ''
        }
    },
    methods: {
        handleSubmit() {
            const data = {
                email: this.$route.query.email,
                otpCode: this.otpCode
            }

            axios
            .post('http://127.0.0.1:8000/api/admin/auth/verify-otp?email', data)
            .then((response) => {
                this.$cookies.set('tokenOtp', response.data.token, 60 * 60 * 24)
                this.$router.push(`/reset-password?email=${this.$route.query.email}`)
            })
        }
    }
}
</script>

<style>

</style>