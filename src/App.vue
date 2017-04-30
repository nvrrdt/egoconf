<template>
  <div id="app">
    <div class="container">
      <link rel="stylesheet" type="text/css" href="/static/vue-instant.css">
      <div>
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/"><h1>ego</h1></a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 mr-auto">
              <vue-instant v-if="isAuthenticated" :suggestion-attribute="suggestionAttribute" v-model="value" :disabled="false"  @input="changed" @click-input="clickInput" @click-button="clickButton" @selected="selected"  @enter="enter" @key-up="keyUp" @key-down="keyDown" @key-right="keyRight" @clear="clear"  @escape="escape" :show-autocomplete="true" :autofocus="false" :suggestions="suggestions" name="customName" placeholder="Search for relatives" type="custom"></vue-instant>
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
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      firstname: this.getFirstName(),
      value: '',
      suggestionAttribute: 'original_title',
      suggestions: [],
      selectedEvent: ''
    }
  },
  props: {
    'type': {
      type: String,
      default: 'custom'
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
    clickInput: function () {
      this.selectedEvent = 'click input'
    },
    clickButton: function () {
      this.selectedEvent = 'click button'
    },
    selected: function () {
      this.selectedEvent = 'selection changed'
    },
    enter: function () {
      this.selectedEvent = 'enter'
    },
    keyUp: function () {
      this.selectedEvent = 'keyup pressed'
    },
    keyDown: function () {
      this.selectedEvent = 'keyDown pressed'
    },
    keyRight: function () {
      this.selectedEvent = 'keyRight pressed'
    },
    clear: function () {
      this.selectedEvent = 'clear input'
    },
    escape: function () {
      this.selectedEvent = 'escape'
    },
    changed: function () {
      var that = this
      this.suggestions = []
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' + this.value)
        .then(function (response) {
          response.data.results.forEach(function (a) {
            that.suggestions.push(a)
          })
        })
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
