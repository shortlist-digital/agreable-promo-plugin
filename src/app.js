import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { updateField, nextScreen } from './actions'

import EnterScreen from './enter-screen'

class App extends Component {

  componentWillMount() {
    console.log('App Component', this)
  }

  _renderScreen = () => {
    const { dispatch } = this.props
    if (this.props.screen == 0) {
      return (
        <EnterScreen 
          onEnterClick={()=> dispatch(nextScreen())}
        />
      )
    }
  }

  render() {
    // Injected by connect() call:
    const { dispatch } = this.props
    return (
      <div>
        {this._renderScreen()}
      </div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect((state) => state)(App)


