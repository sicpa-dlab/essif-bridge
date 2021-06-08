import * as siopDidAuth from '@validatedid/did-auth';
import { VerifiablePresentation } from './VP';
import { JWTClaims } from './JWT';
import { JWKECKey } from './JWK';

export enum EncKeyAlgorithm {
  ECDH_ES = 'ECDH-ES', // default
}
export enum EncSymmetricAlgorithmCode {
  XC20P = 'XC20P', // default
}
export enum DidAuthResponseMode {
  FRAGMENT = 'fragment', // default
  FORM_POST = 'form_post',
  QUERY = 'query',
}
export enum DidAuthResponseContext {
  RP = 'rp', // default
  WALLET = 'wallet',
}
export enum DidAuthResponseIss {
  SELF_ISSUE = 'https://self-issued.me',
}

export enum DidAuthKeyAlgorithm {
  ES256KR = 'ES256K-R', // default
  ES256K = 'ES256K',
  RS256 = 'RS256',
  EDDSA = 'EdDSA',
}
export enum UrlEncodingFormat {
  FORM_URL_ENCODED = 'application/x-www-form-urlencoded',
}

export interface DidAuthRequestOpts {
  oidpUri?: string;
  redirectUri: string;
  requestObjectBy: RequestObjectBy;
  signatureType: InternalSignature | ExternalSignature;
  registrationType: RegistrationType;
  responseMode?: DidAuthResponseMode;
  responseContext?: DidAuthResponseContext;
  claims?: siopDidAuth.OidcClaim;
  keySigningAlgorithm?: DidAuthKeyAlgorithm;
  nonce?: string;
  state?: string;
}

export type RequestObjectBy = {
  type: ObjectPassedBy.REFERENCE | ObjectPassedBy.VALUE;
  referenceUri?: string; // MUST be set when options is REFERENCE
};
export enum ObjectPassedBy {
  REFERENCE = 'REFERENCE',
  VALUE = 'VALUE',
}

export interface InternalSignature {
  hexPrivateKey: string; // hex private key Only secp256k1 format
  did: string;
  kid?: string; // Optional: key identifier. default did#key-1
}

export interface ExternalSignature {
  signatureUri: string; // url to call to generate a signature
  did: string;
  authZToken?: string; // Optional: bearer token to use to the call
  hexPublicKey?: string; // Optional: hex encoded public key to compute JWK key, if not possible from DID Document
  kid?: string; // Optional: key identifier. default did#key-1
}

export interface RegistrationType extends RequestObjectBy {
  id_token_encrypted_response_alg?: EncKeyAlgorithm;
  id_token_encrypted_response_enc?: EncSymmetricAlgorithmCode;
}

export type UriDidAuth = {
  urlEncoded: string;
  encoding: UrlEncodingFormat;
};

export interface UriRequest extends UriDidAuth {
  jwt?: string;
}

export interface DidAuthVerifyOpts {
  verificationType: InternalVerification | ExternalVerification;
  nonce?: string;
}
export interface InternalVerification {
  registry: string;
  rpcUrl: string;
}

export interface ExternalVerification {
  verifyUri: string; // url to call to verify the id_token signature
  authZToken?: string; // Optional: bearer token to use to the call
}

export interface DidAuthResponsePayload extends JWTClaims {
  iss: DidAuthResponseIss.SELF_ISSUE;
  sub: string;
  aud: string;
  exp?: number;
  iat?: number;
  nonce: string;
  sub_jwk: JWKECKey;
  did: string;
  vp?: VerifiablePresentation;
}

export interface SiopResponseJwt {
  id_token: string;
  state: string;
  login_challenge?: string;
}

export interface BackendResponseSiop {
  validationResponse: siopDidAuth.DidAuthTypes.DidAuthValidationResponse;
  socketId: string;
  redirectUrl?: string;
}

export interface AuthenticationQR {
  response_type: string;
  client_id: string;
  scope: string;
  state?: string;
  nonce?: string;
  requestUri?: string;
  client_name?: string;
  [x: string]: unknown;
}
