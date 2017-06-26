<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize active" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div class="presentation">
      <h3>My profile:</h3>
      <h5>{{ coordinates.firstname }} {{ coordinates.lastname }}, {{ coordinates.handle }}</h5>
    </div>
    <div>
      <stats></stats>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
import Stats from '@/components/Statistics'

export default {
  data () {
    return {
      coordinates: {}
    }
  },
  components: {
    Stats
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
  .presentation {
    margin-top: 20px;
    margin-bottom: 45px;
  }
</style>
