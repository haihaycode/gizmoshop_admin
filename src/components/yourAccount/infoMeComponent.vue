<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6">Thông tin của tôi</h1>
  
      <!-- Profile Image Section -->
      <div class="flex flex-col md:flex-row items-center mb-6">
        <img
          v-if="infoAccount?.image"
          src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
          alt="Profile Image"
          class="w-24 h-24 rounded-full object-cover"
        />
        <div v-else class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span class="text-gray-500">Không có ảnh</span>
        </div>
        <div class="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
          <h2 class="text-xl font-semibold">{{ infoAccount?.fullname }}</h2>
          <p class="text-gray-600">{{ infoAccount?.email }}</p>
        </div>
      </div>
  
      <!-- Information Sections (Responsive Grid) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Private Info Section -->
        <div>
          <h2 class="text-xl font-semibold">THÔNG TIN CÁ NHÂN</h2>
          <div class="mt-4 space-y-4">
            <div>
              <span class="font-semibold">Email</span>
              <p>{{ infoAccount?.email }}<a href="#" class="text-blue-500">&nbsp;Change</a></p>
            </div>
            <div>
              <span class="font-semibold">Số điện thoại</span>
              <p>{{ infoAccount?.sdt }}<a href="#" class="text-blue-500">&nbsp;Change</a></p>
            </div>
            <div>
              <span class="font-semibold">Ngày sinh</span>
              <p>{{ formattedBirthday }}<a href="#" class="text-blue-500">&nbsp;Change</a></p>
            </div>
          </div>
        </div>
  
        <!-- Profile Info Section -->
        <div>
          <h2 class="text-xl font-semibold">THÔNG TIN KHÁC</h2>
          <div class="mt-4 space-y-4">
            <div>
              <span class="font-semibold">Họ và Tên</span>
              <p>{{ infoAccount?.fullname}} <a href="#" class="text-blue-500">&nbsp; Change</a></p>
            </div>
            <div>
              <span class="font-semibold">Quyền</span>
              <p>{{ formattedRoles }}</p>
            </div>
            <div>
              <span class="font-semibold">Thời gian tạo tài khoản</span>
              <p>{{ formattedCreateAt }}</p>
            </div>
            <div>
              <span class="font-semibold">Thông tin thêm</span>
              <p>{{ infoAccount?.extra_info || 'No extra information provided' }}<a href="#" class="text-blue-500"> &nbsp;Change</a></p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Edit Profile Button -->
      <!-- <div class="mt-6 text-center md:text-right">
        <button 
          @click="editProfile"
          class="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition duration-300">
          Chỉnh sửa thông tin
        </button>
      </div> -->
    </div>
  </template>
  
  <script>
  import { getinfo } from "@/api/auth/meApi";
  import dayjs from "dayjs";
  
  export default {
    name: "infoMeComponent",
    data() {
      return {
        infoAccount: {
          email: "Đang tải...",
          fullname: "Đang tải...",
          sdt: "Đang tải...",
          birthday: "Đang tải...",
          extra_info: "Đang tải...",
          roles: ["Đang tải..."],
          createAt: "Đang tải...",
          image: require("@/assets/image/3red.svg") // Placeholder for default image
        },
      };
    },
    computed: {
      // Format birthday
      formattedBirthday() {
        return this.infoAccount?.birthday
          ? dayjs(this.infoAccount.birthday).format("DD/MM/YYYY")
          : "No birthday provided";
      },
      // Format roles
      formattedRoles() {
        return this.infoAccount?.roles?.length
          ? this.infoAccount.roles.join(", ")
          : "No roles assigned";
      },
      // Format account creation date
      formattedCreateAt() {
        return this.infoAccount?.createAt
          ? dayjs(this.infoAccount.createAt).format("DD/MM/YYYY HH:mm")
          : "No creation date available";
      },
    },
    mounted() {
      this.info();
    },
    methods: {
      async info() {
        try {
          const response = await getinfo();
          this.infoAccount = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      editProfile() {
        // Logic for handling profile edit
        console.log('Edit profile button clicked');
      }
    },
  };
  </script>
  
  <style scoped>
  /* No custom styles needed for responsiveness, handled with Tailwind */
  </style>
  