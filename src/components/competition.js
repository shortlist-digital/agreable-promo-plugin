var react = require('react')

class Competition extends React.Component {

  componentWillMount () {
    console.log('Competition props: ', this.props)
  }

  render () {
    return (
      <h2>This will be the competition</h2>
    )
  }

}

module.exports = Competition
