define("typescript-types/Comment", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("demo-data/comments", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.comments = void 0;
    exports.comments = [
        {
            id: '1',
            text: 'This post is trash',
            author: '3',
            post: '3'
        },
        {
            id: '2',
            text: 'I do not find this useful at all',
            author: '2',
            post: '2'
        },
        {
            id: '3',
            text: 'I think this is great!',
            author: '1',
            post: '1'
        },
        {
            id: '4',
            text: 'Just wow!',
            author: '4',
            post: '1'
        }
    ];
});
define("typescript-types/Post", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("demo-data/posts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.posts = void 0;
    exports.posts = [
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
    ];
});
define("typescript-types/User", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("demo-data/users", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.users = void 0;
    exports.users = [
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
    ];
});
define("index", ["require", "exports", "graphql-yoga", "uuid", "demo-data/comments", "demo-data/posts", "demo-data/users"], function (require, exports, graphql_yoga_1, uuid_1, comments_1, posts_1, users_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Type definitions (Schema)
    const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;
    // Resolvers
    const resolvers = {
        Query: {
            users(parent, args, ctx, info) {
                if (!args.query) {
                    return users_1.users;
                }
                return users_1.users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase());
                });
            },
            posts(parent, args, ctx, info) {
                if (!args.query) {
                    return posts_1.posts;
                }
                return posts_1.posts.filter((post) => {
                    return (post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                        post.body.toLowerCase().includes(args.query.toLowerCase()));
                });
            },
            comments(parent, args, ctx, info) {
                return comments_1.comments;
            },
            me() {
                return {
                    id: 'abc123',
                    name: 'Bernardo',
                    email: 'bernardo@example.com',
                    age: 24,
                };
            },
            post() {
                return {
                    id: '123084',
                    title: 'The title',
                    body: 'The body',
                    published: true,
                };
            },
        },
        Mutation: {
            createUser(parent, args, ctx, info) {
                const emailTaken = users_1.users.some((user) => user.email === args.data.email);
                if (emailTaken) {
                    throw new Error('Email already taken');
                }
                const user = Object.assign({ id: uuid_1.v4(), posts: [], comments: [] }, args.data);
                users_1.users.push(user);
                return user;
            },
            deleteUser(parent, args, ctx, info) {
                const userIndex = users_1.users.findIndex((user) => user.id === args.id);
                if (userIndex === -1) {
                    throw new Error('User not found');
                }
                const deletedUser = users_1.users.splice(userIndex, 1); // returns an array
                posts_1.posts = posts_1.posts.filter((post) => {
                });
                return deletedUser[0];
            },
            createPost(parent, args, ctx, info) {
                const userExists = users_1.users.some((user) => user.id === args.data.author);
                if (!userExists) {
                    throw new Error('User not found');
                }
                const post = Object.assign({ id: uuid_1.v4(), comments: [] }, args.data);
                posts_1.posts.push(post);
                return post;
            },
            createComment(parent, args, ctx, info) {
                const userExists = users_1.users.some((user) => user.id === args.data.author);
                const postExistsAndPublished = posts_1.posts.some((post) => {
                    return post.id === args.data.post && post.published;
                });
                if (!userExists) {
                    throw new Error('User not found');
                }
                if (!postExistsAndPublished) {
                    throw new Error('Post not found');
                }
                const comment = Object.assign({ id: uuid_1.v4() }, args.data);
                comments_1.comments.push(comment);
                return comment;
            },
        },
        Post: {
            author(parent, args, ctx, info) {
                return users_1.users.find((user) => {
                    return user.id === parent.author;
                });
            },
            comments(parent, args, ctx, info) {
                return comments_1.comments.filter((comment) => {
                    return comment.post === parent.id;
                });
            },
        },
        User: {
            posts(parent, args, ctx, info) {
                return posts_1.posts.filter((post) => {
                    return post.author === parent.id;
                });
            },
            comments(parent, args, ctx, info) {
                return comments_1.comments.filter((comment) => {
                    return comment.author === parent.id;
                });
            },
        },
        Comment: {
            author(parent, args, ctx, info) {
                return users_1.users.find((user) => {
                    return user.id === parent.author;
                });
            },
            post(parent, args, ctx, info) {
                return posts_1.posts.find((post) => {
                    return post.id === parent.post;
                });
            },
        },
    };
    const server = new graphql_yoga_1.GraphQLServer({
        typeDefs,
        resolvers,
    });
    server.start(() => {
        console.log('The server is up!');
    });
});
