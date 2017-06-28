<template>
<div>
  <div class="stats-table container-fluid">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="key in columns" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(q, index) in gradesPerQuality" :key="q.quality">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ q.quality }}</td>
          <td>{{ getMean(q.grades) }}</td>
          <td>{{ getStddev(q.grades) }}</td>
          <td>Show chart</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import * as firebase from 'firebase'
import { mean, standardDeviation } from 'simple-statistics'

export default {
  data: () => ({
    columns: ['#', 'Quality', 'Mean', 'Std dev', 'Chart'],
    messages: [],
    gradesPerQuality: []
  }),
  created () {
    this.getMessages()
  },
  methods: {
    getMean (list) {
      var lst = []
      list.forEach(function (element) {
        lst.push(parseInt(element))
      }, this)
      return (Math.round(mean(lst) * 100) / 100).toFixed(2)
    },
    getStddev (list) {
      var lst = []
      list.forEach(function (element) {
        lst.push(parseInt(element))
      }, this)
      return (Math.round(standardDeviation(lst) * 100) / 100).toFixed(2)
    },
    getMessages () {
      var vm = this
      var userid = firebase.auth().currentUser.uid
      var myMessagesRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(userid)
      myMessagesRef.on('child_added', function (snapshot) {
        // Make list of grades per quality
        if (typeof vm.gradesPerQuality !== 'undefined' && vm.gradesPerQuality.length > 0) {
          var result = vm.gradesPerQuality.find(function (obj) {
            if (obj.quality === snapshot.val().quality) {
              obj.grades.push(snapshot.val().grade)
              return true
            } else {
              return false
            }
          })

          if (!result) {
            vm.gradesPerQuality.push({quality: snapshot.val().quality, grades: [snapshot.val().grade]})
          }
        } else {
          vm.gradesPerQuality.push({quality: snapshot.val().quality, grades: [snapshot.val().grade]})
        }

        // Adding to the messages list: val() is the message object
        var dict = { messagekey: snapshot.key, messagevalue: snapshot.val(), isCollapsed: false }
        vm.messages.push(dict)
      })
    }
  }
}
</script>

<style>
  .table td {
    text-align: center;
  }
  .table th {
    text-align: center;
  }
</style>
