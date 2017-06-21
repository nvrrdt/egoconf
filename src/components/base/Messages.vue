<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize active" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div>
      <ul>
        <li v-for="message in messages">
          <p>From {{ message.from_userid }} involving quality {{ message.quality }} during {{ message.project }} project with grade {{ message.grade }} </p>
        </li>
      </ul>
    </div>
    <div>
      <div id="wrapper" v-on:keyup.esc="closeModal"> 
        <modal v-if="showModal"> 
          <h3 slot="header" class="modal-title">
            <button type="button" class="close" data-dismiss="modal" @click="closeModal()">&times;</button>
            <h4>Grade a quality</h4>
          </h3>
          <div slot="body" class="modal-body container">
            <vue-form :state="formstate" @submit.prevent="onSubmit" v-model="formstate">

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

              <button type="submit" class="btn btn-primary float-right">Submit</button>
            </vue-form>
          </div>

          <div slot="footer">
          </div>
        </modal>
        <button type="button" class="btn btn-primary" @click="openModal()">Grade a quality</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
// import {db} from '@/firebase'
import Modal from '@/components/Modal' // taken from JuneRockwell/BootstrapVueModal
import VueForm from 'vue-form'

export default {
  mixins: [VueForm],
  components: {
    Modal
  },
  data: () => ({
    showModal: false,
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
        vm.messages.push(snapshot.val())
        vm.messages.reverse()
      })
    },
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
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
  #wrapper {
    margin-top: 10px;
  }
  .modal-title {
    width: 100%;
  }
  .modal-body {
    text-align: left;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
</style>
