import { Inject, Injectable } from '@nestjs/common';

import { Notes, NotesModel } from './schema/notes.schema';
import * as jwt from 'jsonwebtoken';


import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class NotesService {
  constructor(
    @InjectModel('notes') private readonly notesModel: Model<NotesModel>,
  
  ) {}

  getUserIdFromToken(token: string) : Types.ObjectId{
    try {
      console.log(token,"token")
      const decoded: any = jwt.verify(token, 'jsflj8843bf843djfjfdjh34893489'); 
      console.log(decoded,"decoded")
      return decoded.sub;
    } catch (error) {
      return null;
    }
  }

  async create(body: any, headers): Promise<any> {
    body.createdBy = this.getUserIdFromToken(headers['authorization'].split(' ')[1])
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


  

  async shareWithUser(id: any, headers: any):  Promise<any>{
    const data = await this.notesModel.findById(id).exec();
    const userIdForSharing = this.getUserIdFromToken(headers['authorization'].split(' ')[1])
    data.sharedWith.push(userIdForSharing);
    const updatedData = await this.notesModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedData;
  }

  async searchNotes(text){
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
    ]).exec();

  }

}
