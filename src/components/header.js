import React from 'react'
import styled from 'styled-components'

export const Header = ({ title, leftButton, rightButton }) => {
  return (
    <HeaderDiv>
      <LeftButtonDiv>{leftButton}</LeftButtonDiv>
      <Title>{title}</Title>
      <RightButtonDiv>{rightButton}</RightButtonDiv>
    </HeaderDiv>
  )
}

const HeaderDiv = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;

  width: 100vw;
  height: 80px;
  background-color: white;
  box-shadow: 0px 1px 3px 1px rgba(241, 241, 241, 1);
`

const Title = styled.div`
  margin-bottom: 15px;
  align-self: end;
  font-size: 1.25rem;
  font-weight: 400;
  color: #555;
`

const LeftButtonDiv = styled.div`
  align-self: end;
  margin-left: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  svg {
    color: #bbb;
  }
`

const RightButtonDiv = styled.div`
  justify-self: right;
  align-self: end;
  margin-right: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  svg {
    color: #bbb;
  }
`
