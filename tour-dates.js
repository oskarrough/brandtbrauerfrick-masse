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
                            <p class="${`Calendar-event-${propertyName}`}"><b>${event[propertyName]}</b></p> 
                       `;
                    }
                    else if (propertyName === "link" && event[propertyName] !== "") {
                        console.log(event);
                        return hyper()` 
                            <a href=${event[propertyName]} class="${`Calendar-event-${propertyName}`}" target="_blank"><b>${event[propertyName]}</b></a> 
                       `;
                    }
                    else {
                        return hyper()` 
                            <p class="${`Calendar-event-${propertyName}`}">${event[propertyName]}</p> 
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
