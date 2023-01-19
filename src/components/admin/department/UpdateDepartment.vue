<template>
    <Navbar  />
    <div class="flex h-screen">
        <NavigationBar />
        <div class="bg-sky-50 grow lg:px-10 lg:py-6">
            <p class="text-4xl text-zinc-500 font-light">Cập nhật phòng ban</p>
            <form @submit.prevent="handleSubmit">
                <div class="bg-white w-full mt-5 rounded-lg shadow-md">
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Tên phòng ban</p>
                            <input type="text" name="department_name" v-model="department_name" placeholder="Tên phòng ban..." class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error?.errors?.department_name">{{ error?.errors?.department_name[0] }}</p>
                    </div>
                    <div class="border-b boder-gray-100 border-solid py-6">
                        <div class="flex items-center gap-4 px-10">
                            <p class="w-1/12">Mô tả</p>
                            <input type="text" name="description" v-model="description" placeholder="Mô tả..." class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                        </div>
                        <p class="text-red-500 mt-3 px-36 pb-3" v-if="error?.errors?.description">{{ error?.errors?.description[0] }}</p>
                    </div>              
                </div>
                <div class="flex mt-4">
                    <div class="flex items-center gap-3">
                        <router-link :to="{name: 'department'}" class="font-medium text-lg inline-flex items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            Danh sách phòng ban
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

import axios from 'axios'

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            department_name: '',
            description: '',
            error: {}
        }
    },
    methods: {
        handleSubmit() {
            const token = this.$cookies.get('token')

            const data = {
                department_name: this.department_name,
                description: this.description
            }

            axios
            .put('http://127.0.0.1:8000/api/admin/departments/' + this.$route.params.id, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.$router.push('/admin/department')
                this.$store.dispatch('showToast', {
                    text: 'Cập nhật phòng ban thành công',
                    visible: true
                })
            })
            .catch((error) => {
                this.error = error.response.data
            })
        }
    },
    beforeMount() {
        const token = this.$cookies.get('token')

        axios
        .get('http://127.0.0.1:8000/api/admin/departments/' + this.$route.params.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            this.department_name = response.data.department_name
            this.description = response.data.description
        })
    }
}
</script>

<style>

</style>