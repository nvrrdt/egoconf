const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Sends an email to an egoconf admin.
exports.contactmessage = functions.database.ref('/contactmessages/{msgId}').onCreate(event => {
  const snapshot = event.data;
  const val = snapshot.val();

  const mailOptions = {
    from: '"egoconf contact form" <' + gmailEmail + '>',
    to: gmailEmail
  };

  mailOptions.subject = 'Mail from ' + val.email;
  mailOptions.text = val.fulluser + '\n' + val.msg;

  const msgid = event.params.msgId;
  var msgRef = admin.database().ref('/contactmessages/' + msgid)
  msgRef.remove()

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New email sent to admin from ', val.email, val.fulluser);
  }).catch(error => {
    console.error('There was an error while sending the email: ', error);  
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
