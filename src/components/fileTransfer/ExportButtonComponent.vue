<template>
    <div>
        <Button @click="handleExportAll" :icon="icon" :text="text" :color="color" :class="exportClass" />
    </div>
</template>

<script>
import { getCurrentDate } from '@/utils/currencyUtils';
import Button from '../buttons/button.vue';
import { exportFileExcel } from '@/api/exportAndImportApi';
import { number } from 'yup';
import notificationService from '@/services/notificationService';
export default {
    name: 'ExportButtonComponent',
    components: {
        Button
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        exportClass: {
            type: String,
            default: ' bg-blue-500 rounded-sm hover:text-blue-500 hover:bg-white focus:ring-4 focus:ring-blue-300 transition duration-200'
        },
        icon: {
            type: String,
            default: `<i class='bx bxs-file-export text-lg mr-2' ></i>`
        },
        nameExport: {
            type: String,
            required: false,
            default: ''
        },
        idExport: {
            type: number,
            required: false,
        }

    },
    methods: {
        async handleExportAll() {
            if (this.nameExport) {
                const response = await exportFileExcel(this.nameExport, this.idExport);
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;

                // Lấy tên file từ Content-Disposition nếu có
                const contentDisposition = response.headers['content-disposition'];
                const filename = contentDisposition
                    ? contentDisposition.split('filename=')[1].replace(/"/g, '') + getCurrentDate() + '.xlsx'
                    : 'download.xlsx';

                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                notificationService.success("Xuất file thành công" + filename);
            } else {
                console.warn(' "nameExport" rỗng line 70 file  ExportButtonComponent  func : handleExportAll()  .');
            }
        }
    }
}
</script>
