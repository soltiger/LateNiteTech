import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Routes from './routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use( VueRouter );

const router = new VueRouter( { routes: Routes } );

export const bus = new Vue();

// Font Awesome icons
import { 
  faSignInAlt, 
  faSignOutAlt,
  faPen,
  faFileExport,
  faSave,
  faEye,
  faExclamation,
  faPlus,
  faQuestion
} from '@fortawesome/free-solid-svg-icons'

// For some reason markdown is not found?
// import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

library.add( 
  faSignInAlt, 
  faSignOutAlt,
  faQuestion,
  faPen,
  faFileExport,
  faSave,
  faEye,
  faExclamation,
  faPlus
)

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})