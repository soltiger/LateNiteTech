<template>
  <div>
    <!-- Blog Post Header -->
    <div class="row no-gutters">
      <div id="blogPostHeader" class="col">

        <!-- Header when in edit mode -->
        <div class="row">
          <div class="col-2">
            <span>{{ formattedDate }}</span>
          </div>

          <div class="col-6">
            <input v-model="selectedBlogPost.topic" type="text" class="form-control" placeholder="Topic">
          </div>

          <div class="col-4" align="right">
            <a target="_blank" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" class="btn btn-outline-dark my-2 my-sm-0">
              <font-awesome-icon icon="question" />
            </a>
          </div>
        </div>    
      </div>
    </div>

    <!-- Blog Post Content -->
    <div id="blogPostContent" class="row no-gutters">
      <MDEditor 
        v-bind:blogPost="selectedBlogPost" 
        v-bind:editEnabled="this.authenticated"
      />
    </div>

    <!-- Blog Post Buttons -->
    <div class="row no-gutters">
      <button @click='publish' v-if='this.authenticated && selectedBlogPost.draft' class="btn btn-outline-dark my-2 my-sm-0" style="margin-right: 15px"> <!-- @click="publish" -->
        <font-awesome-icon icon="file-export" />
        Publish
      </button>

      <button @click='save' v-if='this.authenticated && !selectedBlogPost.id' class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
        <font-awesome-icon icon="save" />
        Save
      </button>

      <router-link v-bind:to="'/display/' + selectedBlogPost.id" v-if='this.authenticated && selectedBlogPost.id' class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
        <font-awesome-icon icon="eye" />
        Display
      </router-link>

      <button @click='discard' v-if='this.authenticated' class="btn btn-outline-dark my-2 my-sm-0">
        <font-awesome-icon icon="exclamation" />
        Discard
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
      originalBlogPost: null
    }
  },
  created: function() {
    if( this.id ) {
      if( !this.authenticated ) {
          this.$router.push( '/display/' + this.id );
      }

      this.selectedBlogPost = this._getBlogPost( this.blogPosts, this.id );
      this.originalBlogPost = JSON.parse( JSON.stringify( this.selectedBlogPost ) );
    }
    else {
      this.selectedBlogPost = this._getEmptyPost();
    }
  },
  computed: {
    formattedDate: function() {
      return this._formatDate( this.selectedBlogPost );
    }
  },
  methods: {
    save: function() {
      bus.$emit( 'saveClicked', this.selectedBlogPost );
    },
    publish: function() {
      this.selectedBlogPost.draft = false;
      bus.$emit( 'saveClicked', this.selectedBlogPost );
    },
    discard: function() {
      if( this.selectedBlogPost.id ) {
        this.selectedBlogPost = this.originalBlogPost;
        bus.$emit( 'saveClicked', this.selectedBlogPost );
      }
      else {
        this.$router.push( '/' );
      }
    },
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
