import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtGoogleStrategy } from "./strategies/jwt-social-google.strategy";

@Module({
    imports: [
        JwtModule.register({}),
        UsersModule,
    ],

    providers: [
        JwtAccessStrategy,
        JwtRefreshStrategy,
        JwtGoogleStrategy,
        AuthResolver,
        AuthService,
    ],
    
    controllers: [
        AuthController,
    ]
})
export class AuthModule {}