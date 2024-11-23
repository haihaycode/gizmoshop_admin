<template>
    <div class="p-2 bg-gray-200 bg-opacity-30  sticky top-0 left-0  lg:m-2 md:m-0">
        <div class="flex justify-center items-center">
            <img src="https://agilearn.vn/wp-content/uploads/2021/02/ban-hang-chuyen-nghiep-02-1.png" class=" h-[500px]"
                alt="">
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
