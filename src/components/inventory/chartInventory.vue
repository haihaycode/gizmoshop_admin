<template>
    <div class="flex flex-col items-center bg-white shadow-sm rounded-lg p-6 mt-1">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê số lượng sản phẩm từng danh mục</h2>

        <div v-if="loading" class="flex justify-center items-center h-60 w-full">
            <span class="loader"></span>
        </div>

        <div class="overflow-x-auto w-full mb-6" :class="loading ? 'hidden' : 'block'">
            <canvas ref="barChart" class="w-full h-60"></canvas>
        </div>

        <div class="flex items-center justify-between w-full mb-4" :class="loading ? 'hidden' : 'block'">
            <div class="flex items-center space-x-4">
                <Button :text="''" :icon="`<i class='bx bxs-chevron-right bx-rotate-180'></i>`" @click="prevPage"
                    :disabled="currentPage === 0" class="px-4 py-2">
                    Trang trước
                </Button>

                <Button :text="''" :icon="`<i class='bx bxs-chevron-right'></i>`" @click="nextPage"
                    :disabled="currentPage >= totalPages - 1" class="px-4 py-2">
                    Trang sau
                </Button>
            </div>

            <span class="text-md font-semibold text-gray-600">
                Trang {{ currentPage + 1 }} / {{ totalPages }}
            </span>
        </div>

        <!-- Modal hiển thị chi tiết sản phẩm trong kho -->
        <ModalBox :isOpen="ModalisOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
            <template #header>Chi tiết kho: {{ modalData?.name }}</template>
            <template #body>
                <!-- <ul>
                    <li v-for="(item, index) in modalData?.productInventory" :key="index">
                        <strong>{{ item.product.productName }}</strong>: {{ item.quantity }} sản phẩm
                    </li>
                </ul> -->
                <TableComponent>
                    <template #header>
                        <th class=" px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">ID
                            sản phẩm
                        </th>
                        <th class=" px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">TÊN
                            SẢN PHẨM
                        </th>
                        <th class=" px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">SỐ
                            LƯỢNG
                        </th>
                    </template>
                    <template #body>
                        <tr v-for="(item, index) in modalData?.productInventory" :key="index" class="hover:bg-gray-300">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.product.productName }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.quantity }}</td>
                        </tr>
                    </template>
                </TableComponent>
            </template>
            <template #footer></template>
        </ModalBox>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import { fetchChartInventory } from '@/api/inventoryApi';
import Button from '../buttons/button.vue';
import ModalBox from '../modal/ModalBox.vue';
import { mapGetters } from 'vuex';
import TableComponent from '../table/TableComponent.vue';

Chart.register(...registerables);

export default {
    name: 'ChartCategories',
    components: { Button, ModalBox, TableComponent },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    setup() {
        const barChart = ref(null);
        const data = ref([]);
        const currentPage = ref(0);
        const itemsPerPage = ref(3);
        const loading = ref(true);
        const ModalisOpen = ref(false);
        const modalData = ref(null);
        let myChart = null;

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                itemsPerPage.value = 9;
            } else if (window.innerWidth >= 768) {
                itemsPerPage.value = 6;
            } else {
                itemsPerPage.value = 3;
            }
        };

        onMounted(() => {
            handleResize();
            window.addEventListener('resize', handleResize);
            loadChartData();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });

        const paginatedData = computed(() => {
            const start = currentPage.value * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return data.value.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(data.value.length / itemsPerPage.value);
        });

        const loadChartData = async () => {
            try {
                const res = await fetchChartInventory();
                data.value = res.data;
                createChart();
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                loading.value = false;
            }
        };

        const createChart = () => {
            const ctx = barChart.value.getContext('2d');
            const maxYValue = Math.max(...paginatedData.value.map(item => item.productInventory.length)) + 5;
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: paginatedData.value.map(item => item.name),
                    datasets: [{
                        label: 'Tổng sản phẩm',
                        data: paginatedData.value.map(item => item.productInventory.length),
                        backgroundColor: 'rgba(255, 165, 0, 0.5)',
                        borderColor: 'rgba(255, 165, 0, 1)',
                        borderWidth: 0.5,
                    }],
                },
                options: {
                    responsive: true,
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            modalData.value = paginatedData.value[index];
                            ModalisOpen.value = true;
                        }
                    },
                    onHover: (event, elements) => {
                        event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: maxYValue,
                            title: {
                                display: true,
                                text: 'Số lượng kho',
                                font: { size: 14 },
                                color: '#333',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Kho',
                                font: { size: 14 },
                                color: '#333',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#555',
                                font: { size: 14 },
                            },
                        },
                        tooltip: {
                            callbacks: {
                                title: () => 'Thông tin chi tiết kho',
                                label: (tooltipItem) => {
                                    const inventory = paginatedData.value[tooltipItem.dataIndex];
                                    const total = inventory.productInventory.length;
                                    return [`Tổng số lượng sản phẩm trong kho: ${total}`];
                                }
                            }
                        }
                    },
                },
            });
        };

        const updateChart = () => {
            if (myChart) {
                myChart.data.labels = paginatedData.value.map(item => item.name);
                myChart.data.datasets[0].data = paginatedData.value.map(item => item.productInventory.length);
                myChart.update();
            }
        };

        watch([data, currentPage], updateChart);

        const closeModal = () => {
            ModalisOpen.value = false;
        };

        return {
            barChart,
            currentPage,
            totalPages,
            loading,
            ModalisOpen,
            modalData,
            closeModal,
            nextPage() {
                if (currentPage.value < totalPages.value - 1) currentPage.value++;
            },
            prevPage() {
                if (currentPage.value > 0) currentPage.value--;
            },
        };
    },
};
</script>

<style scoped>
canvas {
    height: 200px;
}

.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4a90e2;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
