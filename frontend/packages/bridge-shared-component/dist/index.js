function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var polyfill = require('credential-handler-polyfill');
var axios = _interopDefault(require('axios'));
var neverthrow = require('neverthrow');

var WalletChapi = function WalletChapi(bridgeClient) {
  var _this = this,
      _this2 = this,
      _this3 = this,
      _this4 = this;

  this.configure = function () {
    try {
      return Promise.resolve(polyfill.loadOnce()).then(function (_polyfill$loadOnce) {
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
          return neverthrow.ok(resp.status === 200);
        });
      }, function (error) {
        return neverthrow.err(error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.verifyCredential = function (body) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(_this2.httpClient.post("/credentials/verify", body)).then(function (resp) {
          return resp.status === 200 ? neverthrow.ok(resp.data) : neverthrow.err(resp.data);
        });
      }, function (error) {
        return neverthrow.err(error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.issueCredential = function (body) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(_this3.httpClient.post("/credentials/issue", body)).then(function (resp) {
          return neverthrow.ok(resp.data);
        });
      }, function (error) {
        return neverthrow.err(error);
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

exports.SicpaBridgeClient = SicpaBridgeClient;
exports.WalletChapi = WalletChapi;
//# sourceMappingURL=index.js.map
