<template>
    <div class="w-full h-screen min-h-full bg-blue-100">
        <div class="flex items-center justify-center h-screen">
            <form @submit.prevent="handleSubmit" class="w-2/5 px-20 py-8 bg-white rounded-lg">
                <p class="text-center font-medium text-3xl">Login</p>
                <p class="text-center text-base font-thin mt-1">Welcome to HRM Hiệp thành!</p>
                <p class="text-red-500 mt-3" v-if="error">{{ error.message }}</p>
                <p class="mt-1">Email</p>
                <input type="text" name="email" v-model="email" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Username" />
                <p class="mt-3">Password</p>
                <input type="password" v-model="password" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Password" />
                <button class="px-4 py-2 bg-cyan-500 w-full mt-6 rounded-sm text-white">Đăng nhập</button>
                <div class="flex">
                    <a href="/forgot-password" class="ml-auto text-cyan-500 underline mt-1">Forgot password?</a>
                </div>
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
                password: '',
                error: ''
            }
        },
        methods: {
            async handleSubmit() {
                const data = {
                    email: this.email,
                    password: this.password
                }

                const instance = axios.create({
                    withCredentials: true
                })

                instance
                    .post('http://127.0.0.1:8000/api/admin/auth/login', data)
                    .then((response) => {
                        this.$cookies.set('user', response.data.employee)
                        this.$cookies.set('token', response.data.token, 60 * 60 * 24)
                        this.$router.push('/admin/dashboard')
                    })
                    .catch((error) => {
                        this.error = error.response.data
                    })
            }
        }
    }
</script>