// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  razorpay:{
   key_id:'rzp_test_g9XrVyy0OFU67M',
   key_secret:'oKoWrEoCKQScUwHfV1AJQ1ZG'
  },
  apiUrl :'http://localhost:4000',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebaseConfig : {
  apiKey: "AIzaSyCCvuIhL3jVqatf6mBkG2zNqMhKBRIQBL0",
  authDomain: "ritishop-3a653.firebaseapp.com",
  projectId: "ritishop-3a653",
  storageBucket: "ritishop-3a653.appspot.com",
  messagingSenderId: "13064155117",
  appId: "1:13064155117:web:0175ea7a2c60e63f0d01e4",
  measurementId: "G-HPG9E38943"
},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
