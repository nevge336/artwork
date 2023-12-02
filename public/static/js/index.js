const router = async () => {
    const routes = [
        { path: "/", view: () => console.log("Viewing Home") },
        { path: "/artworks", view: () => console.log("Viewing Artworks") },
        { path: "/settings", view: () => console.log("Viewing Contact") }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
};