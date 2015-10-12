import React, { Component } from 'react'
import Transition from 'react-motion-ui-pack'
import AnswerButton from '../components/answer-button'

class CompetitionScreen extends Component {

  componentWillMount() {
    this.competition = this.props.promoData.competition
  }

  _handleSelectAnswer = (answerIndex) => {
    const { answers } = this.competition
    this.props.updateField({target: {name:'AnswerOption', value: answerIndex}})
    this.props.updateField({target: {name:'AnswerCorrect', value: answers[answerIndex].answer_correct}})
  }

  _renderAnswers() {
    const { answers } = this.competition
    var answerNodes = answers.map((answerData, index) => {
      let selected = false
      if (this.props.userData.AnswerOption.value === index) {
        selected = true
      }

      return <AnswerButton
        key={index}
        {...answerData}
        index={index}
        selectAnswer={this._handleSelectAnswer.bind(this, index)}
        selected={selected}
      />
    })
    return answerNodes
  }

  _renderContinue() {
    if (this.props.userData.AnswerOption.dirty) {
      return <button
        onClick={this.props.nextScreen}
        className='agreable-promo__button agreable-promo__button--enter'
      >
        Continue
      </button>
    } else return null
  }

  render() {
    const { question } = this.competition
    return <div>
      <h1 style={{textAlign: 'center'}}>{question}</h1>
      {this._renderAnswers()}
      {this._renderContinue()}
    </div>
  }
}

export default CompetitionScreen
