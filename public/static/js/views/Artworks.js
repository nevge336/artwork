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
                                <div class="col-md-3">
                                    <a href="/artwork-view/${result.data[i]['id']}?topic=${this.topic}" data-link>
                                        ${result.data[i]['title']}
                                    </a>
                                    <img src="${imageUrl}" class="img-fluid">
                                </div>
                            `;
        }

        return `
            <section class="container text-center gy-5">
            <h1>Topic: ${this.topic}</h1>
                <div class="row">
                    ${listArtworks}
                </div>
            </section>
        `;
    }
}

