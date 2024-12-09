<template>
  <div>
    <label for="search" class="block text-sm font-medium text-gray-700">Tìm kiếm</label>
    <div class="mt-1">
      <input type="text" v-model="searchQuery" placeholder="Nhập từ khóa để tìm kiếm..."
        class="block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
      <button @click="performSearch" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Tìm kiếm</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchComponent',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    performSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped></style>