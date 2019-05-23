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
                <p class="${`Calendar-event-date`}"><b>${eventObject["date"]}</b></p> 
                <p class="${`Calendar-event-location`}">${eventObject["location"]}</p> 
                <a href=${eventObject["link"]} class="${`Calendar-event-link`}" target="_blank"><b>${eventObject["link"]}</b></a> 
            </div>
        `;
    }

    render() {
        this.html`
            ${this.model.map(eventObject => {
                return this.createEventElement(eventObject);
            })}
        `;
    }
}
