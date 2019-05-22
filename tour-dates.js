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
               ${Object.keys(eventObject).map(propertyName => {

                   if (propertyName === "date") { // bold for location 
                       return hyper()` 
                            <p class="${`Calendar-event-${propertyName}`}"><b>${eventObject[propertyName]}</b></p> 
                       `;
                    }
                    else if (propertyName === "link" && eventObject[propertyName] !== "") { // a tag for link 
                        return hyper()` 
                            <a href=${eventObject[propertyName]} class="${`Calendar-event-${propertyName}`}" target="_blank"><b>${eventObject[propertyName]}</b></a> 
                       `;
                    }
                    else { // default for location
                        return hyper()` 
                            <p class="${`Calendar-event-${propertyName}`}">${eventObject[propertyName]}</p> 
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
