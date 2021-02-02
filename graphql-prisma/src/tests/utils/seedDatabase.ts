import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Comment, Post, User } from '@prisma/client'

import { prisma } from '../../context'

export const userOne: {
  input: { name: string; email: string; password: string }
  user?: User
  jwt?: string // token
} = {
  input: {
    name: 'jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('jenjenjen'),
  },
}

export const userTwo: {
  input: { name: string; email: string; password: string }
  user?: User
  jwt?: string // token
} = {
  input: {
    name: 'sam',
    email: 'sam@example.com',
    password: bcrypt.hashSync('samsamsam'),
  },
}

export const postOne: {
  input: { title: string; body: string; published: boolean }
  post?: Post
} = {
  input: {
    title: 'dummy post',
    body: 'dummy post body',
    published: true,
  },
}

export const commentOne: {
  input: { text: string }
  comment?: Comment
} = {
  input: {
    text: 'dummy comment',
  },
}

export const commentTwo: {
  input: { text: string }
  comment?: Comment
} = {
  input: {
    text: 'dummy comment 2',
  },
}

// ****** Seed database ****** //

export const seedDatabase = async () => {
  // clear database
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // create dummy users
  userOne.user = await prisma.user.create({
    data: userOne.input,
  })

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  userTwo.user = await prisma.user.create({
    data: userTwo.input,
  })

  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

  // create dummy posts
  postOne.post = await prisma.post.create({
    data: {
      ...postOne.input,
      author: { connect: { id: userOne.user.id } },
    },
  })

  await prisma.post.create({
    data: {
      title: 'dummy post 2',
      body: 'dummy post body 2',
      published: false,
      author: { connect: { id: userOne.user.id } },
    },
  })

  // create dummy comments
  commentOne.comment = await prisma.comment.create({
    data: {
      ...commentOne.input,
      author: { connect: { id: userTwo.user.id } },
      post: { connect: { id: postOne.post?.id } },
    },
  })

  commentTwo.comment = await prisma.comment.create({
    data: {
      ...commentTwo.input,
      author: { connect: { id: userOne.user.id } },
      post: { connect: { id: postOne.post.id } },
    },
  })
}
