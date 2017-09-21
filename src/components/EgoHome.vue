<template>
  <div class="card card-outline-secondary mb-3 base">
    <div class="card-block">
      <h1 class="card-title">egoconf enables <b>social profiling</b></h1>
      <h5 class="card-subtitle mb-2 text-muted">
        - <a class="text-capitalize" v-on:click="toSignup" role="button" href>signup</a> - or - 
        <a class="text-capitalize" v-on:click="toLogin" role="button" href>login</a> -
      </h5>
      <div class="row justify-content-center">
        <div class="col col-sm-12 col-md-12 col-lg-9 col-lg-7 base">
          <div class="maintext">
            <p class="card-text text-left">
              Grading people's qualities in a certain environment, that's what this app is all about, and as a by-product you might aswell arrange your reputation.
            </p>
            <p class="card-text text-left">
              Social profiling is a method of assembling someone's profile as seen by that person's relatives and this in a socially acceptable setting. 
              More precise, egoconf realizes grading relatives'qualities as seen commonly or in a certain reference environment. 
              To keep interactions as positive as possible there are a few constraints: grades are limited between 6/10 and 10/10 
              and only positive qualities will be graded. A reference environment may optionally be provided 
              and if this reference contains an inappropriate phrase, 
              then the receiver of the proposal may reject the proposal in it's entirety and the same goes for an inappropriate grade or quality. 
              Furthermore, if the sender of a proposal is unknown to the receiver, the receiver is able to mark this 
              and when marked the sender will be incrementally blocked or even banned, as will also be when the proposal is inappropriate.
            </p>
            <p class="card-text text-left">
              The long term goal of egoconf is to make a neural map of (a lot of) people's specialties, 
              ranked as graded qualities in a certain reference environment. This will provide statistical rankings determined in all kinds of ways, 
              like geographically, per reference, ... and more. 
              What also needs to be explored is the ability to predict anything that has to do with the users of egoconf.
            </p>
            <p class="card-text text-left">
              The common goal of egoconf is to be able to choose more precise the person with the right weighted qualities for a certain job/project 
              whenever suited, to follow people's qualitative evolution/direction and enable self-promotion. 
              The market is always right and in a world where people need to compete more and more with robots, 
              it's of utmost importance to keep as many humans as possible ahead of this (serious) game.
            </p>
            <p class="card-text text-left">
              The problem I tried to solve when producing this app was my inability to explain my qualities precisely, and as wished, 
              to the many recruiters who interviewed me. After brainstorming a while, 
              I was assured that my relatives might be better suited to help me counter this problem 
              and it also seemed that I could keep on specializing myself as wished, 
              without the need to become a specialist in interviewing techniques when applying for a job.
            </p>
            <p class="card-text text-left">
              If you like the egoconf solution and if you are curious for future developments: please consider 
              donating to allow fulltime development and perhaps an expansion of manpower.
              <div>
                <p>Donate bitcoin: <a href="bitcoin:17RQUjcURirXRA1yvNnzEo2ddYgmTGdvKn" target="_blank">17RQUjcURirXRA1yvNnzEo2ddYgmTGdvKn</a></p>
              </div>
            </p>
            <p class="card-text text-left">
              DISCLAIMER: egoconf, as is, is a demo (or a proof-of-concept or a prototype) and could only experimentally be used, 
              which means that the gathered data will likely be deleted as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">
      &copy; 2017 egoconf
    </div>
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

.base {
  margin: 25px 0px 0px 0px;
}

.card-block {
  margin: 30px 0px 50px 0px;
}

.card {
  padding: 0px;
}

.maintext {
  margin-top: 20px
}
</style>
