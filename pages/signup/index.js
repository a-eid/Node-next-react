import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

export default () => (
  <Fragment>
    <Layout title="Signup">
      <div onClick={() => Router.push("/dashboard")}>
        <div>connect w/google</div>
        <div>connect w/Facebook</div>
      </div>
    </Layout>
    <style jsx>{``}</style>
  </Fragment>
);
