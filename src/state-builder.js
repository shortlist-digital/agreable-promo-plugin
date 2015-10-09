// This is a bit mental to understand
// It's where we build the application state
// Including the navigations screens, and the 'shape'
// of the data we post to our data store
// This can be configured in WordPress,
// which passes through some bootstrapped data as a JSON object
// We then use this to build the application state

import { ScreenNames } from './actions'
import * as fieldDefinitions from './data-structure.js'
import { standardScreenOrder, competitionScreenOrder} from './screen-order'

function stateBuilder(agreablePromoData) {

  // Information about the promotion is bootstrapped from the server
  // Start building the state of the app withe defaults
  // The model of the userdata can accept different fields,
  // but we always send these to calais as a baseline
  let userData = Object.assign({},
    fieldDefinitions.email,
    fieldDefinitions.promoData,
    fieldDefinitions.termsAndConditions
  )

  // Merge the fields for this promo into the app state
  agreablePromoData.fields.map((field, index) => {
    var fieldObject = fieldDefinitions[field]
    Object.assign(userData, fieldObject)
  })

  // Add the optins for this promo
  var numberOfOptIns = agreablePromoData.optins.length
  switch (numberOfOptIns) {
    case 0:
      break
    case 1:
      Object.assign(userData, fieldDefinitions.firstOptIn)
      break
    case 2:
      Object.assign(userData,
        fieldDefinitions.firstOptIn,
        fieldDefinitions.secondOptIn
      )
      break
    case 3:
      Object.assign(userData,
        fieldDefinitions.firstOptIn,
        fieldDefinitions.secondOptIn,
        fieldDefinitions.thirdOptIn
      )
    default:
      break
  }

  const { CLOSED_SCREEN, ENTER_SCREEN } = ScreenNames

  const isActive = function() {
    let { timings } = agreablePromoData
    var now = Math.floor(new Date().getTime() / 1000)
    return ((now > timings.start) && (now < timings.end))
  }

  let screenList = standardScreenOrder

  return {
    agreablePromoData: agreablePromoData,
    userData: userData,
    screen: {
      screenList: screenList,
      screenIndex: 0,
      currentScreen: isActive() ? screenList[0] : CLOSED_SCREEN
    }
  }

}

export default stateBuilder
