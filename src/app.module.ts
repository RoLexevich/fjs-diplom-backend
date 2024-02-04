import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HotelsApiModule } from './hotels-api/hotelsApi.module';
import { HotelsModule } from './hotels/hotels.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import uploadPath from './const/uploadPath';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: uploadPath
    }),
    ConfigModule.forRoot(),
    UsersModule,
    HotelsApiModule,
    HotelsModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
