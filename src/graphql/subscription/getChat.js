import { gql } from 'apollo-boost'

export default gql`
  subscription GetChat($roomID: Int!) {
    messages(where: { room: { _eq: $roomID } }, order_by: { created_at: asc }) {
      id
      content
      created_at
      read
      receiver
      room
      sender
    }
  }
`
