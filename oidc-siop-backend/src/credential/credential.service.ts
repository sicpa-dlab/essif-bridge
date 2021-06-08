import { Injectable, Logger } from '@nestjs/common';
import { CreateCredentialParam } from '../interfaces/dtos';
import * as vidchain from '../api/vidchain';

@Injectable()
export class CredentialService {
  private readonly logger = new Logger(CredentialService.name);

  async sendCredential(credential: CreateCredentialParam): Promise<any> {
    const authZToken = await vidchain.getAuthzTokendDidKey();
    try {
      const validationResponse = await vidchain.sendVP(authZToken, credential);
      return validationResponse;
    } catch (error) {
      throw new Error('Error verifying the did auth response.');
    }
  }
}
