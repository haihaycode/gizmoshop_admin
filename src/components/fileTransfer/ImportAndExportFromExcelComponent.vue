<template>
    <!-- Controller Button  -->
    <div
        class="flex flex-col sm:flex-row items-center justify-start p-1 bg-white rounded-sm space-y-4 sm:space-y-0 sm:space-x-4 mb-2 mt-2">
        <ExportButtonComponent :text="'Xuất dữ liệu'" :nameExport="nameExport"
            :icon="`<i class='bx bx-import text-base mr-1'></i>`"
            exportClass="bg-green-600 text-white hover:bg-green-700 transition-colors duration-200" />
        <ImportButtonComponent text="Nhập dữ liệu"
            importClass="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200"
            :icon="`<i class='bx bxs-file-export text-base mr-1' ></i>`" @file-imported="handleFileImport" />
    </div>


    <!-- file save  -->
    <ExcelViewerComponent v-if="file" :excel-file="file" :is-open="modalExcelViewerIsOpen" @close="handleOpenModal"
        @file-saved="handleFileSave">
    </ExcelViewerComponent>
</template>

<script>
import ExportButtonComponent from './ExportButtonComponent.vue';
import ImportButtonComponent from './ImportButtonComponent.vue';
import ExcelViewerComponent from './ExcelViewerComponent.vue';
export default {
    name: 'ImportAndExportFromExcelComponent',
    props: {
        nameExport: {
            type: String
        }
    },
    data() {
        return {
            modalExcelViewerIsOpen: false,
            file: null
        }
    },
    components: {
        ExportButtonComponent,
        ImportButtonComponent,
        ExcelViewerComponent
    },
    methods: {
        handleFileImport(file) {
            this.handleOpenModal();
            this.file = file;
        },
        handleOpenModal() {
            if (this.modalExcelViewerIsOpen) {
                this.file = null;
            }
            this.modalExcelViewerIsOpen = !this.modalExcelViewerIsOpen;
        },
        handleFileSave(updatedFile) {
            this.$emit('file-ready-for-update', updatedFile);
        },
    }
};
</script>

<style scoped>
@media (min-width: 640px) {

    .export-button,
    .import-button {
        min-width: 120px;
    }
}
</style>
