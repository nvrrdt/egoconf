<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize active" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div v-if="!searchedFirstname">
      <h3 class="fewLines">Search for a relative to explore that person's profile</h3>
    </div>
    <div v-else-if="isBlocked">
      <div class="fewLines">
        <h3>Unfortunately you are blocked by this user</h3>
        <h5>The block will be abolished till {{ endBlockAt }}</h5>
      </div>
    </div>
    <div v-else>
      <div class="presentation">
          <h3>Userprofile from:</h3>
          <p>Name: {{ searchedFirstname }} {{ searchedLastname }}</p>
          <p>Handle: {{ searchedHandle }}</p>
      </div> 
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
        <button type="button" class="btn btn-primary btnspacing" @click="openModal()">Grade a quality</button>
      </div>
      <div>
        <stats></stats>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
import Modal from '@/components/Modal' // taken from JuneRockwell/BootstrapVueModal
import VueForm from 'vue-form'
import store from '@/store'
import Stats from '@/components/base/ExploreStatistics'

var messagesRef = firebase.database().ref('messages')

export default {
  mixins: [VueForm],
  components: {
    Modal,
    Stats
  },
  data () {
    return {
      showModal: false,
      formstate: {},
      message: {
        from_userid: '',
        to_userid: '',
        init_userid: '',
        quality: '',
        project: '',
        grade: '',
        timestamp_created: '',
        timestamp_reaction: '',
        is_ask: '',
        is_accepted: '',
        is_unknown_sender: '',
        is_inappropriate_quality: '',
        is_inappropriate_project: '',
        is_inappropriate_grade: ''
      },
      searchedFirstname: '',
      searchedLastname: '',
      searchedHandle: '',
      searchedUserid: '',
      isBlocked: false,
      endBlockAt: ''
    }
  },
  firebase: {
    messages: messagesRef
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
    this.setBlocked()
  },
  updated () {
    this.setBlocked()
  },
  watch: {
    // call again the method if the route changes
    '$route': ['fetchData', 'setBlocked']
  },
  methods: {
    // TODO: put constraints in constraints.js, that's more clean
    // TODO: please refactor this function
    setBlocked () {
      var vm = this
      var count = 0
      var lastBlockDate = 0

      if (this.searchedUserid) {
        var myMsgsRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(this.searchedUserid)
        myMsgsRef.once('value', function (snapshot) {
          if (snapshot.val()) {
            for (var i in snapshot.val()) {
              var val = snapshot.val()[i]

              var lastMonthDate = new Date()
              lastMonthDate = new Date(lastMonthDate.setTime(lastMonthDate.getTime() - 28 * 86400000)) // 28 days earlier
              // count must go up only in last month and when a message is rejected
              if ((val.is_unknown_sender || val.is_inappropriate_quality || val.is_inappropriate_project || val.is_inappropriate_grade) && val.timestamp_reaction > lastMonthDate.getTime()) {
                count++
                if (val.timestamp_reaction > lastBlockDate) {
                  lastBlockDate = val.timestamp_reaction // last reaction must be remembered
                }
              }
            }
          }

          var now = new Date()

          lastBlockDate = new Date(lastBlockDate)
          var dueDate = new Date(lastBlockDate.setTime(lastBlockDate.getTime() + 14 * 86400000)) // 14 days later

          var dd = dueDate.getDate()
          var mm = dueDate.getMonth() + 1 // January is 0!
          var yyyy = dueDate.getFullYear()

          if (dd < 10) {
            dd = '0' + dd
          }

          if (mm < 10) {
            mm = '0' + mm
          }

          var dueString = dd + '/' + mm + '/' + yyyy

          if (count > 3 && now < dueDate) {
            vm.isBlocked = true
            vm.endBlockAt = dueString
          }
        })
      }
    },

    // get data from store
    fetchData () {
      this.searchedFirstname = store.getSearchedFirstname()
      this.searchedLastname = store.getSearchedLastname()
      this.searchedHandle = store.getSearchedHandle()
      this.searchedUserid = store.getSearchedUserid()
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
      } else {
        // otherwise submit form
        var user = firebase.auth().currentUser

        this.message.from_userid = user.uid
        this.message.to_userid = store.getSearchedUserid()
        this.message.init_userid = this.message.from_userid
        this.message.timestamp_created = firebase.database.ServerValue.TIMESTAMP

        if (this.message.from_userid !== '') {
          messagesRef.push(this.message)

          this.message.from_userid = ''
          this.message.to_userid = ''
          this.message.init_userid = ''
          this.message.quality = ''
          this.message.project = ''
          this.message.grade = ''
          this.message.timestamp_created = ''
          this.message.timestamp_reaction = ''
          this.message.is_ask = ''
          this.message.is_accepted = ''
          this.message.is_unknown_sender = ''
          this.message.is_inappropriate_quality = ''
          this.message.is_inappropriate_project = ''
          this.message.is_inappropriate_grade = ''

          this.closeModal()
          this.formstate._reset()
        }
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
  .presentation {
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .btnspacing {
    margin-bottom: 40px;
  }
  .fewLines {
    margin-top: 60px;
  }
</style>
