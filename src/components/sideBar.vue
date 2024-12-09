<template>
    <div>

        <!--sidenav -->
        <div v-if="isLeftMenuOpen"
            class="fixed left-0 top-0 w-64 h-full bg-[#163a84] p-4 z-30 sidebar-menu transition-transform custom-scrollbar  md:block overflow-y-auto ">
            <a href="/" class="flex items-center  border-opacity-60  ">
                <h2 class="hidden md:block lg:block font-bold text-2xl pb-4 text-white">
                    GIZMO SHOP QUẢN TRỊ
                </h2>
            </a>
            <ul class="mt-28 md:mt-4 lg:mt-4 ">
                <span class="text-white font-bold">QUẢN LÝ CHUNG</span>
                <li class="mb-1 group">
                    <a href="/"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-list-ul mr-3 text-lg'></i>
                        <span class="text-sm">Tổng quan</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <router-link :to="{ name: 'me' }"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                        <i class='bx bx-user mr-3 text-lg'></i>
                        <span class="text-sm">Thông tin cá nhân</span>
                        <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                    </router-link>
                </li>
                <span class="text-white font-bold">QUẢN LÝ TÀI KHOẢN </span>
                <li class="mb-1 group">
                    <RouterLink :to="{ name: 'staff' }"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                        <i class='bx bxs-user-account mr-3 text-lg'></i>
                        <span class="text-sm">Danh sách</span>
                        <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                    </RouterLink>
                </li>
                <span class="text-white font-bold">QUẢN LÝ KHO</span>
                <li class="mb-1 group">
                    <RouterLink :to="{ name: 'inventory' }"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bxs-school mr-3 text-lg'></i>
                        <span class="text-sm">Danh sách kho</span>

                    </RouterLink>
                </li>
                <span class="text-white font-bold">THỐNG KÊ</span>
                <li class="mb-1 group">
                    <router-link :to="{ name: 'SalesRevenueStatistics' }"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-coin-stack mr-3 text-lg'></i>
                        <span class="text-sm">Doanh thu bán hàng</span>
                    </router-link>
                </li>
                <li class="mb-1 group">
                    <router-link :to="{ name: 'ProductStatistics' }"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bxl-deezer mr-3 text-lg'></i>
                        <span class="text-sm">Thống kê Sản phẩm </span>
                    </router-link>
                </li>
                <li class="mb-1 group">
                    <router-link :to="{ name: 'SupplierStatistics' }" class=" flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100
                        hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800
                        group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-envelope mr-3 text-lg'></i>
                        <span class="text-sm">Nhà cung cấp </span>
                    </router-link>
                </li>
                <span @click="logout" class="text-white font-bold cursor-pointer">
                    <i class='bx bx-log-out'></i> &nbsp; Đăng Xuất</span>
            </ul>
        </div>
        <div v-if="isLeftMenuOpen" @click="toggleLeftMenu"
            class="fixed top-0 left-0 w-full h-full bg-black/50 z-10  md:hidden sidebar-overlay"></div>
        <!-- end sidenav -->
    </div>
</template>

<script>
import '@/assets/css/customScrollbar.css';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'NavbarComponent',
    computed: {
        ...mapGetters('leftMenu', ['isLeftMenuOpen'])
    },
    methods: {
        ...mapActions('leftMenu', ['toggleLeftMenu']),
        ...mapActions('auth', ['logout']),
    }
}
</script>
<style lang="css" scoped></style>