import React, { useContext } from 'react'
import { Router } from '@reach/router'

import { LoginPage } from '../containers/loginPage'
import { TopPage } from '../containers/topPage'
import { ChatPage } from '../containers/chatPage'

import { Context } from '../provider/apolloAuth'
import useFirebase from '../provider/firebase'

const IndexPage = () => {
  const firebase = useFirebase()
  const { authLoaded } = useContext(Context)

  if (authLoaded && firebase.auth().currentUser) {
    return (
      <Router basepath="/">
        <ChatPage path="/_/:id/:opponent" />
        <TopPage path="/*" />
      </Router>
    )
  } else {
    return <LoginPage />
  }
}

export default IndexPage
