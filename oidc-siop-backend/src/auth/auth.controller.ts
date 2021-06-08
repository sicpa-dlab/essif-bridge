import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Logger,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import * as siopDidAuth from '@validatedid/did-auth';
import { Response } from 'express';
import { AuthService } from './auth.service';
import * as config from '../config';
import * as didAuth from '../interfaces/didAuth';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('didAuthRequest/:socketId/:credentialId')
  async didAuthRequest(
    @Param() params,
    @Res() res: Response,
  ): Promise<Response<any>> {
    try {
      const claim: siopDidAuth.OidcClaim = {
        vc: {
          //VerifiableIdCredential
          [params.credentialId]: { essential: true },
        },
      };

      const result = await this.authService.didAuthRequest(
        params.socketId,
        claim,
      );
      return res.status(HttpStatus.CREATED).send(result);
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  }

  @Post('didAuthResponse/:socketId')
  async getResponse(
    @Param() params,
    @Body() body: didAuth.SiopResponseJwt,
    @Res() res: Response,
  ): Promise<Response<any>> {
    this.logger.log(body);

    if (!body || !body.id_token || !body.state) {
      throw new BadRequestException('Wrong parameters provided.');
    }
    const result: didAuth.BackendResponseSiop =
      await this.authService.validateResponse(body, params.socketId);

    //Send info to frontend
    //this.socket.emit('didAuthReady', result);
    //Not implemented for App browser flow, but If redirectUrl sends to the app for redirection
    // if(result.redirectUrl){
    //     return res.status(HttpStatus.CREATED).send(result.redirectUrl);
    // }
    return res.status(HttpStatus.CREATED).send(result);
  }
}
