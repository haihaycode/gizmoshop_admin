import Axios from '@/api/axios';
import { HOST } from '@/api/config';

export const exportFileExcel = async (nameExport, id = null) => {
    try {
        const endpoint = id
            ? `${HOST}/api/public/${nameExport}/export/${id}`
            : `${HOST}/api/public/${nameExport}/export`;

        const response = await Axios.get(endpoint, {
            responseType: 'blob'
        });

        return response;
    } catch (error) {
        throw new Error(`Lỗi khi gọi API: ${error}`);
    }
};


export const importFileExcel = async (nameImport, file) => {
    try {
        const endpoint = `${HOST}/api/public/${nameImport}/import`;

        const formData = new FormData();
        formData.append("file", file);
        const response = await Axios.post(endpoint, formData);
        return response;
    } catch (error) {
        throw new Error(`Lỗi khi gọi API: ${error}`);
    }
};
