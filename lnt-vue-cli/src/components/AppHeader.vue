<template>
  <nav class="navbar navbar-light">
    <a class="navbar-brand" href="#">LateNiteTech</a>

    <a v-if="authenticated" @click="newPost" class="btn btn-outline-dark my-2 my-sm-0 mr-auto">
      <font-awesome-icon icon="plus" />
      New Post
    </a>

    <button v-if="!authenticated" @click="login" id="loginButton" class="btn btn-outline-dark my-2 my-sm-0">
      <font-awesome-icon icon="sign-in-alt" />
      Login
    </button>

    <button v-if="authenticated" @click="logout" id="logoutButton" class="btn btn-outline-dark my-2 my-sm-0">
      <font-awesome-icon icon="sign-out-alt" />
      Logout
    </button>
  </nav>
</template>

<script>
import { bus } from '../main'

export default {
  props: [ 'authenticated' ],
  methods: {
    newPost: function() {
      bus.$emit( 'newPostClicked' );
    },
    login: function() {
      bus.$emit( 'loginClicked' );
    },
    logout: function() {
      bus.$emit( 'logoutClicked' );
    }
  }
}
</script>

<style scoped>
  .navbar-brand {
      font-size: 35px;
      text-shadow: 10px 10px 5px grey;
  }

  .navbar {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-bottom: 1rem;
  }
</style>
