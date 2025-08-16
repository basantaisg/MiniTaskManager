import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    const { name, email, password } = body;

    const user = await this.usersService.createUser(name, email, password);
    res.json({ message: 'User created!', user });
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    const token = this.authService.generateJwt(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // true if using https
      sameSite: 'lax',
    });

    return res.json({ token }); // send response explicitly
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.json({ message: 'Logged Out!' });
  }
}
