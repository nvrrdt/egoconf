<template>
  <div id="app">
    <div class="container">
      <div>
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" :href="isAuthenticated ? '/base/messages' : '/'"><h1>egoconf</h1></a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 mr-auto">
              <div class="Typeahead">
                <i class="fa fa-spinner fa-spin" v-if="loading"></i>
                <template v-else>
                  <i class="fa fa-search" v-show="isEmpty"></i>
                  <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
                </template>

                <input type="text"
                      class="Typeahead__input form-control mr-sm-2"
                      placeholder="Search for relatives"
                      autocomplete="off"
                      v-model="query"
                      @keydown.down="down"
                      @keydown.up="up"
                      @keydown.enter="hit"
                      @keydown.esc="reset"
                      @blur="reset"
                      @input="update"/>

                <ul v-show="hasItems" class="list-group" style="position: absolute; z-index: 999;">
                  <li v-for="(item, $item) in items" :class="activeClass($item)" class="list-group-item" @mousedown="hit" @mousemove="setActive($item)">
                    <span class="name" v-text="item.name"></span>
                    <span class="screen-name" v-text="item.screen_name"></span>
                  </li>
                </ul>
              </div>
            </form>
            <h2>This is a demo!</h2>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a v-if="isAuthenticated" class="nav-link active" href>{{ firstname }}'s settings</a>
              </li>
              <li class="nav-item">
                <a v-if="isAuthenticated" class="nav-link active" href @click="signOut">Logout</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="http://github.com/nvrrdt/ego" target="_blank"><icon name="github" scale="2"></icon></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
// import { db } from '@/firebase'
import VueTypeahead from 'vue-typeahead'
import Axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = Axios

export default {
  name: 'app',
  extends: VueTypeahead,
  data () {
    return {
      firstname: this.getFirstName(),
      src: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
      limit: 10,
      minChars: 3
    }
  },
  methods: {
    getFirstName: function () {
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userId = user.uid

          firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            vm.firstname = snapshot.val().firstname
          })

          return vm.firstname
        } else {
          return 'hemel'
        }
      })
    },
    onHit (item) {
      window.location.href = 'http://twitter.com/' + item.screen_name
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }


</style>
