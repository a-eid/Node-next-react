import React, { Fragment, Component } from "react"
import Layout from "../../components/Layout"
import withAuth from "../../hoc/withAuth"

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Layout title="Dashboard">
          <div>logout</div>
          <div>
            Category Dropdown (displays all categories by default favorites
            lists will also be an option)
          </div>

          <div>Button - Created New Link List</div>
          <div>Created Lists View (Edit Button) Displays favorited counter</div>
        </Layout>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

export default withAuth(Dashboard)

// export default Dashboard
