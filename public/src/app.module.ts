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

@NgModule({
	imports: [
		BrowserModule,
		AppRouterModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		UserNewComponent,
		UserHelloComponent
	],
	providers: [
		UserNewComponent
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }