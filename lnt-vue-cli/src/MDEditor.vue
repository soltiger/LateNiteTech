<template>
  <div id="editor" class="col">
      <textarea v-if="editEnabled" :value="blogPost.content" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
export default {
  props: [ 'blogPost', 'editEnabled' ],
  computed: {
    compiledMarkdown: function () {
      return marked( this.blogPost.content, { sanitize: true } );
    }
  },
  methods: {
      update: _.debounce(function (e) {
        this.blogPost.content = e.target.value
      }, 300)
  }
}
</script>

<style>
</style>
