<script>
import Navbar from '../navbar/Navbar.vue'
import NavigationBar from '../NavigationBar/NavigationBar.vue'

import axios from 'axios'

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            employees: {},
            departments: {},
            leaveTypes: {},
            leaves: {},
            user: this.$cookies.get('user')
        }
    },
    methods: {
        getEmployees() {
            const token = this.$cookies.get('token')

            axios
            .get('http://127.0.0.1:8000/api/admin/employees', {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.employees = response.data.data
            })
        },

        getDepartments() {
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
    },
    created() {
        this.getEmployees();
        this.getDepartments();
        this.getLeaveTypes();
        this.getLeaves();
    }
}
</script>

<template>
    <Navbar :user="user" />
    <div class="flex">
        <NavigationBar class="flex-0" />
        <div class="grow bg-sky-50 h-screen min-h-full">
            <div class="px-10 py-6 ">
                <p class="text-4xl">Dashboard</p>
            </div>
            <div class="px-10 py-6 grid grid-cols-4 gap-4">
                <div class="px-4 py-4 h-56 bg-white shadow-md rounded-lg">
                    <div class="flex items-center gap-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <p class="text-2xl">Tổng số nhân viên</p>
                    </div>
                    <p class="text-6xl mt-10 text-center">{{ employees.length }}</p>
                </div>
                <div class="px-4 py-4 h-56 bg-white shadow-md rounded-lg">
                    <div class="flex items-center gap-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                        <p class="text-2xl">Tổng số phòng ban</p>
                    </div>
                    <p class="text-6xl mt-10 text-center">{{ departments.length }}</p>
                </div>
                <div class="px-4 py-4 h-56 bg-white shadow-md rounded-lg">
                    <div class="flex items-center gap-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>

                        <p class="text-2xl">Tổng số loại lý do</p>
                    </div>
                    <p class="text-6xl mt-10 text-center">{{ leaveTypes.length }}</p>
                </div>
                <div class="px-4 py-4 h-56 bg-white shadow-md rounded-lg">
                    <div class="flex items-center gap-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>

                        <p class="text-2xl">Tổng đơn xin nghỉ</p>
                    </div>
                    <p class="text-6xl mt-10 text-center">{{ leaves.length }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



