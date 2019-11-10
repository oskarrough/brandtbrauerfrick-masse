import {hyper} from './web_modules/hyperhtml.js'
// const hyper = window.hyperHTML

export class TourDates extends HTMLElement {
	constructor() {
		super()
		this.html = hyper(this)
	}

	set dates(data) {
		this.model = data
		this.render()
	}

	createEventElement(eventObject) {
		return hyper()` 
			<div class="Calendar-event"> 
				<p class="${`Calendar-event-date`}">
					<b>${eventObject.date}</b>
				</p>
				<p class="${`Calendar-event-location`}">
					<a href=${eventObject.link} class="${`Calendar-event-link`}" target="_blank">
						${eventObject.location}
					</a>
				</p> 
			</div>
		`
	}

	render() {
		this.html`
			<h1 class="TourHeadline"><b>Tour Dates</b></h1>
			${this.model.map(eventObject => this.createEventElement(eventObject))}
		`
	}
}
