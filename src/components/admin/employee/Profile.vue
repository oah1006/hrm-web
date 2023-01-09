<template>
    <Navbar :user="user"/>
    <div class="flex h-screen">
        <NavigationBar />
        <div class="bg-sky-50 grow px-10 py-6">
            <p class="font-base text-zinc-500">HRM-HT/ Thông tin cá nhân</p>
            <div class="my-4 bg-white px-4 py-3 rounded-md flex justify-center items-center">
                <p class="text-2xl font-medium">Thông tin cá nhân</p>
                <router-link :to="{name: 'change-password'}" class="ml-auto px-4 py-2 bg-sky-500 rounded-md text-white font-medium">
                Cập nhật mật khẩu
                </router-link>
            </div>
            
            <form @submit.prevent="handleSubmit">
                <div class="bg-white w-full mt-5 rounded-lg shadow-md">
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Email</p>
                            <input type="text" name="email" v-model="email" placeholder="Email" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error?.errors?.email">{{ error?.errors?.email[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Họ</p>
                            <input type="text" name="last_name" v-model="last_name" placeholder="Họ" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error?.errors?.last_name">{{ error?.errors?.last_name[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Tên</p>
                            <input type="text" name="first_name" v-model="first_name" placeholder="Tên" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error?.errors?.first_name">{{ error?.errors?.first_name[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Số điện thoại:</p>
                            <input type="text" name="phone_number" v-model="phone_number" placeholder="Số điện thoại" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error?.errors?.phone_number">{{ error?.errors?.phone_number[0]  }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Ngày sinh:</p>
                            <input type="date" name="birth_date" v-model="birth_date" placeholder="Ngày sinh" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
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
import Navbar from "../../navbar/Navbar.vue";
import NavigationBar from "../../NavigationBar/NavigationBar.vue";
import axios from "axios";

export default {
    inject: ['employee'],
    components: {
        Navbar, 
        NavigationBar
    },
    data() {
        return {
            user: this.$cookies.get('user'),
            email: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            birth_date: '',
            employeeData: this.employee,
            error: {}
        }
    },
    methods: {
        handleSubmit() {
            const token = this.$cookies.get('token');

            const data = {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                phone_number: this.phone_number,
                birth_date: this.birth_date
            }

            axios
            .put('http://127.0.0.1:8000/api/admin/edit-profile', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.$store.dispatch('showToast', {
                    text: 'Cập nhật thông tin thành công',
                    visible: true
                })
            })
            .catch((error) => {
                this.error = error.response.data
            })
        },  
    },
    created() {
        this.email = this.employeeData.email
        this.last_name = this.employeeData.last_name
        this.first_name = this.employeeData.first_name
        this.phone_number = this.employeeData.phone_number
        this.birth_date = this.employeeData.birth_date
    }
}
</script>

