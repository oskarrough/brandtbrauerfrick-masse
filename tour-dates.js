const hyper = window.hyperHTML;

export class TourDates extends HTMLElement {
    constructor(){
        super();
        this.html = hyper(this);
    }
    
    connectedCallback() {
        this.render();
    }

    set model(data) {
        this.model = data;
    }

    createEventElement(eventObject) {
        return hyper()` 
            <div class="Calendar-event"> 
                    <a href=${eventObject["link"]} class="${`Calendar-event-link`}" target="__blank"><p class="${`Calendar-event-date`}"><b>${eventObject["date"]}</b></p></a>
                    <p class="${`Calendar-event-location`}">${eventObject["location"]}</p> 
            </div>
            `;
        }

        render() {
            this.html`
                <h1 class="TourHeadline"><b>Tour Dates</b></h1>
                ${this.model.map(eventObject => {
                return this.createEventElement(eventObject);
            })}
        `;
    }
}
