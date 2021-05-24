import { BridgeClient } from "../sicpa-bridge/BridgeClient";
export declare class WalletChapi {
    private bridgeClient;
    private credPolifill;
    constructor(bridgeClient: BridgeClient);
    configure: () => Promise<void>;
    connectToWallet: (didAuthQuery: any) => Promise<any>;
    issueCredential: (presentation: any, credential: any) => Promise<boolean>;
    verifyCredential: (credentialQuery: any) => Promise<any>;
}
