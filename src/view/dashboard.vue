<template>
    <div
        class="p-2 bg-gray-200 bg-opacity-30 flex flex-col lg:flex-row lg:items-center justify-between shadow-md shadow-black/5 sticky top-0 left-0  lg:m-2 md:m-0">
        <h1 class="text-lg font-semibold mb-4 lg:mb-0 lg:text-xl">Dashboard - GizmoShop</h1>
        <div class="space-y-2 text-sm lg:text-base">
            <p><strong>Token:</strong> <span class="break-all">{{ token }}</span></p>
            <p><strong>Refresh Token:</strong> <span class="break-all">{{ refreshToken }}</span></p>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Role:</strong> {{ role }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'dashboard-view',
    computed: {
        ...mapGetters('auth', ['token', 'refreshToken', 'name', 'role', 'user']),
        email() {
            return this.name || 'Không có email';
        }
    },
    mounted() {
        console.log('User Info:', this.user);
    }
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
