const fetch = require('node-fetch')

exports.handler = async (event) => {
  const ALLOWED_ORIGIN = 'https://admin.blog.farteam.com.ar'

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    }
  }

  const code = event.queryStringParameters && event.queryStringParameters.code
  if (!code) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN },
      body: JSON.stringify({ error: 'Missing code query parameter' })
    }
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    })
  })

  const data = await response.json()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
}
