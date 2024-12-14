import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DateTime } from 'luxon'
import { PrismaService } from 'src/prisma-client/prisma.service'

@Injectable()
export class SwapService {
  private DAILY_VIEW_LIMIT: number

  constructor(private readonly prisma: PrismaService) {
    this.DAILY_VIEW_LIMIT = 10
  }

  async getDailyRandomProfile(userId: number) {
    const startOfToday = DateTime.now().startOf('day').toISO()

    const viewCount = await this.prisma.viewLog.count({
      where: {
        userId,
        createdAt: {
          gte: startOfToday,
        },
      },
    })

    const premium = await this.prisma.premium.findFirst({
      where: {
        userId,
      },
    })

    if (!premium.unlimitedSwap) {
      if (viewCount >= this.DAILY_VIEW_LIMIT) {
        throw new BadRequestException('Daily limit reached')
      }
    }

    return await this.prisma.$transaction(async (prismaTx) => {
      const profileCount = await prismaTx.userProfile.count({
        where: {
          ViewLog: {
            none: {
              userId,
              createdAt: {
                gte: startOfToday,
              },
            },
          },
        },
      })

      if (!profileCount) {
        throw new BadRequestException('No more profiles available')
      }

      const randomIndex = Math.floor(Math.random() * profileCount)

      const randomProfile = await prismaTx.userProfile.findFirst({
        skip: randomIndex,
        where: {
          userId: {
            not: userId,
          },
          ViewLog: {
            none: {
              userId,
              createdAt: {
                gte: startOfToday,
              },
            },
          },
        },
      })

      const newViewLog = await prismaTx.viewLog.create({
        data: {
          userId,
          viewedUserProfileId: randomProfile.id,
        },
      })

      return {
        viewLogId: newViewLog.id,
        profile: randomProfile,
      }
    })
  }

  async applySwap(
    userId: number,
    viewLogId: number,
    action: 'like' | 'dislike',
  ) {
    const viewLog = await this.prisma.viewLog.findFirst({
      where: {
        id: viewLogId,
      },
    })

    if (!viewLog || viewLog.userId !== userId) {
      throw new NotFoundException('Not found')
    }

    const swapLog = await this.prisma.swapLog.findFirst({
      where: {
        viewLogId: viewLog.id,
      },
    })

    if (swapLog) {
      throw new BadRequestException('Already swapped')
    }

    await this.prisma.viewLog.update({
      where: {
        id: viewLog.id,
      },
      data: {
        SwapLog: {
          create: {
            action,
          },
        },
      },
    })
  }
}
