# egoconf

## A weighted profiling project

Egoconf is a web app that enables weighted profiling.
Profiling someone means interpreting someone's qualities by grading those qualities.
Weighted social profiling is a method to profile acquaintances/peers and being profiled by your acquaintances/peers.
It should be noted that graded needs to be positive, so grades will be only allowed between 6 and 10 on a scale to 10 and negative qualities will be filtered or reported by egoconf's users.

The result of weighted social profiling is a network that can be statistically approached as a mean to follow a person's evolution in the main qualities bucket or a single quality.
For instance, recruiters are more precisely informed about someone's qualities, based on the knowledge of that person's peers, and are thus better able to estimate that person's personality in a certain setting.

## Build Setup

For full functionality of egoconf, rename /src/App.vue to anything and rename /src/App_real.vue to /src/App.vue.

egoconf's backend is [firebase](https://firebase.google.com/) and the frontend is [vue](https://vuejs.org/)

``` bash
# clone the egoconf repository
git clone https://github.com/egoconf/egoconf.git
```
Start a [firebase project](https://console.firebase.google.com/u/0/) and add your credentials to your cloned egoconf repository in the file [firebase.js](src/firebase.js). You find your credentials in firebase's common settings where you choose to add firebase to your web app.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
Verify that egoconf's landing page appears in the browser. Also verify the error messages by opening your browser's developer tools (ctrl+shift+i in chrome/chromium), but we'll handle these errors later on.
``` bash
# build for production with minification
npm run build
-- or --
npm run build --report
```
egoconf uses https://github.com/firebase/functions-samples/tree/master/quickstarts/email-users to send mails to the admin through the contact form:
- To be able to send emails with your Gmail account: enable access to Less Secure Apps and Display Unlock Captcha. For accounts with 2-step verification enabled Generate an App Password.
- Set the gmail.email and gmail.password Google Cloud environment variables to match the email and password of the Gmail account used to send emails (or the app password if your account has 2-step verification enabled). For this use:
firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"

Deploy firebase as explained in [this guide](https://firebase.google.com/docs/hosting/deploying)

egoconf also uses elasticsearch as a means to be able to search for someone. Follow the installation guide of [flashlight](https://github.com/firebase/flashlight) herefore. This might take some time to set up right!
Add some users and verify that you are able to search for those users.

The tests aren't yet implemented, nonetheless they are ready to become implemented.
``` bash
# run unit tests
npm jest

# run e2e tests
npm e2e

# run all tests
npm test
```

This build setup isn't quite finished, so if you encounter problems, please do let me know.