import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from "vue-apollo";

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://localhost:3000/graphql',
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
