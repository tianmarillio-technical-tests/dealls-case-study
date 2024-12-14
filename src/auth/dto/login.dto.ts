import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsString, Length } from 'class-validator'

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string

  @ApiProperty()
  @IsString()
  @Length(8, 128)
  password: string
}
