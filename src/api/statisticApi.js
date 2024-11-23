import Axios from "@/api/axios";
import { HOST } from "@/api/config";

// Gọi API thống kê doanh thu
export const getSalesRevenueStatistics = async (startDate, endDate) => {
    try {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await Axios.get(`${HOST}/api/admin/statistic/t/SalesRevenueStatistics`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching sales revenue statistics:", error);
        throw error;
    }
};


// API: Top-selling products
export const getTopSellingProducts = async (startDate, endDate, page = 0, size = 1) => {
    try {
        const params = { page, size };
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await Axios.get(`${HOST}/api/admin/statistic/t/top-selling-products`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching top-selling products:", error);
        throw error;
    }
};

// API: Low-stock products
export const getLowStockProducts = async (threshold = 3, page = 0, size = 1) => {
    try {
        const params = { threshold, page, size };

        const response = await Axios.get(`${HOST}/api/admin/statistic/t/low-stock-products`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching low-stock products:", error);
        throw error;
    }
};


// API: Partner statistics
export const getPartnerStatistics = async (startDate, endDate) => {
    try {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await Axios.get(`${HOST}/api/admin/statistic/t/partner-statistics`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching partner statistics:", error);
        throw error;
    }
};

// API: Top-selling products by supplier
export const getTopSellingBySupplier = async (startDate, endDate, page = 0, size = 10) => {
    try {
        const params = { page, size };
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await Axios.get(`${HOST}/api/admin/statistic/t/top-selling-by-supplier`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching top-selling products by supplier:", error);
        throw error;
    }
};
