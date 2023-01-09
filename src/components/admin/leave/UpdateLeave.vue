<template>
    <Navbar :user="user" />
    <div class="flex">
        <NavigationBar />
        <div class="bg-sky-50 grow lg:px-10 py-6 h-screen">
            <p class="text-4xl text-zinc-500 font-light">Cập nhật đơn xin nghỉ phép</p>
            <form @submit.prevent="handleSubmit">
                <div class="bg-white w-full mt-5 rounded-lg shadow-md">
                    <div class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/4">Tên nhân viên</p>
                        <select :disabled="true" name="employee_id" v-model="employee_id" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                                {{ employee.first_name}}
                            </option>   
                        </select>
                    </div>  
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/4">Tên loại lý do xin nghỉ phép</p>
                            <select name="leave_type_id" v-model="leave_type_id" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                                <option value="" disabled selected hidden>Chọn loại lý do</option>
                                <option v-for="leaveType in leaveTypes" :key="leaveType.id" :value="leaveType.id">
                                    {{ leaveType.type_name }}
                                </option>   
                            </select>
                        </div>
                    </div> 
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/4">Lý do xin nghỉ phép</p>
                            <input type="text" name="reason" v-model="reason" placeholder="Lý do..." class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-[275px] pb-3" v-if="error?.errors?.reason">{{ error?.errors?.reason[0] }}</p>
                    </div>  
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/4">Ngày bắt đầu nghỉ</p>
                            <input type="date" name="start_day" v-model="start_day" placeholder="Tên phòng ban..." class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                    </div> 
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/4">Ngày kết thúc nghỉ</p>
                            <input type="date" name="end_day" v-model="end_day" placeholder="Tên phòng ban..." class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                    </div> 
                    <div :class="leave.employee?.role == 'employee' ? isHidden : ''" class="flex items-center gap-4 border-b boder-gray-100 border-solid px-10 py-6">
                        <p class="w-1/4">Trạng thái</p>
                        <select name="status" v-model="status" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option> 
                            <option value="rejected">Rejected</option>
                        </select>
                    </div> 
                </div>
                <div class="flex mt-4">
                    <div class="flex items-center gap-3">
                        <router-link :to="{name: 'leave'}" class="font-medium text-lg inline-flex items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            Danh sách các đơn nghỉ việc
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
            employee_id: '',
            leave_type_id: '',
            reason: '',
            start_day: '',
            end_day: '',
            status: '',
            isHidden: 'hidden',
            employees: {},
            leaveTypes: {},
            leaves: {},
            leave: {},
            error: {},
            user: this.$cookies.get('user')
        }
    },
    methods: {
        handleSubmit() {
            const token = this.$cookies.get('token')

            const data = {
                employee_id: this.employee_id,
                leave_type_id: this.leave_type_id,
                reason: this.reason,
                start_day: this.start_day,
                end_day: this.end_day,
                status: this.status
            }

            axios
            .put('http://127.0.0.1:8000/api/admin/leaves/' + this.$route.params.id, data, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                this.$router.push('/admin/leave')
                this.$store.dispatch('showToast', {
                    text: 'Cập nhật đơn nghỉ phép thành công',
                    visible: true
                })
            })
            .catch((error) => {
                this.error = error.response.data
            })
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
            this.leave = response.data
            this.employee_id = response.data.employee_id
            this.reason = response.data.reason
            this.leave_type_id = response.data.leave_type.id
            this.start_day = response.data.start_day
            this.end_day = response.data.end_day
            this.status = response.data.status
        })
        axios
        .get('http://127.0.0.1:8000/api/admin/employees', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.employees = response.data.data 
        })

        axios
        .get('http://127.0.0.1:8000/api/admin/leave-types', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.leaveTypes = response.data.data 
        })

        axios
        .get('http://127.0.0.1:8000/api/admin/leaves', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.leaves = response.data.data 
        })
    }
}
</script>

<style>

</style>