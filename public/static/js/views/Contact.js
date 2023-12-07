import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Contact");
    }

    async getHtml() {
        return `
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <h1>Contact</h1>
                        <h3>Want to get in touch?</h3>
                        <p>Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                        <form>
                            <div class="form-floating">
                                <input class="form-control" id="name" type="text" placeholder="Enter your name..." />
                                <label for="name">Name</label>
                            </div>
                            <div class="form-floating">
                                <input class="form-control" id="email" type="email" placeholder="Enter your email..." />
                                <label for="email">Email address</label>
                            </div>
                            <div class="form-floating">
                                <textarea class="form-control" id="message" placeholder="Enter your message here..." style="height: 12rem"></textarea>
                                <label for="message">Message</label>
                            </div>
                            <br />
                            <button class="btn btn-primary text-uppercase" id="sendMessageButton" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}
