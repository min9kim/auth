import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [TwilioService],
  exports: [TwilioService],
  controllers: [TwilioController],
})
export class TwilioModule {}
