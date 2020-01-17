const resolvers = {
    Query: {
        get: (parent, { key }, { client }) => {
            try {
                return client.getAsync(key);
            } catch (err) {
                console.error(err);
                return "";
            }
        }
    },
    Mutation: {
        set: async(parent, { key, value }, { client }) => {
            try {
                await client.set(key, value);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        }
    }
};

module.exports = resolvers;