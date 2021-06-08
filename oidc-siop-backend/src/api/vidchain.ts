import { Logger } from '@nestjs/common';
import axios from 'axios';
import * as config from '../config';
import {
  RequestPresentation,
  VerifiablePresentation,
  CreateCredentialParam,
} from '../interfaces/dtos';
import { strB64enc } from '../utils/Util';

// Simple axios post request
async function postRequest(token: string, user: any, endpoint: string) {
  const authorization = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/${endpoint}`,
      user,
      authorization,
    );

    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 204
    ) {
      return 'Error';
    }
    // Some requests return an empty response with status 204
    if (response.status === 204) {
      return 'Ok';
    }
    return response.data;
  } catch (error) {
    return 'Error';
  }
}

// Get API authentication token
async function getAuthzToken() {
  const body = {
    grantType: config.grantType,
    assertion: strB64enc(config.Entity),
    scope: config.scope,
  };
  try {
    const response = await axios.post(`${config.API_URL}/sessions`, body);
    if (response.status !== 200 && response.status !== 201) {
      return 'Error';
    }
    return response.data.accessToken;
  } catch (error) {
    return 'Error';
  }
}

async function getAuthzTokendDidKey() {
  const body = {
    grantType: config.grantType,
    assertion: strB64enc(config.EntityDidKey),
    scope: config.scope,
  };
  try {
    const response = await axios.post(`${config.API_URL}/sessions`, body);
    if (response.status !== 200 && response.status !== 201) {
      return 'Error';
    }
    return response.data.accessToken;
  } catch (error) {
    return 'Error';
  }
}

async function sendVP(token: string, vp: CreateCredentialParam) {
  return postRequest(token, vp, 'verifiable-credentials');
}

// Request Presentation
async function requestVP(token: string, presentation: RequestPresentation) {
  return postRequest(token, presentation, 'verifiable-presentations-requests');
}

// Validate Presentation
async function validateVP(
  token: string,
  presentation: VerifiablePresentation,
): Promise<boolean> {
  return postRequest(
    token,
    presentation,
    'verifiable-presentation-validations',
  );
}

// Retrieve Presentation
async function retrievePresentation(token: string, url: string) {
  const authorization = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const response = await axios.get(url, authorization);
    if (response.status !== 200 && response.status !== 201) {
      return 'Error';
    }
    return response.data;
  } catch (error) {
    return 'Error';
  }
}

export {
  getAuthzToken,
  getAuthzTokendDidKey,
  requestVP,
  sendVP,
  retrievePresentation,
  validateVP,
};
