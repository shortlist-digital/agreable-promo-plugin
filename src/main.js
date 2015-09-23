require('./stylus/main.styl')

import DOMReady from 'detect-dom-ready'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './app'
import promotionsApp from './reducers/'
import { updateField, clearField, ScreenNames } from './actions/'
import * as fieldDefinitions from './data-structure.js'

DOMReady(function() {
  // Information about the promotion is bootstrapped from the server
  var agreablePromoData = window.agreablePromoData

  // Start building the state of the app withe defautlss
  var userData = {}
  Object.assign(userData,
    fieldDefinitions.email,
    fieldDefinitions.postData,
    fieldDefinitions.termsAndConditions
  )

  // Merge the fields for this promo into the app state
  agreablePromoData.fields.map((field, index) => {
    var fieldObject = fieldDefinitions[field]
    Object.assign(userData, fieldObject)
  })

  // Add the optins for this promo
  var numberOfOptIns = agreablePromoData.optins.length
  switch (numberOfOptIns) {
    case 0:
      break
    case 1:
      Object.assign(userData, fieldDefinitions[firstOptIn])
      break
    case 2:
      Object.assign(userData,
        fieldDefinitions.firstOptIn,
        fieldDefinitions.secondOptIn
      )
      break
    case 3:
      Object.assign(userData,
        fieldDefinitions.firstOptIn,
        fieldDefinitions.secondOptIn,
        fieldDefinitions.thirdOptIn
      )
    default:
      break
  }

  const { ENTER_SCREEN } = ScreenNames

  var initialState = {
    userData: userData,
    screen: {
      currentScreen: ENTER_SCREEN,
      prevScreen: null
    }
  }

  let store = createStore(promotionsApp, initialState)

  // We can populate the store with some data we already know about the promotion
  store.dispatch(updateField({name: 'Location', value: agreablePromoData.location}))
  store.dispatch(updateField({name: 'PostId', value: agreablePromoData.id}))

  // Setup optin keys
  agreablePromoData.optins.map((optin, index) => {
    store.dispatch(updateField({name: `ThirdPartyOptIn${index + 1}Key`, value: optin.name}))
  })

  // Log the initial state
  console.log('Initial State', store.getState())

  // Every time the state changes, log it
  /*
  var logCounter = 1
  let unsubscribe = store.subscribe(() => {
    console.log('Update', logCounter, store.getState())
    logCounter = logCounter + 1
  })
  */

  // Dispatch some test actions
  /*
  store.dispatch(updateField({name: 'Email', value: 'jon@andthats.it'}))
  store.dispatch(updateField({name: 'FirstName', value: 'Jonathon'}))
  store.dispatch(updateField({name: 'LastName', value: 'Sherrard'}))
  store.dispatch(clearField({name: 'Email'}))
  */

  let rootElement = document.getElementById('agreable-promotion')

  React.render(

  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    rootElement
  )
})
