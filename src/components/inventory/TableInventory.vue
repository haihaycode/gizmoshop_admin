<template>
    <div>
        <TableComponent>
            <!-- Header Slot -->
            <template #header>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Age</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Country</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Phone</th>
            </template>

            <!-- Body Slot -->
            <template #body>
                <tr class="">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">USA</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">123-456-7890</td>
                </tr>
                <tr class="">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Canada</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">987-654-3210</td>
                </tr>
            </template>

            <!-- Footer Slot (Optional) -->
            <template #footer>
                <td colspan="5" class="px-6 py-3 text-sm text-gray-700">Total: 2 entries</td>
            </template>
        </TableComponent>
    </div>
</template>

<script>
import TableComponent from '../table/TableComponent.vue';
export default {
    name: 'TableInventoryComponent',
    components: {
        TableComponent,
    },
}
</script>

<style></style>