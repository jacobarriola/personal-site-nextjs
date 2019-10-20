const fetch = require('isomorphic-unfetch')

module.exports = {
  async exportPathMap () {
    const paths = {
      '/': { page: '/' }
    }

    const res = await fetch(`https://cdn.contentful.com/spaces/4pywjkutx049/environments/master/entries?access_token=a70d2276fb3f46ebc664b8aeab91d5cc7ee6ef7f9b6d2ce0aa8bdc56abb2d6b3`)
    const {items} = await res.json()

    items.forEach(post => {
      paths[`/post/${post.fields.slug}`] = { page: '/post/[slug]', query: post.fields.slug }
    });

    return paths
  }
}
