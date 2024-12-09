const useComponent = component => () => import(`../view/${component}.vue`);
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import sideBar from '@/components/sideBar.vue';

const dashboardRoutes = [
    {
        path: '/',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'dashboard',
                meta: {
                    title: "Quản lý chung ",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('dashboard'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    },
    {
        path: '/inventory',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'inventory',
                meta: {
                    title: "Quản lý kho",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('inventory'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    }, {
        path: '/me',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'me',
                meta: {
                    title: "Thông tin cá nhân",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('infoAccount'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    }, {
        path: '/staff',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'staff',
                meta: {
                    title: "Danh sách nhân viên",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('listStaff'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    },
    // statistic\SalesRevenueStatistics.vue
    {
        path: '/statistic/Sales-Revenue-Statistics',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'SalesRevenueStatistics',
                meta: {
                    title: "Thống kê doanh thu",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('statistic/SalesRevenueStatistics'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    },
    //statistic\ProductStatistics.vue
    {
        path: '/statistic/Product-Statistics',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'ProductStatistics',
                meta: {
                    title: "Thống kê sản phẩm",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('statistic/ProductStatistics'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    },
    //statistic\SupplierStatistics.vue
    {
        path: '/statistic/Supplier-Statistics',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                name: 'SupplierStatistics',
                meta: {
                    title: "Thống kê Nhà cung cấp",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('statistic/SupplierStatistics'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    },
];

export default dashboardRoutes;