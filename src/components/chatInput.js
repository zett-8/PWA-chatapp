import React, { useRef } from 'react'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send'

export const ChatInput = ({ onSubmit, text, onInputChange }) => {
  const textAreaRef = useRef(null)

  return (
    <ChatInputDiv>
      <InputTextArea
        rows="1"
        placeholder={'type something...'}
        ref={textAreaRef}
        value={text}
        onChange={(e) => {
          textAreaRef.current.style.height = 'auto'
          textAreaRef.current.style.height = Math.min(200, textAreaRef.current.scrollHeight) + 'px'

          onInputChange(e)
        }}
      />
      <InputSubmitButton onClick={onSubmit}>
        <p>
          <SendIcon />
        </p>
      </InputSubmitButton>
    </ChatInputDiv>
  )
}

const ChatInputDiv = styled.div`
  position: sticky;
  bottom: 0;

  display: flex;
  width: 100vw;
  background-color: white;

  @media only screen and (max-width: 500px) {
    padding-bottom: 20px;
  }
`

const InputTextArea = styled.textarea`
  display: block;
  width: calc(100% - 100px);
  height: 40px;
  resize: none;
  border: none;
  border-radius: 20px;
  margin: 10px 0px 10px 20px;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: inherit;

  background-color: #f2f2f2;

  :hover {
    outline: 0px !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }
`

const InputSubmitButton = styled.button`
  width: 70px;
  height: 60px;
  border: none;
  background-color: white;
  p {
    transform: rotate(-35deg);
    color: dodgerblue;
  }
`
