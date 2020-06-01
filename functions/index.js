const functions = require('firebase-functions')
const admin = require('firebase-admin')
const ApolloClient = require('apollo-boost').default
const fetch = require('node-fetch')
const gql = require('graphql-tag')

admin.initializeApp(functions.config().firebase)

const client = new ApolloClient({
  fetch,
  uri: '*****',
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-hasura-admin-secret': '*****',
      },
    })
  },
})

exports.handleSignUp = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  try {
    // set custom claim
    await admin.auth().setCustomUserClaims(user.uid, customClaims)

    await client.mutate({
      variables: { id: user.uid, email: user.email || '', name: user.name || '' },
      mutation: gql`
        mutation InsertUsers($id: String, $email: String, $name: String) {
          insert_users(objects: { id: $id, email: $email, name: $name }) {
            returning {
              id
            }
          }
        }
      `,
    })

    // at first signin, there will be slight delay between creating user and setting claim
    // so that set meta data for refresh
    await admin
      .firestore()
      .collection('user_meta')
      .doc(user.uid)
      .create({
        refreshTime: admin.firestore.FieldValue.serverTimestamp(),
      })
  } catch (e) {
    console.log(e)
  }
})
