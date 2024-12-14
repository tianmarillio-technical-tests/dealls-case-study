import { Module } from '@nestjs/common'
import { PremiumService } from './premium.service'
import { PremiumController } from './premium.controller'
import { PrismaModule } from 'src/prisma-client/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [PremiumController],
  providers: [PremiumService],
})
export class PremiumModule {}
