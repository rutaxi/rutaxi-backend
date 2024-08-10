import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
class AuthController {

    @UseGuards(AuthGuard('google'))
    @Get("/login/google")
    loginGoogle() {

    }
}