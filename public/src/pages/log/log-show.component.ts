/**
 * Created by linfeiyang on 16-11-3.
 */
import {Component} from "@angular/core";
import * as io from 'socket.io-client'
import {ActivatedRoute} from "@angular/router";
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

	private logs: any[] = [];
	private username: string;
	private socket:  SocketIOClient.Socket;
	constructor(public activatedRoute: ActivatedRoute) {
		console.log(`this is log show component!`);
	}

	async ngOnInit() {
		this.username = await this.getUsername();
		console.log(`this username=${this.username}`);
		this.socket = io.connect('localhost:3000', () => {
			console.log('connection');		
		});

		this.socket.emit('set username', this.username);

		this.socket.on('new log', (logData: any) => { //have new log!
			if(!!logData) {
				console.log(logData);
				this.logs.splice(0, 0, logData);
			} else {
				console.log('log data is empty!');
			}
		});
	}

	async getUsername(): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			this.activatedRoute.params.subscribe((param) =>  {
				resolve(param['username']);
			})
		});
	}
}
