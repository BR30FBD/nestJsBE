import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateOrCreateUser(profile: any, accessToken: string): Promise<User> {
    let user = await this.userModel.findOne({ googleId: profile.id });
    
    if (!user) {
      user = await this.userModel.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        accessToken,
      });
    }

    return user;
  }
  
}
