<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize active" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div>
      <p>{{ coordinates['firstname'] }}</p>
      <p>{{ coordinates.lastname }}</p>
      <p>{{ coordinates.handle }}</p>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'

export default {
  data () {
    return {
      coordinates: {}
    }
  },
  created () {
    this.getCoordinates()
  },
  methods: {
    getCoordinates: function () {
      var vm = this

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userId = user.uid

          firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            vm.coordinates = snapshot.val()
          })

          return vm.coordinates
        } else {
          return 'hemel'
        }
      })
    }
  }
}
</script>
<style>
  .btn{
    margin-top:10px;
    margin-right:10px;
    margin-bottom:10px;
    margin-left:10px;
  }
</style>
