<script>
import LoadingPage from "./components/admin/loading-page/LoadingPage.vue"
import ToastNotification from "./components/admin/toast/ToastNotification.vue"

import axios from 'axios'
import { reactive, ref, computed } from 'vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isLoadingPage: true
    }
  },
  components: {
    LoadingPage,
    ToastNotification
  },
  async created() {
    if (this.$route.name == "login") {
      this.isLoadingPage = false
    } else {
      this.isLoadingPage = false
      await this.$store.dispatch('getProfile')
    }
  },
  
  computed: {
    ...mapState(['employeeData'])
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
