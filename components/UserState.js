import React from "react"
import { connect } from "react-redux"

const UserState = ({user, provider}) => (
  <div>
    <p>{ provider }</p>
    <p>You are logged in as {user.email}</p>
  </div>
)


const mapStateToProps = state => ({
  user: state.auth.user, 
  provider: state.auth.provider
})

export default connect(mapStateToProps)(UserState)
