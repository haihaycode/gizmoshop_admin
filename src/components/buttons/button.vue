<template>
  <button :class="buttonClasses" :disabled="isDisabled">
    <span v-if="isLoading" class="loader mr-2"></span>
    <span class="lg:text-sm">{{ isLoading ? 'Đang tải ' : text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'bg-blue-500', // Màu nút thường
    },
    disabledColor: {
      type: String,
      default: 'bg-gray-500', // Màu nút khi bị disabled
    },
    text: {
      type: String,
      required: true, // Văn bản của nút là bắt buộc
    },
  },
  computed: {
    isDisabled() {
      return this.isLoading; // Nút sẽ bị disabled khi loading
    },
    buttonClasses() {
      return `${this.isDisabled ? this.disabledColor : this.color} 
              text-white font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline 
              flex items-center justify-center`;
    },
  },
  methods: {
  },
}
</script>

<style scoped>
.loader {
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid white;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
