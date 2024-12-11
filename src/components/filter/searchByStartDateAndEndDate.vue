<template>
    <div class="flex items-center space-x-4">
        <!-- Ngày bắt đầu -->
        <input v-model="startDate" @input="search" type="date" placeholder="Ngày bắt đầu"
            class="p-2 border border-gray-300 rounded-sm focus:outline-none" />
        <!-- Ngày kết thúc -->
        <input v-model="endDate" @input="search" type="date" placeholder="Ngày kết thúc"
            class="p-2 border border-gray-300 rounded-sm focus:outline-none" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
        };
    },
    methods: {
        search() {
            this.$emit("search", this.startDate, this.endDate); // Emit ngày bắt đầu và kết thúc
        },
    },
};
</script>

<style scoped>
/* Thêm các styles tùy chỉnh nếu cần */
</style>