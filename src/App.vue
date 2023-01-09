<script>
import LoadingPage from "./components/admin/loading-page/LoadingPage.vue"
import ToastNotification from "./components/admin/toast/ToastNotification.vue"

import axios from 'axios'
import { reactive, ref, computed } from 'vue'

  export default {
    components: {
      LoadingPage,
      ToastNotification
    },
    data() {
      return {
        isLoadingPage: true,
        employeeData: {}
      }
    },
    provide() {
      return {
      // explicitly provide a computed property
        employee: computed(() => this.employeeData)
      }
    },

    methods: {
      getProfile() {
            const token = this.$cookies.get('token');

            axios
            .get('http://127.0.0.1:8000/api/admin/profile', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                this.isLoadingPage = false
                this.employeeData = response.data;
            })
            .catch((error) => {
              this.$router.push('/')
              this.isLoadingPage = false
            })
      }
    },
      
    created() {
      this.getProfile();
    }
  }
</script>

<template>
  <ToastNotification />
  <LoadingPage v-if="isLoadingPage" />
  <router-view v-else />
</template>

<style>
</style>
