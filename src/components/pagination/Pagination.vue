<template>
    <div class="flex w-full justify-between">
        <div class="text-zinc-500 ml-2 mt-2">
            <p>Trang: {{ page }}</p>
        </div>
        <ul class="flex list-reset mt-3">
            <li class="mr-2 rounded-full border bg-white hover:bg-sky-500 hover:text-white ">
                <a class="block px-3 py-2 cursor-pointer" @click="prePage">
                    Previous
                </a>
            </li>

            <li class="mr-2 rounded-full border bg-white hover:bg-sky-500 hover:text-white ">
                <a class="block px-3 py-2 cursor-pointer" @click="nextPage">
                    Next
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['page'],
    methods: {
        nextPage() {
            this.$emit("next-page")
        },
        prePage() {
            this.$emit("pre-page")
        }
    }
}
</script>
