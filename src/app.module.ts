import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './config/configuration';
import { BlogModule, UserModule } from './modules';

@Module({
  imports: [MongooseModule.forRoot(configurations.mongo), BlogModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
