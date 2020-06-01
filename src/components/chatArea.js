import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MessageCard } from './messageCard'

export const ChatArea = ({ data, userID, readMessage }) => {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  useEffect(() => {
    const readList = []
    data.forEach((d) => {
      if (d.receiver === userID && !d.read) readList.push(d.id)
    })

    if (readList.length) readMessage(readList)
  }, [data, readMessage, userID])

  let pre = null

  return (
    <ChatAreaDiv>
      {data.map((m) => {
        if (pre === m.sender) {
          pre = m.sender
          return <MessageCard key={m.id} data={m} userID={userID} series />
        } else {
          pre = m.sender
          return <MessageCard key={m.id} data={m} userID={userID} />
        }
      })}
      <div ref={endRef} style={{ height: '30px' }} />
    </ChatAreaDiv>
  )
}

const ChatAreaDiv = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 10px;
  width: 100vw;
  min-height: calc(100vh - 80px - 80px);
  padding-top: 20px;
`
