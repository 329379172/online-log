import {UserNewComponent} from "./user/user-new.component";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHelloComponent} from "./user/user-hello.component";

const routes:Routes = <Routes>[
	{
		path: '',
		component: UserHelloComponent
	},
	{
		path: 'user-new',
		component: UserNewComponent
	}
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRouterModule {}