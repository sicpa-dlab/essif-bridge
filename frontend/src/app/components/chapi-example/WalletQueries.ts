import { v4 as uuidv4 } from "uuid"

// challenge is generated on client side for demo porposes

export const didAuthQuery = (): CredentialRequestOptions => {
  const challenge = uuidv4()

  return {
    web: {
      VerifiablePresentation: {
        query: {
          type: "DIDAuth",
        },
        // a 128-bit randomly generated value encoded as a string (use a UUID);
        // it will be digitally signed in the authentication proof
        // that will be attached to the VerifiablePresentation response
        challenge: challenge,
        // the domain that must be digitally signed in the authentication
        // proof that will be attached to the VerifiablePresentation
        // response, identifying the recipient
        domain: "essif.adaptivespace.io",
      },
    },
  } as CredentialRequestOptions
}

export const credentialQuery = (): CredentialRequestOptions => {
  const challenge = uuidv4()

  return {
    web: {
      VerifiablePresentation: {
        query: [
          {
            type: "QueryByExample",
            credentialQuery: {
              reason:
                "Please present a UniversityDegreeCredential for JaneDoe.",
              example: {
                "@context": [
                  "https://w3id.org/credentials/v1",
                  "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/ehic-v1.jsonld",
                  "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/cades-signature.jsonld",
                ],
                type: ["EuropeanHealthInsuranceCard"],
                credentialSubject: {
                  id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
                },
              },
            },
          },
        ],
        challenge: challenge,
        domain: "essif.adaptivespace.io",
      },
    },
  } as CredentialRequestOptions
}
