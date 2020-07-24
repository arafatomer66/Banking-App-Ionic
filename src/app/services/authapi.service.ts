import {Injectable} from '@angular/core';
import {IOptions, IAuthResponse, ITokenResponse, Constants} from '../types';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthapiService {
    options: IOptions = {
        client_id: 'hab00119-7fd500',
        client_secret: 'ef66860f-e181-4b15-bbff-2fa53dcab0d2',
    };


    // tslint:disable-next-line:variable-name
    constructor(private _http: HttpClient) {


    }


    public getAuthUrl(redirectURI: string,
                      scope: string[],
                      nonce: string,
                      responseMode?: string,
                      state?: string,
                      enableMock?: boolean): string {

// for (const grant of scope) {
// if (!AuthapiService.isValidScope(grant)) {
// throw (`Provided scope is not valid: ${grant}`);
// }
// }

        const concatScope: string = scope.join(' ');
        let authUrl: string =
            `${Constants.AUTH_URL}/?` +
            `response_type=code&` +
            `client_id=${this.options.client_id}&` +
            `redirect_uri=${redirectURI}&` +
            `scope=${concatScope}&` +
            `nonce=${nonce}`;

        if (responseMode) {
            authUrl += `&response_mode=${responseMode}`;
        }
        if (state) {
            authUrl += `&state=${state}`;
        }
        if (enableMock) {
            authUrl += `&enable_mock=true`;
        }

        return encodeURI(authUrl);
    }


// private static isValidScope(grant: string): boolean {
    // switch (grant) {
    //     case "offline_access":
    //    case "info":
    //    case "accounts":
    //    case "transactions":
    //    case "balance":
    //       return true;
    //   default:
    //       return false;
    // }
// }


    async exchangeCodeForToken(redirectURI: string, code: string): Promise<ITokenResponse> {
        const myheaders = new Headers();
        myheaders.append('Content-Type', 'application/x-www-form-urlencoded');
        const urlencoded = new URLSearchParams();
        urlencoded.append('grant_type', 'authorization_code');
        urlencoded.append('client_id', this.options.client_id);
        urlencoded.append('client_secret', this.options.client_secret);
        urlencoded.append('redirect_uri', redirectURI);
        urlencoded.append('code', code);
        const uri = `${Constants.AUTH_URL}/connect/token`;
        const requestOptions: any = {
            method: 'POST',
            headers: myheaders,
            body: urlencoded,
            redirect: 'follow'
        };

        try {
            const response = await fetch(uri, requestOptions);
            const parsedResponse: IAuthResponse = await response.json();
            return {
                access_token: parsedResponse.access_token,
                refresh_token: parsedResponse.refresh_token
            };
        } catch (error) {
            throw (error);
        }
    }

    async refreshAccessToken(refreshToken: string): Promise<ITokenResponse> {

        const urlencoded = new URLSearchParams();
        urlencoded.append('grant_type', 'refresh_token');
        urlencoded.append('client_id', this.options.client_id);
        urlencoded.append('client_secret', this.options.client_secret);
        urlencoded.append('refresh_token', refreshToken);
        const uri = `${Constants.AUTH_URL}/connect/token`;
        const requestOptions: any = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        try {
            const response = await fetch(uri, requestOptions);
            const parsedResponse: IAuthResponse = await response.json();
            return {
                access_token: parsedResponse.access_token,
                refresh_token: parsedResponse.refresh_token
            };
        } catch (error) {
            throw (error);
        }
    }


}
