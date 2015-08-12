require('./stylus/main.styl')

window.React = window.React || require('react')

var Form = require('./components/form.js')

class AgreablePromotion extends React.Component {
  constructor () {
    super()
    this.state = {
      started: true,   
      open: false,
      closed: true
    }
  }
  componentDidMount () {
    this.setState({
      open: this.props.startTime <= this._now(),
      closed: this.props.endTime > this._now()
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
    var data = window.agreablePromoData
    if (this.state.started) {
      return (
        <Form {...data} />
      )
    } else {
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

