<template>
    <Navbar  />
    <div class="flex">
        <NavigationBar />
        <div class="grow lg:px-10 lg:py-6 bg-sky-50" v-if="employee.id">
            <div class="flex items-center">
                <p class="text-4xl text-zinc-500 font-light">Thông tin nhân viên</p>
                <div class="flex gap-3 ml-auto">
                    <router-link v-if="employee.id" :to="{name: 'updateEmployee', params: {id: employee.id}}" class="text-xl bg-blue-500 text-white py-3 px-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </router-link>
                    <!-- <form action="{{ route('admin.users.destroy', $user) }}" method="post"  class="flex items-center text-xl bg-white py-3 px-3 rounded-lg text-red-500">
                        <button onclick="return confirm('Are you sure you want to delete this user?')" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </form> -->
                </div>
            </div>

            <div class="bg-white w-full rounded-lg shadow-md mt-8">
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Email</p>
                    <p class="grow text-cyan-500 font-medium">{{ employee.email }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Họ</p>
                    <p class="grow">{{ employee.last_name }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Tên</p>
                    <p class="grow text-cyan-500 font-medium">{{ employee.first_name }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Giới tính</p>
                    <p v-if="employee.gender === '1'" class="grow">Nam</p>
                    <p v-else-if="employee.gender === '2'" class="grow">Nữ</p>
                    <p v-else class="grow">Khác</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Số điện thoại</p>
                    <p class="grow">{{ employee.phone_number }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Phòng ban</p>
                    <p class="grow">{{ employee.department.department_name }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Ngày sinh</p>
                    <p class="grow">{{ employee.birth_date }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Vai trò</p>
                    <p v-if="employee.role === 'admin'" class="text-white rounded-md font-medium px-3 py-0 bg-red-500">
                        {{ employee.role }}
                    </p>
                    <p v-else class="text-green-500 rounded-md font-medium">
                        {{ employee.role }}
                    </p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Trạng thái</p>
                    <p v-if="employee.status === 'active'" class="bg-sky-500 text-white rounded-md inline-block text-center font-medium py-0 px-2">
                        {{ employee.status }}
                    </p>
                    <p v-else class="bg-zinc-400 text-white rounded-md inline-block text-center font-medium py-0 px-2 text-sm">
                        {{ employee.status }}
                    </p>
                </div>
            </div>
            <router-link :to="{name: 'employee'}" class="font-medium text-lg inline-flex mt-3 items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Danh sách nhân viên
            </router-link>
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
            employee: {},
        }
    },
    created() {
        const token = this.$cookies.get('token')

        axios
            .get('http://127.0.0.1:8000/api/admin/employees/' + this.$route.params.id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.employee = response.data
            })
    }
}
</script>

<style>

</style>