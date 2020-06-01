import { gql } from 'apollo-boost'

export default gql`
  mutation UpdateLastMessage($roomID: Int, $message: String) {
    update_connections(where: { id: { _eq: $roomID } }, _set: { last_message: $message }) {
      returning {
        id
      }
    }
  }
`
