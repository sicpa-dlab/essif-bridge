import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as siopDidAuth from '@validatedid/did-auth';
import * as config from '../config';
import * as didAuth from '../interfaces/didAuth';
import {
  generateJwtRequest,
  verifyDidAuthResponse,
} from '../utils/DidAuthRequest';
import { getNonce, getJwtNonce, getJwtCredentialSubject, getJwtCredential} from '../utils/Util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async getToken(url: string, body: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      const bodyWithSecret = {
        ...body,
        client_secret: config.CLIENT_SECRET,
      };
      // const response = await externals.post(bodyWithSecret, url, headers);
      // if (!response || !response.data.access_token) {
      //   throw new Error(
      //     ` auth: Error retrieving the Access Token: ${response.status}`,
      //   );
      // }

      // return response.data;
      return '';
    } catch (error) {
      throw new Error('error');
    }
  }

  async didAuthRequest(
    socketId: string,
    claim: siopDidAuth.OidcClaim,
  ): Promise<any> {
    try {
      const uriRequest = await generateJwtRequest(socketId, claim);
      const uriDecoded =
        decodeURIComponent(uriRequest.urlEncoded) +
        '&client_name=' +
        config.EntityDidKey.iss;

      return uriDecoded;
    } catch (error) {
      throw new Error('Error generating the did auth request');
    }
  }

  async validateResponse(
    siopResponseJwt: didAuth.SiopResponseJwt,
    socketId: string,
  ): Promise<didAuth.BackendResponseSiop> {
    const nonce = getJwtNonce(siopResponseJwt.id_token);
    if (!nonce) {
      throw new BadRequestException('Error retriving the nonce of the token');
    }
    
    // const validationResponse = await verifyDidAuthResponse(
    //   siopResponseJwt,
    //   socketId,
    // );

    // if (!validationResponse.signatureValidation)
    //   throw new BadRequestException(
    //     'Error verifying the DID Auth Token signature.',
    //   );

    const credential = getJwtCredential(siopResponseJwt.id_token);

    return credential;

    //const credentialSubject = getJwtCredentialSubject(siopResponseJwt.id_token);

    //return credentialSubject;
  }
}
