const hyper = window.hyperHTML;

export class ShareDialog extends HTMLElement {

    constructor() {
        super();
        this.state = {};
        this.html = hyper(this);
    }
    connectedCallback() {
        this.state.url = this.getAttribute("url");
        console.log(this.state.url);
        this.state.fbEndpoint = `https://www.facebook.com/sharer/sharer.php?u=${this.state.url}`
        this.state.twitterEndpoint = `https://twitter.com/intent/tweet?text=via%20@bbf_music&amp;url=${this.state.url}`;
        this.render();
    }

    render() {
        this.html`  
            <div class="ShareDialog">
                <p class="ShareDialog-text">Copy an share this URL </p>
                <input class="ShareDialog-input" readonly>
                <div class="ShareDialog-logos">
                    <a href=${this.state.fbEndpoint}><img src="/assets/facebook.png"></a>
                    <a href=${this.state.twitterEndpoint}><img src="/assets/twitter.png"></a>
                </div>
            </div>
        `;
    }
}
