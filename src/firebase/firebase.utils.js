import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDeUiEyHOV2gZ09xlCXUd5dLQuitDv7RSg",
    authDomain: "crwn-db-3861c.firebaseapp.com",
    projectId: "crwn-db-3861c",
    storageBucket: "crwn-db-3861c.appspot.com",
    messagingSenderId: "150971089586",
    appId: "1:150971089586:web:b0059c81cd0cef2c79bfab",
    measurementId: "G-J7V2632FY4"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    
    const snapShot = await userRef.get()

    if(!snapShot.exists) {
      const { displayName, email } = userAuth
      const createdAt = new Date() 

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef
  }

  firebase.initializeApp(config) 

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase