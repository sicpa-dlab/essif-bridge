export interface VerificationInfo {
  trustList?: string
  trustListUrl?: string
}

export interface VerificationResult {
  checks: Array<String>
  errors: Array<String>
  info?: VerificationInfo
}
