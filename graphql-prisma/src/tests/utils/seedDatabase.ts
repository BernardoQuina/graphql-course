import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Post, User } from '@prisma/client'

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

export const seedDatabase = async () => {
  // clear database
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // create dummy user
  userOne.user = await prisma.user.create({
    data: userOne.input,
  })

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

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
}
