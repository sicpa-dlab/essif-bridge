export interface JWTHeader {
  typ: 'JWT';
  alg: string;
  jwk?: string;
  jku?: string;
  kid?: string;
}

export interface JWTClaims {
  // Registered Claim names
  iss?: string; // (Issuer) Claim
  sub?: string; // (Subject) Claim
  aud?: string; // (Audience) Claim
  exp?: number; // (Expiration Time) Claim.
  nbf?: number; // (Not Before) Claim
  iat?: number; // (Issued At) Claim
  jti?: string; // (JWT ID) Claim
}

export interface EnterpriseAuthZToken extends JWTClaims {
  did: string;
  enterpriseName: string;
  nonce: string;
}
