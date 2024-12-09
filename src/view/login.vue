<template>
  <div class="">
    <div class="min-h-screen flex items-center justify-center bg-gray-100" style="
    background-position: 100%;
    background-image: url(https://pittcc.edu/wp-content/uploads/2023/04/Office-Administration-Background.jpg);
">
      <div class="bg-white p-8 rounded-lg md:shadow-md sm:shadow-none md:w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-6">
          Quản Trị Viên <span class="text-blue-500">GizmoShop</span>
        </h2>

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
            <div class="relative">
              <Field name="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :type="passwordType" id="password" placeholder="**************" required
                :class="errors.password ? 'border-red-500' : ''" />
              <i class=" absolute right-3 top-3 cursor-pointer" @click="togglePassword"
                :class="passwordType === 'password' ? 'bx bx-hide' : 'bx bx-show'"></i>
            </div>
            <p class="lg:text-sm text-red-500">{{ errors.password }}</p>
          </div>
          <div class="flex items-center justify-end">
            <BUTTON :isLoading="isLoading" color="bg-gray-500" disabledColor="bg-gray-300" text="Đăng nhập"></BUTTON>
          </div>
        </Form>
      </div>
    </div>

    <!-- Notification Modal -->
    <NotificationModal :isOpen="isModalOpen" :title="'Thông báo'" :message="message" :type="messageType"
      @close="isModalOpen = false" />
  </div>
</template>

<script>
import NotificationModal from "@/components/modal/NotificationModal.vue";
import BUTTON from "@/components/buttons/button.vue";
import { mapGetters, mapActions } from "vuex";
import { loginApi } from "@/api/auth/loginApi";
import { handleAuthentication } from "@/services/authService";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "LoginForm",
  data() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("Email là bắt buộc *")
        .email("Email không đúng định dạng *"),
      password: Yup.string()
        .min(8, "Password tổi thiểu 8 ký tự *")
        .required("Password là bắt buộc *"),
    });
    return {
      schema,
      email: "",
      password: "",
      isModalOpen: false,
      message: "",
      messageType: "",
      passwordType: "password",
    };
  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
  components: {
    Form,
    Field,
    BUTTON,
    NotificationModal,
  },
  methods: {
    ...mapActions("auth", ["setToken", "setRefreshToken"]),
    async handleLogin(values) {
      try {
        const loginData = {
          email: values.email,
          password: values.password,
        };
        const response = await loginApi(loginData);
        const isAdmin = handleAuthentication(
          response.data.accessToken,
          response.data.refreshToken
        );
        this.messageType = isAdmin ? "success" : "warning";
        this.message = isAdmin ? response.message : "Không đủ quyền";
        this.isModalOpen = true;
        if (isAdmin) {
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    },
    togglePassword() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped></style>
