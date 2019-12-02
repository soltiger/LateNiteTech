<template>
  <!-- App container for all page html --->
  <div id="appContainer" class="container-fluid">
    <!-- Header -->
    <AppHeader v-bind:authenticated="appState.authenticated"></AppHeader>
    
    <!-- Bottom / main part of app -->
    <div id="mainContainer" class="row no-gutters">

      <!-- Sidebar -->
      <div class="col-3">
          <div class="mr-3 box">
            <AppSidebar v-bind:authenticated="appState.authenticated" v-bind:blogPosts="blogPosts"></AppSidebar>
          </div>
      </div>

      <!-- Blog Post -->
      <div class="col-9 box">
        <div id="blogPostContainer">
            <router-view v-bind:authenticated="appState.authenticated" v-bind:blogPosts="blogPosts" :key="$route.name + ($route.params.id || '')"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MDEditor from './components/MDEditor.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import DateFormatMixin from './mixins/DateFormatMixin'
import BlogPostMixin from './mixins/BlogPostMixin'

import { bus } from './main'

export default {
  mixins: [ DateFormatMixin, BlogPostMixin ],
  components: {
    'MDEditor': MDEditor,
    'AppHeader': AppHeader,
    'AppSidebar': AppSidebar    
  },
  data() {
    return {
      appState: {
        authenticated: false,
        pageMode: false
      },
      blogPosts: [
              { id: 1, year: 2019, month:6, day:4, topic: "Hello World 4", content: "## Blog Post 4\nHello World", draft: false },
              { id: 2, year: 2019, month:4, day:4, topic: "Hello World 3", content: "## Blog Post 3\nHello World", draft: false },
              { id: 3, year: 2018, month:4, day:12, topic: "Hello World 2", content: "## Blog Post 2\nHello World", draft: false },
              { id: 4, year: 2017, month:2, day:2, topic: "Hello World 1", content: "## Blog Post 1\nHello World", draft: false },
              { id: 5, year: 2018, month:1, day:3, topic: "Hello World 7", content: "## Blog Post 7\nHellno World", draft: true },
              { id: 6, year: 2016, month:2, day:2, topic: "Hello World 6", content: "## Blog Post 6\nHelo World", draft: true },
              { id: 7, year: 2019, month:3, day:1, topic: "Hello World 5", content: "## Blog Post 5\nHello Wo", draft: true },
      ]
    }
  },
  created: function() {
    this._sortBlogPosts( this.blogPosts );

    bus.$on( 'loginClicked', (data) => this.login() );
    bus.$on( 'logoutClicked', (data) => this.logout() );
    bus.$on( 'deleteClicked', (data) => this.deleteBlogPost( data ) );
    bus.$on( 'newPostClicked', (data) => this.newBlogPost() );
    bus.$on( 'saveClicked', (blogPost) => this.saveBlogPost( blogPost ) );
  },
  computed: {
  },
  methods: {
    deleteBlogPost: function( id ) {
      this.blogPosts = this._deleteBlogPost( this.blogPosts, id );
      this.$router.push( '/' );
    },
    login: function() {
      this.appState.authenticated = true;
      bus.$emit( 'loggedIn' );
    },
    logout: function() {
      this.appState.authenticated = false;
    },
    newBlogPost: function() {
      this.$router.push( '/add');
    },
    saveBlogPost: function( blogPost ) {
      this.blogPosts = this._saveBlogPost( this.blogPosts, blogPost );
      this.$router.push( '/display/' + blogPost.id );
    },
  },
}
</script>

<style>
.btn {
  box-shadow: 10px 10px 5px grey;
}

.icon {
  width: 20px;
}

.box {
  border: 5px solid black;
  height: 100%;
  box-shadow: 10px 10px 5px grey;
}
</style>

<style scoped>
.container-fluid {
  padding: 5px;
  padding-bottom: 15px;
  padding-right: 15px;
}

#appContainer {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#mainContainer {
  flex-grow : 1;
  height: 100%;
}

#blogPostContainer {
  padding: 10px;
  padding-right: 15px;
  height: 100%;
  display: flex;
  flex-flow: column;
  padding-bottom: 15px;
}

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
