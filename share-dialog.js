const hyper = window.hyperHTML;

export class ShareDialog extends HTMLElement {

    constructor() {
        super();
        this.state = {};
        this.html = hyper(this);
    }
    connectedCallback() {
        const url = this.getAttribute("url");
        this.state.fbEndpoint = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        this.state.twitterEndpoint = `https://twitter.com/intent/tweet?text=via%20${this.getAttribute("username")}&amp;url=${url}`;
        this.render();
        this.querySelector(".ShareDialog-button").addEventListener("click", this.showDialogBox.bind(this),false);
    }

    showDialogBox() {
       this.querySelector(".ShareDialog-box").classList.add("is-open"); 
    }

    render() {
        this.html`  
			<button class="Button ShareDialog-button">Share</button>
            <div class="ShareDialog-box">
                <p class="ShareDialog-box-text">Copy an share this URL </p>
                <input class="ShareDialog-box-input" value=${this.getAttribute("url")} readonly>
                <div class="ShareDialog-box-logos">
                    <a href=${this.state.fbEndpoint}><img src="/assets/facebook.png"></a>
                    <a href=${this.state.twitterEndpoint}><img src="/assets/twitter.png"></a>
                </div>
            </div>
        `;
    }
}
