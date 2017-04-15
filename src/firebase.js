import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyA0IOGLjafJAfv3sGSxUCZnJqC5RwTrPQ0',
  authDomain: 'egorest-5ccb0.firebaseapp.com',
  databaseURL: 'https://egorest-5ccb0.firebaseio.com',
  projectId: 'egorest-5ccb0',
  storageBucket: 'egorest-5ccb0.appspot.com',
  messagingSenderId: '535703546233'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
