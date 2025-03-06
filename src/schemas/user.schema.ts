import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  googleId: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
