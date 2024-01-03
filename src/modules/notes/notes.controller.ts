import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesModel } from './schema/notes.schema';

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('search')
  async searchNotes(@Query() query: any): Promise<any> {
    // console.log(query,"===>query");
    return this.notesService.searchNotes(query.query)
  }

  @Get()
  async getAllNotes(): Promise<any> {
    return this.notesService.findAll();
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<any> {
    return this.notesService.findOne(id);
  }

  @Post()
  async createNote(@Body() body: NotesModel): Promise<any> {
    return this.notesService.create(body);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<any> {
    return this.notesService.delete(id);
  }

  @Post(':id/share')
  async shareNote(@Param('id') id: string, @Body() body: any): Promise<any> {
    // return { message: 'Note shared successfully' };
    return await this.notesService.shareWithUser(id,'usersss');
  }

  
}
