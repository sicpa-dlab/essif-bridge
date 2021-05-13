import { ResultAsync } from 'neverthrow';
export declare class AnonCredentialVerifier {
    sendProof: (connectionId: string, verificationTemplateId: number) => ResultAsync<boolean, Error>;
}
