import { PassportStatic } from 'passport'
import {Strategy, ExtractJwt, StrategyOptions, VerifiedCallback} from 'passport-jwt'
import { Service } from 'typedi';
import { UserService } from '../../Users/services/UserService';

@Service()
export class JwtStrategy {
    private opts: StrategyOptions;
    constructor(private readonly UserService: UserService) {
        this.opts = {} as StrategyOptions
        this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        this.opts.secretOrKey = process.env.JWT_SECRET || 'secret';
        this.opts.algorithms = [process.env.JWT_ALGORITHM || 'HS256'];

    }

    async validate(passport: PassportStatic) {
        passport.use(new Strategy(this.opts, async (jwt_payload, done:VerifiedCallback) => {
            console.log(jwt_payload)
            const userOrError = await this.UserService.getOne({ _id: jwt_payload.sub });
            if (!userOrError.isSuccess) {
                return done(userOrError.getError(), false)
            }

            return done(null, userOrError.getValue());
        }));
    }
}