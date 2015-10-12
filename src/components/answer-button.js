import React, { Component } from 'react'

class AnswerButton extends Component {

  _svgClass = () => {
    let svgClass = 'agreable-promo__radio-highlight'
    if (this.props.selected) {
      svgClass = svgClass + ' agreable-promo__radio-highlight--show'
    }

    return svgClass
  }

  render() {
    let parentClassName = `agreable-promo__competition-answer agreable-promo__competition-answer--selected-${this.props.selected}`
    return <div
      className={parentClassName}
      onClick={this.props.selectAnswer}
    >
      <input
        className='agreable-promo__radio'
        type='radio'
        value={this.props.selected}
        defaultChecked={false}
        checked={this.props.selected}
        readOnly={true}
      />
      <svg
        className={this._svgClass()}
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M34.745,7.183C25.078,12.703,13.516,26.359,8.797,37.13 c-13.652,31.134,9.219,54.785,34.77,55.99c15.826,0.742,31.804-2.607,42.207-17.52c6.641-9.52,12.918-27.789,7.396-39.713 C85.873,20.155,69.828-5.347,41.802,13.379'
        >
        </path>
       </svg>
        {this.props.answer_text}

    </div>
  }
}

export default AnswerButton
