import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') { // <- 여기!
    constructor() {
        super({
            jwtFromRequest: (req) => {
                const cookie = req.headers.cookie;
                const refreshToken = cookie.replace('rutaxiRefreshToken=', '');
                return refreshToken;
            },
            secretOrKey: '나의리프레시비밀번호', // env로 빼기
        });
    }

    validate(payload) {
        return {
            id: payload.sub,
        };
        // {sub: asdf-sdf(유저 id)}
    }
}