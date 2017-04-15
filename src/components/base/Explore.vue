<template>
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
</template>
<script>
import {db} from '../../firebase'

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
