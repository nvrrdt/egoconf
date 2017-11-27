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
          <td>{{ q.gradesWTime.length }}</td>
          <td>{{ getMean(q.gradesWTime) }}</td>
          <td>{{ getStddev(q.gradesWTime) }}</td>
          <td><a class="" href="#" role="button" @click="openModal(q.quality,q.gradesWTime)" v-on:keyup.esc="closeModal">Show chart</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="wrapper"> 
    <modal v-if="showModal"> 
      <h3 slot="header" class="modal-title">
        <button type="button" class="close" data-dismiss="modal" @click="closeModal()">&times;</button>
        <h4>Chart</h4>
      </h3>
      
      <div slot="body" class="modal-body container">
        <vue-chart type="line" :data="chartData"></vue-chart>
      </div>

      <div slot="footer">
      </div>
    </modal>
  </div>
</div>
</template>

<script>
import * as firebase from 'firebase'
import { mean, standardDeviation } from 'simple-statistics'
import store from '@/store'
import Modal from '@/components/Modal' // taken from JuneRockwell/BootstrapVueModal
import VueChart from 'vue-chart-js'

export default {
  components: {
    Modal,
    VueChart
  },
  data: () => ({
    showModal: false,
    columns: ['#', 'Quality', '#grades', 'Mean', 'Std dev', 'Chart'],
    messages: [],
    gradesPerQuality: [],
    searchedUserid: '',
    searchedFirstname: '',
    chartData: {
      labels: [],
      datasets: []
    }
  }),
  created () {
    this.fetchData()
    this.getMessages()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    searchedUserid: function (val) {
      this.gradesPerQuality = []
      this.getMessages()
    }
  },
  methods: {
    fetchData () {
      this.searchedUserid = store.getSearchedUserid()
    },
    getMean (list) {
      var lst = []
      list.forEach(function (element) {
        lst.push(parseInt(element.grade))
      }, this)
      return (Math.round(mean(lst) * 100) / 100).toFixed(2)
    },
    getStddev (list) {
      var lst = []
      list.forEach(function (element) {
        lst.push(parseInt(element.grade))
      }, this)
      return (Math.round(standardDeviation(lst) * 100) / 100).toFixed(2)
    },
    getMessages () {
      var vm = this
      var myMessagesRef = firebase.database().ref('messages').orderByChild('to_userid').equalTo(this.searchedUserid)
      myMessagesRef.on('child_added', function (snapshot) {
        // Make list of grades per quality
        if (typeof vm.gradesPerQuality !== 'undefined' && vm.gradesPerQuality.length > 0 && snapshot.val().timestamp_reaction && snapshot.val().is_accepted) {
          var result = vm.gradesPerQuality.find(function (obj) {
            if (obj.quality === snapshot.val().quality) {
              obj.gradesWTime.push({grade: snapshot.val().grade, time: snapshot.val().timestamp_created})
              return true
            } else {
              return false
            }
          })

          if (!result && snapshot.val().is_accepted) {
            vm.gradesPerQuality.push({quality: snapshot.val().quality, gradesWTime: [{grade: snapshot.val().grade, time: snapshot.val().timestamp_created}]})
          }
        } else if (snapshot.val().is_accepted) {
          vm.gradesPerQuality.push({quality: snapshot.val().quality, gradesWTime: [{grade: snapshot.val().grade, time: snapshot.val().timestamp_created}]})
        }

        // Adding to the messages list: val() is the message object
        var dict = { messagekey: snapshot.key, messagevalue: snapshot.val(), isCollapsed: false }
        vm.messages.push(dict)
      })
    },
    openModal (quality, gradesWTime) {
      this.chartData.labels = []
      this.chartData.datasets = []

      var glst = []
      gradesWTime.forEach(function (element) {
        // from number to string
        var timestamp = element.time
        var myDate = new Date(timestamp)

        // push time and grade
        this.chartData.labels.push(myDate.getHours() + ':' + myDate.getMinutes() + ' ' + myDate.getDay() + '/' + myDate.getMonth() + '/' + myDate.getFullYear())
        glst.push(element.grade)
      }, this)
      this.chartData.datasets.push({label: quality, data: glst})

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
      }
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
  #wrapper {
    margin-top: 10px;
  }
  .modal-title {
    width: 100%;
  }
  .modal-body {
    text-align: left;
  }
</style>
