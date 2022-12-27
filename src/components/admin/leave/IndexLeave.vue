<template>
    <Navbar :user="user" />
    <div class="flex h-screen">
        <NavigationBar />
        <div class="bg-sky-50 grow px-10 py-6">
            <p class="font-base text-zinc-500">HRM-HT/ Đơn xin nghỉ phép</p>
            <div class="my-4 bg-white px-4 py-3 rounded-md">
                <div class="flex items-center align-center">
                    <p class="text-2xl font-medium">Đơn xin nghỉ phép</p>
                    <router-link :to="{ name: 'storeLeave' }" 
                        class="ml-auto px-4 py-2 bg-sky-500 rounded-md text-white font-medium">
                        Tạo mới
                    </router-link>
                </div>
                <div class="border-t border-zinc-100 mt-4">
                    <div class="flex items-center gap-10 mt-3">
                        <div class="w-1/3">
                            <p>Tìm kiếm theo từ khóa</p>
                            <input type="text" v-model="search" placeholder="Tra cứu ..." class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900" />
                        </div>
                        <div class="w-1/3">
                            <p>Loại lý do nghỉ phép</p>
                            <select name="filterLeaveType" v-model="filterLeaveType" class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
                                <option value="">Tất cả</option>
                                <option v-for="leaveType in leaveTypes" :key="leaveType.id" :value="leaveType.id">
                                    {{ leaveType.type_name }}
                                </option>   
                            </select>
                        </div>
                        <div class="w-1/3">
                            <p>Trạng thái</p>
                            <select name="filterStatus" v-model="filterStatus" class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
                                <option value="">Tất cả</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option> 
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex mt-4 gap-4">
                    <button class="px-4 py-2 text-white bg-sky-500 rounded-xl hover:bg-sky-400">Tìm kiếm</button>
                    <button class="px-4 py-2 bg-zinc-100 rounded-xl hover:bg-zinc-300">Reset tìm kiếm</button>
                </div>
            </div>

            <table class="w-full text-left bg-white rounded-lg">
                <thead class="uppercase rounded-lg">
                    <tr class="text-xs text-zinc-400 font-bold border-b">
                        <td class="lg:px-4 py-3">Tên nhân viên</td>
                        <td class="lg:px-4 py-3">Email</td>
                        <td class="lg:px-4 py-3">Loại lý do nghỉ phép</td>
                        <td class="lg:px-4 py-3">Lý do nghỉ phép</td>
                        <td class="lg:px-4 py-3">Ngày bắt đầu</td>
                        <td class="lg:px-4 py-3">Ngày kết thúc</td>
                        <td class="lg:px-4 py-3">Trạng thái</td>
                        <td class=""></td>
                    </tr>
                </thead>

                <tbody v-for="leave in leaves" :key="leave.id">
                    <tr class="text-gray-600 text-sm">
                        <td class="px-4 py-3">
                            <router-link v-if="leave.employee.id" 
                            :to="{ 
                                name: 'detailEmployee', 
                                params: { id: leave.employee.id } 
                            }" 
                            class="text-sky-500 font-medium">
                                {{ leave.employee.first_name  }}
                            </router-link>
                        </td>
                        <td class="px-4 py-3">
                            {{ leave.employee.email  }}
                        </td>
                        <td class="px-4 py-3">
                            {{ leave.leave_type.type_name  }}
                        </td>
                        <td class="px-4 py-3">
                            {{ leave.reason }}
                        </td>
                        <td class="px-4 py-3">
                            {{ leave.start_day  }}
                        </td>
                        <td class="px-4 py-3">
                            {{ leave.end_day  }}
                        </td>
                        <td class="px-4 py-3">
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
                        </td>
                        <td class="pl-4 py-3">
                            <div class="flex gap-3 items-center justify-center">
                                <router-link 
                                    :to="{
                                        name: 'detailLeave',
                                        params: {
                                            id: leave.id
                                        }
                                    }"  
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </router-link>
                                <router-link 
                                    :to="{
                                        name: 'updateLeave',
                                        params: {
                                            id: leave.id
                                        }
                                    }"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </router-link>
                                <button @click="showModal(leave.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalDelete :id="id" v-if="isModal" @close="isModal=false" @remove-item="removeLeave"/>
    </div>
</template>

<script>
import Navbar from "../../navbar/Navbar.vue"
import NavigationBar from "../../NavigationBar/NavigationBar.vue"
import ModalDelete from "../modal/ModalDelete.vue"

import axios from "axios"


export default {
    components: {
        Navbar,
        NavigationBar,
        ModalDelete
    },
    data() {
        return {
            id: '',
            isModal: '',
            search: '',
            filterLeaveType: '',
            filterStatus: '',
            debounce: null,
            leaves: {},
            leaveTypes: {},
            user: this.$cookies.get('user')
        }
    },
    methods: {
        getLeaves() {
            const token = this.$cookies.get('token')
            
            axios
            .get('http://127.0.0.1:8000/api/admin/leaves', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.leaves = response.data.data
            })
        },
        removeLeave(id) {
            const token = this.$cookies.get('token')

            axios
            .delete('http://127.0.0.1:8000/api/admin/leaves/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.getLeaves()
            })
        },
        getLeaveTypes() {
            const token = this.$cookies.get('token')
            
            axios
            .get('http://127.0.0.1:8000/api/admin/leave-types', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.leaveTypes = response.data.data
            })
        },
        filterData() {
            clearTimeout(this.debounce)

            const token = this.$cookies.get('token')

            this.debounce = setTimeout(() => {
                axios
                    .get('http://127.0.0.1:8000/api/admin/leaves?', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            keywords: this.search,
                            leave_type_id: this.filterLeaveType,
                            status: this.filterStatus
                        }
                    })
                    .then((response) => {
                        console.log(response.data.data)
                        this.leaves = response.data.data
                    })
            })
        },
        showModal(id) {
            this.isModal = true;
            this.id = id;
        }
    },
    created() {
        this.getLeaves();
        this.getLeaveTypes();
    },
    watch: {
        search() {
            this.filterData()
        },

        filterLeaveType() {
            this.filterData()
        },

        filterStatus() {
            this.filterData()
        }
    }
}
</script>

