import { prisma } from '../../context'
import bcrypt from 'bcryptjs'

export const seedDatabase = async () => {
  // clear database
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // create dummy user
  const user = await prisma.user.create({
    data: {
      name: 'jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('jenjenjen'),
    },
  })

  // create dummy posts
  await prisma.post.create({
    data: {
      title: 'dummy post',
      body: 'dummy post body',
      published: true,
      author: { connect: { id: user.id } },
    },
  })

  await prisma.post.create({
    data: {
      title: 'dummy post 2',
      body: 'dummy post body 2',
      published: false,
      author: { connect: { id: user.id } },
    },
  })
}