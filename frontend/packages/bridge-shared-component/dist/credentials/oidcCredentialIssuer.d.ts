import { CredentialIssuer } from "./credentialIssuer";
import { ResultAsync } from "neverthrow";
export declare class OidcCredentialIsssuer implements CredentialIssuer {
    issue: (credential: any) => ResultAsync<boolean, Error>;
}
