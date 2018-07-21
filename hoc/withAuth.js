import React, { Fragment, Component } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import Router from "next/router"
import NProgress from "nprogress"

const withAuth = (Cmp) =>
  class HOC extends Component {
    state = {
      loaded: false,
    }

    componentDidMount() {
      NProgress.start()
      console.log(this.props)
      if (!this.props.isAuthenticated)
        Router.push("/")
      else
        this.setState({ loaded: true })
      NProgress.done()
    }

    render() {
      const { loaded } = this.state
      return loaded ? <Cmp {...this.props} /> : null
    }
  }

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default  compose(
  connect(mapStateToProps),
  withAuth
)
