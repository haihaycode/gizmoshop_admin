<template>
    <div>
        <TableComponent>
            <!-- Header Slot -->
            <template #header>
                <th  @click="changeSort('id')"  class=" px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Stt <span v-html="getSortIcon('id')"></span></th>
                <th @click="changeSort('inventoryName')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Tên kho <span v-html="getSortIcon('inventoryName')"></span>
                </th>
                <th @click="changeSort('city')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Thành phố <span v-html="getSortIcon('city')"></span>
                </th>
                <th @click="changeSort('district')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Huyện <span v-html="getSortIcon('district')"></span>
                </th>
                <th @click="changeSort('ward')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Xã <span v-html="getSortIcon('ward')"></span>
                </th>
                <th @click="changeSort('longitude')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Kinh độ <span v-html="getSortIcon('longitude')"></span>
                </th>
                <th @click="changeSort('latitude')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Vĩ độ <span v-html="getSortIcon('latitude')"></span>
                </th>
                <th @click="changeSort('active')" class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">  
                    Trạng thái <span v-html="getSortIcon('active')"></span>
                </th>
            </template>
            <!-- Body Slot -->
            <template #body>
                <tr v-for="(item, index) in inventoryList" :key="index" class="hover:bg-gray-300" @click="updateInventoryModal(item.id)">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{item.id}}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.inventoryName }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.city }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.district }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.commune }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.longitude }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.latitude }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><toggleButton :is-toggled="item.active" @update:isToggled="updateStatusInventory(item.id)"></toggleButton></td>
                </tr>
            </template>

            <template #footer>
                <td colspan="8"></td>
            </template>

            <template #pagination>
                  <div>
                    <Pagination :total-items="pagination.totalElements"
                    :items-per-page="limit"
                    :current-page="page+1"
                     @page-changed="handlePageChange"
                     @limit-changed="handleLimitChange"></Pagination>
                  </div>
            </template>

        </TableComponent>
        <!-- update -->
        <updateInventory v-if="idInventorySelected" :id="idInventorySelected" :isOpen="ModalUpdateInventoryIsOpen" 
            @close="updateInventoryModal" @update-success="loadInventory">
        </updateInventory>


    </div>
</template>

<script>
import { changeActiveById, listInventory } from '@/api/inventoryApi';
import TableComponent from '../table/TableComponent.vue';
import updateInventory from './updateInventory.vue';
import Pagination from '../pagination/Pagination.vue';
import toggleButton from '../buttons/toggleButton.vue'; 
export default {
    name: 'TableInventoryComponent',
    components: {
        TableComponent,
        updateInventory,
        Pagination,
        toggleButton,
    },
    data() {
        return {
            ModalUpdateInventoryIsOpen: false,
            idInventorySelected: null,
            pagination : [],
            inventoryList: [],
            sortField: 'id',
            sortDirection: 'desc',  
            limit: 5, 
            page: 0    
        };
    },
    mounted() {
        this.loadInventory();
    },
    methods: {
        async loadInventory() {
            try {
                const response = await listInventory(undefined, undefined, this.page, this.limit, `${this.sortField},${this.sortDirection}`);
                this.pagination = response.data;
                this.inventoryList = response.data.content;
            } catch (error) {
                console.error('Error loading inventory list:', error);
            }
        },
        async changeSort(column) {
            if (this.sortField === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortField = column;
                this.sortDirection = 'asc';
            }
            await this.loadInventory();
        },
        
        getSortIcon(column) {
            if (this.sortField === column) {
                return this.sortDirection === 'asc' 
                    ? "<i class='bx bx-sort-a-z'></i>" 
                    : "<i class='bx bx-sort-z-a'></i>";
            }
            return ''; 
        },

        handlePageChange(newPage){
            this.page = newPage - 1; 
            this.loadInventory();
        },
        handleLimitChange(limitPanigation){
            this.limit = limitPanigation;
            this.page = 0;
            this.loadInventory();
        },
       async updateStatusInventory(id){
       try {
       await changeActiveById(id);
       this.loadInventory();
       } catch (error) {
        console.log(error)
       }
       
        },



        updateInventoryModal(idInventory) {
            this.idInventorySelected = idInventory;
            this.ModalUpdateInventoryIsOpen = !this.ModalUpdateInventoryIsOpen;
        }
    }
};
</script>

<style></style>
