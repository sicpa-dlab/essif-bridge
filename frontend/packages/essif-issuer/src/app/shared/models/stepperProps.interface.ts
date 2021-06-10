import { CredentialTransport } from './index'
export interface StepperProps {
  handleClick: (data?: OIDCData) => void,
  onConnectionInvitation?: (connectionId: string) => void,
  credentialTransport?: CredentialTransport
}

export interface OIDCData {
  id: string
  name?: string
  lastName?: string
}