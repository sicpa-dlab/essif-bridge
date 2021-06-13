
import { CredentialTransport } from 'bridge-shared-components'

export interface StepResult {
  transport: CredentialTransport,
  valid?: boolean,
  vc?: any
}
export interface StepperProps {
  handleClick: (result: StepResult) => void
}