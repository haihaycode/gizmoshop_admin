// src/store.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import loading from './modules/loading';
import leftMenu from './modules/leftMenu';
    
export default createStore({
    modules: {
        auth,
        loading,
        leftMenu
       
    },
});
