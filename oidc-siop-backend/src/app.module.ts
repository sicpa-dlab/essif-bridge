import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { CredentialController } from './credential/credential.controller';
import { CredentialService } from './credential/credential.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, CredentialController],
  providers: [AppService, AuthService, CredentialService],
})
export class AppModule {}
