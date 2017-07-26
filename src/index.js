import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory,browserHistory } from 'react-router'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={hashHistory}
      routes={routes} />
    ,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()