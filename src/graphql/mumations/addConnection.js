import { gql } from 'apollo-boost'

export default gql`
  mutation InsertConnection($me: String, $you: String) {
    insert_connections(objects: { user_a: $me, user_b: $you }) {
      returning {
        id
        last_updated
        last_message
      }
    }
  }
`
