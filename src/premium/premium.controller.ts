import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { PremiumService } from './premium.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RequestWithJwtUser } from 'src/shared/interfaces/request-with-jwt-user.interface'

@ApiTags('premium')
@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getPremiumSummary(@Req() req: RequestWithJwtUser) {
    return await this.premiumService.getPremiumSummary(req.user.id)
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('simulate-buy/unlimited-swap')
  async buyUnlimitedSwap(@Req() req: RequestWithJwtUser) {
    return await this.premiumService.setUnlimitedSwapTrue(req.user.id)
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('simulate-buy/verified-label')
  async buyVerifiedLabel(@Req() req: RequestWithJwtUser) {
    return await this.premiumService.setVerifiedLabelTrue(req.user.id)
  }
}
