import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

client.query({
  query: gql`
    query getTracks {
      tracksForHome {
        id,
        length,
        title,
        author {
          id,
          name
        }
      }
    }
  `
})

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <List />
      </ApolloProvider>
    </>
  )
}


const GET_TRACKS = gql`
query getTracks {
  tracksForHome {
    id,
    length,
    title,
    author {
      id,
      name
    }
  }
}
`


function List() {
  const {loading, data, error} = useQuery(GET_TRACKS)
  if(loading) {
    return (
      <>
        <h1>Loading... ⌛</h1>
      </>
    )
  }

  if(error) {
    return (
      <>
        <h1>Error...❌</h1>
        <p>{JSON.stringify(error)}</p>
      </>
    )
  }

  return (
    <>
      <h1>list of items 😎</h1>
      <ul>
        {data.tracksForHome.map((track: any) => {
          return (
            <>
              <li key={track.id}>Title: {track.title}</li>
            </>
          )
        })}
      </ul>
    </>
  )
}