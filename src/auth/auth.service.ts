import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from './entities/consumer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Consumer)
    private readonly authRepository: Repository<Consumer>,
  ) {}

  async signup(phone: string): Promise<void> {
    // 이미 존재하는 사용자인지 확인
    const existingUser = await this.authRepository.findOne({
      where: {
        phone,
      },
    });

    if (existingUser) {
      // 이미 존재하는 경우 예외 발생
      throw new ConflictException('이 번호로 가입된 사용자가 이미 존재합니다');
    }

    // 새로운 사용자 생성 및 저장
    const newUser = this.authRepository.create({ phone });
    await this.authRepository.save(newUser);
  }

  async updateBussinessCard(id: number): Promise<void> {
    const user = await this.authRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
  }

  async updateCorporation(id: number): Promise<void> {
    const user = await this.authRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
  }

  async updateFreelance(id: number): Promise<void> {
    const user = await this.authRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
  }

  async updateDriver(id: number): Promise<void> {
    const user = await this.authRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
  }
}
