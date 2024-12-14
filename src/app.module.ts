import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma-client/prisma.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SwapModule } from './swap/swap.module'
import { PremiumModule } from './premium/premium.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    SwapModule,
    PremiumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
