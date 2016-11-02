/**
 * Created by linfeiyang on 16-10-30.
 */
import { Component } from '@angular/core';
import { UserNewComponent } from '../user/user-new.component';
@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: [(String)('./app.component.css')]
})
export class AppComponent {
	constructor(private userNewComponent:UserNewComponent) {
		console.log(`this is app component!`);
		console.log(userNewComponent);
	}

	goCreateUser() {
		
	}

}
