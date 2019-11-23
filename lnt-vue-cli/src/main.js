import Vue from 'vue'
import App from './App.vue'
import MDEditor from './MDEditor.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
Vue.component('MDEditor', MDEditor)

new Vue({
  el: '#app',
  render: h => h(App)
})