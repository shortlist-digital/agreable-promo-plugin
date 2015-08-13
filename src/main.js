require('./stylus/main.styl')

window.React = window.React || require('react')

var Form = require('./components/form.js')

var clockFace = require('./clock-face.svg')
var moment = require('moment')

class AgreablePromotion extends React.Component {
  constructor () {
    super()
    this.data = window.agreablePromoData
    this.state = {
      started: false,   
      open: false,
      closed: true
    }
  }
  componentDidMount () {
    this.setState({
      open: this.data.startTime <= this._now(),
      closed: this.data.endTime < this._now()
    })
  }

  _now () {
    return Math.floor(new Date().getTime() / 1000)
  }

  _start = () => {
    this.setState({
      started: true
    })
  }

  render () {
    var data = this.data
    if (this.state.started && this.state.open && !this.state.closed) {
      return (
        <Form {...data} />
      )
    } else if (!this.state.open && !this.state.closed) {
      return (
        <div classNmae="agreable-promo__not-open">
          <div className="agreable-promo__time-icon" dangerouslySetInnerHTML={{__html: clockFace}}></div>
          <h2 className="agreable-promo__time-message">Opens {moment(new Date(data.startTime*1000)).fromNow()} </h2>
        </div>
      )
    } else if (this.state.open && this.state.closed) {
      return (
        <div classNmae="agreable-promo__not-open">
          <div className="agreable-promo__time-icon" dangerouslySetInnerHTML={{__html: clockFace}}></div>
          <h2 className="agreable-promo__time-message">Sorry. This expired {moment(new Date(data.startTime*1000)).fromNow()} </h2>
        </div>
      )
    } else if (this.state.open ** !this.state.closed && !this.state.started) {
      return (
        <button onClick={this._start} className="agreable-promo__enter-button">Enter</button> 
      )
    }
  }
}


var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

DOMReady(function() {
  var agreablePromotionWrapper = document.getElementById('agreable-promotion')
  React.render(<AgreablePromotion />, agreablePromotionWrapper)
})

