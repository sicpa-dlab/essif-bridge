import { Result } from "neverthrow";
export interface VerificationResult {
    checks: string[];
    warnings: any[];
    errors: any[];
}
export interface BridgeClient {
    verifyPresentation(body: any): Promise<Result<Boolean, Error>>;
    verifyCredential(body: any): Promise<Result<VerificationResult, Error>>;
    issueCredential(body: any): Promise<Result<any, Error>>;
}
