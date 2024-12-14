import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { SwapService } from './swap.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RequestWithJwtUser } from 'src/shared/interfaces/request-with-jwt-user.interface'
import { ApplySwapDto } from './dtos/apply-swap.dto'

@ApiTags('swap')
@Controller()
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('view')
  async getDailyRandomProfile(@Req() req: RequestWithJwtUser) {
    return await this.swapService.getDailyRandomProfile(req.user.id)
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Post('swap')
  async applySwap(@Req() req: RequestWithJwtUser, @Body() dto: ApplySwapDto) {
    return await this.swapService.applySwap(
      req.user.id,
      dto.viewLogId,
      dto.action,
    )
  }
}
