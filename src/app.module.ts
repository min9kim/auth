import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from './twilio/twilio.module';
import { Consumer } from './auth/entities/consumer.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'toyou',
      password: '1234',
      database: 'toyou',
      entities: [Consumer],
      synchronize: false,
      autoLoadEntities: true,
      charset: 'utf8mb4',
      logging: true,
      keepConnectionAlive: true,
    }),
    TwilioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
