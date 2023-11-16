import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { AuthService } from 'src/auth/auth.service';
import { PhoneNumberUtil } from 'google-libphonenumber';

@Controller('twilio')
export class TwilioController {
  private phoneNumberUtil = PhoneNumberUtil.getInstance();

  constructor(
    private readonly twilioService: TwilioService,
    private readonly authService: AuthService,
  ) {}

  @Post('send')
  async sendVerificationCode(@Body('to') to: string) {
    try {
      // 전화번호 형식 검증
      if (!this.isValidPhoneNumber(to)) {
        // 유효하지 않은 전화번호 형식 예외 처리
        throw new HttpException(
          '유효하지 않은 전화번호 형식입니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Twilio를 통한 인증 코드 전송
      const result = await this.twilioService.sendVerificationCode({ to });

      return {
        success: true,
        data: { result },
      };
    } catch (error) {
      // 인증 코드 전송 실패
      throw new HttpException(
        '인증 코드 전송에 실패했습니다',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('check')
  async checkVerificationCode(
    @Body('to') to: string,
    @Body('code') code: string,
  ) {
    try {
      // 전화번호 형식 검증
      if (!this.isValidPhoneNumber(to)) {
        // 유효하지 않은 전화번호 형식 예외 처리
        throw new HttpException(
          '유효하지 않은 전화번호 형식입니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Twilio를 통한 인증 코드 확인
      const verificationResult = await this.twilioService.checkVerificationCode(
        { to, code },
      );

      if (verificationResult.status === 'approved') {
        // 인증 성공 시 사용자 등록
        await this.authService.signup(to);

        return {
          success: true,
          message: '인증 성공, 사용자 등록 완료',
        };
      } else {
        // 인증 실패
        throw new HttpException('인증 실패', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      // 인증 코드 확인 실패
      throw new HttpException(
        '인증 코드 확인에 실패했습니다',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    try {
      // 전화번호 유효성 검사
      const parsedNumber = this.phoneNumberUtil.parse(phoneNumber, 'KR');
      return this.phoneNumberUtil.isValidNumber(parsedNumber);
    } catch (error) {
      // 유효성 검사 실패
      return false;
    }
  }
}
