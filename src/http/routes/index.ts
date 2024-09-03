import { Router } from "express";
import { MovieController } from "../controllers/movie-controller";

const movie_routes = Router();
const movie_controller = new MovieController();

movie_routes
    .get("/movies", movie_controller.index)
    .get("/movies/:movie_id", movie_controller.show)
    .post("/movies", movie_controller.create)
    .put("/movies/:movie_id", movie_controller.update)
    .delete("/movies/:movie_id", movie_controller.delete);

export default movie_routes;