<template>
    <div>
        <div class="py-2 px-6 bg-[#404e6800] flex items-center shadow-md sticky top-0 left-0 z-10">
            <button @click="toggleLeftMenu" type="button"
                class="text-lg text-blue-500 font-semibold sidebar-toggle block md:hidden ">
                <i class='bx bx-menu'></i>
            </button>
            <ul class="ml-auto flex items-center">
                <li class="dropdown ml-3">
                    <button type="button" class="dropdown-toggle flex items-center">
                        <div class="flex-shrink-0 w-10 h-10 relative">
                            <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                <img class="w-8 h-8 rounded-full"
                                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                    alt="" />
                                <div
                                    class="top-0 left-7 absolute w-3 h-3 bg-blue-400 border-2 border-blue rounded-full animate-ping">
                                </div>
                                <div
                                    class="top-0 left-7 absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full">
                                </div>
                            </div>
                        </div>
                        <div class="p-2 md:block text-left">
                            <h2 class=" font-semibold text-blue-700 text-xs">Xin chào, {{ name }}
                            </h2>
                            <p class="text-xs text-blue-700 ">Quản Trị Viên</p>
                        </div>
                    </button>
                    <ul
                        class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                        <li>
                            <a href="#"
                                class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Profile</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Settings</a>
                        </li>
                        <li>
                            <form method="POST" action="">
                                <a role="menuitem"
                                    class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                                    onclick="event.preventDefault();
                                        this.closest('form').submit();">
                                    Log Out
                                </a>
                            </form>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'HeaderComponent',
    computed: {
        ...mapGetters('auth', ['name'])
    },
    methods: {
        ...mapActions('leftMenu', ['toggleLeftMenu']),
    }
}
</script>

<style scoped></style>