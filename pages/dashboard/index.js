import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

export default () => (
  <Fragment>
    <Layout title="Dashboard">
      <div>logout</div>
      <div>
        Category Dropdown (displays all categories by default favorites lists
        will also be an option)
      </div>

      <div>Button - Created New Link List</div>
      <div>Created Lists View (Edit Button) Displays favorited counter</div>
    </Layout>
    <style jsx>{``}</style>
  </Fragment>
);
