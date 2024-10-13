<template>
    <div>
        <TableComponent>
            <!-- Header Slot -->
            <template #header>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Stt</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Tên kho</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Thành phố</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Huyện</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Xã</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Kinh độ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Vĩ độ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Trạng thái</th>
            </template>
            <!-- Body Slot -->
            <template #body>
                <tr v-for="(item, index) in inventoryList" :key="index" class="hover:bg-gray-300"
                    @click="updateInventoryModal(item.id)">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.inventoryName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.city }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.district }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.commune }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.longitude }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.latitude }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.active }}</td>
                </tr>
            </template>

            <!-- Footer Slot (Optional) -->
            <!-- <template #footer>
                <td colspan="5" class="px-6 py-3 text-sm text-gray-700">Total: {{ inventoryList.length }} entries</td>
            </template> -->
        </TableComponent>


        <updateInventory v-if="idInventorySelected" :id="idInventorySelected" :isOpen="ModalUpdateInventoryIsOpen"
            @close="updateInventoryModal" @update-success="getListInventory">
        </updateInventory>

    </div>
</template>

<script>
import { listInventory } from '@/api/inventoryApi';
import TableComponent from '../table/TableComponent.vue';
import updateInventory from './updateInventory.vue';
export default {
    name: 'TableInventoryComponent',
    components: {
        TableComponent,
        updateInventory
    },
    data() {
        return {
            ModalUpdateInventoryIsOpen: false,
            idInventorySelected: null,
            inventoryList: [],
        };
    },
    async created() {
        this.getListInventory();
    },
    methods: {

        async getListInventory() {
            try {
              const response = await listInventory(undefined, undefined, undefined, 5, 'id,desc');
                this.inventoryList = response.data.content;
                console.log(this.inventoryList)
            } catch (error) {
                console.error('Error loading inventory list:', error);
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
