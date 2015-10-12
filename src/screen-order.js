import { ScreenNames } from './actions'

const {
	ENTER_SCREEN,
	COMPETITION_SCREEN,
	FORM_SCREEN,
	THANK_YOU_SCREEN
} = ScreenNames

export const standardScreenOrder = [
	ENTER_SCREEN,
	FORM_SCREEN,
	THANK_YOU_SCREEN
]

export const competitionScreenOrder = [
	ENTER_SCREEN,
	COMPETITION_SCREEN,
	FORM_SCREEN,
	THANK_YOU_SCREEN
]
