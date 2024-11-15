<template>
    <ModalBox :isOpen="isOpen" :closeModal="closeModal" :closeText="'Đóng'" :footerIsActive="true">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">
                <i class='bx bx-link-external'></i> Nhập liệu tự động từ Excel
            </h3>

            <p class="text-gray-500 text-sm mt-1">
                (*) Vui lòng đảm bảo rằng tệp Excel của bạn được định dạng đúng và chứa các tiêu đề cột cần thiết
                để quá trình nhập liệu diễn ra thuận lợi.
            </p>

        </template>
        <template #body>
            <TableComponent :items="excelData">
                <template #header>
                    <th v-for="(header, index) in headers" :key="index" class="border px-2 py-1 bg-gray-200">
                        {{ header }}
                    </th>
                </template>

                <template #body>
                    <tr v-for="(row, rowIndex) in excelData" :key="rowIndex"
                        :class="{ 'bg-gray-50': rowIndex % 2 === 0, 'bg-white': rowIndex % 2 !== 0 }">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex"
                            class="relative border px-2 py-1 focus:outline-none focus:bg-blue-500 focus:text-white"
                            contenteditable="true" @input="updateCell(rowIndex, cellIndex, $event.target.innerText)">

                            <span>{{ cell }}</span>

                            <!-- Nút X để xóa nội dung ô -->

                        </td>
                    </tr>
                    <tr>
                        <td :colspan="headers.length" class="border px-2 py-1">
                            <button @click="addRow" class="px-4 py-2  text-gray-500 rounded">
                                + Thêm hàng
                            </button>
                        </td>
                    </tr>

                </template>
            </TableComponent>
        </template>

        <template #footer>
            <Button v-if="excelData.length" @click="saveChanges" :text="'Lưu Thay Đổi'" :isLoading="isLoading"
                :icon="`<i class='bx bxs-save' ></i>`"
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            </Button>
            <Button v-if="excelData.length" @click="downloadEditedExcel" :text="'Tải File Đã Sửa'"
                :icon="`<i class='bx bxs-download'></i>`"
                class="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            </Button>
        </template>
    </ModalBox>
</template>

<script>
import * as XLSX from 'xlsx';
import TableComponent from '../table/TableComponent.vue';
import ModalBox from '../modal/ModalBox.vue';
import Button from '../buttons/button.vue';
import { mapGetters } from 'vuex';
import notificationService from '@/services/notificationService';
export default {
    name: 'ExcelViewerComponent',
    components: {
        TableComponent,
        ModalBox,
        Button
    },
    props: {
        excelFile: {
            type: File,
            required: true,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            excelData: [],
            headers: [],
        };
    },
    computed: {
        ...mapGetters("loading", ["isLoading"]),
    },
    watch: {
        excelFile: {
            immediate: true,
            handler(newFile) {
                if (newFile) {
                    this.processExcelFile(newFile);
                }
            },
        },
    },
    methods: {
        processExcelFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                this.headers = jsonData[0];
                this.excelData = jsonData.slice(1);
            };
            reader.readAsArrayBuffer(file);
        },
        addRow() {
            const emptyRow = Array(this.headers.length).fill('');
            this.excelData.push(emptyRow);
        },
        updateCell(rowIndex, columnKey, value) {
            const cleanedValue = value.replace(/\n/g, '');
            if (this.excelData && this.excelData[rowIndex]) {
                this.excelData[rowIndex][columnKey] = cleanedValue;
                this.excelData = [...this.excelData];
            }
        },
        clearCell(rowIndex, columnKey) {
            if (this.excelData && this.excelData[rowIndex]) {
                this.excelData[rowIndex][columnKey] = '';
                this.excelData = [...this.excelData];
            }
        },
        saveChanges() {
            const updatedData = [this.headers, ...this.excelData];
            console.log(updatedData)
            const worksheet = XLSX.utils.aoa_to_sheet(updatedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            // Tạo buffer từ workbook
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Tạo Blob từ buffer
            const excelBlob = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            // Tạo tên file duy nhất với timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `updated-data-${timestamp}.xlsx`;

            // Tạo đối tượng File và emit ra ngoài
            const updatedFile = new File([excelBlob], fileName, {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            this.$emit('file-saved', updatedFile);
        },
        downloadEditedExcel() {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet([this.headers, ...this.excelData]);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Edited Data");
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `downloadFileExcel-${timestamp}.xlsx`;
            XLSX.writeFile(workbook, fileName);
            notificationService.success("Tải file thành công" + fileName);
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped></style>
