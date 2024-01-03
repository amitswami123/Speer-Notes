import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesModel } from './schema/notes.schema';
import { JwtAuthGuard } from 'src/modules/auth/jwt.auth.gaurd'; 
import { Throttle } from '@nestjs/throttler';


@Controller('api/notes')
@UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the entire controller

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('search')
  async searchNotes(@Query() query: any): Promise<any> {
    return this.notesService.searchNotes(query.query)
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get()
  async getAllNotes(): Promise<any> {
    return this.notesService.findAll();
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<any> {
    return this.notesService.findOne(id);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  async createNote(@Body() body: NotesModel): Promise<any> {
    return this.notesService.create(body);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.notesService.update(id, body);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<any> {
    return this.notesService.delete(id);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post(':id/share')
  async shareNote(@Param('id') id: string, @Body() body: any): Promise<any> {
    return await this.notesService.shareWithUser(id,'usersss');
  }

  
}
