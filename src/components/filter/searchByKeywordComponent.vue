<template>
    <div class="flex items-center space-x-4 my-1">
        <input v-model="keyword" @input="debouncedSearch" type="text" placeholder="Tìm kiếm..."
            class="p-2 border border-gray-300 rounded-sm focus:outline-none " />
        <button @click="search"
            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Tìm kiếm
        </button>
    </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
    data() {
        return {
            keyword: ''
        };
    },
    created() {
        this.debouncedSearch = debounce(this.search, 500);
    },
    methods: {
        search() {
            this.$emit('search', this.keyword);
        }
    }
}
</script>
