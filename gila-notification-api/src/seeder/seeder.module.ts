import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { NotificationTypesModule } from '../notification-types/notification-types.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    CategoriesModule,
    NotificationTypesModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
