<template>
    <div class="w-full h-full bg-blue-100">
        <div class="flex items-center justify-center h-[700px]">
            <form @submit.prevent="handleSubmit" class="w-2/5 px-20 py-8 bg-white rounded-lg">
                <p class="text-center font-medium text-3xl">Login</p>
                <p class="text-center text-base font-thin mt-1">Welcome to HRM Hiệp thành!</p>
                <p class="mt-2">Email</p>
                <input type="text" name="email" v-model="email" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Username" />
                <p class="text-red-500" v-if="error">{{ error.message }}</p>
                <p class="mt-3">Password</p>
                <input type="password" v-model="password" class="rounded-md px-2 py-2 mt-1 w-full border border-zinc-200" placeholder="Password" />
                <button v-on:click="handleSubmit" class="px-4 py-2 bg-cyan-500 w-full mt-6 rounded-sm text-white">Đăng nhập</button>
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
                const response = await axios.post('http://127.0.0.1:8000/api/admin/auth/login', {
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.$router.push('/admin/dashboard')
                }).catch((error) => {
                    this.error = error.response.data
                });

                
            }
        }
    }
</script>