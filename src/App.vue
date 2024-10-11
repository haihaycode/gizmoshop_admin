<template>
  <div id="app">
    <LoadingSpinner :isLoading="loading" />
    <router-view />
  </div>
</template>

<script>
import LoadingSpinner from '@/components/loading/LoadingSpinner.vue';

export default {
  data() {
    return {
      loading: false
    }
  },
  components: {
    LoadingSpinner
  },
  methods: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500); // Đảm bảo hiệu ứng mờ dần có thời gian
    }
  },
  watch: {
    $route() {
      this.stopLoading();
    }
  }
}
</script>
