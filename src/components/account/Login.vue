<template>
  <div class="base">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-6">
        <div class="container">
          <form>
            <div class="form-group">
              <input v-model:email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email adress" autofocus></input>
            </div>
            <div class="form-group">
              <input v-model:password="auth.password" v-on:keyup.enter="login" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>

            <div v-if="auth.message !== ''" class="alert" role="alert"
              :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
              <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
              <p><strong>{{auth.message}}</strong></p>
            </div>

            <button type="button" @click="login" class="btn btn-primary float-left">Login</button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base'
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

a {
  color: #42b983;
}

.container {
  padding-top: 25px;
}
</style>
