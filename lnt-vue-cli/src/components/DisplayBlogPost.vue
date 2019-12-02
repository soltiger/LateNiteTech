<template>
  <div>
    <!-- Blog Post Header -->
    <div class="row no-gutters">
      <div id="blogPostHeader" class="col">

        <!-- Header when in display mode -->
        <div class="row">
          <div class="col-12">
            <span v-if="selectedBlogPost && selectedBlogPost.id">
              {{ formattedDate }} -
              {{ selectedBlogPost.topic }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Post Content -->
    <div id="blogPostContent" class="row no-gutters">
      <MDEditor 
        v-bind:blogPost="selectedBlogPost" 
        v-bind:editEnabled='false'
        v-if="selectedBlogPost"
      />
    </div>

    <!-- Blog Post Buttons -->
    <div class="row no-gutters">
      <router-link v-bind:to="'/edit/' + selectedBlogPost.id" v-if='authenticated' class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
        <font-awesome-icon icon="pen" />
        Edit
      </router-link>

      <button @click="deleteBlogPost( selectedBlogPost.id )" v-if='authenticated' class="btn btn-outline-dark my-2 my-sm-0">
        <font-awesome-icon icon="exclamation" />
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import MDEditor from '../components/MDEditor.vue'
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import DateFormatMixin from '../mixins/DateFormatMixin'
import BlogPostMixin from '../mixins/BlogPostMixin'

import { bus } from '../main'

export default {
  mixins: [ DateFormatMixin, BlogPostMixin ],
  props: [ 'authenticated', 'blogPosts' ],
  components: {
    'MDEditor': MDEditor,
    'AppHeader': AppHeader,
    'AppSidebar': AppSidebar    
  },
  data() {
    return {
      id: this.$route.params.id,
      selectedBlogPost: null,
    }
  },
  created: function() {
    this.selectedBlogPost = this._getBlogPost( this.blogPosts, this.id );
    if( !this.selectedBlogPost ) {
      this.$router.push( '/' );
    }
  },
  computed: {
    formattedDate: function() {
      return this._formatDate( this.selectedBlogPost );
    }
  },
  methods: {
    deleteBlogPost: function( id ) {
      bus.$emit( 'deleteClicked', id );
    }
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