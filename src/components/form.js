var React = require('react')

var Optins = require('./optins.js')
var Email = require('./email.js')
var Name = require('./name.js')

class Form extends React.Component {
  constructor () {
    super()
  }

  componentDidMount () {
    console.log('Form: ', this.props)
  }

  _buildFormByField () {
    var fields = []
    if (this.props.fields) {
      console.log('yes fields')
      this.props.fields.map((field, index) => {
        switch (field) {
          case 'email':
            fields.push(
              <Email
                reportEmail={this._handleEmail}/>
            )
            break
        }
      }.bind(this))
    }
    return fields
  }

  _handleEmail = (emailString) => {
    console.log('form reporting emailString: ', emailString) 
  }

  render () {
    var fields = this._buildFormByField()
    return (
      <div>
        <h2>This is a form</h2>
        {fields}
        <Optins
          optins={this.props.optins}
        />
      </div>
    )
  }
}

module.exports = Form
