// 0.1  Import modules
import Home from './views/Home.js';
import Artworks from './views/Artworks.js';
import ArtworkView from './views/ArtworkView.js';
import Contact from './views/Contact.js';

//5 regex
const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')
// console.log(location.pathname.split('/'))

//6. Create a params function
const getParams = match => {
    const values = match.isMatch.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(isMatch => isMatch[1])

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

//1.1  Define routes
const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/artworks", view: Artworks },
        { path: "/artwork-view/:id", view: ArtworkView },
        { path: "/contact", view: Contact },
    ]

    //1.2 Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname.match(pathToRegex(route.path))
        }
    })

    // 1.3 find the first match
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
            route: routes[0],
            isMatch: [location.pathname]
        }
    }

    // 1.4  Instantiate the view
    const view = new match.route.view(getParams(match))
    document.querySelector("#app").innerHTML = await view.getHtml()
}

// 2.2  Navigate to the url
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

// 3.1  create a back button
window.addEventListener('popstate', router);



// 2.1  Add event listener for navigation
window.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});















