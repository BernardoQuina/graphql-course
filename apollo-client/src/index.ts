// If we want to use apollo client 3 without react we need to use /core
import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`

const usersPromise = async () => {
  const getUsersQuery = await client.query({
    query: getUsers,
  })

  let html = ''

  getUsersQuery.data.users.forEach((user: { id: string; name: string }) => {
    html += `
    <div>
      <h3>${user.name}</h3>
    </div>
    `
  })

  document.getElementById('users')!.innerHTML = html
}

const getPosts = gql`
  query {
    posts {
      id
      title
      author {
        name
      }
    }
  }
`

const postsPromise = async () => {
  const getPostsQuery = await client.query({
    query: getPosts,
  })

  let html = ''

  getPostsQuery.data.posts.forEach(
    (post: { id: string; title: string; author: { name: string } }) => {
      html += `
      <div>
        <h2>${post.title}</h2>
        <h4>Posted by ${post.author.name}</h4>
        <br />
      `
    }
  )

  document.getElementById('posts')!.innerHTML = html
}

usersPromise()
postsPromise()
