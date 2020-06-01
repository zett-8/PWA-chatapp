import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import Layout from '../components/gatsbyDefault/layout'
import SEO from '../components/gatsbyDefault/seo'
import { Header } from '../components/header'
import { ChatInput } from '../components/chatInput'
import { ChatArea } from '../components/chatArea'
import { Context } from '../provider/apolloAuth'

// graphql
import addMessageMutation from '../graphql/mumations/addMessage'
import updateLastMessageMutation from '../graphql/mumations/updateLastMessage'
import getChatSubscription from '../graphql/subscription/getChat'
import readMessageMutation from '../graphql/mumations/readMessage'

export const ChatPage = (props) => {
  const { userAuthInfo } = useContext(Context)
  const [text, setText] = useState('')

  const [addMessage] = useMutation(addMessageMutation)
  const [readMessages] = useMutation(readMessageMutation)
  const [updateMessage] = useMutation(updateLastMessageMutation)
  const { data, error } = useSubscription(getChatSubscription, {
    suspend: false,
    variables: {
      roomID: props.id,
    },
  })

  if (error) console.log('socket error', error)

  const sendMessage = () => {
    if (!text) return null

    const _text = text
    setText('')

    data.messages.push({
      id: 'tmp',
      content: text,
      sender: userAuthInfo.uid,
    })

    addMessage({
      variables: {
        roomID: props.id,
        content: _text,
        sender: userAuthInfo.uid,
        receiver: props.opponent,
      },
    }).then(() => {
      updateMessage({
        variables: {
          roomID: props.id,
          message: _text,
        },
      })
    })
  }

  const messagesWasRead = (list) => {
    readMessages({
      variables: {
        ids: list,
      },
    })
  }

  if (!props.location.state) navigate('/')

  return (
    <Layout>
      <SEO title={'Chat'} />
      <Header
        title={props.location.state && props.location.state.opponentName}
        leftButton={<ArrowBackIosIcon onClick={() => navigate('/')} />}
      />
      <ChatArea
        data={(data && data.messages) || []}
        userID={userAuthInfo.uid}
        readMessage={messagesWasRead}
      />
      <ChatInput
        onSubmit={sendMessage}
        onInputChange={(e) => setText(e.target.value)}
        text={text}
      />
    </Layout>
  )
}
