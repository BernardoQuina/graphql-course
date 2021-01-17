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
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    postId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    text?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  CommentWhereInput: { // input type
    AND?: NexusGenInputs['CommentWhereInput'][] | null; // [CommentWhereInput!]
    author?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['CommentWhereInput'][] | null; // [CommentWhereInput!]
    OR?: NexusGenInputs['CommentWhereInput'][] | null; // [CommentWhereInput!]
    post?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    postId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    text?: NexusGenInputs['StringFilter'] | null; // StringFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  CommentWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  NestedBoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
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
  PostListRelationFilter: { // input type
    every?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    none?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    some?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
  }
  PostOrderByInput: { // input type
    body?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    published?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PostWhereInput: { // input type
    AND?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    author?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    body?: NexusGenInputs['StringFilter'] | null; // StringFilter
    comments?: NexusGenInputs['CommentListRelationFilter'] | null; // CommentListRelationFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    OR?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    published?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
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
  UserOrderByInput: { // input type
    email?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    comments?: NexusGenInputs['CommentListRelationFilter'] | null; // CommentListRelationFilter
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    posts?: NexusGenInputs['PostListRelationFilter'] | null; // PostListRelationFilter
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
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
}

export interface NexusGenObjects {
  Comment: { // root type
    id: string; // String!
    postId: string; // String!
    text: string; // String!
    userId: string; // String!
  }
  Mutation: {};
  Post: { // root type
    body: string; // String!
    id: string; // String!
    published: boolean; // Boolean!
    title: string; // String!
    userId: string; // String!
  }
  Query: {};
  Subscription: {};
  User: { // root type
    email: string; // String!
    id: string; // String!
    name: string; // String!
  }
  commentSubResponse: { // root type
    data?: NexusGenRootTypes['Comment'] | null; // Comment
    mutation?: string | null; // String
  }
  postSubResponse: { // root type
    data?: NexusGenRootTypes['Post'] | null; // Post
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
    author: NexusGenRootTypes['User']; // User!
    id: string; // String!
    post: NexusGenRootTypes['Post']; // Post!
    postId: string; // String!
    text: string; // String!
    userId: string; // String!
  }
  Mutation: { // field return type
    createComment: NexusGenRootTypes['Comment'] | null; // Comment
    createPost: NexusGenRootTypes['Post'] | null; // Post
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteComment: NexusGenRootTypes['Comment'] | null; // Comment
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    deleteUser: NexusGenRootTypes['User'] | null; // User
    updateComment: NexusGenRootTypes['Comment'] | null; // Comment
    updatePost: NexusGenRootTypes['Post'] | null; // Post
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Post: { // field return type
    author: NexusGenRootTypes['User']; // User!
    body: string; // String!
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    id: string; // String!
    published: boolean; // Boolean!
    title: string; // String!
    userId: string; // String!
  }
  Query: { // field return type
    comment: NexusGenRootTypes['Comment'] | null; // Comment
    commentCount: number | null; // Int
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
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
    postSub: NexusGenRootTypes['postSubResponse'] | null; // postSubResponse
    postSubByUser: NexusGenRootTypes['postSubResponse'] | null; // postSubResponse
  }
  User: { // field return type
    email: string; // String!
    id: string; // String!
    name: string; // String!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
  commentSubResponse: { // field return type
    data: NexusGenRootTypes['Comment'] | null; // Comment
    mutation: string | null; // String
  }
  postSubResponse: { // field return type
    data: NexusGenRootTypes['Post'] | null; // Post
    mutation: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Comment: { // field return type name
    author: 'User'
    id: 'String'
    post: 'Post'
    postId: 'String'
    text: 'String'
    userId: 'String'
  }
  Mutation: { // field return type name
    createComment: 'Comment'
    createPost: 'Post'
    createUser: 'User'
    deleteComment: 'Comment'
    deletePost: 'Post'
    deleteUser: 'User'
    updateComment: 'Comment'
    updatePost: 'Post'
    updateUser: 'User'
  }
  Post: { // field return type name
    author: 'User'
    body: 'String'
    comments: 'Comment'
    id: 'String'
    published: 'Boolean'
    title: 'String'
    userId: 'String'
  }
  Query: { // field return type name
    comment: 'Comment'
    commentCount: 'Int'
    comments: 'Comment'
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
    postSub: 'postSubResponse'
    postSubByUser: 'postSubResponse'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    name: 'String'
    posts: 'Post'
  }
  commentSubResponse: { // field return type name
    data: 'Comment'
    mutation: 'String'
  }
  postSubResponse: { // field return type name
    data: 'Post'
    mutation: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      postId: string; // String!
      text: string; // String!
      userId: string; // String!
    }
    createPost: { // args
      body: string; // String!
      published: boolean; // Boolean!
      title: string; // String!
      userId: string; // String!
    }
    createUser: { // args
      email: string; // String!
      name: string; // String!
    }
    deleteComment: { // args
      id: string; // String!
    }
    deletePost: { // args
      id: string; // String!
    }
    deleteUser: { // args
      id: string; // ID!
    }
    updateComment: { // args
      updateText: string; // String!
      whereId: string; // String!
    }
    updatePost: { // args
      updateBody: string; // String!
      updatePublished: boolean; // Boolean!
      updateTitle: string; // String!
      whereId: string; // String!
    }
    updateUser: { // args
      updateEmail?: string | null; // String
      updateName?: string | null; // String
      whereId: string; // ID!
    }
  }
  Post: {
    comments: { // args
      after?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      before?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Query: {
    comment: { // args
      where: NexusGenInputs['CommentWhereUniqueInput']; // CommentWhereUniqueInput!
    }
    comments: { // args
      after?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      before?: NexusGenInputs['CommentWhereUniqueInput'] | null; // CommentWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['CommentOrderByInput'][] | null; // [CommentOrderByInput!]
      where?: NexusGenInputs['CommentWhereInput'] | null; // CommentWhereInput
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    posts: { // args
      after?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      before?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['PostOrderByInput'][] | null; // [PostOrderByInput!]
      where?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['UserOrderByInput'][] | null; // [UserOrderByInput!]
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
  }
  User: {
    posts: { // args
      after?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      before?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
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