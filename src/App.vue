<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col">
          <div v-if="isBanned" class="row justify-content-center">
            <h3 class="fewLines col-sm-12 col-md-10 col-lg-7 col-lg-5">Unfortunately you are banned from this website till {{ banEndsAt }}</h3>
          </div>
          <div v-else>
            <nav class="navbar navbar-toggleable-sm navbar-inverse bg-primary">
              <button class="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                    <a v-if="isAuthenticated" class="nav-link active" href="#" role="button" @click="openModal()" v-on:keyup.esc="closeModal">{{ firstname }}'s settings</a>
                  </li>
                  <li class="nav-item">
                    <a v-if="isAuthenticated" class="nav-link active" href @click="signOut">Logout</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="https://github.com/egoconf/egoconf" target="_blank"><icon name="github" scale="2"></icon></a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="row justify-content-center">
            <router-view class="col-sm-12 col-md-10 col-lg-7 col-lg-5"></router-view>
          </div>
          <div id="wrapper" v-on:keyup.esc="closeModal"> 
            <modal v-if="showModal"> 
              <h3 slot="header" class="modal-title">
                <button type="button" class="close" data-dismiss="modal" @click="closeModal()">&times;</button>
                <h4>Settings</h4>
              </h3>
              
              <div slot="body" class="modal-body container">
                <p>Change handle:
                  <vue-form :state="formstate_handle" @submit.prevent="setHandle()" v-model="formstate_handle" class="p-2">
                    <div class="form-inline">
                      <div class="form-check">
                        <validate auto-label class="form-group text-left" :class="">
                          <input class="form-check-input form-control" type="text" name="changeHandle" v-model.lazy="handle" :value="handle">
                        </validate>
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </vue-form>
                </p>
                <!-- TODO <p>Change password
                <vue-form :state="formstate" @submit.prevent="changePassword()" v-model="formstate" class="p-2">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </vue-form>
                </p> -->
                <p class="form-inline">Delete account:
                  <vue-form :state="formstate_delete_account" @submit.prevent="deleteAccount()" v-model="formstate_delete_account" class="p-2">
                    <button type="submit" class="btn btn-danger">DEL</button>
                  </vue-form>
                </p>
              </div>

              <div slot="footer">
              </div>
            </modal>
          </div>
        </div>
      </div>
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
import Modal from '@/components/Modal' // taken from JuneRockwell/BootstrapVueModal
import VueForm from 'vue-form'

export default {
  name: 'app',
  mixins: [VueForm],
  components: {
    Multiselect,
    Modal
  },
  data () {
    return {
      formstate_handle: {},
      formstate_delete_account: {},
      showModal: false,
      firstname: this.getFirstName(),
      selectedUser: [],
      suggest_users: [],
      isLoading: false,
      term: '',
      isBanned: false,
      banEndsAt: '',
      handle: this.getHandle()
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
  created: function () {
    this.setBanned()
  },
  methods: {
    // Settings
    // TODO: put settings in Settings.vue
    deleteAccount: function () {
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userId = user.uid

          var myMsgsToRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(userId)
          myMsgsToRef.once('value', function (snapshot) {
            snapshot.ref.remove()
          })

          var myMsgsFromRef = firebase.database().ref('messages').orderByChild('from_userid').equalTo(userId)
          myMsgsFromRef.once('value', function (snapshot) {
            snapshot.ref.remove()
          })

          var myUserRef = firebase.database().ref('/users/' + userId)
          myUserRef.once('value', function (snapshot) {
            snapshot.ref.remove()
          })

          firebase.auth().currentUser.delete()
        } else {
          vm.closeModal()
          router.push({ name: 'EgoHome' })
        }
      })
    },
    // Settings
    getHandle: function () {
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userId = user.uid

          firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            vm.handle = snapshot.val().handle
          })

          return vm.handle
        } else {
          return 'hemel1'
        }
      })
    },
    // Settings
    setHandle: function () {
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userId = user.uid
          var userRef = firebase.database().ref('users/' + userId)

          userRef.update({handle: vm.handle})
        }
      })
    },
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    // TODO: isBanned is untested!!!
    setBanned () {
      var banCount = -1
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userId = user.uid

          firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            banCount = snapshot.val().ban_count
            if (snapshot.val().ban_ends_at) {
              vm.banEndsAt = snapshot.val().ban_ends_at
            }
          })

          if (banCount > 0) {
            this.isBanned = true
          }
        }
      })
    },
    // Settings
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
    // Autosuggest
    limitText (count) {
      return `and ${count} other users`
    },
    // Autosuggest
    buildQueryBody: function (query, term, matchWholePhrase) {
      if (matchWholePhrase) {
        var body = query.body = {}
        body.query = {
          // Classic Search-Box Style Full-Text Query
          // TODO: for now it works, but see completion suggester below
          'query_string': {
            'query': term + '*'
          }
        }
        // Completion suggester
        /*  'suggest': {
            'user-suggest': {
              'prefix': term,
              'completion': {
                'field': 'suggest'
              }
            }
          }
        } */
      } else {
        query.q = term
      }
    },
    // Autosuggest
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
    // Autosuggest
    // conduct a search by writing it to the search/request path
    doSearch: function (query) {
      var ref = firebase.database().ref('search')
      var key = ref.child('request').push(query).key

      ref.child('response/' + key).on('value', this.showResults)
    },
    // Autosuggest
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
    // Autosuggest
    asyncFind (query) {
      this.isLoading = true
      this.ajaxFindCountry(query).then(response => {
        this.suggest_users = response
        this.isLoading = false
      })
    },
    // Autosuggest
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
  .fewLines {
    margin-top: 60px;
  }
  #wrapper {
    margin-top: 10px;
  }
  .modal-title {
    width: 100%;
  }
  .modal-body {
    text-align: left;
  }
  #primary-nav {
    background-color: skyblue;
  }
  .container-fluid { 
    padding: 0px;
  }
</style>
