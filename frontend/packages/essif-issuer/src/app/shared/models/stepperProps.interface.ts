import { CredentialTransport } from './index'
export interface StepperProps {
  handleClick: (data?: OIDCData | null) => void,
  onConnectionInvitation?: (connectionId: string) => void,
  credentialTransport?: CredentialTransport
}

export interface OIDCData {
  id: string
  name?: string
  lastName?: string
}