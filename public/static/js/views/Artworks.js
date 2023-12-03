import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Artworks");
    }

    async getHtml() {
        async function getData(url) {
            let response = await fetch(url);
            return response.json()
        }

        const result = await getData('/static/data/artworks.json')
        let listArtworks = "<ul>"
        for(let i in result.data) {
            listArtworks +=`<li><a href="/artwork-view/${result.data[i]['id']}" data-link>${result.data[i]['title']}</a>
            <span>${result.data[i]['artist_display']}</span></li>`
        }
        listArtworks +="</ul>"
            
        return `
        <h1>Artworks</h1>
        ${listArtworks}
        `;
    }
}