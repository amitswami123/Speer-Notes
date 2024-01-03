import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  Req,
  Headers,
  HttpException,
} from '@nestjs/common';
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
    return this.notesService.searchNotes(query.query);
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
  async createNote(@Body() body: NotesModel, @Headers() header): Promise<any> {
    return this.notesService.create(body, header);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() body: any): Promise<any> {
    const isNotes = await this.notesService.findOne(id);
    if (isNotes){
      console.log(this.notesService.findOne(id),"here")
      return this.notesService.update(id, body);
    }
     
    else throw new HttpException('notes not found', 400);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<any> {
    const isNotes = await this.notesService.findOne(id);
    if (isNotes) return this.notesService.delete(id);
    else throw new HttpException('notes not found', 400);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post(':id/share/:userId')
  async shareNote(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() body: any,
    @Headers() header,
  ): Promise<any> {
    return await this.notesService.shareWithUser(id, userId);
  }
}
