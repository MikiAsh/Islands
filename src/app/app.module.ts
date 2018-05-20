import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SetupComponent } from './Components/setup/setup.component';
import { MainComponent } from './Components/main/main.component';
import { MatrixService } from './Services/matrix.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    MainComponent
  ],
  imports: [
    BrowserModule, InfiniteScrollModule
  ],
  providers: [MatrixService],
  bootstrap: [AppComponent]
})
export class AppModule { }
