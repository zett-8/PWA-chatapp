import React from 'react'
import styled from 'styled-components'

export const LoginForm = ({ login, email, setEmail, password, setPassword }) => {
  return (
    <LoginFormDiv>
      <H1>PWA CHAT</H1>
      <Form onSubmit={login}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">LOGIN</button>
      </Form>
    </LoginFormDiv>
  )
}

const LoginFormDiv = styled.div`
  display: grid;
  height: 100vh;
`

const H1 = styled.h1`
  align-self: center;
  justify-self: center;
  margin: 0;
  font-weight: 100;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    border: none;
    height: 40px;
    padding: 5px 20px;
    font-size: 16px;
  }

  button {
    border: none;
    border-radius: 20px;
    height: 40px;
    background-color: #444;
    color: white;
    font-size: 0.9rem;
    letter-spacing: 0.1rem;
    cursor: pointer;
  }

  input,
  button {
    width: 70%;
    margin-bottom: 20px;
  }
`
