import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthProviderEnum } from 'src/user/enum/auth.enum';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/user.service';
import { GoogleAuthenticationService } from './google.authentication.service';
import { TokenDTO } from './interface/interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private googleservice: GoogleAuthenticationService,
    private configService: ConfigService,
  ) {}
  provider = AuthProviderEnum;

  async googleAuth(payload: TokenDTO) {
    const provider_auth: AuthProviderEnum = this.provider.GOOGLE;
    const user = await this.googleservice.authenticate(payload);

    if (user) {
      return await this.signIn(user.email, provider_auth);
    }
    throw new BadRequestException('Incorrect credential');
  }

  async signIn(email: string, provider: AuthProviderEnum) {
    const user = await this.userRepository.findUserByEmail(email);
    switch (provider) {
      case 'GOOGLE':
        {
          if (user && user.auth_provider == provider) {
            //this.cacheManager.set('user', user);
            const token = await this.generateToken(user);
            return { user, token };
          } else
            throw new BadRequestException('Invalid authentication provider');
        }

        break;

      default:
        throw new HttpException(
          'Invalid credential provided',
          HttpStatus.BAD_REQUEST,
        );
        break;
    }
  }

  public generateToken(user: User) {
    const payload: {} = { sub: user.id, username: user.first_name };
    const token = this.jwtService.signAsync(payload);
    return token;
  }
}
