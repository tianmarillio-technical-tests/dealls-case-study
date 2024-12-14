import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma-client/prisma.service'

@Injectable()
export class PremiumService {
  constructor(private readonly prisma: PrismaService) {}

  async getPremiumSummary(userId: number) {
    const premium = await this.prisma.premium.findFirst({
      where: {
        userId,
      },
    })

    if (premium) {
      return premium
    }

    const newPremium = await this.prisma.premium.create({
      data: {
        userId,
      },
    })

    return newPremium
  }

  async setUnlimitedSwapTrue(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Premium: {
          upsert: {
            create: {
              unlimitedSwap: true,
            },
            update: {
              unlimitedSwap: true,
            },
          },
        },
      },
    })
  }

  async setVerifiedLabelTrue(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Premium: {
          upsert: {
            create: {
              verifiedLabel: true,
            },
            update: {
              verifiedLabel: true,
            },
          },
        },
      },
    })
  }
}
