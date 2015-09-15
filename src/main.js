import { createStore } from 'redux'
import { updateField, clearField } from './actions'
import promotionsApp from './reducers'

let store = createStore(promotionsApp)

console.log(store.getState())

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
console.log(store.getState())
)

// Dispatch some actions
store.dispatch(updateField({name: 'Email', value: 'jon@andthats.it'}))
store.dispatch(updateField({name: 'FirstName', value: 'Jonathon'}))
store.dispatch(updateField({name: 'LastName', value: 'Sherrard'}))

  // Stop listening to state updates
unsubscribe()


