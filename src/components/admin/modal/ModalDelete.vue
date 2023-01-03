<template>
    <div class="fixed top-0 left-0 w-full flex h-screen justify-center items-center">
        <div class="absolute opacity-20 bg-black w-full h-screen flex items-center z-10">
        </div>
        <div class="w-1/3 mx-auto rounded-lg shadow-md z-50">
            <div class="bg-white px-8 py-8">
                <p class="text-xl">Bạn có chắn chắn muốn xóa?</p>
                <p class="text-zinc-500 mt-2 text-sm">Hành động này sẽ không thể hoàn tác khi thực hiện, bạn hãy xác nhận lần cuối và tiếp tục</p>
            </div>
            <div class="bg-sky-100 w-full h-full flex justify-end items-center gap-8 px-8 py-4">
                <a class="cursor-pointer text-zinc-700 px-3 py-2" @click="close()">Hủy</a>
                <button @click="removeItem(id)" class="bg-sky-400 text-white px-6 py-2 rounded-md">Đồng ý</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    methods: {
        close() {
            this.$emit("close")
        },
        removeItem(id) {
            this.$emit("remove-item", id)
            this.close()
        }
    }
}
</script>
