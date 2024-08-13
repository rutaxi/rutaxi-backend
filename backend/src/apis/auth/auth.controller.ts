import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

interface IOAuthUser {
    user: {
        userName: string;
        email: string;
        password: string;
    }
}

@Controller()
export class AuthController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('google'))
    @Get("/login/google")
    async loginGoogle(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {
        // 1. 회원조회
        let user = await this.usersService.findOne({email: req.user.email});

        // 2. 가입 안되어있다면 회원가입
        if(!user) user = await this.usersService.create({
            ...req.user,
        })

        // 3. 회원가입이 되어있다면? 
        // 로그인 (refreshToken, accessToken 만들어서 브라우저에 전송)
        this.authService.setRefreshToken({user, res});
        res.redirect("http://localhost:3000/")
    }
}