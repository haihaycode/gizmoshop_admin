<template>
    <div class="mx-2">
        <div>
            <SearchByKeywordComponent
                @search="(keyword) => { filter.keyword = keyword; handleFetchAllSupplierActive(); }" />
        </div>
        <table class="table-auto w-full border ">
            <thead>
                <tr class="bg-blue-500 text-white">
                    <th class="border border-gray-200 px-4 py-2 text-left  cursor-pointer" @click="sortBy('s.id')">
                        <i v-if="filter.sort.sortField === 's.id'"
                            :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                        MÃ
                    </th>

                    <th class="border border-gray-200 px-4 py-2 text-left  cursor-pointer"
                        @click="sortBy('s.business_name')">
                        <i v-if="filter.sort.sortField === 's.business_name'"
                            :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                        HỌ & TÊN
                    </th>
                    <th class="border border-gray-200 px-4 py-2 text-left  cursor-pointer" @click="sortBy('s.taxCode')">
                        <i v-if="filter.sort.sortField === 's.taxCode'"
                            :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                        MST *
                    </th>
                    <th class="border border-gray-200 px-4 py-2 text-left " @click="sortBy('s.balance')">
                        <i v-if="filter.sort.sortField === 's.balance'"
                            :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>
                        VÍ
                        / VÍ KHÓA
                    </th>
                    <th class="border border-gray-200 px-4 py-2 text-left  cursor-pointer"
                        @click="sortBy('s.description')">
                        <i v-if="filter.sort.sortField === 's.description'"
                            :class="filter.sort.sortDirection === 'asc' ? 'bx bx-sort-up' : 'bx bx-sort-down'"></i>MÔ TẢ
                    </th>
                    <th class="border border-gray-200 px-4 py-2 text-left cursor-pointer">TK_KHÁCH_(*)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr :class="index % 2 === 0 ? 'bg-slate-200' : ''" class="hover:bg-blue-100" v-for="s in suppliers"
                    @click="accountSelected = s.accountResponse.id" :key="s.id">
                    <td class="border border-gray-200 px-4 py-2">@NCC_{{ s.id }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ s.nameSupplier }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ s.tax_code }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ formatCurrencyVN(s.balance) }} / {{
                        formatCurrencyVN(s.frozen_balance) }}</td>
                    <td class="border border-gray-200 px-4 py-2">{{ s.description }}</td>
                    <td class=" px-4 py-2 text-blue-500">@MKH_{{ s.accountResponse.id }} _ {{ s.accountResponse.email
                        }} _ {{ s.accountResponse.fullname }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination :total-items="pagination?.totalElements" :items-per-page="filter.size"
            :current-page="filter.page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
        </Pagination>
    </div>

    <ModalStatisComponent :idAccount="accountSelected" :isOpen="accountSelected" @closeModal="accountSelected = null">
    </ModalStatisComponent>
</template>

<script>
import { getAllSupplierActive } from '@/api/statisticApi';
import { formatCurrencyVN } from '@/utils/currencyUtils';
import Pagination from '@/components/pagination/Pagination.vue';
import SearchByKeywordComponent from '@/components/filter/searchByKeywordComponent.vue';
import ModalStatisComponent from './supplier/ModalStatisComponent.vue';
export default {
    components: {
        Pagination,
        SearchByKeywordComponent,
        ModalStatisComponent,
    },
    data() {
        return {
            filter: {
                sort: {
                    sortField: 's.id',
                    sortDirection: 'desc'
                },
                keyword: '',
                page: 0,
                size: 5
            },
            accountSelected: null,
            suppliers: null,
            pagination: null,
        }
    },
    mounted() {
        this.handleFetchAllSupplierActive()
    },
    methods: {
        formatCurrencyVN,
        sortBy(sortField) {
            if (this.filter.sort.sortField === sortField) {
                this.filter.sort.sortDirection = this.filter.sort.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.filter.sort.sortField = sortField;
                this.filter.sort.sortDirection = 'asc';
            }
            this.handleFetchAllSupplierActive()
        },
        async handleFetchAllSupplierActive() {
            try {
                const res = await getAllSupplierActive(this.filter.keyword, this.filter.page, this.filter.size, `${this.filter.sort.sortField},${this.filter.sort.sortDirection}`)
                this.suppliers = res.data.content
                this.pagination = res.data
            } catch (error) {
                console.error(error)
            }
        },
        handlePageChange(newPage) {
            this.filter.page = newPage - 1;
            this.handleFetchAllSupplierActive();
        },
        handleLimitChange(limitPanigation) {
            this.filter.size = limitPanigation;
            this.filter.page = 0;
            this.handleFetchAllSupplierActive();
        },
    }
}
</script>

<style></style>