import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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

Vue.component('font-awesome-icon', FontAwesomeIcon)

export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})