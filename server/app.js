import { GraphQLServer, PubSub } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

const opts = {
    port: 4000,
    endpoint: '/graphql'
}

const MSG_CHANNEL = 'MESSAGE_CHANNEL'

let messages = [];

const typeDefs = `
    type Message {
        id: ID!
        name: String!
        content: String!
    }

    type Query {
        messages: [Message]!
    }

    type Mutation {
        sendMessage(name: String!, content: String!): ID!
    }

    type Subscription {
        message: Message!
    }
`

const resolvers = {
    Query: {
        messages: () => messages,
    },

    Mutation: {
        sendMessage: (parent, { name, content }, { pubsub }) => {
            const id = uuidv4();
            const msg = {
                id,
                name,
                content,
            }
            messages.unshift(msg)
            pubsub.publish(MSG_CHANNEL, {
                message: msg
            })
            return id;
        }
    },

    Subscription: {
        message: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator(MSG_CHANNEL)
            }
        }
    }

}

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, opts, context: { pubsub } })

server.start(() => {
    console.log('Started graphql sevrer !!! ');
});