import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { updateField, nextScreen, ScreenNames } from './actions'

const { ENTER_SCREEN, FORM_SCREEN } = ScreenNames

import EnterScreen from './enter-screen'
import FormScreen from './form-screen'

class App extends Component {

  _renderScreen = () => {
    // Injected by connect() call:
    const { dispatch, screen, userData} = this.props
    switch (screen.currentScreen) {
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


