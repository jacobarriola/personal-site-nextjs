import Link from "next/link"
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'

const PostLink = ({post}) => (
  <>
    <li>
      <Link href="/post/[slug]" as={`/post/${post.fields.slug}`}>
        <a title={post.fields.title}>{post.fields.title}</a>
      </Link>
      <p>{post.fields.excerpt}</p>
    </li>
    <style jsx>{`
      a {
        text-decoration: none;
        font-size: 24px;
        display: inline-block;
        color: black;
        font-weight: 700;
        margin-bottom: .25rem;
      }
      li {
        margin-bottom: 2rem;
      }
      p {
        margin-top: 0;
      }
  `}</style>
  </>
)

const Home = ({posts}) => {
  return (
    <Layout>
      <ul>
        {posts.map(post => <PostLink post={post} key={post.sys.id} />)}
      </ul>
      <style jsx>{`
        ul {
          list-style:none;
          margin: 0;
          padding: 0;
        }

        a {
          text-decoration: none;
        }
      `}</style>
    </Layout>
  )
}

Home.getInitialProps = async function() {
  const res = await fetch(`https://cdn.contentful.com/spaces/4pywjkutx049/environments/master/entries?access_token=a70d2276fb3f46ebc664b8aeab91d5cc7ee6ef7f9b6d2ce0aa8bdc56abb2d6b3&content_type=blogPost`)
  const json = await res.json()

  return { posts: json.items }
}

export default Home
