import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma-client/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as Bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { UserJwtPayload } from 'src/shared/interfaces/request-with-jwt-user.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    })

    if (foundUser) {
      throw new BadRequestException('Email already used')
    }

    const salt = Bcrypt.genSaltSync(10)
    const passwordHash = Bcrypt.hashSync(dto.password, salt)

    await this.prisma.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
      },
    })
  }

  async login(dto: LoginDto) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    })

    if (!foundUser) {
      throw new BadRequestException('Invalid email or password')
    }

    const isMatched = Bcrypt.compareSync(dto.password, foundUser.password)

    if (!isMatched) {
      throw new BadRequestException('Invalid email or password')
    }

    const userJwtPayload: UserJwtPayload = {
      id: foundUser.id,
      email: foundUser.email,
    }

    return {
      accessToken: this.jwtService.sign(userJwtPayload),
    }
  }
}
