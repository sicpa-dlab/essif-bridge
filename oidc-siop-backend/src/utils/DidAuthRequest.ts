import * as siopDidAuth from '@validatedid/did-auth';
import * as vidchain from '../api/vidchain';
import * as config from '../config';
import * as didAuth from '../interfaces/didAuth';

import {
  UriRequest,
  DidAuthRequestOpts,
  ObjectPassedBy,
  DidAuthResponseMode,
  DidAuthResponseContext,
} from '../interfaces/didAuth';
import { getJwtNonce } from './Util';

const generateJwtRequest = async (
  socketId: string,
  claim: siopDidAuth.OidcClaim,
): Promise<UriRequest> => {
  const requestOpts: DidAuthRequestOpts = {
    oidpUri: 'vidchain://did-auth',
    redirectUri: `${config.DID_AUTH_REDIRECT}/${socketId}`,
    requestObjectBy: {
      type: ObjectPassedBy.VALUE,
    },
    signatureType: {
      hexPrivateKey:
        '7430a5dd5726cc2fca11b37b2c67292b40953a5fa169192ce55383386b23187b024d327f6e1c19f4099021f40fea8fc473423e1cccc060656d0f2206ccd9a4c4',
      did: 'did:key:z6MkecF8knCM4SXhMp6xku3xFi4EkuvFv3MUQCe1xUg1XgcB',
      kid: '#z6MkecF8knCM4SXhMp6xku3xFi4EkuvFv3MUQCe1xUg1XgcB',
    },
    registrationType: {
      type: ObjectPassedBy.VALUE,
    },
    responseMode: DidAuthResponseMode.FORM_POST,
    responseContext: DidAuthResponseContext.WALLET,
    claims: claim,
  };

  const uriRequest: UriRequest = await siopDidAuth.createUriRequest(
    requestOpts,
  );
  return uriRequest;
};

const verifyDidAuthResponse = async (
  siopResponseJwt: didAuth.SiopResponseJwt,
  socketId: string,
): Promise<siopDidAuth.DidAuthTypes.DidAuthValidationResponse> => {
  const authZToken = await vidchain.getAuthzTokendDidKey();
  const nonce = await getJwtNonce(siopResponseJwt.id_token);

  const optsVerify: siopDidAuth.DidAuthTypes.DidAuthVerifyOpts = {
    verificationType: {
      verifyUri: config.SIGNATURE_VALIDATION,
      authZToken,
      //didUrlResolver: config.DID_URI_RESOLVER, //'https://dev.uniresolver.io/1.0/identifiers',
    },
    redirectUri: `${config.DID_AUTH_REDIRECT}/${socketId}`,
    nonce,
  };
  try {
    const validationResponse = await siopDidAuth.verifyDidAuthResponse(
      siopResponseJwt.id_token,
      optsVerify,
    );
    return validationResponse;
  } catch (error) {
    throw new Error('Error verifying the did auth response.');
  }
};

export { generateJwtRequest, verifyDidAuthResponse };
