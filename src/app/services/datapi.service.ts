import {Injectable} from '@angular/core';
import {IResult, IAccount, IBalance, IJWT, ITransaction, IMe, IInfo, Constants} from '../types';
import * as decode from 'jwt-decode';
import * as moment from 'moment-timezone';

// import * as request from "request-promise";

@Injectable({
    providedIn: 'root'
})
export class DatapiService {

    constructor() {
    }

    public static async callAPI<T>(accessToken: string, path: string, qs?: object): Promise<IResult<T>> {

        const isValidToken = DatapiService.validateToken(accessToken);
        if (!isValidToken) {
            throw new Error(('Invalid access token'));
        }

        const requestOptions = DatapiService.buildRequestOptions(accessToken, path);
        try {
            const response = await fetch(path, requestOptions);
            const parsedResponse = response.json();
            return parsedResponse;
        } catch (error) {
            throw (error);
        }
    }

    public static buildRequestOptions(accessToken: string, path: string, qs?: object) {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        const requestOptions: any = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(`Headers for data ${JSON.stringify(myHeaders)}`);
        return requestOptions;
    }


    public static validateToken(accessToken: string): boolean {
        let decoded: IJWT;
        try {
            decoded = decode(accessToken);
        } catch (error) {
            return false;
        }
        const expiry = decoded.exp;
        const now = moment().utc().unix();
        return now - expiry < 0;
    }


    public async getMe(accessToken: string) {
        return await DatapiService.callAPI<IMe>(accessToken, `${Constants.API_URL}/data/v1/me`);
    }


    public async getInfo(accessToken: string): Promise<IResult<IInfo>> {
        return await DatapiService.callAPI<IInfo>(accessToken, `${Constants.API_URL}/data/v1/info`);
    }


    public async getAccounts(accessToken: string): Promise<IResult<IAccount>> {
        return await DatapiService.callAPI<IAccount>(accessToken, `${Constants.API_URL}/data/v1/accounts`);
    }


    public async getAccount(accessToken: string, accountId: string): Promise<IResult<IAccount>> {
        return await DatapiService.callAPI<IAccount>(accessToken, `${Constants.API_URL}/data/v1/accounts/${accountId}`);
    }


    public async getTransactions(accessToken: string, accountId: string, from: string, to: string): Promise<IResult<ITransaction>> {

        const qs = {
            from,
            to
        };

        return await DatapiService.callAPI<ITransaction>(accessToken, `${Constants.API_URL}/data/v1/accounts/${accountId}/transactions`, qs);
    }


    public async getBalance(accessToken: string, accountId: string): Promise<IResult<IBalance>> {
        return await DatapiService.callAPI<IBalance>(accessToken, `${Constants.API_URL}/data/v1/accounts/${accountId}/balance`);
    }


}
