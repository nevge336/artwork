import AbstractView from "./AbstractView.js"

export default class extends AbstractView {

    constructor(params){
        super(params)
        this.setTitle('Artwork View')
    }

    async getHtml() {

        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }

        const result = await getData('/static/data/artworks.json')

        const post_id = Number(this.params.id)

        const article = result.data.find(item => item.id === post_id)
        
        return `
        <h1>${article.title}</h1>
        <img src="${article.image}" alt="${article.title}">

        <a href="/artworks" data-link>Retour</a>
        `
    }
}