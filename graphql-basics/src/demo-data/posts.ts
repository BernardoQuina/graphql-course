import { Post } from '../typescript-types/Post'

export const posts: Post[] = [
  {
    id: '1',
    title: 'The first post',
    body: 'This is the body of the first post',
    published: true,
    author: '1',
    comments: ['4', '3']
  },
  {
    id: '2',
    title: 'The second post is not published',
    body: 'This text is not readable by users because it is not published',
    published: false,
    author: '1',
    comments: ['2']
  },
  {
    id: '3',
    title: 'GraphQL course',
    body: 'I am taking the GraphQL course by Andrew Mead on Udemy',
    published: true,
    author: '2',
    comments: ['1']
  },
]