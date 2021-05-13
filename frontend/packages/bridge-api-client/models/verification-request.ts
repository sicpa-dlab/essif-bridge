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
 * The verification request
 * @export
 * @interface VerificationRequest
 */
export interface VerificationRequest {
    /**
     * The verification request name
     * @type {string}
     * @memberof VerificationRequest
     */
    name: any;
    /**
     * The requested attributes
     * @type {Array&lt;RequestedAttribute&gt;}
     * @memberof VerificationRequest
     */
    requestedAttributes: any;
    /**
     * The requested predicates
     * @type {Array&lt;RequestedPredicate&gt;}
     * @memberof VerificationRequest
     */
    requestedPredicates: any;
    /**
     * The date at which the credential should be valid
     * @type {Date}
     * @memberof VerificationRequest
     */
    validAt?: any;
}
