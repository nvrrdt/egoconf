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
import { mean, standardDeviation } from 'simple-statistics'
import store from '@/store'

export default {
  data () {
    return {
      mean: (Math.round(mean([1, 5, -10, 98, 32, 100, 2]) * 100) / 100).toFixed(2),
      std: (Math.round(standardDeviation([1, 5, -10, 98, 32, 100, 2]) * 100) / 100).toFixed(2),
      columns: ['#', 'Quality', 'Mean', 'Std dev', 'Chart'],
      messages: store.getMessages()
    }
  },
  methods: {
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
