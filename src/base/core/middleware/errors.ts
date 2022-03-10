import { AppError } from "../ddd-base/core/errors/app.error";

export function errorHandler(error, req, res, next) {
    console.log("ejecutando middleware de control de errores", error.name);
    if (error instanceof AppError.ValidationError)
        res.status(400).json({ error: error.message });
    else if (error instanceof AppError.InsufficientPermitsError)
        res.status(403).json({ error: error.message });
    else if (error instanceof AppError.UnexpectedError)
        res.status(400).json({ error: error.message });
    else if (error.message) {
        res.status(400).json({ error: error.message })
    }
    else
        next();
}
