import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers';
import { UserService, AuthenticationService } from './services';
import { AuthenticationFacade } from './facades';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key-if-not-found',
      signOptions: {
        expiresIn: '24h',
        algorithm: 'HS256',
      },
    }),
  ],
  providers: [
    AuthenticationFacade,
    AtStrategy,
    RtStrategy,
    UserService,
    AuthenticationService,
  ],
  exports: [UserService],
  controllers: [AuthenticationController],
})
export class AuthModule {}
