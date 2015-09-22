var react = require('react')

class Competition extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedAnswer: false
    }
  }

  componentWillMount() {
  }

  _handleChange = (object) => {
    this.setState({
      selectedAnswer: object
    })
  }

  _renderAnswers() {
    var answers = []
    this.props.competitionAnswers.map((answer, index) => {
      answers.push(
        <div key={index} className='agreable-promo__answer-container'>
          <label className='agreable-promo__answer-label'>
            <input
              className='agreable-promo__answer-input'
              type='radio'
              name='answer'
              value={answer.answer_text}
              onChange={this._handleChange.bind(null, answer)}
            />
            <span className='agreable-promo__answer-span'>{answer.answer_text}</span>
          </label>
        </div>
      )
    }.bind(this))
    return answers
  }

  _handleAnswer = () => {
    this.setState({message:false})
    if (this.state.selectedAnswer == false) {
      this.setState({message:'Please select an answer'})
    } else {
      this.props.handleAnswer(this.state.selectedAnswer)
    }
  }

  render() {
    return (
      <div>
        <h2 className='agreable-promo__question-text'>
          {this.props.competitionQuestion}
          {(this.props.competitionQuestion.indexOf('?') >= 0) ? '' : '?'}
        </h2>
        {this._renderAnswers()}
        <button className='agreable-promo__button agreable-promo__button--next' onClick={this._handleAnswer.bind(this)}>next</button>
        {!!this.state.message && <span className='agreable-promo__message agreable-promo__message--error'>{this.state.message}</span>}
      </div>
    )
  }

}

module.exports = Competition
