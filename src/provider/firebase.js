import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const useFirebase = () => {
  if (!firebase.apps.length)
    firebase.initializeApp({
      apiKey: "******",
      authDomain: "******",
      databaseURL: "******",
      projectId: "******",
      storageBucket: "******",
      messagingSenderId: "******",
      appId: "******",
    })

  return firebase
}

export default useFirebase
