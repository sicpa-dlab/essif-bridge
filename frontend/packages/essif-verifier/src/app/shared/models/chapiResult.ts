export interface ChapiInfo {
  trustList?: string
  trustListUrl?: string
}

export interface ChapiResult {
  checks: Array<String>
  errors: Array<String>
  info?: ChapiInfo
}
