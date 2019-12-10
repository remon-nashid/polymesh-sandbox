import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import logo from './logo.svg';
import './App.css';
import polymeshTypes from './polymeshTypes'

const PROVIDER_URL = 'ws://78.47.58.121:9944'
function App() {
  const [api, setApi] = useState(null);

  useEffect(() => {
    async function connect() {
      console.log('connecting')
      const wsProvider = new WsProvider(PROVIDER_URL)
      const api = await ApiPromise.create({
        provider: wsProvider,
        types: polymeshTypes
      })
      setApi(api)
      global.api = api
      console.log(api)
    }
    if (!api) {
      connect()
    }
  }, [api])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
