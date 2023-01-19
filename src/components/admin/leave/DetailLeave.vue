<template>
    <Navbar  />
    <div class="flex">
        <NavigationBar />
        <div class="grow lg:px-10 lg:py-6" v-if="leave.id">
            <div class="flex items-center">
                <p class="text-4xl text-zinc-500 font-light">Thông tin đơn xin nghỉ</p>
                <div class="flex gap-3 ml-auto">
                    <router-link v-if="leave.id" :to="{name: 'updateLeave', params: {id: leave.id}}" class="text-xl bg-blue-500 text-white py-3 px-3 rounded-lg">
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
                    <p class="w-1/3">Tên</p>
                    <p class="grow text-cyan-500 font-medium">{{ leave.employee.first_name }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Email</p>
                    <p class="grow">{{ leave.employee.email }}</p>
                </div>   
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Loại lý do nghỉ phép</p>
                    <p class="grow text-red-500 font-medium">{{ leave.leave_type.type_name }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Lý do</p>
                    <p class="grow">{{ leave.reason }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Ngày bắt đầu</p>
                    <p class="grow">{{ leave.start_day }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Ngày kết thúc</p>
                    <p class="grow">{{ leave.end_day }}</p>
                </div>
                <div class="flex py-4 border-b border-solid border-gray-100 px-10">
                    <p class="w-1/3">Trạng thái</p>
                    <div v-if="leave.status === 'pending'" class="flex gap-1 items-center align-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-green-500 font-medium">{{ leave.status }}</p>
                    </div>
                    <div v-else-if="leave.status === 'approved'" class="flex gap-1 items-center align-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <p class="text-blue-500 font-medium">{{ leave.status }}</p>
                    </div>
                    <div v-else-if="leave.status === 'rejected'" class="flex gap-1 items-center align-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-red-500 font-medium">{{ leave.status }}</p>
                    </div>
                </div>

            </div>
            <router-link :to="{name: 'leave'}" class="font-medium text-lg inline-flex mt-3 items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Danh sách đơn xin nghỉ
            </router-link>
        </div>
    </div>
</template>

<script>
import Navbar from "../../navbar/Navbar.vue"
import NavigationBar from "../../NavigationBar/NavigationBar.vue"

import axios from "axios"

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            leave: this.leave
        }
    },
    created() {
        const token = this.$cookies.get('token')

        axios
        .get('http://127.0.0.1:8000/api/admin/leaves/' + this.$route.params.id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(response.data)
            this.leave = response.data
        })
        
    }
}
</script>

<style>

</style>