import React, { Component } from "react"
import { connect } from "react-redux"
import Home from "../components/Home"
import Loading from "../components/Loading"
import { authSuccess } from "../redux/actions/actions"


// probably make sense to 
// refactor this into the layout component.

class HomePage extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("AUTH"))
    const { token } = auth
    const body = new Blob([JSON.stringify({ access_token: token }, null, 2)], {
      type: "application/json",
    })

    fetch("/api/auth/validateToken", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.valid) {
          this.props.dispatch(authSuccess(auth))
        }
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    return this.state.loading ? <Loading /> : <Home />
  }
}

export default connect()(HomePage)
