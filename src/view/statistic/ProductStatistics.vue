<template>
    <div class="p-6 bg-gray-100 space-y-2">
        <!-- Sản phẩm bán nhiều nhất -->
        <div class="bg-white shadow-sm rounded-sm p-6">

            <div class="flex items-start justify-between space-x-4 mb-4  ">
                <input type="month" id="monthFilter" class="text-blue-800 rounded-sm hover:outline-none"
                    v-model="selectedMonth" @change="fetchTopSellingProducts()" />
            </div>

            <h3 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">&nbsp; Sản phẩm bán
                nhiều nhất</h3>

            <div v-if="topSellingProducts.length > 0">
                <table class="table-auto border-collapse border border-gray-300 w-full">
                    <thead class="">
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2 text-left">Mã sản phẩm</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Số lượng bán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in topSellingProducts" :key="product.id" class="hover:bg-gray-50">
                            <td class="border border-gray-300 px-4 py-2">{{ product.id }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ product.name }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-between items-center mt-1">
                    <button @click="fetchTopSellingProducts(topSellingPage - 1)" :disabled="topSellingPage === 1"
                        class="px-4 py-2 bg-gray-200 rounded-sm">
                        Trang trước
                    </button>
                    <span>Trang {{ topSellingPage }} / {{ topSellingTotalPages }}</span>
                    <button @click="fetchTopSellingProducts(topSellingPage + 1)"
                        :disabled="topSellingPage === topSellingTotalPages" class="px-4 py-2 bg-gray-200 rounded-sm">
                        Trang sau
                    </button>
                </div>
                <canvas id="topSellingChart" class="w-full mt-6"></canvas>
            </div>
            <div v-else class="text-center mt-4">
                <p class="text-gray-700 font-semibold">Không có sản phẩm nào được bán trong tháng này.</p>
            </div>
        </div>

        <!-- Sản phẩm sắp hết hàng -->
        <div class="bg-white shadow-sm rounded-sm p-6">
            <h3 class="text-xl sm:text-2xl mt-1 ml-1 font-semibold mb-2 border-l-4 border-blue-500">&nbsp; Sản phẩm sắp
                hết hàng</h3>
            <div v-if="lowStockProducts.length > 0">
                <table class="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2 text-left">Mã sản phẩm</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Số lượng tồn kho</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in lowStockProducts" :key="product.id" class=""
                            :class="product.quantity == 0 ? 'bg-red-400 text-white' : ''">
                            <td class="border border-gray-300 px-4 py-2">{{ product.id }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ product.name }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-between items-center mt-1">
                    <button @click="fetchLowStockProducts(lowStockPage - 1)" :disabled="lowStockPage === 1"
                        class="px-4 py-2 bg-gray-200 rounded-sm">
                        Trang trước
                    </button>
                    <span>Trang {{ lowStockPage }} / {{ lowStockTotalPages }}</span>
                    <button @click="fetchLowStockProducts(lowStockPage + 1)"
                        :disabled="lowStockPage === lowStockTotalPages" class="px-4 py-2 bg-gray-200 rounded-sm">
                        Trang sau
                    </button>
                </div>
                <canvas id="lowStockChart" class="w-full mt-6"></canvas>
            </div>
            <div v-else>
                <p class="text-gray-700 font-semibold">Không có sản phẩm nào sắp hết hàng.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";
import { getTopSellingProducts, getLowStockProducts } from "@/api/statisticApi";
import notificationService from "@/services/notificationService";
// import notificationService from "@/services/notificationService";

export default {
    name: "ProductStatistics",
    setup() {
        const selectedMonth = ref(new Date().toISOString().slice(0, 7)); // Default to current month (YYYY-MM)
        let topSellingChartInstance = null; // Lưu biểu đồ sản phẩm bán chạy
        let lowStockChartInstance = null;  // Lưu biểu đồ sản phẩm sắp hết hàng

        // State for top-selling products
        const topSellingProducts = ref([]);
        const topSellingPage = ref(1); // Initialize as 1 for UI (1-based index)
        const topSellingTotalPages = ref(1); // Initialize total pages as 1

        // State for low-stock products
        const lowStockProducts = ref([]);
        const lowStockPage = ref(1); // Initialize as 1 for UI (1-based index)
        const lowStockTotalPages = ref(1); // Initialize total pages as 1

        const fetchTopSellingProducts = async (page = 1) => {
            const backendPage = page - 1; // API dùng chỉ số 0-based

            if (backendPage < 0 || backendPage >= topSellingTotalPages.value) return; // Không gọi nếu trang không hợp lệ

            const [year, month] = selectedMonth.value.split("-");
            const startDate = `${year}-${month}-01`;
            const endDate = new Date(year, month, 0).toISOString().split("T")[0];

            try {
                const response = await getTopSellingProducts(startDate, endDate, backendPage, 5);
                if (response.data.content.length > 0) {
                    topSellingProducts.value = response.data.content;
                    topSellingPage.value = response.data.number + 1;
                    topSellingTotalPages.value = response.data.totalPages;
                    await nextTick();
                    renderTopSellingChart();
                } else {
                    notificationService.warning("Không có sản phẩm nào được bán trong : " + selectedMonth.value)
                    topSellingProducts.value = [];
                    await nextTick();
                    renderTopSellingChart();

                }

            } catch (error) {
                console.error("Error fetching top-selling products:", error);
            }
        };


        const fetchLowStockProducts = async (page = 1) => {
            const backendPage = page - 1; // API dùng chỉ số 0-based

            if (backendPage < 0 || backendPage >= lowStockTotalPages.value) return; // Không gọi nếu trang không hợp lệ

            try {
                const response = await getLowStockProducts(3, backendPage, 8);
                lowStockProducts.value = response.data.content;
                lowStockPage.value = response.data.number + 1; // Đổi lại thành 1-based cho UI
                lowStockTotalPages.value = response.data.totalPages;

                await nextTick(); // Đảm bảo DOM cập nhật xong trước khi vẽ
                renderLowStockChart(); // Vẽ lại biểu đồ
            } catch (error) {
                console.error("Error fetching low-stock products:", error);
            }
        };


        const renderTopSellingChart = () => {
            const canvas = document.getElementById("topSellingChart");
            if (!canvas) return; // Đảm bảo canvas tồn tại

            const ctx = canvas.getContext("2d");

            // Hủy biểu đồ cũ nếu tồn tại
            if (topSellingChartInstance) {
                topSellingChartInstance.destroy();
            }

            // Tạo biểu đồ mới
            topSellingChartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: topSellingProducts.value.map((product) => product.name.slice(0, 20) + '...'),
                    datasets: [
                        {
                            label: "Số lượng bán",
                            data: topSellingProducts.value.map((product) => product.quantity),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        };


        const renderLowStockChart = () => {
            const canvas = document.getElementById("lowStockChart");
            if (!canvas) return; // Đảm bảo canvas tồn tại

            const ctx = canvas.getContext("2d");

            // Hủy biểu đồ cũ nếu tồn tại
            if (lowStockChartInstance) {
                lowStockChartInstance.destroy();
            }

            // Tạo biểu đồ mới
            lowStockChartInstance = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: lowStockProducts.value.map((product) => product.name),
                    datasets: [
                        {
                            data: lowStockProducts.value.map((product) => product.quantity),
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)",
                                "rgba(75, 192, 192, 0.6)",
                                "rgba(153, 102, 255, 0.6)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                        },
                    },
                },
            });
        };


        onMounted(() => {
            fetchTopSellingProducts(); // Initialize with the first page
            fetchLowStockProducts(); // Initialize with the first page
        });

        return {
            selectedMonth,
            topSellingProducts,
            topSellingPage,
            topSellingTotalPages,
            fetchTopSellingProducts,
            lowStockProducts,
            lowStockPage,
            lowStockTotalPages,
            fetchLowStockProducts,
        };
    },
};

</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th,
td {
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f9fafb;
}


canvas {
    max-height: 300px;
}
</style>
