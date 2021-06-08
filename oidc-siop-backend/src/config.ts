import * as dotenv from 'dotenv';

// importing .env variables
dotenv.config();
const PORT = process.env.PORT || 3031;
const API_URL = process.env.API_URL || 'undefined';
const BASE_URL = process.env.BASE_URL || 'undefined';
const WS_URL = process.env.WS_URL || 'undefined';
const API_KEY = process.env.API_KEY || 'undefined';
const API_KEY_DIDKEY = process.env.API_KEY_DIDKEY || 'undefined';
const IDENTITY_PROVIDER = process.env.IDENTITY_PROVIDER || 'undefined';
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'undefined';

//Legal Entity
const Entity = {
  iss: 'Sicpa Bridge',
  aud: 'vidchain-api',
  nonce: 'z-z-0427dc2515b1',
  callbackUrl: BASE_URL + '/presentation/validation',
  apiKey: API_KEY,
};

const EntityDidKey = {
  iss: 'Ministry of Social Security and Inclusion',
  aud: 'vidchain-api',
  nonce: 'z-0427dc2515b1',
  callbackUrl: BASE_URL + '/presentation/validation',
  apiKey: API_KEY_DIDKEY,
};

const grantType = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
const scope = 'vidchain profile entity';
//const scope = "vidchain profile test entity";

const DID_AUTH_REDIRECT = BASE_URL + 'api/oidc/didauthresponse';
const DID_URI_RESOLVER = `${API_URL}/identifiers`;
const SIGNATURE_VALIDATION = `${API_URL}/signature-validations`;

export {
  PORT,
  API_URL,
  BASE_URL,
  Entity,
  EntityDidKey,
  grantType,
  scope,
  WS_URL,
  IDENTITY_PROVIDER,
  CLIENT_SECRET,
  DID_AUTH_REDIRECT,
  DID_URI_RESOLVER,
  SIGNATURE_VALIDATION,
};
