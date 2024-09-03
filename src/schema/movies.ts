import z from "zod";

export const id_schema = z.coerce.number().positive()

const title_movie_schema = z.string().min(1);
const description_movie_schema = z.string().min(1);
const release_date_movie_schema = z.coerce.date();
const duration_movie_schema = z.string().min(1);
const director_movie_schema = z.string().min(1);

export const create_movie_schema = z.object({
    title: title_movie_schema,
    description: description_movie_schema,
    release_date: release_date_movie_schema,
    duration: duration_movie_schema,
    director: director_movie_schema
});

export const update_movie_schema = z.object({
    title: title_movie_schema.optional(),
    description: description_movie_schema.optional(),
    release_date: release_date_movie_schema.optional(),
    duration: duration_movie_schema.optional(),
    director: director_movie_schema.optional()
});