import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { stringToHex } from '@polkadot/util';
import BN from 'bn.js';

import logo from './logo.svg';
import './App.css';
import polymeshTypes from './polymeshTypes.json'

const PROVIDER_URL = 'wss://pmd.polymath.network'
const EMPTY = '0x0'
const ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000'

function App() {
  const [address, setAddress] = useState(null);
  const [api, setApi] = useState(null);
  const [did, setDid] = useState(null);
  const [nonce, setNonce] = useState(new BN(0));
  const [assets, setAssets] = useState(null)

  useEffect(() => {
    async function connect() {
      if (window.injectedWeb3 && window.injectedWeb3['polkadot-js']) {
        const allInjected = await web3Enable('my cool dapp')
        const allAccounts = await web3Accounts();
        const address = allAccounts[1]['address']
        const injector = await web3FromAddress(address)
        console.log(allInjected, address, injector)
        setAddress(address)
        
        // sets the signer for the address on the @polkadot/api
        const wsProvider = new WsProvider(PROVIDER_URL)
        const api = await ApiPromise.create({
          provider: wsProvider,
          types: polymeshTypes
        })
        api.setSigner(injector.signer);
        const nonce = await api.query.system.accountNonce(address);
        console.log('nonce', nonce.toString())
        setNonce(nonce)

        setApi(api)
        window.api = api
      }
      
      else {
        window.alert('Please install Polkadot.js browser extension')
      }
    }


    if (!api) {
      // Delaying connection as polkadot gets injected a bit later.
      setTimeout(connect, 1000)
    }
  }, [api])

    // Get identity
    useEffect(() => {
      async function getDid() {
        try {
          await api.tx.identity
            .getMyDid()
            .signAndSend(address, {nonce}, ({ events = [], status }) => {
              console.log('Transaction status:', status);
              if (status.isFinalized) {
                console.log('getMyDid events', events)
                events.forEach(({ phase, event: { data, method, section } }) => {
                  if(section === 'identity' && method === 'DidQuery') {
                    console.log('DidQuery data', data.toString())

                    const did = data[1].toString()
                    setDid(did)
                    setNonce(nonce.add(new BN(1)))
                  }
                });
                
              }
            })
        }
        catch (error) {
          setDid(EMPTY)
          console.log('getDid error', error)
        }
      }
  
      if (api && address) {
        getDid()
      }
    }, [api, address])

  // Register for identity
  useEffect(() => {
    async function registerDid() {
      try {
        await api.tx.identity
          .registerDid([])
          .signAndSend(address, {nonce}, ({ events = [], status }) => {
            console.log('Transaction status:', status);
            if (status.isFinalized) {
              events.forEach(({ phase, event: { data, method, section } }) => {
                if(section === 'identity' && method === 'NewDid') {
                  console.log('NewDid data', data.toString())

                  const did = data[0].toString()
                  setDid(did)
                  setNonce(nonce.add(new BN(1)))
                }
              });
              // setDid(ret)
              setNonce(nonce.add(new BN(1)))
            }
          })
      } 
      catch (error) {
        console.log('registerDid error', error)
      }
    }

    if (api && address && did === EMPTY) {
      registerDid()
    }
  }, [api, address, did])



  useEffect(() => {
    async function fetchToken() {
      const ticker = stringToHex('MYTOKEN')
      // const ticker = 'MyToken'
      // 0: {"name" => Bytes(50)}
      // 1: {"total_supply" => Type}
      // 2: {"owner_did" => Type(32)}
      // 3: {"divisible" => Bool}



      let tokenData = await api.query.asset.tokens(ticker)
      console.log(`tokenData ${ticker}:`, tokenData)
      let ownerDid = tokenData.get("owner_did").toString()
      console.log(ownerDid)

    }
    if (did && did !== EMPTY) {
      fetchToken()
    }
  }, [did])

  // async function createToken() {
  //   createToken(did, name, _ticker, total_supply, divisible)
  //   .createToken(dids[i], 'ticker', ticker, 1000000, true)
  // }

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
