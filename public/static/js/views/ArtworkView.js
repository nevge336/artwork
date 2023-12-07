import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Artwork View')
        // Get the topic from the URL
        const urlParams = new URLSearchParams(window.location.search);
        this.topic = urlParams.get('topic');
    }

    async getHtml() {
        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }

        const post_id = Number(this.params.id)

        const result = await getData(`/static/data/${this.topic}.json`)
        const article = result.data.find(item => {
            return item.id == post_id;
        });

        const artworkData = await getData(article.api_link);
        const iiifUrl = 'https://www.artic.edu/iiif/2';
        const medium = artworkData.data.medium_display;
        const keywords = artworkData.data.term_titles;
        const style = artworkData.data.style_title;
        const imageUrl = `${iiifUrl}/${artworkData.data.image_id}/full/843,/0/default.jpg`;
        const author = artworkData.data.artist_title;
        const date = artworkData.data.date_display;


        return `
        <section class="container g-5">
            <a href="/artworks?topic=${this.topic}" data-link>Back to all ${this.topic} artworks</a>
            <br>
            <h1>${article.title}</h1>
            <div class="row g-4">
                <div class="col-12">
                    <img class="img-fluid" src="${imageUrl}" alt="${article.title}">
                </div>
                <div class="col">
                    <p><strong>Author:</strong> ${author}</p>
                    <p><strong>Date:</strong> ${date}</p>  
                    <p><strong>Medium:</strong> ${medium}</p>
                    <p><strong>Style:</strong> ${style}</p>
                    <p><strong>Keywords:</strong> ${keywords}</p>
                </div>
            </div>
        </section>
        `
    }
}

