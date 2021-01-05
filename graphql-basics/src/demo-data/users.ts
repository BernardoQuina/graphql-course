import { User } from '../typescript-types/User'

export const users: User[] = [
  {
    id: '1',
    name: 'Bernardo',
    email: 'bernardo@example.com',
    age: 24,
    posts: ['1', '2'],
    comments: ['3']
  },
  {
    id: '2',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
    posts: ['3'],
    comments: ['2']
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@example.com',
    posts: [],
    comments: ['1']
  },
  {
    id: '4',
    name: 'Mike',
    email: 'mike@example.com',
    posts: [],
    comments: ['4']
  },
]