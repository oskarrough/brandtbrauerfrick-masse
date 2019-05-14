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
        this.querySelector(".ShareDialog-button").addEventListener("click", this.toggleDialogBox.bind(this),false);
    }

    toggleDialogBox() {
        const dialogBox = this.querySelector(".ShareDialog-box");
        if (dialogBox.classList.contains("is-open")) {
            dialogBox.classList.remove("is-open");
            return;
        }
        dialogBox.classList.add("is-open");
    }

    render() {
        this.html`  
			<button class="Button ShareDialog-button">Share</button>
            <div class="ShareDialog-box">
                <p class="ShareDialog-box-text">Copy and share this URL </p>
                <input class="ShareDialog-box-input" value=${this.getAttribute("url")} readonly>
                <div class="ShareDialog-box-logos">
                    <a href=${this.state.fbEndpoint} target="_blank"><img src="/assets/facebook.png"></a>
                    <a href=${this.state.twitterEndpoint} target="_blank"><img src="/assets/twitter.png"></a>
                </div>
            </div>
        `;
    }
}
