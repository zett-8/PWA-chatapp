import React, { useContext } from 'react'
import { useSubscription } from '@apollo/react-hooks'

import Layout from '../components/gatsbyDefault/layout'
import SEO from '../components/gatsbyDefault/seo'
// import { UserSearchBar } from '../components/userSearchBar'
import { Header } from '../components/header'
import { ChatRoomList } from '../components/chatRoomList'
import SettingsIcon from '@material-ui/icons/Settings'
import SearchIcon from '@material-ui/icons/Search'
import useFirebase from '../provider/firebase'
import { Context } from '../provider/apolloAuth'

// graphql
// import getRoomsQuery from '../graphql/queries/getRooms'
import getRoomsSubscription from '../graphql/subscription/getRooms'
// import getUserSuggestionsQuery from '../graphql/queries/getUserSuggestions'
// import addConnectionMutation from '../graphql/mumations/addConnection'

export const TopPage = () => {
  const firebase = useFirebase()
  const { userAuthInfo } = useContext(Context)
  // const [timer, setTimer] = useState(null)
  // const [userSearchInput, setUserSearchInput] = useState('')
  const { data: rooms } = useSubscription(getRoomsSubscription, {
    variables: {
      id: userAuthInfo.uid,
    },
  })

  // const [getUserSuggestions, { data: suggestions }] = useLazyQuery(getUserSuggestionsQuery)
  // const [addConnection] = useMutation(addConnectionMutation)
  // useEffect(() => {
  //   getRooms()
  // }, [getRooms])

  const logout = () => {
    firebase.auth().signOut()
  }

  // const onInputChange = (e) => {
  //   setUserSearchInput(e.target.value)
  //
  //   if (!e.target.value) return null
  //
  //   clearTimeout(timer)
  //   const t = setTimeout(
  //     (v) => {
  //       getUserSuggestions({
  //         variables: {
  //           email: `%${v}%`,
  //           myID: userAuthInfo.uid,
  //         },
  //       })
  //     },
  //     1000,
  //     e.target.value
  //   )
  //
  //   setTimer(t)
  // }

  // const addUser = (id) => {
  //   addConnection({
  //     variables: {
  //       me: userAuthInfo.uid,
  //       you: id,
  //     },
  //   })
  //     .then((re) => {
  //       console.log(re)
  //     })
  //     .catch((err) => console.log(err))
  // }

  return (
    <Layout>
      <SEO title="Home" />
      <Header
        title={'MESSAGES'}
        leftButton={<SearchIcon />}
        rightButton={<SettingsIcon onClick={logout} />}
      />
      {/*<UserSearchBar*/}
      {/*value={userSearchInput}*/}
      {/*onChange={onInputChange}*/}
      {/*suggestions={(suggestions && suggestions.users) || []}*/}
      {/*addUser={addUser}*/}
      {/*/>*/}
      <ChatRoomList data={(rooms && rooms.connections) || []} userID={userAuthInfo.uid} />
    </Layout>
  )
}
