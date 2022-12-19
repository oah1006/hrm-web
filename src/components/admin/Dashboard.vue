<script>
import Navbar from '../navbar/Navbar.vue'
import NavigationBar from '../NavigationBar/NavigationBar.vue'

export default {
    components: {
        Navbar,
        NavigationBar
    },
    data() {
        return {
            user: this.$cookies.get('user')
        }
    }
}
</script>

<template>
    <Navbar :user="user" />
    <div class="flex">
        <NavigationBar />
        <p class="text-2xl py-6 px-6 font-medium">Dashboard</p>
    </div>
</template>



