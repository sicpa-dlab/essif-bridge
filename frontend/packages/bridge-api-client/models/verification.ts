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
/**
 * 
 * @export
 * @interface Verification
 */
export interface Verification {
    /**
     * The verification id
     * @type {string}
     * @memberof Verification
     */
    verificationId: any;
    /**
     * The connection id
     * @type {string}
     * @memberof Verification
     */
    connectionId: any;
    /**
     * 
     * @type {VerificationRequest}
     * @memberof Verification
     */
    verificationRequest: any;
    /**
     * The verification state
     * @type {string}
     * @memberof Verification
     */
    state: VerificationStateEnum;
    /**
     * The creation date 
     * @type {Date}
     * @memberof Verification
     */
    createdAt: any;
    /**
     * The update date
     * @type {Date}
     * @memberof Verification
     */
    updatedAt: any;
}

/**
    * @export
    * @enum {string}
    */
export enum VerificationStateEnum {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    FAILURE = 'FAILURE',
    ERROR = 'ERROR'
}

