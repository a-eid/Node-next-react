import React, { Component } from "react"
import Link from "next/link"
import "isomorphic-fetch"
import NProgress from "nprogress"
import { v4 } from "uuid"
import Layout from "../../components/Layout"
import withAuth from "../../hoc/withAuth"
import Loading from "../../components/Loading"

class Dashboard extends Component {
  state = {
    creating: false,
    loading: true,
    lists: [],
  }

  componentWillMount() {
    fetch("/api/list", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          lists: res,
          loading: false,
        })
      })
  }

  toggleCreate = () => {
    this.setState({
      creating: true,
    })
  }

  cancelCreate = () => {
    this.setState({
      creating: false,
    })
  }

  create = (e) => {
    e.preventDefault()

    const body = JSON.stringify({
      name: "something 222",
      id: "asfdasdfsd",
    })

    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    })

    NProgress.start()
    fetch("/api/list/create", { method: "POST", headers, body })
      .then((res) => res.json())
      .then((res) => {
        this.setState((ps) => ({
          creating: false,
          lists: ps.lists.reduce(
            (acc, item) => {
              acc.push(item)
              return acc
            },
            [{ name: res.name }],
          ),
        }))

        NProgress.done()
      })
  }

  render() {
    const { creating, loading, lists } = this.state
    return (
      <Layout title="Dashboard">
        <div className="Dashboard">
          <div className="dahboard-left">
            {creating ? (
              <CreateView cancel={this.cancelCreate} create={this.create} />
            ) : (
              <button onClick={this.toggleCreate}>Create New List</button>
            )}
          </div>

          <div className="dahboard-right">
            {loading ? <Loading /> : <Lists lists={lists} />}
          </div>
        </div>
        <style jsx>{`
          .Dashboard {
            display: flex;
            /* align-items: center; */
            justify-content: space-around;
          }
          .dahboard-left {
            flex: 1;
          }
          .dahboard-right {
            flex: 1;
          }
        `}</style>
      </Layout>
    )
  }
}

const CreateView = ({ cancel, create }) => (
  <div>
    <form onSubmit={create}>
      <label htmlFor="list-name">List name</label>
      <br />
      <input type="text" id="list-name" />
      <br />
      <button onClick={cancel}>cancel</button> &nbsp;
      <button onClick={create}>create</button>
    </form>
  </div>
)

const Lists = ({ lists }) =>
  lists.map((list) => (
    <div key={v4()}>
      <Link href="list/asdfasdf">
        <a>{list.name}</a>
      </Link>
    </div>
  ))

export default withAuth(Dashboard)
