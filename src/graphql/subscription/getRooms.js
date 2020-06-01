import { gql } from 'apollo-boost'

export default gql`
  subscription GetRooms($id: String!) {
    connections(
      where: { _or: [{ user_b: { _eq: $id } }, { user_a: { _eq: $id } }] }
      order_by: { last_updated: desc }
    ) {
      id
      last_message
      last_updated
      messages(order_by: { created_at: asc }) {
        id
        read
        receiver
        sender
        created_at
        content
      }
      userA {
        id
        name
      }
      userB {
        id
        name
      }
    }
  }
`
