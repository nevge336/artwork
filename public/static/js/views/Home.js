import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        async function getData(url) {
            let response = await fetch(url);
            return response.json()
        }

        let topics = await getData('/static/data/topicList.json');
        topics = topics.reverse();
        let topicListItems = topics.map(topic => `<li><a href="/artworks?topic=${topic}" data-link>${topic}</a></li>`).join('');
        let lastTopicAdded = `<a href="/artworks?topic=${topics[0]}" data-link>${topics[0]}</a></li>`; 

        return `
        <div class="container p-5">
            <section class="text-align-center m-3">
                <h1>Artworks Searching App</h1>
                <h5>from Art Institute of Chicago Database</h5>
                <div class="row p-3">
                    <div class="col">
                        <form action="/" method="get">
                            <label for="topic">Enter a topic:</label>
                            <input type="text" id="topic" name="topic">
                            <input type="submit" value="Search">
                        </form>
                    </div>
                <div class="col mt-auto mb-auto">
                    <h5> ${lastTopicAdded}</h5> 
                </div>
            </section>
            <section class="m-3">
                <h2>Explored Topics</h2>
                <ul>
                    ${topicListItems}
                </ul>
            </section>
        </div>
        `;
    }
}