import { ApiProperty } from '@nestjs/swagger'
import { SwapActionEnum } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class ApplySwapDto {
  @ApiProperty()
  @IsNumber()
  viewLogId: number

  @ApiProperty()
  @IsString()
  @IsEnum(SwapActionEnum)
  action: SwapActionEnum
}
