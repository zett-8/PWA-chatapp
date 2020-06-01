import { gql } from 'apollo-boost'

export default gql`
  mutation ReadMessage($ids: [bigint!]) {
    update_messages(where: { id: { _in: $ids } }, _set: { read: true }) {
      returning {
        id
      }
    }
  }
`
