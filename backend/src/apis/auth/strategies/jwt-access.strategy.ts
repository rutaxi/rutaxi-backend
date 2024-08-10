import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            // jwtFromRequest: (req) => {
            //     const temp = req.headers.Authorization
            //     const accessToken = temp.toLowercase().replace('bearer', '');
            //     return accessToken;
            // },
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '나의비밀번호',
        });

    }

    validate(payload) {
        return {
            id: payload.sub,
        };
        // {sub: asdf-sdf(유저 id)}
    }
}