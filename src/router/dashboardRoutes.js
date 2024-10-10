const useComponent = component => () => import(`../view/${component}.vue`);
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const dashboardRoutes = [
    {
        path: '/',
        component: useComponent('admin'),
        children: [

            {
                path: '',
                meta: {
                    title: "...",
                    description: " Mô tả "
                },
                components: {
                    default: useComponent('dashboard'),
                    header: Header,
                    footer: Footer
                }

            },

        ]
    },
];

export default dashboardRoutes;