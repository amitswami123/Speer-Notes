import { Inject, Injectable } from '@nestjs/common';

import { Notes, NotesModel } from './schema/notes.schema';


import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class NotesService {
  constructor(
    @InjectModel('notes') private readonly notesModel: Model<NotesModel>,
  
  ) {}

  async create(body: any): Promise<any> {
    const createdNotes = new this.notesModel(body);
    return createdNotes.save();
  }

  async findAll(): Promise<any> {
    return this.notesModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.notesModel.findById(id).exec();
  }

  async update(id: string, body: any): Promise<any> {
    return this.notesModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.notesModel.findByIdAndDelete(id).exec();
  }
  async shareWithUser(id: any, userIdForSharing: any):  Promise<any>{
    const data = await this.notesModel.findById(id).exec();
    data.sharedWith.push(userIdForSharing);
    const updatedData = await this.notesModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedData;
  }

  async searchNotes(text){
    // return this.notesModel.find({ $text: { $search: text } }).exec();
    return this.notesModel.aggregate([
      {
        $match: {
          $expr: {
            $ne: [
              { $indexOfCP: ['$notesDesc_text', text] },
              -1,
            ],
          },
        },
      },
      // Add more stages to the aggregation pipeline if needed
    ]).exec();

  }

}
