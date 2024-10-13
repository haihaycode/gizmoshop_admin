<template>
  <div
    class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2"
  >
    <infoMeComponent></infoMeComponent>
  </div>
</template>

<script>
import infoMeComponent from "@/components/yourAccount/infoMeComponent.vue";
export default {
  name: "infoAcountComponet",
  components: {
    infoMeComponent,
  },
};
</script>

<style>
</style>