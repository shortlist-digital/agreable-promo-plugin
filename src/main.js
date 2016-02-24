require('es6-object-assign').polyfill()

require('./stylus/main.styl')

import DOMReady from 'detect-dom-ready'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import analytics from 'redux-analytics'
import App from './app'
import promotionsApp from './reducers'
import { updateField, clearField, ScreenNames } from './actions'
import * as fieldDefinitions from './data-structure.js'
import { standardScreenOrder, competitionScreenOrder} from './screen-order'
import stateBuilder from './state-builder'

let reduxAnalytics = analytics

DOMReady(function() {
  // Information about the promotion is bootstrapped from the server
  var agreablePromoData = window.agreablePromoData

  let initialState = stateBuilder(agreablePromoData)

  let store = createStore(promotionsApp, initialState)

  // DEFAULTS
  // We can populate the store with some data we already know about the promotion
  store.dispatch(updateField({name: 'Location', value: agreablePromoData.location}))
  store.dispatch(updateField({name: 'PostId', value: agreablePromoData.id}))

  if (agreablePromoData.sortingoffice) {
    store.dispatch(updateField({name: 'sortingoffice', value: agreablePromoData.sortingoffice}))
  }

  // Setup optin keys
  if (agreablePromoData.optins) {
    agreablePromoData.optins.map((optin, index) => {
      store.dispatch(updateField({
        name: `ThirdPartyOptIn${index + 1}Key`, value: optin.name
      }))
    })
  }

  // Every time the state changes, log it
  // Eventuall I'll get setup with redux dev-tools
  /*
  var logCounter = 1
  let unsubscribe = store.subscribe(() => {
    console.log('Update', logCounter, store.getState())
    logCounter = logCounter + 1
  })
  */

  let rootElement = document.getElementById('agreable-promotion')

  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    rootElement
  )
})
