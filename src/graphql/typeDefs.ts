import gql from 'graphql-tag';

export default gql`
    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
    ) on FIELD_DEFINITION | OBJECT | INTERFACE
    type Author {
        name: String!
    }

    input AuthorInput {
        name: String!
    }

    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    type Message {
        _id: ID!
        text: String!
        author: Author!
        date: String!
    }

    input MessageInput {
        text: String!
        date: String!
        author: AuthorInput!
    }

    type Mutation {
        addMessage(message: MessageInput!): Message!
        addAuthor(author: AuthorInput!): Author!
        updateMessage(id: Int!, newText: String!): Status!
        deleteMessage(id: Int!): Status!
    }

    type Query {
        getAuthors: [Author]!
        getMessages: [Message]!
    }

    type Status {
        status: String!
        message: String
    }

    scalar Upload
`
