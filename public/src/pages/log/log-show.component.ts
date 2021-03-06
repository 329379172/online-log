/**
 * Created by linfeiyang on 16-11-3.
 */
import {Component} from "@angular/core";
import * as io from 'socket.io-client'
import * as moment from 'moment';
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
			padding: 0;
	    }
		.col-md-12 {
			padding: 0;
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
		document.title = `${this.username}的即时日志`;
		console.log(`this username=${this.username}`);
		let self = this;
		this.socket = io.connect(location.host);

		console.log(location.host);

		this.socket.on('connect', () => {
			console.log(`has connected`);
			this.socket.emit('set username', this.username);
		});

		this.socket.on('reconnect', () => {
			console.log(`has reconnected`);
			//this.socket.emit('set username', this.username);
		});
		
		this.socket.on('new log', (logData: any) => { //来新的日志了!
			if(!!logData) {
				logData.timestamp = moment(logData.timestamp).format('YYYY-MM-DD HH:mm:ss');
				self.logs.splice(0, 0, logData);
				if(self.logs.length > 50) self.logs.splice(50,this.logs.length - 50);  //超出50条后清理最老的日志
				
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
