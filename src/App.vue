<template>
  <div id="app">
    <div class="container">
      <div>
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#"><h1>ego</h1></a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 mr-auto">
              <input class="form-control mr-sm-2" type="text" placeholder="Search for relatives">
            </form>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#">Nico's settings</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Logout</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="http://github.com/nvrrdt/ego" target="_blank"><icon name="github" scale="2"></icon></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <button type="button" class="btn btn-secondary text-capitalize">Messages</button>
        <button type="button" class="btn btn-secondary text-capitalize">Profile</button>
        <button type="button" class="btn btn-secondary text-capitalize">Explore</button>
        <button type="button" class="btn btn-secondary text-capitalize">History</button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
