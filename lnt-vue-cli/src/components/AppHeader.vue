<template>
  <nav class="navbar navbar-light">
    <div class="row no-gutters" style="width: 100%">
      <div class="col">
        <router-link v-bind:to="'/add/'" v-show="authenticated" class="btn btn-outline-dark my-2 my-sm-0" style="position: absolute; left: 0; bottom: 0;">
          <font-awesome-icon icon="plus" />
          New Post
        </router-link>
      </div>

      <span class="navbar-brand" style="margin: 0 auto" href="#">LateNiteTech</span>

      <div class="col">
        <button v-show="!authenticated" @click="login" id="loginButton" class="btn btn-outline-dark my-2 my-sm-0" style="position: absolute; right: 0; bottom: 0;">
          <font-awesome-icon icon="sign-in-alt" />
          Login
        </button>

        <button v-show="authenticated" @click="logout" id="logoutButton" class="btn btn-outline-dark my-2 my-sm-0" style="position: absolute; right: 0; bottom: 0;">
          <font-awesome-icon icon="sign-out-alt" />
          Logout
        </button>
      </div>
    </div>
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
