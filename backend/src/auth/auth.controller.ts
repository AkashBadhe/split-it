import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { User, UserDocument } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Post('login')
  @UseGuards(ThrottlerGuard)
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}