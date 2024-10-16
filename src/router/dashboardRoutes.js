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

];

export default dashboardRoutes;