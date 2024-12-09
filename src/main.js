import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/tailwind.css';
import 'boxicons/css/boxicons.min.css';
import '@/assets/css/hoverCursorpointer.css'
import router from './router';
import store from './store';
import { initializeToast } from '@/services/notificationService';
const app = createApp(App);
app.use(router)
app.use(store)
initializeToast(app);
app.mount('#app')