import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
// require("dotenv").config();

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API_URL,
});

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default MyApp;
