Sicpa Bridge
======

This repo contains codebase of the [Sicpa Bridge project](https://gitlab.grnet.gr/essif-lab/infrastructure/sicpa/bridge_project_summary).

A live demo (European Health Insurance Card (EHIC) use-case)  powered by **SICPA bridge** is available at [Sicpa Bridge EHIC demo.](https://essif.adaptivespace.io/)


### Content of the repo

```
├── ..
├── README.md               # this file
├── backend                 # Spring Boot application - Bridge API
├── deployment              # Deployment to AWS ECS via Github Actions
├── docs					# Doc assets
├── frontend                # Issuer and Verifier frontend app
├── oidc-siop-backend       # OIDC-SIOP backend API
└── web
├── ..
```

### Solutionn Diagram

![eSSIF-Bridge](docs/eSSIF-Bridge.jpg)


### Building blocks

* [SSI eIDAS Bridge](https://gitlab.grnet.gr/essif-lab/infrastructure/validated-id/seb_project_summary)
* [TRAIN](https://gitlab.grnet.gr/essif-lab/infrastructure/fraunhofer/train_project_summary)
* [Hyperledger Aries Cloud Agent - Python](https://github.com/hyperledger/aries-cloudagent-python) configure with Sicpa´s [Plugin for HTTP Universal Resolver bindings](https://github.com/sicpa-dlab/acapy-resolver-universal). The image is also available on Docker Hub [rdlabbridge/aries-cloudagent:tagname](https://hub.docker.com/repository/docker/rdlabbridge/aries-cloudagent)
*  [Acapy-resolver-universal]([https://](https://github.com/sicpa-dlab/acapy-resolver-universal)) . This provides an ACA-Py DID Resolver interface to a Universal Resolver instance over HTTP. 
*  [Acapy-resolver-didcomm]([https://](https://github.com/sicpa-dlab/acapy-resolver-didcomm)) This plugin provides an ACA-Py DID Resolver interface to a Universal Resolver instance over DIDComm messaging.



### Wallets

SICPA bridge issuance and verification services are interoperable with multiple wallets. 

* [SICPA browser-based wallet](https://wallet.essif.adaptivespace.io/)
* [Esatus, aries-based wallet](https://play.google.com/store/apps/details?id=com.esatus.wallet&hl=en&gl=US)
* [ValidatedID, OIDC-SIOP wallet](https://drive.google.com/file/d/1n4TeHESTTS0oIn9Mxs1Rhtmp7Hwb3Y7M/view?usp=sharing)


### Configuration

#### Frontend

All [Frontend](frontend/README.md) apps can be configured via ```.env``` file.
```
# Websocket url
REACT_APP_WEBSOCKET_URL=wss://essif.adaptivespace.io/api/bridge-websocket
# Bridge API url
REACT_APP_BRIDGE_API_URL=https://essif.adaptivespace.io/api
```

#### Backend via spring bot application.yaml
```
# Aries Cloud Agent Admin API
aca-py-client:
  url: http://essif.adaptivespace.io:8080

# OIDC-SIOP API
oicd-client:
  url: http://essif.adaptivespace.io:3000/api

# TRAIN API
train:
  url: http://atvtrain3-env.eba-gewjbrmq.eu-central-1.elasticbeanstalk.com
  #url: https://essif.trust-scheme.de/atvtrain

# EIDAS Bridge API
eidas-bridge:
  url: https://api.vidchain.net
  certificatePassword: 1234
```

#### CHAPI Issuance Flow

![Sicpa Bridge chapi Issuance](docs/Sicpa-Bridge-chapi-Issuance.jpg)
