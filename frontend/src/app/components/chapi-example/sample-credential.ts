export const sampleCredential =  {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/ehic-v1.jsonld",
    "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/cades-signature.jsonld"
  ],
  "id": "https://ec.europa.eu/credentials/83627465",
  "type": [
    "VerifiableCredential",
    "EuropeanHealthInsuranceCard"
  ],
  "issuer": "did:example:28394728934792387",
  "name": "European Health Insurance Card",
  "description": "Example of a European Health Insurance Card",
  "expirationDate": "2029-12-03T12:19:52Z",
  "institutionID": "09999 - GE KVG",
  "issuanceDate": "2029-12-03T12:19:52Z",
  "cardNo": "80756099990000034111",
  "personalID": "09999 111999",
  "credentialSubject": {
    "id": "did:example:b34ca6cd37bbf23",
    "type": [
      "EuropeanHealthInsuranceHolder",
      "Person"
    ],
    "familyName": "Muster",
    "givenName": "Maria",
    "birthDate": "1958-07-17"
  }
}