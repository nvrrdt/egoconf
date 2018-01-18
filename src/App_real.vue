<template>
  <div id="app">
    <div class="row no-gutters justify-content-center">
      <div class="col">
        <div v-if="isBanned" class="row justify-content-center">
          <h3 class="fewLines col-sm-12 col-md-12 col-lg-8 col-lg-5">Unfortunately you are banned from this website till {{ banEndsAt }}</h3>
        </div>
        <div v-else>
          <nav class="navbar navbar-expand-sm navbar-inverse bg-primary">
            <button class="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand text-light" :href="isAuthenticated ? '/base/messages' : '/'"><h1>egoconf</h1></a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <multiselect
                class="col-sm-12 col-md-7 col-lg-4 col-lg-3"
                v-if="isAuthenticated"
                v-model="selectedUser"
                id="ajax" 
                :custom-label="customLabel" 
                track-by="code" 
                placeholder="Search for acquaintances" 
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
              <h2 class="mx-auto"><strong>- DEMO -</strong></h2>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a v-if="isAuthenticated" class="nav-link text-light active" href="#" role="button" @click="openSettingsModal()" v-on:keyup.esc="closeSettingsModal">{{ firstname }}'s settings</a>
                </li>
                <li class="nav-item">
                  <a v-if="isAuthenticated" class="nav-link text-light active" href @click="signOut">Logout</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light active" href="https://github.com/egoconf/egoconf" target="_blank"><icon name="github" scale="2"></icon></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div>
          <router-view></router-view>
        </div>
        <div class="justify-content-center footer bg-primary">
          <p class="text-light">
            &copy; 2017-2018 egoconf -
            <a class="text-light" href="#" role="button" @click="openContactForm()" v-on:keyup.esc="closeContactForm"> contact -</a>
            <a class="text-light" href="#" role="button" @click="openDonationForm()" v-on:keyup.esc="closeDonationForm"> donate -</a>
            <a class="text-light" href="#" role="button" @click="openDisclaimerForm()" v-on:keyup.esc="closeDisclaimerForm"> disclaimer</a>
          </p>
        </div>
        <!-- Settings modal -->
        <div id="wrapper" v-on:keyup.esc="closeSettingsModal"> 
          <modal v-if="showSettingsModal"> 
            <h3 slot="header" class="modal-title">
              <button type="button" class="close" data-dismiss="modal" @click="closeSettingsModal()">&times;</button>
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
        <!-- Contactform modal -->
        <div id="wrapper" v-on:keyup.esc="closeContactForm"> 
          <modal v-if="showContactForm"> 
            <h3 slot="header" class="modal-title">
              <button type="button" class="close" data-dismiss="modal" @click="closeContactForm()">&times;</button>
              <h4>contact form</h4>
            </h3>
        
            <div slot="body" class="modal-body container">
              <vue-form :state="formstate_msg" @submit.prevent="sendContactMessage()" v-model="formstate_msg">

                <validate v-if="!isAuthenticated" auto-label class="form-group required-field" :class="">
                  <label>Email</label>
                  <input type="email" name="contact_email" class="form-control" required v-model.lazy="contact_email"></input>

                  <field-messages name="contact_email" show="$touched || $submitted" class="form-control-feedback">
                    <div slot="required" style="color: red">Email is a required field</div>
                    <div slot="email" style="color: red">Email is not valid</div>
                  </field-messages>
                </validate>

                <validate auto-label class="form-group required-field" :class="">
                  <label>Message</label>
                  <textarea rows="12" cols="80" name="contact_msg" class="form-control" required v-model.lazy="contact_msg"></textarea>

                  <field-messages name="contact_msg" show="$touched || $submitted" class="form-control-feedback">
                    <div slot="required" style="color: red">The message is required</div>
                  </field-messages>
                </validate>

                <button type="submit" class="btn btn-primary float-right">Submit</button>
              </vue-form>
            </div>

            <div slot="footer">
            </div>
          </modal>
        </div>
        <!-- Donationform modal -->
        <div id="wrapper" v-on:keyup.esc="closeDonationForm"> 
          <modal v-if="showDonationForm"> 
            <h3 slot="header" class="modal-title">
              <button type="button" class="close" data-dismiss="modal" @click="closeDonationForm()">&times;</button>
              <h4>Donation form</h4>
            </h3>
        
            <div slot="body" class="modal-body container">

                  <h5 class="text-left">
                    If you like the egoconf solution and if you are curious for future developments: please consider 
                    donating to allow fulltime development and perhaps an expansion of manpower.
                  </h5>
                  <div class="text-center">
                    <div>
                      <a href="https://www.patreon.com/nicoverrijdt"><img src="./assets/become_a_patron_button.png"></a>
                    </div>
                    <div>
                      <stripe-donations></stripe-donations>
                    </div>
                    <div>
                      <p style="padding-top:20px;">or donate bitcoin: <a class="text-primary">12efwwGSPKe5qm1CV8Ff7Bx4T8zWDcX65S</a></p>
                    </div>
                  </div>

            </div>

            <div slot="footer">
            </div>
          </modal>
        </div>
        <!-- Disclaimerform modal -->
        <div id="wrapper" v-on:keyup.esc="closeDisclaimerForm"> 
          <modal v-if="showDisclaimerForm"> 
            <h3 slot="header" class="modal-title">
              <button type="button" class="close" data-dismiss="modal" @click="closeDisclaimerForm()">&times;</button>
              <h4>Disclaimer</h4>
            </h3>
        
            <div slot="body" class="modal-body container">
              <p class="text-left">
                Egoconf, as is, is a demo (a poc or a prototype or an mvp) and could only experimentally be used, 
                which means that the gathered data will likely be deleted as needed.
              </p>
            </div>

            <div slot="footer">
            </div>
          </modal>
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
import StripeDonations from '@/components/StripeDonations'

export default {
  name: 'app',
  mixins: [VueForm],
  components: {
    Multiselect,
    Modal,
    StripeDonations
  },
  data () {
    return {
      formstate_handle: {},
      formstate_delete_account: {},
      formstate_msg: {},
      showSettingsModal: false,
      firstname: this.getFirstName(),
      selectedUser: [],
      suggest_users: [],
      isLoading: false,
      term: '',
      isBanned: false,
      banEndsAt: '',
      handle: this.getHandle(),
      showContactForm: false,
      contact_email: '',
      contact_msg: '',
      fulluser: '',
      showDonationForm: false,
      showDisclaimerForm: false
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
          vm.closeSettingsModal()
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
    // Settings
    openSettingsModal () {
      this.showSettingsModal = true
    },
    // Settings
    closeSettingsModal () {
      this.showSettingsModal = false
    },
    // Contact form
    sendContactMessage: function () {
      var user = firebase.auth().currentUser

      var vm = this

      if (user) {
        var userId = user.uid
        var userEmail = user.email

        firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
          console.log('user')

          firebase.database().ref('contactmessages/').push({
            fulluser: snapshot.val().firstname + ' ' + snapshot.val().lastname + ' - ' + snapshot.val().handle + ' - ',
            msg: vm.contact_msg,
            email: userEmail
          })
        })
      } else {
        console.log('no user')

        firebase.database().ref('contactmessages/').push({
          fulluser: '',
          msg: vm.contact_msg,
          email: vm.contact_email
        })
      }

      this.closeContactForm()
    },
    //
    openContactForm () {
      this.showContactForm = true
    },
    //
    closeContactForm () {
      this.showContactForm = false
    },
    //
    openDonationForm () {
      this.showDonationForm = true
    },
    //
    closeDonationForm () {
      this.showDonationForm = false
    },
    //
    openDisclaimerForm () {
      this.showDisclaimerForm = true
    },
    //
    closeDisclaimerForm () {
      this.showDisclaimerForm = false
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
      this.ajaxFindUser(query).then(response => {
        this.suggest_users = response
        this.isLoading = false
      })
    },
    // Autosuggest
    ajaxFindUser: function (query) {
      this.doSearch(this.buildQuery(query))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const results = this.suggest_users.filter((element, index, array) => {
            return element.firstname.toLowerCase().includes(query.toLowerCase()) || element.lastname.toLowerCase().includes(query.toLowerCase()) || element.handle.toLowerCase().includes(query.toLowerCase())
          })
          resolve(results)
        }, 1000)
      })
    },
    // Autosuggest
    customLabel (option) {
      return `${option.firstname} ${option.lastname} - ${option.handle}`
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

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 15px;
  }

/*  Extra small devices (portrait phones, less than 544px) No media query since this is the default in Bootstrap because it is "mobile first" */
h1 {font-size:1.5rem;} /*1rem = 16px*/
h2 {font-size:1.4rem;}
h3 {font-size:1.3rem;}
h4 {font-size:1.2rem;}
h5 {font-size:1.2rem;}
p {font-size:1.2rem;}
a {font-size:1.2rem;} /* TODO: when viewport sized typography works on all device, that or better should be implemented

/* Small devices (landscape phones, 544px and up) */
@media (min-width: 544px) {  
  h1 {font-size:2rem;} /*1rem = 16px*/
  h2 {font-size:1.9rem;}
  h3 {font-size:1.8rem;}
  h4 {font-size:1.7rem;}
  h5 {font-size:1.6rem;}
  p {font-size:1.6rem;}
  a {font-size:1.6rem;}
}
 
/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {  
  h1 {font-size:2.5rem;} /*1rem = 16px*/
  h2 {font-size:2.4rem;}
  h3 {font-size:2.3rem;}
  h4 {font-size:2.2rem;}
  h5 {font-size:2.1rem;}
  p {font-size:2rem;}
  a {font-size:2rem;}
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
  h1 {font-size:2.5rem;} /*1rem = 16px*/
  h2 {font-size:2.3rem;}
  h3 {font-size:2.1rem;}
  h4 {font-size:1.9rem;}
  h5 {font-size:1.7rem;}
  p {font-size:1rem;}
  a {font-size:1.4rem;}
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  
  h1 {font-size:2.8rem;} /*1rem = 16px*/
  h2 {font-size:2.4rem;}
  h3 {font-size:2rem;}
  h4 {font-size:1.8rem;}
  h5 {font-size:1.4rem;}
  p {font-size:1rem;}
  a {font-size:1.4rem;}   
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > .col,
  > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
