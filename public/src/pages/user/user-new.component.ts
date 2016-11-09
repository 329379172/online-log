/**
 * Created by linfeiyang on 16-10-30.
 */
import { Component, } from '@angular/core';
import {NgForm} from "@angular/forms";
import {User, UserResult} from "./user.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
@Component({
	selector: 'UserNewComponent',
	templateUrl: './user-new.component.html',
	styles: [
		` .newForm {
				float: none;
				margin: 0 auto;
			}
		  
		`
	]
})
export class UserNewComponent {

	constructor(public userService: UserService, public router: Router) {
		console.log(`this is user new component`);
	}

	async onSubmit(f: NgForm) {
		if(!f.valid) {
			alert('check params fail!');
			return;
		}
		let user = <User>{
			username: f.value.username,
			password: f.value.password
		};
		let result = await this.userService.createUser(user);
		let self = this;
		self.userService.setUserUrl(f.value.username, result.data);
		self.router.navigate(['user-new-success', {username: f.value.username}]);
		/*result.then((result) => {
			if(result.code == 200) {
				self.userService.setUserUrl(f.value.username, result.data);
				self.router.navigate(['user-new-success', {username: f.value.username}]);
			}
		}).catch((e) => {
			console.error(e);
			alert(`create fail!`);
		});*/
	}
}
