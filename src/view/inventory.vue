<template>
    <div class=" bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <!-- StatisticsCardsInventory -->
        <StatisticsCardsInventory></StatisticsCardsInventory>

        <!-- add new -->
        <div class="flex justify-end mb-2">
            <button @click="triggerModalAddNewInventory"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-1 py-2 rounded-sm  md:text-xs  transition-all duration-200 ease-in-out">
                <i class='bx bx-add-to-queue'></i> Thêm kho
            </button>
        </div>

        <AddNewInventory :isOpen="AddNewInventoryIsModalOpen" @close="triggerModalAddNewInventory"
            @create-success="loadInventory"></AddNewInventory>


        <!-- list -->
        <TableInventory ref="tableInventory"></TableInventory>
        <!-- import and export excel -->
        <ImportAndExportForInventoryComponent />
        <chartInventory></chartInventory>
    </div>
</template>

<script>
import StatisticsCardsInventory from '@/components/inventory/StatisticsCardsInventory.vue';
import TableInventory from '@/components/inventory/TableInventory.vue';
import AddNewInventory from '@/components/inventory/AddNewInventory.vue';
import chartInventory from '@/components/inventory/chartInventory.vue';
import ImportAndExportForInventoryComponent from '@/components/inventory/ImportAndExportForInventoryComponent.vue';
export default {
    name: 'InventoryView',
    components: {
        AddNewInventory,
        TableInventory,
        StatisticsCardsInventory,
        chartInventory,
        ImportAndExportForInventoryComponent
    },
    data() {
        return {
            AddNewInventoryIsModalOpen: false
        }
    },
    methods: {
        triggerModalAddNewInventory() {
            this.AddNewInventoryIsModalOpen = !this.AddNewInventoryIsModalOpen;
        },
        async loadInventory() {
            await this.$refs.tableInventory.loadInventory();
        }
    }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
