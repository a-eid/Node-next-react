import React, { Component } from "react"
import Link from "next/link"
import { connect } from "react-redux"
import NProgress from "nprogress"
import { authClear } from "../redux/actions/actions"

const links = [{ href: "/about", label: "About" }].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

class Nav extends Component {
  logout = () => {
    NProgress.start()
    localStorage.removeItem("AUTH")
    this.props.dispatch(authClear())
    NProgress.done()
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <nav>
        <ul>
          <li>
            <Link prefetch href="/">
              <a>Home</a>
            </Link>
          </li>
          {links.map(({ key, href, label }) => (
            <li key={key}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
          {isAuthenticated ? (
            <li key="/dashboard">
              <Link prefetch href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
          ) : null}

          {isAuthenticated ? (
            <li key="/logout">
              <a onClick={this.logout}>logout</a>
            </li>
          ) : null}
        </ul>

        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }
          nav {
            text-align: center;
          }
          ul {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 15px 0;
          }

          li {
            display: flex;
            padding: 6px 8px;
          }
          a {
            color: #067df7;
            text-decoration: none;
            font-size: 13px;
          }
        `}</style>
      </nav>
    )
  }
}

export default connect()(Nav)
