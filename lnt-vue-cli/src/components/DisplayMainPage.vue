<template>
  <div>
    <!-- Blog Post Header -->
    <div class="row no-gutters">
      <div id="blogPostHeader" class="col">

        <!-- Header when in display mode -->
        <div class="row">
          <div class="col-12">
            Welcome to LateNiteTech
          </div>
        </div>

      </div>
    </div>

    <!-- Blog Post Content -->
    <div id="blogPostContent" class="row no-gutters">
      No blog post selected
    </div>

    <!-- Blog Post Buttons -->
    <div class="row no-gutters">
    </div>
  </div>
</template>

<script>
import MDEditor from '../components/MDEditor.vue'
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import DateFormatMixin from '../mixins/DateFormatMixin'

import { bus } from '../main'

export default {
  mixins: [ DateFormatMixin ],
  props: [ 'authenticated', 'blogPosts' ],
  components: {
    'MDEditor': MDEditor,
    'AppHeader': AppHeader,
    'AppSidebar': AppSidebar    
  },
  data() {
    return {
    }
  },
  created: function() {
  },
  methods: {
  },
}
</script>

<style scoped>
#blogPostContent {
  display: flex;
  flex-grow: 1;
  padding-bottom: 10px;
}

#blogPostHeader {
  margin-bottom: 2px;
  font-size: 25px;
}
</style>
