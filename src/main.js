require('./stylus/main.styl')

window.React = window.React || require('react')

var Form = require('./components/form.js')

class AgreablePromotion extends React.Component {
  constructor () {
    super()
  }
  render () {
    var data = window.agreablePromoData
    return (
      <Form {...data} />
    )
  }
}


var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

DOMReady(function() {
  var agreablePromotionWrapper = document.getElementById('agreable-promotion')
  React.render(<AgreablePromotion />, agreablePromotionWrapper)
})

