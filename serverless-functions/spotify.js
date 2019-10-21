const fetch = require('isomorphic-unfetch')

exports.handler = async (event, context, callback) => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${event.queryStringParameters.query}&type=playlist&limit=12`, {headers: {
      'Authorization': `Bearer BQCvItkTYcIHCJvSipNtJT8NjgpiCLDsp842yTS16TiWHO7ywxyWRQ52L4AcWaiakGHE2Z1NrHC_HCqGwHI`
    }})
  
    const json = await res.json()

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `success`,
        data: json,
        event,
        context
      })
    }
  )
}