import React from 'react'
import styled from 'styled-components'
import { ChatRoomCard } from './chatRoomCard'

export const ChatRoomList = ({ data, userID }) => {
  return (
    <ChatListDiv>
      {data.map((r) => (
        <ChatRoomCard key={r.id} data={r} userID={userID} />
      ))}
    </ChatListDiv>
  )
}

const ChatListDiv = styled.div`
  min-height: calc(100vh - 80px);
  background-color: white;
`
