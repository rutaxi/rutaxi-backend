import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.SERVER_URL+"/login/google",
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
