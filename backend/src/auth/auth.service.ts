import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}