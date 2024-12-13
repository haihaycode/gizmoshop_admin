<template>
  <div class="text-gray-800 font-inter">
    <router-view name="sideBar"></router-view>

    <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main relative">
      <!-- Navbar -->
      <router-view name="header"></router-view>
      <!-- End Navbar -->

      <!-- Content -->
      <section class="main">
        <!-- Use Vuex's isLoading state -->
        <LoadingComponent v-if="$route.name !== 'SalesRevenueStatistics' && isLoading" :loading="isLoading">
        </LoadingComponent>
        <router-view></router-view>
      </section>
      <!-- End Content -->
    </main>
  </div>
</template>

<script>
import LoadingComponent from '@/components/loading/LoadingComponent.vue';
import { mapGetters } from 'vuex';
import { testApi } from '@/api/auth/testApi';

export default {
  name: "AdminLayout",
  components: {
    LoadingComponent,
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
  },
  watch: {
    $route() {
      this.callTestApi();
    },
  },
  mounted() {
    this.callTestApi();
  },
  methods: {
    async callTestApi() {
      try {
        await testApi();
      } catch (error) {
        console.error(error)
      }

    }
  }
};
</script>
