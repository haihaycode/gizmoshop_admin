<template>
    <div class="p-6 bg-gray-100 space-y-6">
        <!-- Tổng quan nhà cung cấp -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 class="text-xl font-semibold text-gray-700">Tổng doanh thu</h3>
                <p class="text-3xl font-bold text-blue-600 mt-2">{{ formatCurrency(totalRevenue) }}</p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 class="text-xl font-semibold text-gray-700">Số lượng sản phẩm đã bán</h3>
                <p class="text-3xl font-bold text-green-500 mt-2">{{ totalSold }}</p>
            </div>
        </div>

        <!-- Top sản phẩm bán chạy -->
        <div class="bg-white shadow-lg rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Top sản phẩm bán chạy</h3>
            <div class="overflow-x-auto">
                <table class="table-auto w-full border border-gray-200">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-200 px-4 py-2 text-left text-gray-700">Mã sản phẩm</th>
                            <th class="border border-gray-200 px-4 py-2 text-left text-gray-700">Tên sản phẩm</th>
                            <th class="border border-gray-200 px-4 py-2 text-left text-gray-700">Tên nhà cung cấp</th>
                            <th class="border border-gray-200 px-4 py-2 text-left text-gray-700">Số lượng bán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in topSellingProducts" :key="product.id" class="hover:bg-gray-50">
                            <td class="border border-gray-200 px-4 py-2">{{ product.id }}</td>
                            <td class="border border-gray-200 px-4 py-2">{{ product.name }}</td>
                            <td class="border border-gray-200 px-4 py-2">{{ product.nameAuth }}</td>
                            <td class="border border-gray-200 px-4 py-2">{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <canvas id="topSellingChart" class="mt-6"></canvas>
        </div>

        <!-- Sản phẩm tồn kho -->

    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { getPartnerStatistics, getTopSellingBySupplier } from "@/api/statisticApi";

export default {
    name: "SupplierStatistics",
    setup() {
        const totalRevenue = ref(0); // Tổng doanh thu
        const totalSold = ref(0); // Số lượng sản phẩm đã bán
        const topSellingProducts = ref([]);
        const stockProducts = ref([]);

        // Fetch data from APIs
        const fetchStatistics = async () => {
            try {
                const { data } = await getPartnerStatistics("2024-01-01", "2024-12-31"); // Thay bằng ngày thực tế
                totalRevenue.value = data.amountSupplier;
                totalSold.value = data.quantity;
            } catch (error) {
                console.error("Error fetching partner statistics:", error);
            }
        };

        const fetchTopSellingProducts = async () => {
            try {
                const { data } = await getTopSellingBySupplier("2024-01-01", "2024-12-31", 0, 5); // Lấy 5 sản phẩm bán chạy nhất
                topSellingProducts.value = data.content.map((item) => ({
                    id: item.id,
                    name: item.name,
                    nameAuth: item.nameAuth,
                    quantitySold: item.quantity,
                }));
            } catch (error) {
                console.error("Error fetching top-selling products:", error);
            }
        };

        const renderTopSellingChart = () => {
            const ctx = document.getElementById("topSellingChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: topSellingProducts.value.map((p) => p.name),
                    datasets: [
                        {
                            label: "Số lượng bán",
                            data: topSellingProducts.value.map((p) => p.quantitySold),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        y: { beginAtZero: true },
                    },
                },
            });
        };



        const formatCurrency = (value) => {
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
        };

        onMounted(async () => {
            await fetchStatistics();
            await fetchTopSellingProducts();
            renderTopSellingChart();
        });

        return {
            totalRevenue,
            totalSold,
            topSellingProducts,
            stockProducts,
            formatCurrency,
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

tbody tr:nth-child(even) {
    background-color: #f1f5f9;
}

canvas {
    max-height: 300px;
}
</style>
