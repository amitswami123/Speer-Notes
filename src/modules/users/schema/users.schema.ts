import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'users',
})
export class Users {
  
    @Prop()
    name: String

    @Prop()
    email: String

    @Prop()
    password: String


 
}
export const UsersSchema = SchemaFactory.createForClass(Users);

export interface UsersModel extends Document {
    name: string;
    email : string;
    password: string;
  }
