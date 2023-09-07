import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './config/database.module';
import { JwtService } from '@nestjs/jwt';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),

    AuthenticationModule,
    UserModule,
    DatabaseModule,
    ArticleModule,
  ],

  providers: [JwtService],
})
export class AppModule {}
