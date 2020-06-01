import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import InputAdornment from '@material-ui/core/InputAdornment'

export const UserSearchBar = ({ value, onChange, suggestions, addUser }) => {
  const inputRef = useRef(null)
  const [search, setSearch] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onChange({ target: { value: '' } })
        setSearch(false)
        inputRef.current.blur()
      }
    })
  }, [onChange])

  return (
    <>
      <UserSearchBarDiv>
        <StyledInput
          inputRef={inputRef}
          value={value}
          search={search}
          onChange={onChange}
          onClick={() => {
            inputRef.current.focus()
            setSearch(true)
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <SettingIconDiv>
          <SettingsIcon />
        </SettingIconDiv>
      </UserSearchBarDiv>
      <div>
        {suggestions.map((u) => (
          <p key={u.id}>
            {u.name}{' '}
            <span>
              <button onClick={() => addUser(u.id)}>ADD</button>
            </span>
          </p>
        ))}
      </div>
    </>
  )
}

const UserSearchBarDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
`

const StyledInput = styled(Input)`
  width: ${({ search }) => (search ? 'calc(100% - 40px)' : '40px')};
  padding-left: ${({ search }) => (search ? '5px' : '13px')};
  margin-left: 10px;
  ::before {
    border-bottom: ${({ search }) => (search ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')};
  }
  svg {
    font-weight: bold;
  }
  transition: width 200ms ease-out;
`

const SettingIconDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 40px;
`
