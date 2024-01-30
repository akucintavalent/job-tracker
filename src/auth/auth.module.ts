import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      //secret: 'jwt-secret', // TODO: move it to the env
      //signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // TODO: Uncoment to enable AuthGuard on each endpoint
    //{
    //  provide: APP_GUARD,
    //  useClass: AuthGuard,
    //},
  ],
})
export class AuthModule {}
