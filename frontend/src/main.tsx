import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';
import client from './apolloClient';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const appRoot = createRoot(root as HTMLElement);

appRoot.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);