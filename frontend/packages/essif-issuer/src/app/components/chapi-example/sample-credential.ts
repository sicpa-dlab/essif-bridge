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
  "issuer": "Ministry of Social Security & Inclusion",
  "name": "European Health Insurance Card",
  "description": "Example of a European Health Insurance Card",
  "expirationDate": "2029-12-03T12:19:52Z",
  "institutionID": "09999 - INSS Madrid",
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
  },
  "termsOfUse": [{
    "type": "https://train.trust-scheme.de/info",
    "trustScheme": ["ehic.europe.lightest.nlnetlabs.nl"]
  }]
}

export const sampleAnonCredential = (connectionId: String) => {

  return {
    "connectionId": connectionId,
    "schemaId": "BJX4adKceDv9D4qmztEN3F:2:European-Health-Insurance-Card:1.0",
    "credentialDefinitionId": "BJX4adKceDv9D4qmztEN3F:3:CL:199201:essif",
    "comment": "essif",
    "attributes": [
      {
        "name": "institutionID",
        "value": "09999 - INSS Madrid"
      },
      {
        "name": "cardNo",
        "value": "80756099990000034111"
      },
      {
        "name": "personalID",
        "value": "09999 111999"
      },
      {
        "name": "familyName",
        "value": "Muster"
      },
      {
        "name": "givenName",
        "value": "Maria"
      },
      {
        "name": "birthDate",
        "value": "1958-07-17"
      }
    ]
  }

}