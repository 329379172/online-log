/**
 * Created by linfeiyang on 16-10-31.
 */
import {Component} from "@angular/core";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
@Component({
	styles: [`
		h1 {
			color: green;
		}
		 .margin-center {
			float: none;
			margin: 0 auto;
		}

	`],
	templateUrl: './user-new-success.component.html'
})
export class UserNewSuccessComponent {

	private url: string;

	constructor(public userService: UserService, public activatedRoute: ActivatedRoute) {
		console.log(`this is user new success component!`);
		this.activatedRoute.params.subscribe((result) => {
			console.log(result);
			let username = result['username'];
			if(username) {
				this.url = userService.getUserUrl(result['username']);
			} else {
				this.url = null;
			}
		});
	}

}