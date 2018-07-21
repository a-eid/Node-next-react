import React, { Fragment, Component } from "react"
import Head from "next/head"
import { connect } from "react-redux"
import { string } from "prop-types"
import Router from "next/router"
import NProgress from "nprogress"

import Nav from "./nav"
import { authSuccess } from "../redux/actions/actions"

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class Layout extends Component {
  state = {
    loading: true,
  }

  done = () => {
    this.setState(
      {
        loading: false,
      },
      () => {
        NProgress.done()
      },
    )
  }

  componentDidMount() {
    NProgress.start()
    const { isAuthenticated } = this.props
    if (isAuthenticated) { 
      this.done()
    }

    const auth = JSON.parse(localStorage.getItem("AUTH")) || {}
    const { token } = auth
    if (!token) { 
      this.done()
      return 
     }

    const body = new Blob([JSON.stringify({ access_token: token }, null, 2)], {
      type: "application/json",
    })

    fetch("/api/auth/validateToken", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("here")
        if (res.valid) {
          this.props.dispatch(authSuccess(auth))
          console.log("valid")
        }else {
          console.log("not valid")
        }
        this.done()
      })
  }

  render() {
    const {
      title = "",
      url = "",
      description = "",
      ogImage = "",
      children,
      isAuthenticated,
    } = this.props
    const { loading } = this.state
    return (
      <Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <title>{title} | Linnks</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link
            rel="mask-icon"
            href="/static/favicon-mask.svg"
            color="#49B882"
          />
          <link rel="icon" href="/static/favicon.ico" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="twitter:site" content={url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={ogImage} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="stylesheet" href="/static/styles/main.css" />
        </Head>
        {!loading && (
          <Fragment>
            <Nav isAuthenticated={isAuthenticated} />
            <div className="wrapper">{children}</div>
          </Fragment>
        )}
        <style jsx>{`
          .wrapper {
            max-width: 1200px;
            margin: auto;
            padding: 0 15px;
          }
        `}</style>
      </Fragment>
    )
  }
}

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Layout)
