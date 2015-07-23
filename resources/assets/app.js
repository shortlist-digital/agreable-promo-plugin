/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	// var Backbone = require('backbone')
	// var $ = require('jquery')
	__webpack_require__(1);

	// Backbone.$ = $

	var Quiz = (function (_Backbone$View) {

	  // scrolled = false

	  function Quiz(options) {
	    _classCallCheck(this, Quiz);

	    console.log("Quiz::constructor");
	    this.setElement(options.el);
	    this.$el = $(options.el);

	    this.quizType = this.$el.data("quiz-type");
	    this.$questions = this.$(".question");
	    this.$progressItems = this.$(".cp-progress__items li");
	    this.scrollTimer = new Date();

	    // Backbone view events
	    this.events = {
	      "click .answer": "onAnswerSelect",
	      "click .cp-progress li": "moveToQuestion"
	    };

	    if (navigator.userAgent.indexOf("Chrome") > 0) {
	      $("html").addClass("chrome");
	    }

	    if (navigator.userAgent.indexOf("Windows") > 0) {
	      $("html").addClass("windows");
	    }

	    this.$el.addClass("cp-stylist");
	    // this.addStyles() // Perhaps unneeded?
	    this.render();
	    _get(Object.getPrototypeOf(Quiz.prototype), "constructor", this).call(this);

	    $(window).scroll($.proxy(this.checkScroll, this));
	  }

	  _inherits(Quiz, _Backbone$View);

	  _createClass(Quiz, {
	    moveToQuestion: {
	      value: function moveToQuestion(e) {
	        var $target = $(e.currentTarget);
	        var questionNaturalIndex = parseInt($target.data("number"), 10) - 1;
	        var oldScrollTop = $(window).scrollTop();
	        var $question = $("ul[data-question-index='question-" + questionNaturalIndex + "']");
	        var newScrollTop = $question.offset().top + $question.height() / 2 - $(window).height() / 2;
	        var distance = newScrollTop - oldScrollTop;
	        var speed = distance / 2;
	        if (speed < 0) {
	          speed = speed * -1;
	        }

	        $("html, body").animate({ scrollTop: newScrollTop }, speed);
	      }
	    },
	    updateQuiz: {
	      value: function updateQuiz() {
	        var numberAnswered = this.$(".answer.selected").length;
	        console.log(numberAnswered, this.$questions.length);

	        if (numberAnswered >= this.$questions.length) {
	          var score = this.$el.find(".selected[data-cor]").length;
	          this.endQuiz(score);
	        } else {
	          var message = numberAnswered + " of " + this.$questions.length + " answered";
	          console.log(message);

	          this.$(".cp-progress-text").html(message);
	        }
	      }
	    },
	    updateProgressBarItem: {
	      value: function updateProgressBarItem(index, el) {
	        var $parent = $(el).parents("ul");
	        var answeredQuestionIndex = $parent.data("question-index").replace("question-", "");
	        var $item = this.$progressItems.eq(answeredQuestionIndex);
	        $item.addClass("answered");
	        if ($parent.find(".selected[data-cor]").length) {
	          $item.addClass("correct");
	        } else {
	          $item.addClass("incorrect");
	        }
	      }
	    },
	    updateProgressBar: {
	      value: function updateProgressBar() {
	        this.$progressItems.removeClass("answered").removeClass("correct").removeClass("incorrect");

	        this.$(".selected").each($.proxy(this.updateProgressBarItem, this));
	      }
	    },
	    endQuiz: {
	      value: function endQuiz(score) {
	        this.$el.addClass("quiz-complete");

	        // move to finish
	        $(window).scrollTop(this.$(".quiz-complete-panel").position().top - ($(window).height() / 2 - 100));

	        $(".cp-progress-text").html("You're done!");

	        /* Reveal "Quiz complete!" */
	        $(".score-panel").addClass("is-revealed");

	        if (this.quizType === "score") {
	          this.showScore(score);
	        } else {
	          console.log(this.getTextOutcome());
	          this.showTextOutcome(this.getTextOutcome());
	        }
	      }
	    },
	    checkScroll: {
	      value: function checkScroll() {
	        var newTimer = new Date();
	        if (newTimer.getTime() - 50 <= this.scrollTimer.getTime()) {
	          return;
	        }
	        this.scrollTimer = newTimer;
	        this.positionProgressBar();
	      }
	    },
	    positionProgressBar: {
	      value: function positionProgressBar() {

	        if ($(window).scrollTop() + $(window).height() - 100 > $(".cp-progress-anchor").offset().top) {
	          $(".cp-progress").addClass("is-static");
	        } else {
	          $(".cp-progress").removeClass("is-static");
	        }
	      }
	    },
	    onAnswerSelect: {
	      value: function onAnswerSelect(e) {
	        var $target = $(e.currentTarget);
	        $target.parents("ul").find(".answer").removeClass("selected");
	        $target.addClass("selected");
	        $target.parents(".quiz__question-container").addClass("answered");

	        this.render();
	      }
	    },
	    getTextOutcome: {
	      value: function getTextOutcome() {
	        var mostPopularOutcome = { index: 1, score: 0 };

	        textOutcomes.forEach($.proxy(function onOutcome(outcome) {
	          var score = this.$el.find(".answers .selected[data-outcome-" + outcome.index + "]").length;
	          if (score > mostPopularOutcome.score) {
	            mostPopularOutcome.index = outcome.index;
	            mostPopularOutcome.score = outcome.score = score;
	          }
	        }, this));

	        return textOutcomes[mostPopularOutcome.index - 1];
	      }
	    },
	    showTextOutcome: {
	      value: function showTextOutcome(outcome) {
	        $(".score-panel__message").html(outcome.label);
	        $(".score-panel__summary").html(outcome.description);
	        $(".outcome-image").attr("src", outcome.image).show();

	        this.showMore(1000);
	      }
	    },
	    showScore: {
	      value: function showScore(score) {

	        var numQuestions = this.$questions.length;
	        this.$(".score-panel__message__score").html(score);
	        this.$el.find(".score-panel__message__total").html(numQuestions);

	        var message;
	        if (score <= 8) {
	          message = $("#cp-quiz-message-bad").html();
	        } else if (score <= 13) {
	          message = $("#cp-quiz-message-okay").html();
	        } else if (score <= 17) {
	          message = $("#cp-quiz-message-good").html();
	        } else {
	          message = $("#cp-quiz-message-excellent").html();
	        }

	        $(".score-panel__summary").html(message);

	        /* Slowly reveal answers */
	        var revealAnswerDuration = 200;
	        var revealOffest = 500;
	        var i = 1;
	        setTimeout(function () {
	          $(".cp-progress li").each(function (index, el) {
	            var $item = $(el);
	            setTimeout(function () {
	              $item.addClass("quiz-complete");
	            }, i++ * revealAnswerDuration);
	          });
	        }, revealOffest);

	        var timeTakenToRevealAnswers = revealOffest + revealAnswerDuration * (numQuestions + 1);

	        this.showMore();
	      }
	    },
	    showMore: {
	      value: function showMore(timeTakenToRevealAnswers) {

	        /* Show answer information */
	        $(".answer-information").addClass("is-revealed");

	        /* Show result */
	        setTimeout(function () {
	          $(".score-panel__message").addClass("is-revealed");
	        }, timeTakenToRevealAnswers);

	        /* Show sarcastic message */
	        setTimeout(function () {
	          console.log(this.$(".score-panel__summary"));
	          this.$(".score-panel__summary").addClass("is-revealed");
	        }, timeTakenToRevealAnswers + 1000);

	        /* Show sharing */
	        setTimeout(function () {
	          $("#cp-quiz-share").addClass("is-revealed");
	        }, timeTakenToRevealAnswers + 2000);
	      }
	    },
	    render: {
	      value: function render() {
	        this.updateQuiz();
	        this.updateProgressBar();
	      }
	    }
	  });

	  return Quiz;
	})(Backbone.View);

	var modules = $(".js-plugin-module[data-module=\"Quiz\"]");
	modules.each(function (index, el) {
	  new Quiz({ el: el });
	});
	// checkPageViews()

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);