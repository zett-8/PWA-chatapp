import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import ApolloAuthProvider from './src/provider/apolloAuth'

export default ({ element }) => (
  <>
    <ApolloAuthProvider>
      <CssBaseline />
      {element}
    </ApolloAuthProvider>
  </>
)
