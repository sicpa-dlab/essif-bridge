import { loadOnce } from 'credential-handler-polyfill';
import axios from 'axios';
import { ok, err, errAsync, ResultAsync, okAsync } from 'neverthrow';
import { CredentialsIssuanceApi, VerificationsApi } from 'bridge-api-client';
export { ConnectionsApi } from 'bridge-api-client';

var WalletChapi = function WalletChapi(bridgeClient) {
  var _this = this,
      _this2 = this,
      _this3 = this,
      _this4 = this;

  this.configure = function () {
    try {
      return Promise.resolve(loadOnce()).then(function (_polyfill$loadOnce) {
        _this.credPolifill = _polyfill$loadOnce;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.connectToWallet = function (didAuthQuery) {
    try {
      return Promise.resolve(navigator.credentials.get(didAuthQuery)).then(function (webCredential) {
        if (webCredential == null) {
          return;
        }

        var presentation = webCredential.data;
        return Promise.resolve(_this2.bridgeClient.verifyPresentation(presentation)).then(function (verification) {
          return verification.isOk() ? presentation : null;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.issueCredential = function (presentation, credential) {
    try {
      credential.issuanceDate = new Date().toISOString();
      var webCredentialWrapper = presentation;
      if (webCredentialWrapper == null) return Promise.resolve(false);
      var unSignedCredential = credential;
      if (unSignedCredential == null) return Promise.resolve(false);
      unSignedCredential.credentialSubject.id = webCredentialWrapper.holder;
      return Promise.resolve(_this3.bridgeClient.issueCredential(unSignedCredential)).then(function (signedCredential) {
        if (signedCredential.isErr()) {
          console.log(signedCredential.error);
          return false;
        }

        webCredentialWrapper.verifiableCredential = signedCredential.value;
        var webCredential = new _this3.credPolifill.WebCredential("VerifiablePresentation", webCredentialWrapper);
        return Promise.resolve(navigator.credentials.store(webCredential)).then(function (result) {
          return (result === null || result === void 0 ? void 0 : result.type) === "web" || false;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.verifyCredential = function (credentialQuery) {
    try {
      return Promise.resolve(navigator.credentials.get(credentialQuery)).then(function (presentation) {
        if (presentation == null) return [];
        var presentationData = presentation.data;
        if ((presentationData === null || presentationData === void 0 ? void 0 : presentationData.verifiableCredential) == null) return [];
        var credential = presentationData.verifiableCredential[0];
        console.log("extracted Credential:", JSON.stringify(credential, null, 2));
        return Promise.resolve(_this4.bridgeClient.verifyCredential(credential)).then(function (verification) {
          console.log(verification.isOk() ? verification.value : verification.error);
          return verification.isOk() ? verification.value.checks : [];
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.bridgeClient = bridgeClient;
};

var _iteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
var _asyncIteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator";
function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var SicpaBridgeClient = function SicpaBridgeClient(baseurl) {
  var _this = this,
      _this2 = this,
      _this3 = this;

  this.verifyPresentation = function (body) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(_this.httpClient.post("/presentations/verify", body)).then(function (resp) {
          return ok(resp.status === 200);
        });
      }, function (error) {
        return err(error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.verifyCredential = function (body) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(_this2.httpClient.post("/credentials/verify", body)).then(function (resp) {
          return resp.status === 200 ? ok(resp.data) : err(resp.data);
        });
      }, function (error) {
        return err(error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.issueCredential = function (body) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(_this3.httpClient.post("/credentials/issue", body)).then(function (resp) {
          return ok(resp.data);
        });
      }, function (error) {
        return err(error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.httpClient = axios.create({
    baseURL: baseurl || process.env.REACT_APP_BRIDGE_API_URL,
    headers: {
      "Content-type": "application/json"
    }
  });
};

var AnonCredentialIsssuer = function AnonCredentialIsssuer() {
  this.issue = function (credential) {
    var anonCredential = credential;
    if (anonCredential == null) return errAsync(Error("invalid credential"));
    var credApi = new CredentialsIssuanceApi({
      basePath: process.env.REACT_APP_BRIDGE_API_URL
    });
    console.log(anonCredential);
    var credIssu = credApi.issuanceCredentialPost({
      connectionId: anonCredential.connectionId,
      schemaId: anonCredential.schemaId,
      credentialDefinitionId: anonCredential.credentialDefinitionId,
      attributes: anonCredential.attributes
    });
    var result = ResultAsync.fromPromise(credIssu, function () {
      return new Error("Could not issue credential");
    });
    return result.andThen(function (issueReponse) {
      if (issueReponse.status === 200) {
        return okAsync(true);
      }

      return errAsync(new Error("Could not issue credential"));
    });
  };
};

var AnonCredentialVerifier = function AnonCredentialVerifier() {
  this.sendProof = function (connectionId, verificationTemplateId) {
    var verApi = new VerificationsApi({
      basePath: process.env.REACT_APP_BRIDGE_API_URL
    });
    var verIssu = verApi.verificationsPost({
      connectionId: connectionId,
      verificationTemplateId: verificationTemplateId
    });
    var result = ResultAsync.fromPromise(verIssu, function () {
      return new Error("Could not send verification");
    });
    return result.andThen(function (issueReponse) {
      if (issueReponse.status === 200) {
        return okAsync(true);
      }

      return errAsync(new Error("Could not send verification"));
    });
  };
};

export { AnonCredentialIsssuer, AnonCredentialVerifier, SicpaBridgeClient, WalletChapi };
//# sourceMappingURL=index.modern.js.map
