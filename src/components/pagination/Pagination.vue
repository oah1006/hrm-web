<template>
    <ul class="flex list-reset border border-grey-light rounded w-auto font-sans">
        <li>
            <a class="block hover:text-white hover:bg-blue text-blue border-r border-grey-light px-3 py-2" 
                href="#"
                
            >
                Previous
            </a>
        </li>
        <li>
            <a class='   block px-3 py-2 bg-blue h-full border-blue hover:text-white hover:bg-blue text-blue border-r border-grey-light'
                href="#"     
            >
               1
            </a>
        </li>
        <li>
            <a class="block hover:text-white hover:bg-blue text-blue px-3 py-2" 
                href="#"

            >
                Next
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>