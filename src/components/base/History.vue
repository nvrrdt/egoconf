<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize active" href="/base/history" role="button">History</a>
    </div>
    <div>
      <ul style="margin-top: 35px;">
        <li v-for="message in messages" :key="message.messagekey" v-if="message.messagevalue.is_accepted">
          <div class="text-left message">
            <p>{{ message.messagevalue.from_userid }} accepted your message, where you give {{ message.messagevalue.grade }} points for the '{{ message.messagevalue.quality }}' quality during the '{{ message.messagevalue.project }}' project</p>
          </div>  
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
// import {db} from '@/firebase'
import store from '@/store'

export default {
  data: () => ({
    messages: store.getMessages(),
    message: {}
  }),
  created: function () {
    this.getMessages()
  },
  methods: {
    getMessages () {
      var userid = firebase.auth().currentUser.uid
      var myMessagesRef = firebase.database().ref('messages').orderByChild('from_userid').equalTo(userid)
      myMessagesRef.on('child_added', function (snapshot) {
        var dict = { messagekey: snapshot.key, messagevalue: snapshot.val(), isCollapsed: false }
        store.setMessages(dict)
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
</style>
