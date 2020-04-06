import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from "vue-apollo";

import typeDefs from "@/graphql/typeDefs";
import { InMemoryCache } from 'apollo-cache-inmemory';

import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlus, faMinus, faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faMinus, faEdit);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  typeDefs,
  resolvers: {},
  uri: 'http://localhost:3000/graphql',
});

cache.writeData({
  data: {
    messages: [],
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'apolloLoading',
  }
});

Vue.use(VueApollo);

new Vue({
  router,
  store,
  render: h => h(App),
  provide: apolloProvider.provide(),
}).$mount('#app');
