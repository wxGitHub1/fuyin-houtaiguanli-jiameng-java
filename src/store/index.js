//  control the state
import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/userlogin';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        login,
    }
})


export default store;