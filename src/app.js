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

  _renderScreen = () => {
    // Injected by connect() call:
    const { dispatch, screen, userData} = this.props
    switch (screen.currentScreen) {
    case CLOSED_SCREEN:
      return (
        <ClosedScreen
          promoData={window.agreablePromoData}
        />
      )
    case ENTER_SCREEN:
      return (
        <EnterScreen
          onEnterClick={()=> dispatch(nextScreen(FORM_SCREEN))}
        />
      )
    case FORM_SCREEN:
      return (
        <FormScreen
          promoData={window.agreablePromoData}
          userData={userData}
          updateField={this._dispatchFieldUpdate}
          updateCheckbox={this._dispatchCheckboxUpdate}
          isStoreValid={() => false}
        />
      )

    default:
      return (
        <h1>Competition not open yet</h1>
      )
    }
  }

  render() {
    return (
      <div>
        {this._renderScreen()}
      </div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
// You can write a function to filter the state,
// but I'm just returning in it's pure form
export default connect((state) => state)(App)
