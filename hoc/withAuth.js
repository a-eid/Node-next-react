import React, { Fragment, Component } from "react"
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
      if (!this.props.isAuthenticated) Router.push("/")
      else this.setState({ loaded: true })
    }

    render() {
      const { loaded } = this.state
      return loaded ? <Cmp {...this.props} /> : null
    }

  }

export default withAuth
