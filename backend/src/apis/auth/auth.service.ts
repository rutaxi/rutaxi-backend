import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IAuthServiceGetAccessToken, IAuthServiceLogin, IAuthServiceRestoreAccessToken, IAuthServiceSetRefreshToken } from "./interfaces/auth-service.interface";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async login({userName, password, context}: IAuthServiceLogin): Promise<string> {
        // 1. 이메일이 일치하는 유저를 DB에서 찾기
        const user = await this.usersService.findOneByUserName({userName});

        // 2. 일치하는 유저가 없으면 - 에러
        if (!user) throw new UnprocessableEntityException('등록되지 않은 이메일입니다.');
        
        // 3. 일치하는 유저가 있지만, 비밀번호 틀리면 - 에러
        const isAuth = await bcrypt.compare(password, user.password);
        if(!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

        // 4. refreshToken 만들어서 브라우저 쿠키에 저장해서 전달
        this.setRefreshToken({user, context});

        // 4. 일치하는 유저도 있고, 비밀번호도 맞다면 - accessToken(=JMT) 만들어서 브라우저로 전달
        return this.getAccessToken({user});
    }

    getAccessToken({user}: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            {sub: user.id}, 
            {secret: '나의비밀번호', expiresIn: '1h'},
        )
    }

    restoreAccessToken({user}: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({user})
    }

    setRefreshToken({user, context}: IAuthServiceSetRefreshToken): void {
        // 개발환경
        const refreshToken = this.jwtService.sign(
            {sub: user.id},
            {secret: "나의리프레시비밀번호", expiresIn: '2w'},
        );
        context.res.setHeader(
            'set-Cookie', 
            `refreshToken=${refreshToken}; path=/;`,
        );

        // 배포환경
        // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; HttpOnly`);
        // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
    }
 
}