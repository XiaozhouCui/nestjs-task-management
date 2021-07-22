import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // so that it can expose ConfigService to be used in JwtModule as DI
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // .register() exports a jwt service to sign tokens
    // .registerAsync() will need DI in this module file
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // DI into useFactory
      useFactory: async (configService: ConfigService) => {
        return {
          // get the JWT_SECRET from environment variable
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy], // make sure the JwtStrategy is awailable within the module
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // allow any other module that imports this module to apply this auth mechanism
})
export class AuthModule {}
