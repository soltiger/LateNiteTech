<template>
  <div id="editor" class="col">
      <textarea v-if="editEnabled" :value="blogPost.content" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import { bus } from '../main'

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

<style scoped>
  /* MD editor */
  code {
    color: #f66;
  }

  textarea, #editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }
</style>
