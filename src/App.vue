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
                  v-if="isAuthenticated"
                  v-model="selectedUser" 
                  id="ajax" 
                  label="firstname" 
                  track-by="code" 
                  placeholder="Search for relatives" 
                  :options="suggest_users" 
                  :multiple="false" 
                  :searchable="true" 
                  :loading="isLoading" 
                  :internal-search="false" 
                  :clear-on-select="true"
                  :hideSelected="true"
                  :resetAfter="true"
                  :close-on-select="true"
                  :allowEmpty="false"
                  deselectLabel=""
                  :options-limit="300" 
                  :limit="10" 
                  :limit-text="limitText" 
                  @search-change="asyncFind">
                  <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                </multiselect>
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
import router from '@/router'
import store from '@/store'

export default {
  name: 'app',
  components: { Multiselect },
  data () {
    return {
      firstname: this.getFirstName(),
      selectedUser: [],
      suggest_users: [],
      isLoading: false,
      term: ''
    }
  },
  watch: {
    selectedUser: function () {
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user && user.uid === vm.selectedUser.userid) {
          router.push({ name: 'BaseProfile' })
        } else {
          store.setSearchedUserid(vm.selectedUser.userid)
          store.setSearchedFirstname(vm.selectedUser.firstname)
          store.setSearchedLastname(vm.selectedUser.lastname)
          store.setSearchedHandle(vm.selectedUser.handle)
          router.push({ name: 'BaseProfile' }) // this line is needed to insert data in BaseExplore when there' no data, it's a dirty hack
          router.push({ name: 'BaseExplore' })
        }
      })
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
      return `and ${count} other users`
    },

    buildQueryBody: function (query, term, matchWholePhrase) {
      if (matchWholePhrase) {
        var body = query.body = {}
        body.query = {
          // match_phrase matches the phrase exactly instead of breaking it
          // into individual words
          'match_phrase': {
            // this is the field name, _all is a meta indicating any field
            '_all': term
          }
        }
      } else {
        query.q = term
      }
    },

    buildQuery: function (searchTerm) {
      // this just gets data out of the form
      var index = 'firebase'
      var type = 'user'
      var term = searchTerm
      var matchWholePhrase = true

      // skeleton of the JSON object we will write to DB
      var query = {
        index: index,
        type: type
      }

      this.buildQueryBody(query, term, matchWholePhrase)

      return query
    },

    // conduct a search by writing it to the search/request path
    doSearch: function (query) {
      var ref = firebase.database().ref('search')
      var key = ref.child('request').push(query).key

      ref.child('response/' + key).on('value', this.showResults)
    },

    // when results are written to the database, read them and display
    showResults: function (snap) {
      if (!snap.exists()) { return } // wait until we get data
      var results = snap.val().hits.hits

      var list = []

      for (var res in results) {
        list.push({
          userid: results[res]._id,
          firstname: results[res]._source.firstname,
          lastname: results[res]._source.lastname,
          handle: results[res]._source.handle
        })
      }

      // when a value arrives from the database, stop listening
      // and remove the temporary data from the database
      snap.ref.off('value', this.showResults)
      snap.ref.remove()

      this.suggest_users = list
    },

    asyncFind (query) {
      this.isLoading = true
      this.ajaxFindCountry(query).then(response => {
        this.suggest_users = response
        this.isLoading = false
      })
    },

    ajaxFindCountry: function (query) {
      this.doSearch(this.buildQuery(query))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const results = this.suggest_users.filter((element, index, array) => {
            console.log('change here something for the improved autocomplete/suggest')
            return element.firstname.toLowerCase().includes(query.toLowerCase()) || element.lastname.toLowerCase().includes(query.toLowerCase()) || element.handle.toLowerCase().includes(query.toLowerCase())
          })
          resolve(results)
        }, 1000)
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
