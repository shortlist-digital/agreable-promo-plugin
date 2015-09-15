require('./stylus/main.styl')

window.React = window.React || require('react')

var Form = require('./components/form.js')
var Competition = require('./components/competition.js')

var clockFace = require('./clock-face.svg')
var moment = require('moment')

class AgreablePromotion extends React.Component {

  constructor () {
    super()
    this.data = window.agreablePromoData
    this.state = {
      started: false,   
      open: this.data.startTime <= this._now(),
      closed: this.data.endTime < this._now(),
      competition: (this.data.fields.indexOf('competition') >= 0) ? true : false,
      competitionAnswered: false
    }
  }

  componentWillMount () {
    // Calculate state
    // If it hasn't started - show "opens in"
    // If it's closed - show "closed ago"
    // If it's running now show enter button
    // If it's running, and enter clicked, and it's a competition show competition
    // If it's running, and enter clicked, and it's a competition and the answer has been given show form
    // If its running, and enter clicked, show form
  }

  _now () {
    return Math.floor(new Date().getTime() / 1000)
  }

  _start = () => {
    this.setState({
      started: true
    })
  }

  _handleCompetitionAnswer (competitionAnswer) {
    this.setState({
      competitionAnswered: true,
      competitionAnswer: competitionAnswer
    })
    this.data.competitionAnswer = competitionAnswer
  }

  render () {
    var data = this.data
    if (this.state.started && this.state.open && this.state.competition && !this.state.competitionAnswered) {
      return <Competition {...data} handleAnswer={this._handleCompetitionAnswer.bind(this)} />
    }

    if (this.state.started && this.state.open && !this.state.closed) {
      return (
        <Form {...data} />
      )
    } else if (!this.state.open && !this.state.closed) {
      return (
        <div className="agreable-promo__not-open">
          <div className="agreable-promo__time-icon" dangerouslySetInnerHTML={{__html: clockFace}}></div>
          <h2 className="agreable-promo__time-message">Opens {moment(new Date(data.startTime*1000)).fromNow()} </h2>
        </div>
      )
    } else if (this.state.open && this.state.closed) {
      return (
        <div classNmae="agreable-promo__not-open">
          <div className="agreable-promo__time-icon" dangerouslySetInnerHTML={{__html: clockFace}}></div>
          <h2 className="agreable-promo__time-message">Sorry. This expired {moment(new Date(data.endTime*1000)).fromNow()} </h2>
        </div>
      )
    } else if (this.state.open ** !this.state.closed && !this.state.started) {
      return (
        <button onClick={this._start} className="agreable-promo__button agreable-promo__button--enter">Enter</button> 
      )
    }
  }
}


var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

DOMReady(function() {
  var agreablePromotionWrapper = document.getElementById('agreable-promotion')
  React.render(<AgreablePromotion />, agreablePromotionWrapper)
})

