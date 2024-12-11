<!-- ModalStatisComponent.vue -->
<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :closeText="'Đóng'" :footerIsActive="false"
            :loading="loadingProduct">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">
                    <i class='bx bx-user'></i> Thông tin nhà cung cấp @NCC_{{ idAccount }}
                </h3>
            </template>
            <template #body>

                <div class="flex justify-between space-x-4">
                    <!-- Doanh thu tháng -->
                    <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-800">Doanh thu tháng này</h3>
                        <p class="text-xl font-bold text-gray-600">{{ formatCurrencyVN(revenueTotalMonth) }}</p>
                    </div>

                    <!-- Doanh thu tuần -->
                    <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-800">Doanh thu tuần này</h3>
                        <p class="text-xl font-bold text-gray-600">{{ formatCurrencyVN(revenueTotalWeek) }}</p>
                    </div>
                </div>

                <div class="">
                    <div>
                        <h3 class="sm:text-sm md:text-xl mb-2 flex items-center justify-between">
                            <div>
                                <i class='bx bx-package'></i> Sản phẩm đang giao dịch và đã cung cấp
                            </div>
                            <SearchByStartDateAndEndDate
                                @search="(startDate, endDate) => { filter.startDate = startDate; filter.endDate = endDate; handleFetchAllProductByAccountID() }" />
                            <SearchByKeywordComponent
                                @search="(keyword) => { filter.keyword = keyword; handleFetchAllProductByAccountID(); }" />

                        </h3>

                    </div>

                    <TableComponent>
                        <template #header>
                            <th @click="sortBy('id')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'id'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                Mã Sản phẩm
                            </th>
                            <th @click="sortBy('name')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'name'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                TÊN SẢN PHẨM
                            </th>
                            <th @click="sortBy('price')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'price'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                GIÁ GỐC / GIÁ SAU GIẢM
                            </th>

                            <th @click="sortBy('discountProduct')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'discountProduct'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                GIẢM GIÁ THEO %
                            </th>
                            <th @click="sortBy('thumbnail')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'thumbnail'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                ẢNH ĐẠI DIỆN
                            </th>
                            <th @click="sortBy('category.id')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'category.id'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                DANH MỤC
                            </th>
                            <th @click="sortBy('brand.id')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'brand.id'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                THƯƠNG HIỆU
                            </th>

                            <th @click="sortBy('productInventory.quantity')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'productInventory.quantity'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                SỐ LƯỢNG/KHO
                            </th>

                            <th @click="sortBy('status.name')"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                <i v-if="filter.sort.sortField === 'status.name'"
                                    :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                                TRẠNG THÁI
                            </th>
                        </template>
                        <template #body>
                            <tr :class="index % 2 === 0 ? 'bg-slate-200' : ''" class="hover:bg-blue-100"
                                v-for=" (product, index) in products" :key="product.id">
                                <td class="text-center">{{ index }}_@MSP{{ product.id }}</td>
                                <td class="text-center">{{ product.productName }}</td>
                                <td class="text-center">{{ formatCurrencyVN(product.productPrice) }} / {{
                                    formatCurrencyVN(product.productPrice - (product.productPrice *
                                        (product.discountProduct / 100))) }}</td>
                                <td class="text-center">{{ product.discountProduct }}%</td>
                                <td class="text-center">
                                    <img :src="loadImage('product', product.thumbnail)" @error="onImageError"
                                        alt="Ảnh đại diện" width="50" />
                                </td>
                                <td class="text-center">{{ product.productCategories.name }}</td>
                                <td class="text-center">{{ product.productBrand.name }}</td>
                                <td class="text-center"> còn {{ product.productInventoryResponse.quantity }} (kho) {{
                                    product.productInventoryResponse.inventory.inventoryName
                                    }}</td>

                                <td class="text-center">{{ product.productStatusResponse.name }}</td>

                            </tr>
                        </template>
                        <template #pagination>
                            <Pagination :total-items="pagination?.totalElements" :items-per-page="filter.limit"
                                :current-page="filter.page + 1" @page-changed="handlePageChange"
                                @limit-changed="handleLimitChange">
                            </Pagination>
                        </template>
                    </TableComponent>
                </div>
                <div>
                    <div class="flex-1 bg-white shadow-lg rounded-lg p-4  ">
                        <h4 class="text-lg font-semibold">Biểu đồ doanh thu</h4>
                        <div class="w-full h-full">
                            <PieChart :data="pieChartData" />
                        </div>
                    </div>
                </div>
            </template>


        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '@/components/modal/ModalBox.vue';
import { getAllProductBySupplier, revenueStatisticsSupplerByIdAccount } from '@/api/statisticApi';
import { mapGetters } from 'vuex';
import TableComponent from '@/components/table/TableComponent.vue';
import { formatCurrencyVN } from '@/utils/currencyUtils';
import { loadImage } from '@/services/accountService';
import Pagination from '@/components/pagination/Pagination.vue';
import SearchByKeywordComponent from '@/components/filter/searchByKeywordComponent.vue';
import SearchByStartDateAndEndDate from '@/components/filter/searchByStartDateAndEndDate.vue';
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {

    data() {
        return {
            loadingProduct: false,
            filter: {
                sort: {
                    sortField: 'id',
                    sortDirection: 'desc'
                },
                keyword: '',
                page: 0,
                limit: 5,
                startDate: null,
                endDate: null,
            },
            products: [],
            pagination: null,
            revenueTotalMonth: 0,
            revenueTotalWeek: 0,
            revenueTotalData6: []

        }
    },
    components: {
        PieChart: Pie,
        SearchByKeywordComponent,
        SearchByStartDateAndEndDate,
        TableComponent,
        ModalBox,
        Pagination
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        idAccount: {
            type: Number,
        }
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.handleFetchAllProductByAccountID();
                this.handleFetchRevenueTotal();
            }
        },
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
        pieChartData() {
            const labels = this.revenueTotalData6.map(item => item.monthYear);
            const data = this.revenueTotalData6.map(item => item.revenue);

            return {
                labels: labels,
                datasets: [
                    {
                        label: 'Doanh thu theo tháng',
                        data: data,
                        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFD700', '#32CD32'],
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                ],
            };
        },
    },
    methods: {
        onImageError(event) {
            event.target.src = 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg';
        },
        loadImage,
        formatCurrencyVN,
        sortBy(sortField) {
            if (this.filter.sort.sortField === sortField) {
                this.filter.sort.sortDirection = this.filter.sort.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.filter.sort.sortField = sortField;
                this.filter.sort.sortDirection = 'asc';
            }
            this.handleFetchAllProductByAccountID()
        },
        closeModal() {
            this.revenueTotalMonth = 0
            this.revenueTotalWeek = 0
            this.startDate = null
            this.endDate = null
            this.keyword = ''
            this.filter.page = 0
            this.products = null
            this.$emit('closeModal')
        },
        async handleFetchAllProductByAccountID() {
            this.loadingProduct = true;
            try {
                const res = await getAllProductBySupplier(this.idAccount, this.filter.keyword, this.filter.page, this.filter.limit, `${this.filter.sort.sortField},${this.filter.sort.sortDirection}`, this.filter.startDate, this.filter.endDate);
                this.products = res.data?.content
                this.pagination = res.data

            } catch (error) {
                console.error(error);

            } finally {
                this.loadingProduct = false
            }
        },
        async handleFetchRevenueTotal() {
            const currentDate = new Date();

            // Tính toán ngày bắt đầu và kết thúc của tháng này
            const startDateMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endDateMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const startDateMonthFormatted = startDateMonth.toISOString().split('T')[0];
            const endDateMonthFormatted = endDateMonth.toISOString().split('T')[0];

            // Tính toán ngày bắt đầu và kết thúc của tuần này
            const startDateWeek = new Date(currentDate);
            startDateWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday
            const endDateWeek = new Date(startDateWeek);
            endDateWeek.setDate(startDateWeek.getDate() + 6); // Saturday
            const startDateWeekFormatted = startDateWeek.toISOString().split('T')[0];
            const endDateWeekFormatted = endDateWeek.toISOString().split('T')[0];

            try {
                // Gọi API để lấy doanh thu tháng này
                const resMonth = await revenueStatisticsSupplerByIdAccount(this.idAccount, startDateMonthFormatted, endDateMonthFormatted);
                this.revenueTotalMonth = resMonth.data?.totalPriceOrder;

                // Gọi API để lấy doanh thu tuần này
                const resWeek = await revenueStatisticsSupplerByIdAccount(this.idAccount, startDateWeekFormatted, endDateWeekFormatted);
                this.revenueTotalWeek = resWeek.data?.totalPriceOrder;

                let lastSixMonths = [];
                for (let i = 0; i < 6; i++) {
                    let monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                    let monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);

                    const monthStartFormatted = monthStart.toISOString().split('T')[0];
                    const monthEndFormatted = monthEnd.toISOString().split('T')[0];

                    lastSixMonths.push({ start: monthStartFormatted, end: monthEndFormatted });
                }


                for (const period of lastSixMonths) {
                    const res = await revenueStatisticsSupplerByIdAccount(this.idAccount, period.start, period.end);
                    const monthYear = `${new Date(period.start).getMonth() + 1}/${new Date(period.start).getFullYear()}`;
                    this.revenueTotalData6.push({
                        monthYear: monthYear,
                        revenue: res.data?.totalPriceOrder || 0
                    });
                }


            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        },
        handlePageChange(newPage) {
            this.filter.page = newPage - 1;
            this.handleFetchAllProductByAccountID();
        },
        handleLimitChange(limitPanigation) {
            this.filter.limit = limitPanigation;
            this.filter.page = 0;
            this.handleFetchAllProductByAccountID();
        },
    }
}
</script>

<style></style>