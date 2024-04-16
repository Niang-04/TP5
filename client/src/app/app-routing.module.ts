import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { EspeceOiseauComponent } from "./especeoiseau/especeoiseau.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "birds", component: EspeceOiseauComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }