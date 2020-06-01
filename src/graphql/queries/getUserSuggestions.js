import { gql } from 'apollo-boost'

export default gql`
  query GetSuggestions($email: String, $myID: String) {
    users(where: { email: { _ilike: $email }, id: { _neq: $myID } }) {
      id
      name
    }
  }
`
