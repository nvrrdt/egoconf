<template>
  <div class="base">
    <div v-if="!isAuthenticated" id="signupContainer">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-6">
          <div class="container">
            <form>
              <div class="form-group">
                <input v-model="firstname" type="text" class="form-control" id="exampleInputFirstName1" placeholder="First name" autofocus></input>
              </div>
              <div class="form-group">
                <input v-model="lastname" type="text" class="form-control" id="exampleInputLastName1" placeholder="Last name"></input>
              </div>
              <div class="form-group">
                <input v-model="handle" type="text" class="form-control" id="exampleInputHandle1" placeholder="A handle (or describe yourself briefly)"></input>
              </div>
              <div class="form-group">
                <input v-model:email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email address"></input>
              </div>
              <div class="form-group">
                <input v-model:password="auth.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
              </div>
              <div class="form-group">
                <input v-model:password2="auth.password2" v-on:keyup.enter="signup" type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm password"></input>
              </div>

              <div v-if="auth.message !== ''" class="alert" role="alert"
                :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                <p><strong>{{auth.message}}</strong></p>
              </div>
              
              <button type="button" @click="signup" class="btn btn-primary float-left">Signup</button>

            </form>
          </div>
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
  height: 89vh;
}
</style>
