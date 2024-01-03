import { Module } from '@nestjs/common';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from './schema/notes.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'notes', schema: NotesSchema }]),
  JwtModule.register({
    secret: 'speer-notes-amit-swami',
    signOptions: { expiresIn: '1h' },
  }),

],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}


