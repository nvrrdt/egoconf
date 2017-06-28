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
      <tbody> <!--
        <tr v-for="entry in filteredData">
          <td v-for="key in columns">
            {{entry[key]}}
          </td>
        </tr> -->
        <tr>
          <th scope="row">1</th>
          <td>Greatness</td>
          <td>{{ mean }}</td>
          <td>{{ std }}</td>
          <td>Show chart</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="stats-chart">
    <!-- <chart></chart> -->
  </div>
</div>
</template>

<script>
import * as firebase from 'firebase'
import { mean, standardDeviation } from 'simple-statistics'
// import store from '@/store'

export default {
  data: () => ({
    mean: (Math.round(mean([1, 5, -10, 98, 32, 100, 2]) * 100) / 100).toFixed(2),
    std: (Math.round(standardDeviation([1, 5, -10, 98, 32, 100, 2]) * 100) / 100).toFixed(2),
    columns: ['#', 'Quality', 'Mean', 'Std dev', 'Chart'],
    messages: [],
    gradesPerQuality: []
  }),
  created () {
    this.getMessages()
  },
  methods: {
    getMessages () {
      var vm = this
      var userid = firebase.auth().currentUser.uid
      var myMessagesRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(userid)
      myMessagesRef.on('child_added', function (snapshot) {
        // Make list of grades per quality
        if (typeof vm.gradesPerQuality !== 'undefined' && vm.gradesPerQuality.length > 0) {
          var result = vm.gradesPerQuality.find(function (obj) {
            if (obj.quality === snapshot.val().quality) {
              obj.grade.push(snapshot.val().grade)
              return true
            } else {
              return false
            }
          })

          if (!result) {
            vm.gradesPerQuality.push({quality: snapshot.val().quality, project: snapshot.val().project, grade: [snapshot.val().grade]})
          }
        } else {
          vm.gradesPerQuality.push({quality: snapshot.val().quality, project: snapshot.val().project, grade: [snapshot.val().grade]})
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
