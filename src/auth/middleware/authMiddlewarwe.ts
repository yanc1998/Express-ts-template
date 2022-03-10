import passport from 'passport'
import { AppError } from '../../base/core/ddd-base/core/errors/app.error'
export async function local_middleware(req, res, next) {
    passport.authenticate('local', { session: false }, async (error, user) => {
        if (!user) {
            return next(new AppError.ValidationError('user not found'))
        }
        if (error) {
            return next(error)
        }
        req.user = user
        next()
    })(req, res, next)
}

export async function jwt_middleware(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (error, user, info) => {
        if (info) {
            return next(new AppError.ValidationError('invalid token'))
        }

        if (!user) {
            return next(new AppError.ValidationError('user not found'))
        }
        if (error) {
            return next(error)
        }
        req.user = user
        next()
    })(req, res, next)
}