import Nav from './nav'
import Head from 'next/head'

const style = {
  maxWidth: 900,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: 20,
}


const Layout = props => (
  <div style={style}>
    <Head>
      <title>{props.pageTitle || 'Home'} - Jacob Arriola</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    {props.children}
  </div>
)

export default Layout
