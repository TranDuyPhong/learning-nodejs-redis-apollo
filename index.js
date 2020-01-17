const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const query = require('qs-middleware');
const redis = require('redis');
const bluebird = require('bluebird');

const client = redis.createClient();

client.on('error', function(err) {
    console.error(err);
});

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const PORT = 3000;
const path = '/graphql';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        client
    }
});

app.use(query());

server.applyMiddleware({ app, path });

app.listen(PORT, function(err) {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
});