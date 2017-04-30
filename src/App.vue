<template>
  <div id="app">
    <div class="container">
      <div>
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/"><h1>ego</h1></a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 mr-auto">
              <input v-if="isAuthenticated" class="form-control mr-sm-2" type="text" placeholder="Search for relatives">
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

export default {
  name: 'app',
  data () {
    return {
      firstname: this.getFirstName()
    }
  },
  methods: {
    getFirstName: function () {
      var user = firebase.auth().currentUser

      if (user) {
        var userId = user.uid
        var vm = this

        firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
          vm.firstname = snapshot.val().firstname
        })

        return vm.firstname
      } else {
        return 'hemel'
      }
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
