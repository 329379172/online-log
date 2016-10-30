/**
 * Created by linfeiyang on 16-10-30.
 */
import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
@Component({
	selector: 'UserNewComponent',
	templateUrl: './user-new.component.html',
})
export class UserNewComponent {

	constructor() {
		console.log(`this is user new component`);
	}

	onSubmit(f: NgForm) {
		console.log('on submit');
		console.log(f.value);
	}
}
