/**
 * Created by linfeiyang on 16-11-3.
 */

import {Inject} from "@angular/core";
@Inject()
export class LogService {

	constructor() {
		console.log(`this is log service!`);
	}

	

}