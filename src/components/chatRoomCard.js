import React from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export const ChatRoomCard = ({ data, userID }) => {
  const opponent = data.userA.id === userID ? data.userB : data.userA
  const unreadMessage = data.messages.filter((m) => m.receiver === userID && !m.read).length

  return (
    <ChatRoomDiv
      role={'button'}
      onKeyDown={() =>
        navigate(`/_/${data.id}/${opponent.id}`, { state: { opponentName: opponent.name } })
      }
      onClick={() =>
        navigate(`/_/${data.id}/${opponent.id}`, { state: { opponentName: opponent.name } })
      }
    >
      <StyledAccountIcon />
      <Name>{data.userA.id === userID ? data.userB.name : data.userA.name}</Name>
      {unreadMessage ? <UnreadBadge>{unreadMessage}</UnreadBadge> : <p />}
      <Date>
        {typeof window !== 'undefined'
          ? new window.Date(data.last_updated)
              .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              .slice(0, 5)
          : ''}
      </Date>
      <LastMessage>{data.last_message}</LastMessage>
    </ChatRoomDiv>
  )
}

const ChatRoomDiv = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr 1px 45px;
  grid-template-rows: max-content 30px;
  grid-column-gap: 10px;
  width: 100vw;
  height: 90px;
  padding: 10px 20px 0 20px;

  cursor: pointer;
`

const StyledAccountIcon = styled(AccountCircleIcon)`
  align-self: center;
  font-size: 3rem;
`

const Name = styled.p`
  font-size: 1.15rem;
  font-weight: 400;
  color: #555;
`

const Date = styled.p`
  align-self: center;
  justify-self: right;
  color: #aaa;
`

const LastMessage = styled.p`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: start;
  margin: 0;
  margin-top: -18px;

  color: #aaa;

  // omit long sentence
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100vw - 164px);
`

const UnreadBadge = styled.div`
  align-self: center;
  display: grid;
  justify-items: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  margin-left: -5px;

  font-weight: bold;
  color: white;
  background-color: #00cc00;
`
