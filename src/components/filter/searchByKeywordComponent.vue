<!-- searchByKeywordComponent.vue -->
<template>
    <div class="flex items-center space-x-4 my-1">
        <!-- Input field for keyword search -->
        <input v-model="keyword" @input="search" type="text" placeholder="Tìm kiếm..."
            class="p-2 border border-gray-300 rounded-sm focus:outline-none " />

        <!-- Search button -->
        <button @click="search"
            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Tìm kiếm
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        search() {
            // Emit the search event with the keyword
            this.$emit('search', this.keyword);
        }
    }
}
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>