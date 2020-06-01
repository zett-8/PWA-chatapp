import React, { useEffect, useState, createContext } from 'react'
import { InMemoryCache, split, HttpLink, ApolloClient } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { persistCache } from 'apollo-cache-persist'
import fetch from 'isomorphic-fetch'
import useFirebase from './firebase'

export let Context = createContext(null)

const ApolloAuth = (props) => {
  const firebase = useFirebase()
  const [userAuthInfo, setUserAuthInfo] = useState('')
  const [authLoaded, setAuthLoaded] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const idTokenResult = await user.getIdTokenResult()
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']

        if (hasuraClaim) {
          setUserAuthInfo({
            uid: user.uid,
            email: user.email,
            token,
          })
        } else {
          const userRef = firebase.firestore.collection('user_meta').doc(user.uid)
          userRef.onSnapshot(async () => {
            const token = await user.getIdToken(true)
            setUserAuthInfo({
              uid: user.uid,
              email: user.email,
              token,
            })
          })
        }

        console.log('logged in')
        setAuthLoaded(true)
      } else {
        console.log('not logged in')
        setUserAuthInfo('')
        setAuthLoaded(true)
      }
    })
    // eslint-disable-next-line
  }, [])

  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
    headers: userAuthInfo
      ? {
          Authorization: `Bearer ${userAuthInfo.token}`,
        }
      : {},
  })

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: 'ws://localhost:8080/v1/graphql',
        options: {
          reconnect: true,
        },
      })
    : null

  const link = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  const cache = new InMemoryCache({
    dataIdFromObject: (o) => o.id,
  })

  process.browser &&
    persistCache({
      cache,
      storage: window.localStorage,
    })

  const client = new ApolloClient({
    link,
    cache,
    fetch,
  })

  return (
    <ApolloProvider client={client}>
      <Context.Provider value={{ authLoaded, userAuthInfo }}>{props.children}</Context.Provider>
    </ApolloProvider>
  )
}

export default ApolloAuth
