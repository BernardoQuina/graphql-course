import { objectType } from 'nexus'

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
    t.model.receiver()
    t.model.receiverId()
    t.model.dispatcher()
    t.model.dispatcherId()
    t.model.seen()
    t.model.read()
    t.model.message()
    t.model.link()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
