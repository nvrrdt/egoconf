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
              <input class="form-control mr-sm-2" type="text" placeholder="Search for relatives">
            </form>
            <h2>This is a demo!</h2>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#">Nico's settings</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active"  @click="signOut" href>Logout</a>
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
import router from '@/router'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    /**
     * Authenticate the user
     *
     * @param object event
     */
    login: function (event) {
      var vm = this
      vm.auth.message = ''
      vm.auth.hasErrors = false

      if (vm.auth.email === '' || vm.auth.password === '') {
        alert('Please provide the email and password')
        return
      }
      // Sign-in the user with the email and password
      firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
        .then(function (data) {
          vm.auth.user = firebase.auth().currentUser
        }).catch(function (error) {
          vm.auth.message = error.message
          vm.auth.hasErrors = true
        })
    },

    /**
     * Create a new user account
     *
     * @param object event
     */
    signUp: function (event) {
      var vm = this
      vm.auth.message = ''
      vm.auth.hasErrors = false

      if (vm.auth.email === '' || vm.auth.password === '') {
        alert('Please provide the email and password')
        return
      }

      // Create a new user in firebase
      firebase.auth().createUserWithEmailAndPassword(vm.auth.email, vm.auth.password)
        .then(function (data) {
          vm.auth.message = 'Successfully created user'
          vm.auth.user = firebase.auth().currentUser
          vm.auth.email = ''
          vm.auth.password = ''
        }).catch(function (error) {
          vm.auth.message = error.message
          vm.auth.hasErrors = true
        })
    },

    /**
     * Signout the currently logged-in user
     */
    signOut: function () {
      // Signout the user using firebase
      firebase.auth().signOut()
        .then(function (error) {
          this.auth.user = firebase.auth().currentUser
          this.auth.message = 'User signed out Successfully'
          console.log(error)
        }.bind(this), function (error) {
          alert('Failed to signout user, try again later')
          console.log(error)
        })
      router.push({ name: 'AccountLogin' })
    },

    /**
     * Update the user profile details.
     */
    updateProfile: function () {
      if (this.auth.userName === '') {
        alert('Please provide a username to update.')
        return
      }

      var user = firebase.auth().currentUser
      var vm = this

      user.updateProfile({
        displayName: vm.auth.userName
      }).then(function () {
        vm.auth.message = 'Successfully udpated user profile.'
      }, function (error) {
        vm.auth.message = 'Failed to update user profile.'
        vm.auth.hasErrors = true
        console.log(error)
      })
    },

    /**
     * Dismiss the alert message
     */
    dismissAlert: function () {
      this.auth.message = ''
      this.auth.hasErrors = false
    },

    /**
     * Display name computed property
     */
    displayName: function () {
      return this.auth.user.displayName ? this.auth.user.displayName : this.auth.user.email
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
