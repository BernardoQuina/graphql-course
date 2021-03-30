import { objectType } from 'nexus';

export const LikeNotification = objectType({
  name: 'LikeNotification',
  definition(t) {
    t.model.id()
    t.model.receiver()
    t.model.userId()
    t.model.message()
    t.model.read()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.like()
    t.model.likeAuthorId()
    t.model.post()
    t.model.postId()
  }
})