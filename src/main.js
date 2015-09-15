require('./stylus/main.styl')

import DOMReady from './dom-ready'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './app'
import promotionsApp from './reducers'
import { updateField, clearField } from './actions'

DOMReady(function() {

  // Information about the promotion is bootstrapped from the server
  var agreablePromoData = window.agreablePromoData
  // Great a store based on the reducer functions
  let store = createStore(promotionsApp)
  // We can populate the store with some data we already know about the promotion
  store.dispatch(updateField({name: 'Location', value: agreablePromoData.location}))
  store.dispatch(updateField({name: 'PostId', value: agreablePromoData.id}))

  // Log the initial state
  console.log('Initial State', store.getState())

  // Every time the state changes, log it
  var logCounter = 1
  let unsubscribe = store.subscribe(() => {
    console.log('Update',logCounter, store.getState())
    logCounter = logCounter+1
  })

  // Dispatch some test actions
  /*
  store.dispatch(updateField({name: 'Email', value: 'jon@andthats.it'}))
  store.dispatch(updateField({name: 'FirstName', value: 'Jonathon'}))
  store.dispatch(updateField({name: 'LastName', value: 'Sherrard'}))
  store.dispatch(clearField({name: 'Email'}))
  */

  let rootElement = document.getElementById('agreable-promotion');
  React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    rootElement
  )

  // Stop listening to state updates
  unsubscribe()

})
