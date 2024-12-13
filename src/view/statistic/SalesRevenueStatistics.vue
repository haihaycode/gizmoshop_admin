<template>
    <div class="p-6 bg-gray-100 space-y-6">

        <div class="p-2 border rounded-md mt-2">
            <div class="flex justify-between items-center space-x-4 mt-2">
                <h3 class="text-lg font-semibold text-gray-800"> - Doanh thu theo khoảng thời gian</h3>
                <div class="flex space-x-4">
                    <input type="date" v-model="startDateTT"
                        class="px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="date" v-model="endDateTT"
                        class="px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button
                        class="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        @click="handleSearchTT">
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div v-if="isLoadingRevenueTotalBetween">
                <i class="bx bx-loader bx-spin"></i> Đang tải dữ liệu ...
            </div>
            <div v-if="revenueTotalBetweenShop && revenueTotalBetweenSupplier && !isLoadingRevenueTotalBetween"
                class="">
                <h3 class="text-xl font-medium text-gray-800">Doanh thu từ {{ startDateTT }} - {{ endDateTT }}
                    &nbsp;
                </h3>
                <div>
                    <h3 class="text-xl font-medium text-blue-800">Doanh thu cửa hàng : &nbsp;{{
                        formatCurrencyVN(revenueTotalBetweenShop) }}
                    </h3>
                    <h3 class="text-xl font-medium text-blue-800">Doanh thu nhà cung cấp : &nbsp;{{
                        formatCurrencyVN(revenueTotalBetweenSupplier) }}
                    </h3>
                </div>
            </div>
        </div>
        <!-- Tổng quan doanh thu -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div @click="showDetail('week')"
                class="cursor-pointer bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div v-if="isLoadingWeeklyRevenue">
                    <i class="bx bx-loader bx-spin"></i> Đang phân tích ...
                </div>
                <div v-else>
                    <h3 class="text-xl font-semibold text-gray-700">Doanh thu tuần này (cửa hàng)</h3>
                    <p class="text-2xl font-bold text-blue-500 mt-2">{{ formatCurrency(weeklyRevenue.shop) }}</p>
                    <h4 class="text-md font-medium text-gray-600 mt-4">Nhà cung cấp:
                        <span class="text-green-500">{{ formatCurrency(weeklyRevenue.supplier) }}</span>
                    </h4>
                </div>
            </div>
            <div @click="showDetail('month')"
                class="cursor-pointer bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div v-if="isLoadingMonthlyRevenue">
                    <i class="bx bx-loader bx-spin"></i> Đang phân tích ...
                </div>
                <div v-else>
                    <h3 class="text-xl font-semibold text-gray-700">Doanh thu tháng này (cửa hàng)</h3>
                    <p class="text-2xl font-bold text-blue-500 mt-2">{{ formatCurrency(monthlyRevenue.shop) }}</p>
                    <h4 class="text-md font-medium text-gray-600 mt-4">Nhà cung cấp:
                        <span class="text-green-500">{{ formatCurrency(monthlyRevenue.supplier) }}</span>
                    </h4>
                </div>
            </div>
        </div>

        <!-- Biểu đồ doanh thu 6 tháng gần đây -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-700 text-center mb-4">Doanh thu 6 tháng gần đây</h3>
            <div v-if="isLoadingMonthlyRevenue6">
                <i class="bx bx-loader bx-spin"></i> Đang phân tích ...
            </div>
            <div v-else>
                <canvas id="revenueChart"></canvas>
            </div>
        </div>

        <!-- Biểu đồ doanh thu 3 năm gần đây -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-700 text-center mb-4">Doanh thu 3 năm gần đây</h3>
            <div v-if="isLoadingYearRevenue3">
                <i class="bx bx-loader bx-spin"></i> Đang phân tích ...
            </div>
            <div v-else>
                <canvas id="yearlyRevenueChart"></canvas>
            </div>
        </div>

        <!-- Modal Chi tiết -->


    </div>
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-700">
                    {{ modalTitle }}
                </h3>
                <button @click="closeModal" class="text-red-500 font-bold">X</button>
            </div>
            <canvas id="detailChart"></canvas>
            <div class="flex justify-between mt-4">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                    class="px-4 py-2 bg-gray-200 rounded">
                    Trang trước
                </button>
                <span class="text-gray-600">Trang {{ currentPage }} / {{ totalPages }}</span>
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-200 rounded">
                    Trang sau
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { getSalesRevenueStatistics } from "@/api/statisticApi";
import notificationService from "@/services/notificationService";
import { formatCurrencyVN } from "@/utils/currencyUtils";

export default {
    name: "SalesRevenueStatistics",
    data() {
        return {
            startDateTT: null,
            endDateTT: null,
            revenueTotalBetweenShop: null,
            revenueTotalBetweenSupplier: null,
            isLoadingRevenueTotalBetween: false
        }
    },
    methods: {
        formatCurrencyVN,
        async handleSearchTT() {
            if (!this.startDateTT || !this.endDateTT) {
                notificationService.warning("vui lòng chọn khoảng thời gian ")
                return
            }
            this.isLoadingRevenueTotalBetween = true
            try {
                const res = await getSalesRevenueStatistics(this.startDateTT, this.endDateTT);
                this.revenueTotalBetweenShop = res.data?.amountShop ? res.data?.amountShop : 0
                this.revenueTotalBetweenSupplier = res.data?.amountSupplier ? res.data?.amountSupplier : 0
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoadingRevenueTotalBetween = false
            }
        }
    },
    setup() {
        const weeklyRevenue = ref({ shop: 0, supplier: 0 });
        const monthlyRevenue = ref({ shop: 0, supplier: 0 });
        const sixMonthRevenue = ref([]);
        const sixMonthLabels = ref([]);
        const yearlyLabels = ref([]);
        const yearlyRevenue = ref([]);

        const isModalOpen = ref(false);

        const isLoadingWeeklyRevenue = ref(false);
        const isLoadingMonthlyRevenue = ref(false);
        const isLoadingMonthlyRevenue6 = ref(false);
        const isLoadingYearRevenue3 = ref(false);

        const modalTitle = ref("");
        const detailData = ref([]);
        const detailLabels = ref([]);
        const currentPage = ref(1);
        const totalPages = ref(1);

        const fetchDetailData = async (type, page = 1, limit = 10) => {
            try {
                const data = [];
                const labels = [];

                isLoadingMonthlyRevenue.value = true
                if (type === "month") {
                    modalTitle.value = "Chi tiết doanh thu tháng này";

                    const now = new Date();
                    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

                    // Tính tổng số trang
                    totalPages.value = Math.ceil(daysInMonth / limit);

                    // Tính phạm vi ngày cho trang hiện tại
                    const startIndex = (page - 1) * limit + 1; // Bắt đầu từ ngày 1
                    const endIndex = Math.min(startIndex + limit - 1, daysInMonth);

                    // Duyệt qua từng ngày trong khoảng hiện tại
                    for (let i = startIndex; i <= endIndex; i++) {
                        const startDate = new Date(startOfMonth);
                        const endDate = new Date(startOfMonth);
                        startDate.setDate(i);
                        endDate.setDate(i);

                        // Gọi API theo khoảng từ startDate tới endDate
                        const revenue = await getSalesRevenueStatistics(
                            startDate.toISOString().split("T")[0],
                            endDate.toISOString().split("T")[0]
                        );

                        // Lưu dữ liệu và nhãn
                        data.push(revenue.data.amountShop);
                        labels.push(`${i}/${startDate.getMonth() + 1}`);
                    }
                    isLoadingMonthlyRevenue.value = false
                } else if (type === "week") {
                    isLoadingWeeklyRevenue.value = true
                    modalTitle.value = "Chi tiết doanh thu tuần này";

                    const now = new Date();
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Lấy ngày bắt đầu tuần (Thứ 2)
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6); // Lấy ngày cuối tuần (Chủ nhật)

                    const daysInWeek = 7; // Một tuần có 7 ngày
                    totalPages.value = Math.ceil(daysInWeek / limit);

                    // Tính phạm vi ngày cho trang hiện tại
                    const startIndex = (page - 1) * limit;
                    const endIndex = Math.min(startIndex + limit, daysInWeek);

                    for (let i = startIndex; i < endIndex; i++) {
                        const startDate = new Date(startOfWeek);
                        startDate.setDate(startOfWeek.getDate() + i);
                        const endDate = new Date(startDate);

                        // Gọi API theo khoảng từ startDate tới endDate
                        const revenue = await getSalesRevenueStatistics(
                            startDate.toISOString().split("T")[0],
                            endDate.toISOString().split("T")[0]
                        );

                        // Lưu dữ liệu và nhãn
                        data.push(revenue.data.amountShop);
                        labels.push(`${startDate.getDate()}/${startDate.getMonth() + 1}`);
                    }
                }
                isLoadingWeeklyRevenue.value = false
                // Cập nhật dữ liệu chi tiết
                detailData.value = data;
                detailLabels.value = labels;
            } catch (error) {
                console.error("Error fetching detail data:", error);
            }
        };


        const goToPage = async (page) => {
            if (page < 1 || page > totalPages.value) return;
            currentPage.value = page;
            detailData.value = [];
            detailLabels.value = [];
            await fetchDetailData("month", page);
            renderDetailChart();
        };


        let detailChartInstance = null; // Lưu trữ instance của Chart

        const renderDetailChart = () => {
            const canvas = document.getElementById("detailChart");
            if (!canvas) {
                console.error("Canvas not found");
                return;
            }

            const ctx = canvas.getContext("2d");

            // Hủy biểu đồ nếu đã tồn tại
            if (detailChartInstance) {
                detailChartInstance.destroy();
            }

            // Tạo biểu đồ mới
            detailChartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: detailLabels.value,
                    datasets: [
                        {
                            label: "Doanh thu (VNĐ)",
                            data: detailData.value,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
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

        const showDetail = async (type) => {
            isModalOpen.value = true;
            await fetchDetailData(type);
            renderDetailChart();
        };

        const closeModal = () => {
            isModalOpen.value = false;
            detailData.value = [];
            detailLabels.value = [];
        };

        const fetchRevenue = async (startDate, endDate) => {
            try {
                const response = await getSalesRevenueStatistics(startDate, endDate);
                return {
                    shop: response.data.amountShop,
                    supplier: response.data.amountSupplier,
                };
            } catch (error) {
                console.error("Error fetching revenue data:", error);
                return { shop: 0, supplier: 0 };
            }
        };

        const fetchWeeklyRevenue = async () => {
            isLoadingWeeklyRevenue.value = true
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay() + 1);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            weeklyRevenue.value = await fetchRevenue(
                startOfWeek.toISOString().split("T")[0],
                endOfWeek.toISOString().split("T")[0]
            );
            isLoadingWeeklyRevenue.value = false
        };

        const fetchMonthlyRevenue = async () => {
            isLoadingMonthlyRevenue.value = true
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            monthlyRevenue.value = await fetchRevenue(
                startOfMonth.toISOString().split("T")[0],
                endOfMonth.toISOString().split("T")[0]
            );
            isLoadingMonthlyRevenue.value = false
        };

        const fetchSixMonthRevenue = async () => {
            isLoadingMonthlyRevenue6.value = true
            const now = new Date();
            const revenues = [];
            const labels = [];
            for (let i = 5; i >= 0; i--) {
                const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

                const revenue = await fetchRevenue(
                    startOfMonth.toISOString().split("T")[0],
                    endOfMonth.toISOString().split("T")[0]
                );

                revenues.push(revenue);
                labels.push(
                    `${startOfMonth.toLocaleString("vi-VN", { month: "long" })} ${startOfMonth.getFullYear()}`
                );
            }
            sixMonthRevenue.value = revenues;
            sixMonthLabels.value = labels;
            isLoadingMonthlyRevenue6.value = false
        };
        const fetchYearlyRevenue = async () => {
            isLoadingYearRevenue3.value = true
            const now = new Date();
            const revenues = [];
            const labels = [];
            for (let i = 2; i >= 0; i--) {
                const startOfYear = new Date(now.getFullYear() - i, 0, 1);
                const endOfYear = new Date(now.getFullYear() - i, 11, 31);

                const revenue = await fetchRevenue(
                    startOfYear.toISOString().split("T")[0],
                    endOfYear.toISOString().split("T")[0]
                );

                revenues.push(revenue);
                labels.push(startOfYear.getFullYear().toString());
            }
            yearlyRevenue.value = revenues;
            yearlyLabels.value = labels;
            isLoadingYearRevenue3.value = false

        };

        const renderChart = () => {
            const ctx = document.getElementById("revenueChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: sixMonthLabels.value,
                    datasets: [
                        {
                            label: "Shop (VNĐ)",
                            data: sixMonthRevenue.value.map((rev) => rev.shop),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Đối tác (VNĐ)",
                            data: sixMonthRevenue.value.map((rev) => rev.supplier),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
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
        const renderYearlyChart = () => {
            const ctx = document.getElementById("yearlyRevenueChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: yearlyLabels.value,
                    datasets: [
                        {
                            label: "Shop (VNĐ)",
                            data: yearlyRevenue.value.map((rev) => rev.shop),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                        },
                        {
                            label: "Nhà cung cấp (VNĐ)",
                            data: yearlyRevenue.value.map((rev) => rev.supplier),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                    scales: {
                        x: {
                            stacked: true, // Biểu đồ dạng stacked
                        },
                        y: {
                            stacked: true, // Biểu đồ dạng stacked
                            beginAtZero: true,
                        },
                    },
                },
            });
        };


        const formatCurrency = (value) => {
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
        };

        onMounted(async () => {
            await fetchWeeklyRevenue();
            await fetchMonthlyRevenue();
            await fetchSixMonthRevenue();
            await fetchYearlyRevenue();
            renderChart();
            renderYearlyChart();


        });

        return {
            weeklyRevenue, monthlyRevenue, formatCurrency,
            isModalOpen,
            modalTitle,
            showDetail,
            closeModal,
            goToPage,
            currentPage,
            totalPages,
            isLoadingMonthlyRevenue6,
            isLoadingYearRevenue3,
            isLoadingWeeklyRevenue,
            isLoadingMonthlyRevenue
        };
    },
};
</script>