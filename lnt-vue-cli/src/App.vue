<template>
  <div id="mainContainer" class="container-fluid">
      <nav class="navbar navbar-light">
          <a class="navbar-brand" href="#">LateNiteTech</a>
          <a v-if="appState.authenticated" @click="newPost" class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
            <font-awesome-icon icon="plus" />
            New Post
          </a>
          <button v-if="!appState.authenticated" @click="login" id="loginButton" class="btn btn-outline-dark my-2 my-sm-0">
            <font-awesome-icon icon="sign-in-alt" />
            Login
          </button>
          <button v-if="appState.authenticated" @click="logout" id="logoutButton" class="btn btn-outline-dark my-2 my-sm-0">
            <font-awesome-icon icon="sign-out-alt" />
            Logout
          </button>
      </nav>
      
      <div id="mainRow" class="row no-gutters">
          <div class="col-3">
              <div class="mr-3 box">
                  <div class="sidebarContent">
                      <p v-for="year in getYears( appState.authenticated )">
                          <span class="yearDivider">{{ year }} ({{ postsByYear( year, appState.authenticated ) }} posts)</span><br>

                          <span 
                              class="blogPostLink"
                              v-for="blogPost in getPosts( year, appState.authenticated )" 
                              v-if="!blogPost.draft || appState.authenticated && blogPost.draft"
                          >
                              <a href="javascript:void(0);" @click="display( blogPost.id )">
                                  {{ formatDate( blogPost ) }} - 
                                  {{ blogPost.topic }}
                                  <span v-if="blogPost.draft">- DRAFT</span>
                              </a><br>
                          </span>
                      </p>
                  </div>
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
                                  <span id="blogPostTitle">
                                      {{ formattedDate }}
                                  </span>
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
export default {
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
            { id: 1, year: 2019, month:6, day:4, topic: "Hello World 4", content: "", draft: false },
            { id: 2, year: 2019, month:4, day:4, topic: "Hello World 3", content: "", draft: false },
            { id: 3, year: 2018, month:4, day:12, topic: "Hello World 2", content: "", draft: false },
            { id: 4, year: 2017, month:2, day:2, topic: "Hello World 1", content: "", draft: false },
            { id: 5, year: 2018, month:1, day:3, topic: "Hello World 7", content: "", draft: true },
            { id: 6, year: 2016, month:2, day:2, topic: "Hello World 6", content: "", draft: true },
            { id: 7, year: 2019, month:3, day:1, topic: "Hello World 5", content: "", draft: true },
      ]
    }
  },
  created: function() {
    this.sortPosts();
    this.selectedBlogPost = this.blogPosts[ 0 ];
    this.appState.pageMode = "display";
  },
  computed: {
    formattedDate: function() {
      return this.formatDate( this.selectedBlogPost );
    }
  },
  methods: {
    sortPosts: function() {
      this.blogPosts = this.blogPosts.sort( (a,b) => new Date( b.year, b.month-1, b.day ) - new Date( a.year, a.month-1, a.day ) );
    },
    login: function() {
      this.appState.authenticated = true;
    },
    logout: function() {
      this.appState.authenticated = false;
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
    getPostsByYears: function( drafts = false) {
      postYears = [];
      let years = this.getYears( drafts );
      let self = this;

      years.forEach( function(y) {
          let posts = self.getPosts( y, drafts );

          postYears.push( {
              year: y,
              posts: posts,
              count: posts.length
          });
      } );

      return postYears;
    },
    getYears: function( includeDrafts = false ) {
      // Get years only
      let years = [];
      let posts = this.blogPosts;

      // Filter drafts out?
      if( !includeDrafts ) {
          posts = posts.filter( post => !post.draft );
      }

      posts.forEach( p => { years.push( p.year ) } );

      // Get unique years
      years = years.filter( ( y,i,self ) => self.indexOf( y ) == i );
      
      return years;
    },
    postsByYear: function( year, includeDrafts = false ) {
      return this.getPosts( year, includeDrafts ).length;
    },
    getPosts: function( year, includeDrafts = false )  {
      let posts = this.blogPosts;

      // Filter drafts out?
      if( !includeDrafts ) {
          posts = posts.filter( post => !post.draft );
      }

      return posts.filter( post => ( post.year == year ) );
    },
    getPost: function( id )  {
      return this.blogPosts.filter( post => post.id == id )[0];
    },
    formatDate: function(p) {
      return p.year + "-" + this.twoDigits( p.month ) + "-" + this.twoDigits( p.day )
    },
    twoDigits: function(n) {
      return n.toString().padStart(2,'0');
    }
  }
}
</script>

<style>
</style>
