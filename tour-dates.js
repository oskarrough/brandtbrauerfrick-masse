import {tourData} from "./model.js";

const hyper = window.hyperHTML

export class TourDates extends HTMLElement {
	constructor() {
		super()
		this.html = hyper(this)
	        this.state = {};
	        this.state.model = tourData;
	        this.render();
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
		  <div class="tour-list">
		    <h1 class="TourHeadline"><b>Tour Dates</b></h1>
		    ${this.state.model.map(eventObject => this.createEventElement(eventObject))}
		  </div>
		`
	}
}

customElements.define("tour-dates", TourDates);
