<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
      
      <form @submit.prevent="handleLogin"> <!-- Ngăn chặn hành động gửi form -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Nhập email"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mật khẩu
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <BUTTON
            :isLoading="isLoading"
            color="bg-gray-500"
            disabledColor="bg-gray-300"
            text="Đăng nhập"
          ></BUTTON>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BUTTON from '@/components/buttons/button.vue';
import { mapGetters } from 'vuex';
import { loginApi } from '@/api/auth/loginApi';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '', // Biến lưu trữ email
      password: '', // Biến lưu trữ mật khẩu
    };
  },
  computed: {
    ...mapGetters('loading', ['isLoading']), // Lấy giá trị isLoading từ Vuex
  },
  components: {
    BUTTON,
  },
  methods: {
    async handleLogin() {
      try {
        const loginData = {
            email: this.email,
            password: this.password
        };
        const response = await loginApi(loginData); // Gọi API với email và mật khẩu
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
