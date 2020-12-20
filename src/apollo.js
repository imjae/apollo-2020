import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  cache: cache,
  link: link,
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        console.log(isLiked);
        const myMovie = {
          _typename: "Movie",
          id: `${id}`,
          isLiked: `${isLiked}`,
        };

        cache.modify({
          id: cache.identify(myMovie),
          fields: {
            isLiked: !isLiked
          },
        });
      },
    },
  },
});

export default client;
