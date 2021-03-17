import { BridgeClient, VerificationResult } from "./BridgeClient";
import { Result } from "neverthrow";
export declare class SicpaBridgeClient implements BridgeClient {
    private httpClient;
    constructor(baseurl?: string);
    verifyPresentation: (body: any) => Promise<Result<Boolean, Error>>;
    verifyCredential: (body: any) => Promise<Result<VerificationResult, Error>>;
    issueCredential: (body: any) => Promise<Result<any, Error>>;
}
