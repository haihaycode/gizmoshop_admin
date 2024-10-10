<template>
   <div>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">        <h2 class="text-2xl font-bold text-center mb-6">Quản Trị Viên <span class="text-blue-500"> GizmoShop</span></h2>

        <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ errors }">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email *
            </label>
            <Field name="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="errors.email ? 'border-red-500' : ''" id="email" type="email" placeholder="" required />
            <p class="lg:text-sm text-red-500">{{ errors.email }}</p>

          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Mật khẩu *
            </label>
            <Field name="password"
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline  "
              id="password" type="password" placeholder="**************" required
              :class="errors.password ? 'border-red-500' : ''" />
            <p class="lg:text-sm text-red-500">{{ errors.password }}</p>
          </div>
          <div class="flex items-center justify-between">
            <BUTTON :isLoading="isLoading" color="bg-gray-500" disabledColor="bg-gray-300" text="Đăng nhập"></BUTTON>
          </div>
        </Form>
      </div>
    </div>

    <!-- Notification Modal -->
    <NotificationModal :isOpen="isModalOpen" :title="'Thông báo'" :message="message" :type="'success'"
      @close="isModalOpen = false" />
  </div>
</template>

<script>
import NotificationModal from '@/components/modal/NotificationModal.vue';
import BUTTON from '@/components/buttons/button.vue';
import { mapGetters, mapActions } from 'vuex';
import { loginApi } from '@/api/auth/loginApi';

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

export default {
  name: 'LoginForm',
  data() {
    const schema = Yup.object().shape({
      email: Yup.string().required('Email là bắt buộc *').email('Email không đúng định dạng *'),
      password: Yup.string().min(8, 'Password tổi thiểu 8 ký tự *').required('Password là bắt buộc *'),
    });
    return {
      schema,
      email: '',
      password: '',
      isModalOpen: false,
      message: ''
    };
  },
  computed: {
    ...mapGetters('loading', ['isLoading']), // Lấy giá trị isLoading từ Vuex
  },
  components: {
    Form,
    Field,
    BUTTON,
    NotificationModal
  },
  methods: {

    ...mapActions('auth', ['setToken', 'setRefreshToken']), // Map actions để lưu token và refreshToken
    async handleLogin(values) {
      try {
        const loginData = {
          email: values.email,
          password: values.password,
        };
        const response = await loginApi(loginData); //call api login
        this.message = response.message;
        this.isModalOpen = true;

        //save accessToken and token -> store auth
        this.setToken(response.data.accessToken);
        this.setRefreshToken(response.data.refreshToken);

        setTimeout(() => {
          this.$router.push('/');
        }, 2000);

      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
