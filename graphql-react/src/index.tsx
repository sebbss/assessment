import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import store from './store/store';
import { API_URL } from './config';



const client = new ApolloClient({ uri: API_URL, cache: new InMemoryCache()});

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
          <App/>
        </ApolloProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
