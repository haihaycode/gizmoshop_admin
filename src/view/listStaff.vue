<template>
     <div class=" bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <listStaffComponent></listStaffComponent>
    </div>
</template>

<script>
import listStaffComponent from "@/components/staff/listStaffComponent.vue";
export default {
    name: "listStaff",
    components: {
        listStaffComponent,
    },
};
</script>

<style></style>