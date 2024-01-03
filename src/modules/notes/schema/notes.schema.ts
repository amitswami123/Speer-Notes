import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'notes',
})
export class Notes {
  @Prop({index:true})
  notesDesc: string;

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  sharedWith: Types.ObjectId[];
}
export const NotesSchema = SchemaFactory.createForClass(Notes);

export interface NotesModel extends Document {
  notesDesc: string;
  createdBy: Types.ObjectId;
  sharedWith: Types.ObjectId[];
}
