import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema.js";

const server = new ApolloServer({ typeDefs, mocks: true });

server.listen().then(() => {
    console.log('server is running 🚀')
    console.log('at http://localhost:4000')
})