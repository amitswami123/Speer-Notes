import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [UsersModule,NotesModule, MongooseModule.forRoot('mongodb://localhost:27017/speer'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
