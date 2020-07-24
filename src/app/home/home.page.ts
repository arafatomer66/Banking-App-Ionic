import {Component} from '@angular/core';
import {AuthapiService} from '../services/authapi.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DatapiService} from '../services/datapi.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    code;

    constructor(public client: AuthapiService, public router: Router, public route: ActivatedRoute, public datapi: DatapiService) {

    }

    goo() {
        const authlink = this.client.getAuthUrl('http://localhost:8100/home', ['info', 'accounts', 'balance', 'transactions', 'offline_access', 'cards'], Math.random().toString(), '', '', true);
        this.router.navigate(['/']).then(result => {
            window.location.href = authlink;
        });
    }

    async getcode() {
        this.code = this.route.snapshot.queryParams.code || '/';
        console.log(this.code);
        try {
            const tokens = await this.client.exchangeCodeForToken('http://localhost:8100/home', this.code);
            const accounts = await this.datapi.getAccounts(tokens.access_token);
            const balance = await this.datapi.getBalance(tokens.access_token, accounts.results[0].account_id);
            console.log(tokens);
            console.log(accounts);
            console.log(balance);
        } catch (error) {
            console.log(error);
        }
    }

    copied1() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams();
        urlencoded.append('grant_type', 'authorization_code');
        urlencoded.append('client_id', 'mts135075-7c5352');
        urlencoded.append('client_secret', '7f29c94c-36f6-4254-8192-7fa1daa442a5');
        urlencoded.append('redirect_uri', 'https://console.truelayer.com/redirect-page');
        urlencoded.append('code', 'MzC0pwMDQBDwnpmP5yivS54-ann9smiibVmk3a6xAas');

        const requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch('https://auth.truelayer.com/connect/token', requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    copied() {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
        xhr.open('GET', 'https://api.truelayer.com/data/v1/accounts');
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0NTk4OUIwNTdDOUMzMzg0MDc4MDBBOEJBNkNCOUZFQjMzRTk1MTAiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJGRm1Kc0ZmSnd6aEFlQUNvdW15NV9yTS1sUkEifQ.eyJuYmYiOjE1OTUxNzgwNTQsImV4cCI6MTU5NTE3ODUyNiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnRydWVsYXllci5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnRydWVsYXllci5jb20vcmVzb3VyY2VzIiwiZGF0YV9hcGkiXSwiY2xpZW50X2lkIjoibXRzMTM1MDc1LTdjNTM1MiIsInN1YiI6Ik04d2piWmxaVXFhUTFxMmpuZzYrbkhFRDNZUURPQ09ObjB4RFZjd0s5ZDA9IiwiYXV0aF90aW1lIjoxNTk1MTc3OTg2LCJpZHAiOiJsb2NhbCIsImNvbm5lY3Rvcl9pZCI6Im9iLXNhbnRhbmRlciIsImNyZWRlbnRpYWxzX2tleSI6IjkzMGM2ODE1MzY2Y2Y1MWE2OWQ4MWM3NjA3MzhmZTQ5NDQ5NDk1ODU0MDVhNDY2ZDgwOTE5MzJlODBjNWVlZWMiLCJwcml2YWN5X3BvbGljeSI6IkZlYjIwMTkiLCJjb25zZW50X2lkIjoiZjczZWE0YmUtMDRhYi00OGQ1LWI2OGEtY2RkNDc1OGIyYzg4IiwicHJvdmlkZXJfYWNjZXNzX3Rva2VuX2V4cGlyeSI6IjIwMjAtMDctMTlUMTc6MDk6NDZaIiwicHJvdmlkZXJfcmVmcmVzaF90b2tlbl9leHBpcnkiOiIyMDIwLTEwLTE3VDE2OjU5OjQ2WiIsInNvZnR3YXJlX3N0YXRlbWVudF9pZCI6IjJOdWc0UFdETnZIYkJSMWtKRDloRGEiLCJhY2NvdW50X3JlcXVlc3RfaWQiOiI5N2E5NTY5MC0xNmM1LTQ4NGEtYThkYS0zOTBiMzI3M2E4NGMiLCJzY29wZSI6WyJpbmZvIiwiYWNjb3VudHMiLCJjYXJkcyIsInRyYW5zYWN0aW9ucyIsImJhbGFuY2UiLCJkaXJlY3RfZGViaXRzIiwic3RhbmRpbmdfb3JkZXJzIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.rT2_xzlEabRey7KLirWQbF6fHpnSKE9gdpCUc41I_ynGS1DOJTPDDDKFX4La3E0UWNpvQmGR3GKzk4iPPu4kPyT9GCxcHBi3UOxIf0mULPW0DfIXYFYiImnqfaRAwcL9bIjqsXNV53tE5N8THk781TwAm50NdYMVuRHq6qld8M63R9yLgwBS4A09X3X15qbBqkLZGZlmK_w4-w4-_u1xIAoZ4LcYAdK4x3W_2OZ-k6XxNYkFEK11n-CbAYLpii8pK_ait6yVWhUdTXSwFWt29RQf-2OscCkMJLEwzlekBmCxnPP0LBSUeAW5qCgwP4REvQ_aOQpcyvhjwFi8o9qANA');

        xhr.send();
    }
}
