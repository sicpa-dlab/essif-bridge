export interface RequestPresentation {
  target: string;
  name?: string;
  type: string[][];
}

export interface MsgPresentationReady {
  message: string;
  url: string;
}

export interface Presentation {
  id: string;
  type: string;
  name: string;
  hash: string;
  data: IAttributeData;
}

export interface IAttributeData {
  encrypted: any;
  decrypted?: string;
}

export interface VerifiablePresentation {
  '@context': string[];
  type: string;
  verifiableCredential: string[] | VerifiableCredential[];
  proof: Proof;
}

export interface VerifiableCredential extends Credential {
  issuer: string;
  issuanceDate: string;
  proof: Proof;
}

export interface CreateCredentialParam {
  credential: Credential;
  options: CredentialOptions;
}

export interface CredentialOptions {
  eidasBridge: EidasBridge;
}

export interface EidasBridge {
  password: string;
}

export interface Proof {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  jws: string;
  [x: string]: string;
}

export interface CredentialData {
  type: string[];
  issuer: string;
  id: string;
  credentialSubject: any;
}

export interface SocketClient {
  did: string;
  value: UserSession;
}
export interface UserSession {
  clientId: any;
  lastSessionId: string;
}
export interface SessionClient {
  did: string;
  sessionId: string;
}
export interface SessionData {
  sessionId: string;
  data: any;
}
