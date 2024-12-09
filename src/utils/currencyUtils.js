import dayjs from 'dayjs';


// currencyUtils.js
export const formatCurrencyVN = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};


// dateUtils.js
export const formatDay = (date) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
};
export const formatBirthDay = (date) => {
    return dayjs(date).format('DD/MM/YYYY ');
};



export const getCurrentDate = () => {
    const day = dayjs().date();
    const month = dayjs().month() + 1; // Month is 0-based, so add 1
    const year = dayjs().year();
    const hour = dayjs().hour().toString().padStart(2, '0'); // Format to 2 digits
    const minute = dayjs().minute().toString().padStart(2, '0'); // Format to 2 digits
    const second = dayjs().second().toString().padStart(2, '0'); // Format to 2 digits

    return `${day}_${month}__${year}_${hour}_${minute}_${second}`;
};

export const translatedRoles = (roles) => {
    const roleMapping = {
        "ROLE_ADMIN": { description: "Quản trị viên", color: "#e3342f" }, // Red
        "ROLE_STAFF": { description: "Nhân viên quản lý cửa hàng", color: "#3490dc" }, // Blue
        "ROLE_CUSTOMER": { description: "Khách hàng", color: "#38c172" }, // Green
        "ROLE_SHIPPER": { description: "Nhân viên giao hàng", color: "#ffed4a" }, // Yellow
        "ROLE_SUPPLIER": { description: "Nhà cung cấp", color: "#6f42c1" } // Purple
    };

    return roles.map(role => {
        const mappedRole = roleMapping[role];
        return {
            name: mappedRole ? mappedRole.description : role,
            color: mappedRole ? mappedRole.color : "#000000" // Default color if not found
        };
    });
};
