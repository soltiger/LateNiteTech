<template>
  <div id="mainContainer" class="container-fluid">
    <AppHeader v-bind:authenticated="appState.authenticated"></AppHeader>
        
    <div id="mainRow" class="row no-gutters">
      <div class="col-3">
          <div class="mr-3 box">
            <AppSidebar v-bind:authenticated="appState.authenticated" v-bind:blogPosts="blogPosts"></AppSidebar>
          </div>
      </div>

      <div class="col-9 box">
        <div class="mainContent">
          <div class="row no-gutters">
            <div id="mainHeaderRow" class="col">
              <div class="row" v-if='appState.pageMode == "display"'>
                <div class="col-12">
                  <p id="blogPostTitle">
                    <span v-if="selectedBlogPost.id">
                      {{ formattedDate }} -
                      {{ selectedBlogPost.topic }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="row" v-if='appState.pageMode == "edit"'>
                <div class="col-2">
                  <span id="blogPostTitle">{{ formattedDate }}</span>
                </div>
      
                <div id="mainHeaderRow" class="col-6">
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

          <div id="mainBlogPost" class="row no-gutters">
            <MDEditor 
              v-bind:blogPost="selectedBlogPost" 
              v-bind:editEnabled='appState.pageMode == "edit"'
            />
          </div>

          <div id="mainButtons" class="row no-gutters">
            <a v-if='appState.authenticated && appState.pageMode == "display"' @click="edit()" class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
              <font-awesome-icon icon="pen" />
              Edit
            </a>

            <a v-if='appState.pageMode == "edit" && selectedBlogPost.draft' @click="publish" class="btn btn-outline-dark my-2 my-sm-0" style="margin-right: 15px">
              <font-awesome-icon icon="file-export" />
              Publish
            </a>

            <a v-if='!selectedBlogPost.id && appState.pageMode == "edit"' @click="save" class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
              <font-awesome-icon icon="save" />
              Save
            </a>

            <a v-if='selectedBlogPost.id && appState.pageMode == "edit"' @click="display( selectedBlogPost.id )" class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
              <font-awesome-icon icon="eye" />
              Display
            </a>

            <a v-if='appState.authenticated && appState.pageMode == "display"' @click="deletePost( selectedBlogPost.id )" class="btn btn-outline-dark my-2 my-sm-0">
              <font-awesome-icon icon="exclamation" />
              Delete
            </a>

            <a v-if='appState.pageMode == "edit"' @click="discard" class="btn btn-outline-dark my-2 my-sm-0">
              <font-awesome-icon icon="exclamation" />
              Discard
            </a>                                
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MDEditor from './components/MDEditor.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import { bus } from './main'
import { tools } from './main'

export default {
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
      selectedBlogPost: {
            id: 0,
            date: "",
            topic: "",
            content: ""
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
    this.sortPosts();
    this.selectedBlogPost = this.blogPosts[ 0 ];
    this.appState.pageMode = "display";
    this.tools = tools;

    // Signals from AppHeader
    bus.$on( 'loginClicked', (data) => this.login() );
    bus.$on( 'logoutClicked', (data) => this.logout() );
    bus.$on( 'newPostClicked', (data) => this.newPost() );

    // Signals from sidebar
    bus.$on( 'displayBlogPost', (blogPostId) => this.display( blogPostId) );
  },
  computed: {
    formattedDate: function() {
      return tools.formatDate( this.selectedBlogPost );
    }
  },
  methods: {
    sortPosts: function() {
      this.blogPosts = this.blogPosts.sort( (a,b) => new Date( b.year, b.month-1, b.day ) - new Date( a.year, a.month-1, a.day ) );
    },
    edit: function() {
      this.appState.pageMode = "edit";
    },
    display: function( id ) {
      if( id ) {
          this.selectedBlogPost = this.getPost( id );
      }

      this.appState.pageMode = "display";
    },
    deletePost: function( id ) {
      this.blogPosts = this.blogPosts.filter( post => post.id != id );
      this.selectedBlogPost = this.blogPosts[0];
      this.appState.pageMode = "display";
    },
    login: function() {
      this.appState.authenticated = true;
    },
    logout: function() {
      this.appState.authenticated = false;
    },
    newPost: function() {
      var today = new Date();

      this.selectedBlogPost = { 
          id: 0, 
          year: today.getFullYear(),
          month: (today.getMonth()+1),
          day: today.getDate(),
          topic: "New Post",
          content: ""
      };

      this.appState.pageMode = "edit";
    },
    save: function() {
      if( this.selectedBlogPost.id == 0 ) {
          this.selectedBlogPost.id = this.findNextID();
          this.blogPosts.push( this.selectedBlogPost );
          this.sortPosts();
      }

      this.appState.pageMode = "display";
    },
    publish: function() {
      this.selectedBlogPost.draft = false;
      this.save();
    },
    discard: function() {
      this.appState.pageMode = "display";
    },
    updateEditor: _.debounce( function ( e ) {
      /*
      this.selectedBlogPost.content = e.target.value
      */
      }, 300),
    updateTopic: _.debounce( function ( e ) {
      this.selectedBlogPost.topic = e.target.value
      }, 300),
    findNextID: function( ) {
      let biggest = -1;
      this.blogPosts.forEach( function( post ) { if( post.id > biggest ) biggest = post.id; } );
      return biggest + 1;
    },
    getPost: function( id )  {
      return this.blogPosts.filter( post => post.id == id )[0];
    }
  }
}
</script>

<style scoped>
.container-fluid {
  padding: 5px;
  padding-bottom: 15px;
  padding-right: 15px;
}

.btn {
  box-shadow: 10px 10px 5px grey;
}

#mainContainer {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#mainRow {
  flex-grow : 1;
  height: 100%;
}

.box {
  border: 5px solid black;
  height: 100%;
  box-shadow: 10px 10px 5px grey;
}

.mainContent {
  padding: 10px;
  padding-right: 15px;
  height: 100%;
  display: flex;
  flex-flow: column;
  padding-bottom: 15px;
}

#blogPostTitle {
  font-size: 25px;
}

#mainBlogPost {
  display: flex;
  flex-grow: 1;
  padding-bottom: 10px;
}

#mainHeaderRow {
  margin-bottom: 2px;
}

.icon {
  width: 20px;
}
</style>
