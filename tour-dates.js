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

    createEventElement(event) {
        return hyper()` 
            <div class="Calendar-event"> 
               ${Object.keys(event).map(propertyName => {
                   if (propertyName === "date") {
                       return hyper()` 
                            <p class="Calendar-event-detail"><b>${event[propertyName]}</b></p> 
                       `;
                    }
                    else {
                        return hyper()` 
                            <p class="Calendar-event-detail">${event[propertyName]}</p> 
                        `;
                    }
               })} 
            </div>
        `;
    }

    render() {
        this.html`
            ${Object.keys(this.model).map(eventkey => {
                return this.createEventElement(this.model[eventkey]);
            })}
        
        `;
    }
}
