import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';


export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role:string

  @Prop()
  profile: string

}
export const UserSchema = SchemaFactory.createForClass(User);