import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { useEffect, useState } from 'react'

const Nav = () => {
  const [ items, setItems ] = useState([])

  useEffect(() => {
    async function fetchData () {
      const res = await fetch(`https://cdn.contentful.com/spaces/4pywjkutx049/environments/master/entries?access_token=a70d2276fb3f46ebc664b8aeab91d5cc7ee6ef7f9b6d2ce0aa8bdc56abb2d6b3&content_type=navigation`)

      const json = await res.json()

      populateNav(json.items[0].fields.items, json['includes'].Entry)
    }

    fetchData()
  }, [])

  const populateNav = (fields, entries)  => {
    fields.forEach(item => {
      const match = entries.find(entry => entry.sys.id === item.sys.id)
      if (match) {
        item.entry = match.fields
      }
    })

    setItems(fields)
  }

  return (
  <nav>
    <ul>
      {
        items.map(item => (
          <li key={item.sys.id}>
            <Link href={item.entry.link}>
              <a>{item.entry.name}</a>
            </Link>
          </li>
          )
        )
      }
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
        padding: 4px 16px 4px 0;
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

export default Nav
