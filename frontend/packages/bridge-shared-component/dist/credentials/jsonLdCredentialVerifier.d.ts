import { BridgeClient } from "../sicpa-bridge/BridgeClient";
export declare class JsonLdCredentialVerifier {
    private bridgeClient;
    constructor(bridgeClient: BridgeClient);
    verifyCredential: (credential: any) => Promise<any>;
}
