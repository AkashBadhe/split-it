import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { User, UserDocument } from '../schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Post('login')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Login successful', schema: { type: 'object', properties: { access_token: { type: 'string' } } } })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}