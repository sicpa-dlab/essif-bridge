/* tslint:disable */
/* eslint-disable */
/**
 * Sicpa Bridge API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { CredentialCreate } from '../models';
import { CredentialIssuance } from '../models';
/**
 * CredentialsIssuanceApi - axios parameter creator
 * @export
 */
export const CredentialsIssuanceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Issue new credentials
         * @param {CredentialCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        issuanceCredentialPost: async (body: CredentialCreate, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling issuanceCredentialPost.');
            }
            const localVarPath = `/credentials-issuance`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CredentialsIssuanceApi - functional programming interface
 * @export
 */
export const CredentialsIssuanceApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Issue new credentials
         * @param {CredentialCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async issuanceCredentialPost(body: CredentialCreate, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CredentialIssuance>> {
            const localVarAxiosArgs = await CredentialsIssuanceApiAxiosParamCreator(configuration).issuanceCredentialPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * CredentialsIssuanceApi - factory interface
 * @export
 */
export const CredentialsIssuanceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Issue new credentials
         * @param {CredentialCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        issuanceCredentialPost(body: CredentialCreate, options?: any): AxiosPromise<CredentialIssuance> {
            return CredentialsIssuanceApiFp(configuration).issuanceCredentialPost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CredentialsIssuanceApi - object-oriented interface
 * @export
 * @class CredentialsIssuanceApi
 * @extends {BaseAPI}
 */
export class CredentialsIssuanceApi extends BaseAPI {
    /**
     * 
     * @summary Issue new credentials
     * @param {CredentialCreate} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CredentialsIssuanceApi
     */
    public issuanceCredentialPost(body: CredentialCreate, options?: any) {
        return CredentialsIssuanceApiFp(this.configuration).issuanceCredentialPost(body, options).then((request) => request(this.axios, this.basePath));
    }
}