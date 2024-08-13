import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: "1041210825139-6tr9bg0a9r5aj9f4dc4cvmgnn586bv2f.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3001/login/google",
            scope: ['email', 'profile']
        });
    }

    // 로그인 성공했을 때
    validate(accessToken, refreshToken, profile) {

        // req.user = {} 안에 들어가는 내용
        return {
            userName: profile.displayName,
            email: profile.emails[0].value,
            password: "1234",
        };
    }
}
