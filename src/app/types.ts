export interface IOptions {
    /** Client Identifier */
    client_id: string;
    /** Client Secret */
    client_secret: string;
}

export interface ITokenResponse {
    /** A short-lived JWT token used to access data on behalf of the Customer */
    access_token: string;
    /** A long lived code use to obtain a new access_token when expired. It will be returned only if the scope offline_access was requested */
    refresh_token: string;
}

export interface IAuthResponse {
    /** A short-lived JWT token used to access data on behalf of the Customer */
    access_token: string;
    /** access_token validity in seconds. Default is 1 hour */
    expires_in: number;
    /** A long lived code use to obtain a new access_token when expired. */
    refresh_token: string;
    /** Must be: Bearer */
    token_type: string;
}


export interface IJWT {
    amr: [ string ];
    aud: [ string, string ];
    auth_time: number;
    client_id: string;
    connector_id: string;
    credentials_key: string;
    exp: number;
    idp: string;
    iss: string;
    nbf: number;
    scope: Scope[];
    sub: string;
}

export class Constants {
    // Constants
    public static readonly AUTH_URL: string = "https://auth.truelayer.com";
    public static readonly API_URL: string = "https://api.truelayer.com";
    public static readonly API_TIMEOUT: number = 60000;
}

export type Scope = "info" | "accounts" | "transactions" | "balance" | "offline_access";

export interface IAccount {
    /** Unique identifier of the account */
    account_id: string;
    /** Account Identifiers      * @type {IAccountNumber} */
    account_number: IAccountNumber;
    /** Type of the account */
    account_type: string;
    /** ISO 4217 alpha-3 currency code of the account */
    currency: string;
    /** Optional description of account */
    description?: string;
    /** Human readable name of the account */
    display_name?: string;
    /** Last update time of the account information */
    update_timestamp: string;
}

/**
 * Account identifiers
 *
 * @interface IAccount
 */
export interface IAccountNumber {
    /** ISO 13616-1:2007 international bank number */
    iban: string;
    /** Bank account number */
    number: string;
    /** United Kingdom sort code */
    sort_code: string;
    /** ISO 9362:2009 Business Identifier Codes */
    swift_bic?: string;
}

export interface IBalance {
    /** Available balance */
    available: number;
    /** ISO 4217 alpha-3 currency code */
    currency: string;
    /** Current balance */
    current: number;
    /** Last update time */
    update_timestamp: string;
}

export interface IInfo {
    /**
     * Address information
     * @type {IAddressInfo[]}
     */
    addresses?: IAddressInfo[];
    /** Date of birth of the Customer */
    date_of_birth?: string;
    /** Email addresses */
    emails?: string[];
    /** Full name of the Customer */
    full_name: string;
    /** Phone numbers */
    phones?: string[];
    /** Last time the data has been updated from the provider */
    update_timestamp?: string;
}

export interface IAddressInfo {
    /** Full address of the Customer */
    address?: string;
    /** City */
    city?: string;
    /** ISO-3166-1 alpha-3 code of the country */
    country?: string;
    /** State */
    state?: string;
    /** Post code */
    zip?: string;
}

export interface IMe {
    /** Your unique client identifier */
    client_id: string;
    /** Unique identifier of the set of credentials */
    credentials_id: string;
    /** Unique identifier of the Provider */
    provider_id: string;
}

export interface IResult<T> {
    /** An array of results objects of type <T> */
    results: T[];
}

/**
 * Response format for errors
 *
 * @interface IError
 */
export interface IError {
    /** The error code and associated HTTP status */
    error: string;
    /** Finer grain detail of the error */
    error_description: string;
}

export interface ITransaction {
    /** Amount of the transaction */
    amount: number;
    /** ISO 4217 alpha-3 currency code */
    currency: string;
    /** Original description of the transaction as reported by the Provider */
    description: string;
    /** A collection of additional Provider specific transaction metadata */
    meta: object;
    /** Date the transaction was posted on the account */
    timestamp: string;
    /** Type of the transaction */
    transaction_type: string;
}
