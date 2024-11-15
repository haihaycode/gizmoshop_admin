<template>
    <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-center bg-white rounded-sm space-y-4 sm:space-y-0 sm:space-x-4">
        <label class="flex items-center cursor-pointer" @click="handleOpenFileDialog">
            <Button :icon="icon" :text="text" :class="importClass" />
            <input type="file" accept=".xlsx" @change="handleFileImport" class="hidden" ref="fileInput" />
        </label>


        <div v-if="selectedFileName" class="mt-2 flex flex-col sm:flex-row sm:items-center justify-center sm:space-x-2">
            <span class="text-gray-700 text-sm sm:text-base md:text-lg">Tên File : {{ selectedFileName }}</span>
            <div class="flex space-x-2 mt-2 sm:mt-0">
                <button @click="removeFile" class="text-red-500 hover:text-red-700 text-sm sm:text-base md:text-xl">
                    <i class="bx bxs-trash text-lg"></i>
                </button>
                <button @click="handleOpenFileSelected"
                    class="text-blue-500 hover:text-blue-700 text-sm sm:text-base md:text-xl">
                    <i class="bx bxs-folder-open text-lg"></i>
                </button>
            </div>
        </div>


        <div v-if="fileTooLarge" class="mt-2 text-red-500">
            File vượt quá 10mb
        </div>
    </div>
</template>

<script>
import notificationService from '@/services/notificationService';
import Button from '../buttons/button.vue';

export default {
    name: 'ImportButtonComponent',
    components: {
        Button
    },
    props: {
        text: {
            type: String,
            default: 'Import Excel'
        },
        icon: {
            type: String,
            default: `<i class='bx bxs-file-import' ></i>`
        },
        importClass: {
            type: String,
            default: 'px-4 py-2 rounded-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200'
        }
    },
    data() {
        return {
            selectedFileName: '',
            fileTooLarge: false,
            file: null
        };
    },
    methods: {
        handleOpenFileSelected() {
            this.$emit('file-imported', this.file);
        },
        handleOpenFileDialog() {
            this.$refs.fileInput.click();
        },
        handleFileImport(event) {
            const file = event.target.files[0];
            this.fileTooLarge = false;

            if (file) {
                if (file.size > 10 * 1024 * 1024) {
                    this.fileTooLarge = true;
                    this.selectedFileName = '';
                } else if (file.name.endsWith('.xlsx')) {
                    this.selectedFileName = file.name;
                    this.file = file;
                    this.$emit('file-imported', file);
                } else {
                    notificationService.warning(' Vui lòng chọn đúng file  Excel (.xlsx)');
                    this.selectedFileName = '';
                }
            }
            this.$refs.fileInput.value = '';
        },
        removeFile() {
            this.selectedFileName = '';
            this.fileTooLarge = false;
            this.$refs.fileInput.value = '';
            notificationService.info(' Xóa file thành công .');
        }
    }
}
</script>

<style scoped></style>
