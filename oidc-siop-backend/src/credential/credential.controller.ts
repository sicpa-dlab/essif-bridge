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

import { Response } from 'express';
import { CredentialService } from './credential.service';
import {
  VerifiableCredential,
  CreateCredentialParam,
} from '../interfaces/dtos';

@Controller('api/')
export class CredentialController {
  private readonly logger = new Logger(CredentialController.name);

  constructor(private readonly credService: CredentialService) {}

  @Post('sendCredential')
  async sendCredential(
    @Body() body: VerifiableCredential,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const param: CreateCredentialParam = {
      credential: body,
      options: {
        eidasBridge: {
          password: '1234',
        },
      },
    };

    const result = await this.credService.sendCredential(param);
    const status = result.data ? HttpStatus.CREATED : HttpStatus.NOT_FOUND;

    return res.status(status).send(result);
  }
}
