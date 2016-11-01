/**
 * Created by linfeiyang on 16-10-26.
 */
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './pages/app/app.component';
import { UserNewComponent } from './pages/user/user-new.component';
import { AppRouterModule } from './pages/router';
import {UserHelloComponent} from "./pages/user/user-hello.component";
import {FormsModule} from "@angular/forms";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule} from '@angular/http';
import {UserService} from "./pages/user/user.service";
import {UserNewSuccessComponent} from "./pages/user/user-new-success.component";
import {RouterModule} from "@angular/router";


@NgModule({
	imports: [
		BrowserModule,
		AppRouterModule,
		FormsModule,
		Ng2Bs3ModalModule,
		HttpModule,
		RouterModule
	],
	declarations: [
		AppComponent,
		UserNewComponent,
		UserHelloComponent,
		UserNewSuccessComponent
	],
	providers: [
		UserNewComponent,
		UserService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }