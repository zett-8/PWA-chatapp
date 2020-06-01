import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export const MessageCard = ({ data, userID, series }) => {
  return data.sender === userID ? (
    <RightMessageCardDiv series={series}>
      {series ? null : <StyledAccountIcon />}
      <div>{data.content}</div>
    </RightMessageCardDiv>
  ) : (
    <LeftMessageCardDiv series={series}>
      {series ? null : <StyledAccountIcon />}
      <div>{data.content}</div>
    </LeftMessageCardDiv>
  )
}

const StyledAccountIcon = styled(AccountCircleIcon)`
  align-self: center;
  font-size: 2.5rem;
  margin-top: -8px;
`

const common = styled.div`
  display: grid;
  grid-template-rows: ${({ series }) => (series ? 'min-content' : 'min-content min-content')};
  grid-row-gap: 10px;
  max-width: 75%;

  > div {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`

const RightMessageCardDiv = styled(common)`
  justify-items: right;
  justify-self: right;
  margin-right: 20px;

  > div {
    margin-right: 5px;
    background-color: white;
    border-radius: 15px 0 15px 15px;
    box-shadow: 1px 1px 7px 1px rgb(230, 230, 230, 0.4);
  }
`

const LeftMessageCardDiv = styled(common)`
  justify-self: left;
  margin-left: 20px;

  > div {
    margin-left: 5px;
    background-color: #333;
    color: white;
    border-radius: 0 15px 15px 15px;
  }
`
