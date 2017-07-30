import * as firebase from 'firebase'
import {db} from '@/firebase'
import router from '@/router'

const AuthPlugin = {
  install (Vue, options) {
    Vue.mixin({
      data: function () {
        return {
          auth: {
            user: null,
            email: '',
            password: '',
            message: '',
            userName: '',
            hasErrors: false
          },
          users: {},
          user: null,
          firstname: '',
          lastname: '',
          handle: '',
          suggest: [],
          no_reaction_yet_count: '',
          ban_count: '',
          inappropriate_count: '',
          ban_ends_at: '',
          timestamp: ''
        }
      },
      firebase: {
        users: {
          source: db.ref('users'),
          // Optional, allows you to handle any errors.
          cancelCallback (err) {
            console.error(err)
          }
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
              router.push({ name: 'BaseMessages' })
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
        signup: function (event) {
          var vm = this
          vm.auth.message = ''
          vm.auth.hasErrors = false

          if (vm.auth.email === '' || vm.auth.password === '' || vm.auth.password2 === '') {
            alert('Please provide the email and password')
            return
          }

          if (vm.auth.password !== vm.auth.password2) {
            alert('Those are two different passwords')
            return
          }

          if (vm.firstname === '') {
            alert('Please provide your first name')
            return
          }

          if (vm.lastname === '') {
            alert('Please provide your last name')
            return
          }

          if (vm.handle === '') {
            alert('Please provide a handle')
            return
          }

          // Create a new user in firebase
          firebase.auth().createUserWithEmailAndPassword(vm.auth.email, vm.auth.password)
            .then(function (methods) {
              vm.addUser()
            })
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
          console.log('signout auth')
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
        },

        addUser: function () {
          var user = firebase.auth().currentUser

          this.suggest.push(this.firstname)
          this.suggest.push(this.lastname)
          var handleSplit = this.handle.split(' ')
          handleSplit.forEach(function (element) {
            this.suggest.push(element)
          }, this)

          console.log(this.suggest)

          firebase.database().ref('users/' + user.uid).set({
            firstname: this.firstname,
            lastname: this.lastname,
            handle: this.handle,
            suggest: this.suggest,
            no_reaction_yet_count: 0,
            ban_count: 0,
            inappropriate_count: 0,
            ban_ends_at: '',
            timestamp: firebase.database.ServerValue.TIMESTAMP

          })

          router.push({ name: 'BaseMessages' })
        }
      },
      computed: {
        /**
         * Determines if the user is authenticated
         *
         * @return boolean
         */
        isAuthenticated: function () {
          // This function changes the auth.user state when
          // the auth status of user changes.
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              this.auth.user = user
            } else {
              this.auth.user = null
            }
          }.bind(this))

          return (this.auth.user !== null)
        }
        /**
         *
         *
         */
      }
    })
  }
}

export default AuthPlugin
