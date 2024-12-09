<template>
    <div
        class="p-6 bg-white rounded-sm shadow-sm w-full flex flex-col sm:flex-row sm:space-x-6 mb-2 space-y-4 sm:space-y-0">
        <!-- Cột Tìm kiếm quyền -->
        <div class="w-full sm:w-1/2 md:w-1/3">
            <label for="roles" class="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm quyền</label>
            <div class="relative">
                <select id="roles"
                    class="block w-full mt-1 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    v-model="selectedRole" @change="findWithRoles">
                    <option @click="handleSearch" v-for="role in filteredRoles" :key="role.id" :value="role">{{
                        role.name }}</option>
                </select>
            </div>
        </div>

        <!-- Cột Tìm kiếm -->
        <div class="w-full sm:w-1/2 md:w-1/3">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <div class="flex">
                <input type="text" v-model="searchQuery" placeholder="Nhập từ khóa để tìm kiếm..."
                    class="flex-1 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <button @click="handleSearch"
                    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                    Tìm kiếm
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import { getAllRoles } from '@/api/roleApi.js';

export default {
    name: 'filterRolesComponent',
    data() {
        return {
            selectedRole: '',
            searchQuery: '',
            roles: []
        };
    },
    computed: {
        filteredRoles() {
            return this.roles;
        }
    },
    mounted() {
        this.loadRoles();
    },
    methods: {
        handleSearch() {
            this.$emit('search', this.searchQuery, this.selectedRole ? this.selectedRole.name : null);
        },

        async loadRoles() {
            try {
                const roles = await getAllRoles();
                this.roles = roles.data;
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
    }
};
</script>

<style scoped></style>
