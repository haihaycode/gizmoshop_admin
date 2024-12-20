const useComponent = component => () => import(`../view/${component}.vue`);
// import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
import client from '@/view/client.vue';
const publicRoutes = [
    {
        path: '/login',
        component: client,
        children: [

            {
                path: '',
                name : 'login',
                meta: {
                    title: "Quản trị viên",
                    description: "Đăng nhập"
                },
                components: {
                    default: useComponent('login'),
                    // header: Header,
                    // footer: Footer
                }

            },

        ]
    },
];

export default publicRoutes;  