<template>
    <Navbar :user="user" />
    <div class="flex h-screen">
        <NavigationBar />
        <div class="bg-sky-50 grow px-10 py-6">
            <p class="font-base text-zinc-500">HRM-HT/ Loại lý do xin nghỉ phép</p>
            <div class="my-4 bg-white px-4 py-3 rounded-md">
                <div class="flex items-center align-center">
                    <p class="text-2xl font-medium">Các loại lý do xin nghỉ phép</p>
                    <router-link 
                        :to="{name: 'storeLeaveType'}"
                        class="ml-auto px-4 py-2 bg-sky-500 rounded-md text-white font-medium">
                        Tạo mới
                    </router-link>
                </div>
                <div class="border-t border-zinc-100 mt-4">
                    <div class="mt-3">
                        <p class="w-1/5">Tìm kiếm theo từ khóa</p>
                        <input type="text" v-model="search" placeholder="Tra cứu ..." class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900" />
                    </div>
                </div>
            </div>

            <table class="w-full text-left bg-white rounded-lg">
                <thead class="uppercase rounded-lg">
                <tr class="text-xs text-zinc-400 font-bold border-b">
                    <td class="lg:px-4 py-3">Tên loại lý do xin nghỉ phép</td>
                    <td class=""></td>
                </tr>
                </thead>

                <tbody v-for="leaveType in leaveTypes" :key="leaveType.id">
                    <tr class="text-gray-600 text-sm">
                        <td class="px-4 py-3 text-sky-500 font-medium">
                            {{ leaveType.type_name  }}
                        </td>
                        <td class="lg:pl-4 py-3 flex gap-3 items-center justify-end mr-4">
                            <router-link
                            v-if="leaveType.id"
                            :to="{
                                name: 'detailLeaveType',
                                params: {
                                    id: leaveType.id
                                }
                            }"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                                </svg>
                            </router-link>

                            <router-link
                                v-if="leaveType.id"
                                :to="{
                                    name: 'updateLeaveType',
                                    params: {
                                        id: leaveType.id
                                    }
                                }"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                                </svg>
                            </router-link>
                            <button @click="showModal(leaveType.id)">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalDelete :id="id" v-if="isModal" @close="isModal=false" @remove-item="removeLeaveType"/>
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
            leaveTypes: {},
            search: '',
            debounce: null,
            user: this.$cookies.get('user')
        }
    },
    methods: {
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
        removeLeaveType(id) {
            const token = this.$cookies.get('token')

            axios
            .delete('http://127.0.0.1:8000/api/admin/leave-types/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.getLeaveTypes();
            })
        },
        searchLeaveTypes() {
            clearTimeout(this.rebounce)

            const token = this.$cookies.get('token')

            this.rebounce = setTimeout(() => {
                axios
                .get('http://127.0.0.1:8000/api/admin/leave-types?', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        keywords: this.search
                    }
                })
                .then((response) => {
                    this.leaveTypes = response.data.data
                })
            }, 300)
        },
        showModal(id) {
            this.isModal = true;
            this.id = id;
        }
    },
    created() {
        this.getLeaveTypes();
    },
    watch: {
        search() {
           this.searchLeaveTypes()
        }
    }
}
</script>

<style>

</style>