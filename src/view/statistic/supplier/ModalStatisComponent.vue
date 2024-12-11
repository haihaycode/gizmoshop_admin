<!-- ModalStatisComponent.vue -->
<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :closeText="'Đóng'" :footerIsActive="false"
            :loading="isLoading">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">
                    <i class='bx bx-user'></i> Thông tin nhà cung cấp @NCC_{{ idAccount }}
                </h3>
            </template>
            <template #body>
                <div class="">
                    <div>
                        <h3 class="sm:text-sm md:text-xl mb-2 flex items-center justify-between">
                            <div>
                                <i class='bx bx-package'></i> Sản phẩm đang giao dịch và đã cung cấp
                            </div>
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
            </template>


        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '@/components/modal/ModalBox.vue';
import { getAllProductBySupplier } from '@/api/statisticApi';
import { mapGetters } from 'vuex';
import TableComponent from '@/components/table/TableComponent.vue';
import { formatCurrencyVN } from '@/utils/currencyUtils';
import { loadImage } from '@/services/accountService';
import Pagination from '@/components/pagination/Pagination.vue';
import SearchByKeywordComponent from '@/components/filter/searchByKeywordComponent.vue';

export default {

    data() {
        return {
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
        }
    },
    components: {
        SearchByKeywordComponent,
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
            }
        },
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
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
            this.filter.page = 0
            this.products = null
            this.$emit('closeModal')
        },
        async handleFetchAllProductByAccountID() {
            const res = await getAllProductBySupplier(this.idAccount, this.filter.keyword, this.filter.page, this.filter.limit, `${this.filter.sort.sortField},${this.filter.sort.sortDirection}`, this.filter.startDate, this.filter.endDate);
            this.products = res.data?.content
            this.pagination = res.data
            console.log(this.products)
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