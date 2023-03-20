import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule, ConfigModule.forRoot({ envFilePath: ['.env']}), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
