import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import * as libphonenumber from 'google-libphonenumber';

@Injectable()
export class TwilioService {
  private client: twilio.Twilio;
  private accountSid = 'AC2eca75326095a1466ff0c6803139a82e';
  private authToken = 'b435fe9a93cd0009ccd2f1410d2f8392';
  private verifyServiceSid = 'VAac1c6010c66af16da0fdf0274bafcd46';

  private phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();

  constructor() {
    this.client = twilio(this.accountSid, this.authToken);
  }

  async sendVerificationCode(options: { to: string }) {
    // 전화번호 형식 표준화
    const phoneNumber = this.normalizePhoneNumber(options.to);

    // Twilio를 통한 인증 코드 전송
    return this.client.verify
      .services(this.verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  }

  async checkVerificationCode(options: { to: string; code: string }) {
    // 전화번호 형식 표준화
    const phoneNumber = this.normalizePhoneNumber(options.to);

    // Twilio를 통한 인증 코드 확인
    return this.client.verify
      .services(this.verifyServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: options.code,
      });
  }

  private normalizePhoneNumber(phoneNumber: string): string {
    // 전화번호 형식 표준화 및 E.164 포맷으로 변환
    return this.phoneNumberUtil.format(
      this.phoneNumberUtil.parse(phoneNumber, 'KR'),
      libphonenumber.PhoneNumberFormat.E164,
    );
  }
}
