<template>
<div>
  <div class="row align-items-center justify-content-center fullpage1">
    <div class="col col-sm-12 col-md-10 col-lg-5 col-lg-4 text-center">
      <h1>egoconf enables <b>social profiling</b></h1>
      <h5 class="mb-2 text-muted">
        - <a class="text-capitalize" v-on:click="toSignup" role="button" href>signup</a> - or - 
        <a class="text-capitalize" v-on:click="toLogin" role="button" href>login</a> -
      </h5>
      <h5 class="paddingtop">Improve your knowledge about the strenghts and qualities of your acquaintances.</h5>
    </div>
  </div>
    <div>
      <icon name="arrow-circle-down" scale="4"></icon>
    </div>
  <div class="row align-items-center justify-content-center fullpage2 lightyellow">
    <div class="col col-sm-12 col-md-10 col-lg-5 col-lg-4 text-center">
      <p class="text-left">
        Social profiling is a method of assembling someone's profile as seen by that person's acquaintances and this in a socially acceptable setting. 
        More precise, egoconf realizes grading acquaintances' qualities as seen commonly or in a certain reference environment. 
        To keep interactions as positive as possible there are a few constraints: grades are limited between 6/10 and 10/10 
        and only positive qualities will be graded. A reference environment may optionally be provided 
        and if this reference contains an inappropriate phrase, 
        then the receiver of the proposal may reject the proposal in it's entirety and the same goes for an inappropriate grade or quality. 
        Furthermore, if the sender of a proposal is unknown to the receiver, the receiver is able to mark this 
        and when marked the sender will be incrementally blocked or even banned, as will also be when the proposal is inappropriate.
      </p>
    </div>
  </div>
  <div class="row align-items-center justify-content-center fullpage2 lightgreen">
    <div class="col col-sm-12 col-md-10 col-lg-5 col-lg-4 text-center">
      <p class="text-left">
        The long term goal of egoconf is to make a neural map of (a lot of) people's specialties, 
        ranked as graded qualities in a certain reference environment. This will provide statistical rankings determined in all kinds of ways, 
        like geographically, per reference, ... and more. 
        What also needs to be explored is the ability to predict anything that has to do with the users of egoconf.
      </p>
      <p class="text-left">
        The common goal of egoconf is to be able to choose more precise the person with the right weighted qualities for a certain job/project 
        whenever suited, to follow people's qualitative evolution/direction and enable self-promotion. 
        The market is always right and in a world where people need to compete more and more with robots, 
        it's of utmost importance to keep as many humans as possible ahead of this (serious) game.
      </p>
    </div>
  </div>
  <div class="row align-items-center justify-content-center fullpage2 lightblue">
    <div class="col col-sm-12 col-md-10 col-lg-5 col-lg-4 text-center">
      <p class="text-left">
        The problem I tried to solve when producing this app was my inability to explain my qualities precise and as wished, 
        to the many recruiters who interviewed me. After brainstorming a while, 
        I was assured that my acquaintances might be better suited to help me counter this problem 
        and it also seemed that I could keep on specializing myself as wished, 
        without the need to become a specialist in interviewing techniques when applying for a job.
      </p>
    </div>
  </div>
  <div class="row align-items-center justify-content-center fullpage3 lightorange">
    <div class="col col-sm-12 col-md-10 col-lg-5 col-lg-4 text-center">
      <h5 class="text-left">
        If you like the egoconf solution and if you are curious for future developments: please consider 
        donating to allow fulltime development and perhaps an expansion of manpower.
      </h5>
      <div class="text-center">
        <div>
          <stripe-donations></stripe-donations>
        </div>
        <p>or donate bitcoin: <a class="text-primary">17RQUjcURirXRA1yvNnzEo2ddYgmTGdvKn</a></p>
      </div>
      <p class="text-left paddingtoptop">
        DISCLAIMER: egoconf, as is, is a demo (or a proof-of-concept or a prototype) and could only experimentally be used, 
        which means that the gathered data will likely be deleted as needed.
      </p>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router'
import StripeDonations from '@/components/StripeDonations'

export default {
  name: 'base',
  components: {
    StripeDonations
  },
  data () {
    return {

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

.fullpage1 {
  height: 75vh;
}

.fullpage2 {
  height: 55vh;
}

.fullpage3 {
  height: 85vh;
}

.lightyellow {
  background-color: lightyellow;
}

.lightgreen {
  background-color: lightgreen;
}

.lightblue {
  background-color: lightblue;
}

.lightorange {
  background-color: #fcd8b3;
}

.paddingtop {
  padding-top: 35px;
}

.paddingtoptop {
  padding-top: 85px;
}
</style>
