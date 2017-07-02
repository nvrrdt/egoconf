<template>
  <div class="base">
    <a class="text-capitalize" v-on:click="toSignup" role="button" href>signup</a>
    <a class="text-capitalize" v-on:click="toLogin" role="button" href>login</a>
    <h3>tl;dr: Grading people's qualities, that's what this is all about. And as a by-product it is also a solution for yeah</h3>
    <h4>And keep it positive, make a map of different people who have an almost equally developed quality or a an almost equally developed envelope of qualities</h4>
    <h2>{{ msg }}</h2>
    <p>test</p>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'base',
  data () {
    return {
      msg: 'OK'
    }
  },
  methods: {
    toSignup: function () {
      router.push({ name: 'AccountSignup' })
    },
    toLogin: function () {
      router.push({ name: 'AccountLogin' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
