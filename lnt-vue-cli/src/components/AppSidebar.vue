<template>
  <div id="sidebarContent">
      <p v-for="year in _getBlogPostYears( blogPosts, authenticated )">
        <span class="yearDivider">{{ year }} ({{ _getNumberOfBlogPostsByYear( blogPosts, year, authenticated ) }} posts)</span><br>

        <span 
          class="blogPostLink"
          v-for="blogPost in _getBlogPosts( blogPosts, year, authenticated )" 
          v-if="!blogPost.draft || authenticated && blogPost.draft"
        >
          <router-link v-bind:to="'/display/' + blogPost.id">
            {{ _formatDate( blogPost ) }} - 
            {{ blogPost.topic }}
            <span v-if="blogPost.draft">- DRAFT</span>
          </router-link><br>
        </span>
      </p>
  </div>
</template>

<script>
import DateFormatMixin from '../mixins/DateFormatMixin'
import BlogPostMixin from '../mixins/BlogPostMixin'

import { bus } from '../main'

export default {
  created: function() {
  },
  props: [ 'authenticated', 'blogPosts' ],
  mixins: [ DateFormatMixin, BlogPostMixin ],
  methods: {
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
