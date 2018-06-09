// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import fontawesome from '@fortawesome/fontawesome';
import datePicker from 'vue-bootstrap-datetimepicker';
import jQuery from 'jquery';
import VueLodash from 'vue-lodash';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import './assets/stylesheet/build/all.css';

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(datePicker);
Vue.use(VueLodash);

fontawesome.library.add(solid);
fontawesome.library.add(regular);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle',
  },
});
