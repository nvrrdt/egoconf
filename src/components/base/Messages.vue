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
            <p class="p-2 text-left">{{ message.messagekey }} From {{ message.messagevalue.from_userid }} involving quality {{ message.messagevalue.quality }} during {{ message.messagevalue.project }} project with grade {{ message.messagevalue.grade }} </p>
            
            <vue-form :state="formstate" @submit.prevent="onSubmit" v-model="formstate" class="p-2">

              <validate auto-label class="form-group required-field text-left" :class="">
                <div class="form-check choices">
                  <label class="form-check-label" @click="message.messagevalue.is_accepted = true">
                    <input class="form-check-input" type="radio" name="acception" v-model.lazy="message.messagevalue.is_accepted" value="true">
                    Message accepted!
                  </label>
                </div>
                <div class="form-check choices">
                  <label class="form-check-label" @click="message.messagevalue.is_accepted = false">
                    <input class="form-check-input" type="radio" name="acception" v-model.lazy="message.messagevalue.is_accepted" value="false">
                    No thanks, I hereby reject this message for following reason(s):
                  </label>
                  <div v-if="message.messagevalue.is_accepted === false" class="choices">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="">
                        It's an unknown sender
                      </label>
                    </div>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="">
                        It's an inappropriate quality
                      </label>
                    </div>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="">
                        It's an inappropriate project
                      </label>
                    </div>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="">
                        It's an inappropriate grade
                      </label>
                    </div>
                  </div>
                </div>

                <field-messages name="quality" show="$touched || $submitted" class="form-control-feedback">
                  <div slot="required" style="color: red">Quality is a required field</div>
                </field-messages>
              </validate>

              <validate auto-label class="form-group required-field" :class="">
                <label>Quality</label>
                <input type="text" name="quality" class="form-control" required v-model.lazy="message.quality" placeholder="Type in a quality you like to grade">

                <field-messages name="quality" show="$touched || $submitted" class="form-control-feedback">
                  <div slot="required" style="color: red">Quality is a required field</div>
                </field-messages>
              </validate>

              <validate auto-label class="form-group" :class="">
                <label>Project</label>
                <input type="text" name="project" class="form-control" v-model.lazy="message.project"  placeholder="Name the corresponding project">

                <field-messages auto-label name="project" show="$touched || $submitted" class="form-control-feedback">
                </field-messages>
              </validate>

              <validate auto-label class="form-group required-field" :class="">
                <label>Grade</label>
                <input type="number" name="grade" class="form-control" required v-model.lazy="message.grade" placeholder="Grade between 6 and 10" min="6" max="10">

                <field-messages auto-label name="grade" show="$touched || $submitted" class="form-control-feedback">
                  <div slot="required" style="color: red">Grade is a required field</div>
                  <div slot="min" style="color: red">Value must be greater or equal to 6</div>
                  <div slot="max" style="color: red">Value must be less than or equal to 10</div>
                </field-messages>
              </validate>

              <button type="submit" class="btn btn-primary">Submit</button>
            </vue-form>
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
    messages: []
  }),
  created: function () {
    this.getMessages()
  },
  methods: {
    getMessages () {
      var vm = this
      var userid = firebase.auth().currentUser.uid
      var myMessagesRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(userid).limitToLast(25)
      myMessagesRef.on('child_added', function (snapshot) {
        vm.messages.reverse()
        vm.messages.push({ messagekey: snapshot.key, messagevalue: snapshot.val() }) // TODO: comment this line and try to refactor the unwanted infinite loop
        vm.messages.reverse()
      })
    },
    onSubmit: function () {
      if (this.formstate.$invalid) {
        // alert user and exit early
        // return
      }
      // otherwise submit form
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
    margin-left:18px;
  }
</style>
