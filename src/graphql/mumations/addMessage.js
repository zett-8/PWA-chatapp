import { gql } from 'apollo-boost'

export default gql`
  mutation SendMessage($roomID: Int, $content: String, $sender: String, $receiver: String) {
    insert_messages(
      objects: { room: $roomID, content: $content, sender: $sender, receiver: $receiver }
    ) {
      returning {
        id
      }
    }
  }
`
