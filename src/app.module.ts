import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
console.log('MONGO_CONNECTION',process.env.MONGO_CONNECTION)
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
