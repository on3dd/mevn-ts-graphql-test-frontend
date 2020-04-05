import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from "vue-apollo";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus, faMinus, faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faMinus, faEdit);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

new Vue({
  router,
  store,
  render: h => h(App),
  provide: apolloProvider.provide(),
}).$mount('#app');
