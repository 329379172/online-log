import {UserNewComponent} from "./user/user-new.component";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHelloComponent} from "./user/user-hello.component";
import {UserNewSuccessComponent} from "./user/user-new-success.component";
import {LogShowComponent} from "./log/log-show.component";

const routes:Routes = <Routes>[
	{
		path: '',
		component: UserHelloComponent
	},
	{
		path: 'user-new',
		component: UserNewComponent
	},
	{
		path: 'user-new-success',
		component: UserNewSuccessComponent
	},
	{
		path: 'log',
		component: LogShowComponent
	}
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRouterModule {}