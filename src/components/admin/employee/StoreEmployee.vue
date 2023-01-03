<template>
    <Navbar :user="user" />
    <div class="flex">
        <NavigationBar />
        <div class="bg-sky-50 grow lg:px-10 lg:py-6">
            <p class="text-4xl text-zinc-500 font-light">Tạo nhân viên</p>
            <form @submit.prevent="handleSubmit">
                <div class="bg-white w-full mt-5 rounded-lg shadow-md">
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Email</p>
                            <input type="text" name="email" v-model="email" placeholder="Email" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error">{{ error.errors.email[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Mật khẩu</p>
                            <input type="password" name="password" v-model="password" placeholder="Mật khẩu" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error">{{ error.errors.password[0] }}</p>
                    </div>  
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Họ</p>
                            <input type="text" name="last_name" v-model="last_name" placeholder="Họ" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error">{{ error.errors.last_name[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Tên:</p>
                            <input type="text" name="first_name" v-model="first_name" placeholder="Tên" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error">{{ error.errors.first_name[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Số điện thoại:</p>
                            <input type="text" name="phone_number" v-model="phone_number" placeholder="Số điện thoại" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error">{{ error.errors.phone_number[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Ngày sinh:</p>
                            <input type="date" name="birth_date" v-model="birth_date" placeholder="Ngày sinh" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error">{{ error.errors.birth_date[0] }}</p>
                    </div>
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/12">Giới tính</p>
                        <select name="gender" v-model="gender" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                            <option value="1">Khác</option>
                            <option value="2">Nam</option>
                            <option value="3">Nữ</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/12">Phòng ban</p>
                        <select name="department_id" v-model="department_id" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                            <option v-for="department in departments" :key="department.id" :value="department.id">
                                {{ department.department_name }}
                            </option>   
                        </select>
                    </div>
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/12">Vai trò</p>
                        <select name="role" v-model="role" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/12">Trạng thái</p>
                        <select name="status" v-model="status" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                            <option value="active">Active</option>
                            <option value="disabled">disabled</option>
                        </select>
                    </div>
                </div>
                <div class="flex mt-4">
                    <div class="flex items-center gap-3">
                        <router-link :to="{name: 'employee'}" class="font-medium text-lg inline-flex items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            Danh sách nhân viên
                        </router-link>
                    </div>
                    <div class="ml-auto">
                        <button class="flex items-center gap-2 py-2 px-4 hover:bg-blue-400 bg-blue-500 rounded-lg text-white font-medium text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import Navbar from '../../navbar/Navbar.vue'
import NavigationBar from '../../NavigationBar/NavigationBar.vue'
import axios from 'axios'
import { ref } from 'vue'

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            gender: '1',
            birth_date: '',
            role: 'admin',
            status: 'active',
            error: '',
            isLoading: ref(false),
            department_id: '1',
            user: this.$cookies.get('user'),
            departments: []
        }
    },
    methods: {
        handleSubmit() {
            const token = this.$cookies.get('token')

            this.isLoading = true;
            console.log(this.isLoading)

            const data = {
                email: this.email,
                password: this.password,
                first_name: this.first_name,
                last_name: this.last_name,
                phone_number: this.phone_number,
                gender: this.gender,
                birth_date: this.birth_date,
                role: this.role,
                status: this.status,
                department_id: this.department_id,
            }

            axios
            .post('http://127.0.0.1:8000/api/admin/employees', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.$router.push('/admin/employee')
            })
            .catch((error) => {
                console.log(error.response.data.errors)
                this.error = error.response.data
            })
        }
    },
    beforeMount() {
        const token = this.$cookies.get('token')

        axios
            .get('http://127.0.0.1:8000/api/admin/departments', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.departments = response.data.data
            })
    }
}
</script>

<style>

</style>