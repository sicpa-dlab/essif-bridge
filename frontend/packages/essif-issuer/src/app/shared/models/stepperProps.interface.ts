import { CredentialTransport } from './index'
export interface StepperProps {
  handleClick: () => void,
  onConnectionInvitation?: (connectionId: string) => void,
  credentialTransport?: CredentialTransport
}