import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    // TODO: Uncoment to enable AuthGuard on each endpoint
    //{
    //  provide: APP_GUARD,
    //  useClass: AuthGuard,
    //},
  ],
})
export class AuthModule {}
