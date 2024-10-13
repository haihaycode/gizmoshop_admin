<template>
    <div>

        <!--sidenav -->
        <div v-if="isLeftMenuOpen"
            class="fixed left-0 top-0 w-64 h-full bg-[#404e68] p-4 z-30 sidebar-menu transition-transform custom-scrollbar  md:block overflow-y-auto ">
            <a href="/" class="flex items-center  border-opacity-60  ">
                <h2 class="hidden md:block lg:block font-bold text-2xl pb-4 text-white"> <span
                        class="bg-blue-500 rounded-sm">&nbsp; GIZMO
                        &nbsp;</span>
                    QUẢN TRỊ
                </h2>
            </a>
            <ul class="mt-28 md:mt-4 lg:mt-4 ">
                <span class="text-white font-bold">QUẢN LÝ CHUNG</span>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                        <i class='bx bx-user mr-3 text-lg'></i>
                        <span class="text-sm">Đối Tác Cung cấp</span>
                        <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-list-ul mr-3 text-lg'></i>
                        <span class="text-sm">Thông Báo</span>
                    </a>
                </li>
                <span class="text-white font-bold">NHÂN VIÊN</span>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                        <i class='bx bxl-blogger mr-3 text-lg'></i>
                        <span class="text-sm">Danh sách</span>
                        <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-archive mr-3 text-lg'></i>
                        <span class="text-sm">Phân công</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-archive mr-3 text-lg'></i>
                        <span class="text-sm">Chi tiết</span>
                    </a>
                </li>
                <span class="text-white font-bold">QUẢN LÝ KHO</span>
                <li class="mb-1 group">
                    <RouterLink :to="{ name: 'inventory' }"
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-bell mr-3 text-lg'></i>
                        <span class="text-sm">Danh sách kho</span>
                        <span
                            class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
                    </RouterLink>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-envelope mr-3 text-lg'></i>
                        <span class="text-sm">SẢN PHẨM</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2
                            New</span>
                    </a>
                </li>
                <span class="text-white font-bold">THỐNG KÊ & BÁO CÁO</span>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-bell mr-3 text-lg'></i>
                        <span class="text-sm">SẢN PHẨM BÁN RA</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-envelope mr-3 text-lg'></i>
                        <span class="text-sm">Tài chính</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2
                            New</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-envelope mr-3 text-lg'></i>
                        <span class="text-sm">Đối tác hiệu quả</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2
                            New</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-white hover:bg-gray-100 hover:bg-opacity-5 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='bx bx-envelope mr-3 text-lg'></i>
                        <span class="text-sm">Quảng cáo</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2
                            New</span>
                    </a>
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