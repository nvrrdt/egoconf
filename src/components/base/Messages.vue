<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize active" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div>
      <ul class="list-unstyled">
        <li v-for="message in messages" :key="message.messagekey">
          <div class="d-flex flex-column message">
            <a class="p-2 text-left"  @click="toggleCollapse(message)" href="#">
              <icon v-if="message.isCollapsed || !message.messagevalue.timestamp_reaction" name="minus-square-o" scale="1"></icon>
              <icon v-else name="plus-square-o" scale="1"></icon>&nbsp;&nbsp;
              <icon v-if="message.messagevalue.timestamp_reaction" name="envelope-open-o" scale="1"></icon>
              <icon v-else name="envelope-o" scale="1"></icon>
               Message from {{ message.messagevalue.from_userid }} who gives {{ message.messagevalue.grade }} points for the '{{ message.messagevalue.quality }}' quality during the '{{ message.messagevalue.project }}' project
            </a>
            <div v-if="message.isCollapsed || !message.messagevalue.timestamp_reaction">
              <vue-form :state="formstate" @submit.prevent="onSubmit(message)" v-model="formstate" class="p-2">
                <div class="form-check choices">
                  <validate auto-label class="form-group text-left" :class="">
                    <label class="form-check-label" @click="acceptIsTrue(message)">
                      <input class="form-check-input" type="radio" name="acception" v-model.lazy="message.messagevalue.is_accepted" value="true">
                      Message accepted!
                    </label>
                  </validate>
                </div>
                <div class="form-check choices">
                  <validate auto-label class="form-group text-left" :class="">
                    <label class="form-check-label" @click="message.messagevalue.is_accepted = false">
                      <input class="form-check-input" type="radio" name="acception" v-model.lazy="message.messagevalue.is_accepted" value="false">
                      No thanks, message rejected for following reason(s):
                    </label>
                  </validate>
                  <div v-if="message.messagevalue.is_accepted === false" class="choices">
                    <div class="form-check">
                      <validate auto-label class="form-group text-left" :class="">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="message.messagevalue.is_unknown_sender" value="">
                          It's an unknown sender
                        </label>
                      </validate>
                    </div>
                    <div class="form-check">
                      <validate auto-label class="form-group text-left" :class="">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="message.messagevalue.is_inappropriate_quality" value="">
                          It's an inappropriate quality
                        </label>
                      </validate>
                    </div>
                    <div class="form-check">
                      <validate auto-label class="form-group text-left" :class="">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="message.messagevalue.is_inappropriate_project" value="">
                          It's an inappropriate project
                        </label>
                      </validate>
                    </div>
                    <div class="form-check">
                      <validate auto-label class="form-group text-left" :class="">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="message.messagevalue.is_inappropriate_grade" value="">
                          It's an inappropriate grade
                        </label>
                      </validate>
                    </div>
                    <div v-if="showError(message)" style="color: red" class="text-left">Choose at least one of the underlying fields</div>
                  </div>
                </div>
                <button v-if="hideSubmit(message)" type="submit" class="btn btn-primary">Submit</button>
              </vue-form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
// import {db} from '@/firebase'
import VueForm from 'vue-form'

export default {
  mixins: [VueForm],
  data: () => ({
    formstate: {},
    messages: [],
    message: {}
  }),
  created: function () {
    this.getMessages()
  },
  methods: {
    toggleCollapse (message) {
      if (message.isCollapsed) {
        message.isCollapsed = false
      } else {
        message.isCollapsed = true
      }
    },
    acceptIsTrue (message) {
      message.messagevalue.is_accepted = true
      message.messagevalue.is_unknown_sender = false
      message.messagevalue.is_inappropriate_quality = false
      message.messagevalue.is_inappropriate_project = false
      message.messagevalue.is_inappropriate_grade = false
    },
    showError (message) {
      if (message.messagevalue.is_accepted === '') {
        return false
      } else if (message.messagevalue.is_accepted === false) {
        if (message.messagevalue.is_unknown_sender === true || message.messagevalue.is_inappropriate_quality === true || message.messagevalue.is_inappropriate_project === true || message.messagevalue.is_inappropriate_grade === true) {
          return false
        }
        return true
      } else {
        return false
      }
    },
    hideSubmit (message) {
      if (message.messagevalue.is_accepted === true) {
        return true
      } else if (message.messagevalue.is_accepted === false) {
        if (message.messagevalue.is_unknown_sender === true || message.messagevalue.is_inappropriate_quality === true || message.messagevalue.is_inappropriate_project === true || message.messagevalue.is_inappropriate_grade === true) {
          return true
        }
        return false
      } else {
        return false
      }
    },
    getMessages () {
      var vm = this
      var userid = firebase.auth().currentUser.uid
      var myMessagesRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(userid).limitToLast(25)
      myMessagesRef.on('child_added', function (snapshot) {
        vm.messages.reverse()
        vm.messages.push({ messagekey: snapshot.key, messagevalue: snapshot.val(), isCollapsed: false }) // TODO: comment this line and try to refactor the unwanted infinite loop; TODO: create an object and forget messagekey and messagevalue
        vm.messages.reverse()
      })
    },
    onSubmit: function (message) {
      if (this.formstate.$invalid) {
        // alert user and exit early
        // return
      } else {
        this.message.timestamp_reaction = firebase.database.ServerValue.TIMESTAMP
        this.message.is_accepted = message.messagevalue.is_accepted
        this.message.is_unknown_sender = message.messagevalue.is_unknown_sender
        this.message.is_inappropriate_quality = message.messagevalue.is_inappropriate_project
        this.message.is_inappropriate_project = message.messagevalue.is_inappropriate_quality
        this.message.is_inappropriate_grade = message.messagevalue.is_inappropriate_grade

        var msgRef = firebase.database().ref('messages/' + message.messagekey)

        msgRef.update(this.message)

        // hide the submitted panel, don't know if toggle works though
        if (message.messagevalue.timestamp_reaction === '') {
          message.messagevalue.timestamp_reaction = true
          console.log('no toggle')
        } else {
          this.toggleCollapse(message)
          console.log('toggle')
        }

        // TODO: maybe below lines are not necessary
        this.message.timestamp_reaction = ''
        this.message.is_accepted = ''
        this.message.is_unknown_sender = ''
        this.message.is_inappropriate_quality = ''
        this.message.is_inappropriate_project = ''
        this.message.is_inappropriate_grade = ''
      }
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
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .message {
    margin-top:5px;
    margin-right:5px;
    margin-bottom:5px;
    margin-left:5px;
    border:1px solid lightgrey;
  }
  .choices {
    margin-left:25px;
  }
</style>
