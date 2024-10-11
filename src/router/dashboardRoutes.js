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
                meta: {
                    title: "Quản trị viên ",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('test'),
                    header: Header,
                    footer: Footer,
                    sideBar: sideBar
                }

            },

        ]
    },
];

export default dashboardRoutes;