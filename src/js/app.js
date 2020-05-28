import Vue from 'vue';
import App from './components/App.vue';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el        : '#app',
    template  : '<App/>',
    components: { App }
});