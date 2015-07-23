// var Backbone = require('backbone')
// var $ = require('jquery')
require('./stylus/main.styl')

// Backbone.$ = $

class Quiz extends Backbone.View {

  // scrolled = false

  constructor (options) {

    console.log('Quiz::constructor')
    this.setElement(options.el)
    this.$el = $(options.el)

    this.quizType = this.$el.data('quiz-type');
    this.$questions = this.$('.question')
    this.$progressItems = this.$('.cp-progress__items li')
    this.scrollTimer = new Date()

    // Backbone view events
    this.events = {
      'click .answer'         : 'onAnswerSelect',
      'click .cp-progress li' : 'moveToQuestion'
    };



    if (navigator.userAgent.indexOf('Chrome') > 0) {
      $('html').addClass('chrome')
    }

    if (navigator.userAgent.indexOf('Windows') > 0) {
     $('html').addClass('windows')
    }

    this.$el.addClass('cp-stylist')
    // this.addStyles() // Perhaps unneeded?
    this.render()
    super()

    $(window).scroll($.proxy(this.checkScroll, this))
  }

  moveToQuestion(e) {
    var $target = $(e.currentTarget);
    var questionNaturalIndex = parseInt($target.data('number'), 10) - 1
    var oldScrollTop = $(window).scrollTop()
    var $question = $("ul[data-question-index='question-" + questionNaturalIndex + "']")
    var newScrollTop = $question.offset().top + ($question.height() /2) - ($(window).height() /2)
    var distance = newScrollTop - oldScrollTop
    var speed = distance / 2
    if (speed < 0) {
      speed = speed * -1
    }

    $('html, body').animate({ scrollTop: newScrollTop } , speed)
  }

  updateQuiz(){
    var numberAnswered = this.$('.answer.selected').length
    console.log(numberAnswered, this.$questions.length)

    if (numberAnswered >= this.$questions.length) {
      var score = this.$el.find('.selected[data-cor]').length
      this.endQuiz(score)
    } else {
      var message = numberAnswered + ' of ' + this.$questions.length + ' answered'
      console.log(message)

      this.$('.cp-progress-text').html(message)
    }
  }

  updateProgressBarItem(index, el) {
    var $parent = $(el).parents('ul')
    var answeredQuestionIndex = $parent.data('question-index').replace('question-', '')
    var $item = this.$progressItems.eq(answeredQuestionIndex)
    $item.addClass('answered')
    if ($parent.find('.selected[data-cor]').length) {
      $item.addClass('correct')
    } else {
      $item.addClass('incorrect')
    }
  }

  updateProgressBar() {
    this.$progressItems
        .removeClass('answered')
        .removeClass('correct')
        .removeClass('incorrect')

    this.$('.selected').each($.proxy(this.updateProgressBarItem, this))
  }

  endQuiz(score) {
    this.$el.addClass('quiz-complete')

    // move to finish
    $(window).scrollTop(this.$('.quiz-complete-panel').position().top - (($(window).height() /2) -100))

    $('.cp-progress-text').html('You\'re done!')

    /* Reveal "Quiz complete!" */
    $('.score-panel').addClass('is-revealed')

    if (this.quizType === 'score') {
      this.showScore(score)
    } else {
      console.log(this.getTextOutcome())
      this.showTextOutcome(this.getTextOutcome())
    }

  }

  checkScroll() {
    var newTimer = new Date()
    if ((newTimer.getTime() - 50) <= this.scrollTimer.getTime()) {
      return
    }
    this.scrollTimer = newTimer
    this.positionProgressBar()
    // checkPageViews()
  }

  positionProgressBar() {

    if (($(window).scrollTop() + $(window).height()-100) > $('.cp-progress-anchor').offset().top) {
      $('.cp-progress').addClass('is-static')
    } else {
      $('.cp-progress').removeClass('is-static')
    }
  }

  onAnswerSelect(e) {
    var $target = $(e.currentTarget);
    $target.parents('ul').find('.answer').removeClass('selected')
    $target.addClass('selected')
    $target.parents('.quiz__question-container').addClass('answered')

    this.render()
  }

  getTextOutcome() {
    var mostPopularOutcome = {index: 1, score: 0}

    textOutcomes.forEach($.proxy(function onOutcome(outcome){
      var score = this.$el.find('.answers .selected[data-outcome-' + outcome.index + ']').length
        if (score > mostPopularOutcome.score) {
          mostPopularOutcome.index = outcome.index
          mostPopularOutcome.score = outcome.score = score
        }
    }, this))

    return textOutcomes[mostPopularOutcome.index -1]
  }

  showTextOutcome(outcome) {
    $('.score-panel__message').html(outcome.label)
    $('.score-panel__summary').html(outcome.description)
    $('.outcome-image').attr('src', outcome.image).show()

    this.showMore(1000)
  }

  showScore(score) {

    var numQuestions = this.$questions.length
    this.$('.score-panel__message__score').html(score)
    this.$el.find('.score-panel__message__total').html(numQuestions)

    var message
    if (score <= 8) {
      message = $('#cp-quiz-message-bad').html()
    } else if (score <= 13) {
      message = $('#cp-quiz-message-okay').html()
    } else if (score <= 17) {
      message = $('#cp-quiz-message-good').html()
    } else {
      message = $('#cp-quiz-message-excellent').html()
    }

    $('.score-panel__summary').html(message)

    /* Slowly reveal answers */
    var revealAnswerDuration = 200
    var revealOffest = 500
    var i = 1
    setTimeout(function() {
      $('.cp-progress li').each(function(index, el) {
        var $item = $(el)
        setTimeout(function() {
          $item.addClass('quiz-complete')
        }, i++ * revealAnswerDuration)
      })
    }, revealOffest)

    var timeTakenToRevealAnswers = revealOffest + (revealAnswerDuration * (numQuestions + 1))

    this.showMore()
  }

  showMore(timeTakenToRevealAnswers){

    /* Show answer information */
    $('.answer-information').addClass('is-revealed')

    /* Show result */
    setTimeout(function() {
     $('.score-panel__message').addClass('is-revealed')
    }, timeTakenToRevealAnswers)

    /* Show sarcastic message */
    setTimeout(function() {
      console.log(this.$('.score-panel__summary'))
      this.$('.score-panel__summary').addClass('is-revealed')
    }, timeTakenToRevealAnswers + 1000)

    /* Show sharing */
    setTimeout(function() {
      $('#cp-quiz-share').addClass('is-revealed')
    }, timeTakenToRevealAnswers + 2000)

  }

  render() {
    this.updateQuiz()
    this.updateProgressBar()
  }

}

var modules = $('.js-plugin-module[data-module="Quiz"]')
modules.each((index, el) => {
  new Quiz({el:el})
})

