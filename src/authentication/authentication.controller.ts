import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  CACHE_MANAGER,
  Inject,
  UseInterceptors,
} from '@nestjs/common';

import { GoogleOauthGuard } from './guards/google.oauth.guards';
import { UserService } from 'src/user/user.service';
import { AuthenticationService } from './authentication.service';
import { AuthProviderEnum } from 'src/user/enum/auth.enum';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { TokenDTO } from './interface/interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  // @HttpCode(HttpStatus.OK)
  // @Get('google')
  // @UseGuards(GoogleOauthGuard)
  // googleAuth(@Req() req) {}

  @Post('google-auth')
  //@UseInterceptors(CacheInterceptor)
  async googleAuthRedirect(@Body() req: TokenDTO) {
    const auth = await this.authenticationService.googleAuth(req);

    return auth;
  }
}
