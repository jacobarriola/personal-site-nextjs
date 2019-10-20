import Layout from '../components/layout'
import { useState } from 'react'
import fetch from 'isomorphic-unfetch'


const Spotify = () => {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState({items: []})

  const handleSearchChange = event => {
    setQuery(event.target.value)
  }

  const handleSubmission = event => {
    event.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=12`, {headers: {
      'Authorization': `Bearer BQDxFmPqX5c9bkHefbMSVzZGc_tK56S1sRuW7f7vgXARWtK8Hn1n56zRLvp-7g1Xur8RyuVCSVi70eELY2k`
    }})
  
    const json = await res.json()
  
    setItems(json.playlists)
  }

  return (
    <Layout pageTitle="Spotify">
      <h1>Spotify</h1>
      <form onSubmit={handleSubmission}>
        <label htmlFor="search">
          <span>Search</span>
          <input
            type="search"
            id="search"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {
          items.items.map(item => (
            <li key={item.id}>
              <img src={item.images[0].url} />
              <h2>{item.name}</h2>
            </li>
          ))
        }
      </ul>
      <style jsx>{`

      form {
        margin-bottom: 2.5rem;
      }

      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: -1.25rem 0 0 -1.25rem;
        padding-left: 0;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      li {
        margin: 1.25rem 0 0 1.25rem;
        width: calc(33.3333% - 1.25rem);
      }
  `}</style>
    </Layout>
  )
}

export default Spotify
