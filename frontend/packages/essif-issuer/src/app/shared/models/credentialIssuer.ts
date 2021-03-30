import { ResultAsync } from 'neverthrow'

export interface CredentialIssuer {
    configure?: () => void
    issue: (credential: any) => ResultAsync<boolean, Error>
}