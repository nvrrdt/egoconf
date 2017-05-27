<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize active" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div>
      <div>
          <input v-model="user" placeholder="Add a user"/>
          <button @click="addItem">Add item</button>
      </div>
      <div>
          <ul>
              <li v-for="user of users">{{user.name}}</li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {db} from '@/firebase'

export default {
  data: () => ({
    users: {}
  }),

  firebase: {
    users: {
      source: db.ref('users'),
      // Optional, allows you to handle any errors.
      cancelCallback (err) {
        console.error(err)
      }
    }
  },
  methods: {
    addItem () {
      this.$firebaseRefs.users.push({
        name: this.user
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
</style>
