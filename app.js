import express from "express";

import { engine } from "express-handlebars";
import { marked } from "marked";
import { loadMovie, loadMovies, loadReviews } from "./public/script/apiLoader.js";
import { getScreenings, getScreeningsMovie } from "./public/script/loadScreening.js"; 

const app = express();

app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine('handlebars', engine({
    defaultLayout: 'index',
    helpers: {
        markdown: md => marked(md)
    },
}));

app.get("/", async (req, res) => {
    res.render("main");
});

app.get("/api/screeningtime", async (req, res) => {
    const screening = await getScreenings();

    res.json(
        screening
    )
}); 

app.get("/api/movies/:movieId/reviews/:reviewPageId", async (req, res) => {
    const review = await loadReviews(req.params.movieId);
    let j = 0; 
    const reviewArray = []; 

    for(let i = 0; 0 < review.length; i+5) {
            reviewArray[j] = review.splice(0, 5); 
            j++; 
        }
        let arrayLength = reviewArray.length; 

        res.json({
            data: reviewArray[req.params.reviewPageId],
            metaArrayData: arrayLength
        })
});

// route for screeningtimes on movie page
app.get("/api/movies/:movieId/screeningtime", async (req, res) => {
    const screening = await getScreeningsMovie(req.params.movieId);

    res.json(   
        screening
    )
}); 

app.get("/movies", async (req, res) => {
    const movies = await loadMovies();
    res.render("movies", { movies });
});

app.get("/movies/:movieId", async (req, res) => {
    const movie = await loadMovie(req.params.movieId);
    if (movie) {
        res.render("movie", { movie });
    } else {
        res.status(404).render("404");
    }
});

app.get("/about", async (req, res) => {
    res.render("about");
});

app.use("/404", async (req, res) => {
    res.render("404");
    res.status(404);
});

app.use("/", express.static("./public"));

app.listen(5080);

export default app;