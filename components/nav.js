import Link from "next/link"

const links = [{ href: "/about", label: "About" }].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = ({ isAuthenticated }) => (
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
        <li key="dashboard">
          <Link prefetch href="/dashboard">
            <a>Dashboard</a>
          </Link>
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
      }
      nav > ul {
        padding: 4px 16px;
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

export default Nav
