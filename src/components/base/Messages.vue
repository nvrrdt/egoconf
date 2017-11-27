<template>
  <div class="row justify-content-center">
    <div class="col col-sm-12 col-md-10 col-lg-7 col-lg-5">
      <div class="base">
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <a class="btn btn-outline-secondary text-capitalize active" href="/base/messages" role="button">Messages</a>
          <a class="btn btn-outline-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
          <a class="btn btn-outline-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
          <a class="btn btn-outline-secondary text-capitalize" href="/base/history" role="button">History</a>
        </div>
        <div>
          <div v-if="!messages.length">
            <h3 class="fewLines">Someone needs to grade one of your qualities. Feel free to search for a acquaintances.</h3>
          </div>
          <div v-else>
            <ul class="list-unstyled">
              <li v-for="msg in messages" :key="msg.key">
                <div class="d-flex flex-column message">
                  <a class="p-2 text-left"  @click="toggleCollapse(msg)" href="#">
                    <icon v-if="msg.isCollapsed|| !msg.value.timestamp_reaction" name="minus-square-o" scale="1"></icon>
                    <icon v-else name="plus-square-o" scale="1"></icon>&nbsp;&nbsp;
                    <icon v-if="msg.value.timestamp_reaction" name="envelope-open-o" scale="1"></icon>
                    <icon v-else name="envelope-o" scale="1"></icon>
                    Message from {{ getFullname(msg.value.from_userid) }} who gives {{ msg.value.grade }} points for the '{{ msg.value.quality }}' quality during the '{{ msg.value.project }}' project
                  </a>
                  <div v-if="setCollapse(msg)">
                    <vue-form :state="formstate" @submit.prevent="onSubmit(msg.value, msg.key, msg)" v-model="formstate" class="p-2">
                      <div class="form-check choices">
                        <validate auto-label class="form-group text-left" :class="">
                          <label class="form-check-label" @click="acceptIsTrue(msg.value, msg.key)">
                            <input class="form-check-input" type="radio" name="acception" v-model.lazy="msg.value.is_accepted" :value="setCollapse(msg)">
                            Message accepted!
                          </label>
                        </validate>
                      </div>
                      <div class="form-check choices">
                        <validate auto-label class="form-group text-left" :class="">
                          <label class="form-check-label" @click="msg.value.is_accepted = false">
                            <input class="form-check-input" type="radio" name="acception" v-model.lazy="msg.value.is_accepted" :value="!setCollapse(msg)">
                            No thanks, message rejected for following reason(s):
                          </label>
                        </validate>
                        <div v-if="msg.value.is_accepted === false" class="choices">
                          <div class="form-check">
                            <validate auto-label class="form-group text-left" :class="">
                              <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="msg.value.is_unknown_sender" value="">
                                It's an unknown sender
                              </label>
                            </validate>
                          </div>
                          <div class="form-check">
                            <validate auto-label class="form-group text-left" :class="">
                              <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="msg.value.is_inappropriate_quality" value="">
                                It's an inappropriate quality
                              </label>
                            </validate>
                          </div>
                          <div class="form-check">
                            <validate auto-label class="form-group text-left" :class="">
                              <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="msg.value.is_inappropriate_project" value="">
                                It's an inappropriate project
                              </label>
                            </validate>
                          </div>
                          <div class="form-check">
                            <validate auto-label class="form-group text-left" :class="">
                              <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" name="acception" v-model.lazy="msg.value.is_inappropriate_grade" value="">
                                It's an inappropriate grade
                              </label>
                            </validate>
                          </div>
                          <div v-if="showError(msg.value)" style="color: red" class="text-left">Choose at least one of the underlying fields</div>
                        </div>
                      </div>
                      <button v-if="hideSubmit(msg.value)" type="submit" class="btn btn-primary">Submit</button>
                    </vue-form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase'
// import {db} from '@/firebase'
import VueForm from 'vue-form'
// import store from '@/store'

export default {
  mixins: [VueForm],
  data: () => ({
    formstate: {},
    messages: [],
    fullnames: [],
    blocks_per_user: []
  }),
  created: function () {
    this.getMessages()
  },
  methods: {
    // TODO: put constraints in constraints.js, that's more clean
    // TODO: please refactor this function + it's duplicated code in explore
    setBanned () {
      // count being banned by
      // if count === 3 => ban ==> firebase.isBanned === true + duedate => in App.vue, read firebase.isBanned && v-if to show banned page
      var vm = this
      var countBlocksPerUser = 0
      var lastBlockDate = 0

      this.messages.forEach(function (oElement) {
        var val = oElement.value
        var lastMonthDate = new Date()
        lastMonthDate = new Date(lastMonthDate.setTime(lastMonthDate.getTime() - 28 * 86400000)) // 28 days earlier

        if (typeof vm.blocks_per_user !== 'undefined' && vm.blocks_per_user.length > 0) {
          vm.blocks_per_user.forEach(function (iElement) {
            if (val.to_userid === iElement.blocked_user) {
              // add rejected message to count+1
              if ((val.is_unknown_sender || val.is_inappropriate_quality || val.is_inappropriate_project || val.is_inappropriate_grade) && val.timestamp_reaction > lastMonthDate.getTime()) {
                iElement.count++

                if (val.timestamp_reaction > lastBlockDate) {
                  lastBlockDate = val.timestamp_reaction // last reaction must be remembered
                }

                // count of banned_by_one_person, if > 3 => +1
                if (iElement.count === 4) {
                  countBlocksPerUser++
                }
              }
            } else {
              // push not yet existing rejected message in existing list
              if ((val.is_unknown_sender || val.is_inappropriate_quality || val.is_inappropriate_project || val.is_inappropriate_grade) && val.timestamp_reaction > lastMonthDate.getTime()) {
                vm.blocks_per_user.push({blocked_user: val.to_userid, count: 1})

                if (val.timestamp_reaction > lastBlockDate) {
                  lastBlockDate = val.timestamp_reaction // last reaction must be remembered
                }
              }
            }
          })
        } else {
          // push first rejected message
          if ((val.is_unknown_sender || val.is_inappropriate_quality || val.is_inappropriate_project || val.is_inappropriate_grade) && val.timestamp_reaction > lastMonthDate.getTime()) {
            vm.blocks_per_user.push({blocked_user: val.to_userid, count: 1})

            if (val.timestamp_reaction > lastBlockDate) {
              lastBlockDate = val.timestamp_reaction // last reaction must be remembered
            }
          }
        }
      }, this)

      console.log(vm.blocks_per_user)

      // if count > 3 in blocks_per_user ==> isBanned op firebase = true
      // lastBlockdate of banDueDate
      // push of update firebase
      // make ban page in App.vue, read isbanned and date from firebase

      // TODO: need to test this bit
      if (countBlocksPerUser > 3) {
        var userid = firebase.auth().currentUser.uid
        var userRef = firebase.database().ref('users/' + userid)

        var banCount = -1

        userRef.once('value').then(function (snapshot) {
          banCount = snapshot.val().ban_count
        })

        lastBlockDate = new Date(lastBlockDate)
        var dueDate = new Date(lastBlockDate.setTime(lastBlockDate.getTime() + 7 * 86400000)) // 7 days later // TODO: implement incremental escalation

        userRef.update({ban_count: banCount++, ban_ends_at: dueDate})
      }

      /* var now = new Date()

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
      } */
    },
    setCollapse (msg) {
      if (msg.value.timestamp_reaction === '') {
        return true
      } else {
        if (msg.isCollapsed === true) {
          return true
        } else {
          return false
        }
      }
    },
    toggleCollapse (msg) {
      if (msg.isCollapsed) {
        msg.isCollapsed = false
      } else {
        msg.isCollapsed = true
      }
    },
    // make list of fullnames
    setFullnames (messages) {
      for (var msg in messages) {
        var vm = this
        firebase.database().ref('/users/' + messages[msg].value.from_userid).once('value').then(function (snapshot) {
          vm.fullnames.push({key: snapshot.key, value: snapshot.val().firstname + ' ' + snapshot.val().lastname})
        })
      }
    },
    // display fullname instead of userid
    getFullname (userId) {
      for (var fname in this.fullnames) {
        if (this.fullnames[fname].key === userId) {
          return this.fullnames[fname].value
        }
      }
    },
    acceptIsTrue (value, key) {
      value.is_accepted = true
      value.is_unknown_sender = false
      value.is_inappropriate_quality = false
      value.is_inappropriate_project = false
      value.is_inappropriate_grade = false
    },
    showError (value) {
      if (value.is_accepted === '') {
        return false
      } else if (value.is_accepted === false) {
        if (value.is_unknown_sender === true || value.is_inappropriate_quality === true || value.is_inappropriate_project === true || value.is_inappropriate_grade === true) {
          return false
        }
        return true
      } else {
        return false
      }
    },
    hideSubmit (value) {
      if (value.is_accepted === true) {
        return true
      } else if (value.is_accepted === false) {
        if (value.is_unknown_sender === true || value.is_inappropriate_quality === true || value.is_inappropriate_project === true || value.is_inappropriate_grade === true) {
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
      var myMessagesRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(userid)
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
        vm.setBanned()
      })
    },
    onSubmit: function (value, key, msg) {
      if (this.formstate.$invalid) {
        // alert user and exit early
        // return
      } else {
        value.timestamp_reaction = firebase.database.ServerValue.TIMESTAMP

        var msgRef = firebase.database().ref('messages/' + key)

        msgRef.update(value)

        msg.isCollapsed = false
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
  .fewLines {
    margin-top: 60px;
  }

  .base {
    height: 89vh;
  }
</style>
