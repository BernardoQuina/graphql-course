/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./context"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  BoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  CommentListRelationFilter: { // input type
    every?: NexusGenInputs['CommentWhereInput'] | null; // CommentWhereInput
    none?: NexusGenInputs['CommentWhereInput'] | null; // CommentWhereInput
    some?: NexusGenInputs['CommentWhereInput'] | null; // CommentWhereInput
  }
  CommentOrderByInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    postId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    text?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  CommentWhereInput: { // input type
    AND?: NexusGenInputs['CommentWhereInput'][] | null; // [CommentWhereInput!]
    NOT?: NexusGenInputs['CommentWhereInput'][] | null; // [CommentWhereInput!]
    OR?: NexusGenInputs['CommentWhereInput'][] | null; // [CommentWhereInput!]
    author?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    post?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    postId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    text?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  CommentWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  DateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  LikeListRelationFilter: { // input type
    every?: NexusGenInputs['LikeWhereInput'] | null; // LikeWhereInput
    none?: NexusGenInputs['LikeWhereInput'] | null; // LikeWhereInput
    some?: NexusGenInputs['LikeWhereInput'] | null; // LikeWhereInput
  }
  LikeOrderByInput: { // input type
    active?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    postId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  LikeUserIdPostIdCompoundUniqueInput: { // input type
    postId: string; // String!
    userId: string; // String!
  }
  LikeWhereInput: { // input type
    AND?: NexusGenInputs['LikeWhereInput'][] | null; // [LikeWhereInput!]
    NOT?: NexusGenInputs['LikeWhereInput'][] | null; // [LikeWhereInput!]
    OR?: NexusGenInputs['LikeWhereInput'][] | null; // [LikeWhereInput!]
    active?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    author?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    post?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    postId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  LikeWhereUniqueInput: { // input type
    userId_postId?: NexusGenInputs['LikeUserIdPostIdCompoundUniqueInput'] | null; // LikeUserIdPostIdCompoundUniqueInput
  }
  NestedBoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  NestedDateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NestedStringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  PostListRelationFilter: { // input type
    every?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    none?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    some?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
  }
  PostOrderByInput: { // input type
    body?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    images?: NexusGenEnums['SortOrder'] | null; // SortOrder
    published?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PostWhereInput: { // input type
    AND?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    NOT?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    OR?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    author?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    body?: NexusGenInputs['StringFilter'] | null; // StringFilter
    comments?: NexusGenInputs['CommentListRelationFilter'] | null; // CommentListRelationFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    images?: NexusGenInputs['StringNullableListFilter'] | null; // StringNullableListFilter
    likes?: NexusGenInputs['LikeListRelationFilter'] | null; // LikeListRelationFilter
    published?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  PostWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  StringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  StringNullableListFilter: { // input type
    equals?: string[] | null; // [String!]
    has?: string | null; // String
    hasEvery?: string[] | null; // [String!]
    hasSome?: string[] | null; // [String!]
    isEmpty?: boolean | null; // Boolean
  }
  UserOrderByInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    email?: NexusGenEnums['SortOrder'] | null; // SortOrder
    facebookId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    googleId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    password?: NexusGenEnums['SortOrder'] | null; // SortOrder
    photo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    comments?: NexusGenInputs['CommentListRelationFilter'] | null; // CommentListRelationFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    facebookId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    googleId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    likes?: NexusGenInputs['LikeListRelationFilter'] | null; // LikeListRelationFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    password?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    photo?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    posts?: NexusGenInputs['PostListRelationFilter'] | null; // PostListRelationFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    facebookId?: string | null; // String
    googleId?: string | null; // String
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
  QueryMode: "default" | "insensitive"
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Comment: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    postId?: string | null; // String
    text?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Like: { // root type
    active?: boolean | null; // Boolean
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    postId?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Mutation: {};
  Post: { // root type
    body?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    images: string[]; // [String!]!
    published?: boolean | null; // Boolean
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Query: {};
  Subscription: {};
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    facebookId?: string | null; // String
    googleId?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
    photo?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  commentSubResponse: { // root type
    data?: NexusGenRootTypes['Comment'] | null; // Comment
    mutation?: string | null; // String
  }
  postSubResponse: { // root type
    data?: NexusGenRootTypes['Post'] | null; // Post
    mutation?: string | null; // String
  }
  userSubResponse: { // root type
    data?: NexusGenRootTypes['User'] | null; // User
    mutation?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Comment: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    post: NexusGenRootTypes['Post'] | null; // Post
    postId: string | null; // String
    text: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string | null; // String
  }
  Like: { // field return type
    active: boolean | null; // Boolean
    author: NexusGenRootTypes['User'] | null; // User
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    post: NexusGenRootTypes['Post'] | null; // Post
    postId: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string | null; // String
  }
  Mutation: { // field return type
    createComment: NexusGenRootTypes['Comment'] | null; // Comment
    createPost: NexusGenRootTypes['Post'] | null; // Post
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteComment: NexusGenRootTypes['Comment'] | null; // Comment
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    deleteUser: NexusGenRootTypes['User'] | null; // User
    forgotPassword: boolean | null; // Boolean
    likePost: NexusGenRootTypes['Like'] | null; // Like
    loginUser: NexusGenRootTypes['User'] | null; // User
    logoutUser: boolean | null; // Boolean
    updateComment: NexusGenRootTypes['Comment'] | null; // Comment
    updatePost: NexusGenRootTypes['Post'] | null; // Post
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    body: string | null; // String
    commentCount: number | null; // Int
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    images: string[]; // [String!]!
    likeCount: number | null; // Int
    likes: NexusGenRootTypes['Like'][]; // [Like!]!
    published: boolean | null; // Boolean
    textSnippet: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string | null; // String
  }
  Query: { // field return type
    comment: NexusGenRootTypes['Comment'] | null; // Comment
    commentCount: number | null; // Int
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    like: NexusGenRootTypes['Like'] | null; // Like
    likeCount: number | null; // Int
    likes: NexusGenRootTypes['Like'][]; // [Like!]!
    me: NexusGenRootTypes['User'] | null; // User
    myPosts: Array<NexusGenRootTypes['Post'] | null>; // [Post]!
    post: NexusGenRootTypes['Post'] | null; // Post
    postCount: number | null; // Int
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    user: NexusGenRootTypes['User'] | null; // User
    userCount: number | null; // Int
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Subscription: { // field return type
    commentSub: NexusGenRootTypes['commentSubResponse'] | null; // commentSubResponse
    commentSubByPost: NexusGenRootTypes['commentSubResponse'] | null; // commentSubResponse
    commentSubByUser: NexusGenRootTypes['commentSubResponse'] | null; // commentSubResponse
    myPostSub: NexusGenRootTypes['postSubResponse'] | null; // postSubResponse
    postSub: NexusGenRootTypes['postSubResponse'] | null; // postSubResponse
    postSubByUser: NexusGenRootTypes['postSubResponse'] | null; // postSubResponse
    userSub: NexusGenRootTypes['userSubResponse'] | null; // userSubResponse
  }
  User: { // field return type
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    facebookId: string | null; // String
    googleId: string | null; // String
    id: string | null; // String
    likes: NexusGenRootTypes['Like'][]; // [Like!]!
    name: string | null; // String
    password: string | null; // String
    photo: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  commentSubResponse: { // field return type
    data: NexusGenRootTypes['Comment'] | null; // Comment
    mutation: string | null; // String
  }
  postSubResponse: { // field return type
    data: NexusGenRootTypes['Post'] | null; // Post
    mutation: string | null; // String
  }
  userSubResponse: { // field return type
    data: NexusGenRootTypes['User'] | null; // User
    mutation: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Comment: { // field return type name
    author: 'User'
    createdAt: 'DateTime'
    id: 'String'
    post: 'Post'
    postId: 'String'
    text: 'String'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Like: { // field return type name
    active: 'Boolean'
    author: 'User'
    createdAt: 'DateTime'
    post: 'Post'
    postId: 'String'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Mutation: { // field return type name
    createComment: 'Comment'
    createPost: 'Post'
    createUser: 'User'
    deleteComment: 'Comment'
    deletePost: 'Post'
    deleteUser: 'User'
    forgotPassword: 'Boolean'
    likePost: 'Like'
    loginUser: 'User'
    logoutUser: 'Boolean'
    updateComment: 'Comment'
    updatePost: 'Post'
    updateUser: 'User'
  }
  Post: { // field return type name
    author: 'User'
    body: 'String'
    commentCount: 'Int'
    comments: 'Comment'
    createdAt: 'DateTime'
    id: 'String'
    images: 'String'
    likeCount: 'Int'
    likes: 'Like'
    published: 'Boolean'
    textSnippet: 'String'
    title: 'String'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Query: { // field return type name
    comment: 'Comment'
    commentCount: 'Int'
    comments: 'Comment'
    like: 'Like'
    likeCount: 'Int'
    likes: 'Like'
    me: 'User'
    myPosts: 'Post'
    post: 'Post'
    postCount: 'Int'
    posts: 'Post'
    user: 'User'
    userCount: 'Int'
    users: 'User'
  }
  Subscription: { // field return type name
    commentSub: 'commentSubResponse'
    commentSubByPost: 'commentSubResponse'
    commentSubByUser: 'commentSubResponse'
    myPostSub: 'postSubResponse'
    postSub: 'postSubResponse'
    postSubByUser: 'postSubResponse'
    userSub: 'userSubResponse'
  }
  User: { // field return type name
    comments: 'Comment'
    createdAt: 'DateTime'
    email: 'String'
    facebookId: 'String'
    googleId: 'String'
    id: 'String'
    likes: 'Like'
    name: 'String'
    password: 'String'
    photo: 'String'
    posts: 'Post'
    updatedAt: 'DateTime'
  }
  commentSubResponse: { // field return type name
    data: 'Comment'
    mutation: 'String'
  }
  postSubResponse: { // field return type name
    data: 'Post'
    mutation: 'String'
  }
  userSubResponse: { // field return type name
    data: 'User'
    mutation: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      postId: string; // String!
      text: string; // String!
    }
    createPost: { // args
      body: string; // String!
      images: string[]; // [String!]!
      published: boolean; // Boolean!
      title: string; // String!
    }
    createUser: { // args
      confirmPassword: string; // String!
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    deleteComment: { // args
      id: string; // String!
    }
    deletePost: { // args
      id: string; // String!
    }
    deleteUser: { // args
      password?: string | null; // String
    }
    forgotPassword: { // args
      email: string; // String!
    }
    likePost: { // args
      postId: string; // String!
    }
    loginUser: { // args
      email: string; // String!
      password: string; // String!
    }
    updateComment: { // args
      updateText: string; // String!
      whereId: string; // String!
    }
    updatePost: { // args
      updateBody?: string | null; // String
      updatePublished?: boolean | null; // Boolean
      updateTitle?: string | null; // String
      whereId: string; // String!
    }
    updateUser: { // args
      confirmNewPassword?: string | null; // String
      password: string; // String!
      updateEmail?: string | null; // String
      updateName?: string | null; // String
      updatePassword?: string | null; // String
      updatePhoto?: string | null; // String
    }
  }
  Post: {
    comments: { // args
      cursor?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    likes: { // args
      cursor?: NexusGenInputs['LikeWhereUniqueInput'] | null; // LikeWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  Query: {
    comment: { // args
      where: NexusGenInputs['CommentWhereUniqueInput']; // CommentWhereUniqueInput!
    }
    comments: { // args
      cursor?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      orderBy?: NexusGenInputs['CommentOrderByInput'][] | null; // [CommentOrderByInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['CommentWhereInput'] | null; // CommentWhereInput
    }
    like: { // args
      where: NexusGenInputs['LikeWhereUniqueInput']; // LikeWhereUniqueInput!
    }
    likes: { // args
      cursor?: NexusGenInputs['LikeWhereUniqueInput'] | null; // LikeWhereUniqueInput
      orderBy?: NexusGenInputs['LikeOrderByInput'][] | null; // [LikeOrderByInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['LikeWhereInput'] | null; // LikeWhereInput
    }
    myPosts: { // args
      skip: number; // Int!
      take: number; // Int!
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    posts: { // args
      cursor?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      orderBy?: NexusGenInputs['PostOrderByInput'][] | null; // [PostOrderByInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      cursor?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      orderBy?: NexusGenInputs['UserOrderByInput'][] | null; // [UserOrderByInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
  }
  Subscription: {
    commentSub: { // args
      commentId: string; // ID!
    }
    commentSubByPost: { // args
      postId: string; // ID!
    }
    commentSubByUser: { // args
      userId: string; // ID!
    }
    postSub: { // args
      postId: string; // ID!
    }
    postSubByUser: { // args
      userId: string; // ID!
    }
    userSub: { // args
      userId: string; // ID!
    }
  }
  User: {
    comments: { // args
      cursor?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    likes: { // args
      cursor?: NexusGenInputs['LikeWhereUniqueInput'] | null; // LikeWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    posts: { // args
      cursor?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}