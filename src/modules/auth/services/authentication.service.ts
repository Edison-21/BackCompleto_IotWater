import { TokensDto } from '@core/dtos';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { AUTH_MESSAGE_ERROR } from '../consts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name, {
    timestamp: true,
  });

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async regenerateTokens(id: number, username: string) {
    this.logger.log('Regenerando los tokens');
    const tokens = await this.getTokens(id, username);
    await this.updateRtHash(id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(data, saltOrRounds);
  }

  async getTokens(userId: number, username: string): Promise<TokensDto> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.RT_SECRET || 'rt-secret-default',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash: string = await this.hashData(rt);
    await this.userService.updateRtHash(userId, hash);
  }

  async passwordMatch(password: string, hash: string): Promise<void> {
    const isPasswordEquals: boolean = await bcrypt.compare(password, hash);
    if (!isPasswordEquals) throw new ForbiddenException(AUTH_MESSAGE_ERROR);
  }

  async rtMatch(rt: string, hashedRt: string) {
    const isRtEquals = await bcrypt.compare(rt.trim(), hashedRt);
    if (!isRtEquals) {
      this.logger.error('El refresh token no es válido');
      throw new ForbiddenException(AUTH_MESSAGE_ERROR);
    }
  }
}
