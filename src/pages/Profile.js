import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  document.title = 'Trading Bazaar | Profile'

  const user = useSelector((state) => state.auth.user)

  return (
    <React.Fragment>
      {user ? <h1>{user.name}</h1> : <p>LOADING!</p>}
    </React.Fragment>
  )
}

export default Profile
