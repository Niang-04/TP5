import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { EspeceOiseauComponent } from "./especeoiseau/especeoiseau.component";

const modules = [

  CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule

]

@NgModule({
  declarations: [
    AppComponent,
    EspeceOiseauComponent,
  ],
  imports: [
  ...modules
  ],
  exports: [...modules],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
