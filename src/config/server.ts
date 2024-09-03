import express from "express"
import movie_routes from "../http/routes";

const app = express();

app.use(express.json())
app.use(movie_routes)

export { app };