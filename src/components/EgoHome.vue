<template>
  <div class="base">
    <a class="text-capitalize" v-on:click="toSignup" role="button" href>signup</a>
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

/* unvisited link grey */
#base a:link {
	color: #777;
}
/* visited link grey */
#base a:visited {
	color: #777;
}
/* mouse over link blue */
#base a:hover {
	color: #0CF;
}
/* selected link blue */
#base a:active {
	color: #0CF;
}
</style>
