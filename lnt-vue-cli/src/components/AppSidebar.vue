<template>
  <div id="sidebarContent">
      <p v-for="year in getYears( authenticated )">
        <span class="yearDivider">{{ year }} ({{ postsByYear( year, authenticated ) }} posts)</span><br>

        <span 
          class="blogPostLink"
          v-for="blogPost in getPosts( year, authenticated )" 
          v-if="!blogPost.draft || authenticated && blogPost.draft"
        >
          <a href="javascript:void(0);" @click="displayBlogPost( blogPost.id )">
            {{ tools.formatDate( blogPost ) }} - 
            {{ blogPost.topic }}
            <span v-if="blogPost.draft">- DRAFT</span>
          </a><br>
        </span>
      </p>
  </div>
</template>

<script>
import { bus } from '../main'
import { tools } from '../main'

export default {
  created: function() {
    this.tools = tools;
  },
  props: [ 'authenticated', 'blogPosts' ],
  methods: {
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
    displayBlogPost: function( blogPostID ) {
      bus.$emit( 'displayBlogPost', blogPostID );
    }
  }
}
</script>

<style scoped>
  #sidebarContent {
      padding: 5px;
      padding-left: 15px;
      font-size: 12px;
  }

  .yearDivider {
      font-size: 16px;
      font-weight: bold;
  }

  .blogPostLink {
      padding-left: 15px;
  }
</style>
