/**
 * Created by linfeiyang on 16-10-31.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User, UserResult} from "./user.model";

@Injectable()
export class UserService {

	constructor(public http: Http) {
		console.log(`this is user service!`);
	}

	createUser(user: User): Promise<UserResult> {
		/*return <UserResult>this.http.post(`/api/user`, {
			username: user.username,
			password: user.password
		}).toPromise();*/
		return new Promise((resolve, reject) => {
			resolve({
				code: 200,
				data: 'http://indedied.com',
				message: 'ok'
			});
		});
	}

	setUserUrl(username: string, url: string): void {
		localStorage.setItem(username, url);
	}

	getUserUrl(username: string): string {
		return localStorage.getItem(username);
	}

}