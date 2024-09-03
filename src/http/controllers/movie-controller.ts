import { Request, Response } from "express";
import { create_movie_schema, id_schema, update_movie_schema } from "../../schema/movies";
import { prisma } from "../../config/database";

type httpResponseFormat = {
    status: number,
    message: string,
    data?: object,
    errors?: object;
};

export class MovieController {
    index = async (req: Request, res: Response) => {
        const http_response: httpResponseFormat = {
            status: 200,
            message: "Lista de Filmes"
        };

        try {
            const movies = await prisma.movie.findMany();

            http_response.data = { movies };

        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        return res.status(http_response.status).json(http_response);
    };

    show = async (req: Request, res: Response) => {
        const http_response: httpResponseFormat = {
            status: 200,
            message: "Detalhes do FIlme"
        };

        const { movie_id } = req.params;

        const id_validation = await id_schema.safeParseAsync(movie_id);

        if (!id_validation.success) {
            http_response.status = 400;
            http_response.message = "ID invalido";
            http_response.errors = id_validation.error.formErrors.formErrors;

            return res.status(http_response.status).json(http_response);
        }

        try {
            const movie = await prisma.movie.findUnique({
                where: { id: id_validation.data }
            });

            if (!movie) {
                http_response.status = 404;
                http_response.message = "Filme não encontrado";

                return res.status(http_response.status).json(http_response);
            }

            http_response.data = { movie };

        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        return res.status(http_response.status).json(http_response);
    };

    create = async (req: Request, res: Response) => {
        const http_response: httpResponseFormat = {
            status: 201,
            message: "Filme Criado com Sucesso"
        };

        const request_body_validation = await create_movie_schema.safeParseAsync(req.body);

        if (!request_body_validation.success) {
            http_response.status = 400;
            http_response.message = "Alguns dados recebidos não são adequados.";
            http_response.errors = request_body_validation.error.formErrors.fieldErrors;

            return res.status(http_response.status).json(http_response);
        }

        const movie_data = request_body_validation.data;

        try {
            const movie = await prisma.movie.create({
                data: movie_data
            });

            http_response.data = { movie };

        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        return res.status(http_response.status).json(http_response);
    };

    update = async (req: Request, res: Response) => {
        const http_response: httpResponseFormat = {
            status: 201,
            message: "Filme Atualizado com Sucesso"
        };

        const { movie_id } = req.params;

        const id_validation = await id_schema.safeParseAsync(movie_id);

        if (!id_validation.success) {
            http_response.status = 400;
            http_response.message = "ID invalido";
            http_response.errors = id_validation.error.formErrors.formErrors;

            return res.status(http_response.status).json(http_response);
        }

        try {
            const movie = await prisma.movie.findUnique({
                where: { id: id_validation.data }
            });

            if (!movie) {
                http_response.status = 404;
                http_response.message = "Filme não encontrado";

                return res.status(http_response.status).json(http_response);
            }
        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        const request_body_validation = await update_movie_schema.safeParseAsync(req.body);

        if (!request_body_validation.success) {
            http_response.status = 400;
            http_response.message = "Alguns dados recebidos não são adequados.";
            http_response.errors = request_body_validation.error.formErrors.fieldErrors;

            return res.status(http_response.status).json(http_response);
        }

        const movie_data = request_body_validation.data;

        try {
            const movie = await prisma.movie.update({
                where: { id: id_validation.data },
                data: movie_data
            });

            http_response.data = { movie };

        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        return res.status(http_response.status).json(http_response);
    };

    delete = async (req: Request, res: Response) => {
        const http_response: httpResponseFormat = {
            status: 200,
            message: "FIlme apagado com sucesso"
        };

        const { movie_id } = req.params;

        const id_validation = await id_schema.safeParseAsync(movie_id);

        if (!id_validation.success) {
            http_response.status = 400;
            http_response.message = "ID invalido";
            http_response.errors = id_validation.error.formErrors.formErrors;

            return res.status(http_response.status).json(http_response);
        }

        try {
            const movie = await prisma.movie.findUnique({
                where: { id: id_validation.data }
            });

            if (!movie) {
                http_response.status = 404;
                http_response.message = "Filme não encontrado";

                return res.status(http_response.status).json(http_response);
            }
        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        try {
            await prisma.movie.delete({
                where: { id: id_validation.data }
            });
        } catch (error) {
            http_response.status = 500;
            http_response.message = "Erro Interno do Servidor";
        }

        return res.status(http_response.status).json(http_response);
    };
}