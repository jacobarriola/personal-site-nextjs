import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout'
import Markdown from 'react-markdown'

const Post = ({post}) => {
  return (
    <Layout pageTitle={post.fields.title}>
      <article>
        <h1>{post.fields.title}</h1>
        <main>
          <Markdown source={post.fields.content} />
        </main>
      </article>
      <style jsx>{`
      h1 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: .25rem;
      }
  `}</style>
    </Layout>
  )
}

Post.getInitialProps = async function(context) {
  const {slug} = context.query

  const res = await fetch(`https://cdn.contentful.com/spaces/4pywjkutx049/environments/master/entries?access_token=a70d2276fb3f46ebc664b8aeab91d5cc7ee6ef7f9b6d2ce0aa8bdc56abb2d6b3&fields.slug=${slug}&content_type=blogPost`)

  const json = await res.json()

  return { post: json.items[0] }
}

export default Post
