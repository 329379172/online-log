/**
 * Created by linfeiyang on 16-10-31.
 */
export class User {

	private _password: string ;

	private _username:string ;


	get password():string {
		return this._password;
	}

	set password(value:string) {
		this._password = value;
	}

	get username():string {
		return this._username;
	}

	set username(value:string) {
		this._username = value;
	}
}

export class UserResult {
	private _code: number;

	private _message: string;

	private _data: string;

	get code():number {
		return this._code;
	}

	set code(value:number) {
		this._code = value;
	}

	get message():string {
		return this._message;
	}

	set message(value:string) {
		this._message = value;
	}

	get data():string {
		return this._data;
	}

	set data(value:string) {
		this._data = value;
	}
}