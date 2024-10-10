<template>
    <div>
        <h1 class="text-lg font-semibold">Dashboard - GizmoShop</h1>
        <div class="mt-4">
            <p><strong>Token:</strong> {{ token }}</p>
            <p><strong>Refresh Token:</strong> {{ refreshToken }}</p>
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
        // Map các getters từ Vuex store
        ...mapGetters('auth', ['token', 'refreshToken', 'name', 'role', 'user']),

        // Sử dụng email từ user hoặc name nếu cần
        email() {
            return this.name || 'Không có email';
        }
    },
    mounted() {
        // Bạn có thể dùng console.log ở đây
        console.log('User Info:', this.user);
    }
};
</script>

<style scoped>
/* CSS styles (optional) */
</style>
