import { Module } from '@nestjs/common'
import { SwapService } from './swap.service'
import { SwapController } from './swap.controller'
import { PrismaModule } from 'src/prisma-client/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule {}
