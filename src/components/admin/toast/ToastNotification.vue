<template>
    <div class="fixed inline-flex top-14 right-4 z-50 max-w-xs animate-bounce" v-if="visible">
        <div class="flex gap-4 relative items-center w-56 px-4 py-3 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-none w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="grow">{{ text }}</p>
        </div>
        <span class="flex absolute h-4 w-4 -top-1 -right-1">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['visible', 'text', 'type'])
    }
}
</script>
