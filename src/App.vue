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
            <div class="my-2 my-lg-0 mr-auto">
                <multiselect 
                  v-model="selectedCountries" 
                  id="ajax" 
                  label="name" 
                  track-by="code" 
                  placeholder="Type to search" 
                  :options="countries" 
                  :multiple="false" 
                  :searchable="true" 
                  :loading="isLoading" 
                  :internal-search="false" 
                  :clear-on-select="true" 
                  :close-on-select="true" 
                  :options-limit="300" 
                  :limit="3" 
                  :limit-text="limitText" 
                  @search-change="asyncFind">
                  <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                </multiselect>
                <pre class="language-json"><code>{{ selectedCountries  }}</code></pre>
            </div>
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
// import * as env from '@/../.env.js'
import Multiselect from 'vue-multiselect'
import { ajaxFindCountry } from './countriesApi'

export default {
  name: 'app',
  components: { Multiselect },
  data () {
    return {
      firstname: this.getFirstName(),
      selectedCountries: [],
      countries: [],
      isLoading: false
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
    limitText (count) {
      return `and ${count} other countries`
    },
    asyncFind (query) {
      this.isLoading = true
      ajaxFindCountry(query).then(response => {
        this.countries = response
        this.isLoading = false
      })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }


</style>
