/**
 * Created by linfeiyang on 16-11-3.
 */
import {Component} from "@angular/core";
import * as io from 'socket.io-client'
@Component({
	templateUrl: './log-show.component.html',
	styles: [
		` .newForm {
				float: none;
				margin: 0 auto;
			}
		main {
	        margin: 0 !important;
	    }
		`
	]
})
export class LogShowComponent {

	logs: any[] = [];
	constructor() {
		console.log(`this is log show component!`);
	}

	ngOnInit() {
		var socket = io.connect('localhost:3000');
		socket.emit('send message', "hehe");
	}
}
