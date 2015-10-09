import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { updateField, updateCheckbox, nextScreen, ScreenNames } from './actions'

const { ENTER_SCREEN, FORM_SCREEN, CLOSED_SCREEN } = ScreenNames

import ClosedScreen from './screens/closed'
import EnterScreen from './screens/enter'
import FormScreen from './screens/form'

class App extends Component {

  _dispatchFieldUpdate = (event) => {
    this.props.dispatch(updateField({
      name: event.target.name,
      value: event.target.value
    }))
  }

  _dispatchCheckboxUpdate = (event) => {
    this.props.dispatch(updateCheckbox({
      name: event.target.name
    }))
  }

  _dispatchNextScreen = (event) => {
    this.props.dispatch(nextScreen())
  }

  _dispatchPrevScreen = (event) => {
    this.props.dispatch(prevScreen())

  }

  render() {
    // Injected by connect() call:
    const dispatchers = {
      nextScreen: this._dispatchNextScreen,
      prevScreen: this._dispatchPrevScreen,
      updateCheckbox: this._dispatchCheckboxUpdate,
      updateField: this._dispatchFieldUpdate
    }

    // Render whatever screen is defined
    // in the current state
    switch (this.props.screen.currentScreen) {

    case CLOSED_SCREEN:
      return (
        <ClosedScreen
          {...this.props}
          {...dispatchers}
        />
      )
    case ENTER_SCREEN:
      return (
        <EnterScreen
          {...dispatchers}
        />
      )
    case FORM_SCREEN:
      return (
        <FormScreen
          {...this.props}
          {...dispatchers}
          isStoreValid={() => false}
        />
      )
    default:
      return (
        <h1 style={{textAlign:'center'}}>Something went dreadfully wrong</h1>
      )
    }
  }
}

// Wrap the component to inject dispatch and state into it
// You can write a function to filter the state,
// but I'm just returning in it's pure form
export default connect((state) => state)(App)
