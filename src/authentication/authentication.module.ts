import { Inject, Module } from '@nestjs/common';

import { AuthenticationController } from './authentication.controller';

import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/user.service';

import { UserModule } from 'src/user/user.module';
import { AuthenticationService } from './authentication.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { CacheModule } from '@nestjs/cache-manager';
import { GoogleAuthenticationService } from './google.authentication.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    CacheModule.register(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    GoogleAuthenticationService,
    AuthenticationService,
    UserService,
    UserRepository,
  ],
})
export class AuthenticationModule {}
