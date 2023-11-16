import { BadRequestException, Controller, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('delear/bussinesscard/:id')
  async updateDealer(@Param('id') id: string) {
    await this.authService.updateBussinessCard(+id);
  }

  types = ['corporation', 'freelance', 'corporation/driver'];

  @Put('deliver/:type/:id')
  async updateDeliver(@Param('type') type: string, @Param('id') id: string) {
    if (this.types.includes(type)) {
      if (type === 'corporation') {
        await this.authService.updateCorporation(+id);
      } else if (type === 'freelance') {
        await this.authService.updateFreelance(+id);
      } else if (type === 'corporation/driver') {
        await this.authService.updateDriver(+id);
      }
    } else {
      throw new BadRequestException('Invalid type');
    }
  }
}
