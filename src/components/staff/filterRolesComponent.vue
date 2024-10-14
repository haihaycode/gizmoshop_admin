<template>
    <div>
        <label for="roles" class="block text-sm font-medium text-gray-700">Tìm kiếm quyền</label>
        <div class="mt-1 relative">
            <!-- Dropdown với khả năng tìm kiếm -->
            <select id="roles"
                class="block w-60 mt-2 pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                v-model="selectedRole" @change="filterRoles">
                <option v-for="role in filteredRoles" :key="role" :value="role">{{ role }}</option>
            </select>
        </div>

        <div class="mt-4">
            <h3 class="text-sm font-medium text-gray-700">Quyền được chọn: {{ selectedRole }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'filterRolesComponent',
    data() {
        return {
            search: '', 
            selectedRole: '', 
            roles: [
                'ROLE_ADMIN',
                'ROLE_SHIPPER',
                'ROLE_CUSTOMER',
                'ROLE_MANAGER',
                'ROLE_SUPPORT',
                'ROLE_USER'
            ]
        };
    },
    computed: {
        // Lọc các quyền dựa trên từ khóa tìm kiếm
        filteredRoles() {
            return this.roles.filter(role =>
                role.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },
    methods: {
        filterRoles() {
            // Logic nếu cần xử lý khi thay đổi quyền
            console.log('Selected Role:', this.selectedRole);
        }
    }
};
</script>

<style scoped>
/* Thêm style tùy chọn nếu cần */
</style>