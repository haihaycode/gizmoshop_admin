<template>
  <div class="text-gray-800 font-inter">
    <router-view name="sideBar"></router-view>

    <main
      class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main"
    >
      <!-- navbar -->
      <router-view name="header"></router-view>
      <!-- end navbar -->
      <!-- Content -->
      <router-view></router-view>
      <!-- End Content -->
    </main>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
};
</script>