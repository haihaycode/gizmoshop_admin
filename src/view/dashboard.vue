<template>
    <div class="relative p-0 min-h-screen top-0 left-0 md:m-0" :style="{
        backgroundImage: 'url(https://pittcc.edu/wp-content/uploads/2023/04/Office-Administration-Background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 1
    }">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 z-20">
            <div class="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:bg-blue-400 cursor-pointer">
                <router-link :to="{ name: 'SalesRevenueStatistics' }">
                    <h3 class="text-lg font-semibold">Doanh thu bán hàng</h3> Xem thêm
                </router-link>
            </div>
            <div class="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:bg-blue-400 cursor-pointer">
                <router-link :to="{ name: 'ProductStatistics' }">
                    <h3 class="text-lg font-semibold">Thống kê sản phẩm</h3> Xem thêm
                </router-link>
            </div>
            <div class="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:bg-blue-400 cursor-pointer">
                <router-link :to="{ name: 'SupplierStatistics' }">
                    <h3 class="text-lg font-semibold">Thống kê nhà cung cấp</h3> Xem thêm
                </router-link>
            </div>
            <div class="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:bg-blue-400 cursor-pointer">
                <router-link :to="{ name: 'staff' }">
                    <h3 class="text-lg font-semibold">Danh sách tài khoản</h3>Xem thêm
                </router-link>
            </div>
            <div class="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg hover:bg-blue-400 cursor-pointer">
                <router-link :to="{ name: 'inventory' }">
                    <h3 class="text-lg font-semibold">Danh sách kho</h3>Xem thêm
                </router-link>
            </div>
        </div>
        <div>
            <InfoAccount />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InfoAccount from './infoAccount.vue';

export default {
    components: {
        InfoAccount
    },
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
