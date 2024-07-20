import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Sign In to generate a JWT Token' })
  async login(@Body() data: LoginUserDto) {
    console.log('Sign in with:', data);
    const signin = await this.authService.login(data);
    console.log('Has data:', signin);
    return signin;
  }
}
