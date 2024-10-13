<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <!-- Card 1: Total Warehouses -->
        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-home text-2xl text-yellow-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ animatedCount }} +
                </p>
                <p class="text-gray-500">Tổng số kho</p>
            </div>
        </div>

        <!-- Card 2: Active Warehouses -->
        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-check-circle text-2xl text-green-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ activeCount }} +
                </p>
                <p class="text-gray-500">Kho đang dùng</p>
            </div>
        </div>

        <!-- Card 3: Inactive Warehouses -->
        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-x-circle text-2xl text-red-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ inactiveCount }} +
                </p>
                <p class="text-gray-500">Kho không dùng</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getArrInventories } from '@/api/inventoryApi';

export default {
    name: 'StatisticsCards',
    data() {
        return {
            inventories: [],
            animatedCount: 0, // Initial value for total warehouses
            activeCount: 0,   // Initial value for active warehouses
            inactiveCount: 0  // Initial value for inactive warehouses
        };
    },
    mounted() {
        this.getArr();
    },
    methods: {
        async getArr() {
            try {
                const arr = await getArrInventories();
                this.inventories = arr.data;

                // Count total, active, and inactive warehouses
                const totalWarehouses = this.inventories.length;
                const activeWarehouses = this.inventories.filter(item => item.active).length;
                const inactiveWarehouses = totalWarehouses - activeWarehouses;

                // Animate all counts
                this.animateCount(totalWarehouses, 'animatedCount');
                this.animateCount(activeWarehouses, 'activeCount');
                this.animateCount(inactiveWarehouses, 'inactiveCount');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        animateCount(targetNumber, property) {
            let current = 0;
            const increment = targetNumber / 50;
            const interval = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    clearInterval(interval);
                    current = targetNumber;
                }
                this[property] = Math.floor(current); // Update the specific property (animatedCount, activeCount, inactiveCount)
            }, 10);
        }
    }
};
</script>

<style scoped></style>
