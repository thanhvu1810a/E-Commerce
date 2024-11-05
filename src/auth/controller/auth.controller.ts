import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Public } from "../decorator/public.decorator";
import { LocalAuthGuard } from "../guard/local-auth.guard";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Public()
    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }
}