var querystring = require('querystring');
import * as jwtDecode from 'jwt-decode';
import { decode as atob, encode } from 'base-64';
import { AuthenticationQR } from '../interfaces/didAuth';
import { IEnterpriseAuthZToken } from '../interfaces/Token';

function decodeJWT(token) {
  try {
    const tok = jwtDecode(token);
    return tok;
  } catch (Error) {
    return Error;
  }
}

/**
 * Parse a JWT token
 */
function parseJwt(token) {
  try {
    const tok = jwtDecode(token);
    return tok;
  } catch (Error) {
    return null;
  }
}

/**
 * Decodes a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64dec(input) {
  try {
    return JSON.parse(atob(input));
  } catch (error) {
    return null;
  }
}

/**
 * Encoded  a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64enc(input) {
  try {
    return encode(JSON.stringify(input));
  } catch (error) {
    return null;
  }
}

function extractVCfromPresentation(credential) {
  let jwtObject = strB64dec(credential.data.decrypted);
  return jwtObject.verifiableCredential[0];
}

function getEnterpriseDID(token: string): string {
  try {
    const jwyDecoded = decodeJWT(token);
    return jwyDecoded.did;
  } catch (error) {
    console.log(error);
  }
}

function getJwtCredentialSubject(token: string): any {
  try {
    const jwyDecoded = decodeJWT(token);
    return jwyDecoded.vp.verifiableCredential[0].credentialSubject;
  } catch (error) {
    console.log(error);
  }
}

function getJwtCredential(token: string): any {
  try {
    const jwyDecoded = decodeJWT(token);
    return jwyDecoded.vp.verifiableCredential[0];
  } catch (error) {
    console.log(error);
  }
}

function getNonce(urlDecoded: string): string {
  const params: AuthenticationQR = querystring.parse(
    urlDecoded,
  ) as AuthenticationQR;
  return (params.nonce as string) || '';
}
function getJwtNonce(jwt: string): string {
  const payload = jwtDecode(jwt);
  return (payload as IEnterpriseAuthZToken).nonce;
}

export {
  decodeJWT,
  parseJwt,
  strB64dec,
  strB64enc,
  extractVCfromPresentation,
  getEnterpriseDID,
  getJwtCredentialSubject,
  getJwtCredential,
  getNonce,
  getJwtNonce,
};
