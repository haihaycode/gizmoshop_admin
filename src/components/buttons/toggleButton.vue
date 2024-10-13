<template>
    <div class="flex items-center">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only" v-model="localToggled" @change="emitToggle" />
        <div class="w-12 h-6 bg-gray-300 rounded-full transition-colors duration-300" 
             :class="{'bg-blue-400': localToggled}"></div>
        <span class="absolute left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300" 
              :class="{'translate-x-full': localToggled}"></span>
      </label>
      <span class="ml-2 font-medium" :class="{'text-blue-400': localToggled, 'text-red-500': !localToggled}">
        {{ localToggled ? 'Đang hoạt động' : 'Không hoạt động' }}
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isToggled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // Sử dụng một biến local để quản lý trạng thái toggle
        localToggled: this.isToggled
      };
    },
    watch: {
      // Cập nhật localToggled khi isToggled thay đổi từ parent
      isToggled(newValue) {
        this.localToggled = newValue;
      }
    },
    methods: {
      emitToggle() {
        // Phát ra sự kiện để thông báo cho parent biết trạng thái đã thay đổi
        this.$emit('update:isToggled', this.localToggled);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Add any additional styles here */
  </style>
  