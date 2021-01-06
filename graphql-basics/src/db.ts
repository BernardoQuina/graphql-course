// Typescript types
import { Post } from './typescript-types/Post'
import { User } from './typescript-types/User'
import { Comment } from './typescript-types/Comment'

export type DbContext = {
  db: {
    users: User[]
    posts: Post[]
    comments: Comment[]
  }
}

let users: User[] = [
  {
    id: '1',
    name: 'Bernardo',
    email: 'bernardo@example.com',
    age: 24,
    posts: ['1', '2'],
    comments: ['3'],
  },
  {
    id: '2',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
    posts: ['3'],
    comments: ['2'],
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@example.com',
    posts: [],
    comments: ['1'],
  },
  {
    id: '4',
    name: 'Mike',
    email: 'mike@example.com',
    posts: [],
    comments: ['4'],
  },
]

let posts: Post[] = [
  {
    id: '1',
    title: 'The first post',
    body: 'This is the body of the first post',
    published: true,
    author: '1',
    comments: ['4', '3'],
  },
  {
    id: '2',
    title: 'The second post is not published',
    body: 'This text is not readable by users because it is not published',
    published: false,
    author: '1',
    comments: ['2'],
  },
  {
    id: '3',
    title: 'GraphQL course',
    body: 'I am taking the GraphQL course by Andrew Mead on Udemy',
    published: true,
    author: '2',
    comments: ['1'],
  },
]

let comments: Comment[] = [
  {
    id: '1',
    text: 'This post is trash',
    author: '3',
    post: '3',
  },
  {
    id: '2',
    text: 'I do not find this useful at all',
    author: '2',
    post: '2',
  },
  {
    id: '3',
    text: 'I think this is great!',
    author: '1',
    post: '1',
  },
  {
    id: '4',
    text: 'Just wow!',
    author: '4',
    post: '1',
  },
]

const db = {
  users,
  posts,
  comments,
}

export { db as default }
