<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <!-- Card 1: Items Sales -->
        <div class="p-4 bg-white rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-home text-2xl text-yellow-500"></i>
                <!-- <div class="bg-green-100 text-green-600 text-sm rounded-full px-2 py-1">
                    12% <i class="bx bx-up-arrow-alt"></i>
                </div> -->
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold">{{ inventories.length }}</p>
                <p class="text-gray-500">Tổng số kho</p>
            </div>
        </div>

        <!-- Card 2: New Orders -->
        <!-- <div class="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
            <div class="flex justify-between items-center">
                <i class="bx bx-store text-4xl text-red-500"></i>
                <div class="bg-red-100 text-red-600 text-sm rounded-full px-2 py-1">
                    6% <i class="bx bx-down-arrow-alt"></i>
                </div>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold">9489</p>
                <p class="text-gray-500">New Orders</p>
            </div>
        </div> -->

        <!-- Card 3: Total Products -->
        <!-- <div class="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
            <div class="flex justify-between items-center">
                <i class="bx bx-layer text-4xl text-yellow-500"></i>
                <div class="bg-green-100 text-green-600 text-sm rounded-full px-2 py-1">
                    72% <i class="bx bx-up-arrow-alt"></i>
                </div>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold">7459</p>
                <p class="text-gray-500">Total Products</p>
            </div>
        </div> -->

        <!-- Card 4: New Visitors -->
        <!-- <div class="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
            <div class="flex justify-between items-center">
                <i class="bx bx-user text-4xl text-teal-500"></i>
                <div class="bg-green-100 text-green-600 text-sm rounded-full px-2 py-1">
                    150% <i class="bx bx-up-arrow-alt"></i>
                </div>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold">5186</p>
                <p class="text-gray-500">New Visitors</p>
            </div>
        </div> -->
    </div>
</template>

<script>
import { getArrInventories } from '@/api/inventoryApi';
export default {
    name: 'StatisticsCards',
    data() {
        return {
            inventories: [],
        }
    },
    mounted() {
        this.getArr();
    },
    methods: {
        async getArr() {
            try {
                const arr = await getArrInventories();
                this.inventories = arr.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
};
</script>

<style scoped></style>