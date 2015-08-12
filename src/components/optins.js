var React = require('react')

class Optins extends React.Component {
  
  componentDidMount = () => {
    console.log(this.props)
  }

  render () {
    return (
      <p>This will be the optins block</p>
    )
  }
}

module.exports = Optins

