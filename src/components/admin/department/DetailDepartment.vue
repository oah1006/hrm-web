<template>
    <Navbar  />
    <div class="flex">
        <NavigationBar />
        <div class="grow lg:px-10 lg:py-6">
            <div class="flex items-center">
                <p class="text-4xl text-zinc-500 font-light">Thông tin chi tiết phòng ban</p>
                <div class="flex gap-3 ml-auto">
                    <router-link v-if="department.id" :to="{name: 'updateDepartment', params: {id: department.id}}" class="text-xl bg-blue-500 text-white py-3 px-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </router-link>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md mt-8">
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3 flex-none">Tên phòng ban</p>
                    <p class="grow text-cyan-500 font-medium">{{ department.department_name }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3 flex-none">Mô tả</p>
                    <p class="grow text-cyan-500 font-medium break-words">{{ department.description }}</p>
                </div>
            </div>
            <router-link :to="{name: 'department'}" class="font-medium text-lg inline-flex mt-3 items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Danh sách phòng ban
            </router-link>
        </div>
    </div>
</template>

<script>
import Navbar from "../../navbar/Navbar.vue";
import NavigationBar from "../../NavigationBar/NavigationBar.vue";

import axios from "axios";

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            department: [],
        }
    },
    created() {
        const token = this.$cookies.get('token')

        axios
        .get('http://127.0.0.1:8000/api/admin/departments/' + this.$route.params.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.department = response.data
        })
    }
}
</script>

<style>

</style>