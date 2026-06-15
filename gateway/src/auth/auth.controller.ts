import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    // Cambié el nombre del DTO a registerUserDto para mayor claridad
    return registerUserDto; // return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    // Cambié el nombre del DTO a loginUserDto para mayor claridad
    return loginUserDto; // return this.authService.login(loginUserDto);
  }

  @Get('verify')
  verify() {
    return '...verifying'; // return this.authService.findAll();
  }
}
