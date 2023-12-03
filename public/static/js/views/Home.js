import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <h1>Home</h1>
            <p>You are viewing the home page!</p>
            <p>
                <a href="/artworks" data-link>View recent posts</a>.
            </p>
        `;
    }

}