<template>
  <div id="app" class="mx-auto">
    <h1> BE <b>CAUTIOUS</b> AND <b>WARY</b>, </h1>
    <h1> THIS IS <b>HIGHLY CONTROVERSIAL MATTER</b>!!! </h1>
    <a class="nav-link text-dark active" href="https://github.com/egoconf/egoconf" target="_blank"><icon name="github" scale="5"></icon></a>
    <a href="https://www.patreon.com/nicoverrijdt"><img src="./assets/become_a_patron_button.png"></a>
    <p style="padding-top: 25px;"> &copy; 2018 egoconf </p>
  </div>
</template>

<script>

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

html, body {
  height:100%;
}
body {
  display:flex;
  align-items:center;
}

/*  Extra small devices (portrait phones, less than 544px) No media query since this is the default in Bootstrap because it is "mobile first" */
h1 {font-size:1.5rem;} /*1rem = 16px*/
h2 {font-size:1.4rem;}
h3 {font-size:1.3rem;}
h4 {font-size:1.2rem;}
h5 {font-size:1.2rem;}
p {font-size:1.2rem;}
a {font-size:1.2rem;} /* TODO: when viewport sized typography works on all device, that or better should be implemented

/* Small devices (landscape phones, 544px and up) */
@media (min-width: 544px) {  
  h1 {font-size:2rem;} /*1rem = 16px*/
  h2 {font-size:1.9rem;}
  h3 {font-size:1.8rem;}
  h4 {font-size:1.7rem;}
  h5 {font-size:1.6rem;}
  p {font-size:1.6rem;}
  a {font-size:1.6rem;}
}
 
/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {  
  h1 {font-size:2.5rem;} /*1rem = 16px*/
  h2 {font-size:2.4rem;}
  h3 {font-size:2.3rem;}
  h4 {font-size:2.2rem;}
  h5 {font-size:2.1rem;}
  p {font-size:2rem;}
  a {font-size:2rem;}
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
  h1 {font-size:2.5rem;} /*1rem = 16px*/
  h2 {font-size:2.3rem;}
  h3 {font-size:2.1rem;}
  h4 {font-size:1.9rem;}
  h5 {font-size:1.7rem;}
  p {font-size:1rem;}
  a {font-size:1.4rem;}
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  
  h1 {font-size:2.8rem;} /*1rem = 16px*/
  h2 {font-size:2.4rem;}
  h3 {font-size:2rem;}
  h4 {font-size:1.8rem;}
  h5 {font-size:1.4rem;}
  p {font-size:1rem;}
  a {font-size:1.4rem;}   
}

</style>
