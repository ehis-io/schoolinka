import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { UserRepository } from 'src/user/repository/user.repository';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { TokenDTO } from './interface/interface';
@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    const clientID = this.configService.get('GOOGLE_ID');
    const clientSecret = this.configService.get('GOOGLE_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(payload: TokenDTO) {
    try {
      const tokenInfo = await this.oauthClient.getTokenInfo(payload.token);

      const user = await this.userRepository.findUserByEmail(tokenInfo.email);

      if (user) {
        return user;
      }

      if (!user) {
        return this.registerUser(payload.token);
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async registerUser(token: string) {
    const user = await this.getUserData(token);

    //userData Implementation
    return await this.userRepository.createUser(user);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    const user: CreateUserDto = {
      first_name: userInfoResponse.data.given_name,
      last_name: userInfoResponse.data.family_name,
      email: userInfoResponse.data.email,
      user_photo: userInfoResponse.data.picture,
      auth_provider: 'GOOGLE',
    };

    return user;
  }
}
