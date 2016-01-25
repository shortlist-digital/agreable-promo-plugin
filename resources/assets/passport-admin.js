var $ = window.$ || window.jQuery

var PassportSelect, PublishedWarnings, GetCounts

PassportSelect = (function() {
  var calaisDomain = ''

  function PassportSelect() {
    this.passports = []
    // Get the brand identifier from a hidden field / populated by the options panel
    this.brandIdentifier = $('#acf-passport_brand_identifier_promo').val()

    this.$passport = $('#acf-selected_passport')
    // Hide a couple of unused fields
    this.$passport.parent().parent().parent('div').hide().prev().hide()
    this.$select = $('#acf-promo_passport').html('')
    this.$select.change(this.handleSelectChange.bind(this))
    this.currentPassport = this.getCurrentPassport()

    $.getJSON('/api/calais-domain', function(response) {
      calaisDomain = response
      this.getPassports()
    }.bind(this))
  }

  PassportSelect.prototype.handleSelectChange = function () {
    this.$passport.val(this.$select.val())
    this.currentPassport = this.getCurrentPassport()
    this.updateOverview()
  }

  PassportSelect.prototype.getCurrentPassport = function() {
    var val = this.$passport.val()
    if (!val) {
      return false
    }
    if (val == 'Select a passport') {
      return false
    }
    else {
      var data = JSON.parse(val)
      console.log ('updated :', data)
      return data
    }
  }

  PassportSelect.prototype.getPassports = function() {
    var timestamp = Math.floor(Date.now() / 1000)

    var url = "http://" + calaisDomain + "/passport/" + this.brandIdentifier + "?v=" + timestamp
    $.ajax({
      dataType: "json",
      url: url,
      success: this.handleDataReceived.bind(this)
    })
  }

  PassportSelect.prototype.handleDataReceived = function(responseObject, status, xhr) {
    console.log('handleDataReceived called')
    this.populatePassportSelect(responseObject.passports)
    this.updateOverview()
  }

  PassportSelect.prototype.updateOverview = function () {
    this.passports.map(function(passport, index) {
      if (passport.passport_id == this.currentPassport.id) {
        console.log('Current passport id in overview: ', this.currentPassport)
        this.renderOverview(passport)
      }
    }.bind(this))
  }

  PassportSelect.prototype.renderOverview = function(passport) {
    console.log('Render :', passport)

    $persistFieldsLi = []

    if (passport.fieldsToPersist.length > 0) {
      passport.fieldsToPersist.forEach(function(field) {
        $persistFieldsLi.push($('<li>').html('"' + field.fieldname + '", required: ' + !field.allow_empty))
      })
    }

    $persistFieldsDotMailerLi = []

    var dotmailer = passport.postInsertServices.dotmailer
    if (dotmailer) {
      if (typeof dotmailer.fieldnames_to_persist === 'object' && dotmailer.fieldnames_to_persist.length > 0) {
      dotmailer.fieldnames_to_persist.forEach(function(field) {
        $persistFieldsDotMailerLi.push($('<li>').html('Our fieldname: "' + field.datamanger_fieldname_map + '", maps to DotMailer: "' + field.dotmailer_fieldname_map + '"'))
      })
      }
    }

    $('.passport-information').remove()
    this.$select.parent().parent().after($('<div>').addClass('passport-information'))
    $information = $('.passport-information')
    $information.append($('<h3>').html('Passport selected: ' + passport.passport_id).css('padding-left', '0px'))
    .append(
      $('<div>')
        .append($('<p>').html('Data to be persisted in <strong>Database</strong>: ').css('text-decoration', 'underline'))
        .append($('<ul>').append($persistFieldsLi).css('margin-bottom', '0px'))
        .css({
          "float": "left",
          "width": "50%"
        })
      )
      .append(
        $('<div>')
          .append($('<p>').html('Data to be persisted in <strong>DotMailer</strong>: ').css('text-decoration', 'underline'))
          .append($('<ul>').append($persistFieldsDotMailerLi).css('margin-bottom', '0px'))
          .css({
            "float": "left",
            "width": "50%"
          })
        )
        .css({
          "box-sizing": "border-box",
          "width": "100%",
          "overflow": "hidden",
          "margin-left": "0px",
          "background-color": "rgb(245, 245, 225)",
          "padding": "20px"
        })
  }

  PassportSelect.prototype.populatePassportSelect = function(passports) {
    this.$select.append($('<option>').html('Select a passport').attr('selected', true))
    this.passports = passports
    passports.map(function(passport, index) {

      // Build select option
      var option = $('<option>', {
        value: JSON.stringify({
          id: passport.passport_id,
          shared_secret: passport.secret,
          title: passport.title
        })
      }).html(passport.title)

      // Select if currently selected passport
      if (this.currentPassport.id == passport.passport_id) {
        option.attr('selected', true)
      }

      // Append to select element
      this.$select.append(option)

    }.bind(this))
  }

  PassportSelect.prototype.demoFunction = function () {
    console.log(this)
  }

  return PassportSelect

})()

PublishedWarnings = (function() {
  function PublishedWarnings () {
    var status = this.getPublishStatus()
    if (status) {
      this.lockKeyInputs()
    }
  }

  PublishedWarnings.prototype.lockKeyInputs = function () {
    var $optins = $('*[data-name="optin_name"]')
    var $fields = $optins.find('input')
    $fields.prop('disabled', true)
    var message = $('<h4>').text('DANGER: Careful editing these').css({color:'red'})
    $('*[data-name="third_party_optins"] .acf-label:first, *[data-name="promotion_passport"] .acf-label:first, *[data-name="data_to_capture"] .acf-label:first').after(message)
  }

  PublishedWarnings.prototype.getPublishStatus = function () {
    return ($('#post-status-display').html().trim() == 'Published')
  }

  return PublishedWarnings
})()

SenseCheckFields = (function() {
  function SenseCheckFields () {

  }

  return SenseCheckFields

})()

GetCounts = (function() {
  function GetCounts() {
    this.counts = $('.count-column')
    if (this.counts.length) { this.start() }
  }

  GetCounts.prototype.updateCount = function(index, el) {
    var $el = $(el)
    var countRequest = new XMLHttpRequest();
    var url = $el.data('url')
    $.ajax(url, {
      success: function(response) {
        console.log('load total success')
        console.log(response)
        $el.html(response)
      },
      error: function() {
        $el.html('Error').css({color:'red'})
      }
    })


  }

  GetCounts.prototype.start = function() {
    this.counts.each(this.updateCount)
  }

  return GetCounts

})()


$(window).ready(function() {
  if ($('body').hasClass('post-type-promo')) {
    new GetCounts()
    new PassportSelect()
    new PublishedWarnings()
  }

})

