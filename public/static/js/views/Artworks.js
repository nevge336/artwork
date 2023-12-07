import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Artworks");
        // Get the topic from the URL
        const urlParams = new URLSearchParams(window.location.search);
        this.topic = urlParams.get('topic');
    }

    async getHtml() {
        async function getData(url) {
            let response = await fetch(url);
            return response.json()
        }

        // If no topic is specified in the URL, get the last topic added
        if (!this.topic) {
            const topics = await getData('/static/data/topicList.json');
            this.topic = topics.reverse()[0] || 'cats';
        }

        // Get the data from the specific topic JSON file
        const result = await getData(`/static/data/${this.topic}.json`)

        // Get the image for each artwork
        const iiifUrl = "https://www.artic.edu/iiif/2/";

        // Fetch all the data at once
        const promises = result.data.map(item => getData(item['api_link']));
        const artworksData = await Promise.all(promises);

        let listArtworks = ""
        for (let i in result.data) {
            const artworkData = artworksData[i];
            const imageUrl = `${iiifUrl}/${artworkData.data['image_id']}/full/200,/0/default.jpg`;
            listArtworks += `
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <img src="${imageUrl}" class="bd-placeholder-img object-fit-cover card-img-top" width="100%" height="225">
                                            <div class="card-body">
                                                <p class="card-text">${result.data[i]['title']}</p>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                        <a href="/artwork-view/${result.data[i]['id']}?topic=${this.topic}" data-link class="btn btn-sm btn-outline-secondary">View</a>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            `;
        }

        return `
            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                <h1>Topic: ${this.topic}</h1>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            ${listArtworks}
                    </div>
                </div>
            </div>
        `;
    }
}

