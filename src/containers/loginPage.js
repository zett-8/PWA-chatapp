import React, { useState } from 'react'
import useFirebase from '../provider/firebase'
import Layout from '../components/gatsbyDefault/layout'
import SEO from '../components/gatsbyDefault/seo'
import { LoginForm } from '../components/loginForm'

export const LoginPage = () => {
  const firebase = useFirebase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('pass1234')

  const login = (e) => {
    e.preventDefault()

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('logged in'))
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Layout>
      <SEO title="Login" />
      <LoginForm
        login={login}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Layout>
  )
}
