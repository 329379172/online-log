/**
 * Created by linfeiyang on 16-10-31.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "./user.model";

@Injectable()
export class UserService {

	constructor(public http: Http) {
		console.log(`this is user service!`);
	}

	createUser(user: User){
		return this.http.post(`/api/user`, {
			username: user.username,
			password: user.password
		}).toPromise().then((response) => response.json());
	}

	setUserUrl(username: string, url: string): void {
		localStorage.setItem(username, url);
	}

	getUserUrl(username: string): string {
		return localStorage.getItem(username);
	}

}