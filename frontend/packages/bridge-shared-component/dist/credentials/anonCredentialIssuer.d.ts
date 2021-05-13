import { CredentialIssuer } from "./credentialIssuer";
import { ResultAsync } from "neverthrow";
export interface AnonCredCredential {
    connectionId: string;
    schemaId: string;
    credentialDefinitionId: string;
    attributes: any;
}
export declare class AnonCredentialIsssuer implements CredentialIssuer {
    issue: (credential: any) => ResultAsync<boolean, Error>;
}
