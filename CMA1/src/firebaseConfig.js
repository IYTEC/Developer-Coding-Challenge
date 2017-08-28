import Firebase from 'firebase'


import toastr from 'toastr'

const config = Firebase.initializeApp({
   apiKey: "AIzaSyAnbWKtDk75282KRGCzA0HmP86r7p3nAPc",
   authDomain: "contact-application-62f2d.firebaseapp.com",
   databaseURL: "https://contact-application-62f2d.firebaseio.com",
   projectId: "contact-application-62f2d",
   storageBucket: "contact-application-62f2d.appspot.com",
   messagingSenderId: "544290714076"
});
export const db = config.database();
