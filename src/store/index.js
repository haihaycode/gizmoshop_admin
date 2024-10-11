// src/store.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import loading from './modules/loading';
    
export default createStore({
    modules: {
        auth,
        loading,
       
    },
});
