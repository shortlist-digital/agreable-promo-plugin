import clockFace from '../assets/clock-face.svg'
import moment from 'moment'
import React, { Component } from 'react'

class ClosedScreen extends Component {

  componentDidMount() {
    console.log('Closed Screen')
  }

  _timeMessage = () => {
    let { timings } = this.props.promoData
    if (timings.end < this._now()) {
      return `Sorry. This expired ${moment(new Date(timings.end * 1000)).fromNow()}`
    }

    if ((timings.start > this._now()) && (timings.end > this._now())) {
      return `Opens ${moment(new Date(timings.start * 1000)).fromNow()}`
    }
  }

  _now() {
    return Math.floor(new Date().getTime() / 1000)
  }

  render() {
    return (
      <div className='agreable-promo__not-open'>
        <div
          className='agreable-promo__time-icon'
          dangerouslySetInnerHTML={{__html: clockFace}}>
        </div>
        <h2
          className='agreable-promo__time-message'
        >
          {this._timeMessage()}
        </h2>
      </div>
    )
  }
}

export default ClosedScreen
