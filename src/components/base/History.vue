<template>
  <div class="row justify-content-center">
    <div class="col col-sm-12 col-md-10 col-lg-7 col-lg-5">
      <div class="base">
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <a class="btn btn-outline-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
          <a class="btn btn-outline-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
          <a class="btn btn-outline-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
          <a class="btn btn-outline-secondary text-capitalize active" href="/base/history" role="button">History</a>
        </div>
        <div>
          <ul style="margin-top: 35px;">
            <li v-for="message in messages" :key="message.messagekey" v-if="message.value.is_accepted">
              <div class="text-left message">
                <p>
                  <strong>{{ getFullname(message.value.to_userid) }}</strong> accepted your message, your
                  <strong>'{{ message.value.quality }}'</strong> gets <strong>{{ message.value.grade }}/10 ({{ message.value.project }})</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
// import {db} from '@/firebase'

export default {
  data: () => ({
    messages: [],
    fullnames: []
  }),
  created: function () {
    this.getMessages()
  },
  methods: {
    getFullname (userId) {
      for (var fname in this.fullnames) {
        if (this.fullnames[fname].key === userId) {
          return this.fullnames[fname].value
        }
      }
    },
    // make list of fullnames
    setFullnames (messages) {
      for (var msg in messages) {
        var vm = this
        firebase.database().ref('/users/' + messages[msg].value.to_userid).once('value').then(function (snapshot) {
          vm.fullnames.push({key: snapshot.key, value: snapshot.val().firstname + ' ' + snapshot.val().lastname})
        })
      }
    },
    getMessages () {
      var vm = this
      var userid = firebase.auth().currentUser.uid
      var myMessagesRef = firebase.database().ref('messages').orderByChild('from_userid').equalTo(userid)
      myMessagesRef.once('value', function (snapshot) {
        for (var i in snapshot.val()) {
          if (vm.messages === '') {
            vm.messages.push({key: i, value: snapshot.val()[i], isCollapsed: false})
          } else {
            vm.messages.reverse()
            vm.messages.push({key: i, value: snapshot.val()[i], isCollapsed: false})
            vm.messages.reverse()
          }
        }

        vm.setFullnames(vm.messages)
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
  .message {
    margin-top:5px;
    margin-bottom:5px;
  }

  .base {
    height: 89vh;
  }
</style>
